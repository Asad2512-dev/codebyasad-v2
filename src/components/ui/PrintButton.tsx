"use client";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded-full border hairline bg-surface px-5 text-sm hover:border-ink">
      <Printer className="size-4" aria-hidden /> Print / Save as PDF
    </button>
  );
}
