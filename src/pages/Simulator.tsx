import { useState } from "react";
import { SlidersHorizontal, FileText } from "lucide-react";
import { projects } from "@/data/projects";
import WhatIfSimulator from "@/components/WhatIfSimulator";

export default function Simulator() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const project = projects.find((p) => p.id === selectedId) ?? projects[0];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-[#123B5D] text-xl font-bold flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" /> What-If Policy Simulator
        </h1>
        <p className="text-[#64748B] text-sm mt-1">Simulate policy interventions and observe predicted delay risk changes</p>
      </div>

      {/* Project selector */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg p-4">
        <label className="text-[#64748B] text-xs font-medium block mb-2">Select Project to Simulate</label>
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
              {p.name} ({p.riskScore}%)
            </button>
          ))}
        </div>
      </div>

      {/* Simulator */}
      <WhatIfSimulator project={project} />

      {/* Disclaimer */}
      <div className="bg-[#EAF3F8] border border-[#1D5D8F]/20 rounded-lg p-4 flex items-start gap-3">
        <FileText className="w-4 h-4 text-[#1D5D8F] shrink-0 mt-0.5" />
        <p className="text-[#64748B] text-xs leading-relaxed">
          <span className="text-[#123B5D] font-semibold">Disclaimer:</span> This What-If Simulator is a prototype tool for SIH 2026 demonstration purposes.
          The risk calculations use a simplified model and do not represent actual government predictions. Real-world land acquisition
          outcomes depend on numerous additional factors not captured in this simulation.
        </p>
      </div>
    </div>
  );
}
