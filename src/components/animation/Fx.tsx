"use client";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onIdle, whenNear } from "@/lib/schedule";
import { effects } from "./effects";

/**
 * Drop inside any server-rendered section: <Fx name="stats" />.
 * The section's ScrollTriggers are only created when it nears the viewport, each in
 * its own idle task — so page load never pays for layout reads of distant sections.
 */
export function Fx({ name, eager = false }: { name: keyof typeof effects; eager?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest("section");
    if (!root || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    let cleanup: void | (() => void);
    let cancelIdle = () => {};
    const start = () => {
      cancelIdle = onIdle(() => {
        ctx = gsap.context(() => { cleanup = effects[name](root); }, root);
      });
    };
    const stopWatching = eager ? (start(), () => {}) : whenNear(root, start);
    return () => {
      stopWatching();
      cancelIdle();
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
  }, [name, eager]);
  return <span ref={ref} hidden />;
}
