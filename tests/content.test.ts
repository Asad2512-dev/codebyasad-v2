import { describe, expect, it } from "vitest";
import { allProjects, projects, featuredProjects, FLAGSHIP_ORDER, categories, technologyFilters, projectCount } from "@/content/projects";
import { repositoryMap } from "@/content/repository-map";
import { stats } from "@/content/achievements";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import type { ProjectCategory } from "@/types/content";

const VALID_CATEGORIES: ProjectCategory[] = ["SaaS", "Web", "Mobile", "Backend", "AI", "Enterprise", "Research", "Tools"];

describe("project inventory", () => {
  it("has unique slugs that are URL-safe", () => {
    const slugs = allProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it("has no duplicate project names", () => {
    const names = allProjects.map((p) => p.name.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it("features MenuWave, TotalCashPro, ExamCell — in that order", () => {
    expect(featuredProjects.map((p) => p.slug)).toEqual([...FLAGSHIP_ORDER]);
    expect(projects.slice(0, 3).map((p) => p.slug)).toEqual(["menuwave", "totalcashpro", "examcell"]);
  });

  it("never features UniSecure first and keeps it labelled in development", () => {
    const u = projects.find((p) => p.slug === "unisecure")!;
    expect(projects[0].slug).not.toBe("unisecure");
    expect(u.tier).not.toBe("flagship");
    expect(u.status).toBe("In Development");
  });

  it("uses only valid categories and every project has at least one", () => {
    allProjects.forEach((p) => {
      expect(p.categories.length).toBeGreaterThan(0);
      p.categories.forEach((c) => expect(VALID_CATEGORIES).toContain(c));
    });
    categories.forEach((c) => expect(VALID_CATEGORIES).toContain(c));
  });

  it("has the required content on every published project", () => {
    projects.forEach((p) => {
      expect(p.name.length, p.slug).toBeGreaterThan(1);
      expect(p.tagline.length, p.slug).toBeGreaterThan(10);
      expect(p.summary.length, p.slug).toBeGreaterThan(30);
      expect(p.evidence.sources.length, p.slug).toBeGreaterThan(0);
      expect(p.evidence.lastReviewed, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("only offers technology filters that real projects use", () => {
    technologyFilters.forEach((t) => expect(projects.filter((p) => p.technologies.some((x) => x.startsWith(t))).length).toBeGreaterThanOrEqual(2));
  });

  it("resolves every related-project reference", () => {
    const slugs = new Set(allProjects.map((p) => p.slug));
    allProjects.forEach((p) => (p.related ?? []).forEach((r) => expect(slugs.has(r), `${p.slug} → ${r}`).toBe(true)));
  });

  it("uses https or mailto for every external link", () => {
    const links = [...profile.socials.map((s) => s.href), ...allProjects.flatMap((p) => [p.links.live, p.links.repo, ...p.evidence.sources.map((s) => s.href)])].filter(Boolean) as string[];
    links.forEach((l) => expect(l).toMatch(/^(https:\/\/|mailto:)/));
  });

  it("does not ship placeholder screenshots", () => {
    allProjects.forEach((p) => p.screenshots.forEach((s) => { expect(s.src).toMatch(/^\/images\/projects\//); expect(s.alt.length).toBeGreaterThan(10); }));
  });

  it("marks customised third-party bases honestly", () => {
    ["biterush", "gobirr"].forEach((slug) => expect(allProjects.find((p) => p.slug === slug)!.origin).toBe("customised"));
  });

  it("does not claim planned architecture as implemented", () => {
    const u = allProjects.find((p) => p.slug === "unisecure")!;
    const face = u.architecture!.find((l) => l.items.some((i) => i.includes("FaceVerification")))!;
    expect(face.state).toBe("planned");
  });

  it("exposes a project count derived from data", () => {
    expect(projectCount).toBe(projects.length);
    expect(projectCount).toBeGreaterThan(40);
  });
});

describe("repository map", () => {
  it("covers all 95 audited repositories exactly once", () => {
    expect(repositoryMap).toHaveLength(95);
    const names = repositoryMap.map((r) => r.name.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it("points every project repository at an existing project (no orphans)", () => {
    const slugs = new Set(allProjects.map((p) => p.slug));
    repositoryMap.filter((r) => r.classification === "project").forEach((r) => expect(slugs.has(r.project!), r.name).toBe(true));
    repositoryMap.filter((r) => r.classification !== "project").forEach((r) => { expect(r.project, r.name).toBeNull(); expect(r.note, r.name).toBeTruthy(); });
  });

  it("agrees with each project's repo list in both directions", () => {
    const byName = new Map(repositoryMap.map((r) => [r.name, r]));
    allProjects.forEach((p) => p.repos.forEach((r) => expect(byName.get(r)?.project, `${p.slug} lists ${r}`).toBe(p.slug)));
    repositoryMap.filter((r) => r.project).forEach((r) => expect(allProjects.find((p) => p.slug === r.project)!.repos, r.name).toContain(r.name));
  });
});

describe("profile content", () => {
  it("every stat is verified or explicitly self-reported", () => {
    stats.forEach((s) => expect(["verified", "reported", "pending"]).toContain(s.status));
  });

  it("experience dates are well-formed and chronological", () => {
    experience.forEach((r) => { expect(r.start).toMatch(/^\d{4}(-\d{2})?$/); if (r.end !== "present") expect(r.end >= r.start).toBe(true); });
  });

  it("never displays salary expectations", () => {
    expect(JSON.stringify({ profile, allProjects, experience })).not.toMatch(/salary|\$\d|PKR|per annum/i);
  });
});
