import { Fx } from "@/components/animation/Fx";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { Hero3D } from "@/components/three/Hero3D";
import { LAYERS } from "@/components/three/progress";

export function Hero() {
  const { hero } = profile;


  return (
    <section data-hero-root aria-labelledby="hero-title" className="relative h-[175svh] md:h-[230vh]">
      <Fx name="hero" eager />
      <div className="sticky top-0 h-svh min-h-[600px] overflow-hidden grid-paper">
        <div className="container-x relative grid h-full grid-rows-[auto_1fr] items-center pt-24 md:grid-cols-12 md:grid-rows-1 md:pt-20">
          <div data-hero-copy className="relative z-10 md:col-span-7">
            <p className="hero-fade t-label mb-6" style={{ animationDelay: "0s" }} data-hero-fade>{hero.label}</p>
            <h1 id="hero-title" className="t-hero t-hero--split">
              {hero.headline.map((line, i) => (
                <span key={line} className="mask">
                  <span className={`hero-line ${i === hero.accentLine ? "italic text-accent" : i % 2 ? "italic" : ""}`} style={{ animationDelay: `${i * 0.12}s` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-fade mt-6 font-display text-2xl md:text-3xl" style={{ animationDelay: "0.45s" }} data-hero-fade>{profile.name}</p>
            <p className="hero-fade t-lead mt-3 max-w-xl" style={{ animationDelay: "0.55s" }} data-hero-fade>{hero.support}</p>
            <div className="hero-fade mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.65s" }} data-hero-fade>
              <Button href={hero.ctas.primary.href}>{hero.ctas.primary.label}</Button>
              <Button href={hero.ctas.secondary.href} variant="secondary" icon={false}>{hero.ctas.secondary.label}</Button>
              <Button href={hero.ctas.tertiary.href} variant="ghost">{hero.ctas.tertiary.label}</Button>
            </div>
          </div>

          <div data-hero-stage className="pointer-events-none absolute inset-x-0 bottom-0 h-[42svh] opacity-60 md:pointer-events-auto md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[58%] md:opacity-100">
            <Hero3D />
          </div>

          <ol data-hero-legend aria-label="Layers of a product" className="absolute bottom-10 left-[clamp(1rem,4vw,3.5rem)] z-10 hidden space-y-2 opacity-0 md:block">
            {LAYERS.map((l, i) => (
              <li key={l.id} data-legend-item className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
                <span className="text-accent">0{i + 1}</span><span className="h-px w-6 bg-line" />{l.label}
              </li>
            ))}
          </ol>

          <p className="hero-fade absolute right-[clamp(1rem,4vw,3.5rem)] bottom-8 hidden font-mono text-[10px] tracking-widest text-muted uppercase md:block" style={{ animationDelay: "0.75s" }} data-hero-fade>
            Scroll to open the stack ↓
          </p>
        </div>
      </div>
    </section>
  );
}
