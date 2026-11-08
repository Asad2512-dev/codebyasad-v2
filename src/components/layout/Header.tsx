"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { primaryNav, ctaNav } from "@/config/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last.current + 4);
      if (y < last.current - 4) setHidden(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); menuBtn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        scrolled || open ? "border-b hairline bg-paper/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${profile.name} — home`}>
          <span className="font-display text-2xl leading-none tracking-tight">Asad Ullah</span>
          <span className="hidden font-mono text-[10px] tracking-widest text-muted uppercase sm:inline">/ Engineer</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={active(n.href) ? "page" : undefined}
                  className={cn("relative py-2 text-sm transition-colors hover:text-ink", active(n.href) ? "text-ink" : "text-muted")}>
                  {n.label}
                  <span className={cn("absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500", active(n.href) ? "w-full" : "w-0")} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href={ctaNav[0].href} className="rounded-full px-4 py-2 text-sm text-ink hover:bg-surface">{ctaNav[0].label}</Link>
          <Link href={ctaNav[1].href} className="rounded-full bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-accent">{ctaNav[1].label}</Link>
        </div>

        <button ref={menuBtn} type="button" className="-mr-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-4rem)] overflow-y-auto bg-paper lg:hidden">
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between pt-6 pb-10">
          <ul className="space-y-1">
            {[...primaryNav, ...ctaNav].map((n, i) => (
              <li key={n.href} className="border-b hairline">
                <Link href={n.href} className="flex items-baseline justify-between py-4" aria-current={active(n.href) ? "page" : undefined}>
                  <span className="font-display text-4xl">{n.label}</span>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {profile.socials.map((s) => <a key={s.label} href={s.href} className="py-2 hover:text-ink">{s.label}</a>)}
          </div>
        </nav>
      </div>
    </header>
  );
}
