import React from 'react';
import { Bell, Shield } from 'lucide-react';

interface HeaderProps {
  activeTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTitle }) => {
  return (
    <header className="h-16 bg-white border-b border-[#D9E1E7] flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm ml-64">
      <div className="flex items-center gap-3">
        <h2 className="text-[#123B5D] font-bold text-base capitalize tracking-tight">
          {activeTitle.replace('-', ' ')}
        </h2>
        <span className="text-[11px] bg-[#EAF3F8] text-[#123B5D] px-2 py-0.5 rounded font-semibold border border-[#D9E1E7]">
          Coimbatore & Western Corridor
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Subtle Prototype Badge */}
        <span className="flex items-center gap-1 text-[11px] bg-emerald-50 text-[#198754] px-2 py-0.5 rounded border border-emerald-200 font-medium">
          <Shield size={11} /> SIH 2026 Evaluation Prototype
        </span>

        {/* Notifications Icon */}
        <button className="relative p-1.5 text-[#64748B] hover:text-[#123B5D] rounded-full hover:bg-[#F5F7F9]">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#C0392B] rounded-full"></span>
        </button>

        {/* User Mini Tag */}
        <div className="text-right border-l border-[#D9E1E7] pl-4">
          <span className="text-xs font-bold text-[#1F2937] block leading-none">Dr. Senthil Nathan</span>
          <span className="text-[10px] text-[#64748B]">CALA Nodal Head</span>
        </div>
      </div>
    </header>
  );
};
