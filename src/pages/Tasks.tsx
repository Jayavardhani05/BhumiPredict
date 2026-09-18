import { useState } from "react";
import { CheckSquare, Search, Calendar } from "lucide-react";
import { tasks, TaskStatus, type Task } from "@/data/projects";

const statusTabs: { id: TaskStatus | "all"; label: string }[] = [
  { id: "all", label: "All Tasks" },
  { id: "urgent", label: "Urgent" },
  { id: "pending", label: "Pending" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

function statusColor(status: TaskStatus): string {
  switch (status) {
    case "urgent": return "#C0392B";
    case "pending": return "#D99A00";
    case "in-progress": return "#1D5D8F";
    case "completed": return "#198754";
  }
}

function priorityColor(priority: string): string {
  switch (priority) {
    case "urgent": return "#C0392B";
    case "high": return "#D99A00";
    case "medium": return "#1D5D8F";
    case "low": return "#198754";
  }
}

function statusLabel(status: TaskStatus): string {
  switch (status) {
    case "urgent": return "Urgent";
    case "pending": return "Pending";
    case "in-progress": return "In Progress";
    case "completed": return "Completed";
  }
}

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<TaskStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered: Task[] = tasks.filter((t) => {
    if (activeTab !== "all" && t.status !== activeTab) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.project.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: tasks.length,
    urgent: tasks.filter((t) => t.status === "urgent").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-[#123B5D] text-xl font-bold flex items-center gap-2">
          <CheckSquare className="w-5 h-5" /> Tasks & Actions
        </h1>
        <p className="text-[#64748B] text-sm mt-1">Action items, deadlines, and reminders across all corridors</p>
      </div>

      {/* Status tabs */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg overflow-hidden">
        <div className="border-b border-[#D9E1E7] overflow-x-auto">
          <div className="flex">
            {statusTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-[#1D5D8F] text-[#123B5D] bg-[#EAF3F8]"
                    : "border-transparent text-[#64748B] hover:text-[#1F2937] hover:bg-[#F5F7F9]"
                }`}
              >
                {tab.label}
                <span className="bg-[#D9E1E7] text-[#64748B] text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#D9E1E7]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#D9E1E7] rounded-md pl-9 pr-3 py-2 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F] focus:ring-1 focus:ring-[#1D5D8F]"
            />
          </div>
        </div>

        {/* Task list */}
        <div className="divide-y divide-[#E5EAF0]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[#64748B] text-sm">No tasks found matching your filters.</p>
            </div>
          ) : (
            filtered.map((t) => {
              const sColor = statusColor(t.status);
              const pColor = priorityColor(t.priority);
              return (
                <div key={t.id} className="px-5 py-4 hover:bg-[#F5F7F9] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: sColor }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[#1F2937] text-sm font-semibold">{t.title}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded" style={{ color: pColor, background: `${pColor}15` }}>
                            {t.priority}
                          </span>
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded" style={{ color: sColor, background: `${sColor}15` }}>
                            {statusLabel(t.status)}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#64748B] text-xs mt-1 leading-relaxed">{t.detail}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px] text-[#64748B]">
                        <span>Project: <span className="text-[#1F2937] font-medium">{t.project}</span></span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due: {t.dueDate}</span>
                        <span>Officer: <span className="text-[#1F2937] font-medium">{t.assignedOfficer}</span></span>
                        {t.status !== "completed" && (
                          <span className="font-bold" style={{ color: t.daysLeft <= 7 ? "#C0392B" : t.daysLeft <= 14 ? "#D99A00" : "#1D5D8F" }}>
                            {t.daysLeft} days left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
