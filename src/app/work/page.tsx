import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { WorkIndex } from "@/components/projects/WorkIndex";
import { webProperties, mobileApps } from "@/content/achievements";

export const metadata = pageMetadata({ title: "Work", description: "Case studies and projects: MenuWave, TotalCashPro, ExamCell, UniSecure and more — web, mobile, SaaS, backend and AI.", path: "/work/" });

export default function WorkPage() {
  return (
    <>
      <PageHero label="Work" title="Platforms, products and systems." lead="Filter by discipline. Every project page separates what is verified from what is still being documented." />
      <section className="py-16 md:py-24"><div className="container-x"><WorkIndex /></div></section>

      <section aria-labelledby="index-title" className="border-t hairline bg-surface py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="index-title" className="t-title">Live web properties</h2>
            <p className="mt-3 text-sm text-muted">A selection of the 13 web properties listed in my profile.</p>
            <ul className="mt-8 border-t hairline">
              {webProperties.map((w) => (
                <li key={w.name} className="border-b hairline">
                  <a href={w.href} target="_blank" rel="noopener noreferrer" className="flex justify-between gap-4 py-3 hover:text-accent">
                    <span>{w.name}</span><span className="text-right text-sm text-muted">{w.focus} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-title">Published mobile apps</h2>
            <p className="mt-3 text-sm text-muted">Self-reported list of 11 published apps; store links are being compiled.</p>
            <ul className="mt-8 grid grid-cols-1 border-t hairline sm:grid-cols-2">
              {mobileApps.map((a) => <li key={a} className="border-b hairline py-3">{a}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
