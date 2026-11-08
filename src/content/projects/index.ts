import type { Project, ProjectCategory } from "@/types/content";
import { menuwave } from "./menuwave";
import { totalcashpro } from "./totalcashpro";
import { examcell } from "./examcell";
import { unisecure } from "./unisecure";
import { clubsync, biterush, evm, supervisorAllocation, voiceLibrary } from "./others";

/** Order here = order on the site. */
export const projects: Project[] = [menuwave, totalcashpro, examcell, unisecure, clubsync, biterush, evm, supervisorAllocation, voiceLibrary];

export const featuredProjects = projects.filter((p) => p.featured);
export const categories: ProjectCategory[] = ["Web", "Mobile", "SaaS", "Backend", "AI", "Other"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
