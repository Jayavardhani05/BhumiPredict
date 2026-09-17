import { BarChart3, ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { ShapFactor } from "@/data/projects";

interface ShapWaterfallProps {
  factors: ShapFactor[];
  baseScore: number;
}

export default function ShapWaterfall({ factors, baseScore }: ShapWaterfallProps) {
  const sorted = [...factors].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  const maxAbs = Math.max(...sorted.map((f) => Math.abs(f.contribution)), 10);
  const barMaxWidth = 120;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-[#0f172a] px-5 py-3 border-b border-slate-700">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          Explainable AI · SHAP Waterfall Breakdown
        </h2>
        <p className="text-slate-500 text-[10px] mt-0.5">Factor contributions to delay risk prediction</p>
      </div>

      <div className="p-5">
        {/* Base bar */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/50">
          <div className="w-32 shrink-0">
            <span className="text-slate-400 text-xs font-medium">Baseline</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="h-5 rounded bg-slate-600 flex items-center justify-center px-2" style={{ width: `${(baseScore / 100) * barMaxWidth}px` }}>
              <span className="text-white text-[10px] font-bold">{baseScore}</span>
            </div>
            <span className="text-slate-500 text-[10px]">model base prediction</span>
          </div>
        </div>

        {/* Factor bars */}
        <div className="space-y-2.5">
          {sorted.map((factor, i) => {
            const isPositive = factor.contribution > 0;
            const isNeutral = factor.contribution === 0;
            const width = (Math.abs(factor.contribution) / maxAbs) * barMaxWidth;
            const Icon = isPositive ? ArrowUp : isNeutral ? Minus : ArrowDown;
            const color = isPositive ? "bg-red-500/70 border-red-600/50" : isNeutral ? "bg-slate-600 border-slate-600" : "bg-green-500/70 border-green-600/50";
            const textColor = isPositive ? "text-red-400" : isNeutral ? "text-slate-400" : "text-green-400";

            return (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-32 shrink-0">
                  <p className="text-slate-200 text-xs font-medium leading-tight">{factor.name}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={`h-6 rounded border flex items-center px-2 transition-all ${color}`} style={{ width: `${Math.max(width, 20)}px` }}>
                      <Icon className={`w-3 h-3 ${textColor} mr-1 shrink-0`} />
                      <span className={`text-[10px] font-bold ${isPositive ? "text-red-200" : isNeutral ? "text-slate-300" : "text-green-200"}`}>
                        {isPositive ? "+" : ""}{factor.contribution}
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] truncate group-hover:text-slate-400 transition-colors">
                      {factor.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final prediction */}
        <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center gap-3">
          <div className="w-32 shrink-0">
            <span className="text-white text-xs font-bold">Final Prediction</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="h-6 rounded bg-blue-600 flex items-center px-2" style={{ width: `${(baseScore + sorted.reduce((s, f) => s + f.contribution, 0)) / 100 * barMaxWidth + 20}px` }}>
              <span className="text-white text-[10px] font-bold">
                {Math.round(Math.max(0, Math.min(100, baseScore + sorted.reduce((s, f) => s + f.contribution, 0))))}%
              </span>
            </div>
            <span className="text-slate-500 text-[10px]">predicted delay probability</span>
          </div>
        </div>

        <p className="text-slate-600 text-[9px] mt-3 italic">
          SHAP values quantifying each factor's push from baseline toward final prediction. Red = increases delay risk, green = mitigates.
        </p>
      </div>
    </div>
  );
}
