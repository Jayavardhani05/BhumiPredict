import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Analytics } from './pages/Analytics';
import { GISMapPage } from './pages/GISMapPage';
import { Simulator } from './pages/Simulator';
import { Tasks } from './pages/Tasks';
import { projects } from './data/projects';
import { Shield, Lock } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  // Login form state
  const [email, setEmail] = useState('collector@tn.gov.in');
  const [password, setPassword] = useState('sih2026');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  // If not logged in, render the clean Light GovTech Login Card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F7F9] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white border border-[#D9E1E7] rounded-xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#123B5D] text-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Shield size={24} />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D]">BhumiPredict</h1>
            <p className="text-xs text-[#64748B] mt-1 font-medium">
              Land Acquisition Delay Intelligence Portal
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold bg-[#EAF3F8] text-[#123B5D] px-2.5 py-0.5 rounded border border-[#D9E1E7]">
              SIH 2026 Prototype Evaluation
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1F2937] block mb-1">Official Email / ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F7F9] border border-[#D9E1E7] p-2.5 rounded text-xs text-[#1F2937] focus:outline-[#123B5D]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1F2937] block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F7F9] border border-[#D9E1E7] p-2.5 rounded text-xs text-[#1F2937] focus:outline-[#123B5D]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#123B5D] hover:bg-[#1D5D8F] text-white font-bold py-2.5 rounded text-xs transition shadow-sm"
            >
              Sign In to Command Center
            </button>
          </form>

          <div className="mt-5 p-2.5 bg-[#EAF3F8] rounded border border-[#D9E1E7] text-center">
            <p className="text-[10px] text-[#64748B]">Demo Credentials Pre-filled:</p>
            <p className="text-[10px] font-mono text-[#123B5D]">collector@tn.gov.in / sih2026</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F9]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} />
      <Header activeTitle={activeTab} />
      <main className="ml-64 p-8">
        {activeTab === 'dashboard' && (
          <Dashboard onNavigate={setActiveTab} onSelectProject={setSelectedProject} />
        )}
        {activeTab === 'projects' && <Projects onSelectProject={setSelectedProject} />}
        {activeTab === 'analytics' && <Analytics project={selectedProject} />}
        {activeTab === 'gis' && <GISMapPage onSelectProject={setSelectedProject} />}
        {activeTab === 'simulator' && <Simulator />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-lg border border-[#D9E1E7] shadow-sm">
            <h3 className="font-bold text-sm text-[#123B5D]">Administrative Audit Reports</h3>
            <p className="text-xs text-[#64748B] mt-1">Download official Section 11 & Section 19 compliance summaries.</p>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg border border-[#D9E1E7] shadow-sm">
            <h3 className="font-bold text-sm text-[#123B5D]">Officer Credentials</h3>
            <p className="text-xs text-[#64748B] mt-1">Dr. K. Senthil Nathan, IAS • District Collector & CALA</p>
          </div>
        )}
      </main>
    </div>
  );
}
