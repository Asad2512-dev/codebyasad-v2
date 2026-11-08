# QA report

Date: 2026-11-08 · Build: Next.js 15.5 static export (22 HTML pages incl. 9 case studies, sitemap, robots, 404).

## Automated gates — all passing
| Check | Result |
|---|---|
| `next build` (static export) | ✅ 22/22 pages |
| Reduced motion (Playwright `reducedMotion: reduce`) | ✅ no WebGL/Lenis, nothing hidden, hero 1 viewport tall |
| ESLint (next/core-web-vitals + typescript) | ✅ 0 problems |
| `tsc --noEmit` (strict) | ✅ |
| Vitest content-integrity (8 tests) | ✅ |
| Playwright route sweep — 17 routes × 8 widths (320, 375, 390, 430, 768, 1024, 1440, 1920) | ✅ no console errors, no failed/4xx requests, no horizontal overflow, exactly one `<h1>` per page |

## Lighthouse 12 (mobile, devtools throttling: 4× CPU, slow 4G)

Measured against `scripts/serve-prod.cjs`, a local server that mirrors the bundled
`.htaccess` (gzip, immutable caching for hashed assets). Three runs per page agreed within ±1.

```
/                  perf:98 acce:100 best:100 seo:100 | LCP 1.7 s CLS 0 TBT 120 ms
/about/            perf:99 acce:100 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 90 ms
/work/             perf:98 acce:100 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 130 ms
/work/menuwave/    perf:99 acce:100 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 80 ms
/work/unisecure/   perf:98 acce:100 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 110 ms
/experience/       perf:98 acce:98 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 140 ms
/expertise/        perf:99 acce:98 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 90 ms
/lab/              perf:99 acce:100 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 90 ms
/resume/           perf:99 acce:100 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 80 ms
/contact/          perf:98 acce:100 best:100 seo:100 | LCP 1.6 s CLS 0 TBT 120 ms
```

- **Performance 98–99, Accessibility 100, Best Practices 100, SEO 100 on every page.**
- **LCP 1.6–1.7 s, CLS 0, TBT 80–140 ms.**
- Without compression (plain `python3 -m http.server`) the homepage still scores 93–94 (LCP 2.1 s).

### What fixed the homepage (79 → 98)
1. **Lazy scroll effects.** Section choreography moved out of client components into one
   `<Fx name="…" />` island per section. Its ScrollTriggers are created only when the section
   nears the viewport, each in its own idle task. Previously all of them measured the page
   inside a single 444 ms post-hydration task.
2. **Reveal system on IntersectionObserver.** No layout reads, no ScrollTriggers; this removed
   ~200 ms of forced reflow.
3. **Server components.** Hero, Identity, Stats, Selected Work, Expertise, Timeline and Contact
   now render on the server, so there is less to hydrate.
4. **No first-load layout pass.** Lenis starts in an idle task, and the route-change
   `ScrollTrigger.refresh()` runs only on client-side navigation.
5. **Fonts.** Geist and Geist Mono are subset to Latin and weights 400–600
   (69 kB → 17 kB and 71 kB → 13.5 kB, `scripts/subset-fonts.sh`). The italic serif is no
   longer preloaded. LCP now equals first paint.
6. **No animation delay on the first hero text.**

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
