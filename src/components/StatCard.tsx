import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
  accentColor?: string;
}

export default function StatCard({ icon: Icon, label, value, sublabel, accentColor = "#1D5D8F" }: StatCardProps) {
  return (
    <div className="bg-white border border-[#D9E1E7] rounded-lg p-4 flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accentColor}12` }}
      >
        <Icon className="w-5 h-5" style={{ color: accentColor }} />
      </div>
      <div className="min-w-0">
        <p className="text-[#64748B] text-xs font-medium">{label}</p>
        <p className="text-[#1F2937] text-xl font-bold mt-0.5">{value}</p>
        {sublabel && <p className="text-[#64748B] text-[11px] mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}
