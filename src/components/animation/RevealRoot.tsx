"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { duration, ease, stagger } from "@/config/motion";

/**
 * Global reveal system: any element with [data-reveal] fades/rises in when it
 * enters the viewport. Content is visible by default (no JS / reduced motion);
 * the hidden state is only applied once this component has taken control.
 */
export function RevealRoot() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("js-motion");
      return;
    }
    // Anything already on screen stays visible — never hide content the visitor
    // (or LCP) has already seen. Only below-the-fold elements get the reveal.
    const vh = window.innerHeight;
    const all = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    all.forEach((el) => { if (el.getBoundingClientRect().top < vh) el.setAttribute("data-revealed", ""); });
    root.classList.add("js-motion");
    const els = all.filter((el) => !el.hasAttribute("data-revealed"));
    const triggers = ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: duration.base, ease: ease.out, stagger: stagger.base, overwrite: true }),
    });
    // Anything already above the fold or skipped by back/forward navigation
    ScrollTrigger.refresh();
    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set(els, { clearProps: "opacity,transform" });
      all.forEach((el) => el.removeAttribute("data-revealed"));
    };
  }, [pathname]);
  return null;
}
