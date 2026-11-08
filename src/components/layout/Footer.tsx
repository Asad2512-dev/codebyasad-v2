import Link from "next/link";
import { primaryNav, ctaNav } from "@/config/navigation";
import { profile } from "@/content/profile";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t hairline bg-paper">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{profile.role} · {profile.location}</p>
        </div>
        <nav aria-label="Footer">
          <p className="t-label mb-4">Index</p>
          <ul className="space-y-2 text-sm">
            {[...primaryNav, ...ctaNav].map((n) => <li key={n.href}><Link className="text-muted hover:text-ink" href={n.href}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="t-label mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {profile.socials.map((s) => <li key={s.label}><a className="text-muted hover:text-ink" href={s.href}>{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t hairline py-6 font-mono text-[11px] text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Designed &amp; engineered by Asad · Next.js, GSAP, Three.js</span>
      </div>
    </footer>
  );
}
