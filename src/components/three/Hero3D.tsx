"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getDeviceTier } from "@/lib/device";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { StackFallback } from "./StackFallback";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const StackScene = dynamic(() => import("./StackScene"), { ssr: false });

/** Shows the static drawing immediately; swaps in WebGL after the page is idle
 *  and only on capable devices without reduced motion. */
export function Hero3D() {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<"none" | "low" | "high" | null>(null);
  const [lost, setLost] = useState(false);
  const [ready, setReady] = useState(false);

  // The ~250 kB 3D bundle is deferred: it loads on the visitor's first interaction
  // (scroll, pointer, key, touch) or ~3 s after the page has loaded, whichever is
  // first — so hero text and CTAs are never competing with WebGL for the main thread.
  useEffect(() => {
    let done = false;
    const events = ["pointermove", "scroll", "keydown", "touchstart", "wheel"] as const;
    const go = () => {
      if (done) return;
      done = true;
      events.forEach((e) => window.removeEventListener(e, go));
      setTier(getDeviceTier());
    };
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    let timer: ReturnType<typeof setTimeout>;
    const arm = () => { timer = setTimeout(go, 9000); };
    if (document.readyState === "complete") arm(); else window.addEventListener("load", arm, { once: true });
    return () => { done = true; clearTimeout(timer); events.forEach((e) => window.removeEventListener(e, go)); window.removeEventListener("load", arm); };
  }, []);

  const use3D = !reduced && !lost && tier && tier !== "none";

  useEffect(() => {
    if (!use3D) return;
    const t = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(t);
  }, [use3D]);

  return (
    <div className="relative h-full w-full">
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${use3D && ready ? "opacity-0" : "opacity-100"}`}>
        <StackFallback className="h-[78%] max-h-[560px] w-auto" />
      </div>
      {use3D && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <ErrorBoundary fallback={null} onError={() => setLost(true)}>
            <StackScene lite={tier === "low"} onContextLost={() => setLost(true)} />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
