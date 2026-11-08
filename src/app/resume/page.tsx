import fs from "node:fs";
import path from "node:path";
import { profile } from "@/content/profile";
import { experience, formatPeriod } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { featuredProjects, getProject } from "@/content/projects";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata = pageMetadata({ title: "Resume", description: `Resume of ${profile.name}, ${profile.role} at ${profile.currentCompany} — experience, skills, projects and education.`, path: "/resume/" });

export default function ResumePage() {
  // Only offer a PDF download if the file has actually been added.
  const hasPdf = fs.existsSync(path.join(process.cwd(), "public", site.resumePdf));
  const work = experience.filter((r) => r.kind === "work");
  const extra = ["labelbuddy", "biterush", "unisecure"].map(getProject).filter((x) => x !== undefined);
  const projects = [...featuredProjects, ...extra];

  return (
    <div className="pt-28 pb-24 md:pt-36 print:pt-0 print:pb-0">
      <div className="container-x print:px-0">
        <div className="mb-10 flex flex-wrap gap-3 print:hidden">
          {hasPdf && <Button href={site.resumePdf} download>Download PDF</Button>}
          <PrintButton />
        </div>

        <article className="mx-auto max-w-4xl rounded-[var(--radius-lg)] border hairline bg-surface p-6 shadow-soft sm:p-12 print:border-0 print:p-0 print:shadow-none">
          <header className="border-b hairline pb-8">
            <h1 className="font-display text-5xl sm:text-6xl">{profile.name}</h1>
            <p className="mt-2 text-lg">{profile.role} · {profile.currentCompany}</p>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
              <span>{profile.location}</span>
              <a href={`mailto:${profile.email}`} className="-my-3 inline-flex min-h-11 items-center hover:text-accent print:my-0 print:min-h-0">{profile.email}</a>
              <a href="https://codebyasad.com" className="-my-3 inline-flex min-h-11 items-center hover:text-accent print:my-0 print:min-h-0">codebyasad.com</a>
              <a href="https://github.com/Asad2512-dev" className="-my-3 inline-flex min-h-11 items-center hover:text-accent print:my-0 print:min-h-0">github.com/Asad2512-dev</a>
              <a href="https://linkedin.com/in/asadullah2512" className="-my-3 inline-flex min-h-11 items-center hover:text-accent print:my-0 print:min-h-0">linkedin.com/in/asadullah2512</a>
            </p>
          </header>

          <section className="border-b hairline py-8" aria-labelledby="r-summary">
            <h2 id="r-summary" className="t-label mb-3">Summary</h2>
            <p className="leading-relaxed">Senior Full-Stack Engineer and Senior Product Designer at Buildexa Technologies, with 3+ years designing, building and maintaining production web and mobile products — user experience and interfaces, REST APIs, databases, authentication, deployment and maintenance. Reported portfolio of 11 published mobile apps and 13 web properties. First place, MNS University Library App Development Competition (2025).</p>
          </section>

          <section className="border-b hairline py-8" aria-labelledby="r-exp">
            <h2 id="r-exp" className="t-label mb-5">Experience</h2>
            <div className="space-y-7">
              {work.map((r) => (
                <div key={r.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{r.title} — {r.org}</h3>
                    <p className="font-mono text-xs text-muted">{formatPeriod(r)} · {r.location}{r.workMode ? ` · ${r.workMode}` : ""}</p>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-relaxed text-muted lg:text-sm print:text-sm">
                    {r.points.map((p) => <li key={p}>{p}</li>)}
                    {r.disciplines?.map((d) => <li key={d.title}><span className="text-ink">{d.title}:</span> {d.items.join(", ")}</li>)}
                    {r.reported?.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="border-b hairline py-8" aria-labelledby="r-proj">
            <h2 id="r-proj" className="t-label mb-5">Selected projects</h2>
            <ul className="space-y-3 text-base lg:text-sm print:text-sm">
              {projects.map((p) => (
                <li key={p.slug} className="break-inside-avoid"><span className="font-medium">{p.name}</span> — <span className="text-muted">{p.tagline}{p.technologies.length ? ` (${p.technologies.slice(0, 5).join(", ")})` : ""}</span></li>
              ))}
            </ul>
          </section>

          <section className="border-b hairline py-8" aria-labelledby="r-skills">
            <h2 id="r-skills" className="t-label mb-5">Skills</h2>
            <dl className="grid gap-3 text-base sm:grid-cols-[180px_1fr] lg:text-sm print:text-sm">
              {skillGroups.map((g) => (
                <div key={g.id} className="contents"><dt className="font-medium">{g.title}</dt><dd className="text-muted">{g.skills.join(", ")}</dd></div>
              ))}
            </dl>
          </section>

          <section className="py-8" aria-labelledby="r-edu">
            <h2 id="r-edu" className="t-label mb-5">Education & awards</h2>
            <p className="text-base lg:text-sm print:text-sm"><span className="font-medium">BS Computer Science</span> — National University of Modern Languages (NUML), Multan · 2022–2026</p>
            <p className="mt-2 text-base lg:text-sm print:text-sm"><span className="font-medium">First Place</span> — MNS University Library App Development Competition · 2025</p>
          </section>
        </article>
      </div>
    </div>
  );
}
