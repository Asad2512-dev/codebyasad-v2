import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about/", "work/", "experience/", "expertise/", "lab/", "resume/", "contact/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}/${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}/`, changeFrequency: "monthly" as const, priority: p.tier === "flagship" ? 0.9 : p.tier === "featured" ? 0.7 : 0.5 })),
  ];
}
