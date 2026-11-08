import type { Project } from "@/types/content";

export const menuwave: Project = {
  slug: "menuwave",
  name: "MenuWave",
  tagline: "A multi-tenant operating system for restaurants.",
  year: "Ongoing",
  featured: true,
  index: "01",
  categories: ["SaaS", "Web", "Backend"],
  problem:
    "Restaurants run on disconnected tools — one for the menu, one for the till, paper tickets for the kitchen and a separate screen for promotions. Every tool has its own data, so owners never see one picture of the business.",
  solution:
    "MenuWave brings administration, operations, point of sale, kitchen workflows, customer ordering and digital signage into one platform, with each restaurant isolated as its own tenant.",
  role: "Product engineer — architecture, backend, interfaces and deployment.",
  technologies: { items: [], status: "pending" },
  modules: ["Administration", "Operations", "Point of sale", "Kitchen workflows", "Customer ordering", "Digital signage"],
  architecture: [
    { id: "frontend", name: "Interfaces", items: ["Admin console", "POS", "Kitchen display", "Customer ordering", "Signage screens"], note: "One interface per role, sharing a single source of truth.", status: "verified" },
    { id: "api", name: "API", items: ["Tenant-scoped endpoints"], note: "Every request resolves its tenant before touching data.", status: "pending" },
    { id: "services", name: "Services", items: ["Orders", "Menu", "Kitchen routing", "Signage content"], note: "Domain modules mirror the restaurant's real workflows.", status: "pending" },
    { id: "database", name: "Data", items: ["Tenant-isolated records"], note: "Database engine and isolation strategy pending confirmation.", status: "pending" },
    { id: "infrastructure", name: "Infrastructure", items: ["menuwave.com"], note: "Hosting details pending confirmation.", status: "pending" },
  ],
  decisions: [
    "Multi-tenancy from day one, so a new restaurant is configuration rather than a new deployment.",
    "Separate role-specific surfaces (POS, kitchen, signage) over one generic dashboard.",
  ],
  challenges: [
    { title: "Tenant isolation", detail: "Every query, upload and screen must be scoped to the right restaurant without relying on developers remembering a filter." },
    { title: "Many screens, one order", detail: "An order placed by a customer has to appear correctly on the POS and the kitchen display, in the right state." },
  ],
  deployment: { text: "Live at menuwave.com. Hosting and release pipeline pending confirmation.", status: "pending" },
  security: ["Tenant-scoped data access", "Role-based access for staff surfaces"],
  performance: [],
  outcomes: [{ text: "Live product at menuwave.com", status: "verified" }],
  lessons: [],
  links: { live: "https://menuwave.com" },
  screenshots: [],
  pending: ["Technology stack", "Database and tenancy strategy", "Hosting and deployment", "Screenshots", "Measured outcomes"],
};
