import { useEffect, useState } from "react";
import { AlertTriangle, X, FileWarning, Gavel, Trees, Banknote, Clock } from "lucide-react";

interface AlertsPanelProps {
  open: boolean;
  onClose: () => void;
}

interface Alert {
  id: number;
  icon: typeof FileWarning;
  color: string;
  bg: string;
  border: string;
  title: string;
  detail: string;
  project: string;
  urgency: string;
  time: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    icon: FileWarning,
    color: "text-red-400",
    bg: "bg-red-950/40",
    border: "border-red-900/50",
    title: "Section 19 Compensation Lapse Imminent",
    detail: "3 compensation awards lapse in 21 days. ₹ 4.2 Cr disbursal authorization required immediately.",
    project: "Chennai–Bengaluru Expressway (NH-48)",
    urgency: "Critical",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: Gavel,
    color: "text-amber-400",
    bg: "bg-amber-950/40",
    border: "border-amber-900/50",
    title: "High-Court Counter-Affidavit Deadline",
    detail: "WP No. 4892/2026 — K. Palanisamy vs. State of TN. Filing deadline: 24 Sep 2026.",
    project: "Chennai–Bengaluru Expressway (NH-48)",
    urgency: "High",
    time: "1 hr ago",
  },
  {
    id: 3,
    icon: Trees,
    color: "text-amber-400",
    bg: "bg-amber-950/40",
    border: "border-amber-900/50",
    title: "Forest Clearance Stage-I Lapsed",
    detail: "FC Stage-I approval lapsed on 12 Jul 2026. Re-application via PARIVESH required for Krishnagiri–Dharmapuri segment.",
    project: "Chennai–Bengaluru Expressway (NH-48)",
    urgency: "High",
    time: "3 hr ago",
  },
  {
    id: 4,
    icon: Banknote,
    color: "text-red-400",
    bg: "bg-red-950/40",
    border: "border-red-900/50",
    title: "Disbursement Rate Critically Below Target",
    detail: "Only 49% of eligible compensation disbursed (target: 75%). 461 beneficiaries awaiting payment.",
    project: "Salem–Coimbatore Rail Corridor (DFC)",
    urgency: "Critical",
    time: "5 hr ago",
  },
  {
    id: 5,
    icon: Clock,
    color: "text-blue-400",
    bg: "bg-blue-950/40",
    border: "border-blue-900/50",
    title: "Quarterly Possession Verification Due",
    detail: "4,200 acres pending physical possession verification in Coimbatore Western Corridor.",
    project: "Coimbatore Bypass Phase-II (NH-181)",
    urgency: "Medium",
    time: "1 day ago",
  },
  {
    id: 6,
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-950/40",
    border: "border-amber-900/50",
    title: "6 New Forest Objections Filed",
    detail: "Western Ghats Forest Range Committee filed 6 objections to DFC alignment through Erode belt.",
    project: "Salem–Coimbatore Rail Corridor (DFC)",
    urgency: "High",
    time: "2 days ago",
  },
];

export default function AlertsPanel({ open, onClose }: AlertsPanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[998] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-[999] w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-[#0f172a] px-5 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Urgent Alerts & Reminders
            </h2>
            <p className="text-slate-500 text-[10px] mt-0.5">{alerts.length} active notifications across 4 corridors</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-2.5 flex-1">
          {alerts.map((a) => (
            <div
              key={a.id}
              className={`flex items-start gap-3 ${a.bg} ${a.border} border rounded-lg p-3`}
            >
              <a.icon className={`w-4 h-4 ${a.color} shrink-0 mt-0.5`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-slate-200 text-xs font-semibold leading-tight">{a.title}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-wider shrink-0 ${a.color}`}>
                    {a.urgency}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">{a.detail}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-500 text-[10px] font-mono">{a.project}</span>
                  <span className="text-slate-600 text-[10px]">{a.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700 p-4 shrink-0">
          <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-2.5 rounded-lg transition-colors">
            Mark All as Reviewed
          </button>
        </div>
      </div>
    </>
  );
}
