# Mobile QA report

Date: 2026-11-08 · Build: Phase 3 (this commit) · Static export: 65 pages (8 site pages + 52 project pages + 404, sitemap, robots).

## Routes and viewports
- **Routes:** all 60 sitemap routes — `/`, `/about/`, `/work/`, `/experience/`, `/expertise/`, `/lab/`, `/resume/`, `/contact/`
  and **every generated `/work/<slug>/` page (52, verified in `out/work/`)**. The inventory publishes 52 projects, not 41 —
  see REPOSITORY-AUDIT.md.
- **Mobile audit** (`npm run audit:mobile`): 320×568, 360×800, 375×667, 390×844, 393×852, 412×915, 430×932, 768×1024,
  landscape 844×390 and 667×375 → 600 route × viewport runs with touch emulation.
- **Route sweep** (`npm run qa`): 320, 375, 390, 430, 768, 1024, 1440, 1920 widths.
- **Device profile:** iPhone 13 (Playwright device descriptor, includes browser UI viewport) for hero, menu, catalogue, architecture.
- **Zoom:** 400 % zoom of a 1280 px desktop equals the 320 px layout, which passes; 200 % ≈ 640 px, covered by the 640–768 range.

## Results

| Check | Before (baseline) | After |
|---|---|---|
| Horizontal overflow | 0 | **0** |
| Visible clipped headings | 0 (40 false positives were screen-reader-only headings) | **0** |
| Console errors / failed requests | 0 | **0** |
| Tap targets < 44 px (outside prose) | flagged in all 600 runs | **0** (4 sub-pixel reports of 44 px elements measuring 43.99 px) |
| Descriptive body text < 15 px | flagged in all 600 runs | **0** (monospace metadata excepted by design) |
| Hero primary CTA on first screen | fails in landscape (844×390, 667×375) | **passes at all 10 viewports** (e.g. bottom at 528 px on 320×568, 379 px on 844×390) |
| Hero pinned on phones | 1.75–2.3 screens | **not pinned** (< 1024 px); first project reached 15–25 % sooner |
| Mobile menu: focus in / trap / Escape / restore / inert / scroll lock / Home / active route | missing focus handling and Home | **all pass** |
| Menu closes on navigation and after back navigation | — | **pass** |
| Catalogue filter state after project → Back | — | **pass** (URL state) |
| Search, category filter, technology filter, view toggle, URL restore | pass | **pass** |
| Architecture explorer keyboard (Arrow/Home/End) | pass | **pass** |
| Architecture diagram legible on phones | labels ≈ 6 px | **HTML stack at 15–18 px** |
| Reduced motion (no WebGL, no Lenis, nothing hidden, hero 1 screen) | pass | **pass** |
| Internal links (60 unique) | pass | **pass** |
| Lighthouse Accessibility (mobile) | 100 | **100** |

## Desktop regression (1024, 1280, 1440, 1920)
- Same pages, before vs after, served side by side: no overflow; page heights within 1 % (larger footer/stat hit areas).
- Hero composition, pinned scroll, 3D, project stages and case studies unchanged at 1280–1920.
- **Fixed a pre-existing overlap at 1024 px:** the hero paragraph ran under the 3D stage; it's now capped at 40 vw
  (`docs/mobile/desktop-1024-before.png` → `desktop-1024-after.png`).

## Screenshots
`docs/mobile/before-*.png` (baseline) and `docs/mobile/after-*.png`:
home 390, menu 390, landscape 844×390, catalogue 390, architecture stack 390, opened 3D stage, desktop 1024/1440.

## Not tested here
- Physical iOS/Android hardware (emulation only); VoiceOver/TalkBack (semantics checked via roles, labels and Playwright).
- iOS Safari's dynamic toolbar: `dvh`/safe-area handling is in place but was verified in Chromium emulation only.
