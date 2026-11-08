import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectMedia } from "./ProjectMedia";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Editorial-grid card. Hover depth is applied by ProjectCardMotion on pointer devices only. */
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article data-card className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:border-ink/25 hover:shadow-lift active:scale-[.985] has-[:focus-visible]:border-accent">
      <ProjectMedia project={p} className="aspect-[16/10] border-b hairline" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] tracking-wider text-muted uppercase">{p.categories.slice(0, 2).join(" · ")}</span>
          {p.status && <StatusBadge status={p.status} />}
          {p.origin === "customised" && <span className="font-mono text-[10px] tracking-wider text-muted uppercase">· Customised</span>}
        </div>
        <h3 className="mt-3 font-display text-[1.75rem] leading-tight">
          <Link href={`/work/${p.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">{p.name}</Link>
        </h3>
        <p className="mt-2 text-base leading-relaxed text-muted lg:text-sm">{p.tagline}</p>
        {p.highlight && <p className="mt-4 border-l-2 border-accent/50 pl-3 text-[15px] leading-relaxed lg:text-[13px]" data-card-meta>{p.highlight}</p>}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.technologies.slice(0, 4).map((t) => <li key={t} className="rounded-full border hairline px-2 py-0.5 font-mono text-[10px] text-muted">{t}</li>)}
          </ul>
          <ArrowUpRight aria-hidden className="size-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
      </div>
    </article>
  );
}
