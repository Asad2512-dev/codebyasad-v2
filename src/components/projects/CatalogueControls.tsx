"use client";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { projects, categories, technologyFilters } from "@/content/projects";
import type { ProjectCategory } from "@/types/content";
import { buildSearchIndex, filterProjects } from "./search";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type View = "grid" | "index";
const catalogue = projects.filter((p) => p.tier !== "flagship");
const TECH_VISIBLE = 10;
let index: Map<string, string> | null = null; // built lazily on first search

export function CatalogueControls() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [tech, setTech] = useState<string | null>(null);
  const [view, setView] = useState<View>("grid");
  const [allTech, setAllTech] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search projects, stacks, architecture");
  const deferredQ = useDeferredValue(q);
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Restore shareable filters from the URL once.
  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) setPlaceholder("Search by name, technology or architecture — e.g. “Laravel Stripe”");
    const u = new URLSearchParams(window.location.search);
    const c = (u.get("category") ?? "All") as ProjectCategory | "All";
    if (u.get("q")) setQ(u.get("q")!);
    if (u.get("tech")) setTech(u.get("tech"));
    if (u.get("view") === "index") setView("index");
    if (c === "All" || categories.includes(c)) setCategory(c);
  }, []);

  const visible = useMemo(() => {
    if (!deferredQ && category === "All" && !tech) return null; // null = everything
    index ??= buildSearchIndex(catalogue);
    return new Set(filterProjects(catalogue, index, { q: deferredQ, category, tech }).map((p) => p.slug));
  }, [deferredQ, category, tech]);
  const shown = visible ? visible.size : catalogue.length;

  // Apply to the server-rendered DOM.
  useEffect(() => {
    const root = ref.current?.closest("[data-catalogue]");
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-view-panel]").forEach((el) => { el.hidden = el.dataset.viewPanel !== view || shown === 0; });
    (root.querySelector("[data-empty]") as HTMLElement).hidden = shown !== 0;
    const items = root.querySelectorAll<HTMLElement>("[data-slug]");
    items.forEach((el) => { el.hidden = Boolean(visible && !visible.has(el.dataset.slug!)); });

    const u = new URLSearchParams();
    if (q) u.set("q", q);
    if (category !== "All") u.set("category", category);
    if (tech) u.set("tech", tech);
    if (view !== "grid") u.set("view", view);
    const s = u.toString();
    window.history.replaceState(null, "", s ? `?${s}#catalogue` : window.location.pathname + window.location.hash);

    if (first.current) { first.current = false; return; } // no entrance animation on load
    if (prefersReducedMotion()) return;
    const panel = root.querySelector<HTMLElement>(`[data-view-panel="${view}"]`);
    const targets = panel ? [...panel.querySelectorAll<HTMLElement>("[data-slug]:not([hidden])")].slice(0, 18) : [];
    gsap.fromTo(targets, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.025, ease: "power3.out", clearProps: "opacity,transform" });
  }, [visible, view, shown, q, category, tech]);

  // Pointer-only card depth (one delegated listener on the grid).
  useEffect(() => {
    const grid = ref.current?.closest("[data-catalogue]")?.querySelector<HTMLElement>('[data-view-panel="grid"]');
    if (!grid || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      gsap.to(card, { rotateX: ((e.clientY - r.top) / r.height - 0.5) * -3, rotateY: ((e.clientX - r.left) / r.width - 0.5) * 4, y: -4, duration: 0.5, ease: "power3.out", transformPerspective: 900 });
    };
    const onOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (card && !card.contains(e.relatedTarget as Node)) gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: "power3.out" });
    };
    grid.addEventListener("pointermove", onMove);
    grid.addEventListener("pointerout", onOut);
    return () => { grid.removeEventListener("pointermove", onMove); grid.removeEventListener("pointerout", onOut); };
  }, []);

  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, catalogue.filter((p) => p.categories.includes(c)).length])), []);
  const filtered = Boolean(q || category !== "All" || tech);
  const reset = () => { setQ(""); setCategory("All"); setTech(null); };
  const techs = allTech ? technologyFilters : technologyFilters.slice(0, TECH_VISIBLE);

  return (
    <div ref={ref}>
      <div className="-mx-[max(clamp(1.25rem,4vw,3.5rem),env(safe-area-inset-left))] border-y hairline bg-paper/90 px-[max(clamp(1.25rem,4vw,3.5rem),env(safe-area-inset-left))] py-4 backdrop-blur-md md:sticky md:top-20 md:z-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Search projects</span>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder}
              className="h-12 w-full rounded-full border hairline bg-surface pr-12 pl-11 text-base outline-none placeholder:text-muted/80 focus:border-accent lg:h-11 lg:text-sm" />
            {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-full hover:bg-paper"><X className="size-4" /></button>}
          </label>
          <div role="radiogroup" aria-label="Display mode" className="flex shrink-0 max-lg:w-full rounded-full border hairline bg-surface p-1">
            {([["grid", "Editorial grid", "Grid", LayoutGrid], ["index", "Technical index", "Index", List]] as const).map(([v, label, short, Icon]) => (
              <button key={v} type="button" role="radio" aria-checked={view === v} aria-label={label} onClick={() => setView(v)}
                className={cn("inline-flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm transition-colors lg:h-9", view === v ? "bg-ink text-paper" : "text-muted hover:text-ink")}>
                <Icon className="size-4 shrink-0" aria-hidden /><span className="hidden sm:inline">{label}</span><span className="sm:hidden" aria-hidden>{short}</span>
              </button>
            ))}
          </div>
        </div>
        <div role="group" aria-label="Filter by category" className="edge-fade no-scrollbar -mx-[max(clamp(1.25rem,4vw,3.5rem),env(safe-area-inset-left))] mt-3 flex gap-2 overflow-x-auto px-[max(clamp(1.25rem,4vw,3.5rem),env(safe-area-inset-left))] pb-1 md:mx-0 md:px-1">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}
              className={cn("h-11 shrink-0 rounded-full border px-4 text-sm transition-colors active:scale-[.97] lg:h-9 lg:px-3.5", category === c ? "border-ink bg-ink text-paper" : "hairline bg-surface text-muted hover:text-ink")}>
              {c === "All" ? "All projects" : c} <span className="ml-1 font-mono text-[10px]">{c === "All" ? catalogue.length : counts[c]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="edge-fade no-scrollbar -mx-[max(clamp(1.25rem,4vw,3.5rem),env(safe-area-inset-left))] mt-5 flex items-center gap-2 overflow-x-auto px-[max(clamp(1.25rem,4vw,3.5rem),env(safe-area-inset-left))] pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0" role="group" aria-label="Filter by technology">
        <span className="t-label mr-1 shrink-0">Stack</span>
        {techs.map((t) => (
          <button key={t} type="button" aria-pressed={tech === t} onClick={() => setTech(tech === t ? null : t)}
            className={cn("h-11 shrink-0 rounded-full border px-3.5 font-mono text-xs transition-colors active:scale-[.97] lg:h-8 lg:px-3 lg:text-[11px]", tech === t ? "border-accent bg-accent-soft text-ink" : "hairline text-muted hover:border-ink/30 hover:text-ink")}>
            {t}
          </button>
        ))}
        {technologyFilters.length > TECH_VISIBLE && (
          <button type="button" onClick={() => setAllTech((v) => !v)} aria-expanded={allTech} className="h-11 shrink-0 px-2 text-sm text-accent hover:underline lg:h-8">
            {allTech ? "Fewer" : `+${technologyFilters.length - TECH_VISIBLE} more`}
          </button>
        )}
      </div>

      <div className="mt-8 flex items-baseline justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite"><span className="font-medium text-ink">{shown}</span> of {catalogue.length} projects{filtered ? " match" : ""}</p>
        {filtered && <button type="button" onClick={reset} className="-my-3 inline-flex min-h-11 items-center px-2 text-sm text-accent hover:underline">Clear filters</button>}
      </div>
    </div>
  );
}
