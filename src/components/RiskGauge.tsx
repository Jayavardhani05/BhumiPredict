import { useMemo } from "react";
import { Gauge, TrendingUp, TrendingDown } from "lucide-react";

interface RiskGaugeProps {
  score: number; // 0-100
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  const { color, label, arcColor } = useMemo(() => {
    if (score >= 70) return { color: "text-red-400", label: "HIGH RISK", arcColor: "#dc2626" };
    if (score >= 40) return { color: "text-amber-400", label: "MEDIUM RISK", arcColor: "#d97706" };
    return { color: "text-green-400", label: "LOW RISK", arcColor: "#16a34a" };
  }, [score]);

  const radius = 80;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-[#0f172a] px-5 py-3 border-b border-slate-700">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Gauge className="w-4 h-4 text-blue-400" />
          Predictive Delay Risk Score
        </h2>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="relative">
          <svg width="220" height="130" viewBox="0 0 220 130">
            {/* Background arc */}
            <path
              d={`M 30 110 A ${radius} ${radius} 0 0 1 190 110`}
              fill="none"
              stroke="#1e293b"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Score arc */}
            <path
              d={`M 30 110 A ${radius} ${radius} 0 0 1 190 110`}
              fill="none"
              stroke={arcColor}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.5s ease" }}
            />
            {/* Tick marks */}
            {ticks.map((tick) => {
              const angle = Math.PI - (tick / 100) * Math.PI;
              const x1 = 110 + Math.cos(angle) * (radius - 12);
              const y1 = 110 - Math.sin(angle) * (radius - 12);
              const x2 = 110 + Math.cos(angle) * (radius - 18);
              const y2 = 110 - Math.sin(angle) * (radius - 18);
              return (
                <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="1" />
              );
            })}
            {/* Tick labels */}
            {ticks.filter((t) => t % 20 === 0).map((tick) => {
              const angle = Math.PI - (tick / 100) * Math.PI;
              const x = 110 + Math.cos(angle) * (radius + 10);
              const y = 110 - Math.sin(angle) * (radius + 10);
              return (
                <text key={tick} x={x} y={y} fill="#64748b" fontSize="9" textAnchor="middle" dominantBaseline="middle">
                  {tick}
                </text>
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <span className={`text-4xl font-bold ${color}`} style={{ transition: "color 0.5s ease" }}>
              {Math.round(score)}
            </span>
            <span className="text-slate-500 text-[10px] -mt-1">% delay probability</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className={`text-sm font-bold tracking-wider ${color}`}>{label}</span>
          {score > 50 ? (
            <TrendingUp className="w-4 h-4 text-red-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-green-400" />
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 w-full">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 py-2 text-center">
            <p className="text-slate-500 text-[9px] uppercase tracking-wider">Est. Delay</p>
            <p className="text-white text-sm font-bold mt-0.5">
              {score >= 70 ? "14+ mo" : score >= 40 ? "6–12 mo" : "< 3 mo"}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 py-2 text-center">
            <p className="text-slate-500 text-[9px] uppercase tracking-wider">Confidence</p>
            <p className="text-white text-sm font-bold mt-0.5">87%</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 py-2 text-center">
            <p className="text-slate-500 text-[9px] uppercase tracking-wider">Model</p>
            <p className="text-white text-sm font-bold mt-0.5">v3.2</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 py-2 text-center">
            <p className="text-slate-500 text-[9px] uppercase tracking-wider">Training</p>
            <p className="text-white text-sm font-bold mt-0.5">2,847 cases</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 py-2 text-center">
            <p className="text-slate-500 text-[9px] uppercase tracking-wider">Last Updated</p>
            <p className="text-white text-sm font-bold mt-0.5">5 min</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 py-2 text-center">
            <p className="text-slate-500 text-[9px] uppercase tracking-wider">Trend</p>
            <p className="text-white text-sm font-bold mt-0.5">↗ +3.2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
