import type { Project } from "@/types/content";
import { evidence, profileSource, repoEvidence } from "./_helpers";

/**
 * Sources: four private repositories (one Laravel platform, three Flutter clients) —
 * docs/ARCHITECTURE.md, composer.json, pubspec.yaml and source tree of each, reviewed 2026-11-08.
 * Counts are file counts from the default branch, not runtime metrics.
 */
export const menuwave: Project = {
  slug: "menuwave",
  name: "MenuWave",
  tagline: "A multi-tenant operating system for restaurants — from the till to the TV screen.",
  summary:
    "One Laravel platform plus three Flutter clients covering administration, POS, kitchen display, guest ordering, delivery and digital-signage screens, with every restaurant isolated as its own tenant.",
  tier: "flagship",
  published: true,
  categories: ["SaaS", "Web", "Mobile", "Backend", "Enterprise"],
  technologies: ["Laravel 13", "PHP", "Sanctum", "Vite", "Tailwind CSS", "Alpine.js", "Flutter", "Riverpod", "GetX", "SQLite (on-device)", "MySQL", "Redis", "Stripe", "AWS", "OpenAI"],
  status: "Live",
  origin: "original",
  role: "Product engineer — platform architecture, Laravel backend, admin workspace and Flutter device clients.",
  highlight: "A global TenantScope plus role- and device-aware middleware isolate every restaurant's data across web, POS, kitchen and signage clients.",
  repos: ["menuwave-private-1", "menuwave-private-4", "menuwave-private-3", "menuwave-private-2"],
  links: { live: "https://www.menuwav.com/" },
  screenshots: [{
    src: "/images/projects/menuwave/menuwave-homepage.webp",
    alt: "MenuWav homepage showing its guest ordering, kitchen pass and menu screen workflows",
  }],
  stats: [
    { value: "25", label: "Domain modules" },
    { value: "116", label: "Eloquent models" },
    { value: "96", label: "Test files" },
    { value: "4", label: "Codebases (1 web, 3 Flutter)" },
  ],
  problem:
    "Restaurants run on disconnected tools — one for the menu, one for the till, paper tickets for the kitchen and a separate box for in-store screens. Each tool keeps its own data, so owners never see one picture of the business and every menu change is made several times.",
  solution:
    "MenuWave puts the whole operation on one multi-tenant platform. A Laravel application owns the data and business rules; dedicated Flutter clients run the point of sale, the kitchen display and the signage screens, each talking to the same tenant-scoped backend.",
  modules: ["Tenancy & identity", "Catalog & pricing", "Orders & payments", "Point of sale", "Kitchen display", "Guest ordering", "Delivery & riders", "Digital signage & video walls", "Inventory & production", "Workforce & shifts", "CRM, loyalty & promotions", "Accounting & reporting", "Food safety", "Maintenance"],
  architecture: [
    {
      id: "frontend", name: "Clients", status: "verified", state: "implemented",
      items: ["Admin workspace (Blade, Tailwind, Alpine.js, Vite)", "MenuWav POS — Flutter, Riverpod, go_router", "MenuWav Kitchen — Flutter, GetX", "MenuWav Player (signage) — Flutter, GetX, video_player"],
      note: "Each role gets a client built for its device: a browser workspace for owners, a tablet POS, a kitchen board and a TV player.",
      evidence: "repo/resources, repo/lib/features, repo/lib/modules, repo/lib",
    },
    {
      id: "api", name: "HTTP & API", status: "verified", state: "implemented",
      items: ["routes/api.php + web route groups: admin (platform, workspace), pos, kitchen, rider, billing, marketing", "Laravel Sanctum", "AuthenticateMenuWaveDevice middleware", "AssignRequestId & SecurityHeaders middleware"],
      note: "Screens and tablets authenticate as devices, separately from staff accounts; every request gets a request ID.",
      evidence: "repo/routes, app/Http/Middleware",
    },
    {
      id: "services", name: "Domains & services", status: "verified", state: "implemented",
      items: ["25 domain modules under app/Domains (Tenancy, Orders, Kitchen, Payments, Delivery, Inventory, Workforce, Accounting …)", "Policies + EnsurePermission / EnsureSubscribed / EnsureKitchenAccess middleware", "Queued jobs", "AI usage tracking (AiUsage model)"],
      note: "Business logic is organised by restaurant domain rather than by technical layer, so each area evolves independently.",
      evidence: "repo/app/Domains, app/Policies, app/Jobs",
    },
    {
      id: "database", name: "Data", status: "verified", state: "implemented",
      items: ["116 Eloquent models · 75 migrations", "TenantScope global scope", "MySQL (server) · SQLite via sqflite (POS & player, on-device)"],
      note: "Tenant isolation is enforced at the query layer. Device clients keep local SQLite stores.",
      evidence: "repo/app/Domains/Tenancy/TenantScope.php, database/migrations, pubspec.yaml (sqflite)",
    },
    {
      id: "infrastructure", name: "Integrations", status: "verified", state: "implemented",
      items: ["Stripe (stripe/stripe-php, StripeEvent model)", "Redis", "AWS", "OpenAI", "ESC/POS USB receipt printing (POS)", "QR-based screen pairing (player)"],
      note: "Billing, caching and AI are external services; hardware integration lives in the device apps.",
      evidence: "composer.json, .env.example, POS & player pubspec.yaml",
    },
  ],
  decisions: [
    "Multi-tenancy at the query layer (a global TenantScope) instead of separate databases — onboarding a restaurant is configuration, not a deployment.",
    "Domain-oriented code organisation (app/Domains/*) so Orders, Kitchen, Inventory and Workforce can grow without a single bloated services folder.",
    "Separate device authentication for POS tablets and signage screens, distinct from staff logins.",
    "Native Flutter clients for hardware-facing roles: USB receipt printers, always-on TV playback (wakelock), and on-device SQLite.",
    "Subscription and permission checks expressed as middleware (EnsureSubscribed, EnsurePermission, RedirectUnpaidTrial) so access rules sit in one place.",
  ],
  challenges: [
    { title: "Isolation without friction", detail: "Every query, upload and screen must be scoped to the right restaurant without relying on developers remembering a filter — solved with a global scope and tenant-aware middleware." },
    { title: "One order, many surfaces", detail: "An order placed by a guest has to appear correctly on the POS and the kitchen board, with status history (OrderStatusEvent) and kitchen tickets per station." },
    { title: "Screens in the wild", detail: "Signage players run unattended on TVs: they pair by QR, cache playlists locally, track app releases and report crashes back to the platform." },
  ],
  deployment: "Live at menuwav.com. The repository contains a public_html.htaccess for shared-hosting deployment; hosting topology beyond that is not documented in the repositories.",
  security: ["Tenant isolation via global query scope", "Role, permission and subscription middleware", "Device authentication for screens and tablets", "Request IDs and security headers on every response", "flutter_secure_storage for credentials on devices"],
  performance: ["Local SQLite on POS and player clients", "Queued jobs for slow work", "Redis configured for cache/queues"],
  outcomes: [{ text: "Live product at menuwav.com", status: "verified" }],
  lessons: [],
  related: ["totalcashpro", "labelbuddy", "buildexa"],
  pending: ["Operational product screenshots", "Measured production outcomes (restaurants, orders)", "Exact individual vs. team ownership split"],
  evidence: evidence([...repoEvidence(["menuwave-private-1", "menuwave-private-4", "menuwave-private-3", "menuwave-private-2"]), { label: "menuwav.com", href: "https://www.menuwav.com/", kind: "live-site" }, profileSource], "verified", "full"),
};
