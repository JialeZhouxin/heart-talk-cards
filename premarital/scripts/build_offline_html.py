#!/usr/bin/env python3
"""Build a single offline HTML pack from web/ assets."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT
OUT = ROOT / "premarital-counseling-offline.html"

MODULE_ORDER = [
    "js/import-export-core.js",
    "js/compare.js",
    "js/form-logic.js",
    "js/storage.js",
    "js/data-loader.js",
    "js/home.js",
    "js/fill.js",
    "js/compare-page.js",
]


def demodule(src: str) -> str:
    """Strip ES module syntax; keep import aliases as const bindings.

    Supports multi-line import/export { ... } blocks.
    """
    alias_lines: list[str] = []
    lines_out: list[str] = []
    lines = src.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if re.match(r"^\s*import\s*\{", line):
            block = [line]
            while True:
                joined = "\n".join(block)
                if "}" in joined and re.search(r"\bfrom\b", joined):
                    break
                if i + 1 >= len(lines):
                    break
                i += 1
                block.append(lines[i])
            blob = "\n".join(block)
            m = re.search(r"\{([^}]*)\}", blob, re.S)
            if m:
                for part in m.group(1).split(","):
                    part = part.strip()
                    if not part:
                        continue
                    if " as " in part:
                        orig, alias = [x.strip() for x in part.split(" as ", 1)]
                        alias_lines.append(f"const {alias} = {orig};")
            i += 1
            continue
        if re.match(r"^\s*import\s+", line):
            i += 1
            continue
        if re.match(r"^\s*export\s*\{", line):
            while i < len(lines) and "}" not in lines[i]:
                i += 1
            i += 1
            continue
        line2 = re.sub(r"^export\s+async\s+function\s+", "async function ", line)
        line2 = re.sub(r"^export\s+function\s+", "function ", line2)
        line2 = re.sub(r"^export\s+const\s+", "const ", line2)
        lines_out.append(line2)
        i += 1
    out = "\n".join(alias_lines + lines_out)
    out = re.sub(r"\bexport\s+default\s+", "", out)
    return out


def load_embed() -> dict:
    catalog = json.loads((WEB / "data" / "forms.json").read_text(encoding="utf-8"))
    banks: dict = {}
    for form in catalog["forms"]:
        rel = form["file"]
        path = WEB / "data" / rel
        data = json.loads(path.read_text(encoding="utf-8"))
        banks[rel] = data
        banks[Path(rel).name] = data
    return {"catalog": catalog, "banks": banks}


def page_bodies() -> dict[str, str]:
    def body_inner(name: str) -> str:
        html = (WEB / name).read_text(encoding="utf-8")
        m = re.search(r"<body[^>]*>(.*)</body>", html, re.S | re.I)
        if not m:
            raise SystemExit(f"no body in {name}")
        inner = m.group(1)
        inner = re.sub(r"<script[\s\S]*?</script>", "", inner)
        return inner.strip()

    return {
        "home": body_inner("index.html"),
        "fill": body_inner("fill.html"),
        "compare": body_inner("compare.html"),
    }


def css() -> str:
    return (WEB / "css" / "app.css").read_text(encoding="utf-8")


def build() -> Path:
    embed = load_embed()
    bodies = page_bodies()
    parts: list[str] = []
    rename = {
        "js/home.js": ("async function main", "async function bootHome", "bootHome"),
        "js/fill.js": ("async function main", "async function bootFill", "bootFill"),
        "js/compare-page.js": (
            "async function main",
            "async function bootCompare",
            "bootCompare",
        ),
    }
    for rel in MODULE_ORDER:
        raw = (WEB / rel).read_text(encoding="utf-8")
        text = demodule(raw)
        if rel in rename:
            a, b, boot = rename[rel]
            if a not in text:
                raise SystemExit(f"missing {a} in {rel}")
            text = text.replace(a, b, 1)
            idx = text.rfind("main();")
            if idx < 0:
                raise SystemExit(f"missing trailing main(); in {rel}")
            text = text[:idx] + text[idx + len("main();") :]
            text = (
                f"(function () {{\n{text}\n"
                f"  window.{boot} = {boot};\n"
                f"}})();\n"
            )
        parts.append(f"// ---- {rel} ----\n{text}\n")

    app_js = "\n".join(parts)
    router = r"""
// ---- offline router ----
const views = {
  home: document.getElementById("view-home"),
  fill: document.getElementById("view-fill"),
  compare: document.getElementById("view-compare"),
};
const templates = {
  home: views.home.innerHTML,
  fill: views.fill.innerHTML,
  compare: views.compare.innerHTML,
};

function parseRoute() {
  const h = location.hash || "#/";
  if (h.startsWith("#/fill")) return "fill";
  if (h.startsWith("#/compare")) return "compare";
  return "home";
}

async function route() {
  const name = parseRoute();
  for (const [k, el] of Object.entries(views)) {
    el.hidden = k !== name;
  }
  // reset DOM so re-entering a page does not stack listeners
  views[name].innerHTML = templates[name];
  try {
    if (name === "home") await bootHome();
    else if (name === "fill") await bootFill();
    else if (name === "compare") await bootCompare();
  } catch (e) {
    console.error(e);
    alert("页面加载失败：" + (e && e.message ? e.message : e));
  }
}

window.addEventListener("hashchange", () => { route(); });
if (!location.hash) location.hash = "#/";
else route();
"""

    embed_json = json.dumps(embed, ensure_ascii=False, separators=(",", ":"))
    embed_json = embed_json.replace("</", "<\\/")

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#2f5d50" />
  <title>婚前辅导表单（离线包）</title>
  <style>
{css()}
  .offline-banner {{
    background: #e8f0ff; border: 1px solid #b7c9ef; color: #1e2f5c;
    padding: 10px 12px; border-radius: 8px; margin-bottom: 12px; font-size: 14px;
  }}
  [hidden] {{ display: none !important; }}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="offline-banner">
      离线单文件包：可直接双击打开，无需联网。数据仍只保存在本机浏览器。
      分享本 HTML 文件即可给朋友使用；双方答案请用「导出 JSON」互传。
    </div>
  </div>
  <div id="view-home">{bodies["home"]}</div>
  <div id="view-fill" hidden>{bodies["fill"]}</div>
  <div id="view-compare" hidden>{bodies["compare"]}</div>
  <script>
  window.__EMBED__ = {embed_json};
  </script>
  <script>
{app_js}
{router}
  </script>
</body>
</html>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    # content-address the SW cache so a rebuild always invalidates stale caches
    import sys
    sys.path.insert(0, str((Path(__file__).resolve().parents[2] / "scripts")))
    from bump_sw_cache import bump
    bump(OUT.parent / "sw.js", OUT.parent)
    return OUT


if __name__ == "__main__":
    path = build()
    print("Wrote", path, "bytes", path.stat().st_size)
