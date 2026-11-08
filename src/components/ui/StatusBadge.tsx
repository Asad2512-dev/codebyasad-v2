import type { ProjectStatus } from "@/types/content";
import { cn } from "@/lib/utils";

const tone: Record<ProjectStatus, string> = {
  Live: "border-emerald-600/25 bg-emerald-50 text-emerald-800",
  Completed: "hairline bg-paper text-ink",
  "In Development": "border-amber-600/30 bg-amber-50 text-amber-900",
  Research: "border-accent/30 bg-accent-soft/60 text-accent",
  Archived: "hairline bg-paper text-muted",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase", tone[status], className)}>
      {status === "Live" && <span aria-hidden className="size-1.5 rounded-full bg-emerald-600" />}
      {status}
    </span>
  );
}
