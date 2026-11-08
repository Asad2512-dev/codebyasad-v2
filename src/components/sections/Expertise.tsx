"use client";
import { useState } from "react";
import { skillGroups } from "@/content/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

/** A technical atlas: six territories; the active one expands to show its tools and where they were used. */
export function Expertise({ showHeader = true }: { showHeader?: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <section aria-labelledby="expertise-title" className="border-t hairline bg-surface py-24 md:py-36">
      <div className="container-x">
        {showHeader && <SectionHeader index="06" label="Technology expertise" title="A working atlas, not a logo wall." />}
        <h3 id="expertise-title" className="sr-only">Expertise areas</h3>
        <ul className="mt-14 grid border-t border-l hairline sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const on = i === active;
            return (
              <li key={g.id} className="border-r border-b hairline" data-reveal>
                <button type="button" aria-expanded={on} onClick={() => setActive(i)}
                  onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setActive(i); }}
                  onFocus={() => setActive(i)}
                  className={cn("group relative block h-full w-full p-6 text-left transition-colors duration-500 sm:p-8", on ? "bg-paper" : "hover:bg-paper/50")}>
                  <span className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                    <span aria-hidden className={cn("h-px bg-accent transition-all duration-500", on ? "w-16" : "w-4")} />
                  </span>
                  <span className="mt-8 block font-display text-3xl">{g.title}</span>
                  <span className="mt-2 block text-sm text-muted">{g.summary}</span>
                  <span className={cn("grid transition-[grid-template-rows] duration-500", on ? "grid-rows-[1fr]" : "grid-rows-[0fr] lg:grid-rows-[1fr]")}>
                    <span className="overflow-hidden">
                      <span className="flex flex-wrap gap-1.5 pt-6">
                        {g.skills.map((s) => (
                          <span key={s} className={cn("rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors duration-500", on ? "border-accent/40 bg-accent-soft/50 text-ink" : "hairline text-muted")}>{s}</span>
                        ))}
                      </span>
                      <span className="mt-5 block font-mono text-[10px] tracking-wider text-muted uppercase">Used in · {g.usedIn.join(" · ")}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
