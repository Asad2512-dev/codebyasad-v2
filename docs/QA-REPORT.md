# QA report

Date: 2026-11-08 · Build: Next.js 15.5 static export — 68 HTML pages (55 project pages, 8 site pages, 404, sitemap, robots).

## Automated gates — all passing

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | ✅ |
| ESLint (next/core-web-vitals + typescript) | ✅ 0 problems |
| Vitest — 27 tests: content integrity (unique slugs and names, valid categories, required fields, flagship order, UniSecure not first and labelled In Development, related links, link formats, screenshots, provenance labels, planned-vs-implemented, data-derived count), repository map (95 repos, no orphans, agrees both ways), search and filters | ✅ 27/27 |
| `next build` static export | ✅ 68/68 pages; `out/.htaccess` present; 55 `out/work/<slug>/index.html` |
| Playwright sweep — all 63 sitemap routes × 8 widths (320, 375, 390, 430, 768, 1024, 1440, 1920) | ✅ no console errors, no failed/4xx requests, no overflow, exactly one `<h1>` |
| Internal link check — every `href` on every route | ✅ 63 unique internal links, all 200 |
| /work interactions — search, category filter, technology filter, view toggle, index row count, URL state restored from `?category=Mobile&view=index` | ✅ |
| Architecture explorer — ArrowDown / End keys, roving tabindex, panel update | ✅ |
| Reduced motion (Playwright `reducedMotion: reduce`) | ✅ no WebGL, no Lenis, nothing hidden, hero one viewport tall |
| Keyboard — first Tab reaches “Skip to content” | ✅ |

## Lighthouse 12 — mobile, devtools throttling (4× CPU, slow 4G), two runs per page

Measured against `npm run preview` (`scripts/serve-prod.cjs`: gzip and immutable caching like the bundled `.htaccess`).

```
/                      perf:97 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 130 ms | JS 433 KB | main 7.8 s
/                      perf:98 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 110 ms | JS 433 KB | main 7.5 s
/work/                 perf:98 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 100 ms | JS 186 KB | main 2.4 s
/work/                 perf:97 acce:100 best:100 seo:100 | LCP 1.8 s | CLS 0 | TBT 140 ms | JS 186 KB | main 2.4 s
/work/menuwave/        perf:99 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 80 ms | JS 186 KB | main 2.0 s
/work/menuwave/        perf:98 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 110 ms | JS 186 KB | main 2.2 s
/work/totalcashpro/    perf:98 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 120 ms | JS 186 KB | main 2.1 s
/work/totalcashpro/    perf:98 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 100 ms | JS 186 KB | main 1.9 s
/work/examcell/        perf:99 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 80 ms | JS 186 KB | main 1.9 s
/work/examcell/        perf:99 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 100 ms | JS 186 KB | main 1.8 s
/work/coresy/          perf:99 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 100 ms | JS 186 KB | main 1.7 s
/work/coresy/          perf:99 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 110 ms | JS 186 KB | main 1.8 s
/about/                perf:98 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 110 ms | JS 168 KB | main 1.6 s
/about/                perf:98 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 120 ms | JS 168 KB | main 1.7 s
/resume/               perf:99 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 90 ms | JS 167 KB | main 1.8 s
/resume/               perf:99 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 90 ms | JS 167 KB | main 1.7 s
```

- **Performance 97–99, Accessibility 100, Best Practices 100, SEO 100** on every page measured.
- **LCP 1.6–1.8 s · CLS 0 · TBT 80–140 ms.** INP can't be measured in the lab; TBT is the proxy.

### Before → after

| Page | Initial build | After perf pass | Phase 2 first measurement | Phase 2 final |
|---|---|---|---|---|
| Homepage | 79 (LCP 2.3 s, TBT 610 ms) | 98 | 96–98 | **97–98** (LCP 1.7 s, TBT 110–130 ms) |
| /work | 94 (old 9-item list) | — | 83–84 (TBT 560–630 ms, a11y 96) | **97–98** (TBT 100–140 ms, a11y 100) |

**What fixed /work:** the first catalogue hydrated 52 cards in both views as a client component. It now ships
both views as server-rendered HTML; a small client island only toggles `hidden`, the search index is built
lazily on first search, and there's no entrance animation on load. The a11y failure was low-contrast
count numbers in the filter chips.

**Homepage note:** the 433 KB of JavaScript and the ~7.5 s main-thread time include the deferred three.js
bundle and WebGL shader compilation. Both happen after LCP, when Lighthouse's long observation window triggers
the deferred load; blocking time stays at 110–130 ms. Lab numbers are not field Core Web Vitals — check
PageSpeed Insights / Search Console after deployment.

## Not tested here
- Real iOS Safari / Android hardware (emulated widths and an iPhone 13 profile only).
- Production Hostinger headers — checklist in DEPLOYMENT.md.
- Screen readers (VoiceOver/NVDA) — semantics reviewed in code; roles and labels verified by Playwright selectors.

## Known limitations
- No real product screenshots exist yet. Covers are original generative illustrations; flagships use a module map captioned “not a product screenshot”.
- ExamCell's repository is empty, so its case study is profile-based and says so in its Evidence section.
- Private repositories are cited but not linked; the Evidence section notes they're available on request.
- The project count (55) differs from the brief (41) — see REPOSITORY-AUDIT.md.
