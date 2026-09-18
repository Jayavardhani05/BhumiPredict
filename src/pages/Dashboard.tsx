import { Link } from "react-router-dom";
import { Building2, AlertTriangle, CheckCircle2, TrendingUp, ArrowRight, FileWarning, Gavel, Banknote } from "lucide-react";
import { projects, tasks } from "@/data/projects";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import MapView from "@/components/MapView";

export default function Dashboard() {
  const activeProjects = projects.filter((p) => p.status.includes("Stage") || p.status.includes("imminent")).length;
  const highRisk = projects.filter((p) => p.riskLevel === "high").length;
  const avgProgress = Math.round(projects.reduce((s, p) => s + (p.parcelsAcquired / p.parcelsTotal) * 100, 0) / projects.length);
  const urgentTasks = tasks.filter((t) => t.status === "urgent" || t.priority === "urgent").slice(0, 3);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Welcome */}
      <div>
        <h1 className="text-[#123B5D] text-xl font-bold">Good afternoon, Dr. Senthil Nathan</h1>
        <p className="text-[#64748B] text-sm mt-1">District Land Acquisition Overview · Coimbatore & Western Corridor</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Building2} label="Total Projects" value={projects.length} sublabel="4 corridors monitored" accentColor="#1D5D8F" />
        <StatCard icon={TrendingUp} label="Active Projects" value={activeProjects} sublabel="Currently in progress" accentColor="#198754" />
        <StatCard icon={AlertTriangle} label="High Risk Projects" value={highRisk} sublabel="Require immediate attention" accentColor="#C0392B" />
        <StatCard icon={CheckCircle2} label="Avg. Acquisition Progress" value={`${avgProgress}%`} sublabel="Across all corridors" accentColor="#D99A00" />
      </div>

      {/* Map + Risk summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8] flex items-center justify-between">
            <h3 className="text-[#123B5D] font-semibold text-sm">Project Risk Map · Tamil Nadu</h3>
            <Link to="/gis-map" className="text-[#1D5D8F] hover:text-[#123B5D] text-xs font-medium flex items-center gap-1">
              Full Map <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="h-[400px] p-3">
            <MapView projects={projects} height="100%" showLegend={true} showTitle={false} />
          </div>
        </div>

        {/* Project Risk Summary */}
        <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
            <h3 className="text-[#123B5D] font-semibold text-sm">Project Risk Summary</h3>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            <div className="space-y-2">
              {projects.map((p) => {
                const pct = Math.round((p.parcelsAcquired / p.parcelsTotal) * 100);
                return (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="block p-3 border border-[#E5EAF0] rounded-md hover:border-[#1D5D8F]/30 hover:bg-[#F5F7F9] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-[#1F2937] text-xs font-semibold leading-tight">{p.name}</p>
                      <RiskBadge level={p.riskLevel} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#E5EAF0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1D5D8F] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[#64748B] text-[10px] font-mono">{pct}%</span>
                    </div>
                    <p className="text-[#64748B] text-[10px] mt-1.5">{p.location}</p>
                  </Link>
                );
              })}
            </div>
            <Link
              to="/projects"
              className="mt-3 w-full flex items-center justify-center gap-1.5 bg-white border border-[#D9E1E7] hover:bg-[#EAF3F8] text-[#1D5D8F] text-xs font-medium py-2 rounded-md transition-colors"
            >
              View All Projects <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Urgent Actions */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8] flex items-center justify-between">
          <h3 className="text-[#123B5D] font-semibold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D99A00]" />
            Urgent Actions
          </h3>
          <Link to="/tasks" className="text-[#1D5D8F] hover:text-[#123B5D] text-xs font-medium flex items-center gap-1">
            View All Actions <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-[#E5EAF0]">
          {urgentTasks.map((t) => {
            const Icon = t.title.includes("compensation") ? FileWarning : t.title.includes("affidavit") ? Gavel : Banknote;
            const color = t.priority === "urgent" ? "#C0392B" : "#D99A00";
            return (
              <div key={t.id} className="flex items-start gap-3 px-5 py-3">
                <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[#1F2937] text-xs font-medium">{t.title}</p>
                  <p className="text-[#64748B] text-[11px] mt-0.5">{t.project}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
                    {t.daysLeft} days
                  </p>
                  <p className="text-[#64748B] text-[10px]">{t.dueDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
