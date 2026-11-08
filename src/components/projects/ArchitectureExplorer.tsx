"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { ImplementationState, Project } from "@/types/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const stateLabel: Record<ImplementationState, string> = { implemented: "Implemented", planned: "Planned", experimental: "Experimental", unverified: "Unverified" };

/** Frontend → API → Services → Data → Infrastructure, inspectable layer by layer. */
export function ArchitectureExplorer({ projects, compact = false }: { projects: Project[]; compact?: boolean }) {
  const withArch = projects.filter((p) => p.architecture?.length);
  const [pi, setPi] = useState(0);
  const [li, setLi] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  const project = withArch[pi];
  const layers = project?.architecture ?? [];
  const layer = layers[li];

  useEffect(() => {
    if (!panel.current || prefersReducedMotion()) return;
    const t = gsap.fromTo(panel.current.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power3.out" });
    return () => { t.kill(); };
  }, [pi, li]);

  if (!project || !layer) return null;

  const onKey = (e: React.KeyboardEvent, count: number, set: (n: number) => void, cur: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); set((cur + 1) % count); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); set((cur - 1 + count) % count); }
    if (e.key === "Home") { e.preventDefault(); set(0); }
    if (e.key === "End") { e.preventDefault(); set(count - 1); }
  };

  return (
    <div data-architecture-explorer>
      {!compact && withArch.length > 1 && (
        <div role="tablist" aria-label="Choose a project" className="-mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-2">
          {withArch.map((p, i) => (
            <button key={p.slug} role="tab" aria-selected={i === pi} tabIndex={i === pi ? 0 : -1}
              onKeyDown={(e) => onKey(e, withArch.length, (n) => { setPi(n); setLi(0); }, pi)}
              onClick={() => { setPi(i); setLi(0); }}
              className={cn("min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors", i === pi ? "border-ink bg-ink text-paper" : "hairline bg-surface text-muted hover:text-ink")}>
              {p.name}{p.status === "In Development" && <span className="ml-1.5 font-mono text-[10px] opacity-70">· in dev</span>}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div role="tablist" aria-orientation="vertical" aria-label={`${project.name} architecture layers`} className="relative lg:col-span-5">
          {layers.map((l, i) => {
            const active = i === li;
            const linkedAbove = i === li - 1 || i === li; // connector from layer i to i+1 is lit if it touches the active layer
            return (
              <div key={l.id} className="relative">
                <button role="tab" id={`${id}-t${i}`} aria-controls={`${id}-panel`} aria-selected={active} tabIndex={active ? 0 : -1}
                  onKeyDown={(e) => onKey(e, layers.length, setLi, li)}
                  onClick={() => setLi(i)} onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setLi(i); }}
                  className={cn("relative z-10 flex w-full items-center gap-4 rounded-[var(--radius-md)] border p-3 text-left transition-all duration-300",
                    active ? "border-accent bg-surface shadow-soft" : "border-transparent hover:bg-surface/60")}>
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border font-mono text-[11px] transition-colors",
                    active ? "border-accent bg-accent text-paper" : "hairline bg-paper text-muted")}>{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{l.name}</span>
                    <span className="block truncate font-mono text-[10px] tracking-wider text-muted uppercase">{l.id}{l.state && l.state !== "implemented" ? ` · ${stateLabel[l.state]}` : ""}</span>
                  </span>
                </button>
                {i < layers.length - 1 && (
                  <span aria-hidden className={cn("ml-[27px] block h-3 w-px transition-colors duration-300", linkedAbove ? "bg-accent" : "bg-line")} />
                )}
              </div>
            );
          })}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-t${li}`} ref={panel}
          className="grid-paper scroll-mt-24 rounded-[var(--radius-lg)] border hairline bg-surface p-5 sm:p-10 lg:col-span-7">
          <p className="t-label">{project.name} · Layer {li + 1} of {layers.length}</p>
          <h3 className="t-title mt-3 flex flex-wrap items-center gap-3">
            {layer.name}
            {layer.state && (
              <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase",
                layer.state === "implemented" ? "border-emerald-600/25 bg-emerald-50 text-emerald-800" : "border-amber-600/30 bg-amber-50 text-amber-900")}>
                {stateLabel[layer.state]}
              </span>
            )}
          </h3>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted md:text-base">{layer.note}</p>
          {layer.items.length > 0 && (
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {layer.items.map((it) => (
                <li key={it} className="flex items-start gap-3 rounded-[var(--radius-sm)] border hairline bg-paper px-3 py-2.5 font-mono text-[13px] leading-relaxed md:text-xs">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />{it}
                </li>
              ))}
            </ul>
          )}
          {layer.evidence && <p className="mt-6 font-mono text-[10px] tracking-wide text-muted">Observed in · {layer.evidence}</p>}
        </div>
      </div>
    </div>
  );
}
