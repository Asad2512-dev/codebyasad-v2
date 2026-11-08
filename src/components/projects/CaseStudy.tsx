import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "@/types/content";
import { ModuleMap } from "./ModuleMap";
import { ArchitectureExplorer } from "./ArchitectureExplorer";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Status } from "@/components/ui/Status";
import { Button } from "@/components/ui/Button";

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t hairline py-14 md:grid-cols-12 md:py-20" aria-labelledby={`cs-${n}`}>
      <div className="md:col-span-4">
        <p className="t-label" data-reveal><span className="text-accent">{n}</span> — {title}</p>
      </div>
      <div className="md:col-span-8" data-reveal>
        <h2 id={`cs-${n}`} className="sr-only">{title}</h2>
        {children}
      </div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">{items.map((t) => <li key={t} className="flex gap-3 text-lg leading-relaxed"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />{t}</li>)}</ul>
);

export function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  let i = 0;
  const n = () => String(++i).padStart(2, "0");

  return (
    <article>
      {/* 1 — Hero */}
      <header className="grid-paper border-b hairline pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-x grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="t-label"><Link href="/work/" className="hover:text-ink">Work</Link> / {p.index}</p>
            <h1 className="t-hero mt-6">{p.name}</h1>
            <p className="mt-6 max-w-xl text-2xl leading-snug">{p.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              {p.links.live && <Button href={p.links.live}>Visit live site</Button>}
              {p.links.repo && <Button href={p.links.repo} variant="secondary">Source on GitHub</Button>}
            </div>
          </div>
          <div className="lg:col-span-6" data-reveal><ModuleMap project={p} /></div>
        </div>
        <div className="container-x">
          <dl className="mt-16 grid gap-6 border-t hairline pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            <div><dt className="t-label">Role</dt><dd className="mt-1">{p.role}</dd></div>
            <div><dt className="t-label">Year</dt><dd className="mt-1">{p.year}</dd></div>
            <div><dt className="t-label">Discipline</dt><dd className="mt-1">{p.categories.join(", ")}</dd></div>
            <div><dt className="t-label">Stack</dt><dd className="mt-1">{p.technologies.items.length ? p.technologies.items.slice(0, 4).join(", ") : "Pending confirmation"}</dd></div>
          </dl>
        </div>
      </header>

      <div className="container-x">
        <Block n={n()} title="Overview"><p className="text-2xl leading-snug md:text-3xl">{p.solution}</p></Block>
        <Block n={n()} title="The problem"><p className="text-lg leading-relaxed text-muted">{p.problem}</p></Block>
        <Block n={n()} title="My contribution"><p className="text-lg leading-relaxed">{p.role}</p></Block>

        {p.architecture.length > 0 && (
          <Block n={n()} title="Technical architecture">
            <ArchitectureDiagram layers={p.architecture} />
            <div className="mt-12"><ArchitectureExplorer projects={[p]} compact /></div>
          </Block>
        )}

        <Block n={n()} title="Technology stack">
          {p.technologies.items.length ? (
            <ul className="flex flex-wrap gap-2">{p.technologies.items.map((t) => <li key={t} className="rounded-full border hairline bg-surface px-3 py-1.5 font-mono text-xs">{t}</li>)}<Status status={p.technologies.status} /></ul>
          ) : <p className="text-muted">Technology stack pending confirmation.<Status status="pending" /></p>}
        </Block>

        <Block n={n()} title="Modules"><ul className="grid gap-2 sm:grid-cols-2">{p.modules.map((m) => <li key={m} className="rounded-[var(--radius-sm)] border hairline bg-surface px-4 py-3">{m}</li>)}</ul></Block>

        {p.decisions.length > 0 && <Block n={n()} title="Engineering decisions"><List items={p.decisions} /></Block>}

        {p.challenges.length > 0 && (
          <Block n={n()} title="Key challenges">
            <div className="grid gap-4 sm:grid-cols-2">
              {p.challenges.map((c) => (
                <div key={c.title} className="rounded-[var(--radius-lg)] border hairline bg-surface p-6">
                  <h3 className="font-display text-2xl">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{c.detail}</p>
                </div>
              ))}
            </div>
          </Block>
        )}

        <Block n={n()} title="Deployment"><p className="text-lg leading-relaxed">{p.deployment.text}<Status status={p.deployment.status} /></p></Block>
        {p.performance.length > 0 && <Block n={n()} title="Performance & scalability"><List items={p.performance} /></Block>}
        {p.security.length > 0 && <Block n={n()} title="Security considerations"><List items={p.security} /></Block>}

        {p.screenshots.length > 1 && (
          <Block n={n()} title="Screens">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.screenshots.slice(1).map((s) => <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="rounded-[var(--radius-md)] border hairline" />)}
            </div>
          </Block>
        )}

        <Block n={n()} title="Outcomes">
          {p.outcomes.length ? (
            <ul className="space-y-3">{p.outcomes.map((o) => <li key={o.text} className="text-lg">{o.text}<Status status={o.status} /></li>)}</ul>
          ) : <p className="text-muted">Measured outcomes are being documented and will be added once verified.</p>}
        </Block>

        {p.lessons.length > 0 && <Block n={n()} title="Lessons learned"><List items={p.lessons} /></Block>}

        {(p.links.live || p.links.repo) && (
          <Block n={n()} title="Links">
            <ul className="space-y-3 text-lg">
              {p.links.live && <li><a className="inline-flex items-center gap-2 text-accent hover:underline" href={p.links.live} target="_blank" rel="noopener noreferrer">{p.links.live.replace("https://", "")} <ArrowUpRight className="size-4" aria-hidden /></a></li>}
              {p.links.repo && <li><a className="inline-flex items-center gap-2 text-accent hover:underline" href={p.links.repo} target="_blank" rel="noopener noreferrer"><Code2 className="size-4" aria-hidden />{p.links.repo.replace("https://github.com/", "")}</a></li>}
            </ul>
          </Block>
        )}

        {p.pending.length > 0 && (
          <aside className="mb-20 rounded-[var(--radius-lg)] border border-dashed hairline p-6 text-sm text-muted" aria-label="Documentation status">
            <p className="t-label mb-2">Documentation in progress</p>
            Being prepared for this case study: {p.pending.join(", ").toLowerCase()}.
          </aside>
        )}
      </div>

      {/* Next project */}
      <Link href={`/work/${next.slug}/`} className="group block border-t hairline bg-ink py-20 text-paper md:py-28">
        <div className="container-x flex items-end justify-between gap-6">
          <div>
            <p className="t-label !text-paper/60">Next project</p>
            <p className="t-display mt-4 transition-colors group-hover:text-[#8FB0FF]">{next.name}</p>
            <p className="mt-3 text-paper/70">{next.tagline}</p>
          </div>
          <ArrowRight aria-hidden className="size-10 shrink-0 transition-transform group-hover:translate-x-2" />
        </div>
      </Link>
    </article>
  );
}
