#!/usr/bin/env python3
"""Content-address a Service Worker's CACHE key.

Reads the ASSETS list inside a sw.js, hashes the listed files, and rewrites
the `const CACHE = "..."` line so the cache version tracks content, not a
hand-maintained string. Run after any build step that changes assets.

Usage:
    python3 scripts/bump_sw_cache.py <sw.js path> <assets root dir>

The assets root is the directory the sw.js paths are relative to (e.g. the
tool's own folder). ASSETS entries that are directories ("./") hash the
index.html of that dir; missing files are skipped with a warning.
"""

from __future__ import annotations

import hashlib
import re
import sys
from pathlib import Path


def _resolve(asset: str, root: Path) -> Path | None:
    rel = asset.lstrip("./")
    if rel == "":
        return root / "index.html"
    return root / rel


def collect_hashes(sw_path: Path, root: Path) -> str:
    src = sw_path.read_text(encoding="utf-8")
    m = re.search(r"const\s+ASSETS\s*=\s*\[([^\]]*)\]", src, re.S)
    if not m:
        raise SystemExit(f"no ASSETS list in {sw_path}")
    assets = re.findall(r"[\"']([^\"']+)[\"']", m.group(1))
    h = hashlib.sha256()
    for a in assets:
        p = _resolve(a, root)
        if p is None or not p.exists():
            print(f"  warn: skip missing {a}", file=sys.stderr)
            continue
        h.update(p.read_bytes())
    return h.hexdigest()[:8]


def bump(sw_path: Path, root: Path) -> str:
    digest = collect_hashes(sw_path, root)
    src = sw_path.read_text(encoding="utf-8")
    new_line = f'const CACHE = "{sw_path.stem}-{digest}";'
    out, n = re.subn(r'const\s+CACHE\s*=\s*"[^"]*"\s*;', new_line, src, count=1)
    if n == 0:
        raise SystemExit(f"no CACHE line in {sw_path}")
    sw_path.write_text(out, encoding="utf-8")
    return digest


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("usage: bump_sw_cache.py <sw.js> <assets root>")
    digest = bump(Path(sys.argv[1]), Path(sys.argv[2]))
    print(f"bumped {sys.argv[1]} -> {digest}")
