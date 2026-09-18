export type RiskLevel = "low" | "medium" | "high";

export interface ShapFactor {
  name: string;
  contribution: number; // positive = increases risk
  description: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  detail: string;
  status: "done" | "current" | "upcoming";
}

export interface LegalCase {
  number: string;
  title: string;
  court: string;
  status: "pending" | "disposed" | "stay";
  filedDate: string;
}

export interface LandProject {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: string;
  parcelsTotal: number;
  parcelsAcquired: number;
  villagesAffected: number;
  estimatedCost: string;
  startDate: string;
  targetDate: string;
  litigations: number;
  forestClearance: "pending" | "granted" | "n/a";
  disbursementRate: number; // % of disbursed compensation
  summary: string;
  shapFactors: ShapFactor[];
  // Extended fields
  location: string;
  type: "Highway" | "Rail" | "Ring Road" | "Bypass";
  assignedOfficer: string;
  officerDesignation: string;
  landownersAffected: number;
  compensationBudget: string;
  compensationDisbursed: string;
  pendingDocuments: { name: string; status: "submitted" | "pending" | "rejected" }[];
  timeline: TimelineEvent[];
  legalCases: LegalCase[];
  riskTrend: number[];
}

export const projects: LandProject[] = [
  {
    id: "p1",
    name: "Chennai–Bengaluru Expressway (NH-48)",
    code: "CB-EXP-2026",
    lat: 12.5079,
    lng: 78.4395,
    riskScore: 78,
    riskLevel: "high",
    status: "Section 19 Award — 3 lapses imminent",
    parcelsTotal: 1247,
    parcelsAcquired: 712,
    villagesAffected: 38,
    estimatedCost: "₹ 12,400 Cr",
    startDate: "2024-03-15",
    targetDate: "2027-06-30",
    litigations: 42,
    forestClearance: "pending",
    disbursementRate: 57,
    summary:
      "141-km greenfield expressway traversing Krishnagiri–Dharmapuri forest belt. 8 writ petitions active; FC Stage-I lapsed on 12 Jul 2026 requiring re-deed.",
    shapFactors: [
      { name: "Litigation Stays", contribution: 22, description: "42 active writ petitions, 3 high-court stays" },
      { name: "Forest Clearance", contribution: 18, description: "Stage-I lapsed; re-approval required" },
      { name: "Disbursement Speed", contribution: 14, description: "Only 57% of eligible compensation disbursed" },
      { name: "Land Records Dispute", contribution: 10, description: "143 patta mismatches in 12 villages" },
      { name: "Political Resistance", contribution: 8, description: "2 MLA representations for alignment shift" },
      { name: "Baseline: Project Size", contribution: 6, description: "Large footprint → inherent complexity" },
    ],
    location: "Krishnagiri–Dharmapuri, TN",
    type: "Highway",
    assignedOfficer: "Dr. K. Senthil Nathan, IAS",
    officerDesignation: "District Collector & CALA",
    landownersAffected: 892,
    compensationBudget: "₹ 3,200 Cr",
    compensationDisbursed: "₹ 1,824 Cr",
    pendingDocuments: [
      { name: "FC Stage-I Re-approval", status: "pending" },
      { name: "Section 19 Award — 3 villages", status: "pending" },
      { name: "Land Acquisition Plan", status: "submitted" },
      { name: "Environmental Impact Assessment", status: "submitted" },
    ],
    timeline: [
      { date: "2024-03-15", title: "Project Notification", detail: "Section 3A notification published", status: "done" },
      { date: "2024-08-10", title: "SIA Conducted", detail: "Social Impact Assessment completed for 38 villages", status: "done" },
      { date: "2025-01-20", title: "Section 11 Declaration", detail: "Land identified across 12 villages", status: "done" },
      { date: "2025-06-15", title: "FC Stage-I Granted", detail: "Forest clearance Stage-I initially granted", status: "done" },
      { date: "2026-07-12", title: "FC Stage-I Lapsed", detail: "Re-approval required — PARIVESH re-application needed", status: "current" },
      { date: "2026-10-01", title: "Section 19 Award", detail: "Compensation award declaration deadline", status: "upcoming" },
      { date: "2027-06-30", title: "Target Completion", detail: "Expressway operational target", status: "upcoming" },
    ],
    legalCases: [
      { number: "WP 4892/2026", title: "K. Palanisamy vs. State of TN", court: "Madras HC", status: "pending", filedDate: "2026-02-14" },
      { number: "WP 5104/2026", title: "Forest Rights Committee vs. MoEFCC", court: "Madras HC", status: "stay", filedDate: "2026-03-22" },
      { number: "WP 5338/2026", title: "Krishnagiri Farmers Assn. vs. NHAI", court: "Supreme Court", status: "pending", filedDate: "2026-04-10" },
    ],
    riskTrend: [55, 58, 62, 65, 70, 73, 75, 78],
  },
  {
    id: "p2",
    name: "Coimbatore Bypass Phase-II (NH-181)",
    code: "CBP-II-2026",
    lat: 11.0168,
    lng: 76.9558,
    riskScore: 52,
    riskLevel: "medium",
    status: "Award Stage — disbursement lagging",
    parcelsTotal: 486,
    parcelsAcquired: 329,
    villagesAffected: 17,
    estimatedCost: "₹ 3,800 Cr",
    startDate: "2024-08-01",
    targetDate: "2026-12-31",
    litigations: 11,
    forestClearance: "granted",
    disbursementRate: 68,
    summary:
      "34-km western bypass linking Mettupalayam Road to Pollachi Road. Forest clearance granted; 11 service-litigations pending, disbursement behind target.",
    shapFactors: [
      { name: "Disbursement Speed", contribution: 16, description: "68% disbursed vs 85% target" },
      { name: "Litigation Stays", contribution: 12, description: "11 service-litigation petitions" },
      { name: "Land Records Dispute", contribution: 7, description: "47 patta corrections needed" },
      { name: "Forest Clearance", contribution: -4, description: "Stage-II granted — negative risk" },
      { name: "Baseline: Project Size", contribution: 5, description: "Mid-size corridor" },
    ],
    location: "Coimbatore, TN",
    type: "Bypass",
    assignedOfficer: "Dr. K. Senthil Nathan, IAS",
    officerDesignation: "District Collector & CALA",
    landownersAffected: 327,
    compensationBudget: "₹ 950 Cr",
    compensationDisbursed: "₹ 646 Cr",
    pendingDocuments: [
      { name: "Section 19 Award — 4 villages", status: "submitted" },
      { name: "Patta Correction Report — 47 cases", status: "pending" },
      { name: "Forest Clearance Stage-II", status: "submitted" },
      { name: "Possession Certificate — 8 sectors", status: "pending" },
    ],
    timeline: [
      { date: "2024-08-01", title: "Project Notification", detail: "Section 3A notification for 34-km bypass", status: "done" },
      { date: "2024-12-15", title: "SIA Completed", detail: "Social Impact Assessment for 17 villages", status: "done" },
      { date: "2025-04-10", title: "Section 11 Declaration", detail: "486 parcels identified for acquisition", status: "done" },
      { date: "2025-09-20", title: "FC Stage-II Granted", detail: "Forest clearance fully granted", status: "done" },
      { date: "2026-03-01", title: "Disbursement Phase", detail: "68% disbursed — lagging behind 85% target", status: "current" },
      { date: "2026-12-31", title: "Target Completion", detail: "Bypass operational target", status: "upcoming" },
    ],
    legalCases: [
      { number: "WP 3401/2026", title: "Coimbatore Landowners Forum vs. NHAI", court: "Madras HC", status: "pending", filedDate: "2026-01-18" },
      { number: "WP 3502/2026", title: "Mettupalayam Farmers vs. State", court: "Madras HC", status: "pending", filedDate: "2026-02-05" },
    ],
    riskTrend: [45, 48, 50, 55, 53, 56, 54, 52],
  },
  {
    id: "p3",
    name: "Madurai Ring Road (NH-385 extension)",
    code: "MDR-RR-2026",
    lat: 9.9252,
    lng: 78.1198,
    riskScore: 31,
    riskLevel: "low",
    status: "Possession Stage — on track",
    parcelsTotal: 312,
    parcelsAcquired: 281,
    villagesAffected: 9,
    estimatedCost: "₹ 1,950 Cr",
    startDate: "2024-01-10",
    targetDate: "2026-09-30",
    litigations: 3,
    forestClearance: "n/a",
    disbursementRate: 91,
    summary:
      "27-km ring alignment east of Madurai. Near-complete possession; 3 minor challenges resolved. Disbursement ahead of schedule.",
    shapFactors: [
      { name: "Disbursement Speed", contribution: 6, description: "91% disbursed — positive trajectory" },
      { name: "Litigation Stays", contribution: 4, description: "3 resolved challenges" },
      { name: "Land Records Dispute", contribution: 2, description: "Minor corrections pending" },
      { name: "Forest Clearance", contribution: 0, description: "Not applicable" },
      { name: "Baseline: Project Size", contribution: 3, description: "Compact corridor" },
    ],
    location: "Madurai, TN",
    type: "Ring Road",
    assignedOfficer: "S. Murugan, IAS",
    officerDesignation: "Additional Collector (Land Acquisition)",
    landownersAffected: 198,
    compensationBudget: "₹ 480 Cr",
    compensationDisbursed: "₹ 437 Cr",
    pendingDocuments: [
      { name: "Possession Certificate — Final 31 parcels", status: "pending" },
      { name: "Section 19 Award — Complete", status: "submitted" },
      { name: " Rehabilitation Plan", status: "submitted" },
    ],
    timeline: [
      { date: "2024-01-10", title: "Project Notification", detail: "Section 3A for 27-km ring road", status: "done" },
      { date: "2024-05-20", title: "SIA Completed", detail: "Social Impact Assessment — 9 villages", status: "done" },
      { date: "2024-09-15", title: "Section 11 Declaration", detail: "312 parcels identified", status: "done" },
      { date: "2025-03-10", title: "Section 19 Award", detail: "Compensation awards declared for all parcels", status: "done" },
      { date: "2025-08-01", title: "Possession Phase", detail: "281 of 312 parcels — 90% possession", status: "current" },
      { date: "2026-09-30", title: "Target Completion", detail: "Ring road operational", status: "upcoming" },
    ],
    legalCases: [
      { number: "WP 1201/2025", title: "Madurai Landowners Assn. vs. NHAI", court: "Madras HC", status: "disposed", filedDate: "2025-06-12" },
    ],
    riskTrend: [40, 38, 36, 35, 34, 32, 33, 31],
  },
  {
    id: "p4",
    name: "Salem–Coimbatore Rail Corridor (DFC)",
    code: "SC-DFC-2026",
    lat: 11.6643,
    lng: 78.1460,
    riskScore: 64,
    riskLevel: "medium",
    status: "Enquiry Stage — 6 forest objections",
    parcelsTotal: 892,
    parcelsAcquired: 410,
    villagesAffected: 24,
    estimatedCost: "₹ 7,200 Cr",
    startDate: "2024-05-20",
    targetDate: "2028-03-31",
    litigations: 19,
    forestClearance: "pending",
    disbursementRate: 49,
    summary:
      "Dual freight corridor through Erode–Tiruppur belt. 6 forest objections from WGFR; 19 land-owner litigations; disbursement critically slow.",
    shapFactors: [
      { name: "Litigation Stays", contribution: 16, description: "19 active petitions" },
      { name: "Disbursement Speed", contribution: 14, description: "49% disbursed — critically slow" },
      { name: "Forest Clearance", contribution: 10, description: "6 objections from WGFR" },
      { name: "Land Records Dispute", contribution: 8, description: "92 patta mismatches" },
      { name: "Baseline: Project Size", contribution: 6, description: "Long corridor, multiple districts" },
    ],
    location: "Erode–Tiruppur, TN",
    type: "Rail",
    assignedOfficer: "Dr. K. Senthil Nathan, IAS",
    officerDesignation: "District Collector & CALA",
    landownersAffected: 564,
    compensationBudget: "₹ 1,800 Cr",
    compensationDisbursed: "₹ 882 Cr",
    pendingDocuments: [
      { name: "FC Stage-I Application", status: "pending" },
      { name: "WGFR Objections Response", status: "pending" },
      { name: "Land Acquisition Plan", status: "submitted" },
      { name: "EIA — Railway Corridor", status: "submitted" },
    ],
    timeline: [
      { date: "2024-05-20", title: "Project Notification", detail: "Section 3A for DFC corridor", status: "done" },
      { date: "2024-10-15", title: "SIA Completed", detail: "Social Impact Assessment — 24 villages", status: "done" },
      { date: "2025-02-28", title: "Section 11 Declaration", detail: "892 parcels identified across 3 districts", status: "done" },
      { date: "2025-08-10", title: "Enquiry Stage", detail: "Objectors' enquiry — 6 forest objections filed", status: "current" },
      { date: "2026-06-01", title: "FC Stage-I Decision", detail: "Forest clearance Stage-I expected", status: "upcoming" },
      { date: "2028-03-31", title: "Target Completion", detail: "DFC operational target", status: "upcoming" },
    ],
    legalCases: [
      { number: "WP 4201/2026", title: "Erode Farmers Assn. vs. Railways", court: "Madras HC", status: "pending", filedDate: "2026-01-25" },
      { number: "WP 4398/2026", title: "Tiruppur Landowners vs. State", court: "Madras HC", status: "pending", filedDate: "2026-02-20" },
      { number: "WP 4512/2026", title: "WGFR Committee vs. MoEFCC", court: "NGT Chennai", status: "stay", filedDate: "2026-03-15" },
    ],
    riskTrend: [48, 52, 55, 58, 61, 63, 65, 64],
  },
];

export function riskColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "#198754";
    case "medium":
      return "#D99A00";
    case "high":
      return "#C0392B";
  }
}

export function riskBgColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "#E8F5E9";
    case "medium":
      return "#FFF8E1";
    case "high":
      return "#FDEDEC";
  }
}

export function riskLabel(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "Low Risk";
    case "medium":
      return "Medium Risk";
    case "high":
      return "High Risk";
  }
}

// --- Tasks data ---

export type TaskPriority = "urgent" | "high" | "medium" | "low";
export type TaskStatus = "urgent" | "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  project: string;
  projectId: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  daysLeft: number;
  assignedOfficer: string;
  detail: string;
}

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Section 19 compensation lapse warning — 3 awards",
    project: "Chennai–Bengaluru Expressway",
    projectId: "p1",
    priority: "urgent",
    status: "urgent",
    dueDate: "2026-10-08",
    daysLeft: 21,
    assignedOfficer: "Dr. K. Senthil Nathan, IAS",
    detail: "3 compensation awards lapse within 21 days. Re-deed authorization required immediately for Krishnagiri segment.",
  },
  {
    id: "t2",
    title: "Pending High-Court counter-affidavit — WP 4892/2026",
    project: "Chennai–Bengaluru Expressway",
    projectId: "p1",
    priority: "high",
    status: "urgent",
    dueDate: "2026-09-24",
    daysLeft: 7,
    assignedOfficer: "District Legal Officer",
    detail: "K. Palanisamy vs. State of TN. Counter-affidavit filing deadline: 24 Sep 2026.",
  },
  {
    id: "t3",
    title: "Forest Clearance Stage-I re-application",
    project: "Chennai–Bengaluru Expressway",
    projectId: "p1",
    priority: "high",
    status: "pending",
    dueDate: "2026-10-15",
    daysLeft: 28,
    assignedOfficer: "District Forest Officer",
    detail: "FC Stage-I lapsed on 12 Jul 2026. Re-application via PARIVESH required for Krishnagiri–Dharmapuri segment.",
  },
  {
    id: "t4",
    title: "Disbursement acceleration — 461 beneficiaries",
    project: "Salem–Coimbatore Rail Corridor",
    projectId: "p4",
    priority: "urgent",
    status: "in-progress",
    dueDate: "2026-10-01",
    daysLeft: 14,
    assignedOfficer: "Revenue Divisional Officer",
    detail: "Only 49% of eligible compensation disbursed. 461 beneficiaries awaiting payment totaling ₹ 918 Cr.",
  },
  {
    id: "t5",
    title: "Quarterly possession verification — 4,200 acres",
    project: "Coimbatore Bypass Phase-II",
    projectId: "p2",
    priority: "medium",
    status: "pending",
    dueDate: "2026-10-02",
    daysLeft: 15,
    assignedOfficer: "Tahsildar, Coimbatore",
    detail: "Physical possession verification for 4,200 acres in Coimbatore Western Corridor.",
  },
  {
    id: "t6",
    title: "6 forest objections response — WGFR Committee",
    project: "Salem–Coimbatore Rail Corridor",
    projectId: "p4",
    priority: "high",
    status: "pending",
    dueDate: "2026-09-29",
    daysLeft: 12,
    assignedOfficer: "District Forest Officer",
    detail: "Western Ghats Forest Range Committee filed 6 objections to DFC alignment through Erode belt.",
  },
  {
    id: "t7",
    title: "Patta correction — 47 cases",
    project: "Coimbatore Bypass Phase-II",
    projectId: "p2",
    priority: "medium",
    status: "in-progress",
    dueDate: "2026-10-10",
    daysLeft: 23,
    assignedOfficer: "Revenue Inspector",
    detail: "47 patta corrections needed across 8 sectors before final possession certificates.",
  },
  {
    id: "t8",
    title: "Possession certificate — final 31 parcels",
    project: "Madurai Ring Road",
    projectId: "p3",
    priority: "low",
    status: "completed",
    dueDate: "2026-09-10",
    daysLeft: -7,
    assignedOfficer: "Tahsildar, Madurai",
    detail: "Final 31 parcels possession certificate issued. Project nearing completion.",
  },
];

// --- Reports data ---

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  type: string;
  lastGenerated: string;
  status: "ready" | "stale";
}

export const reports: ReportItem[] = [
  { id: "r1", title: "Project Status Report", description: "Comprehensive status of all 4 active corridors including acquisition progress and milestones.", type: "Status", lastGenerated: "2026-09-15", status: "ready" },
  { id: "r2", title: "Risk Assessment Report", description: "AI-powered delay risk analysis with SHAP factor breakdown across all projects.", type: "Risk", lastGenerated: "2026-09-17", status: "ready" },
  { id: "r3", title: "Compensation Progress Report", description: "Disbursement tracking, pending payments, and Section 19 lapse warnings.", type: "Compensation", lastGenerated: "2026-09-14", status: "stale" },
  { id: "r4", title: "Legal Issues Report", description: "Active litigations, court appearances, and counter-affidavit deadlines.", type: "Legal", lastGenerated: "2026-09-16", status: "ready" },
  { id: "r5", title: "District Acquisition Summary", description: "Coimbatore & Western Corridor consolidated land acquisition dashboard.", type: "Summary", lastGenerated: "2026-09-12", status: "stale" },
];
