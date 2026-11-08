import Link from "next/link";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Stats } from "@/components/sections/Stats";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({ title: "About", description: `About ${profile.name} — ${profile.role} at ${profile.currentCompany}, based in Multan, Pakistan.`, path: "/about/" });

export default function About() {
  return (
    <>
      <PageHero label="About" title="I design the experience. I engineer the product." />
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="space-y-5 border-t hairline pt-6 text-sm" data-reveal>
              <div><dt className="t-label">Based in</dt><dd className="mt-1">{profile.location} · {profile.timezone}</dd></div>
              <div><dt className="t-label">Focus</dt><dd className="mt-1">{profile.role}</dd></div>
              <div><dt className="t-label">Education</dt><dd className="mt-1">BS Computer Science, NUML (2022–2026)</dd></div>
              <div><dt className="t-label">Looking for</dt><dd className="mt-1">{profile.availability}</dd></div>
            </dl>
          </aside>
          <div className="space-y-6 text-lg leading-relaxed lg:col-span-7 lg:col-start-6">
            {profile.about.paragraphs.map((p) => <p key={p.slice(0, 20)} data-reveal>{p}</p>)}
            <div className="flex flex-wrap gap-3 pt-4" data-reveal>
              <Button href="/work/">See the work</Button>
              <Button href="/resume/" variant="secondary" icon={false}>Resume</Button>
            </div>
            <p className="text-sm text-muted" data-reveal>More detail on <Link className="underline underline-offset-4" href="/experience/">experience</Link> and <Link className="underline underline-offset-4" href="/expertise/">expertise</Link>.</p>
          </div>
        </div>
      </section>
      <Stats />
      <Philosophy />
    </>
  );
}
