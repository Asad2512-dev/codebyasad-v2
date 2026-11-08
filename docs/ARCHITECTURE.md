# Architecture

## What this is

The portfolio of Muhammad Asad Ullah — a statically exported **Next.js 15 (App Router)** site written in **TypeScript**, styled with **Tailwind CSS v4**, animated with **GSAP + ScrollTrigger** and **Lenis**, with an original **React Three Fiber** hero. It builds to plain HTML/CSS/JS in `out/` and deploys to Hostinger shared hosting; there is no server runtime, no API routes and no database.

## Layout

- `src/app/` — routes: `/`, `/about`, `/work`, `/work/[slug]` (55 static pages via `generateStaticParams`), `/experience`, `/expertise`, `/lab`, `/resume`, `/contact`, plus `sitemap.ts`, `robots.ts`, `not-found.tsx`.
- `src/content/` — all editable data: `profile.ts`, `experience.ts`, `achievements.ts`, `skills.ts`, `lab.ts`, `projects/` (one file per flagship + `catalog.ts`), `repository-map.ts` (95 audited repos).
- `src/config/` — `theme.ts` (design tokens → CSS variables), `motion.ts`, `navigation.ts`, `site.ts`.
- `src/components/`
  - `layout/` — Header (desktop nav + full-screen mobile menu), Footer.
  - `sections/` — homepage sections; server components unless interactive.
  - `animation/` — `Fx` + `fx.ts` (per-section GSAP, created lazily near the viewport), `SmoothScroll` (Lenis ⇄ ScrollTrigger), `RevealRoot` (IntersectionObserver reveals).
  - `three/` — `StackScene` (R3F), `Hero3D` (tiering, deferral, fallback), `StackFallback` (SVG).
  - `projects/` — `Catalogue` (server-rendered grid + technical index), `CatalogueControls` (client island: search/filters/view), `search.ts` (pure filter logic), `ProjectCard`, `ProjectMedia`, `CaseStudy`, `ArchitectureExplorer`, `ArchitectureDiagram`, `ModuleMap`.
  - `ui/` — Button, StatusBadge, Status, SectionHeader, PageHero, ErrorBoundary, PrintButton.
- `src/types/content.ts` — the content model (Project, Evidence, ArchitectureLayer, RepositoryRecord …).
- `scripts/` — `qa.cjs` (Playwright QA), `serve-prod.cjs` (Hostinger-like local server), `gen-docs.ts` (inventory/audit docs), `og.mjs`, `subset-fonts.sh`.
- `tests/` — Vitest: content integrity, repository map, search/filter logic.
- `public/` — `.htaccess`, `og.png`, `favicon.svg`, `images/projects/<slug>/` (screenshots), `resume/`.

## How the pieces fit

**Content → pages.** Every page reads typed objects from `src/content`. `projects/index.ts` orders published projects (flagships in `FLAGSHIP_ORDER`, then featured, then catalogue), derives categories and technology filters from data, and exposes helpers. A project's `published` flag hides it everywhere. `repository-map.ts` links all 95 repositories to projects or classifies them; tests enforce that both sides agree.

**Evidence model.** Each project carries `evidence` (sources, verification, completeness, last-reviewed date), `origin` (original / customised / academic / research) and optional architecture layers whose `state` is implemented, planned, experimental or unverified. Case studies end with an Evidence section; internal gaps live in `pending` and in `docs/CONTENT-GAPS.md`, not on the page.

**Rendering and hydration.** Pages are prerendered. Static sections are server components; interaction lives in small client islands: Header, Hero3D, per-section `Fx`, `CatalogueControls`, `ArchitectureExplorer`. The /work catalogue ships both views as HTML; the controls only toggle `hidden`, so 50+ cards are never hydrated.

**Motion.** `Fx` creates a section's ScrollTriggers only when the section nears the viewport, inside `gsap.context()` (reverted on unmount). `RevealRoot` uses IntersectionObserver and never hides content already on screen. Hero text animates in CSS so it paints before JavaScript. Reduced motion disables Lenis, GSAP and WebGL.

**Responsive composition.** The hero has two compositions over one markup: a pinned, scroll-scrubbed stage at ≥ 1024 px and a natural-height stacked layout below it, with `short:`/`shortp:` custom variants for short screens. `fx.ts` uses `gsap.matchMedia()` to run different timelines per range. The mobile menu is a dialog overlay rendered outside the header; its GSAP timeline is built on first open. See MOBILE-DESIGN-SYSTEM.md.

**3D.** `Hero3D` shows an SVG of the five-layer stack immediately and loads `StackScene` (three + R3F) on first interaction or 9 s after load, on capable devices only, pausing off-screen and falling back on context loss.

## How to run

```
npm install
npm run dev            # http://localhost:3000
npm run build          # static export → out/
npm run preview        # serve out/ like Hostinger (gzip + caching) on :4173
npm run lint && npm run typecheck && npm test
npm run qa             # Playwright QA (needs preview running)
npm run audit:mobile   # mobile audit: 60 routes × 10 viewports + menu checks → audit-shots/
npm run docs:inventory # regenerate PROJECT-INVENTORY.md and REPOSITORY-AUDIT.md
```

## External services

None at runtime. Fonts (Geist, Geist Mono, Instrument Serif — OFL) are self-hosted. Contact is `mailto:`. GitHub data is curated statically.
