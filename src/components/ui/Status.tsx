import type { Verification } from "@/types/content";

/** Small honest label next to anything not independently verified. */
export function Status({ status }: { status: Verification }) {
  if (status === "verified") return null;
  const text = status === "reported" ? "Self-reported" : "Pending confirmation";
  return (
    <span className="ml-2 inline-flex items-center rounded-full border hairline bg-surface px-2 py-0.5 align-middle font-mono text-[10px] tracking-wider text-muted uppercase">
      {text}
    </span>
  );
}
