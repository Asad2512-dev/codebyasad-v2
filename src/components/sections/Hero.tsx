"use client";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { Hero3D } from "@/components/three/Hero3D";
import { heroState, LAYERS } from "@/components/three/progress";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { duration, ease } from "@/config/motion";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { hero } = profile;

  useGsap(root, () => {
    // Entrance — masked headline, then supporting copy
    const tl = gsap.timeline({ defaults: { ease: ease.expo } });
    // Headline lines animate in pure CSS (.hero-line) so they paint before hydration (LCP).
    // Copy fades are CSS (.hero-fade) for the same reason; GSAP only adds the stage.
    tl.from("[data-hero-stage]", { opacity: 0, scale: 0.96, duration: duration.cinematic }, 0.2);

    // Scroll choreography: progress drives the 3D stack; copy steps aside; layer legend lights up.
    gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (s) => { heroState.progress = s.progress; },
      },
    })
      .to("[data-hero-copy]", { opacity: 0, y: -60, ease: "none", duration: 0.35 }, 0.1)
      .fromTo("[data-hero-legend]", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.25)
      .fromTo("[data-legend-item]", { opacity: 0.25, x: -8 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.12 }, 0.3);

    return () => { heroState.progress = 0; };
  });

  return (
    <section ref={root} data-hero-root aria-labelledby="hero-title" className="relative h-[175svh] md:h-[230vh]">
      <div className="sticky top-0 h-svh min-h-[600px] overflow-hidden grid-paper">
        <div className="container-x relative grid h-full grid-rows-[auto_1fr] items-center pt-24 md:grid-cols-12 md:grid-rows-1 md:pt-20">
          <div data-hero-copy className="relative z-10 md:col-span-7">
            <p className="hero-fade t-label mb-6" style={{ animationDelay: "0.35s" }} data-hero-fade>{hero.label}</p>
            <h1 id="hero-title" className="t-hero">
              {hero.headline.map((line, i) => (
                <span key={line} className="mask">
                  <span className={`hero-line ${i === 2 ? "italic text-accent" : ""}`} style={{ animationDelay: `${i * 0.12}s` }}>{line}</span>
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
