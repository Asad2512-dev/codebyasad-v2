import { cn } from "@/lib/utils";

export function SectionHeader({
  index, label, title, lead, className, as: Tag = "h2",
}: { index?: string; label: string; title: string; lead?: string; className?: string; as?: "h1" | "h2" }) {
  return (
    <header className={cn("max-w-4xl", className)}>
      <p className="t-label mb-6 flex items-center gap-3" data-reveal={Tag === "h1" ? undefined : true}>
        {index && <span className="text-accent">{index}</span>}
        <span className="h-px w-8 bg-line" aria-hidden />
        <span>{label}</span>
      </p>
      <Tag className={Tag === "h1" ? "t-display" : "t-title md:text-[clamp(2.4rem,4.6vw,4.25rem)]"} data-reveal={Tag === "h1" ? undefined : true}>
        {title}
      </Tag>
      {lead && <p className="t-lead mt-6 max-w-2xl" data-reveal={Tag === "h1" ? undefined : true}>{lead}</p>}
    </header>
  );
}
