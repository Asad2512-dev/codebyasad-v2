import { Fx } from "@/components/animation/Fx";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { experience, formatPeriod } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = { work: Briefcase, education: GraduationCap, award: Award };
const education = experience.filter((r) => r.kind === "education");

export function Timeline({ showHeader = true, detailed = false }: { showHeader?: boolean; detailed?: boolean }) {
  const H = showHeader ? "h3" : "h2";
  const Item = showHeader ? "h4" : "h3";

  return (
    <section aria-labelledby="timeline-title" className="border-t hairline py-24 md:py-36">
      <Fx name="timeline" />
      <div className="container-x">
        {showHeader && <SectionHeader index="07" label="Experience" title="From freelance to product teams." />}
        <H id="timeline-title" className="sr-only">Career timeline</H>
        <ol data-timeline className="relative mt-16 md:ml-[25%]">
          <span aria-hidden className="absolute top-0 bottom-0 left-[15px] w-px bg-line" />
          <span data-progress aria-hidden className="absolute top-0 bottom-0 left-[15px] w-px origin-top bg-accent" />
          {experience.filter((r) => r.kind !== "education").map((r) => {
            const Icon = icons[r.kind];
            return (
              <li key={r.id} className="relative pb-14 pl-14 last:pb-0" data-reveal>
                <span aria-hidden className="absolute top-0 left-0 grid size-8 place-items-center rounded-full border hairline bg-surface text-accent">
                  <Icon className="size-3.5" />
                </span>
                <p className="font-mono text-xs text-muted md:absolute md:top-1.5 md:right-[calc(100%+2rem)] md:w-48 md:text-right">{formatPeriod(r)}</p>
                <Item className="mt-1 text-xl font-medium md:mt-0">{r.title}</Item>
                <p className="text-muted">{r.org} · {r.location}</p>
                {(detailed ? r.points.length > 0 : false) ? (
                  <ul className="mt-4 max-w-2xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                    {r.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                ) : (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{r.summary}</p>
                )}
                {detailed && r.reported && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {r.reported.map((x) => <li key={x} className="rounded-full border hairline bg-surface px-3 py-1 font-mono text-[11px] text-muted">{x}</li>)}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>

        {education.length > 0 && (
          <div className="mt-20 md:ml-[25%]" aria-labelledby="education-title">
            <p id="education-title" className="t-label mb-6" data-reveal>Education</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {education.map((r) => (
                <li key={r.id} className="flex gap-4 rounded-[var(--radius-lg)] border hairline bg-surface p-6" data-reveal>
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border hairline text-accent"><GraduationCap className="size-4" /></span>
                  <div>
                    <p className="font-mono text-xs text-muted">{formatPeriod(r)}</p>
                    <p className="mt-1 text-lg font-medium">{r.title}</p>
                    <p className="text-sm text-muted">{r.org} · {r.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
