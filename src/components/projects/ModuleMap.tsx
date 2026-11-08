import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * An illustrative composition of a product's modules — deliberately abstract so
 * it can never be mistaken for a real screenshot. Replace with real screenshots
 * by adding them to project.screenshots.
 */
export function ModuleMap({ project, className }: { project: Project; className?: string }) {
  const shot = project.screenshots[0];
  if (shot) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={shot.src} alt={shot.alt} className={cn("w-full rounded-[var(--radius-lg)] border hairline shadow-lift", className)} loading="lazy" />;
  }
  const mods = project.modules.slice(0, 6);
  return (
    <figure className={cn("relative", className)} aria-label={`Module map of ${project.name}: ${project.modules.join(", ")}`}>
      <div data-layer="base" className="relative overflow-hidden rounded-[var(--radius-lg)] border hairline bg-surface shadow-lift">
        <div className="flex items-center gap-1.5 border-b hairline px-4 py-3">
          <span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 font-mono text-[10px] tracking-wider text-muted">{project.links.live?.replace("https://", "") ?? project.slug}</span>
        </div>
        <div className="grid grid-cols-[38%_1fr] sm:grid-cols-[30%_1fr]">
          <ul className="space-y-1 border-r hairline p-3 sm:p-4">
            {mods.map((m, i) => (
              <li key={m} className={cn("truncate rounded-md px-2 py-1.5 text-[11px] sm:text-xs", i === 0 ? "bg-accent-soft text-accent" : "text-muted")}>{m}</li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-2 p-3 sm:gap-3 sm:p-4">
            <div className="col-span-2 h-14 rounded-md bg-paper sm:h-20" />
            <div className="h-16 rounded-md bg-paper sm:h-24" />
            <div className="h-16 rounded-md border border-dashed border-accent/40 bg-accent-soft/40 sm:h-24" />
            <div className="col-span-2 space-y-2 pt-1">
              <div className="h-2 w-3/4 rounded bg-line" /><div className="h-2 w-1/2 rounded bg-line" />
            </div>
          </div>
        </div>
      </div>
      <div data-layer="float" className="absolute right-3 -bottom-6 hidden rounded-[var(--radius-md)] border hairline bg-surface p-3 shadow-lift sm:block xl:-right-8">
        <p className="font-mono text-[10px] tracking-wider text-muted uppercase">Modules</p>
        <p className="font-display text-3xl">{project.modules.length}</p>
      </div>
      <figcaption className="mt-8 font-mono text-[10px] tracking-wider text-muted uppercase">Illustrative module map — not a product screenshot</figcaption>
    </figure>
  );
}
