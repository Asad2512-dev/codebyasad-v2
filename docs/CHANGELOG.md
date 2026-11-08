# Changelog

## 2026-11-08 — Phase 3: mobile-first experience
- Mobile audit across 10 viewports × 60 routes (docs/MOBILE-AUDIT.md) with a reusable `npm run audit:mobile`.
- Mobile hero: natural height, CTAs on the first screen at every viewport, framed 3D stage with layer legend, compact
  landscape layout, scroll cue; desktop pinned hero unchanged.
- New mobile navigation: full-screen GSAP overlay, focus trap, Escape/restore, inert background, scroll lock, Home + active route, safe areas.
- 44 px touch targets, ≥ 16 px body text on phones, tighter section rhythm, safe-area insets, edge-faded chip scrollers.
- Phone architecture diagrams as readable HTML stacks; responsive GSAP via `gsap.matchMedia()`.
- QA: menu and back-navigation tests added; desktop regression checked; fixed 1024 px hero overlap.

## 2026-11-08 — Current role: Buildexa Technologies
- Added Senior Full-Stack Engineer & Senior Product Designer at Buildexa Technologies (Aug 2026 – present, remote) as the first, current role; previous roles unchanged.
- New positioning “Design × Engineering”: hero “I design the experience. I engineer the product.”, Discover → Design → Architect → Build → Deploy → Improve pipeline, Product Design expertise group.
- Updated About, Experience, Expertise, Resume, Contact, SEO titles/descriptions, JSON-LD (jobTitle, worksFor) and the OG image.
- Only the Buildexa website/staff console is linked to the role; other products await confirmation.
- Unpublished Rayvon Scents, BlogByAsad and CodeByAsad; SmartPrepX recast as a mobile app; education separated from the experience timeline.

## 2026-11-08 — Phase 2: complete portfolio, repository audit, catalogue

### Audit
- Audited all 95 repositories of Asad2512-dev: metadata, every `docs/ARCHITECTURE.md`, READMEs, manifests,
  file trees and mobile app labels. Results in `docs/REPOSITORY-AUDIT.md` and `src/content/repository-map.ts`.
- Reconciled 55 distinct projects (49 with repositories, 6 profile-only); flagged third-party bases and forks.
- Private repositories appear under neutral aliases in committed files; real names stay in a git-ignored local folder.

### Content
- New content model: tiers, statuses, origin, evidence (sources, verification, completeness, review date),
  architecture implementation state, related projects, `published` toggle.
- Rewrote MenuWave and TotalCashPro case studies from repository evidence (domains, models, policies,
  middleware, tests, Flutter clients). ExamCell kept profile-based (repository empty).
- UniSecure moved out of the spotlight; labelled In Development; face verification marked planned.
- Added 51 catalogue projects; flagship order fixed in code: MenuWave → TotalCashPro → ExamCell.

### Experience
- /work rebuilt: editorial intro with data-derived count, flagship strip, searchable catalogue with category and
  technology filters, Editorial Grid and Technical Index views, shareable URL state.
- Server-rendered catalogue with a small client controller (no card hydration).
- Discipline-specific generative covers (planes, device, browser, graph, signal) until real screenshots exist.
- Case-study template: optional sections, origin note, stats, architecture diagram + explorer with
  implementation state and code locations, Evidence section, related projects.
- Architecture explorer: connection highlighting, Home/End keys, state badges.

### Quality
- Tests: 27 (content integrity, repository map both directions, flagship order, provenance, search/filters).
- Playwright QA: every sitemap route × 8 widths, internal link check, catalogue and explorer interactions.
- `npm run preview` now uses a Hostinger-like server (gzip, caching, fresh reads after rebuilds).
- `.htaccess`: explicit MIME types.
- Docs: ARCHITECTURE (rewritten), REPOSITORY-AUDIT, PROJECT-INVENTORY (generated), CONTENT-GAPS, QA-REPORT, CHANGELOG.

## 2026-11-08 — Performance pass
- Homepage Lighthouse (mobile) 79 → 98: lazy per-section GSAP islands, IntersectionObserver reveals,
  server components, idle-started Lenis, subset fonts.

## 2026-11-08 — Initial build
- Next.js static export, design system, 3D hero, homepage sections, case-study system, inner pages, SEO, Hostinger config.
