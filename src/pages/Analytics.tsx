import { useState } from "react";
import { BarChart3, Lightbulb, TrendingUp } from "lucide-react";
import { projects } from "@/data/projects";
import RiskGauge from "@/components/RiskGauge";
import ShapWaterfall from "@/components/ShapWaterfall";
import RiskBadge from "@/components/RiskBadge";

export default function Analytics() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const project = projects.find((p) => p.id === selectedId) ?? projects[0];

  const recommendations: { text: string; priority: string; color: string }[] = [
    { text: "Expedite compensation verification for 461 pending beneficiaries", priority: "Critical", color: "#C0392B" },
    { text: "Review and respond to 42 pending legal cases — prioritize high-court stays", priority: "High", color: "#D99A00" },
    { text: "Follow up on forest clearance re-application via PARIVESH", priority: "High", color: "#D99A00" },
    { text: "Assign additional revenue inspectors for patta correction in 12 villages", priority: "Medium", color: "#1D5D8F" },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-[#123B5D] text-xl font-bold">Risk & Analytics</h1>
        <p className="text-[#64748B] text-sm mt-1">AI-powered delay risk analysis and explainable predictions</p>
      </div>

      {/* Project selector */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg p-4">
        <label className="text-[#64748B] text-xs font-medium block mb-2">Select Project for Analysis</label>
        <div className="flex flex-wrap gap-2">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`px-3 py-2 rounded-md text-xs font-medium border transition-colors ${
                selectedId === p.id
                  ? "bg-[#EAF3F8] border-[#1D5D8F] text-[#123B5D]"
                  : "bg-white border-[#D9E1E7] text-[#1F2937] hover:bg-[#F5F7F9]"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Score + SHAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
            <h3 className="text-[#123B5D] font-semibold text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Predictive Delay Risk Score
            </h3>
          </div>
          <div className="p-6 flex flex-col items-center">
            <RiskGauge score={project.riskScore} size="lg" showDetails={true} />
            <div className="mt-4 flex items-center gap-2">
              <RiskBadge level={project.riskLevel} size="md" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
            <h3 className="text-[#123B5D] font-semibold text-sm">Risk Factor Breakdown · SHAP Waterfall</h3>
            <p className="text-[#64748B] text-[10px] mt-0.5">Explainable AI contributions to delay prediction</p>
          </div>
          <div className="p-5">
            <ShapWaterfall factors={project.shapFactors} baseScore={20} />
          </div>
        </div>
      </div>

      {/* Risk Trend */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
          <h3 className="text-[#123B5D] font-semibold text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Risk Trend — Last 8 Months
          </h3>
        </div>
        <div className="p-5">
          <RiskTrendChart data={project.riskTrend} />
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
          <h3 className="text-[#123B5D] font-semibold text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#D99A00]" /> Risk Recommendations
          </h3>
          <p className="text-[#64748B] text-[10px] mt-0.5">Actionable recommendations to reduce delay risk for {project.name}</p>
        </div>
        <div className="p-5 space-y-2">
          {recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-3 border border-[#E5EAF0] rounded-md p-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white" style={{ background: r.color }}>
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-[#1F2937] text-sm">{r.text}</p>
              </div>
              <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded" style={{ color: r.color, background: `${r.color}15` }}>
                {r.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskTrendChart({ data }: { data: number[] }) {
  const max = 100;
  const w = 600;
  const h = 200;
  const padding = 30;
  const step = (w - padding * 2) / (data.length - 1);

  const points = data.map((v, i) => ({
    x: padding + i * step,
    y: h - padding - (v / max) * (h - padding * 2),
  }));

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${path} L ${points[points.length - 1].x} ${h - padding} L ${padding} ${h - padding} Z`;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  return (
    <div className="w-full overflow-x-auto">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[500px]">
        {[0, 25, 50, 75, 100].map((y) => (
          <g key={y}>
            <line x1={padding} y1={h - padding - (y / max) * (h - padding * 2)} x2={w - padding} y2={h - padding - (y / max) * (h - padding * 2)} stroke="#E5EAF0" strokeWidth="1" />
            <text x={padding - 5} y={h - padding - (y / max) * (h - padding * 2) + 3} fill="#64748B" fontSize="9" textAnchor="end">{y}</text>
          </g>
        ))}
        <path d={areaPath} fill="#1D5D8F" fillOpacity="0.08" />
        <path d={path} fill="none" stroke="#1D5D8F" strokeWidth="2" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3" fill="#1D5D8F" />
            <text x={p.x} y={h - padding + 15} fill="#64748B" fontSize="9" textAnchor="middle">{months[i] || ""}</text>
            <text x={p.x} y={p.y - 8} fill="#123B5D" fontSize="9" textAnchor="middle" fontWeight="bold">{data[i]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
