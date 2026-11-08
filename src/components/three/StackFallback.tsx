import { colors } from "@/config/theme";

/** Static isometric drawing of the same five-layer stack. Rendered on the server,
 *  shown under the canvas while it loads, and used alone for reduced motion,
 *  no-WebGL or context loss. */
export function StackFallback({ className }: { className?: string }) {
  const layers = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 400 420" className={className} role="img" aria-label="Five stacked layers of a software product: interface, API, services, data and infrastructure">
      {layers.map((i) => {
        const y = 70 + i * 62;
        const accent = i === 1;
        return (
          <g key={i}>
            <path d={`M200 ${y} L340 ${y + 48} L200 ${y + 96} L60 ${y + 48} Z`} fill={accent ? colors.accentSoft : colors.surface} fillOpacity={0.9} stroke={accent ? colors.accent : colors.ink} strokeOpacity={accent ? 0.9 : 0.3} />
            <path d={`M60 ${y + 48} L60 ${y + 54} L200 ${y + 102} L340 ${y + 54} L340 ${y + 48}`} fill="none" stroke={colors.ink} strokeOpacity={0.18} />
            <circle cx={150 + i * 9} cy={y + 46} r={3} fill={i % 2 ? colors.ink : colors.accent} />
            <circle cx={240 - i * 6} cy={y + 52} r={3} fill={colors.ink} />
          </g>
        );
      })}
      <line x1="160" y1="110" x2="160" y2="370" stroke={colors.accent} strokeOpacity={0.5} />
      <line x1="236" y1="120" x2="236" y2="380" stroke={colors.accent} strokeOpacity={0.5} />
    </svg>
  );
}
