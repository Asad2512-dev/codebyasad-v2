import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, FileText, Globe, Lock } from "lucide-react";
import type { EvidenceSource, Project } from "@/types/content";
import { ModuleMap } from "./ModuleMap";
import { ProjectMedia } from "./ProjectMedia";
import { ArchitectureExplorer } from "./ArchitectureExplorer";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Status } from "@/components/ui/Status";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-6 border-t hairline py-14 md:grid-cols-12 md:py-20" aria-labelledby={`cs-${n}`}>
      <div className="min-w-0 md:col-span-4">
        <h2 id={`cs-${n}`} className="t-label" data-reveal><span className="text-accent">{n}</span> — {title}</h2>
      </div>
      <div className="min-w-0 md:col-span-8" data-reveal>{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">{items.map((t) => <li key={t} className="flex gap-3 text-lg leading-relaxed"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />{t}</li>)}</ul>
);

const sourceIcon = (k: EvidenceSource["kind"]) => (k === "live-site" ? Globe : k === "architecture-doc" ? FileText : k === "repository" ? Code2 : FileText);

const completenessText = { full: "Architecture and implementation documented in source", partial: "Scope and stack documented in source", minimal: "Limited public evidence" } as const;

export function CaseStudy({ project: p, next, related }: { project: Project; next: Project; related: Project[] }) {
  let i = 0;
  const n = () => String(++i).padStart(2, "0");
  const rich = Boolean(p.architecture?.length || p.problem);

  return (
    <article>
      {/* Hero */}
      <header className="grid-paper border-b hairline pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-x grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="t-label flex flex-wrap items-center gap-3">
              <Link href="/work/" className="hover:text-ink">Work</Link><span aria-hidden>/</span><span>{p.categories.slice(0, 3).join(" · ")}</span>
              {p.status && <StatusBadge status={p.status} />}
            </p>
            <h1 className="t-hero mt-6 break-words">{p.name}</h1>
            <p className="mt-6 max-w-xl text-2xl leading-snug">{p.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.links.live && <Button href={p.links.live}>Visit live site</Button>}
              {p.links.repo && <Button href={p.links.repo} variant="secondary">Source on GitHub</Button>}
            </div>
          </div>
          <div className="lg:col-span-6">
            {p.modules?.length && p.tier !== "catalog" ? <ModuleMap project={p} /> : <ProjectMedia project={p} className="aspect-[16/10] rounded-[var(--radius-lg)] border hairline shadow-lift" />}
          </div>
        </div>
        <div className="container-x">
          <dl className="mt-16 grid gap-6 border-t hairline pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="t-label">Role</dt><dd className="mt-1">{p.role ?? "Engineer"}</dd></div>
            <div><dt className="t-label">Discipline</dt><dd className="mt-1">{p.categories.join(", ")}</dd></div>
            <div><dt className="t-label">Stack</dt><dd className="mt-1">{p.technologies.slice(0, 5).join(", ") || "Not documented"}</dd></div>
            <div><dt className="t-label">Codebases</dt><dd className="mt-1">{p.repos.length ? `${p.repos.length} ${p.repos.length === 1 ? "repository" : "repositories"}` : "—"}</dd></div>
          </dl>
          {p.stats && (
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border hairline bg-line md:grid-cols-4">
              {p.stats.map((s) => <div key={s.label} className="bg-surface p-5"><dt className="text-sm text-muted">{s.label}</dt><dd className="font-display text-4xl">{s.value}</dd></div>)}
            </dl>
          )}
        </div>
      </header>

      <div className="container-x">
        <Block n={n()} title="Overview"><p className="text-2xl leading-snug md:text-3xl">{p.solution ?? p.summary}</p></Block>
        {p.problem && <Block n={n()} title="The problem"><p className="text-lg leading-relaxed text-muted">{p.problem}</p></Block>}
        {p.origin === "customised" && (
          <Block n={n()} title="Origin">
            <p className="text-lg leading-relaxed">Launched on a licensed third-party codebase, then customised, rebranded, integrated and released. {p.role}</p>
          </Block>
        )}
        {p.role && rich && <Block n={n()} title="My contribution"><p className="text-lg leading-relaxed">{p.role}</p></Block>}

        {p.architecture && p.architecture.length > 0 && (
          <Block n={n()} title="System architecture">
            <ArchitectureDiagram layers={p.architecture} />
            <div className="mt-12"><ArchitectureExplorer projects={[p]} compact /></div>
          </Block>
        )}

        {p.technologies.length > 0 && (
          <Block n={n()} title="Technology stack">
            <ul className="flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="rounded-full border hairline bg-surface px-3 py-1.5 font-mono text-xs">{t}</li>)}</ul>
            <p className="mt-4 text-sm text-muted">Taken from the project&apos;s manifests and architecture documentation.</p>
          </Block>
        )}

        {p.modules && p.modules.length > 0 && (
          <Block n={n()} title="Modules"><ul className="grid gap-2 sm:grid-cols-2">{p.modules.map((m) => <li key={m} className="rounded-[var(--radius-sm)] border hairline bg-surface px-4 py-3">{m}</li>)}</ul></Block>
        )}

        {p.highlight && !rich && <Block n={n()} title="Technical highlight"><p className="text-xl leading-relaxed">{p.highlight}</p></Block>}
        {p.decisions && p.decisions.length > 0 && <Block n={n()} title="Engineering decisions"><List items={p.decisions} /></Block>}

        {p.challenges && p.challenges.length > 0 && (
          <Block n={n()} title="Challenges & solutions">
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

        {p.performance && p.performance.length > 0 && <Block n={n()} title="Performance & scalability"><List items={p.performance} /></Block>}
        {p.security && p.security.length > 0 && <Block n={n()} title="Security"><List items={p.security} /></Block>}
        {p.deployment && <Block n={n()} title="Infrastructure & deployment"><p className="text-lg leading-relaxed">{p.deployment}</p></Block>}

        {p.screenshots.length > 1 && (
          <Block n={n()} title="Screens">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.screenshots.slice(1).map((s) => <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="rounded-[var(--radius-md)] border hairline" />)}
            </div>
          </Block>
        )}

        {p.outcomes && p.outcomes.length > 0 && (
          <Block n={n()} title="Outcomes"><ul className="space-y-3">{p.outcomes.map((o) => <li key={o.text} className="text-lg">{o.text}<Status status={o.status} /></li>)}</ul></Block>
        )}
        {p.lessons && p.lessons.length > 0 && <Block n={n()} title="Lessons learned"><List items={p.lessons} /></Block>}

        <Block n={n()} title="Evidence">
          <p className="text-sm text-muted">
            {completenessText[p.evidence.completeness]} · reviewed {new Date(p.evidence.lastReviewed).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            {p.evidence.verification === "reported" && " · based on the author's project description"}
          </p>
          <ul className="mt-5 divide-y divide-line rounded-[var(--radius-md)] border hairline bg-surface">
            {p.evidence.sources.map((s, si) => {
              const Icon = s.href ? sourceIcon(s.kind) : Lock;
              const inner = <><Icon aria-hidden className="size-4 shrink-0 text-muted" /><span className="min-w-0 flex-1 truncate">{s.label}</span>{s.href && <ArrowUpRight aria-hidden className="size-4 shrink-0" />}</>;
              return (
                <li key={si}>
                  {s.href
                    ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 font-mono text-xs hover:text-accent">{inner}</a>
                    : <span className="flex items-center gap-3 px-4 py-3 font-mono text-xs text-muted">{inner}</span>}
                </li>
              );
            })}
          </ul>
          {p.evidence.sources.some((s) => !s.href) && <p className="mt-3 text-xs text-muted">Private repositories are available to review on request.</p>}
        </Block>

        {related.length > 0 && (
          <section className="border-t hairline py-14 md:py-20" aria-labelledby="related-title">
            <h2 id="related-title" className="t-label mb-8">Related projects</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.slice(0, 3).map((r) => <li key={r.slug}><ProjectCard project={r} /></li>)}</ul>
          </section>
        )}
      </div>

      <Link href={`/work/${next.slug}/`} className="group block border-t hairline bg-ink py-20 text-paper md:py-28">
        <div className="container-x flex items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="t-label !text-paper/60">Next project</p>
            <p className="t-display mt-4 break-words transition-colors group-hover:text-[#8FB0FF]">{next.name}</p>
            <p className="mt-3 text-paper/70">{next.tagline}</p>
          </div>
          <ArrowRight aria-hidden className="size-10 shrink-0 transition-transform group-hover:translate-x-2" />
        </div>
      </Link>
    </article>
  );
}
