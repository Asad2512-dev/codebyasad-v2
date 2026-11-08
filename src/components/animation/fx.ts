"use client";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { heroState } from "@/components/three/progress";
import { duration, ease } from "@/config/motion";

/**
 * Scroll choreography for server-rendered sections. Each entry receives the
 * section element and runs inside a gsap.context scoped to it, so selectors are
 * local and everything is reverted on unmount.
 */
export const effects: Record<string, (root: HTMLElement) => void | (() => void)> = {
  hero(root) {
    const mm = gsap.matchMedia();
    // Desktop: pinned cinematic stage — progress drives the stack, copy steps aside, legend lights up.
    mm.add("(min-width: 1024px)", () => {
      gsap.from("[data-hero-stage]", { opacity: 0, scale: 0.96, duration: duration.cinematic, ease: ease.expo, delay: 0.2 });
      gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6, onUpdate: (s) => { heroState.progress = s.progress; } },
      })
        .to("[data-hero-copy]", { opacity: 0, y: -60, ease: "none", duration: 0.35 }, 0.1)
        .fromTo("[data-hero-legend]", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.25)
        .fromTo("[data-legend-item]", { opacity: 0.25, x: -8 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.12 }, 0.3);
    });
    // Phones & tablets: no pinning. The stack opens gently as its frame scrolls through the viewport.
    mm.add("(max-width: 1023px)", () => {
      gsap.from("[data-hero-stage]", { opacity: 0, y: 24, duration: duration.slow, ease: ease.out, delay: 0.5 });
      ScrollTrigger.create({
        trigger: "[data-hero-stage]", start: "top 85%", end: "bottom 15%", scrub: 0.5,
        onUpdate: (s) => { heroState.progress = s.progress * 0.75; },
      });
    });
    return () => { mm.revert(); heroState.progress = 0; };
  },

  identity() {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo("[data-rail]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-pipeline]", start: "top 75%", end: "bottom 45%", scrub: true } });
      gsap.from("[data-step]", { y: 40, opacity: 0, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "[data-pipeline]", start: "top 75%", end: "bottom 50%", scrub: 0.8 } });
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo("[data-rail-v]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-pipeline]", start: "top 70%", end: "bottom 60%", scrub: true } });
    });
    return () => mm.revert();
  },

  stats() {
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onStart: () => { el.textContent = "0"; },
        onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
      });
    });
  },

  work() {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (c) => {
      const desktop = c.conditions?.desktop;
      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((stage) => {
        const q = (sel: string) => stage.querySelector(sel);
        const base = q("[data-layer='base']"), float = q("[data-layer='float']"), index = q("[data-index]"), visual = q("[data-visual]");
        const st = (o: ScrollTrigger.Vars) => ({ trigger: stage, ...o });
        if (desktop) {
          if (base) gsap.fromTo(base, { rotateX: 14, rotateY: -10, y: 60 }, { rotateX: 0, rotateY: 0, y: 0, ease: "none", scrollTrigger: st({ start: "top bottom", end: "center center", scrub: 0.8 }) });
          if (float) gsap.fromTo(float, { y: 80 }, { y: -30, ease: "none", scrollTrigger: st({ start: "top bottom", end: "bottom top", scrub: true }) });
          if (index) gsap.fromTo(index, { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: st({ start: "top bottom", end: "bottom top", scrub: true }) });
        } else if (base) {
          gsap.fromTo(base, { y: 28 }, { y: 0, ease: "none", scrollTrigger: st({ start: "top bottom", end: "top 40%", scrub: 0.6 }) });
        }
        if (visual) gsap.fromTo(visual, { clipPath: desktop ? "inset(12% 8% 12% 8% round 24px)" : "inset(6% 4% 6% 4% round 20px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: st({ start: "top 92%", end: desktop ? "top 30%" : "top 45%", scrub: true }),
        });
      });
    });
    return () => mm.revert();
  },

  timeline() {
    gsap.fromTo("[data-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 70%", end: "bottom 70%", scrub: true } });
  },

  contact(root) {
    gsap.from("[data-word]", { yPercent: 110, duration: 1.2, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 70%" } });
    gsap.fromTo("[data-orbit]", { rotate: 0 }, { rotate: 90, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
  },
};
