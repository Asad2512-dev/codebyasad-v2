# codebyasad-v2 — The Engineer's Atelier

Portfolio of **Muhammad Asad Ullah**, Full-Stack Software Engineer / Product Engineer.
A statically exported Next.js site with GSAP scroll choreography and an original
React Three Fiber hero, built to deploy on Hostinger shared hosting.

> "Engineering is not just code. It is the architecture of ideas brought into reality."

## Stack

Next.js 15 (App Router, `output: 'export'`) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger (free core only) · Three.js + React Three Fiber · Lenis · Lucide · Vitest · Playwright (QA script)

Fonts are self-hosted in `src/styles/` (all SIL OFL 1.1): **Geist / Geist Mono**, subset to Latin and weights 400–600 by `scripts/subset-fonts.sh` (17 kB + 13.5 kB), and **Instrument Serif**. No external font requests. If you add text in another script (e.g. Urdu), re-run the subset script with a wider range.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → ./out
npm run preview    # serve ./out on http://localhost:4173
```

Quality gates:

```bash
npm run lint && npm run typecheck && npm test   # ESLint, tsc, Vitest content-integrity tests
npm run qa         # Playwright: every route × 8 widths — console errors, 4xx, overflow, single <h1>  (needs `npm run preview` running)
npm run og         # regenerate public/og.png
node scripts/serve-prod.cjs   # serve ./out with gzip + caching like Hostinger (port 4174) for Lighthouse
```

## Editing content (no component changes needed)

| What | File |
|---|---|
| Name, headlines, about, philosophy, contact text, socials, email | `src/content/profile.ts` |
| Roles, dates, education, awards | `src/content/experience.ts` |
| Stats ("Proof in numbers"), web properties, app list | `src/content/achievements.ts` |
| Expertise groups | `src/content/skills.ts` |
| Projects & case studies (one file each) | `src/content/projects/*.ts`, order in `index.ts` |
| Lab items, curated repositories | `src/content/lab.ts` |
| Colours, radii, shadows | `src/config/theme.ts` |
| Animation timings / easings | `src/config/motion.ts` |
| Navigation | `src/config/navigation.ts` |
| Site URL, SEO title/description, résumé PDF path | `src/config/site.ts` |

### Honesty rules built into the content model

Every claim carries a `status`:

- `verified` — backed by a public source (GitHub profile, public repository, live site).
- `reported` — stated by Asad but not independently evidenced. Rendered with a **Self-reported** tag.
- `pending` — unknown. Rendered as **Pending confirmation**, never as fact.

`project.pending` lists what each case study still needs; it is shown on the page as "Documentation in progress". Tests in `tests/content.test.ts` fail if a pending stack lists technologies, if salary text appears, or if links aren't https/mailto.

**Screenshots:** add real images to `public/images/projects/<slug>/` and list them in `screenshots`. Until then, projects show an *illustrative module map*, clearly captioned as not being a screenshot.

**Résumé PDF:** drop it at `public/resume/Muhammad-Asad-Ullah-Resume.pdf`. The "Download PDF" button appears automatically at build time; the HTML résumé at `/resume/` always works and prints cleanly.

## Architecture

```
src/
  app/                     routes (all static): /, about, work, work/[slug], experience, expertise, lab, resume, contact
  components/
    layout/                Header (desktop + full-screen mobile menu), Footer
    sections/              homepage sections 01–10 (reused by inner pages)
    projects/              CaseStudy template, ModuleMap, ArchitectureDiagram (SVG), ArchitectureExplorer, WorkIndex (filters)
    three/                 StackScene (R3F), Hero3D (loader / tiering / fallback), StackFallback (SVG)
    animation/             Fx + fx.ts (lazy per-section GSAP), SmoothScroll (Lenis ⇄ ScrollTrigger), RevealRoot (IO reveals)
    ui/                    Button, Status, SectionHeader, PageHero, ErrorBoundary, PrintButton
  content/                 all editable copy & data
  config/                  theme, motion, navigation, site
  hooks/ lib/ styles/ types/
public/                    .htaccess, og.png, favicon.svg, images/, resume/
```

### The 3D hero — "The Stack"

Five translucent, architecturally framed plates — **Interface → API → Services → Data → Infrastructure** — with component blocks and nodes on each layer and request pulses travelling down vertical data lines. Scrolling the pinned hero separates the layers, fans them out to reveal their internals and swings the camera from an isometric view down between them; a layer legend lights up as it opens, handing over to "From architecture to production." All geometry is procedural (no downloaded models).

Performance & resilience:
- The bundle (three + R3F) loads only on the first interaction or 9 s after `load`; a server-rendered SVG of the same stack is shown first.
- Device tiering: no WebGL / Save-Data → SVG only; ≤4 cores, ≤3 GB or phone width → *lite* (fewer nodes, no shadows/antialias, DPR ≤1.25); otherwise DPR ≤1.75.
- Render loop pauses when off-screen or the tab is hidden; context loss and render errors fall back to the SVG.
- `prefers-reduced-motion`: no WebGL, no Lenis, no GSAP; the hero collapses to normal height.

### Animation rules
- Sections are server components. Each has a tiny `<Fx name="…" />` client island; the timelines live in `components/animation/fx.ts`. A section's ScrollTriggers are created only when it nears the viewport, in an idle task, inside `gsap.context()`, and are reverted on unmount.
- `[data-reveal]` elements animate in through an IntersectionObserver (`RevealRoot`). Nothing on screen at load is ever hidden.
- Lenis is driven by the GSAP ticker; `ScrollTrigger.refresh()` runs on each route change; back/forward keeps native scroll restoration.
- Nothing above the fold waits for JavaScript: the hero headline and copy animate with CSS, and the reveal system never hides elements already in view (protects LCP).
- Only `transform` / `opacity` / `clip-path` are animated.

## Deployment
See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** (Hostinger). QA results: **[docs/QA-REPORT.md](docs/QA-REPORT.md)**. Remaining content gaps: **[docs/CONTENT-GAPS.md](docs/CONTENT-GAPS.md)**.

No environment variables are required.
