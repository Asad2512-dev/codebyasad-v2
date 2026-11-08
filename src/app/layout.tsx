import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { display, displayItalic, GeistSans, GeistMono } from "@/lib/fonts";
import { themeCssVariables, colors } from "@/config/theme";
import { site } from "@/config/site";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { RevealRoot } from "@/components/animation/RevealRoot";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.shortName}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: site.url + "/" },
  openGraph: { type: "website", url: site.url, title: site.title, description: site.description, siteName: site.name, locale: site.locale, images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/asad-icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/brand/asad-icon.png",
  },
};

export const viewport: Viewport = { themeColor: colors.paper, width: "device-width", initialScale: 1, viewportFit: "cover" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.currentCompany },
  url: site.url,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Multan", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "National University of Modern Languages (NUML)" },
  sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  knowsAbout: ["Product design", "UX/UI design", "Design systems", "React", "Next.js", "TypeScript", "Node.js", "Laravel", "Flutter", "MySQL", "PostgreSQL", "AWS", "Docker"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${displayItalic.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCssVariables() }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <RevealRoot />
      </body>
    </html>
  );
}
