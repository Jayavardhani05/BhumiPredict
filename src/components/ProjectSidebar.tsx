import { MapPin, Building2, FileText, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import type { LandProject, RiskLevel } from "@/data/projects";
import { riskColor, riskLabel } from "@/data/projects";

interface ProjectSidebarProps {
  projects: LandProject[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ProjectSidebar({ projects, selectedId, onSelect }: ProjectSidebarProps) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="bg-[#0f172a] px-4 py-3 border-b border-slate-700 shrink-0">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          Active Corridors
        </h2>
        <p className="text-slate-500 text-[10px] mt-0.5">{projects.length} monitored projects</p>
      </div>

      <div className="overflow-y-auto p-3 space-y-2 flex-1">
        {projects.map((p) => {
          const isSelected = p.id === selectedId;
          const color = riskColor(p.riskLevel);
          const pct = Math.round((p.parcelsAcquired / p.parcelsTotal) * 100);
          const statusIcon = p.riskLevel === "low" ? CheckCircle2 : p.riskLevel === "medium" ? Clock : AlertCircle;

          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`w-full text-left rounded-lg border transition-all p-3 ${
                isSelected
                  ? "bg-slate-800 border-blue-600/60 ring-1 ring-blue-600/30"
                  : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                  style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-semibold leading-tight ${isSelected ? "text-white" : "text-slate-200"}`}>
                    {p.name}
                  </p>
                  <p className="text-slate-500 text-[10px] font-mono mt-0.5">{p.code}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                      style={{ color, background: `${color}20` }}
                    >
                      {riskLabel(p.riskLevel as RiskLevel)}
                    </span>
                    <span className="text-slate-500 text-[10px]">{p.riskScore}% risk</span>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-slate-600 text-[9px]">Acquisition progress</span>
                      <span className="text-slate-400 text-[9px] font-mono">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-0.5">
                      <FileText className="w-2.5 h-2.5" /> {p.litigations} cases
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {p.villagesAffected} villages
                    </span>
                    {statusIcon && (
                      <span className="flex items-center gap-0.5">
                        {(() => {
                          const Icon = statusIcon;
                          return <Icon className="w-2.5 h-2.5" style={{ color }} />;
                        })()}
                        {p.forestClearance === "pending" ? "FC pend." : p.forestClearance === "granted" ? "FC ok" : "FC n/a"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
