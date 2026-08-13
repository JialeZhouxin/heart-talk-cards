# -*- coding: utf-8 -*-
"""Build web/data/assessment.json from assessment markdown templates."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSESS = ROOT / "docs" / "婚前关系评估.md"
COMPARE = ROOT / "docs" / "婚前关系评估-对照.md"
OUT = ROOT / "data" / "assessment.json"

SKIP_TITLES = {
    "第一章 错误 / 关系评估表",
    "第二章 具体描绘你的理想情人 / 关系评估表",
}


def slugify_chapter(title: str, err_i: list[int], trait_i: list[int]) -> tuple[str, str]:
    t = title.strip()
    if t.startswith("错误"):
        err_i[0] += 1
        return f"err{err_i[0]}", "errors"
    # 一、个性 / 二、聪明 ...
    trait_i[0] += 1
    return f"trait{trait_i[0]}", "traits"


def norm_prompt(s: str) -> str:
    s = s.strip()
    s = re.sub(r"\s*______.*$", "", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip(" 。.．")


def parse_assess(text: str) -> list[dict]:
    lines = text.splitlines()
    chapters: list[dict] = []
    cur = None
    err_i = [0]
    trait_i = [0]
    open_n = 0
    likert_n = 0

    i = 0
    while i < len(lines):
        ln = lines[i].strip()
        if ln.startswith("## ") or ln.startswith("### "):
            title = ln.lstrip("#").strip()
            if title in SKIP_TITLES or title == "婚前关系评估":
                cur = None
                i += 1
                continue
            cid, part = slugify_chapter(title, err_i, trait_i)
            cur = {"id": cid, "title": title, "part": part, "items": []}
            chapters.append(cur)
            open_n = 0
            likert_n = 0
            i += 1
            continue

        if cur is None:
            i += 1
            continue

        if ln.startswith("**量表") or not ln:
            i += 1
            continue

        m = re.match(r"^(\d+)\s*[\.、．]\s*(.+)$", ln)
        if not m:
            i += 1
            continue

        rest = m.group(2).strip()
        if "______" in rest or rest.endswith("______"):
            likert_n += 1
            prompt = norm_prompt(rest)
            cur["items"].append(
                {
                    "id": f"{cur['id']}_l{likert_n}",
                    "type": "likert",
                    "prompt": prompt if prompt.endswith("。") else prompt,
                }
            )
            i += 1
            continue

        # open question
        open_n += 1
        prompt = rest
        # skip following blank / >
        j = i + 1
        while j < len(lines) and lines[j].strip() in ("", ">"):
            j += 1
        cur["items"].append(
            {"id": f"{cur['id']}_o{open_n}", "type": "open", "prompt": prompt}
        )
        i = j
        continue

    return chapters


def parse_compare_likerts(text: str) -> list[tuple[str, str]]:
    """Return list of (chapter_title, prompt)."""
    lines = text.splitlines()
    out: list[tuple[str, str]] = []
    cur_title = None
    i = 0
    while i < len(lines):
        ln = lines[i].strip()
        if ln.startswith("## ") or ln.startswith("### "):
            title = ln.lstrip("#").strip()
            if title not in SKIP_TITLES and not title.startswith("说明"):
                cur_title = title
            i += 1
            continue
        m = re.match(r"^(?:(\d+)\s*[\.、．]\s*)?(.+)$", ln)
        if not m or cur_title is None:
            i += 1
            continue
        body = m.group(2).strip()
        if body.startswith("- "):
            body = body[2:].strip()
        # next non-empty should contain 我方
        j = i + 1
        while j < len(lines) and not lines[j].strip():
            j += 1
        if j < len(lines) and "我方" in lines[j]:
            out.append((cur_title, norm_prompt(body)))
            i = j + 1
            continue
        i += 1
    return out


def merge(chapters: list[dict], compare_items: list[tuple[str, str]]) -> tuple[list[dict], list[str]]:
    # index prompts in assess
    by_title = {c["title"]: c for c in chapters}
    existing = set()
    for c in chapters:
        for it in c["items"]:
            if it["type"] == "likert":
                existing.add(norm_prompt(it["prompt"]))

    only_compare: list[str] = []
    for title, prompt in compare_items:
        p = norm_prompt(prompt)
        if p in existing:
            continue
        only_compare.append(f"{title} :: {p}")
        ch = by_title.get(title)
        if ch is None:
            # fuzzy: match startswith
            for t, c in by_title.items():
                if title in t or t in title:
                    ch = c
                    break
        if ch is None:
            ch = {
                "id": "extra",
                "title": title or "对照补题",
                "part": "errors",
                "items": [],
            }
            chapters.append(ch)
            by_title[ch["title"]] = ch
        n = sum(1 for it in ch["items"] if it["type"] == "likert") + 1
        ch["items"].append({"id": f"{ch['id']}_l{n}", "type": "likert", "prompt": p})
        existing.add(p)
    return chapters, only_compare


def counts(chapters: list[dict]) -> tuple[int, int]:
    likert = open_ = 0
    for c in chapters:
        for it in c["items"]:
            if it["type"] == "likert":
                likert += 1
            else:
                open_ += 1
    return likert, open_


def main() -> None:
    assess_text = ASSESS.read_text(encoding="utf-8")
    compare_text = COMPARE.read_text(encoding="utf-8")
    chapters = parse_assess(assess_text)
    compare_items = parse_compare_likerts(compare_text)
    chapters, only_compare = merge(chapters, compare_items)
    likert_count, open_count = counts(chapters)

    bank = {
        "version": 1,
        "scale": {
            "min": 1,
            "max": 5,
            "labels": ["非常同意", "同意", "中立", "不同意", "非常不同意"],
        },
        "chapters": chapters,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(bank, ensure_ascii=False, indent=2), encoding="utf-8")

    assess_likerts = set()
    for c in parse_assess(assess_text):
        for it in c["items"]:
            if it["type"] == "likert":
                assess_likerts.add(norm_prompt(it["prompt"]))
    compare_set = {norm_prompt(p) for _, p in compare_items}
    only_assess = sorted(assess_likerts - compare_set)

    print("wrote", OUT)
    print("chapters", len(chapters))
    print("likert_count", likert_count)
    print("open_count", open_count)
    print("only_assess_likert", len(only_assess))
    for x in only_assess[:20]:
        print("  A", x)
    print("only_compare_added", len(only_compare))
    for x in only_compare[:20]:
        print("  C", x)


if __name__ == "__main__":
    main()
