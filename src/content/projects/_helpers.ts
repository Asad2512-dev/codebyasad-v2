import type { Evidence, EvidenceSource } from "@/types/content";

export const GH = "https://github.com/Asad2512-dev";
export const REVIEWED = "2026-11-08";

/** Evidence entries for one or more repositories (repo + its docs/ARCHITECTURE.md). */
export function repoEvidence(repos: string[], opts: { publicRepos?: string[] } = {}): EvidenceSource[] {
  return repos.flatMap((r) => {
    const isPublic = opts.publicRepos?.includes(r);
    return [
      { label: isPublic ? `${r} — repository` : "Private repository", href: isPublic ? `${GH}/${r}` : undefined, kind: "repository" as const },
      { label: isPublic ? `${r} — docs/ARCHITECTURE.md` : "Architecture document (private repository)", href: isPublic ? `${GH}/${r}/blob/main/docs/ARCHITECTURE.md` : undefined, kind: "architecture-doc" as const },
    ];
  });
}

export const profileSource: EvidenceSource = {
  label: "Project inventory in GitHub profile README",
  href: `${GH}#project-portfolio`,
  kind: "profile",
};

export function evidence(sources: EvidenceSource[], verification: Evidence["verification"], completeness: Evidence["completeness"]): Evidence {
  return { sources, verification, completeness, lastReviewed: REVIEWED };
}
