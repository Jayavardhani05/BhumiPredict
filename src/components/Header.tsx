import { Bell, Menu, ChevronDown } from "lucide-react";

interface HeaderProps {
  pageTitle: string;
  onMenuClick: () => void;
  onAlertClick: () => void;
  alertCount: number;
}

export default function Header({ pageTitle, onMenuClick, onAlertClick, alertCount }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#D9E1E7] h-14 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#64748B] hover:text-[#123B5D]"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-[#123B5D] font-semibold text-base">{pageTitle}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#EAF3F8] border border-[#D9E1E7] rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#198754]" />
          <span className="text-[#64748B] text-[10px] font-medium">SIH 2026 · Prototype</span>
        </div>

        <button
          onClick={onAlertClick}
          className="relative p-2 text-[#64748B] hover:text-[#123B5D] hover:bg-[#EAF3F8] rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          {alertCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#C0392B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {alertCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-[#D9E1E7]">
          <div className="w-8 h-8 rounded-full bg-[#1D5D8F] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">KS</span>
          </div>
          <div className="hidden lg:block">
            <p className="text-[#1F2937] text-xs font-semibold leading-tight">Dr. K. Senthil Nathan, IAS</p>
            <p className="text-[#64748B] text-[10px]">District Collector & CALA</p>
          </div>
          <ChevronDown className="hidden lg:block w-4 h-4 text-[#64748B]" />
        </div>
      </div>
    </header>
  );
}
