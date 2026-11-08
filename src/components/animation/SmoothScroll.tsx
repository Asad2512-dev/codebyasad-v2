"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { onIdle } from "@/lib/schedule";

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let lenis: Lenis | undefined;
    let tick: ((t: number) => void) | undefined;
    // Start smooth scrolling in an idle task, outside hydration.
    const cancel = onIdle(() => {
      const l = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1 });
      lenis = l;
      (window as unknown as { __lenis?: Lenis }).__lenis = l;
      l.on("scroll", ScrollTrigger.update);
      tick = (t: number) => l.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }, 2000);
    return () => {
      cancel();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Client-side route change: jump to top (or hash target) and recompute trigger
  // positions. Skipped on first load so reloads keep the browser's scroll position
  // and hydration doesn't pay for a full layout pass.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!window.location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
