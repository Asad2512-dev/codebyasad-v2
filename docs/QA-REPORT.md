# QA report

Date: 2026-11-08 · Build: Next.js 15.5 static export (22 HTML pages incl. 9 case studies, sitemap, robots, 404).

## Automated gates — all passing
| Check | Result |
|---|---|
| `next build` (static export) | ✅ 22/22 pages |
| ESLint (next/core-web-vitals + typescript) | ✅ 0 problems |
| `tsc --noEmit` (strict) | ✅ |
| Vitest content-integrity (8 tests) | ✅ |
| Playwright route sweep — 17 routes × 8 widths (320, 375, 390, 430, 768, 1024, 1440, 1920) | ✅ no console errors, no failed/4xx requests, no horizontal overflow, exactly one `<h1>` per page |

## Lighthouse 12 (mobile, devtools throttling: 4× CPU, slow 4G)
Measured against the local static server (`python3 -m http.server`), which sends **no compression and no cache headers** — Hostinger with the bundled `.htaccess` will do better on transfer.

```
/ perf:79 acce:100 best:100 seo:100 | LCP 2.3 s CLS 0 TBT 610 ms   (after deferring 3D)
/work/menuwave/ perf:92 acce:100 best:100 seo:100 | LCP 2.2 s CLS 0 TBT 240 ms
/work/unisecure/ perf:94 acce:100 best:100 seo:100 | LCP 2.2 s CLS 0 TBT 160 ms
/work/ perf:94 acce:100 best:100 seo:100 | LCP 2.2 s CLS 0 TBT 160 ms
/resume/ perf:96 acce:100 best:100 seo:100 | LCP 2.2 s CLS 0 TBT 120 ms
/contact/ perf:94 acce:100 best:100 seo:100 | LCP 2.2 s CLS 0 TBT 180 ms
```

- **Accessibility 100, Best Practices 100, SEO 100** on every page measured.
- **CLS 0** everywhere. **LCP 2.2–2.4 s** (= first contentful paint; nothing above the fold waits for JS).
- **Inner pages: Performance 92–96.**
- **Homepage: Performance 79** — below the 90 target. Remaining cost is React hydration of the long, interactive homepage (~670 ms scripting on 4× throttled CPU), not WebGL (deferred until interaction). Next steps if needed: convert Stats/Identity/Timeline/Contact to server components with small client "animator" islands, and split below-the-fold sections with `next/dynamic`.
- Lighthouse's *simulated* throttling reports a higher LCP (≈4–6 s) because its model attributes all JS to the paint; the devtools-throttled measurements above are observed values.

## Manual / visual checks
- Hero: CSS-only headline entrance; SVG stack shown immediately; WebGL fades in after first interaction; scroll separates layers and swings the camera; legend reveals. Verified at 1440×900 and 390×844 (lite tier).
- Selected work stages: perspective panel settles flat, clip-path reveal, parallax numeral and floating module card.
- Architecture explorer: tabs & layers operable by mouse, touch and keyboard (arrow keys, roving tabindex, `aria-selected`, `role=tabpanel`).
- Mobile menu: full-screen, `aria-expanded`, Escape closes and returns focus, body scroll locked.
- Reduced motion: Lenis, GSAP and WebGL disabled; hero not pinned; all content visible.
- Print: `/resume/` prints without header/footer.

## Not tested here
- Real iOS Safari / Android Chrome hardware (emulated only).
- Production Hostinger response headers (checklist in DEPLOYMENT.md).
- Screen readers (VoiceOver/NVDA) — semantics reviewed in code only.

## Known limitations
- Flagship case studies are intentionally thin where facts are missing — see CONTENT-GAPS.md.
- No contact form (mailto only, by design — no backend on shared hosting).
- GitHub data is curated statically; no build-time API integration (avoids tokens and rate limits).
