"use client";

/** Rough capability check used to decide how much 3D to render. */
export function getDeviceTier(): "none" | "low" | "high" {
  if (typeof window === "undefined") return "none";
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return "none";
  } catch {
    return "none";
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return "none";
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 4;
  const small = window.matchMedia("(max-width: 767px)").matches;
  if (cores <= 4 || mem <= 3 || small) return "low";
  return "high";
}
