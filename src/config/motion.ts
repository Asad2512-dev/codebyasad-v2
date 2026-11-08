/** Animation timings and easings shared by every GSAP timeline. */
export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  soft: "sine.inOut",
} as const;

export const duration = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.6,
} as const;

export const stagger = { tight: 0.04, base: 0.08, loose: 0.14 } as const;

/** Distance (px) elements travel when revealing. */
export const reveal = { y: 28, mask: 110 } as const;
