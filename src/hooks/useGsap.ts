"use client";
import { useLayoutEffect, useEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs `setup` inside a gsap.context scoped to `scope` and reverts everything
 * (tweens, ScrollTriggers, listeners) on unmount. Skipped under reduced motion
 * unless `always` is set.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: { reduced: boolean }) => void | (() => void),
  deps: unknown[] = [],
  always = false,
) {
  useIso(() => {
    if (!scope.current) return;
    const reduced = prefersReducedMotion();
    if (reduced && !always) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup({ reduced });
    }, scope);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
  }, deps);
}
