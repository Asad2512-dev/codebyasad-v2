"use client";
import Link from "next/link";
import { useRef } from "react";
import { stats } from "@/content/achievements";
import { Status } from "@/components/ui/Status";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

export function Stats() {
  const root = useRef<HTMLElement>(null);
  const shown = stats.filter((s) => s.status !== "pending");

  useGsap(root, () => {
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="stats-title" className="border-t hairline py-24 md:py-32">
      <div className="container-x">
        <SectionHeader index="03" label="Proof in numbers" title="Shipped, not sketched." />
        <h3 id="stats-title" className="sr-only">Career statistics</h3>
        <dl className="mt-16 grid border-t hairline sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((s) => (
            <div key={s.label} className="border-b hairline py-10 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0 lg:last:border-r-0" data-reveal>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <p className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-none tracking-tight">
                  <span data-count={s.value}>{s.value}</span>
                  <span className="text-accent">{s.suffix}</span>
                </p>
                <p className="mt-4 text-base font-medium">{s.label}<Status status={s.status} /></p>
                {s.note && <p className="mt-1 text-sm text-muted">{s.note}</p>}
                {s.evidence && (
                  s.evidence.href.startsWith("http")
                    ? <a href={s.evidence.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-mono text-[11px] tracking-wider text-accent uppercase hover:underline">{s.evidence.label} ↗</a>
                    : <Link href={s.evidence.href} className="mt-4 inline-block font-mono text-[11px] tracking-wider text-accent uppercase hover:underline">{s.evidence.label} →</Link>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
