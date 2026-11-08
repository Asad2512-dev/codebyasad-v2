import { describe, expect, it } from "vitest";
import { projects, featuredProjects } from "@/content/projects";
import { stats } from "@/content/achievements";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

describe("content integrity", () => {
  it("project slugs are unique and URL-safe", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it("features exactly the three flagship projects", () => {
    expect(featuredProjects.map((p) => p.slug)).toEqual(["menuwave", "totalcashpro", "examcell"]);
  });

  it("never states an unverified stack as fact", () => {
    for (const p of projects) {
      if (p.technologies.status === "pending") expect(p.technologies.items).toHaveLength(0);
    }
  });

  it("does not ship placeholder screenshots", () => {
    for (const p of projects) for (const s of p.screenshots) {
      expect(s.src).toMatch(/^\/images\//);
      expect(s.alt.length).toBeGreaterThan(10);
    }
  });

  it("every stat is verified or explicitly self-reported", () => {
    for (const s of stats) expect(["verified", "reported", "pending"]).toContain(s.status);
  });

  it("external links use https or mailto", () => {
    const links = [
      ...profile.socials.map((s) => s.href),
      ...projects.flatMap((p) => [p.links.live, p.links.repo]).filter(Boolean) as string[],
    ];
    links.forEach((l) => expect(l).toMatch(/^(https:\/\/|mailto:)/));
  });

  it("experience dates are well-formed and chronological within each role", () => {
    for (const r of experience) {
      expect(r.start).toMatch(/^\d{4}(-\d{2})?$/);
      if (r.end !== "present") expect(r.end >= r.start).toBe(true);
    }
  });

  it("never displays salary expectations", () => {
    const blob = JSON.stringify({ profile, projects, experience });
    expect(blob).not.toMatch(/salary|\$\d|PKR|per annum/i);
  });
});
