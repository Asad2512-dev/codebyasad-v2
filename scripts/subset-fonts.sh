#!/usr/bin/env bash
# Rebuilds the self-hosted Geist files as small Latin subsets.
# Source: the `geist` npm package (OFL 1.1). Requires: pip install fonttools brotli
# Re-run if you add text with characters outside this range.
set -euo pipefail
SRC="${1:?path to geist package dist/fonts}"
OUT="$(dirname "$0")/../src/styles"
UNICODES="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013-2014,U+2018-201E,U+2022,U+2026,U+2032-2033,U+2039-203A,U+20AC,U+2122,U+2190-2193,U+2197,U+2212"
# Geist: keep weight axis 400–600 (the weights the design uses)
fonttools varLib.instancer "$SRC/geist-sans/Geist-Variable.woff2" wght=400:600 -o /tmp/geist-inst.ttf -q
pyftsubset /tmp/geist-inst.ttf --unicodes="$UNICODES" --layout-features='kern,liga,calt' --flavor=woff2 --output-file="$OUT/Geist-Variable.woff2"
fonttools varLib.instancer "$SRC/geist-mono/GeistMono-Variable.woff2" wght=400:600 -o /tmp/geistmono-inst.ttf -q
pyftsubset /tmp/geistmono-inst.ttf --unicodes="$UNICODES" --layout-features='kern' --flavor=woff2 --output-file="$OUT/GeistMono-Variable.woff2"
ls -la "$OUT"/*.woff2
