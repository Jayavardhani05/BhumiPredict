import { useState } from "react";
import { Map, Filter } from "lucide-react";
import { projects, RiskLevel } from "@/data/projects";
import MapView from "@/components/MapView";

export default function GISMapPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string>("all");

  const filtered = projects.filter((p) => riskFilter === "all" || p.riskLevel === riskFilter);
  const selected = projects.find((p) => p.id === selectedId);

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[#123B5D] text-xl font-bold flex items-center gap-2">
            <Map className="w-5 h-5" /> GIS Risk Map
          </h1>
          <p className="text-[#64748B] text-sm mt-1">Geographic view of land acquisition corridors across Tamil Nadu</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#64748B]" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-white border border-[#D9E1E7] rounded-md px-3 py-1.5 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F]"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map */}
        <div className="lg:col-span-3 bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
          <div className="h-[600px] p-3">
            <MapView
              projects={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              height="100%"
              showLegend={true}
              showTitle={true}
            />
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {selected ? (
            <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
                <h3 className="text-[#123B5D] font-semibold text-sm">Selected Project</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-[#1F2937] text-sm font-semibold">{selected.name}</p>
                  <p className="text-[#64748B] text-xs font-mono mt-0.5">{selected.code}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-[#E5EAF0] rounded-md p-2">
                    <p className="text-[#64748B] text-[9px] uppercase tracking-wider">Risk Score</p>
                    <p className="text-[#1F2937] text-base font-bold">{selected.riskScore}%</p>
                  </div>
                  <div className="border border-[#E5EAF0] rounded-md p-2">
                    <p className="text-[#64748B] text-[9px] uppercase tracking-wider">Progress</p>
                    <p className="text-[#1F2937] text-base font-bold">{Math.round((selected.parcelsAcquired / selected.parcelsTotal) * 100)}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Status</p>
                  <p className="text-[#1F2937] text-xs mt-0.5">{selected.status}</p>
                </div>
                <div>
                  <p className="text-[#64748B] text-[10px] uppercase tracking-wider font-medium">Location</p>
                  <p className="text-[#1F2937] text-xs mt-0.5">{selected.location}</p>
                  <p className="text-[#64748B] text-[10px] font-mono">{selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}</p>
                </div>
                <a
                  href={`#/projects/${selected.id}`}
                  className="block w-full text-center bg-[#123B5D] hover:bg-[#1D5D8F] text-white text-xs font-medium py-2 rounded-md transition-colors"
                >
                  View Project Details →
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#D9E1E7] rounded-lg p-6 text-center">
              <Map className="w-8 h-8 text-[#D9E1E7] mx-auto mb-2" />
              <p className="text-[#64748B] text-sm">Click a project marker on the map to view details</p>
            </div>
          )}

          {/* Project list */}
          <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
              <h3 className="text-[#123B5D] font-semibold text-sm">All Projects</h3>
            </div>
            <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-2 rounded-md transition-colors ${
                    selectedId === p.id ? "bg-[#EAF3F8] border border-[#1D5D8F]/30" : "hover:bg-[#F5F7F9] border border-transparent"
                  }`}
                >
                  <p className="text-[#1F2937] text-xs font-medium truncate">{p.name}</p>
                  <p className="text-[#64748B] text-[10px]">{p.location} · {p.riskScore}% risk</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
