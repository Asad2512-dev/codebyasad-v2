import type { Project, ProjectCategory } from "@/types/content";
import { menuwave } from "./menuwave";
import { totalcashpro } from "./totalcashpro";
import { examcell } from "./examcell";
import { unisecure } from "./unisecure";
import { catalog } from "./catalog";

/** Homepage flagship order — change here to reorder. */
export const FLAGSHIP_ORDER = ["menuwave", "totalcashpro", "examcell"] as const;

// UniSecure is listed after the catalogue so it never leads the featured tier (still in development).
const all: Project[] = [menuwave, totalcashpro, examcell, ...catalog, unisecure];

const tierRank = { flagship: 0, featured: 1, catalog: 2 } as const;
const flagshipRank = (slug: string) => {
  const i = (FLAGSHIP_ORDER as readonly string[]).indexOf(slug);
  return i === -1 ? 99 : i;
};

/** Every project including unpublished — for audits and tests only. */
export const allProjects = all;

/** Published projects in display order: flagships (fixed order), featured, then catalogue. Stable within tiers. */
export const projects: Project[] = all
  .filter((p) => p.published)
  .map((p, i) => ({ p, i }))
  .sort((a, b) => tierRank[a.p.tier] - tierRank[b.p.tier] || flagshipRank(a.p.slug) - flagshipRank(b.p.slug) || a.i - b.i)
  .map(({ p }) => p);

export const featuredProjects = projects.filter((p) => p.tier === "flagship");
export const projectCount = projects.length;

const CATEGORY_ORDER: ProjectCategory[] = ["SaaS", "Web", "Mobile", "Backend", "AI", "Enterprise", "Research", "Tools"];
/** Categories actually used by published projects. */
export const categories: ProjectCategory[] = CATEGORY_ORDER.filter((c) => projects.some((p) => p.categories.includes(c)));

/** Technologies used by at least two published projects, most common first. */
export const technologyFilters: string[] = (() => {
  const norm = (t: string) => t.replace(/\s*\d+(\.\d+)?$/, "").replace(/ \(.*\)$/, "");
  const counts = new Map<string, number>();
  projects.forEach((p) => new Set(p.technologies.map(norm)).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  return [...counts].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).map(([t]) => t);
})();

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function relatedProjects(p: Project): Project[] {
  return (p.related ?? []).map(getProject).filter((x): x is Project => Boolean(x));
}
