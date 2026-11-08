/**
 * DESIGN TOKENS — single source of truth.
 * Change a value here and it updates the CSS variables, Tailwind utilities
 * and the 3D scene materials. No component edits required.
 */
export const colors = {
  paper: "#F8F8F5", // primary background
  surface: "#FFFFFF", // secondary background (cards, panels)
  ink: "#16191D", // primary text
  muted: "#626970", // secondary text
  accent: "#265DDE", // primary accent
  accentSoft: "#DCE8FF", // secondary accent
  line: "#E5E7EB", // borders and hairlines
} as const;

export const radii = { sm: "6px", md: "12px", lg: "20px", pill: "999px" } as const;

export const shadows = {
  soft: "0 1px 2px rgba(22,25,29,.04), 0 8px 24px -12px rgba(22,25,29,.12)",
  lift: "0 2px 4px rgba(22,25,29,.04), 0 24px 48px -24px rgba(22,25,29,.22)",
} as const;

export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 } as const;

/** Rendered into :root by the root layout. */
export function themeCssVariables(): string {
  const v: Record<string, string> = {
    "--paper": colors.paper,
    "--surface": colors.surface,
    "--ink": colors.ink,
    "--muted": colors.muted,
    "--accent": colors.accent,
    "--accent-soft": colors.accentSoft,
    "--line": colors.line,
    "--radius-sm": radii.sm,
    "--radius-md": radii.md,
    "--radius-lg": radii.lg,
    "--shadow-soft": shadows.soft,
    "--shadow-lift": shadows.lift,
  };
  return `:root{${Object.entries(v).map(([k, val]) => `${k}:${val}`).join(";")}}`;
}
