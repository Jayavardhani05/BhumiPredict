import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AlertsPanel from "@/components/AlertsPanel";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/analytics": "Risk & Analytics",
  "/gis-map": "GIS Risk Map",
  "/simulator": "What-If Policy Simulator",
  "/tasks": "Tasks & Actions",
  "/reports": "Reports",
  "/profile": "Officer Profile",
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || (location.pathname.startsWith("/projects/") ? "Project Details" : "BhumiPredict");

  return (
    <div className="flex h-screen bg-[#F5F7F9] overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => {
          localStorage.removeItem("bhumipredict_auth");
          window.location.href = "/login";
        }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          pageTitle={pageTitle}
          onMenuClick={() => setSidebarOpen(true)}
          onAlertClick={() => setAlertsOpen(true)}
          alertCount={8}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <AlertsPanel open={alertsOpen} onClose={() => setAlertsOpen(false)} />
    </div>
  );
}
