import type { RiskLevel } from "@/data/projects";
import { riskColor, riskLabel } from "@/data/projects";

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "sm" | "md";
}

export default function RiskBadge({ level, size = "sm" }: RiskBadgeProps) {
  const color = riskColor(level);
  const label = riskLabel(level);
  const padding = size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1 ${padding} font-semibold uppercase tracking-wide rounded border`}
      style={{ color, backgroundColor: `${color}15`, borderColor: `${color}40` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
