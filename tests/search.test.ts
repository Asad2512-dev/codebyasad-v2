import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { buildSearchIndex, filterProjects } from "@/components/projects/search";

const index = buildSearchIndex(projects);
const run = (q: string, category: Parameters<typeof filterProjects>[2]["category"] = "All", tech: string | null = null) =>
  filterProjects(projects, index, { q, category, tech }).map((p) => p.slug);

describe("project search & filters", () => {
  it("returns everything with no filters", () => expect(run("")).toHaveLength(projects.length));
  it("matches names case-insensitively", () => expect(run("menuwave")).toContain("menuwave"));
  it("matches architecture keywords", () => expect(run("tenantscope")).toEqual(["menuwave"]));
  it("requires every term to match", () => {
    expect(run("laravel stripe")).toEqual(expect.arrayContaining(["menuwave", "totalcashpro", "labelbuddy"]));
    expect(run("laravel stripe")).not.toContain("clubsync");
  });
  it("filters by category", () => run("", "Research").forEach((s) => expect(projects.find((p) => p.slug === s)!.categories).toContain("Research")));
  it("filters by technology, ignoring version suffixes", () => {
    const flutter = run("", "All", "Flutter");
    expect(flutter).toEqual(expect.arrayContaining(["menuwave", "coresy", "beyond-today"]));
    expect(run("", "All", "Laravel")).toContain("menuwave"); // tech listed as "Laravel 13"
  });
  it("combines search, category and technology", () => expect(run("delivery", "Mobile", "Flutter")).toContain("biterush"));
  it("returns an empty list for nonsense", () => expect(run("zzqqxx")).toHaveLength(0));
});
