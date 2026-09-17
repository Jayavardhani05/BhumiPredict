import { Shield, LogOut, Bell, ChevronDown } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
  alertCount: number;
  onAlertClick: () => void;
}

export default function Header({ onLogout, alertCount, onAlertClick }: HeaderProps) {
  return (
    <header className="bg-[#0f172a] border-b border-slate-700 shrink-0 z-[1000]">
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-sm leading-tight">BhumiPredict</h1>
            <p className="text-slate-500 text-[10px] tracking-wider uppercase">AI Land Acquisition Intelligence · SIH 2026 · PS 26017</p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-white font-bold text-sm">BhumiPredict</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-slate-300 text-xs font-medium">Live · Coimbatore DC Office</span>
          </div>

          <button
            onClick={onAlertClick}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {alertCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 pl-2 lg:pl-3 border-l border-slate-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">KS</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-white text-xs font-semibold leading-tight">Dr. K. Senthil Nathan, IAS</p>
              <p className="text-slate-500 text-[10px]">District Collector & CALA</p>
            </div>
            <ChevronDown className="hidden lg:block w-4 h-4 text-slate-500" />
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
