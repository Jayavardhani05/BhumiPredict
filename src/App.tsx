import { useState, useCallback } from "react";
import LoginModal from "@/components/LoginModal";
import Header from "@/components/Header";
import ProfilePanel from "@/components/ProfilePanel";
import GISMap from "@/components/GISMap";
import RiskGauge from "@/components/RiskGauge";
import ShapWaterfall from "@/components/ShapWaterfall";
import WhatIfSimulator from "@/components/WhatIfSimulator";
import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectDetail from "@/components/ProjectDetail";
import AlertsPanel from "@/components/AlertsPanel";
import { projects } from "@/data/projects";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(projects[0].id);
  const [simulatedScore, setSimulatedScore] = useState<number | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "profile">("overview");

  const selectedProject = projects.find((p) => p.id === selectedId) ?? projects[0];
  const displayScore = simulatedScore ?? selectedProject.riskScore;

  const handleScoreChange = useCallback((score: number) => {
    setSimulatedScore(score);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setSimulatedScore(null);
  }, []);

  if (!authenticated) {
    return <LoginModal onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header
        onLogout={() => setAuthenticated(false)}
        alertCount={6}
        onAlertClick={() => setAlertsOpen(true)}
      />

      {/* Tab bar */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 lg:px-6 flex items-center gap-1 h-10 shrink-0">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === "overview"
              ? "bg-slate-800 text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Dashboard Overview
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === "profile"
              ? "bg-slate-800 text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Officer Profile
        </button>
        <div className="ml-auto text-slate-500 text-[10px] hidden sm:block">
          Last sync: 17 Sep 2026, 14:32 IST · Data source: TN-iLAND v4.1
        </div>
      </div>

      {activeTab === "profile" ? (
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-2xl mx-auto">
            <ProfilePanel />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 lg:p-6 overflow-hidden">
          {/* Left column: sidebar + analytics */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 lg:overflow-y-auto lg:max-h-full">
            <div className="lg:flex-1 min-h-[280px] lg:min-h-0">
              <ProjectSidebar
                projects={projects}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>
            <RiskGauge score={displayScore} />
          </div>

          {/* Center column: map + detail */}
          <div className="flex-1 flex flex-col gap-4 min-w-0 lg:overflow-y-auto lg:max-h-full">
            <div className="h-[350px] lg:h-[400px] lg:flex-1 min-h-[300px]">
              <GISMap
                projects={projects}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>
            <ProjectDetail project={selectedProject} />
            <ShapWaterfall
              factors={selectedProject.shapFactors}
              baseScore={20}
            />
          </div>

          {/* Right column: what-if simulator */}
          <div className="w-full lg:w-[380px] shrink-0 lg:overflow-y-auto lg:max-h-full">
            <WhatIfSimulator
              project={selectedProject}
              onScoreChange={handleScoreChange}
            />
          </div>
        </div>
      )}

      <AlertsPanel open={alertsOpen} onClose={() => setAlertsOpen(false)} />

      <footer className="bg-[#0f172a] border-t border-slate-700 px-4 lg:px-6 py-2 shrink-0">
        <div className="flex items-center justify-between text-[10px] text-slate-600">
          <span>BhumiPredict v3.2 · Government of Tamil Nadu · SIH 2026 (PS 26017)</span>
          <span className="hidden sm:block">For authorized official use only · Access logged</span>
        </div>
      </footer>
    </div>
  );
}
