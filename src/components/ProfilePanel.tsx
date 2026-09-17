import {
  User,
  MapPin,
  Briefcase,
  AlertTriangle,
  FileWarning,
  Gavel,
  Clock,
} from "lucide-react";

export default function ProfilePanel() {
  const corridors = [
    { name: "Chennai–Bengaluru Expressway", code: "NH-48", status: "active" },
    { name: "Coimbatore Bypass Phase-II", code: "NH-181", status: "active" },
    { name: "Salem–Coimbatore Rail DFC", code: "SC-DFC", status: "active" },
    { name: "Madurai Ring Road", code: "NH-385", status: "active" },
  ];

  const reminders = [
    {
      icon: FileWarning,
      color: "text-red-400",
      bg: "bg-red-950/40",
      border: "border-red-900/50",
      title: "Section 19 Compensation Lapse Warning",
      detail: "3 awards lapse within 21 days on Chennai–Bengaluru Expressway. Re-deed authorization required.",
      urgency: "Critical · 21 days",
    },
    {
      icon: Gavel,
      color: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-900/50",
      title: "Pending High-Court Counter-Affidavit",
      detail: "WP No. 4892/2026 — K. Palanisamy vs. State of TN. Filing deadline: 24 Sep 2026.",
      urgency: "High · 7 days",
    },
    {
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-950/40",
      border: "border-blue-900/50",
      title: "Quarterly Land Pooling Review",
      detail: "Coimbatore Western Corridor — 4,200 acres pending physical possession verification.",
      urgency: "Medium · 15 days",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-[#0f172a] px-5 py-3 border-b border-slate-700">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          Officer Profile & Jurisdiction
        </h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Identity */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-white text-xl font-bold">KS</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-bold text-base">Dr. K. Senthil Nathan, IAS</h3>
            <p className="text-slate-400 text-sm">District Collector & CALA</p>
            <p className="text-slate-500 text-xs mt-1">TN: 2008 Batch · Employee ID: TN-DC-0142</p>
          </div>
        </div>

        {/* Jurisdiction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Jurisdiction</span>
            </div>
            <p className="text-white text-sm font-medium">Coimbatore District</p>
            <p className="text-slate-400 text-xs">Western Corridor Cluster</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Designation</span>
            </div>
            <p className="text-white text-sm font-medium">Collector & CALA</p>
            <p className="text-slate-400 text-xs">Land Acquisition Authority</p>
          </div>
        </div>

        {/* Responsibility Matrix */}
        <div>
          <h4 className="text-slate-400 text-xs uppercase tracking-wider font-medium mb-2">
            Responsibility Matrix · 4 Active Corridors
          </h4>
          <div className="space-y-1.5">
            {corridors.map((c) => (
              <div
                key={c.code}
                className="flex items-center justify-between bg-slate-800/40 border border-slate-700/50 rounded-lg px-3 py-2"
              >
                <span className="text-slate-200 text-xs font-medium truncate">{c.name}</span>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-slate-500 text-[10px] font-mono">{c.code}</span>
                  <span className="flex items-center gap-1 text-green-400 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Reminders */}
        <div>
          <h4 className="text-slate-400 text-xs uppercase tracking-wider font-medium mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Urgent Action Reminders
          </h4>
          <div className="space-y-2">
            {reminders.map((r, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${r.bg} ${r.border} border rounded-lg p-3`}
              >
                <r.icon className={`w-4 h-4 ${r.color} shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <p className="text-slate-200 text-xs font-semibold">{r.title}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{r.detail}</p>
                  <p className={`text-[10px] font-semibold mt-1 ${r.color}`}>{r.urgency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
