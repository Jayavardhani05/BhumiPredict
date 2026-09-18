import React, { useState } from 'react';
import { SlidersHorizontal, ArrowDownRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/projects';

export const Simulator: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [disbursementDays, setDisbursementDays] = useState(45);
  const [fastTrackLitigation, setFastTrackLitigation] = useState(true);
  const [docCadence, setDocCadence] = useState(15);

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Recalibration logic
  const simulatedRisk = Math.max(
    14,
    currentProject.riskScore 
    - (disbursementDays <= 30 ? 22 : 8)
    - (fastTrackLitigation ? 20 : 0)
    - (docCadence <= 15 ? 10 : 0)
  );

  const riskReduction = currentProject.riskScore - simulatedRisk;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#D9E1E7] rounded-lg p-5 shadow-sm">
        <h3 className="text-base font-bold text-[#123B5D]">Policy Intervention & Mitigation Sandbox</h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Simulate administrative accelerations to observe real-time dynamic risk recalibration (RFCTLARR Act Framework).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Controls */}
        <div className="lg:col-span-6 bg-white border border-[#D9E1E7] rounded-lg p-5 shadow-sm space-y-5">
          <h4 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider flex items-center gap-2">
            <SlidersHorizontal size={15} /> Administrative Control Parameters
          </h4>

          {/* Project Selector */}
          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1">Target Infrastructure Corridor</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full bg-[#F5F7F9] border border-[#D9E1E7] text-xs p-2 rounded text-[#1F2937] font-medium"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.location})</option>
              ))}
            </select>
          </div>

          {/* Slider 1 */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1F2937] font-medium">Compensation Disbursement Target</span>
              <span className="font-bold text-[#123B5D]">{disbursementDays} Days</span>
            </div>
            <input
              type="range" min="15" max="120" step="5"
              value={disbursementDays}
              onChange={(e) => setDisbursementDays(Number(e.target.value))}
              className="w-full h-1.5 bg-[#EAF3F8] rounded appearance-none cursor-pointer accent-[#123B5D]"
            />
          </div>

          {/* Slider 2 */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1F2937] font-medium">Documentation Verification Velocity</span>
              <span className="font-bold text-[#123B5D]">{docCadence} Days</span>
            </div>
            <input
              type="range" min="5" max="45" step="5"
              value={docCadence}
              onChange={(e) => setDocCadence(Number(e.target.value))}
              className="w-full h-1.5 bg-[#EAF3F8] rounded appearance-none cursor-pointer accent-[#123B5D]"
            />
          </div>

          {/* Toggle */}
          <div className="flex justify-between items-center pt-2 border-t border-[#D9E1E7]">
            <span className="text-xs font-medium text-[#1F2937]">Fast-Track Special Tribunal Bench</span>
            <input
              type="checkbox"
              checked={fastTrackLitigation}
              onChange={(e) => setFastTrackLitigation(e.target.checked)}
              className="w-4 h-4 rounded text-[#123B5D] border-[#D9E1E7] focus:ring-[#123B5D]"
            />
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-6 bg-white border border-[#D9E1E7] rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider mb-4">
              Simulated Risk Recalibration
            </h4>

            <div className="grid grid-cols-2 gap-4 text-center mb-6">
              <div className="bg-[#F5F7F9] p-4 rounded border border-[#D9E1E7]">
                <span className="text-[11px] text-[#64748B] font-bold block">Current Delay Score</span>
                <span className="text-3xl font-extrabold text-[#C0392B]">{currentProject.riskScore}%</span>
                <span className="text-[10px] text-[#C0392B] font-bold block mt-1">High Stall Probability</span>
              </div>
              <div className="bg-emerald-50 p-4 rounded border border-emerald-200">
                <span className="text-[11px] text-[#198754] font-bold block">Simulated Score</span>
                <span className="text-3xl font-extrabold text-[#198754]">{simulatedRisk}%</span>
                <span className="text-[10px] text-[#198754] font-bold block mt-1">
                  -{riskReduction} Percentage Points
                </span>
              </div>
            </div>

            <div className="bg-[#EAF3F8] border border-[#D9E1E7] p-3.5 rounded text-xs space-y-1.5">
              <span className="font-bold text-[#123B5D] block">Recommended Action Matrix:</span>
              <p className="text-[#1F2937] text-[11px]">
                • Fast-tracking the special tribunal hearing frees 42 parcels before Section 25 lapsing.
              </p>
              <p className="text-[#1F2937] text-[11px]">
                • Compressing disbursement to {disbursementDays} days saves an estimated ₹4.2 Cr in contractor idle penalties.
              </p>
            </div>
          </div>

          <p className="text-[10px] text-[#64748B] mt-4 border-t border-[#D9E1E7] pt-2">
            * Prototype mathematical simulation calibrated on MoSPI historical benchmark cadences.
          </p>
        </div>
      </div>
    </div>
  );
};
