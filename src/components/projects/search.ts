import type { Project, ProjectCategory } from "@/types/content";

/** Lower-cased haystack per project: name, descriptions, technologies, categories and architecture keywords. */
export function buildSearchIndex(projects: Project[]): Map<string, string> {
  return new Map(projects.map((p) => [p.slug, [
    p.name, p.tagline, p.summary, p.highlight ?? "", p.role ?? "", p.status ?? "",
    ...p.technologies, ...p.categories, ...(p.modules ?? []),
    ...(p.architecture ?? []).flatMap((l) => [l.name, l.note, ...l.items]),
  ].join(" ").toLowerCase()]));
}

export interface Filters { q: string; category: ProjectCategory | "All"; tech: string | null }

const normTech = (t: string) => t.replace(/\s*\d+(\.\d+)?$/, "").replace(/ \(.*\)$/, "").toLowerCase();

/** Pure filter so it can be unit-tested. All terms in the query must match. */
export function filterProjects(projects: Project[], index: Map<string, string>, f: Filters): Project[] {
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);
  return projects.filter((p) =>
    (f.category === "All" || p.categories.includes(f.category)) &&
    (!f.tech || p.technologies.some((t) => normTech(t) === f.tech!.toLowerCase())) &&
    terms.every((t) => index.get(p.slug)!.includes(t)),
  );
}
