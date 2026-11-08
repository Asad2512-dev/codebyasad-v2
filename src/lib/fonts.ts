import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/** Instrument Serif — SIL Open Font License 1.1, self-hosted. */
export const display = localFont({
  src: [
    { path: "../styles/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../styles/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export { GeistSans, GeistMono };
