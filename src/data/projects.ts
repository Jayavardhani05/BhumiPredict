export type RiskLevel = "low" | "medium" | "high";

export interface ShapFactor {
  name: string;
  contribution: number; // positive = increases risk
  description: string;
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
  },
];

export function riskColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "#16a34a";
    case "medium":
      return "#d97706";
    case "high":
      return "#dc2626";
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
