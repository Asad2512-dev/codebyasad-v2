import { skillGroups } from "@/content/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** A technical atlas: six territories. Server-rendered; hover/focus states are pure CSS. */
export function Expertise({ showHeader = true }: { showHeader?: boolean }) {
  // Without the visual header this is the first section under the page <h1>.
  const H = showHeader ? "h3" : "h2";
  const Item = showHeader ? "h4" : "h3";
  return (
    <section aria-labelledby="expertise-title" className="border-t hairline bg-surface py-16 md:py-36">
      <div className="container-x">
        {showHeader && <SectionHeader index="06" label="Design × Engineering" title="Two disciplines, one product mindset." />}
        <H id="expertise-title" className="sr-only">Expertise areas</H>
        <ul className="mt-14 grid border-t border-l hairline sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <li key={g.id} tabIndex={0} className="group relative border-r border-b hairline p-6 transition-colors duration-500 outline-none hover:bg-paper focus-visible:bg-paper sm:p-8" data-reveal>
              <span className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                <span aria-hidden className="h-px w-4 bg-accent transition-all duration-500 group-hover:w-16 group-focus-visible:w-16" />
              </span>
              <Item className="mt-8 font-display text-3xl">{g.title}</Item>
              <p className="mt-2 text-base text-muted lg:text-sm">{g.summary}</p>
              <ul className="flex flex-wrap gap-1.5 pt-6" aria-label={`${g.title} tools`}>
                {g.skills.map((s) => (
                  <li key={s} className="rounded-full border hairline px-2.5 py-1 font-mono text-[11px] text-muted transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-accent-soft/50 group-hover:text-ink group-focus-visible:border-accent/40 group-focus-visible:bg-accent-soft/50 group-focus-visible:text-ink">{s}</li>
                ))}
              </ul>
              {g.usedIn.length > 0 && <p className="mt-5 font-mono text-[10px] tracking-wider text-muted uppercase">Used in · {g.usedIn.join(" · ")}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
