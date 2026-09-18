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
  { id: 1, icon: FileWarning, color: "text-[#C0392B]", bg: "bg-[#FDEDEC]", border: "border-[#C0392B]/20", title: "Section 19 Compensation Lapse Imminent", detail: "3 compensation awards lapse in 21 days. ₹ 4.2 Cr disbursal authorization required immediately.", project: "Chennai–Bengaluru Expressway (NH-48)", urgency: "Critical", time: "2 min ago" },
  { id: 2, icon: Gavel, color: "text-[#D99A00]", bg: "bg-[#FFF8E1]", border: "border-[#D99A00]/20", title: "High-Court Counter-Affidavit Deadline", detail: "WP No. 4892/2026 — K. Palanisamy vs. State of TN. Filing deadline: 24 Sep 2026.", project: "Chennai–Bengaluru Expressway (NH-48)", urgency: "High", time: "1 hr ago" },
  { id: 3, icon: Trees, color: "text-[#D99A00]", bg: "bg-[#FFF8E1]", border: "border-[#D99A00]/20", title: "Forest Clearance Stage-I Lapsed", detail: "FC Stage-I approval lapsed on 12 Jul 2026. Re-application via PARIVESH required.", project: "Chennai–Bengaluru Expressway (NH-48)", urgency: "High", time: "3 hr ago" },
  { id: 4, icon: Banknote, color: "text-[#C0392B]", bg: "bg-[#FDEDEC]", border: "border-[#C0392B]/20", title: "Disbursement Rate Critically Below Target", detail: "Only 49% of eligible compensation disbursed (target: 75%). 461 beneficiaries awaiting payment.", project: "Salem–Coimbatore Rail Corridor (DFC)", urgency: "Critical", time: "5 hr ago" },
  { id: 5, icon: Clock, color: "text-[#1D5D8F]", bg: "bg-[#EAF3F8]", border: "border-[#1D5D8F]/20", title: "Quarterly Possession Verification Due", detail: "4,200 acres pending physical possession verification in Coimbatore Western Corridor.", project: "Coimbatore Bypass Phase-II (NH-181)", urgency: "Medium", time: "1 day ago" },
  { id: 6, icon: AlertTriangle, color: "text-[#D99A00]", bg: "bg-[#FFF8E1]", border: "border-[#D99A00]/20", title: "6 New Forest Objections Filed", detail: "Western Ghats Forest Range Committee filed 6 objections to DFC alignment.", project: "Salem–Coimbatore Rail Corridor (DFC)", urgency: "High", time: "2 days ago" },
  { id: 7, icon: Gavel, color: "text-[#D99A00]", bg: "bg-[#FFF8E1]", border: "border-[#D99A00]/20", title: "NGT Stay Order — WGFR Committee", detail: "NGT Chennai issued stay on DFC alignment through Erode forest belt pending hearing.", project: "Salem–Coimbatore Rail Corridor (DFC)", urgency: "High", time: "2 days ago" },
  { id: 8, icon: FileWarning, color: "text-[#C0392B]", bg: "bg-[#FDEDEC]", border: "border-[#C0392B]/20", title: "Patta Mismatch — 143 Records", detail: "143 patta mismatches identified across 12 villages. Revenue inspector assigned.", project: "Chennai–Bengaluru Expressway (NH-48)", urgency: "Medium", time: "3 days ago" },
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
        className={`fixed inset-0 z-[998] bg-black/20 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-[999] w-full max-w-md bg-white border-l border-[#D9E1E7] shadow-lg transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 py-4 border-b border-[#D9E1E7] bg-[#EAF3F8] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[#123B5D] font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D99A00]" />
              Urgent Alerts & Reminders
            </h2>
            <p className="text-[#64748B] text-[10px] mt-0.5">{alerts.length} active notifications across 4 corridors</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#1F2937] hover:bg-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-2.5 flex-1">
          {alerts.map((a) => (
            <div key={a.id} className={`flex items-start gap-3 ${a.bg} ${a.border} border rounded-md p-3`}>
              <a.icon className={`w-4 h-4 ${a.color} shrink-0 mt-0.5`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[#1F2937] text-xs font-semibold leading-tight">{a.title}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-wider shrink-0 ${a.color}`}>{a.urgency}</span>
                </div>
                <p className="text-[#64748B] text-[11px] mt-1 leading-relaxed">{a.detail}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#64748B] text-[10px] font-mono">{a.project}</span>
                  <span className="text-[#64748B] text-[10px]">{a.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#D9E1E7] p-4 shrink-0">
          <button className="w-full bg-white border border-[#D9E1E7] hover:bg-[#F5F7F9] text-[#64748B] hover:text-[#123B5D] text-xs font-medium py-2.5 rounded-md transition-colors">
            Mark All as Reviewed
          </button>
        </div>
      </div>
    </>
  );
}
