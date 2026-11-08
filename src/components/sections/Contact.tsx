import { Fx } from "@/components/animation/Fx";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";

export function Contact({ as: Tag = "h2" }: { as?: "h1" | "h2" }) {
  const words = profile.contact.headline.split(" ");


  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t hairline bg-surface py-28 md:py-44">
      <Fx name="contact" />
      <svg data-orbit aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute -right-40 -bottom-40 w-[620px] text-line md:-right-24">
        {[290, 230, 170, 110].map((r) => <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" />)}
        <circle cx="530" cy="190" r="7" fill="var(--accent)" />
      </svg>
      <div className="container-x relative">
        <p className="t-label mb-8"><span className="text-accent">10</span> — Contact</p>
        <Tag id="contact-title" className="t-hero max-w-6xl">
          {words.map((w, i) => (
            <span key={i} className="mask mr-[0.22em] inline-block align-top"><span data-word className={i === words.length - 1 ? "italic text-accent" : undefined}>{w}</span></span>
          ))}
        </Tag>
        <p className="t-lead mt-8 max-w-xl" data-reveal>{profile.contact.text}</p>

        <a href={`mailto:${profile.email}`} className="group mt-12 inline-flex max-w-full items-center gap-3 border-b-2 border-ink pb-2 text-[clamp(1.1rem,3.2vw,2.5rem)] break-all transition-colors hover:border-accent hover:text-accent" data-reveal>
          <Mail className="size-[0.8em] shrink-0" aria-hidden />{profile.email}
          <ArrowUpRight aria-hidden className="size-[0.8em] shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>

        <div className="mt-14 flex flex-wrap gap-3" data-reveal>
          {profile.socials.filter((s) => !s.href.startsWith("mailto")).map((s) => <Button key={s.label} href={s.href} variant="secondary">{s.label}</Button>)}
          <Button href="/resume/" variant="secondary" icon={false}>Resume</Button>
          <Button href="https://codebyasad.com" variant="ghost">codebyasad.com</Button>
        </div>
        <p className="mt-10 font-mono text-xs text-muted" data-reveal>{profile.location} · {profile.timezone}</p>
      </div>
    </section>
  );
}
