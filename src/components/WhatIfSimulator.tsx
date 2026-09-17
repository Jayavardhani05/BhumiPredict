import { useState, useMemo, useEffect } from "react";
import { Sliders, Zap, RotateCcw, FastForward, Scale, Trees, Banknote } from "lucide-react";
import type { LandProject } from "@/data/projects";

interface WhatIfSimulatorProps {
  project: LandProject;
  onScoreChange: (score: number) => void;
}

export default function WhatIfSimulator({ project, onScoreChange }: WhatIfSimulatorProps) {
  const [compensationTimeline, setCompensationTimeline] = useState(50);
  const [fastTrackLitigation, setFastTrackLitigation] = useState(false);
  const [forestFastTrack, setForestFastTrack] = useState(false);
  const [politicalSupport, setPoliticalSupport] = useState(50);

  const { simulatedScore, delta } = useMemo(() => {
    let score = project.riskScore;

    const compDelta = ((compensationTimeline - 50) / 50) * -18;
    score += compDelta;

    if (fastTrackLitigation) score -= 15;
    if (forestFastTrack) score -= 10;

    const politicalDelta = ((politicalSupport - 50) / 50) * -8;
    score += politicalDelta;

    score = Math.max(5, Math.min(95, score));
    return { simulatedScore: Math.round(score), delta: Math.round(score - project.riskScore) };
  }, [project.riskScore, compensationTimeline, fastTrackLitigation, forestFastTrack, politicalSupport]);

  useEffect(() => {
    onScoreChange(simulatedScore);
  }, [simulatedScore, onScoreChange]);

  const reset = () => {
    setCompensationTimeline(50);
    setFastTrackLitigation(false);
    setForestFastTrack(false);
    setPoliticalSupport(50);
  };

  const gaugeColor = simulatedScore >= 70 ? "#dc2626" : simulatedScore >= 40 ? "#d97706" : "#16a34a";
  const radius = 50;
  const circumference = Math.PI * radius;
  const offset = circumference - (simulatedScore / 100) * circumference;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-[#0f172a] px-5 py-3 border-b border-slate-700 flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            What-If Policy Simulation Sandbox
          </h2>
          <p className="text-slate-500 text-[10px] mt-0.5">Adjust policy levers to recalculate delay risk in real time</p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-5 mb-5">
          {/* Simulated gauge */}
          <div className="shrink-0">
            <div className="relative">
              <svg width="140" height="85" viewBox="0 0 140 85">
                <path
                  d={`M 20 75 A ${radius} ${radius} 0 0 1 120 75`}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d={`M 20 75 A ${radius} ${radius} 0 0 1 120 75`}
                  fill="none"
                  stroke={gaugeColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
                <span className="text-2xl font-bold text-white">{simulatedScore}</span>
                <span className="text-slate-500 text-[8px]">simulated %</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {delta < 0 ? (
                <span className="text-green-400 text-xs font-bold flex items-center gap-0.5">
                  ▼ {delta} pts
                </span>
              ) : delta > 0 ? (
                <span className="text-red-400 text-xs font-bold flex items-center gap-0.5">
                  ▲ +{delta} pts
                </span>
              ) : (
                <span className="text-slate-400 text-xs font-bold">— no change</span>
              )}
            </div>
          </div>

          <div className="flex-1 pt-1">
            <p className="text-slate-400 text-xs leading-relaxed">
              Current risk: <span className="text-white font-semibold">{project.riskScore}%</span>
              {" → "}Simulated: <span className="text-white font-semibold">{simulatedScore}%</span>
            </p>
            <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">
              {delta < -10
                ? "Significant delay reduction projected. Policy intervention highly effective."
                : delta < 0
                ? "Moderate improvement. Consider combining multiple levers."
                : delta > 5
                ? "Risk increased. Revert unfavorable settings."
                : "Adjust sliders below to simulate policy changes."}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Compensation timeline slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-slate-200 text-xs font-medium flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-blue-400" />
                Compensation Disbursement Speed
              </label>
              <span className="text-slate-400 text-xs font-mono bg-slate-800 px-2 py-0.5 rounded">
                {compensationTimeline}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={compensationTimeline}
              onChange={(e) => setCompensationTimeline(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-slate-600 text-[9px]">Slow (current)</span>
              <span className="text-slate-600 text-[9px]">Fast (target)</span>
            </div>
          </div>

          {/* Political support slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-slate-200 text-xs font-medium flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-blue-400" />
                Political & Community Support
              </label>
              <span className="text-slate-400 text-xs font-mono bg-slate-800 px-2 py-0.5 rounded">
                {politicalSupport}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={politicalSupport}
              onChange={(e) => setPoliticalSupport(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-slate-600 text-[9px]">Resistance</span>
              <span className="text-slate-600 text-[9px]">Full support</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => setFastTrackLitigation(!fastTrackLitigation)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                fastTrackLitigation
                  ? "bg-blue-600/20 border-blue-600/50"
                  : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <FastForward className={`w-4 h-4 ${fastTrackLitigation ? "text-blue-400" : "text-slate-500"}`} />
                <div className="text-left">
                  <p className={`text-xs font-medium ${fastTrackLitigation ? "text-white" : "text-slate-300"}`}>
                    Fast-Track Litigation Tribunal
                  </p>
                  <p className="text-slate-500 text-[9px]">Dedicated bench for LA disputes · −15 pts</p>
                </div>
              </div>
              <div className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${fastTrackLitigation ? "bg-blue-600" : "bg-slate-600"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${fastTrackLitigation ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
            </button>

            <button
              onClick={() => setForestFastTrack(!forestFastTrack)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                forestFastTrack
                  ? "bg-green-600/20 border-green-600/50"
                  : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <Trees className={`w-4 h-4 ${forestFastTrack ? "text-green-400" : "text-slate-500"}`} />
                <div className="text-left">
                  <p className={`text-xs font-medium ${forestFastTrack ? "text-white" : "text-slate-300"}`}>
                    Expedited Forest Clearance
                  </p>
                  <p className="text-slate-500 text-[9px]">PARIVESH parallel processing · −10 pts</p>
                </div>
              </div>
              <div className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${forestFastTrack ? "bg-green-600" : "bg-slate-600"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${forestFastTrack ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <p className="text-slate-500 text-[10px]">
            Simulated score feeds back into the risk gauge above. Model recalculates instantly using gradient-boosted prediction with SHAP-adjusted weights.
          </p>
        </div>
      </div>
    </div>
  );
}
