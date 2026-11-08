import Link from "next/link";
import type { Project } from "@/types/content";
import { ProjectCard } from "./ProjectCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CatalogueControls } from "./CatalogueControls";

/**
 * Server-rendered catalogue: both views ship as static HTML with data-slug on every item.
 * CatalogueControls (a small client island) only toggles visibility — React never hydrates the 50+ cards.
 */
export function Catalogue({ projects }: { projects: Project[] }) {
  return (
    <div data-catalogue>
      <CatalogueControls />

      <div data-view-panel="grid" className="mt-6" style={{ perspective: "1200px" }}>
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => <li key={p.slug} data-slug={p.slug}><ProjectCard project={p} /></li>)}
        </ul>
      </div>

      <div data-view-panel="index" hidden className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border hairline bg-surface">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Technical index of projects</caption>
          <thead className="hidden border-b hairline bg-paper md:table-header-group">
            <tr className="font-mono text-[10px] tracking-wider text-muted uppercase">
              <th scope="col" className="px-5 py-3 font-normal">Project</th>
              <th scope="col" className="px-3 py-3 font-normal">Category</th>
              <th scope="col" className="px-3 py-3 font-normal">Stack</th>
              <th scope="col" className="px-3 py-3 font-normal">Status</th>
              <th scope="col" className="px-5 py-3 text-right font-normal">Repos</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.slug} data-slug={p.slug} className="group relative block border-b hairline last:border-0 hover:bg-paper md:table-row">
                <td className="block px-5 pt-4 md:table-cell md:py-4">
                  <Link href={`/work/${p.slug}/`} className="font-medium after:absolute after:inset-0 group-hover:text-accent">{p.name}</Link>
                  <span className="mt-0.5 block text-[13px] text-muted md:max-w-xs md:truncate">{p.tagline}</span>
                </td>
                <td className="block px-5 pt-2 font-mono text-[11px] text-muted md:table-cell md:px-3 md:py-4">{p.categories.join(" · ")}</td>
                <td className="block px-5 pt-1 font-mono text-[11px] md:table-cell md:max-w-[22rem] md:px-3 md:py-4">{p.technologies.slice(0, 5).join(", ") || "—"}</td>
                <td className="inline-block px-5 pt-2 pb-4 md:table-cell md:px-3 md:py-4">{p.status ? <StatusBadge status={p.status} /> : <span className="text-muted">—</span>}</td>
                <td className="inline-block pb-4 font-mono text-[11px] text-muted md:table-cell md:px-5 md:py-4 md:text-right">{p.repos.length || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div data-empty hidden className="mt-6 rounded-[var(--radius-lg)] border border-dashed hairline p-12 text-center">
        <p className="font-display text-3xl">Nothing matches that yet.</p>
        <p className="mt-2 text-base text-muted">Try another technology or clear the filters.</p>
      </div>
    </div>
  );
}
