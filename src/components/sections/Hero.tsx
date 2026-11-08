import { Fx } from "@/components/animation/Fx";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { Hero3D } from "@/components/three/Hero3D";
import { LAYERS } from "@/components/three/progress";

/**
 * Two compositions over one markup:
 *  - ≥1024px: pinned, scroll-scrubbed cinematic stage (copy left, 3D right).
 *  - <1024px: natural-height hero — identity, headline, copy and CTAs on the first screen,
 *    then a framed 3D stage with a layer legend. Short landscape phones get a compact two-column layout.
 * Headline and CTAs are server-rendered and CSS-animated, so they never wait for JS or WebGL.
 */
export function Hero() {
  const { hero } = profile;
  return (
    <section data-hero-root aria-labelledby="hero-title" className="relative lg:h-[230vh]">
      <Fx name="hero" eager />
      <div className="grid-paper relative overflow-hidden lg:sticky lg:top-0 lg:h-[100dvh] lg:min-h-[600px]">
        <div className="container-x relative grid gap-10 pt-[calc(6rem+env(safe-area-inset-top))] pb-14 shortp:pt-[calc(4.75rem+env(safe-area-inset-top))] shortp:gap-8 md:gap-12 md:pt-32 lg:h-full lg:grid-cols-12 lg:items-center lg:gap-0 lg:pt-20 lg:pb-0 short:grid-cols-[1.15fr_1fr] short:items-center short:gap-6 short:pt-[4.25rem] short:pb-6">
          <div data-hero-copy className="relative z-10 lg:col-span-7">
            <p className="hero-fade t-label mb-5 md:mb-6 shortp:mb-3 short:mb-3" style={{ animationDelay: "0s" }} data-hero-fade>{hero.label}</p>
            <h1 id="hero-title" className="t-hero t-hero--split">
              {hero.headline.map((line, i) => (
                <span key={line} className="mask">
                  <span className={`hero-line ${i === hero.accentLine ? "italic text-accent" : i % 2 ? "italic" : ""}`} style={{ animationDelay: `${i * 0.1}s` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-fade mt-6 font-display text-[1.6rem] leading-tight md:text-3xl shortp:mt-4 shortp:text-[1.35rem] short:sr-only" style={{ animationDelay: "0.4s" }} data-hero-fade>{profile.name}</p>
            <p className="hero-fade t-lead mt-3 max-w-xl text-pretty lg:max-w-[min(36rem,40vw)] shortp:mt-2 short:sr-only" style={{ animationDelay: "0.5s" }} data-hero-fade>{hero.support}</p>
            {/* Short landscape: one compact identity line instead of name + paragraph */}
            <p aria-hidden className="hero-fade mt-4 hidden text-[15px] leading-snug text-muted short:block" style={{ animationDelay: "0.4s" }}>
              <span className="font-display text-xl text-ink">{profile.name}</span><br />{profile.role} · {profile.currentCompany}
            </p>
            <div className="hero-fade mt-7 flex flex-wrap items-center gap-3 md:mt-8 shortp:mt-5 short:mt-5" style={{ animationDelay: "0.6s" }} data-hero-fade>
              <Button href={hero.ctas.primary.href} className="max-sm:w-full max-sm:justify-center">{hero.ctas.primary.label}</Button>
              <Button href={hero.ctas.secondary.href} variant="secondary" icon={false} className="max-sm:flex-1 max-sm:justify-center">{hero.ctas.secondary.label}</Button>
              <Button href={hero.ctas.tertiary.href} variant="ghost" className="max-sm:flex-1 max-sm:justify-center short:hidden">{hero.ctas.tertiary.label}</Button>
            </div>
          </div>

          {/* Stage: framed card on phones/tablets, full-bleed right column on desktop */}
          <div className="relative lg:contents">
            <div data-hero-stage
              className="relative aspect-[5/4] max-h-[46svh] w-full overflow-hidden rounded-[var(--radius-lg)] border hairline bg-surface/50 sm:aspect-[16/10] lg:pointer-events-auto lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:max-h-none lg:w-[58%] lg:rounded-none lg:border-0 lg:bg-transparent short:aspect-auto short:h-[68dvh] short:max-h-none">
              <Hero3D />
            </div>
            <ol aria-label="Layers of a product" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 lg:hidden short:hidden">
              {LAYERS.map((l, i) => (
                <li key={l.id} className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted uppercase">
                  <span className="text-accent">0{i + 1}</span>{l.label}
                </li>
              ))}
            </ol>
          </div>

          <ol data-hero-legend aria-hidden className="absolute bottom-10 left-[clamp(1rem,4vw,3.5rem)] z-10 hidden space-y-2 opacity-0 lg:block">
            {LAYERS.map((l, i) => (
              <li key={l.id} data-legend-item className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
                <span className="text-accent">0{i + 1}</span><span className="h-px w-6 bg-line" />{l.label}
              </li>
            ))}
          </ol>

          <p className="hero-fade absolute right-[clamp(1rem,4vw,3.5rem)] bottom-8 hidden font-mono text-[10px] tracking-widest text-muted uppercase lg:block" style={{ animationDelay: "0.75s" }} data-hero-fade>
            Scroll to open the stack ↓
          </p>
        </div>
        {/* Mobile scroll cue */}
        <a href="#identity" className="hero-fade mx-auto -mt-4 mb-6 flex min-h-11 w-fit items-center gap-3 px-3 font-mono text-[10px] tracking-[0.2em] text-muted uppercase lg:hidden short:hidden" style={{ animationDelay: "0.9s" }}>
          <span aria-hidden className="scroll-cue relative h-6 w-px overflow-hidden bg-line" />Scroll
        </a>
      </div>
    </section>
  );
}
