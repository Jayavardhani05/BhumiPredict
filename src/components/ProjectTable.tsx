import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import type { LandProject } from "@/data/projects";
import RiskBadge from "@/components/RiskBadge";

interface ProjectTableProps {
  projects: LandProject[];
  showActions?: boolean;
  compact?: boolean;
}

export default function ProjectTable({ projects, showActions = true, compact = false }: ProjectTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#D9E1E7] text-left">
            <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Project ID</th>
            <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Project Name</th>
            {!compact && <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Location</th>}
            {!compact && <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Type</th>}
            <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Progress</th>
            <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Risk</th>
            {!compact && <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Delay %</th>}
            {!compact && <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Officer</th>}
            {!compact && <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Status</th>}
            {showActions && <th className="px-3 py-2.5 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const pct = Math.round((p.parcelsAcquired / p.parcelsTotal) * 100);
            return (
              <tr
                key={p.id}
                className="border-b border-[#E5EAF0] hover:bg-[#F5F7F9] cursor-pointer transition-colors"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <td className="px-3 py-3 text-[#64748B] font-mono text-xs">{p.code}</td>
                <td className="px-3 py-3 text-[#1F2937] font-medium max-w-xs">{p.name}</td>
                {!compact && <td className="px-3 py-3 text-[#64748B] text-xs">{p.location}</td>}
                {!compact && <td className="px-3 py-3">
                  <span className="text-[#64748B] text-xs bg-[#F5F7F9] border border-[#D9E1E7] px-2 py-0.5 rounded">{p.type}</span>
                </td>}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#E5EAF0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1D5D8F] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[#1F2937] text-xs font-medium">{pct}%</span>
                  </div>
                </td>
                <td className="px-3 py-3"><RiskBadge level={p.riskLevel} /></td>
                {!compact && <td className="px-3 py-3 text-[#1F2937] font-semibold text-xs">{p.riskScore}%</td>}
                {!compact && <td className="px-3 py-3 text-[#64748B] text-xs max-w-[120px] truncate">{p.assignedOfficer}</td>}
                {!compact && <td className="px-3 py-3 text-[#64748B] text-xs max-w-[160px] truncate">{p.status}</td>}
                {showActions && (
                  <td className="px-3 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${p.id}`);
                      }}
                      className="inline-flex items-center gap-1 text-[#1D5D8F] hover:text-[#123B5D] text-xs font-medium px-2 py-1 hover:bg-[#EAF3F8] rounded transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
