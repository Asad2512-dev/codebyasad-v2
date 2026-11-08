# Mobile design system

Rules the mobile experience follows. Desktop tokens (colours, fonts, radii, motion timings) are unchanged and live in
`src/config/theme.ts` / `src/config/motion.ts`; this document covers the mobile-specific layer.

## Breakpoints and composition

| Range | Composition |
|---|---|
| < 640 px (phones) | Single column. Hero: identity → headline → copy → primary CTA (full width) → secondary CTAs (shared row) → framed 3D stage + layer legend → scroll cue. Catalogue cards one per row. |
| 640–1023 px (large phones, tablets) | Two-column card grids; hero stays stacked, stage 16:10. |
| Short landscape (`short:` variant — height ≤ 520 px, landscape, < 1024 px) | Two-column hero: copy + compact identity line left, 3D stage right; headline sized from viewport height; legend hidden. |
| Short portrait (`shortp:` variant — height ≤ 700 px) | Tighter hero spacing so the primary CTA stays on the first screen (e.g. 320×568). |
| ≥ 1024 px | Desktop: pinned, scroll-scrubbed cinematic hero; editorial layouts. |

Custom variants are declared in `src/styles/globals.css` (`@custom-variant short`, `shortp`).

## Typography
- Hero headline: `clamp(2.75rem, 11.2vw, 7.25rem)` on phones; `clamp(3.5rem, 8vw, 7.25rem)` ≥ 640 px; `clamp(1.8rem, 8.4vh, 3rem)` in short landscape.
- Body copy ≥ 16 px below 1024 px (`text-base lg:text-sm` pattern). Monospace labels and metadata (stack lists, “Observed in”, counters) may be 10–13 px.
- `text-pretty` / `text-balance` on headings and lead paragraphs to avoid orphans.

## Spacing rhythm
- Sections: `py-16` on phones, `md:py-32/36` on larger screens (was `py-24` everywhere).
- Gutter: `max(clamp(1.25rem, 4vw, 3.5rem), env(safe-area-inset-left/right))`.
- Case-study blocks: `py-12` / `gap-4` on phones.

## Touch
- Minimum hit area 44 × 44 px on every link, button, chip and tab (`min-h-11`, `h-11 lg:h-9`). Inline links in prose excepted.
- Pressed state: `active:scale-[.97–.985]` on buttons, chips and cards; no grey tap flash (`-webkit-tap-highlight-color: transparent`), `touch-action: manipulation`.
- No hover-only information: card highlights, filters and architecture details are always visible or tappable.
- Horizontal scrollers (category and technology chips) bleed to the screen edge with a trailing fade (`.edge-fade`).

## Viewport and safe areas
- `viewport-fit=cover`; header padded with `env(safe-area-inset-top)`, footer with `env(safe-area-inset-bottom)`, menu overlay with both.
- `100dvh` for the desktop pinned stage; phones use natural height (no `100vh` traps).
- `scroll-padding-top` so anchored sections clear the fixed header.

## Navigation
- Compact 56 px header with monogram + name; “Menu” text + two-line icon (animates to ×).
- Full-screen overlay: clip-path reveal and staggered link rise (GSAP, built lazily on first open; skipped under reduced motion),
  numbered links Home → Lab, active route in accent italic + dot, Resume / Let’s talk buttons, socials, location.
- `role="dialog"`, `aria-modal`, focus moved to first link, Tab trapped, Escape closes, focus returns to the trigger,
  background `inert`, scroll locked (Lenis stopped), closes on navigation, back/forward and rotation to desktop width.

## Motion (mobile)
- `gsap.matchMedia()` separates desktop and mobile timelines (`src/components/animation/fx.ts`).
- Phones: no pinning. The 3D stack opens gently as its frame scrolls through the viewport; project stages use a short
  clip-path reveal and a 28 px rise instead of 3D tilts and parallax numerals.
- Hero text and CTAs animate with CSS only; nothing waits for JavaScript.
- `prefers-reduced-motion`: no WebGL, no Lenis, no GSAP, no scroll cue animation; all content visible.

## 3D on phones
- Framed stage (5:4, ≤ 46 svh) with the camera pulled back on narrow stages so the opened stack stays whole.
- Lite tier: fewer nodes, no shadows/antialiasing, DPR ≤ 1.25; loads on first touch/scroll; SVG fallback first.

## Architecture diagrams
- Phones: `ArchitectureStack` — HTML layer cards with flow arrows, full component lists at 15 px, implementation state.
- ≥ 768 px: the SVG diagram. Both are followed by the keyboard-accessible explorer.
