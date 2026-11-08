"use client";

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

/** Run work in its own task when the main thread is idle (keeps it out of hydration). */
export function onIdle(cb: () => void, timeout = 1200): () => void {
  const w = window as IdleWindow;
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = setTimeout(cb, 1);
  return () => clearTimeout(t);
}

/** Call `cb` once, the first time `el` comes within `margin` of the viewport. */
export function whenNear(el: Element, cb: () => void, margin = "60% 0px"): () => void {
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { io.disconnect(); cb(); }
  }, { rootMargin: margin });
  io.observe(el);
  return () => io.disconnect();
}
