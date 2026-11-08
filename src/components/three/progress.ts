/** Shared, mutable scroll state written by GSAP and read inside the render loop
 *  (avoids React re-renders on every scroll frame). */
export const heroState = { progress: 0, active: true };

export const LAYERS = [
  { id: "interface", label: "Interface" },
  { id: "api", label: "API" },
  { id: "services", label: "Services" },
  { id: "data", label: "Data" },
  { id: "infrastructure", label: "Infrastructure" },
] as const;
