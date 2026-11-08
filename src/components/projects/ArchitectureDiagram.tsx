import type { ArchitectureLayer } from "@/types/content";

/** Accessible SVG flow: each layer a labelled box joined by request arrows. */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  const h = 64, gap = 30, w = 560;
  const total = layers.length * h + (layers.length - 1) * gap;
  return (
    <figure>
      <svg viewBox={`0 0 ${w} ${total}`} className="w-full max-w-xl" role="img" aria-labelledby="arch-title arch-desc">
        <title id="arch-title">Architecture flow</title>
        <desc id="arch-desc">{layers.map((l) => `${l.name}: ${l.items.join(", ") || "pending"}`).join(". ")}</desc>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
          </marker>
        </defs>
        {layers.map((l, i) => {
          const y = i * (h + gap);
          const pending = l.status === "pending";
          return (
            <g key={l.id}>
              <rect x="1" y={y + 1} width={w - 2} height={h - 2} rx="12" fill={i === 1 ? "var(--accent-soft)" : "var(--surface)"} stroke={pending ? "var(--line)" : "var(--ink)"} strokeOpacity={pending ? 1 : 0.4} strokeDasharray={pending ? "5 5" : undefined} />
              <text x="20" y={y + 27} fontFamily="var(--font-geist-mono)" fontSize="10" letterSpacing="1.5" fill="var(--accent)">{String(i + 1).padStart(2, "0")} {l.id.toUpperCase()}</text>
              <text x="20" y={y + 47} fontSize="15" fill="var(--ink)" fontWeight="500">{l.name}</text>
              <text x={w - 20} y={y + 40} fontSize="11" fill="var(--muted)" textAnchor="end">{(l.items[0] ?? "Pending").slice(0, 38)}{l.items.length > 1 ? ` +${l.items.length - 1}` : ""}</text>
              {i < layers.length - 1 && <line x1={w / 2} y1={y + h + 2} x2={w / 2} y2={y + h + gap - 4} stroke="var(--accent)" markerEnd="url(#arrow)" />}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 font-mono text-[10px] tracking-wider text-muted uppercase">Dashed layers: details pending confirmation</figcaption>
    </figure>
  );
}
