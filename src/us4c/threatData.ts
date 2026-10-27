// Illustrative sample dataset for the threat & trend panels on the command centre.
// These figures are not derived from case records and must stay labelled as illustrative.

export type HotspotLevel = "High" | "Moderate" | "Low";

export const threatSummary = {
  level: "Moderate",
  priority: "Data breaches",
  action: "Enhanced monitoring",
  period: "Jan – Dec 2025",
};

export const topThreats = [
  { name: "Ransomware", score: 92 },
  { name: "Phishing & social engineering", score: 81 },
  { name: "Malware & botnets", score: 68 },
  { name: "Insider threats", score: 47 },
  { name: "IoT vulnerabilities", score: 35 },
];

export const emergingTrends = [
  "AI-enhanced attacks",
  "Supply chain vulnerabilities",
  "Growth of multi-extortion tactics",
  "Cloud infrastructure compromises",
];

export const riskRegister: {
  threat: string;
  risk: "High" | "Medium" | "Low";
  mitigation: string;
}[] = [
  { threat: "Ransomware", risk: "High", mitigation: "Immutable backups" },
  { threat: "Phishing", risk: "Medium", mitigation: "User awareness training" },
  { threat: "Malware & botnets", risk: "High", mitigation: "Endpoint detection & patching" },
  { threat: "IoT vulnerabilities", risk: "Low", mitigation: "Network segmentation" },
];

// Complaints per lakh population.
export const cityHotspots = [
  { city: "Jaipur", rate: 57.3 },
  { city: "Udaipur", rate: 45.5 },
  { city: "Kota", rate: 31.9 },
  { city: "Alwar", rate: 30.9 },
  { city: "Jodhpur", rate: 28.4 },
];

// Share of registered complaints, %.
export const crimeTypes = [
  { type: "Online fraud", share: 34 },
  { type: "Phishing", share: 22 },
  { type: "Mule accounts", share: 16 },
  { type: "Data theft", share: 15 },
  { type: "Social media crimes", share: 13 },
];

export const caseTrend = [
  { year: "2021", cases: 3100 },
  { year: "2022", cases: 6000 },
  { year: "2023", cases: 8200 },
  { year: "2024", cases: 7900 },
  { year: "2025", cases: 11000 },
];

// Share of victims by age group, %.
export const victimAges = [
  { group: "18–25", share: 28 },
  { group: "26–35", share: 36 },
  { group: "36–45", share: 22 },
  { group: "46+", share: 14 },
];

// Registered complaints per district.
export const districtActivity: Record<string, number> = {
  Jaipur: 2140,
  Alwar: 980,
  Jodhpur: 910,
  Udaipur: 870,
  Kota: 760,
  Bharatpur: 720,
  Ajmer: 640,
  Bikaner: 430,
  Sikar: 410,
  Jhunjhunu: 380,
  Bhilwara: 360,
  Ganganagar: 340,
  Nagaur: 330,
  Dausa: 310,
  Pali: 290,
  Tonk: 270,
  Chittorgarh: 260,
  "Sawai Madhopur": 250,
  Banswara: 240,
  Hanumangarh: 190,
  Churu: 180,
  Barmer: 170,
  Karauli: 160,
  Dholpur: 150,
  Jhalawar: 140,
  Bundi: 130,
  Jalore: 120,
  Rajsamand: 110,
  Sirohi: 100,
  Baran: 95,
  Dungarpur: 90,
  Pratapgarh: 70,
  Jaisalmer: 60,
};

export const hotspotLevel = (count: number): HotspotLevel =>
  count >= 600 ? "High" : count >= 230 ? "Moderate" : "Low";

export const keyFindings = [
  {
    title: "Increasing use of mule accounts",
    detail:
      "Mule-account referrals are the fastest-growing fraud category, mostly linked to UPI and wallet transfers.",
  },
  {
    title: "Regional gaps in digital literacy",
    detail:
      "Western and southern districts report fewer complaints despite comparable exposure to fraud.",
  },
  {
    title: "Young adults most targeted",
    detail: "Victims aged 18–35 account for roughly 64% of registered complaints.",
  },
];

export const focusAreas = [
  {
    title: "Strengthen grassroots triage",
    detail: "Train police-station staff to register and escalate cyber complaints within the golden hour.",
  },
  {
    title: "Faster fund-hold requests",
    detail: "Tighten bank and wallet coordination through the 1930 helpline workflow.",
  },
  {
    title: "Targeted awareness drives",
    detail: "Prioritise campaigns in high-activity districts and college campuses.",
  },
];
