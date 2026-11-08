"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { projects, categories } from "@/content/projects";
import type { ProjectCategory } from "@/types/content";
import { cn } from "@/lib/utils";

export function WorkIndex() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {(["All", ...categories] as const).map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
          return (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} disabled={count === 0}
              className={cn("min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors disabled:opacity-40",
                filter === c ? "border-ink bg-ink text-paper" : "hairline bg-surface text-muted hover:text-ink")}>
              {c} <span className="ml-1 font-mono text-[10px] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} projects shown</p>

      <ul className="mt-10 border-t hairline">
        {list.map((p) => (
          <li key={p.slug} className="border-b hairline">
            <Link href={`/work/${p.slug}/`} className="group grid items-baseline gap-2 py-7 md:grid-cols-12 md:gap-6">
              <span className="font-mono text-xs text-accent md:col-span-1">{p.index}</span>
              <span className="md:col-span-4">
                <span className="font-display text-3xl transition-colors group-hover:text-accent md:text-4xl">{p.name}</span>
                {p.featured && <span className="ml-3 align-middle font-mono text-[10px] tracking-wider text-muted uppercase">Featured</span>}
              </span>
              <span className="text-muted md:col-span-4">{p.tagline}</span>
              <span className="flex items-center justify-between gap-4 font-mono text-[11px] text-muted md:col-span-3">
                <span>{p.categories.join(" · ")}</span>
                <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
