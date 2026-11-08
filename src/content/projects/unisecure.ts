import type { Project } from "@/types/content";
import { evidence, repoEvidence } from "./_helpers";

/** Source: github.com/Asad2512-dev/unisecure — docs/architecture.md, composer.json, .env.example */
export const unisecure: Project = {
  slug: "unisecure",
  name: "UniSecure",
  tagline: "Campus attendance and gate security, built on a versioned API.",
  summary:
    "A Laravel 13 platform with a web admin panel and one Flutter app for students, teachers and guards — attendance, scheduling, gate activity, visitors, notifications and audit trails over a versioned API.",
  tier: "featured",
  published: false,
  status: "In Development",
  origin: "original",
  highlight: "A versioned /api/v1 with one response envelope and request-ID tracing, plus a provider-independent face-verification interface (provider integration planned).",
  categories: ["Backend", "Mobile", "Web", "Enterprise"],
  repos: ["unisecure"],
  problem:
    "Universities track class attendance and campus entry with separate, manual processes. Guards can't verify who is entering, and teachers lose time to roll calls.",
  solution:
    "A Laravel platform with a web admin panel and a single Flutter app serving students, teachers and guards — covering attendance, scheduling, gate activity, visitors, notifications and audit records.",
  role: "Sole engineer — architecture, Laravel backend, admin panel, API and Flutter client.",
  technologies: ["Laravel 13", "PHP 8.3", "MySQL", "Sanctum", "Blade", "Tailwind CSS", "Alpine.js", "Flutter", "Firebase Cloud Messaging"],
  modules: ["Attendance", "Scheduling", "Gate security", "Visitors", "Notifications", "Reports & exports", "Audit trail", "Analytics"],
  architecture: [
    { id: "frontend", name: "Clients", items: ["Admin panel (Blade, Tailwind, Alpine)", "Flutter app for Student / Teacher / Guard"], note: "One mobile app adapts to three roles; admins work on the web.", status: "verified", state: "implemented" },
    { id: "api", name: "API v1", items: ["/api/v1 versioned routes", "Sanctum tokens", "X-Request-ID tracing", "{success, message, data, meta} envelope"], note: "Every response follows one envelope; every request carries a traceable ID without logging sensitive payloads.", status: "verified", state: "implemented" },
    { id: "services", name: "Services", items: ["Thin controllers", "app/Services workflows", "Repositories (contract + Eloquent)", "Policies", "Events / Listeners", "Jobs"], note: "Validation in Form Requests, response shaping in API Resources, authorization in Policies.", status: "verified", state: "implemented" },
    { id: "database", name: "Data", items: ["MySQL", "Database-backed queue"], note: "Relational schema for courses, sessions, attendance, gate events and audits.", status: "verified", state: "implemented" },
    { id: "infrastructure", name: "Integrations", items: ["FaceVerificationInterface → service → provider (interface in place; enrollment and real provider planned)", "Optional NFC behind a feature flag", "FCM push"], note: "Face verification sits behind an interface so the provider can change; the production provider and enrollment are later-phase work. NFC can be disabled entirely.", status: "verified", state: "planned" },
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
  deployment: "Under active development; not yet deployed to production.",
  security: ["Sanctum token auth", "Policy- and middleware-based authorization", "Request-ID tracing without sensitive payload logging", "Server-side verification only", "Audit records"],
  performance: ["Slow work moved to queued Jobs", "Reusable queries isolated in repositories"],
  outcomes: [{ text: "Architecture, API v1 and security workflows documented in the public repository", status: "verified" }],
  lessons: ["Writing the architecture document first kept a solo project consistent across web, API and mobile."],
  links: { repo: "https://github.com/Asad2512-dev/unisecure" },
  screenshots: [],
  related: ["examcell"],
  pending: ["Screenshots", "Deployment URL"],
  evidence: evidence(repoEvidence(["unisecure"], { publicRepos: ["unisecure"] }), "verified", "full"),
};
