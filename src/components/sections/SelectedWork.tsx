"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ModuleMap } from "@/components/projects/ModuleMap";
import { Button } from "@/components/ui/Button";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((stage) => {
      const visual = stage.querySelector("[data-visual]");
      const base = stage.querySelector("[data-layer='base']");
      const float = stage.querySelector("[data-layer='float']");
      const index = stage.querySelector("[data-index]");
      // Perspective panel settles flat as the stage scrolls into place
      if (base) gsap.fromTo(base, { rotateX: 14, rotateY: -10, y: 60 }, {
        rotateX: 0, rotateY: 0, y: 0, ease: "none",
        scrollTrigger: { trigger: stage, start: "top bottom", end: "center center", scrub: 0.8 },
      });
      if (float) gsap.fromTo(float, { y: 80 }, { y: -30, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: true } });
      if (index) gsap.fromTo(index, { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: true } });
      if (visual) gsap.fromTo(visual, { clipPath: "inset(12% 8% 12% 8% round 24px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: stage, start: "top 90%", end: "top 30%", scrub: true },
      });
    });
  });

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="border-t hairline bg-surface py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader index="04" label="Selected work" title="Products in production." lead="Three flagship platforms — the problem, the system and my role in each." />
          <div data-reveal><Button href="/work/" variant="secondary">All projects</Button></div>
        </div>
        <h3 id="work-title" className="sr-only">Featured projects</h3>
      </div>

      <div className="mt-20 space-y-28 md:mt-28 md:space-y-44">
        {featuredProjects.map((p, i) => (
          <article key={p.slug} data-stage className="container-x" aria-labelledby={`stage-${p.slug}`}>
            <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-7" style={{ perspective: "1400px" }}>
                <div data-visual className="relative rounded-[var(--radius-lg)] bg-paper p-5 sm:p-10 md:p-14">
                  <span data-index aria-hidden className="pointer-events-none absolute top-2 right-5 font-display text-[clamp(4.5rem,10vw,9rem)] leading-none text-line select-none">{p.index}</span>
                  <ModuleMap project={p} className="relative" />
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="t-label" data-reveal>{p.index} — {p.categories.join(" · ")}</p>
                <h4 id={`stage-${p.slug}`} className="t-display mt-4" data-reveal>{p.name}</h4>
                <p className="mt-4 text-xl leading-snug" data-reveal>{p.tagline}</p>
                <dl className="mt-8 space-y-5 border-t hairline pt-6 text-sm" data-reveal>
                  <div><dt className="t-label mb-1">Problem</dt><dd className="leading-relaxed text-muted">{p.problem}</dd></div>
                  <div><dt className="t-label mb-1">My role</dt><dd className="leading-relaxed">{p.role}</dd></div>
                  <div>
                    <dt className="t-label mb-2">Modules</dt>
                    <dd className="flex flex-wrap gap-1.5">{p.modules.map((m) => <span key={m} className="rounded-full border hairline px-2.5 py-1 text-xs">{m}</span>)}</dd>
                  </div>
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
        ))}
      </div>
      <p className="container-x mt-24 text-sm text-muted" data-reveal>
        Also see <Link href="/work/unisecure/" className="text-ink underline underline-offset-4">UniSecure</Link> — a fully documented, open-source Laravel + Flutter system.
      </p>
    </section>
  );
}
