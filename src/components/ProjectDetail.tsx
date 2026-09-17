import { FileText, Scale, Trees, Banknote, MapPin, Users, IndianRupee, Calendar, TrendingUp } from "lucide-react";
import type { LandProject } from "@/data/projects";
import { riskColor, riskLabel } from "@/data/projects";

interface ProjectDetailProps {
  project: LandProject;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const color = riskColor(project.riskLevel);
  const pct = Math.round((project.parcelsAcquired / project.parcelsTotal) * 100);

  const stats = [
    { icon: FileText, label: "Parcels", value: `${project.parcelsAcquired}/${project.parcelsTotal}` },
    { icon: Users, label: "Villages", value: `${project.villagesAffected}` },
    { icon: IndianRupee, label: "Est. Cost", value: project.estimatedCost },
    { icon: Scale, label: "Litigations", value: `${project.litigations}` },
    { icon: Trees, label: "Forest", value: project.forestClearance === "pending" ? "Pending" : project.forestClearance === "granted" ? "Granted" : "N/A" },
    { icon: Banknote, label: "Disbursed", value: `${project.disbursementRate}%` },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-[#0f172a] px-5 py-3 border-b border-slate-700">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-white font-semibold text-sm">{project.name}</h2>
            <p className="text-slate-500 text-[10px] font-mono mt-0.5">{project.code}</p>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shrink-0"
            style={{ color, background: `${color}20` }}
          >
            {riskLabel(project.riskLevel)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-slate-400 text-xs leading-relaxed mb-4">{project.summary}</p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-400 text-xs font-medium">Acquisition Progress</span>
            <span className="text-white text-xs font-bold">{pct}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: color }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className="w-3 h-3 text-slate-500" />
                <span className="text-slate-500 text-[9px] uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-white text-xs font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-4 flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span className="text-slate-500">Start: <span className="text-slate-300">{project.startDate}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-slate-500" />
            <span className="text-slate-500">Target: <span className="text-slate-300">{project.targetDate}</span></span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="text-slate-500 font-mono">{project.lat.toFixed(4)}, {project.lng.toFixed(4)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
