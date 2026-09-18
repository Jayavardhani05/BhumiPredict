import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Map,
  SlidersHorizontal,
  CheckSquare,
  FileText,
  User,
  LogOut,
  Shield,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/projects", icon: Building2, label: "Projects" },
  { to: "/analytics", icon: BarChart3, label: "Risk & Analytics" },
  { to: "/gis-map", icon: Map, label: "GIS Risk Map" },
  { to: "/simulator", icon: SlidersHorizontal, label: "What-If Simulator" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks & Actions" },
  { to: "/reports", icon: FileText, label: "Reports" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function Sidebar({ open, onClose, onLogout }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[990] bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-[999] w-64 bg-white border-r border-[#D9E1E7] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-4 py-4 border-b border-[#D9E1E7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#123B5D] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-[#123B5D] font-bold text-sm leading-tight">BhumiPredict</h1>
              <p className="text-[#64748B] text-[10px] leading-tight">Land Acquisition Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-[#64748B] hover:text-[#1F2937]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <p className="text-[#64748B] text-[9px] uppercase tracking-wider font-semibold px-3 mb-2">Menu</p>
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#EAF3F8] text-[#123B5D] border-l-2 border-[#1D5D8F]"
                      : "text-[#1F2937] hover:bg-[#F5F7F9]"
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Officer card */}
        <div className="border-t border-[#D9E1E7] p-3">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-full bg-[#1D5D8F] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">KS</span>
            </div>
            <div className="min-w-0">
              <p className="text-[#1F2937] text-xs font-semibold truncate">Dr. K. Senthil Nathan</p>
              <p className="text-[#64748B] text-[10px] truncate">District Collector & CALA</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 text-[#64748B] hover:text-[#C0392B] text-xs font-medium py-2 rounded-md hover:bg-[#FDEDEC] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
