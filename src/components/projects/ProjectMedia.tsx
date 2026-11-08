import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

/** Deterministic hash so each project gets a stable, unique composition. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
const rnd = (seed: number, i: number) => { const x = Math.sin(seed * 0.0001 + i * 12.9898) * 43758.5453; return x - Math.floor(x); };

const S = { ink: "var(--ink)", accent: "var(--accent)", soft: "var(--accent-soft)", surface: "var(--surface)" };

/** Stacked planes — platforms & SaaS (echoes the hero). */
function Planes({ h }: { h: number }) {
  const n = 3 + (h % 3), acc = h % n, dx = (h >> 3) % 30;
  return <>{Array.from({ length: n }, (_, i) => {
    const y = 160 - i * 26, x = 200 + dx + (i % 2) * 8, a = i === acc;
    return <path key={i} d={`M${x} ${y} l90 34 l-90 34 l-90 -34 Z`} fill={a ? S.soft : S.surface} stroke={a ? S.accent : S.ink} strokeOpacity={a ? 0.85 : 0.22} />;
  })}</>;
}

/** Device outline with interface rhythm — mobile apps. */
function Device({ h }: { h: number }) {
  const x = 160 + (h % 90), rows = 4 + (h % 3), acc = (h >> 2) % rows;
  return <g>
    <rect x={x} y="34" width="104" height="196" rx="18" fill={S.surface} stroke={S.ink} strokeOpacity="0.25" />
    <rect x={x + 38} y="44" width="28" height="5" rx="2.5" fill={S.ink} fillOpacity="0.15" />
    {Array.from({ length: rows }, (_, i) => (
      <rect key={i} x={x + 12} y={64 + i * 30} width={i === acc ? 80 : 56 + rnd(h, i) * 24} height={i === acc ? 22 : 12} rx="5" fill={i === acc ? S.soft : S.ink} fillOpacity={i === acc ? 1 : 0.08} stroke={i === acc ? S.accent : "none"} strokeOpacity="0.6" />
    ))}
    <rect x={x + 70} y="62" width="104" height="168" rx="18" fill="none" stroke={S.ink} strokeOpacity="0.1" transform="translate(40 18)" />
  </g>;
}

/** Browser frame with a layout grid — websites. */
function Browser({ h }: { h: number }) {
  const cols = 2 + (h % 3), acc = (h >> 1) % cols;
  return <g>
    <rect x="120" y="44" width="250" height="170" rx="10" fill={S.surface} stroke={S.ink} strokeOpacity="0.25" />
    <line x1="120" y1="64" x2="370" y2="64" stroke={S.ink} strokeOpacity="0.15" />
    {[0, 1, 2].map((i) => <circle key={i} cx={133 + i * 10} cy="54" r="2.6" fill={S.ink} fillOpacity="0.18" />)}
    <rect x="134" y="76" width={110 + (h % 80)} height="10" rx="3" fill={S.ink} fillOpacity="0.14" />
    {Array.from({ length: cols }, (_, i) => {
      const w = (222 - (cols - 1) * 10) / cols;
      return <rect key={i} x={134 + i * (w + 10)} y="100" width={w} height="98" rx="6" fill={i === acc ? S.soft : S.ink} fillOpacity={i === acc ? 1 : 0.05} stroke={i === acc ? S.accent : "none"} strokeOpacity="0.6" />;
    })}
  </g>;
}

/** Service graph — backend systems & tools. */
function Graph({ h }: { h: number }) {
  const n = 5 + (h % 3);
  const pts = Array.from({ length: n }, (_, i) => [140 + rnd(h, i) * 220, 50 + rnd(h, i + 9) * 150] as const);
  return <g>
    {pts.slice(1).map(([x, y], i) => <line key={i} x1={pts[0][0]} y1={pts[0][1]} x2={x} y2={y} stroke={i % 2 ? S.ink : S.accent} strokeOpacity={i % 2 ? 0.18 : 0.55} />)}
    {pts.slice(2).map(([x, y], i) => <line key={`b${i}`} x1={pts[1][0]} y1={pts[1][1]} x2={x} y2={y} stroke={S.ink} strokeOpacity="0.1" />)}
    {pts.map(([x, y], i) => i === 0
      ? <rect key={i} x={x - 16} y={y - 12} width="32" height="24" rx="6" fill={S.soft} stroke={S.accent} />
      : <circle key={i} cx={x} cy={y} r={5 + (i % 3) * 2} fill={S.surface} stroke={S.ink} strokeOpacity="0.35" />)}
  </g>;
}

/** Signal / frequency field — AI & research. */
function Signal({ h }: { h: number }) {
  const waves = 3 + (h % 2), f = 0.025 + (h % 7) * 0.004;
  return <g>
    {Array.from({ length: waves }, (_, w) => {
      const d = Array.from({ length: 60 }, (_, i) => { const x = 110 + i * 4.5; const y = 130 + Math.sin(i * f * 9 + w * 1.4) * (36 - w * 8) * Math.sin((i / 60) * Math.PI); return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ");
      return <path key={w} d={d} fill="none" stroke={w === 0 ? S.accent : S.ink} strokeOpacity={w === 0 ? 0.8 : 0.18} strokeWidth={w === 0 ? 1.6 : 1} />;
    })}
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={120 + rnd(h, i) * 250} cy={60 + rnd(h, i + 3) * 140} r="2" fill={S.ink} fillOpacity="0.25" />)}
  </g>;
}

function motif(p: Project) {
  const c = p.categories;
  if (c.includes("Research") || (c.includes("AI") && !c.includes("SaaS"))) return Signal;
  if (c[0] === "Mobile") return Device;
  if (c.includes("SaaS") || c.includes("Enterprise")) return Planes;
  if (c[0] === "Web") return Browser;
  return Graph;
}

/**
 * Project visual. Uses the first real screenshot listed in the project's content entry;
 * otherwise renders an original architectural cover whose motif reflects the discipline
 * (planes = platforms, device = mobile, browser = web, graph = backend/tools, signal = AI/research).
 * Covers make no claim to be product UI. Add screenshots under public/images/projects/<slug>/.
 */
export function ProjectMedia({ project, className, priority = false }: { project: Project; className?: string; priority?: boolean }) {
  const shot = project.screenshots[0];
  if (shot) {
    return (
      <div className={cn("relative overflow-hidden bg-paper", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.src} alt={shot.alt} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} className="h-full w-full object-cover" />
      </div>
    );
  }
  const h = hash(project.slug);
  const Motif = motif(project);
  const initials = project.name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className={cn("relative overflow-hidden bg-paper", className)} aria-hidden>
      <div className="grid-paper absolute inset-0 opacity-70" />
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        <Motif h={h} />
      </svg>
      <span className="absolute bottom-3 left-4 font-display text-[3.5rem] leading-none text-ink/[0.07] select-none sm:text-[4.5rem]">{initials}</span>
    </div>
  );
}
