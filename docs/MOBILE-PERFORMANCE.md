# Mobile performance

Lighthouse 12, mobile emulation (Moto G-class viewport), devtools throttling (4× CPU, slow 4G), against
`npm run preview` (gzip + caching like the bundled `.htaccess`). "Before" is the Phase 2 build (`3b10d53`)
served side by side from a separate worktree; "after" is this build. Two runs per page.

```
before  /                  perf:93 acce:100 best:100 seo:100 | LCP 1.8 s | CLS 0 | TBT 260 ms | JS 433 KB
before  /                  perf:97 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 130 ms | JS 433 KB
before  /work/             perf:98 acce:100 best:100 seo:100 | LCP 1.9 s | CLS 0 | TBT 100 ms | JS 186 KB
before  /work/             perf:96 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 180 ms | JS 186 KB
before  /work/menuwave/    perf:97 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 160 ms | JS 186 KB
before  /work/menuwave/    perf:98 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 110 ms | JS 186 KB
before  /experience/       perf:97 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 160 ms | JS 168 KB
before  /experience/       perf:98 acce:100 best:100 seo:100 | LCP 1.6 s | CLS 0 | TBT 140 ms | JS 168 KB
after   /                  perf:95 acce:100 best:100 seo:100 | LCP 1.8 s | CLS 0 | TBT 220 ms | JS 435 KB
after   /                  perf:95 acce:100 best:100 seo:100 | LCP 1.9 s | CLS 0 | TBT 190 ms | JS 435 KB
after   /work/             perf:92 acce:100 best:100 seo:100 | LCP 1.8 s | CLS 0 | TBT 310 ms | JS 187 KB
after   /work/             perf:95 acce:100 best:100 seo:100 | LCP 1.8 s | CLS 0 | TBT 200 ms | JS 187 KB
after   /work/menuwave/    perf:96 acce:100 best:100 seo:100 | LCP 1.8 s | CLS 0 | TBT 190 ms | JS 187 KB
after   /work/menuwave/    perf:95 acce:100 best:100 seo:100 | LCP 1.8 s | CLS 0 | TBT 210 ms | JS 187 KB
after   /experience/       perf:96 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 190 ms | JS 170 KB
after   /experience/       perf:97 acce:100 best:100 seo:100 | LCP 1.7 s | CLS 0 | TBT 150 ms | JS 170 KB
```

After lazy-building the menu timeline (final build), three more runs:
homepage 92–97 (TBT 150–280 ms), /work 95–98 (TBT 110–190 ms), LCP 1.8–1.9 s, CLS 0.

## Summary

| Metric (mobile) | Original report | Phase 2 | Phase 3 final |
|---|---|---|---|
| Homepage Performance | 79 | 93–97 | **92–97** |
| Homepage LCP | 2.3 s | 1.7–1.8 s | 1.8–1.9 s |
| CLS | 0 | 0 | **0** |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 | **100 / 100 / 100** |

Phase 3 added a new mobile hero, a full menu and more interaction, and performance held. Lab results are not field
Core Web Vitals; INP can't be measured in the lab (TBT is the proxy).

## What was profiled and changed
- **Menu animation cost on load:** the first build of the new menu created its GSAP timeline on every page load
  (+40–100 ms TBT). Now built lazily on first open — load-time cost removed (back to Phase 2 levels).
- **Hero:** headline, copy and CTAs are static HTML animated with CSS; the WebGL bundle still loads only on first
  touch/scroll (or 9 s after load), and on phones uses the lite tier (DPR ≤ 1.25, fewer nodes, no shadows).
- **Scroll work on phones:** no pinned hero (one less long ScrollTrigger range), no 3D tilt or parallax timelines
  on project stages — one clip-path tween and one small transform per stage.
- **Catalogue:** server-rendered both views; filter controls are the only client island; technology chips scroll
  horizontally instead of wrapping into tall blocks.
- **No new dependencies**; JavaScript transferred is unchanged (homepage 435 KB incl. the deferred three.js
  chunk, other pages 170–187 KB).

## Remaining costs
- The homepage's main-thread time is dominated by the deferred three.js chunk and shader compilation, which happen after
  LCP. On low-end phones this is the main lever left (e.g. replacing WebGL with the SVG stage on `deviceMemory ≤ 2`).
