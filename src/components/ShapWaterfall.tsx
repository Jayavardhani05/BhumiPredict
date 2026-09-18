import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { ShapFactor } from "@/data/projects";

interface ShapWaterfallProps {
  factors: ShapFactor[];
  baseScore: number;
}

export default function ShapWaterfall({ factors, baseScore }: ShapWaterfallProps) {
  const sorted = [...factors].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  const maxAbs = Math.max(...sorted.map((f) => Math.abs(f.contribution)), 10);
  const barMaxWidth = 160;
  const finalScore = Math.round(Math.max(0, Math.min(100, baseScore + sorted.reduce((s, f) => s + f.contribution, 0))));

  return (
    <div className="space-y-3">
      {/* Base */}
      <div className="flex items-center gap-3 pb-3 border-b border-[#E5EAF0]">
        <div className="w-36 shrink-0">
          <span className="text-[#64748B] text-xs font-medium">Baseline</span>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div className="h-5 rounded bg-slate-400 flex items-center justify-center px-2" style={{ width: `${(baseScore / 100) * barMaxWidth}px` }}>
            <span className="text-white text-[10px] font-bold">{baseScore}</span>
          </div>
          <span className="text-[#64748B] text-[10px]">model base prediction</span>
        </div>
      </div>

      {/* Factors */}
      <div className="space-y-2.5">
        {sorted.map((factor, i) => {
          const isPositive = factor.contribution > 0;
          const isNeutral = factor.contribution === 0;
          const width = (Math.abs(factor.contribution) / maxAbs) * barMaxWidth;
          const Icon = isPositive ? ArrowUp : isNeutral ? Minus : ArrowDown;
          const bg = isPositive ? "bg-[#C0392B]" : isNeutral ? "bg-slate-400" : "bg-[#198754]";
          const textColor = isPositive ? "text-[#C0392B]" : isNeutral ? "text-slate-400" : "text-[#198754]";

          return (
            <div key={i} className="flex items-center gap-3 group">
              <div className="w-36 shrink-0">
                <p className="text-[#1F2937] text-xs font-medium leading-tight">{factor.name}</p>
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <div className={`h-6 rounded flex items-center px-2 ${bg}`} style={{ width: `${Math.max(width, 24)}px`, transition: "width 0.5s ease" }}>
                  <Icon className="w-3 h-3 text-white mr-1 shrink-0" />
                  <span className="text-white text-[10px] font-bold">
                    {isPositive ? "+" : ""}{factor.contribution}
                  </span>
                </div>
                <span className="text-[#64748B] text-[10px] truncate group-hover:text-[#1F2937] transition-colors">
                  {factor.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#E5EAF0]">
        <div className="w-36 shrink-0">
          <span className="text-[#1F2937] text-xs font-bold">Final Prediction</span>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div className="h-6 rounded bg-[#1D5D8F] flex items-center px-2" style={{ width: `${(finalScore / 100) * barMaxWidth + 24}px` }}>
            <span className="text-white text-[10px] font-bold">{finalScore}%</span>
          </div>
          <span className="text-[#64748B] text-[10px]">predicted delay probability</span>
        </div>
      </div>
    </div>
  );
}
