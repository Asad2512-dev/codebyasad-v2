import { Fx } from "@/components/animation/Fx";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, projectCount } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ModuleMap } from "@/components/projects/ModuleMap";
import { Button } from "@/components/ui/Button";

export function SelectedWork() {


  return (
    <section id="work" aria-labelledby="work-title" className="border-t hairline bg-surface py-16 md:py-36">
      <Fx name="work" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader index="04" label="Selected work" title="Products in production." lead="Three flagship platforms — the problem, the system and my role in each. Figures are counted from the codebases." />
          <div data-reveal><Button href="/work/" variant="secondary">All projects</Button></div>
        </div>
        <h3 id="work-title" className="sr-only">Featured projects</h3>
      </div>

      <div className="mt-14 space-y-20 md:mt-28 md:space-y-44">
        {featuredProjects.map((p, i) => { const num = String(i + 1).padStart(2, "0"); return (
          <article key={p.slug} data-stage className="container-x" aria-labelledby={`stage-${p.slug}`}>
            <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-7" style={{ perspective: "1400px" }}>
                <div data-visual className="relative rounded-[var(--radius-lg)] bg-paper p-5 sm:p-10 md:p-14">
                  <span data-index aria-hidden className="pointer-events-none absolute top-2 right-5 font-display text-[clamp(4.5rem,10vw,9rem)] leading-none text-line select-none">{num}</span>
                  <ModuleMap project={p} className="relative" />
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="t-label" data-reveal>{num} — {p.categories.slice(0, 3).join(" · ")}</p>
                <h4 id={`stage-${p.slug}`} className="t-display mt-4" data-reveal>{p.name}</h4>
                <p className="mt-4 text-xl leading-snug text-pretty" data-reveal>{p.tagline}</p>
                <dl className="mt-8 space-y-5 border-t hairline pt-6 text-base lg:text-sm" data-reveal>
                  <div><dt className="t-label mb-1">Problem</dt><dd className="leading-relaxed text-muted">{p.problem}</dd></div>
                  <div><dt className="t-label mb-1">My role</dt><dd className="leading-relaxed">{p.role}</dd></div>
                  {p.highlight && <div><dt className="t-label mb-1">Engineering highlight</dt><dd className="leading-relaxed">{p.highlight}</dd></div>}
                  {p.stats && (
                    <div>
                      <dt className="sr-only">Codebase facts</dt>
                      <dd className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border hairline bg-line sm:grid-cols-4">
                        {p.stats.map((s) => <span key={s.label} className="bg-surface p-3"><span className="block font-display text-2xl">{s.value}</span><span className="block text-[11px] leading-tight text-muted">{s.label}</span></span>)}
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3" data-reveal>
                  <Button href={`/work/${p.slug}/`}>Read case study</Button>
                  {p.links.live && (
                    <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-muted hover:text-ink">
                      Visit live <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ); })}
      </div>
      <div className="container-x mt-24 flex flex-col items-start justify-between gap-6 border-t hairline pt-10 md:flex-row md:items-center" data-reveal>
        <p className="max-w-xl text-lg">Plus <span className="font-display text-3xl">{projectCount - featuredProjects.length}</span> more products, client apps, systems and research projects — searchable by stack and architecture.</p>
        <Button href="/work/#catalogue">Explore all {projectCount} projects</Button>
      </div>
    </section>
  );
}
