import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, projectCount, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { Catalogue } from "@/components/projects/Catalogue";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata = pageMetadata({
  title: "Work",
  description: `${projectCount} projects — SaaS platforms, web applications, mobile apps, backend systems and AI research by Muhammad Asad Ullah. Search by technology and architecture.`,
  path: "/work/",
});

export default function WorkPage() {
  const repos = new Set(projects.flatMap((p) => p.repos)).size;
  return (
    <>
      <section className="grid-paper border-b hairline pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="t-label mb-6">Work · Index</p>
            <h1 className="t-display">{projectCount} projects.<br /><span className="italic text-accent">One engineering mindset.</span></h1>
            <p className="t-lead mt-6 max-w-2xl">A collection of digital products, software systems, experiments and engineering solutions — from architecture to production.</p>
          </div>
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-lg)] border hairline bg-line lg:col-span-4">
            <div className="bg-surface p-4"><dt className="text-[11px] text-muted">Projects</dt><dd className="font-display text-3xl">{projectCount}</dd></div>
            <div className="bg-surface p-4"><dt className="text-[11px] text-muted">Repositories</dt><dd className="font-display text-3xl">{repos}</dd></div>
            <div className="bg-surface p-4"><dt className="text-[11px] text-muted">Live</dt><dd className="font-display text-3xl">{projects.filter((p) => p.status === "Live").length}</dd></div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="flagships" className="border-b hairline bg-surface py-16 md:py-24">
        <div className="container-x">
          <h2 id="flagships" className="t-label mb-8">Flagship platforms</h2>
          <ol className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}/`} className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border hairline bg-paper transition-shadow duration-500 hover:shadow-lift">
                  <ProjectMedia project={p} className="aspect-[16/9]" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-3 font-mono text-[11px] text-accent">0{i + 1}{p.status && <StatusBadge status={p.status} />}</p>
                    <p className="mt-3 font-display text-4xl">{p.name}</p>
                    <p className="mt-2 text-muted">{p.tagline}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium group-hover:text-accent">Read case study <ArrowUpRight className="size-4" aria-hidden /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="catalogue" aria-labelledby="catalogue-title" className="scroll-mt-20 py-16 md:py-24">
        <div className="container-x">
          <h2 id="catalogue-title" className="t-title mb-8">The full catalogue</h2>
          <Catalogue projects={projects.filter((p) => p.tier !== "flagship")} />
        </div>
      </section>
    </>
  );
}
