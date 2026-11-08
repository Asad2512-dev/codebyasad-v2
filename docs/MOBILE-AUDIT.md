# Mobile audit (baseline before Phase 3)

Date: 2026-11-08 · Build `3b10d53` · Tool: `scripts/mobile-audit.cjs` (Playwright, touch + mobile emulation) — every
route in `sitemap.xml` (60 routes: 8 pages + 52 projects) at **320×568, 360×800, 375×667, 390×844, 393×852, 412×915,
430×932, 768×1024** and landscape **844×390, 667×375**. Raw output: 600 route×viewport runs.
Interactions tested: scroll-through of each page, mobile menu open / Tab / Escape, console errors.

| # | Severity | Issue | Routes | Viewports | Evidence | Correction |
|---|---|---|---|---|---|---|
| 1 | High | Hero is pinned for 1.75–2.3 screens; first project is 5–9 screens down; homepage 20–43 screens long | `/` | all | hero 1.75 screens at 390×844, first project at 5.5 screens | Pin + scroll-scrubbed 3D only at ≥1024 px; natural-height mobile hero; tighter mobile section rhythm |
| 2 | High | Primary CTA below the fold in landscape; 3D stage overlaps headline | `/` | 844×390, 667×375 | screenshot `before-844x390-home.png` | Two-column compact landscape hero with height-based type scale |
| 3 | High | Architecture diagram is a 560-unit SVG scaled down — labels ≈ 6 px on 320 px phones | `/work/menuwave/`, `/work/totalcashpro/`, `/work/unisecure/` | ≤ 430 | visual | HTML layer stack on phones; SVG only ≥ 768 px |
| 4 | Medium | Mobile menu: focus not moved in, Tab escapes, no Home link, no focus trap | all | ≤ 768 | 10/10 viewports | New overlay menu: GSAP reveal, focus trap, Escape, focus restore, `inert` background, Home, safe-area |
| 5 | Medium | Touch targets < 44 px: brand link (24 px), nav/footer links (17 px), filter chips & view toggle (36 px), evidence links (40 px), stat evidence links (17 px) | all | all | 600 runs flagged | 44 px minimum hit areas on touch; padding not visual bloat |
| 6 | Medium | Sticky filter bar occupies ~180 px of each phone screen while browsing the catalogue | `/work/` | ≤ 768 | visual | Sticky only ≥ 768 px; technology chips scroll horizontally on phones |
| 7 | Low | Descriptive text at 12–14 px: footer role, evidence notes, pipeline steps, card taglines/highlights | many | all | e.g. footer 14 px, evidence note 12 px | ≥ 16 px body on phones; small sizes kept for labels only |
| 8 | Low | Hero label crowds the header in short viewports; no safe-area handling (notch / home indicator) | `/` | landscape, iOS | visual | `viewport-fit=cover`, `env(safe-area-inset-*)`, dvh units |
| 9 | Info | “Clipped heading” hits were screen-reader-only headings (1 px clip) — not visible defects | — | — | — | Excluded from checks |

No horizontal overflow and no console errors were found in the baseline.

Screenshots: `docs/mobile/before-*.png`.
