"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { duration, ease } from "@/config/motion";

/**
 * Global reveal system for [data-reveal] elements, built on IntersectionObserver
 * (no layout reads, no ScrollTriggers). Content is visible by default; only
 * elements the observer reports as off-screen are marked [data-pending] (hidden
 * by CSS) and then animate in when they arrive. Nothing already seen is hidden.
 */
export function RevealRoot() {
  const pathname = usePathname();
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const seen = new WeakSet<Element>();
    let queue: HTMLElement[] = [];
    let raf = 0;
    const flush = () => {
      raf = 0;
      const batch = queue; queue = [];
      batch.forEach((el) => el.removeAttribute("data-pending"));
      gsap.fromTo(batch, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.out, stagger: 0.08, clearProps: "opacity,transform" });
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (!seen.has(el)) {
          seen.add(el);
          if (e.isIntersecting) { io.unobserve(el); continue; } // already visible: leave it alone
          el.setAttribute("data-pending", "");
          continue;
        }
        if (e.isIntersecting) {
          io.unobserve(el);
          queue.push(el);
          if (!raf) raf = requestAnimationFrame(flush);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      els.forEach((el) => el.removeAttribute("data-pending"));
    };
  }, [pathname]);
  return null;
}
