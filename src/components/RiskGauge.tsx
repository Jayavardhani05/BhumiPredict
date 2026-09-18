interface RiskGaugeProps {
  score: number; // 0-100
  size?: "sm" | "lg";
  showDetails?: boolean;
}

export default function RiskGauge({ score, size = "lg", showDetails = true }: RiskGaugeProps) {
  const isHigh = score >= 70;
  const isMedium = score >= 40 && score < 70;
  const color = isHigh ? "#C0392B" : isMedium ? "#D99A00" : "#198754";
  const label = isHigh ? "HIGH RISK" : isMedium ? "MEDIUM RISK" : "LOW RISK";

  const dims = size === "lg"
    ? { w: 240, h: 140, r: 90, sw: 14, fontSize: "2.5rem" }
    : { w: 160, h: 100, r: 60, sw: 10, fontSize: "1.5rem" };

  const { w, h, r, sw, fontSize } = dims;
  const circumference = Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <path
            d={`M ${(w - 2 * r) / 2 + 10} ${h - 10} A ${r} ${r} 0 0 1 ${(w + 2 * r) / 2 - 10} ${h - 10}`}
            fill="none"
            stroke="#E5EAF0"
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <path
            d={`M ${(w - 2 * r) / 2 + 10} ${h - 10} A ${r} ${r} 0 0 1 ${(w + 2 * r) / 2 - 10} ${h - 10}`}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.5s ease" }}
          />
          {ticks.map((tick) => {
            const angle = Math.PI - (tick / 100) * Math.PI;
            const cx = w / 2;
            const cy = h - 10;
            const x1 = cx + Math.cos(angle) * (r - sw / 2 - 2);
            const y1 = cy - Math.sin(angle) * (r - sw / 2 - 2);
            const x2 = cx + Math.cos(angle) * (r + sw / 2 + 2);
            const y2 = cy - Math.sin(angle) * (r + sw / 2 + 2);
            return <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth="1" />;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className="font-bold" style={{ fontSize, color }}>{Math.round(score)}</span>
          <span className="text-[#64748B] text-[10px] -mt-1">% delay probability</span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-2 flex flex-col items-center gap-1">
          <span className="text-sm font-bold tracking-wide" style={{ color }}>{label}</span>
          {size === "lg" && (
            <div className="flex gap-2 mt-1">
              <div className="text-center px-3 py-1 bg-[#F5F7F9] border border-[#D9E1E7] rounded">
                <p className="text-[#64748B] text-[9px] uppercase tracking-wide">Est. Delay</p>
                <p className="text-[#1F2937] text-sm font-bold">{isHigh ? "14+ mo" : isMedium ? "6–12 mo" : "< 3 mo"}</p>
              </div>
              <div className="text-center px-3 py-1 bg-[#F5F7F9] border border-[#D9E1E7] rounded">
                <p className="text-[#64748B] text-[9px] uppercase tracking-wide">Confidence</p>
                <p className="text-[#1F2937] text-sm font-bold">87%</p>
              </div>
              <div className="text-center px-3 py-1 bg-[#F5F7F9] border border-[#D9E1E7] rounded">
                <p className="text-[#64748B] text-[9px] uppercase tracking-wide">Model</p>
                <p className="text-[#1F2937] text-sm font-bold">v3.2</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
