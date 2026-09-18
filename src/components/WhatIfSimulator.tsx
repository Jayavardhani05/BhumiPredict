import { useState, useMemo, useEffect } from "react";
import { Sliders, RotateCcw, FastForward, Trees, Banknote, FileText, Users, Zap } from "lucide-react";
import type { LandProject } from "@/data/projects";
import RiskGauge from "@/components/RiskGauge";

interface WhatIfSimulatorProps {
  project: LandProject;
  onScoreChange?: (score: number) => void;
}

export default function WhatIfSimulator({ project, onScoreChange }: WhatIfSimulatorProps) {
  const [compensationTimeline, setCompensationTimeline] = useState(50);
  const [fastTrackLitigation, setFastTrackLitigation] = useState(false);
  const [forestFastTrack, setForestFastTrack] = useState(false);
  const [documentationSpeed, setDocumentationSpeed] = useState(50);
  const [adminProcessing, setAdminProcessing] = useState(50);

  const { simulatedScore, delta } = useMemo(() => {
    let score = project.riskScore;
    const compDelta = ((compensationTimeline - 50) / 50) * -18;
    score += compDelta;
    if (fastTrackLitigation) score -= 15;
    if (forestFastTrack) score -= 10;
    const docDelta = ((documentationSpeed - 50) / 50) * -8;
    score += docDelta;
    const adminDelta = ((adminProcessing - 50) / 50) * -6;
    score += adminDelta;
    score = Math.max(5, Math.min(95, score));
    return { simulatedScore: Math.round(score), delta: Math.round(score - project.riskScore) };
  }, [project.riskScore, compensationTimeline, fastTrackLitigation, forestFastTrack, documentationSpeed, adminProcessing]);

  useEffect(() => {
    onScoreChange?.(simulatedScore);
  }, [simulatedScore, onScoreChange]);

  const reset = () => {
    setCompensationTimeline(50);
    setFastTrackLitigation(false);
    setForestFastTrack(false);
    setDocumentationSpeed(50);
    setAdminProcessing(50);
  };

  const delayReduction = project.riskScore >= 70 ? "14+ months → 6-8 months" : project.riskScore >= 40 ? "6-12 months → 3-5 months" : "< 3 months → < 1 month";
  const recommendation = delta < -15 ? "Highly effective intervention. Recommend immediate implementation of all proposed measures." : delta < -5 ? "Moderate improvement. Consider combining multiple policy levers for greater impact." : "Adjust sliders to simulate policy changes. Combine interventions for best results.";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Controls */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8] flex items-center justify-between">
          <div>
            <h3 className="text-[#123B5D] font-semibold text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Simulation Controls
            </h3>
            <p className="text-[#64748B] text-[10px] mt-0.5">Adjust policy levers to recalculate delay risk</p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-[#64748B] hover:text-[#123B5D] text-xs bg-white border border-[#D9E1E7] hover:bg-[#EAF3F8] px-2.5 py-1.5 rounded-md transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Compensation slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#1F2937] text-xs font-medium flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-[#1D5D8F]" />
                Compensation Processing Timeline
              </label>
              <span className="text-[#64748B] text-xs font-mono bg-[#F5F7F9] px-2 py-0.5 rounded border border-[#D9E1E7]">
                {compensationTimeline <= 25 ? "5 days" : compensationTimeline <= 50 ? "15 days" : compensationTimeline <= 75 ? "21 days" : "30 days"} → {" "}
                {compensationTimeline <= 25 ? "5 days" : compensationTimeline <= 50 ? "10 days" : compensationTimeline <= 75 ? "15 days" : "21 days"}
              </span>
            </div>
            <input type="range" min="0" max="100" value={compensationTimeline} onChange={(e) => setCompensationTimeline(Number(e.target.value))} className="w-full accent-[#1D5D8F] cursor-pointer" />
            <div className="flex justify-between mt-1">
              <span className="text-[#64748B] text-[9px]">30 days (slow)</span>
              <span className="text-[#64748B] text-[9px]">5 days (fast)</span>
            </div>
          </div>

          {/* Documentation slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#1F2937] text-xs font-medium flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1D5D8F]" />
                Documentation Processing Speed
              </label>
              <span className="text-[#64748B] text-xs font-mono bg-[#F5F7F9] px-2 py-0.5 rounded border border-[#D9E1E7]">{documentationSpeed}%</span>
            </div>
            <input type="range" min="0" max="100" value={documentationSpeed} onChange={(e) => setDocumentationSpeed(Number(e.target.value))} className="w-full accent-[#1D5D8F] cursor-pointer" />
            <div className="flex justify-between mt-1">
              <span className="text-[#64748B] text-[9px]">Manual</span>
              <span className="text-[#64748B] text-[9px]">Digitized</span>
            </div>
          </div>

          {/* Admin processing slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#1F2937] text-xs font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#1D5D8F]" />
                Administrative Processing Speed
              </label>
              <span className="text-[#64748B] text-xs font-mono bg-[#F5F7F9] px-2 py-0.5 rounded border border-[#D9E1E7]">{adminProcessing}%</span>
            </div>
            <input type="range" min="0" max="100" value={adminProcessing} onChange={(e) => setAdminProcessing(Number(e.target.value))} className="w-full accent-[#1D5D8F] cursor-pointer" />
            <div className="flex justify-between mt-1">
              <span className="text-[#64748B] text-[9px]">Standard</span>
              <span className="text-[#64748B] text-[9px]">Expedited</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => setFastTrackLitigation(!fastTrackLitigation)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md border transition-all ${
                fastTrackLitigation ? "bg-[#EAF3F8] border-[#1D5D8F]/40" : "bg-white border-[#D9E1E7] hover:bg-[#F5F7F9]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FastForward className={`w-4 h-4 ${fastTrackLitigation ? "text-[#1D5D8F]" : "text-[#64748B]"}`} />
                <div className="text-left">
                  <p className={`text-xs font-medium ${fastTrackLitigation ? "text-[#123B5D]" : "text-[#1F2937]"}`}>Fast-Track Litigation Tribunal</p>
                  <p className="text-[#64748B] text-[9px]">Dedicated bench for LA disputes · −15 pts</p>
                </div>
              </div>
              <div className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${fastTrackLitigation ? "bg-[#1D5D8F]" : "bg-[#D9E1E7]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${fastTrackLitigation ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
            </button>

            <button
              onClick={() => setForestFastTrack(!forestFastTrack)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md border transition-all ${
                forestFastTrack ? "bg-[#EAF3F8] border-[#198754]/40" : "bg-white border-[#D9E1E7] hover:bg-[#F5F7F9]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Trees className={`w-4 h-4 ${forestFastTrack ? "text-[#198754]" : "text-[#64748B]"}`} />
                <div className="text-left">
                  <p className={`text-xs font-medium ${forestFastTrack ? "text-[#123B5D]" : "text-[#1F2937]"}`}>Expedited Forest Clearance</p>
                  <p className="text-[#64748B] text-[9px]">PARIVESH parallel processing · −10 pts</p>
                </div>
              </div>
              <div className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${forestFastTrack ? "bg-[#198754]" : "bg-[#D9E1E7]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${forestFastTrack ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-[#D9E1E7] bg-[#EAF3F8]">
          <h3 className="text-[#123B5D] font-semibold text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#D99A00]" /> Simulation Result
          </h3>
          <p className="text-[#64748B] text-[10px] mt-0.5">Real-time risk recalculation</p>
        </div>

        <div className="p-5">
          <div className="flex flex-col items-center mb-5">
            <RiskGauge score={simulatedScore} size="lg" showDetails={false} />
            <div className="mt-3 flex items-center gap-4">
              <div className="text-center">
                <p className="text-[#64748B] text-[10px] uppercase tracking-wider">Current Risk</p>
                <p className="text-[#1F2937] text-lg font-bold">{project.riskScore}%</p>
              </div>
              <div className="text-[#64748B] text-xl">→</div>
              <div className="text-center">
                <p className="text-[#64748B] text-[10px] uppercase tracking-wider">Simulated</p>
                <p className="text-[#123B5D] text-lg font-bold">{simulatedScore}%</p>
              </div>
              <div className="text-center">
                <p className="text-[#64748B] text-[10px] uppercase tracking-wider">Reduction</p>
                <p className={`text-lg font-bold ${delta < 0 ? "text-[#198754]" : delta > 0 ? "text-[#C0392B]" : "text-[#64748B]"}`}>
                  {delta > 0 ? "+" : ""}{delta} pts
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-[#F5F7F9] border border-[#D9E1E7] rounded-lg p-3">
              <p className="text-[#64748B] text-[10px] uppercase tracking-wider font-semibold mb-1">Projected Delay Reduction</p>
              <p className="text-[#1F2937] text-sm font-medium">{delayReduction}</p>
            </div>

            <div className="bg-[#EAF3F8] border border-[#1D5D8F]/20 rounded-lg p-3">
              <p className="text-[#123B5D] text-[10px] uppercase tracking-wider font-semibold mb-1">Recommended Intervention</p>
              <p className="text-[#1F2937] text-xs leading-relaxed">{recommendation}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D9E1E7]">
            <p className="text-[#64748B] text-[10px] italic">
              This is a prototype simulation for demonstration purposes. Not an actual government prediction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
