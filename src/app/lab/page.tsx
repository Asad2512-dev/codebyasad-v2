import { ArrowUpRight } from "lucide-react";
import { lab } from "@/content/lab";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({ title: "Lab", description: "Research, experiments and open-source explorations — deepfake detection, frequency-domain learning and engineering side projects.", path: "/lab/" });

export default function LabPage() {
  return (
    <>
      <PageHero label="Lab" title="Experiments and research." lead="Where I explore ideas outside client work. The commercial work lives on the work page." />
      <section className="py-16 md:py-28">
        <div className="container-x">
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border hairline bg-line md:grid-cols-2">
            {lab.map((l) => (
              <li key={l.title} className="bg-surface p-6 sm:p-8" data-reveal>
                <p className="t-label">{l.kind}</p>
                <h2 className="mt-4 font-display text-3xl">{l.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{l.summary}</p>
                {l.stack.length > 0 && <p className="mt-5 font-mono text-[11px] text-muted">{l.stack.join(" · ")}</p>}
                {l.repo && (
                  <a href={l.repo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm text-accent hover:underline">
                    Repository <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-12"><Button href="/work/">Back to commercial work</Button></div>
        </div>
      </section>
    </>
  );
}
