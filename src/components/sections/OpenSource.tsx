import { ArrowUpRight } from "lucide-react";
import { repositories, lab } from "@/content/lab";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function OpenSource() {
  const research = lab.filter((l) => l.kind === "Research");
  return (
    <section aria-labelledby="oss-title" className="border-t hairline py-16 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader index="09" label="GitHub & research" title="Work in the open." />
          <div data-reveal><Button href="https://github.com/Asad2512-dev" variant="secondary">GitHub profile</Button></div>
        </div>
        <h3 id="oss-title" className="sr-only">Repositories and research</h3>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <ul className="border-t hairline lg:col-span-7">
            {repositories.map((r) => (
              <li key={r.name} className="border-b hairline" data-reveal>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 py-5">
                  <span className="min-w-0">
                    <span className="block font-mono text-sm group-hover:text-accent">Asad2512-dev/<span className="font-semibold">{r.name}</span></span>
                    <span className="mt-1 block text-sm text-muted">{r.desc}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-muted">
                    <span className="hidden sm:inline">{r.lang}</span>
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-4 lg:col-span-5">
            <p className="t-label">Research</p>
            {research.map((r) => (
              <article key={r.title} className="rounded-[var(--radius-lg)] border hairline bg-surface p-6" data-reveal>
                <h4 className="font-display text-2xl">{r.title}</h4>
                <p className="mt-2 text-base leading-relaxed text-muted lg:text-sm">{r.summary}</p>
                <p className="mt-4 font-mono text-[11px] text-muted">{r.stack.join(" · ")}</p>
              </article>
            ))}
            <Button href="/lab/" variant="ghost">Visit the lab</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
