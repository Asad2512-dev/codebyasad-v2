/**
 * Regenerates docs/PROJECT-INVENTORY.md and docs/REPOSITORY-AUDIT.md from the content data,
 * so the documentation can never drift from what the site renders.
 *   npm run docs:inventory
 */
import { writeFileSync } from "node:fs";
import { allProjects } from "../src/content/projects";
import { repositoryMap } from "../src/content/repository-map";

const GH = "https://github.com/Asad2512-dev";
const pub = allProjects.filter((p) => p.published);
const cats = ["SaaS", "Web", "Mobile", "Backend", "AI", "Enterprise", "Research", "Tools"] as const;
const repoLink = (r: string) => { const rec = repositoryMap.find((x) => x.name === r); return rec?.visibility === "public" ? `[${r}](${GH}/${r})` : "🔒 private"; };
const conf = (p: (typeof pub)[number]) => (p.repos.length === 0 ? "Low — profile only" : p.repos.length > 1 ? (p.pending.some((x) => /part of this project/.test(x)) ? "Medium" : "High") : "High");

let inv = `# Project inventory

_Generated from \`src/content/projects\` by \`npm run docs:inventory\` — do not edit by hand._
_Evidence reviewed: ${pub[0].evidence.lastReviewed}._

**${pub.length} published projects** reconciled from ${repositoryMap.length} repositories plus the GitHub profile README.
The brief targets 41; the evidence supports ${pub.length} distinct projects — see “Reconciliation” in REPOSITORY-AUDIT.md.

| Tier | Count |
|---|---|
| Flagship | ${pub.filter((p) => p.tier === "flagship").length} |
| Featured | ${pub.filter((p) => p.tier === "featured").length} |
| Catalogue | ${pub.filter((p) => p.tier === "catalog").length} |

| Category | Projects |
|---|---|
${cats.map((c) => `| ${c} | ${pub.filter((p) => p.categories.includes(c)).length} |`).join("\n")}

## All projects

| # | Project | Tier | Categories | Stack | Status | Origin | Repositories | Live | Screenshots | Evidence | Mapping confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
`;
pub.forEach((p, i) => {
  inv += `| ${i + 1} | [${p.name}](https://codebyasad.com/work/${p.slug}/) | ${p.tier} | ${p.categories.join(", ")} | ${p.technologies.join(", ") || "—"} | ${p.status ?? "—"} | ${p.origin} | ${p.repos.map(repoLink).join(", ") || "—"} | ${p.links.live ?? "—"} | ${p.screenshots.length} | ${p.evidence.verification} / ${p.evidence.completeness} | ${conf(p)} | ${p.pending.join("; ") || "—"} |\n`;
});
writeFileSync("docs/PROJECT-INVENTORY.md", inv);

const cls = (c: string) => repositoryMap.filter((r) => r.classification === c);
let audit = `# Repository audit

_Generated from \`src/content/repository-map.ts\` by \`npm run docs:inventory\`._

**Scope:** all ${repositoryMap.length} repositories visible for github.com/Asad2512-dev on 2026-11-08
(${repositoryMap.filter((r) => r.visibility === "public").length} public, ${repositoryMap.filter((r) => r.visibility === "private").length} private).

**Method:** private repositories were attached to the build session read-only and read through the GitHub REST API
(metadata, \`docs/ARCHITECTURE.md\`, README, root manifests, full file tree, Android/iOS app labels); public repositories
were read with shallow, blob-less git clones. Every default branch's \`docs/ARCHITECTURE.md\` was retrieved (${repositoryMap.length}/${repositoryMap.length}).
Technologies come from \`composer.json\`, \`package.json\`, \`pubspec.yaml\`, \`requirements.txt\` and the architecture docs.
No credentials were printed or committed. Private repositories appear under neutral aliases; real names are kept in a local, git-ignored file.

| Result | Count |
|---|---|
| Architecture docs read | ${repositoryMap.length} |
| — substantive | ${repositoryMap.filter((r) => r.architectureDoc === "substantive").length} |
| — stub (README-only repo) | ${repositoryMap.filter((r) => r.architectureDoc === "stub").length} |
| — empty repository | ${repositoryMap.filter((r) => r.architectureDoc === "empty-repo").length} |
| Repositories mapped to projects | ${cls("project").length} |
| Distinct projects with repositories | ${new Set(cls("project").map((r) => r.project)).size} |
| Learning / practice | ${cls("learning").length} |
| Assessment tasks | ${cls("assessment").length} |
| Forks | ${cls("fork").length} |
| Third-party / not original | ${cls("third-party").length} |
| Unpublished pending confirmation | ${cls("unpublished").length} |
| Profile | ${cls("profile").length} |

## Reconciliation (target: 41 projects)

- **${new Set(cls("project").map((r) => r.project)).size} distinct projects** are backed by repositories after grouping multi-repo products
  (MenuWave ×4, BiteRush ×5, CoreSY ×6, Tangled Synapses ×6, LabelBuddy ×2, BuildExa ×2, WeCare ×2, GreenGuide ×2, Flames & Shakes ×2, GoBirr ×2, Mood Panda ×2, Askio AI ×2, CodeByAsad ×2).
- **${pub.filter((p) => p.repos.length === 0).length} more** are listed in the profile README without a repository (EVM, Supervisor Allocation, Pak Enterprises Tiles, Dr. Farhan Siddique, RCR-DeepFake, FreqKAN).
- **ExamCell** (flagship) maps to a private repository whose default branch is empty — the case study uses profile content only.
- **Total published: ${pub.length}.** Nothing in the evidence justifies removing exactly ${pub.length - 41}; to reach 41, set \`published: false\` on entries in \`src/content/projects/catalog.ts\` (candidates are listed in CONTENT-GAPS.md).
- **Provenance flags:** BiteRush (6amMart base) and GoBirr (eDemand rebrand) are labelled “customised”; two private repositories (an adapted copy of an open-source project and a third-party commercial codebase) are excluded as not original work.
- Profile apps without repositories: Smart Cubz, Urdu Poetry, Campus Ride — not published (no description to show).

## Repositories

| Repository | Default branch | Architecture doc | Technologies | Associated project | Status |
|---|---|---|---|---|---|
`;
repositoryMap.forEach((r) => {
  audit += `| ${r.visibility === "public" ? `[${r.name}](${GH}/${r.name})` : `🔒 ${r.name}`} | ${r.defaultBranch} | ${r.architectureDoc} | ${r.technologies.join(", ") || "—"} | ${r.project ?? "—"} | ${r.classification}${r.note ? ` — ${r.note}` : ""} |\n`;
});
writeFileSync("docs/REPOSITORY-AUDIT.md", audit);
console.log(`wrote docs/PROJECT-INVENTORY.md (${pub.length} projects) and docs/REPOSITORY-AUDIT.md (${repositoryMap.length} repositories)`);
