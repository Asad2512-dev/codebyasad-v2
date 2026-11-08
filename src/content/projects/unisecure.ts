import type { Project } from "@/types/content";

/** Source: github.com/Asad2512-dev/unisecure — docs/architecture.md, composer.json, .env.example */
export const unisecure: Project = {
  slug: "unisecure",
  name: "UniSecure",
  tagline: "Campus attendance and gate security, built on a versioned API.",
  year: "2026",
  featured: false,
  index: "04",
  categories: ["Backend", "Mobile", "Web"],
  problem:
    "Universities track class attendance and campus entry with separate, manual processes. Guards can't verify who is entering, and teachers lose time to roll calls.",
  solution:
    "A Laravel platform with a web admin panel and a single Flutter app serving students, teachers and guards — covering attendance, scheduling, gate activity, visitors, notifications and audit records.",
  role: "Sole engineer — architecture, Laravel backend, admin panel, API and Flutter client.",
  technologies: { items: ["Laravel 13", "PHP 8.3", "MySQL", "Sanctum", "Blade", "Tailwind", "Alpine.js", "Flutter", "Firebase Cloud Messaging"], status: "verified" },
  modules: ["Attendance", "Scheduling", "Gate security", "Visitors", "Notifications", "Reports & exports", "Audit trail", "Analytics"],
  architecture: [
    { id: "frontend", name: "Clients", items: ["Admin panel (Blade, Tailwind, Alpine)", "Flutter app for Student / Teacher / Guard"], note: "One mobile app adapts to three roles; admins work on the web.", status: "verified" },
    { id: "api", name: "API v1", items: ["/api/v1 versioned routes", "Sanctum tokens", "X-Request-ID tracing", "{success, message, data, meta} envelope"], note: "Every response follows one envelope; every request carries a traceable ID without logging sensitive payloads.", status: "verified" },
    { id: "services", name: "Services", items: ["Thin controllers", "app/Services workflows", "Repositories (contract + Eloquent)", "Policies", "Events / Listeners", "Jobs"], note: "Validation in Form Requests, response shaping in API Resources, authorization in Policies.", status: "verified" },
    { id: "database", name: "Data", items: ["MySQL", "Database-backed queue"], note: "Relational schema for courses, sessions, attendance, gate events and audits.", status: "verified" },
    { id: "infrastructure", name: "Integrations", items: ["Face verification provider interface", "Optional NFC (feature flag)", "FCM push"], note: "Face verification sits behind an interface so the provider can change; NFC can be disabled entirely.", status: "verified" },
  ],
  decisions: [
    "Provider-independent face verification: FaceVerificationInterface → Service → configured provider, with manual verification as the fallback.",
    "No fake biometrics: no simulated matches, embeddings or client-supplied verification results.",
    "NFC is optional and feature-flagged; the core system works with it disabled.",
    "A single Flutter app for three roles instead of three apps to maintain.",
  ],
  challenges: [
    { title: "Trust at the gate", detail: "Verification must be server-side and auditable; the client can never be trusted to say who someone is." },
    { title: "One app, three roles", detail: "Students, teachers and guards share an app but must only reach their own workflows — enforced by policies, not hidden buttons." },
  ],
  deployment: { text: "Laravel application with database queues; production hosting in progress.", status: "verified" },
  security: ["Sanctum token auth", "Policy- and middleware-based authorization", "Request-ID tracing without sensitive payload logging", "Server-side verification only", "Audit records"],
  performance: ["Slow work moved to queued Jobs", "Reusable queries isolated in repositories"],
  outcomes: [{ text: "Documented architecture, API v1 and security workflows in the public repository", status: "verified" }],
  lessons: ["Writing the architecture document first kept a solo project consistent across web, API and mobile."],
  links: { repo: "https://github.com/Asad2512-dev/unisecure" },
  screenshots: [],
  pending: ["Screenshots", "Deployment URL"],
};
