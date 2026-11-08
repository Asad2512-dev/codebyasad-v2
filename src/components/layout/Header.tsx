"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { primaryNav, ctaNav, mobileNav } from "@/config/navigation";
import { profile } from "@/content/profile";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const active = useCallback((href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href)), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 400 && y > last.current + 4) setHidden(true);
      else if (y < last.current - 4) setHidden(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The open/close timeline is built lazily on first open (no work on page load), then reversed to close.
  const ctxRef = useRef<gsap.Context | null>(null);
  const ensureTimeline = useCallback(() => {
    const el = overlay.current;
    if (tl.current || !el) return tl.current;
    ctxRef.current = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
        .fromTo("[data-menu-link]", { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.045 }, "-=0.35")
        .fromTo("[data-menu-fade]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.55");
      tl.current.eventCallback("onReverseComplete", () => { gsap.set(el, { visibility: "hidden" }); });
    }, el);
    return tl.current;
  }, []);
  useEffect(() => () => ctxRef.current?.revert(), []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuBtn.current?.focus());
  }, []);

  // Open/close side effects: animation, scroll lock, inert background, focus.
  useEffect(() => {
    const el = overlay.current;
    const bg = [document.getElementById("main"), document.querySelector("body > footer, footer:not(#mobile-menu footer)")].filter(Boolean) as HTMLElement[];
    if (open) {
      if (prefersReducedMotion()) { if (el) { el.style.visibility = "visible"; el.style.clipPath = "none"; } }
      else ensureTimeline()?.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
      lenis()?.stop();
      bg.forEach((n) => n.setAttribute("inert", ""));
      const first = el?.querySelector<HTMLElement>("a[href]");
      setTimeout(() => first?.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 250);
    } else {
      if (prefersReducedMotion() || !tl.current) { if (el) { el.style.visibility = "hidden"; if (!prefersReducedMotion()) el.style.clipPath = "inset(0% 0% 100% 0%)"; } }
      else if (tl.current.progress() > 0) tl.current.timeScale(2.5).reverse();
      document.documentElement.style.overflow = "";
      lenis()?.start();
      bg.forEach((n) => n.removeAttribute("inert"));
    }
  }, [open, ensureTimeline]);

  // Close on navigation (incl. back/forward) and when rotating/resizing to desktop.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => { if (mq.matches) setOpen(false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape + focus trap (menu button + overlay links).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const items = [menuBtn.current, ...(overlay.current?.querySelectorAll<HTMLElement>("a[href],button") ?? [])].filter(Boolean) as HTMLElement[];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[transform,background-color,border-color] duration-500",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        open ? "border-b border-transparent" : scrolled ? "border-b hairline bg-paper/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="container-x relative z-20 flex h-14 items-center justify-between md:h-20">
        <Link href="/" className="-ml-1 flex min-h-11 items-center px-2 py-1" aria-label={`${profile.name} — home`}>
          <BrandLogo lockupClassName="h-8 md:h-9" markClassName="size-8" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={active(n.href) ? "page" : undefined}
                  className={cn("relative inline-flex min-h-11 items-center text-sm transition-colors hover:text-ink", active(n.href) ? "text-ink" : "text-muted")}>
                  {n.label}
                  <span className={cn("absolute bottom-2 left-0 h-px bg-accent transition-all duration-500", active(n.href) ? "w-full" : "w-0")} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href={ctaNav[0].href} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-ink hover:bg-surface">{ctaNav[0].label}</Link>
          <Link href={ctaNav[1].href} className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-paper transition-colors hover:bg-accent">{ctaNav[1].label}</Link>
        </div>

        <button ref={menuBtn} type="button" onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 inline-flex min-h-11 items-center gap-3 rounded-full px-3 lg:hidden">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase">{open ? "Close" : "Menu"}</span>
          <span aria-hidden className="relative block h-3 w-5">
            <span className={cn("absolute left-0 h-px w-5 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)]", open ? "top-1.5 rotate-45" : "top-0.5")} />
            <span className={cn("absolute left-0 h-px w-5 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)]", open ? "top-1.5 -rotate-45" : "top-2.5")} />
          </span>
        </button>
      </div>

    </header>
      {/* Full-screen mobile menu */}
      <div id="mobile-menu" ref={overlay} role="dialog" aria-modal="true" aria-label="Site menu"
        className="grid-paper invisible fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-paper pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[env(safe-area-inset-bottom)] lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col pt-6 pb-8 short:pt-2">
          <ol className="border-t hairline">
            {mobileNav.map((n, i) => {
              const on = active(n.href);
              return (
                <li key={n.href} className="overflow-hidden border-b hairline">
                  <Link href={n.href} data-menu-link aria-current={on ? "page" : undefined} onClick={() => close(false)}
                    className="group flex min-h-[3.75rem] items-center justify-between gap-4 py-2 short:min-h-11">
                    <span className="flex items-baseline gap-4">
                      <span className={cn("font-mono text-[11px] transition-colors", on ? "text-accent" : "text-muted")}>0{i + 1}</span>
                      <span className={cn("font-display text-[clamp(2rem,9vw,3rem)] leading-none transition-colors short:text-[1.6rem]", on ? "italic text-accent" : "text-ink group-active:text-accent")}>{n.label}</span>
                    </span>
                    {on ? <span className="size-2 rounded-full bg-accent" aria-hidden /> : <ArrowUpRight aria-hidden className="size-5 text-muted transition-transform group-active:translate-x-0.5" />}
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="mt-auto pt-8">
            <div className="grid grid-cols-2 gap-3" data-menu-fade>
              <Link href="/resume/" onClick={() => close(false)} aria-current={active("/resume/") ? "page" : undefined}
                className="inline-flex min-h-12 items-center justify-center rounded-full border hairline bg-surface text-[15px] active:scale-[.98]">Resume</Link>
              <Link href="/contact/" onClick={() => close(false)} aria-current={active("/contact/") ? "page" : undefined}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink text-[15px] text-paper active:scale-[.98]">Let&apos;s talk</Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-1" data-menu-fade>
              <ul className="flex gap-5 text-sm text-muted">
                {profile.socials.map((s) => <li key={s.label}><a href={s.href} className="inline-flex min-h-11 items-center hover:text-ink">{s.label}</a></li>)}
              </ul>
              <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{profile.location}</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
