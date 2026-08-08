#!/usr/bin/env python3
"""Build a single offline HTML for 心语卡牌."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

APP = ROOT / "heart-talk"
OUT = APP / "heart-talk-cards-offline.html"


def build() -> Path:
    html = (APP / "index.html").read_text(encoding="utf-8")
    css = (APP / "src" / "styles.css").read_text(encoding="utf-8")
    js = (APP / "src" / "app.bundle.js").read_text(encoding="utf-8")

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
    html = re.sub(r'<a href="\.\./"[\s\S]*?</a>\s*', '', html, count=1, flags=re.S)
    # remove online-only download button noise if present
    html = re.sub(
        r'<a class="filter-btn"[^>]*>\s*下载离线包\s*</a>\s*',
        "",
        html,
        flags=re.S,
    )

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
    return OUT


if __name__ == "__main__":
    path = build()
    print("Wrote", path, "bytes", path.stat().st_size)
