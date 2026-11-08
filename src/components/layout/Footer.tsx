import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { primaryNav, ctaNav } from "@/config/navigation";
import { profile } from "@/content/profile";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t hairline bg-paper">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <BrandLogo className="mb-4" markClassName="size-10 md:hidden" lockupClassName="h-10 max-w-[min(100%,18rem)] md:max-w-none" />
          <p className="font-display text-3xl md:sr-only">{profile.name}</p>
          <p className="mt-2 max-w-sm text-base text-muted lg:text-sm">{profile.role} · {profile.location}</p>
        </div>
        <nav aria-label="Footer">
          <p className="t-label mb-4">Index</p>
          <ul className="grid grid-cols-2 text-base lg:block lg:text-sm">
            {[...primaryNav, ...ctaNav].map((n) => <li key={n.href}><Link className="inline-flex min-h-11 min-w-11 items-center text-muted hover:text-ink lg:min-h-9" href={n.href}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="t-label mb-4">Elsewhere</p>
          <ul className="text-base lg:text-sm">
            {profile.socials.map((s) => <li key={s.label}><a className="inline-flex min-h-11 min-w-11 items-center text-muted hover:text-ink lg:min-h-9" href={s.href}>{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t hairline py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] font-mono text-[11px] text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Designed &amp; engineered by Asad · Next.js, GSAP, Three.js</span>
      </div>
    </footer>
  );
}
