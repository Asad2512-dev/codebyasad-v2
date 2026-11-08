# Changelog

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
