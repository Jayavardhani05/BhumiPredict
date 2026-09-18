import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { projects, RiskLevel } from "@/data/projects";
import ProjectTable from "@/components/ProjectTable";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.code.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
      if (riskFilter !== "all" && p.riskLevel !== riskFilter) return false;
      if (statusFilter !== "all" && !p.status.toLowerCase().includes(statusFilter.toLowerCase())) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      return true;
    });
  }, [search, riskFilter, statusFilter, typeFilter]);

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-[#123B5D] text-xl font-bold">Projects</h1>
        <p className="text-[#64748B] text-sm mt-1">Complete list of active land acquisition corridors</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search by name, ID, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#D9E1E7] rounded-md pl-9 pr-3 py-2 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F] focus:ring-1 focus:ring-[#1D5D8F]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B]" />
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="w-full bg-white border border-[#D9E1E7] rounded-md pl-9 pr-3 py-2 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F]">
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-white border border-[#D9E1E7] rounded-md px-3 py-2 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F]">
            <option value="all">All Types</option>
            <option value="Highway">Highway</option>
            <option value="Bypass">Bypass</option>
            <option value="Ring Road">Ring Road</option>
            <option value="Rail">Rail</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-[#D9E1E7] rounded-md px-3 py-2 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F]">
            <option value="all">All Statuses</option>
            <option value="award">Award Stage</option>
            <option value="possession">Possession Stage</option>
            <option value="enquiry">Enquiry Stage</option>
            <option value="section">Section 19</option>
          </select>
        </div>
        <p className="text-[#64748B] text-xs mt-3">
          Showing {filtered.length} of {projects.length} projects
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <ProjectTable projects={filtered} />
      </div>
    </div>
  );
}
