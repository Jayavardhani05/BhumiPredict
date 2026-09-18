import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  MapPin, 
  SlidersHorizontal, 
  CheckSquare, 
  FileText, 
  User, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'analytics', label: 'Risk & Analytics', icon: BarChart3 },
    { id: 'gis', label: 'GIS Risk Map', icon: MapPin },
    { id: 'simulator', label: 'What-If Simulator', icon: SlidersHorizontal },
    { id: 'tasks', label: 'Tasks & Actions', icon: CheckSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#D9E1E7] flex flex-col justify-between h-screen fixed left-0 top-0 z-30 shadow-sm">
      <div>
        {/* Portal Branding Header */}
        <div className="p-5 border-b border-[#D9E1E7] flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#123B5D] text-white flex items-center justify-center font-bold text-base shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-[#123B5D] font-bold text-sm leading-tight tracking-tight">BhumiPredict</h1>
            <p className="text-[10px] text-[#64748B] tracking-wider uppercase font-semibold">DoLR / SIH 2026</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors text-left ${
                  isActive 
                    ? 'bg-[#EAF3F8] text-[#123B5D] font-bold border-l-4 border-[#123B5D]' 
                    : 'text-[#64748B] hover:bg-[#F5F7F9] hover:text-[#1F2937]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#123B5D]' : 'text-[#64748B]'} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logged-In Officer Profile Footer */}
      <div className="p-4 border-t border-[#D9E1E7] bg-[#F5F7F9]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#EAF3F8] text-[#123B5D] font-bold flex items-center justify-center text-xs border border-[#D9E1E7]">
            SN
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-[#1F2937] truncate">Dr. K. Senthil Nathan, IAS</h4>
            <p className="text-[10px] text-[#64748B] truncate">District Collector & CALA</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 bg-white border border-[#D9E1E7] hover:bg-rose-50 hover:text-[#C0392B] text-[#64748B] rounded text-xs font-semibold transition-colors"
        >
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
