import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: "website", locale: site.locale, images: ["/og.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
