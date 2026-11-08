import localFont from "next/font/local";

/**
 * All fonts are self-hosted (SIL Open Font License 1.1).
 * Geist and Geist Mono are Latin subsets limited to weights 400–600
 * (scripts/subset-fonts.sh): 17 kB + 13.5 kB. Those and the display serif are
 * preloaded; the italic serif loads on demand.
 */
export const GeistSans = localFont({
  src: "../styles/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "400 600",
  display: "swap",
  preload: true,
});

export const GeistMono = localFont({
  src: "../styles/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "400 600",
  display: "swap",
  preload: true,
});

export const display = localFont({
  src: "../styles/InstrumentSerif-Regular.woff2",
  variable: "--font-display",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
});

export const displayItalic = localFont({
  src: "../styles/InstrumentSerif-Italic.woff2",
  variable: "--font-display-italic",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
});
