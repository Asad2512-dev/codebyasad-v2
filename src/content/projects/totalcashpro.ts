import type { Project } from "@/types/content";

export const totalcashpro: Project = {
  slug: "totalcashpro",
  name: "TotalCashPro",
  tagline: "Back-office and financial operations for hospitality groups.",
  year: "Ongoing",
  featured: true,
  index: "02",
  categories: ["SaaS", "Web", "Backend"],
  problem:
    "Owners of several restaurants reconcile cash, sales and operations site by site, often in spreadsheets. Numbers arrive late and rarely agree.",
  solution:
    "TotalCashPro centralises back-office and financial operations across multiple restaurants so a group can see and manage every location in one place.",
  role: "Full-stack engineer — product, backend and web platform.",
  technologies: { items: [], status: "pending" },
  modules: ["Multi-location overview", "Financial operations", "Back-office workflows"],
  architecture: [
    { id: "frontend", name: "Interfaces", items: ["Group dashboard", "Location back office"], note: "Group-level and site-level views of the same data.", status: "reported" },
    { id: "api", name: "API", items: ["Location-scoped endpoints"], note: "Details pending confirmation.", status: "pending" },
    { id: "services", name: "Services", items: ["Cash & reconciliation", "Reporting"], note: "Details pending confirmation.", status: "pending" },
    { id: "database", name: "Data", items: ["Per-location financial records"], note: "Details pending confirmation.", status: "pending" },
    { id: "infrastructure", name: "Infrastructure", items: ["totalcashpro.com"], note: "Hosting details pending confirmation.", status: "pending" },
  ],
  decisions: ["Model the group and its locations as first-class entities so reports roll up naturally."],
  challenges: [
    { title: "Numbers people trust", detail: "Financial data must reconcile across locations; rounding, timing and corrections all need explicit rules." },
  ],
  deployment: { text: "Live at totalcashpro.com. Hosting details pending confirmation.", status: "pending" },
  security: ["Access separated by group and location"],
  performance: [],
  outcomes: [{ text: "Live product at totalcashpro.com", status: "verified" }],
  lessons: [],
  links: { live: "https://totalcashpro.com" },
  screenshots: [],
  pending: ["Technology stack", "Architecture details", "Deployment", "Screenshots", "Measured outcomes"],
};
