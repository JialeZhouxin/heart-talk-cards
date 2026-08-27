#!/usr/bin/env python3
"""Build a single offline HTML for 心语卡牌.

Source of truth is the ES modules under src/ — the same files the online
app loads. A minimal demodule pass inlines them in dependency order, so
card data can never drift between online and offline builds.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

APP = ROOT / "heart-talk"
OUT = APP / "heart-talk-cards-offline.html"

# dependency order: data first, then core, ui, then entry point
MODULE_ORDER = [
    "src/data/cards.js",
    "src/core/card-service.js",
    "src/core/history-store.js",
    "src/ui/render.js",
    "src/main.js",
]


def demodule(src: str) -> str:
    """Strip ES module syntax the same way premarital's builder does.

    `import { a as b } from "./x"` → `const b = a;` (bindings resolve at
    runtime against earlier modules in MODULE_ORDER).
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
        line2 = re.sub(r"^export\s+async\s+function\s+", "async function ", line)
        line2 = re.sub(r"^export\s+function\s+", "function ", line2)
        line2 = re.sub(r"^export\s+const\s+", "const ", line2)
        lines_out.append(line2)
        i += 1
    out = "\n".join(alias_lines + lines_out)
    out = re.sub(r"\bexport\s+default\s+", "", out)
    return out.lstrip("\ufeff").lstrip()


def build() -> Path:
    html = (APP / "index.html").read_text(encoding="utf-8")
    css = (APP / "src" / "styles.css").read_text(encoding="utf-8")

    parts: list[str] = []
    for rel in MODULE_ORDER:
        # utf-8-sig: strip BOM so ^export/^import regexes match on line 1
        raw = (APP / rel).read_text(encoding="utf-8-sig")
        parts.append(f"// ---- {rel} ----\n{demodule(raw)}\n")
    js = "\n".join(parts)

    # strip external font links (offline-friendly)
    html = re.sub(r'<link rel="preconnect"[^>]*>\s*', "", html)
    html = re.sub(
        r'<link href="https://fonts\.googleapis\.com/[^"]+"[^>]*>\s*',
        "",
        html,
    )
    # remove existing stylesheet link and boot script; inject embedded assets
    html = re.sub(r'<link rel="stylesheet" href="\./src/styles\.css">\s*', "", html)
    html = re.sub(r"<script>[\s\S]*?loadAppScript[\s\S]*?</script>\s*", "", html)
    html = re.sub(r'<script src="\./src/pwa\.js"></script>\s*', "", html)

    banner = """
    <div class="container" style="padding-bottom:0">
      <div style="background:#e8f0ff;border:1px solid #b7c9ef;color:#1e2f5c;padding:10px 12px;border-radius:12px;margin:12px 0 0;font-size:14px;">
        离线单文件包：可直接双击打开，无需联网。对话历史仍只保存在本机浏览器。
      </div>
    </div>
"""
    html = re.sub(r"<body>\s*", "<body>\n" + banner, html, count=1)

    # remove back-to-toolbox link (pointless in a standalone file)
    html = re.sub(r'<a href="\.\./"[\s\S]*?</a>\s*', "", html, count=1, flags=re.S)

    inject = f"""
<style>
{css}
</style>
<script>
{js}
</script>
"""
    html = html.replace("</body>", inject + "\n</body>")
    html = html.replace("<title>心语卡牌</title>", "<title>心语卡牌（离线包）</title>")
    if 'name="theme-color"' not in html:
        html = html.replace(
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
            '    <meta name="theme-color" content="#c27a3a">',
        )

    OUT.write_text(html, encoding="utf-8")
    # content-address the SW cache so a rebuild always invalidates stale caches
    import sys
    sys.path.insert(0, str(ROOT / "scripts"))
    from bump_sw_cache import bump
    bump(OUT.parent / "sw.js", OUT.parent)
    return OUT


if __name__ == "__main__":
    path = build()
    print("Wrote", path, "bytes", path.stat().st_size)
