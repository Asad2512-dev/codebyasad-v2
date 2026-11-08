import type { Project } from "@/types/content";
import { evidence, profileSource, repoEvidence } from "./_helpers";

/** Source: private TotalCashPro repository — docs/ARCHITECTURE.md, README, composer.json and source tree, reviewed 2026-11-08. */
export const totalcashpro: Project = {
  slug: "totalcashpro",
  name: "TotalCashPro",
  tagline: "The back office for hospitality groups — cash, staff, stock, suppliers and compliance in one system.",
  summary:
    "A multi-panel Laravel platform that gives restaurant groups one place for cash-ups, finance, rotas, inventory and procurement, food-safety records, recruitment and delivery — with separate panels for owners, staff, riders, kiosks and security.",
  tier: "flagship",
  published: true,
  categories: ["SaaS", "Web", "Backend", "Enterprise"],
  technologies: ["Laravel", "PHP", "Sanctum", "Vite", "Tailwind CSS", "Alpine.js", "Stripe", "Redis", "AWS"],
  status: "Live",
  origin: "original",
  role: "Full-stack engineer — domain modelling, Laravel backend, role-based panels and billing.",
  highlight: "Eight role-scoped route groups (super-admin, business-admin, staff, rider, kiosk, security, API v1) over one domain model, guarded by 35 authorization policies.",
  repos: ["totalcashpro-private-1"],
  links: { live: "https://totalcashpro.com" },
  screenshots: [{
    src: "/images/projects/totalcashpro/totalcashpro-homepage.webp",
    alt: "TotalCashPro homepage showing its restaurant operations dashboard for cash, staffing, attendance and weekly reports",
  }],
  stats: [
    { value: "147", label: "Eloquent models" },
    { value: "23", label: "Service areas" },
    { value: "35", label: "Authorization policies" },
    { value: "76", label: "Test files" },
  ],
  problem:
    "Owners of several restaurants reconcile cash, sales, staff hours, supplier invoices and food-safety checks site by site, often on paper or spreadsheets. Numbers arrive late, rarely agree, and compliance records are hard to produce when an inspector asks.",
  solution:
    "TotalCashPro models the business — organisations, branches, staff, suppliers — once, and builds every back-office workflow on top: multi-till cash-ups and bank reconciliation, rotas and leave, stock and purchase orders, temperature logs and food-safety tasks, recruitment, delivery and subscription billing.",
  modules: ["Cash-ups & cash drawers", "Finance & bank reconciliation", "Payroll runs & wages", "Rotas, shifts & leave", "Attendance & kiosk clock-in", "Inventory & stocktakes", "Purchase orders & supplier invoices", "Food safety & temperature logs", "Tasks & checklists", "Recruitment pipeline", "Delivery & riders", "CRM & messaging", "Subscription billing", "CMS & chatbot FAQ"],
  architecture: [
    {
      id: "frontend", name: "Panels", status: "verified", state: "implemented",
      items: ["Super Admin", "Business Admin", "Staff", "Rider", "Kiosk (staff PIN)", "Security", "Public marketing & CMS pages"],
      note: "Each role lands in its own panel after one shared login; kiosks run on a business login with per-staff PINs.",
      evidence: "routes/*.php, README roles table, resources/",
    },
    {
      id: "api", name: "HTTP & API", status: "verified", state: "implemented",
      items: ["routes/api/v1.php", "Laravel Sanctum", "Role-scoped route files per panel"],
      note: "A versioned API sits beside the server-rendered panels.",
      evidence: "routes/api.php, routes/api/v1.php, composer.json",
    },
    {
      id: "services", name: "Application layer", status: "verified", state: "implemented",
      items: ["23 service areas (Billing, FoodSafety, Temperature, Kiosk, Recruitment, Rider, Security, Staff …)", "Actions, DTOs, Value Objects, Repositories", "Events & listeners (e.g. ShiftSwapApproved, PurchaseOrderReceived, RecurringBillGenerated)", "Observers · 35 Policies"],
      note: "Workflows live in services and single-purpose actions; domain events decouple side effects like notifications.",
      evidence: "app/Services, app/Actions, app/DTOs, app/Events, app/Policies",
    },
    {
      id: "database", name: "Data", status: "verified", state: "implemented",
      items: ["147 Eloquent models · 60 migrations", "Audit, activity and login-history logs", "Seeded roles, plans, settings, CMS and food-safety templates"],
      note: "A wide relational model: finance, HR, inventory, procurement and compliance share organisations and branches.",
      evidence: "app/Models, database/migrations, README",
    },
    {
      id: "infrastructure", name: "Integrations & jobs", status: "verified", state: "implemented",
      items: ["Stripe billing + webhook event log", "Queued email & push notification jobs", "Redis", "AWS"],
      note: "Billing events are persisted before processing; notifications are sent from the queue.",
      evidence: "composer.json, BillingWebhookEvent model, app/Jobs, .env.example",
    },
  ],
  decisions: [
    "Separate route files and panels per role, so each audience sees a focused interface and authorization stays explicit.",
    "Actions, DTOs and value objects instead of fat controllers — business operations are small, testable units.",
    "Domain events (leave approved, shift swap approved, PO received, recurring bill generated) drive notifications instead of inline calls.",
    "Stripe webhooks are stored as events first, giving an audit trail for billing state.",
    "Clean-by-default seeding: production starts with roles, plans and templates only; demo data is an explicit opt-in command.",
  ],
  challenges: [
    { title: "Money that reconciles", detail: "Multi-till cash-ups, bank reconciliation, invoice matching and petty cash all have to agree — covered by dedicated feature tests (MultiTillCashUpWorkflowTest, AccountingReconciliationTest)." },
    { title: "Many roles, one login", detail: "Staff, riders, kiosks and security officers share infrastructure but must never reach each other's data — enforced through 35 policies, role middleware and tests such as ConcurrentLoginTest." },
    { title: "Compliance as data", detail: "Temperature probes, hot-food tests, delivery checks and food-safety tasks become structured records instead of paper sheets." },
  ],
  deployment: "Live at totalcashpro.com. The repository includes a root .htaccess and index.php for shared-hosting deployment, plus a staging reset command (db:reset-staging).",
  security: ["35 authorization policies", "Role-scoped panels and middleware", "Two-factor recovery codes, OTP codes and login history", "Security and audit logs", "Separate local/staging credentials; never production"],
  performance: ["Queued notification jobs", "Dashboard caching covered by DashboardCacheTest", "Redis configured"],
  outcomes: [{ text: "Live product at totalcashpro.com", status: "verified" }],
  lessons: [],
  related: ["menuwave", "buildexa"],
  pending: ["Operational product screenshots", "Measured production outcomes", "Exact individual vs. team ownership split"],
  evidence: evidence([...repoEvidence(["totalcashpro-private-1"]), { label: "totalcashpro.com", href: "https://totalcashpro.com", kind: "live-site" }, profileSource], "verified", "full"),
};
