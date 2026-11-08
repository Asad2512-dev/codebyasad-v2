import { profile } from "@/content/profile";

export function Philosophy() {
  const { philosophy } = profile;
  return (
    <section aria-labelledby="philosophy-title" className="border-t hairline bg-ink py-24 text-paper md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="t-label mb-6 !text-paper/60"><span className="text-[#8FB0FF]">08</span> — Engineering philosophy</p>
            <h2 id="philosophy-title" className="t-display" data-reveal>{philosophy.headline}</h2>
          </div>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {philosophy.principles.map((p, i) => (
            <li key={p.title} className="border-t border-paper/15 py-8" data-reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-[#8FB0FF]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl">{p.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-paper/70">{p.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
