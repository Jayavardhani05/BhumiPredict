import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, User, IndianRupee, FileText, Scale, Trees, Banknote, Calendar, CheckCircle2, Clock, XCircle, Users } from "lucide-react";
import { projects, riskColor } from "@/data/projects";
import RiskBadge from "@/components/RiskBadge";
import RiskGauge from "@/components/RiskGauge";
import ShapWaterfall from "@/components/ShapWaterfall";

type Tab = "overview" | "progress" | "risk" | "legal" | "compensation" | "documents" | "timeline" | "officers";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "progress", label: "Acquisition Progress" },
  { id: "risk", label: "Risk Analysis" },
  { id: "legal", label: "Legal" },
  { id: "compensation", label: "Compensation" },
  { id: "documents", label: "Documents" },
  { id: "timeline", label: "Timeline" },
  { id: "officers", label: "Assigned Officers" },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const project = projects.find((p) => p.id === id);
  if (!project) {
    return (
      <div className="p-6">
        <p className="text-[#C0392B]">Project not found.</p>
        <Link to="/projects" className="text-[#1D5D8F] hover:underline mt-2 inline-block">← Back to Projects</Link>
      </div>
    );
  }

  const pct = Math.round((project.parcelsAcquired / project.parcelsTotal) * 100);
  const color = riskColor(project.riskLevel);

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Breadcrumb */}
      <button onClick={() => navigate("/projects")} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#123B5D] text-sm font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </button>

      {/* Header */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg p-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-[#123B5D] text-lg font-bold">{project.name}</h1>
              <RiskBadge level={project.riskLevel} size="md" />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B]">
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {project.code}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.startDate} → {project.targetDate}</span>
            </div>
            <p className="text-[#64748B] text-sm mt-2 max-w-2xl">{project.summary}</p>
          </div>
          <div className="shrink-0">
            <RiskGauge score={project.riskScore} size="sm" showDetails={false} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <div className="border-b border-[#D9E1E7] overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#1D5D8F] text-[#123B5D] bg-[#EAF3F8]"
                    : "border-transparent text-[#64748B] hover:text-[#1F2937] hover:bg-[#F5F7F9]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: FileText, label: "Total Parcels", value: `${project.parcelsTotal}` },
                { icon: CheckCircle2, label: "Acquired", value: `${project.parcelsAcquired} (${pct}%)` },
                { icon: Users, label: "Villages Affected", value: `${project.villagesAffected}` },
                { icon: User, label: "Landowners", value: `${project.landownersAffected}` },
                { icon: IndianRupee, label: "Est. Cost", value: project.estimatedCost },
                { icon: Scale, label: "Active Litigations", value: `${project.litigations}` },
                { icon: Trees, label: "Forest Clearance", value: project.forestClearance === "pending" ? "Pending" : project.forestClearance === "granted" ? "Granted" : "N/A" },
                { icon: Banknote, label: "Disbursement", value: `${project.disbursementRate}%` },
              ].map((s, i) => (
                <div key={i} className="border border-[#E5EAF0] rounded-md p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <s.icon className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">{s.label}</span>
                  </div>
                  <p className="text-[#1F2937] text-sm font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#1F2937] text-sm font-medium">Overall Acquisition Progress</span>
                  <span className="text-[#123B5D] text-sm font-bold">{pct}%</span>
                </div>
                <div className="h-3 bg-[#E5EAF0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[#64748B] text-xs">{project.parcelsAcquired} acquired</span>
                  <span className="text-[#64748B] text-xs">{project.parcelsTotal - project.parcelsAcquired} remaining</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-[#E5EAF0] rounded-md p-3">
                  <p className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Parcels Acquired</p>
                  <p className="text-[#1F2937] text-lg font-bold">{project.parcelsAcquired}</p>
                </div>
                <div className="border border-[#E5EAF0] rounded-md p-3">
                  <p className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Parcels Remaining</p>
                  <p className="text-[#1F2937] text-lg font-bold">{project.parcelsTotal - project.parcelsAcquired}</p>
                </div>
                <div className="border border-[#E5EAF0] rounded-md p-3">
                  <p className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Villages Affected</p>
                  <p className="text-[#1F2937] text-lg font-bold">{project.villagesAffected}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "risk" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <RiskGauge score={project.riskScore} size="lg" showDetails={true} />
                <div className="flex-1">
                  <h4 className="text-[#123B5D] text-sm font-semibold mb-3">SHAP Factor Breakdown</h4>
                  <ShapWaterfall factors={project.shapFactors} baseScore={20} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "legal" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#D9E1E7] text-left">
                    <th className="px-3 py-2 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Case Number</th>
                    <th className="px-3 py-2 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Title</th>
                    <th className="px-3 py-2 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Court</th>
                    <th className="px-3 py-2 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Filed</th>
                    <th className="px-3 py-2 text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {project.legalCases.map((c, i) => (
                    <tr key={i} className="border-b border-[#E5EAF0]">
                      <td className="px-3 py-3 text-[#1F2937] font-mono text-xs">{c.number}</td>
                      <td className="px-3 py-3 text-[#1F2937] text-xs">{c.title}</td>
                      <td className="px-3 py-3 text-[#64748B] text-xs">{c.court}</td>
                      <td className="px-3 py-3 text-[#64748B] text-xs">{c.filedDate}</td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          c.status === "pending" ? "text-[#D99A00] bg-[#FFF8E1] border border-[#D99A00]/20" :
                          c.status === "stay" ? "text-[#C0392B] bg-[#FDEDEC] border border-[#C0392B]/20" :
                          "text-[#198754] bg-[#E8F5E9] border border-[#198754]/20"
                        }`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "compensation" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-[#E5EAF0] rounded-md p-4">
                <div className="flex items-center gap-1.5 mb-2"><Banknote className="w-4 h-4 text-[#1D5D8F]" /><span className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Budget</span></div>
                <p className="text-[#1F2937] text-lg font-bold">{project.compensationBudget}</p>
              </div>
              <div className="border border-[#E5EAF0] rounded-md p-4">
                <div className="flex items-center gap-1.5 mb-2"><CheckCircle2 className="w-4 h-4 text-[#198754]" /><span className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Disbursed</span></div>
                <p className="text-[#1F2937] text-lg font-bold">{project.compensationDisbursed}</p>
              </div>
              <div className="border border-[#E5EAF0] rounded-md p-4">
                <div className="flex items-center gap-1.5 mb-2"><Clock className="w-4 h-4 text-[#D99A00]" /><span className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Disbursement Rate</span></div>
                <p className="text-[#1F2937] text-lg font-bold">{project.disbursementRate}%</p>
                <div className="h-2 bg-[#E5EAF0] rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-[#1D5D8F] rounded-full" style={{ width: `${project.disbursementRate}%` }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-2">
              {project.pendingDocuments.map((doc, i) => (
                <div key={i} className="flex items-center justify-between border border-[#E5EAF0] rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#64748B]" />
                    <span className="text-[#1F2937] text-sm">{doc.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    doc.status === "submitted" ? "text-[#198754] bg-[#E8F5E9] border-[#198754]/20" :
                    doc.status === "pending" ? "text-[#D99A00] bg-[#FFF8E1] border-[#D99A00]/20" :
                    "text-[#C0392B] bg-[#FDEDEC] border-[#C0392B]/20"
                  }`}>{doc.status}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-3">
              {project.timeline.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      event.status === "done" ? "bg-[#198754] border-[#198754]" :
                      event.status === "current" ? "bg-[#1D5D8F] border-[#1D5D8F]" :
                      "bg-white border-[#D9E1E7]"
                    }`} />
                    {i < project.timeline.length - 1 && <div className="w-0.5 h-8 bg-[#D9E1E7]" />}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-[#1F2937] text-sm font-medium">{event.title}</p>
                      {event.status === "current" && <span className="text-[9px] font-bold uppercase text-[#1D5D8F] bg-[#EAF3F8] px-1.5 py-0.5 rounded">Current</span>}
                    </div>
                    <p className="text-[#64748B] text-xs mt-0.5">{event.detail}</p>
                    <p className="text-[#64748B] text-[10px] mt-0.5 font-mono">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "officers" && (
            <div className="space-y-3">
              <div className="border border-[#E5EAF0] rounded-md p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1D5D8F] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">KS</span>
                </div>
                <div>
                  <p className="text-[#1F2937] text-sm font-semibold">{project.assignedOfficer}</p>
                  <p className="text-[#64748B] text-xs">{project.officerDesignation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
