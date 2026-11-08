import { Fx } from "@/components/animation/Fx";
import { profile } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** "From architecture to production" — a pipeline whose connecting rail is drawn by scroll. */
export function Identity() {
  const { identity } = profile;


  return (
    <section aria-labelledby="identity-title" className="relative border-t hairline bg-surface py-24 md:py-36">
      <Fx name="identity" />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader index="02" label={identity.label} title={identity.headline} />
          </div>
          <p className="t-lead self-end lg:col-span-5" data-reveal>{identity.intro}</p>
        </div>
        <h3 id="identity-title" className="sr-only">Delivery pipeline</h3>

        <ol data-pipeline className="relative mt-20 grid gap-0 lg:mt-28 lg:grid-cols-6 lg:gap-6">
          <span data-rail aria-hidden className="absolute top-[9px] right-0 left-0 hidden h-px origin-left bg-accent lg:block" />
          <span data-rail-v aria-hidden className="absolute top-2 bottom-2 left-[9px] w-px origin-top bg-accent lg:hidden" />
          {identity.pipeline.map((s, i) => (
            <li key={s.step} data-step className="relative pb-10 pl-10 lg:pb-0 lg:pl-0">
              <span aria-hidden className="absolute top-0 left-0 grid size-[19px] place-items-center rounded-full border border-accent bg-surface lg:relative">
                <span className="size-[7px] rounded-full bg-accent" />
              </span>
              <p className="flex items-center gap-2 font-mono text-[11px] lg:mt-6"><span className="text-accent">0{i + 1}</span><span className={s.discipline === "design" ? "rounded-full bg-accent-soft px-2 py-0.5 text-accent" : "rounded-full border hairline px-2 py-0.5 text-muted"}>{s.discipline === "design" ? "Design" : "Engineering"}</span></p>
              <h4 className="mt-1 text-lg font-medium">{s.step}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
