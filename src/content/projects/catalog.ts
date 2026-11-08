import type { Project, ProjectCategory, ProjectOrigin, ProjectStatus, Verification } from "@/types/content";
import { GH, evidence, profileSource, repoEvidence } from "./_helpers";

/**
 * Catalogue entries reconciled from the 95-repository audit (docs/REPOSITORY-AUDIT.md).
 * Each entry cites the repositories it was built from. Descriptions come from each repo's
 * docs/ARCHITECTURE.md, README, manifests and feature folders — nothing is inferred beyond them.
 */
const PUBLIC = ["unisecure", "tasks", "stock-management-", "smart-log-analyzer", "session_buddy", "my-flyn", "mood_panda", "library-api-nestjs", "codebyasad", "chatie_chat_app", "autocategory-ai-platform", "GreenGuide", "ClubSync", "codebyasad-v2", "odyssy_hub"];

interface Entry {
  slug: string; name: string; tagline: string; summary: string;
  categories: ProjectCategory[]; technologies: string[]; repos: string[];
  highlight?: string; role?: string; status?: ProjectStatus; origin?: ProjectOrigin;
  live?: string; modules?: string[]; tier?: Project["tier"]; published?: boolean;
  verification?: Verification; completeness?: Project["evidence"]["completeness"];
  pending?: string[]; fromProfile?: boolean; related?: string[];
  screenshots?: Project["screenshots"];
}

function entry(e: Entry): Project {
  const publicRepo = e.repos.find((r) => PUBLIC.includes(r));
  const sources = [
    ...repoEvidence(e.repos, { publicRepos: PUBLIC }),
    ...(e.live ? [{ label: e.live.replace("https://", ""), href: e.live, kind: "live-site" as const }] : []),
    ...(e.fromProfile ? [profileSource] : []),
  ];
  return {
    slug: e.slug, name: e.name, tagline: e.tagline, summary: e.summary,
    tier: e.tier ?? "catalog", published: e.published ?? true,
    categories: e.categories, technologies: e.technologies, status: e.status,
    origin: e.origin ?? "original", role: e.role, highlight: e.highlight,
    repos: e.repos, links: { live: e.live, repo: publicRepo ? `${GH}/${publicRepo}` : undefined },
    screenshots: e.screenshots ?? [], modules: e.modules, related: e.related,
    pending: e.pending ?? (e.screenshots?.length ? [] : ["Screenshots"]),
    evidence: evidence(sources, e.verification ?? (e.repos.length ? "verified" : "reported"), e.completeness ?? "partial"),
  };
}

export const catalog: Project[] = [
  // ───────────── SaaS & business platforms ─────────────
  entry({
    slug: "labelbuddy", name: "LabelBuddy", tier: "featured",
    tagline: "Product labels and EU energy labels, generated and printed from a phone.",
    summary: "A Laravel backend with Stripe subscriptions and a Flutter app with catalog, categories, products and a printer module for producing retail labels.",
    categories: ["SaaS", "Mobile", "Backend"], technologies: ["Laravel", "Sanctum", "Stripe", "Vite", "Tailwind CSS", "Flutter", "GetX"],
    repos: ["labelbuddy-private-1", "labelbuddy-private-2"], live: "https://labelbuddy.co.uk", status: "Live", fromProfile: true,
    screenshots: [{ src: "/images/projects/labelbuddy/labelbuddy-homepage.webp", alt: "LabelBuddy homepage for product label printing" }],
    highlight: "Subscription-gated Flutter client (subscription and printer modules) backed by a Sanctum API with Stripe billing.",
    modules: ["Catalog", "Categories", "Products", "Printer", "Subscription"], related: ["menuwave", "buildexa"],
  }),
  entry({
    slug: "biterush", name: "BiteRush", tier: "featured", origin: "customised",
    tagline: "A multi-vendor food and grocery delivery platform — five apps, one marketplace.",
    summary: "Customer, vendor and rider Flutter apps, a Next.js customer web app and a Laravel admin panel/API, launched on the licensed 6amMart multi-vendor codebase and customised and rebranded as BiteRush.",
    categories: ["SaaS", "Mobile", "Web", "Backend"], technologies: ["Laravel", "React", "Inertia", "Next.js", "Flutter", "GetX", "Firebase", "FCM", "Google Maps", "Pusher", "Stripe", "Twilio", "AWS S3", "OpenAI"],
    repos: ["biterush-private-5", "biterush-private-3", "biterush-private-2", "biterush-private-4", "biterush-private-1"],
    role: "Customisation, rebranding, integration and release across all five codebases.",
    highlight: "One backend serving five clients — customer (web + app), restaurant and rider — with real-time updates over Pusher and push via FCM.",
    modules: ["Ordering & checkout", "Multi-vendor stores", "Rider delivery & earnings", "Vendor menus & campaigns", "Wallet, loyalty & referrals", "Chat"],
    live: "https://biterush.co.uk", status: "Live",
    screenshots: [{ src: "/images/projects/biterush/biterush-homepage.webp", alt: "BiteRush food and grocery delivery homepage" }],
    pending: ["Which features were custom-built vs. the 6amMart base"], related: ["menuwave"],
  }),
  entry({
    slug: "buildexa", name: "Buildexa Technologies", tier: "featured",
    tagline: "The company behind MenuWave, TotalCashPro, BiteRush and LabelBuddy.",
    summary: "A PHP corporate website with product pages for BiteRush, MenuWav and TotalCashPro, an architectural 3D hero and a CSRF-protected inquiry form — plus a Laravel staff console for reviewing companies across all four products.",
    categories: ["Web", "Backend", "Enterprise"], technologies: ["PHP", "Laravel", "Vite", "Tailwind CSS"],
    repos: ["buildexa-private-2", "buildexa-private-1"], fromProfile: true, live: "https://buildexatechnologies.com", status: "Live",
    screenshots: [{ src: "/images/projects/buildexa/buildexa-homepage.webp", alt: "Buildexa Technologies homepage featuring its software products" }],
    highlight: "A single staff console that reviews tenant companies across four separate SaaS products.",
    related: ["menuwave", "totalcashpro", "biterush", "labelbuddy"],
  }),
  entry({
    slug: "devprismic", name: "DevPrismic",
    tagline: "Agency website and CRM with a built-in SEO engine.",
    summary: "A Laravel agency site and admin built with Filament, Blade, Alpine.js and precompiled Tailwind — no Node runtime needed on the server — with an inquiry CRM, system-operations widgets and a local scoring engine that generates meta tags.",
    categories: ["Web", "Backend", "Tools"], technologies: ["Laravel", "Filament", "Blade", "Alpine.js", "Tailwind CSS"],
    repos: ["devprismic-private-1"], highlight: "Built to deploy on shared hosting by cloning — no build step in production.",
    live: "https://devprismic.online", status: "Live",
    screenshots: [{ src: "/images/projects/devprismic/devprismic-homepage.webp", alt: "DevPrismic software development agency homepage" }],
  }),
  entry({
    slug: "autocategory-ai", published: false, name: "AutoCategory AI",
    tagline: "Product categorisation through a Laravel API and a Python ML microservice.",
    summary: "A Laravel 11 application paired with a FastAPI service that serves a trained scikit-learn model for predicting product categories.",
    categories: ["AI", "Backend", "Tools"], technologies: ["Laravel 11", "PHP", "FastAPI", "Python", "scikit-learn", "MySQL", "Vite", "Tailwind CSS"],
    repos: ["autocategory-ai-platform"], highlight: "Polyglot service boundary — PHP owns the product, Python owns inference.",
  }),
  entry({
    slug: "prepx", name: "SmartPrepX",
    tagline: "An exam-preparation app with MCQs, past papers and practice tests.",
    summary: "A published mobile app for MCQs, past papers and practice assessments, powered by a Laravel backend with OpenAI and Firebase named in its configuration.",
    categories: ["Mobile", "Backend", "AI"], technologies: ["Laravel", "PHP", "Firebase", "OpenAI", "Vite", "Tailwind CSS"],
    repos: ["prepx-private-1"], fromProfile: true, pending: ["Screenshots", "Store link", "Mobile client repository", "How OpenAI is used"],
  }),
  entry({
    slug: "wecare", name: "WeCare",
    tagline: "A medical app for patients and doctors with a real-time admin panel.",
    summary: "A Flutter app with separate patient and doctor flows, plus a Laravel admin panel that uses Pusher for real-time updates.",
    categories: ["Mobile", "Web", "Backend"], technologies: ["Flutter", "GetX", "Laravel", "Sanctum", "Alpine.js", "Tailwind CSS", "Pusher"],
    repos: ["wecare-private-1", "wecare-private-2"], modules: ["Patient", "Doctor", "Admin"],
    screenshots: [{ src: "/images/projects/wecare/wecare-thumbnail.webp", alt: "WeCare project thumbnail with its app branding" }],
  }),
  entry({
    slug: "coresy", published: false, name: "CoreSY Suite",
    tagline: "Six Flutter apps for ordering, reservations, QR passes and care services.",
    summary: "A family of customer and business apps — CoreSY Go (ordering), CoreSY Pass, CoreSY Care and business apps with and without reservations — built with BLoC, go_router and Dio, sharing QR-based check-in operations.",
    categories: ["Mobile", "SaaS"], technologies: ["Flutter", "BLoC", "go_router", "Dio", "Google Maps"],
    repos: ["coresy-private-5", "coresy-private-4", "coresy-private-6", "coresy-private-3", "coresy-private-1", "coresy-private-2"],
    highlight: "Consistent BLoC architecture across six apps; business apps share QR operations and reservation management.",
    modules: ["Ordering", "Reservations & bookings", "QR operations", "Gifts & points", "Offers", "Business reports"],
  }),
  entry({
    slug: "qik-e", name: "Qik-E",
    tagline: "A subscription marketplace app for businesses and customers.",
    summary: "A Flutter app with admin, business and user roles, subscriptions and Firebase authentication and data.",
    categories: ["Mobile", "SaaS"], technologies: ["Flutter", "GetX", "Firebase Auth", "Cloud Firestore"], repos: ["qik-e-private-1"],
    modules: ["Admin", "Business", "User", "Subscription"],
    screenshots: [{ src: "/images/projects/qik-e/qik-e-thumbnail.webp", alt: "Qik-E project thumbnail with its app branding" }],
  }),
  entry({
    slug: "session-buddy", name: "Session Buddy", tagline: "A Flutter app built with Firebase and GetX.",
    summary: "A Flutter application using Firebase Authentication, Cloud Firestore and GetX.",
    categories: ["Mobile"], technologies: ["Flutter", "Firebase", "Cloud Firestore", "Firebase Auth", "GetX"], repos: ["session_buddy"],
    screenshots: [{ src: "/images/projects/session-buddy/session-buddy-thumbnail.webp", alt: "Session Buddy project thumbnail with its app branding" }],
    pending: ["Product description"],
  }),

  // ───────────── Web properties ─────────────
  entry({
    slug: "tangled-synapses", name: "Tangled Synapses",
    tagline: "A brand website and four industry verticals — aviation, marine, energy and charters.",
    summary: "Next.js and TypeScript sites with GSAP motion for the Tangled Synapses brand and its aviation, marine and energy verticals, plus a charter landing page with an enquiry flow.",
    categories: ["Web"], technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    repos: ["tangled-synapses-private-5", "tangled-synapses-private-1", "tangled-synapses-private-4", "tangled-synapses-private-6", "tangled-synapses-private-3", "tangled-synapses-private-2"],
    live: "https://tangledsynapses.com", status: "Live", fromProfile: true,
    screenshots: [
      { src: "/images/projects/tangled-synapses/tangled-synapses-homepage.webp", alt: "Tangled Synapses longevity brand homepage" },
      { src: "/images/projects/tangled-synapses/tangled-synapses-aviation-homepage.webp", alt: "Tangled Synapses Aviation aircraft charter homepage" },
      { src: "/images/projects/tangled-synapses/tangled-synapses-marine-homepage.webp", alt: "Tangled Synapses Marine yacht and longevity homepage" },
      { src: "/images/projects/tangled-synapses/tangled-synapses-energy-homepage.webp", alt: "Tangled Synapses Energy homepage about energy generation" },
    ],
    highlight: "One design system shared across five sites for a brand and its verticals.",
  }),
  entry({
    slug: "zawaaral", name: "Zawaaral 3PL", tagline: "Website for a logistics, warehousing and fulfilment company.",
    summary: "A static website presenting logistics, warehousing, freight and fulfilment services.",
    categories: ["Web"], technologies: ["HTML", "CSS"], repos: ["zawaaral-private-1"], live: "https://zawaaral.com", status: "Live", fromProfile: true,
    screenshots: [{ src: "/images/projects/zawaaral/zawaaral-homepage.webp", alt: "Zawaaral 3PL homepage presenting freight and logistics services" }],
  }),
  entry({
    slug: "read-holy-quran", name: "Read Holy Quran", tagline: "A Quran reading website.",
    summary: "A Laravel and Livewire website for reading the Quran.",
    categories: ["Web"], technologies: ["Laravel", "Livewire", "Tailwind CSS", "Vite"], repos: ["read-holy-quran-private-1"],
    live: "https://readholyquran.online", status: "Live", fromProfile: true,
    screenshots: [{ src: "/images/projects/read-holy-quran/read-holy-quran-homepage.webp", alt: "Read Holy Quran homepage with daily reflection, prayer timings and Quran reading links" }],
  }),
  entry({
    slug: "flames-and-shakes", name: "Flames & Shakes", tagline: "Restaurant website and point of sale.",
    summary: "A Laravel food-service project in two generations: a Livewire storefront, and a v2 rebuild that adds a full POS with role permissions.",
    categories: ["Web", "Backend"], technologies: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "Spatie Permission", "Redis"],
    repos: ["flames-and-shakes-private-1", "flames-and-shakes-private-2"], fromProfile: true,
  }),
  entry({
    slug: "rayvon-scents", published: false, name: "Rayvon Scents", tagline: "An e-commerce store for fragrances.",
    summary: "A Laravel storefront with Alpine.js and Tailwind, using Pusher for real-time events.",
    categories: ["Web", "Backend"], technologies: ["Laravel", "Alpine.js", "Tailwind CSS", "Pusher"], repos: ["rayvon-scents-private-1"],
  }),
  entry({
    slug: "arkaf-edge", published: false, name: "ARKAF Edge", tagline: "A cinematic marketing site with a WebGL hero.",
    summary: "A statically exported Next.js marketing site with a WebGL rock hero, GSAP scroll choreography and an editorial layout.",
    categories: ["Web"], technologies: ["Next.js", "React", "TypeScript", "Three.js", "GSAP", "Tailwind CSS"], repos: ["arkaf-edge-private-1"],
  }),
  entry({
    slug: "blogbyasad", published: false, name: "BlogByAsad", tagline: "A Laravel blog and portfolio ecosystem.",
    summary: "A Laravel blog with role-based administration (Spatie Permission), Alpine.js and Tailwind.",
    categories: ["Web", "Backend"], technologies: ["Laravel", "Spatie Permission", "Alpine.js", "Tailwind CSS", "Vite"], repos: ["blogbyasad-private-1"],
  }),
  entry({
    slug: "codebyasad", published: false, name: "CodeByAsad", tagline: "This portfolio — and the Laravel site before it.",
    summary: "The current site is a statically exported Next.js portfolio with GSAP and a React Three Fiber hero; the previous version was a Laravel application.",
    categories: ["Web"], technologies: ["Next.js", "TypeScript", "GSAP", "Three.js", "Tailwind CSS", "Laravel"],
    repos: ["codebyasad-v2", "codebyasad"], live: "https://codebyasad.com", status: "Live", fromProfile: true,
  }),
  entry({
    slug: "pak-enterprises-tiles", name: "Pak Enterprises Tiles", tagline: "Tile catalogue with a tile calculator and WhatsApp inquiries.",
    summary: "A product catalogue website with a tile quantity calculator and WhatsApp inquiry flow.",
    categories: ["Web"], technologies: [], repos: [], live: "https://pakenterprisestiles.com", status: "Live", fromProfile: true,
    verification: "reported", completeness: "minimal", pending: ["Repository", "Technology stack"],
    screenshots: [{ src: "/images/projects/pak-enterprises-tiles/pak-enterprises-tiles-homepage.webp", alt: "Pak Enterprises Tiles showroom homepage with featured tile products" }],
  }),
  entry({
    slug: "dr-farhan-siddique", name: "Dr. Farhan Siddique", tagline: "Academic profile, research and publications site.",
    summary: "A personal academic website presenting research and publications.",
    categories: ["Web"], technologies: [], repos: [], live: "https://drfarhansiddique.com", status: "Live", fromProfile: true,
    verification: "reported", completeness: "minimal", pending: ["Repository", "Technology stack"],
    screenshots: [{ src: "/images/projects/dr-farhan-siddique/dr-farhan-siddique-homepage.webp", alt: "Dr. Farhan Siddique academic and research profile homepage" }],
  }),

  // ───────────── Published & client mobile apps ─────────────
  entry({
    slug: "gobirr", name: "GoBirr", origin: "customised", tier: "featured",
    tagline: "A location-based services marketplace — customer and provider apps.",
    summary: "Customer and provider Flutter apps for booking local services, launched by rebranding and customising the eDemand codebase, with Firebase, Google Maps and Stripe payments.",
    categories: ["Mobile", "SaaS"], technologies: ["Flutter", "BLoC", "Dio", "Firebase", "FCM", "Hive", "Google Maps", "Stripe"],
    repos: ["gobirr-private-1", "gobirr-private-2"], fromProfile: true,
    role: "Rebranding, customisation, integration and store release.",
    pending: ["Store links", "Which features were customised"],
  }),
  entry({
    slug: "beyond-today", name: "Beyond Today", tagline: "Digital legacy and estate planning.",
    summary: "A Flutter app for organising final wishes, documents, passwords, funeral plans, trusted contacts and messages to be released later, with subscriptions and Firebase.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase Auth", "Cloud Firestore"], repos: ["beyond-today-private-1"], fromProfile: true,
    modules: ["Final wishes", "Documents", "Passwords", "Funeral", "Trusted contacts", "Messages", "Unlock", "Subscription"],
    highlight: "Trusted-contact 'unlock' flow that controls when stored messages and documents are released.",
    pending: ["Store link", "Screenshots"],
  }),
  entry({
    slug: "lite-nurse-clinic", name: "Lite Nurse Clinic", tagline: "Booking app for professional skincare services.",
    summary: "A Flutter app for a skincare clinic's consultations and appointments, with App Store assets prepared in the repository.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase"], repos: ["lite-nurse-clinic-private-1"], fromProfile: true, pending: ["Store link"],
    screenshots: [{ src: "/images/projects/lite-nurse-clinic/lite-nurse-clinic-thumbnail.webp", alt: "Lite Nurse Clinic project thumbnail with its app branding" }],
  }),
  entry({
    slug: "blueprint-health-fitness", name: "Blueprint Health & Fitness", tagline: "Workout programmes and progress tracking.",
    summary: "A Flutter app for workout programmes and tracking progress.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX"], repos: ["blueprint-health-fitness-private-1"], fromProfile: true, pending: ["Store link"],
    screenshots: [{ src: "/images/projects/blueprint-health-fitness/blueprint-health-fitness-thumbnail.webp", alt: "Blueprint Health & Fitness project thumbnail with its app branding" }],
  }),
  entry({
    slug: "online-barber", published: false, name: "Online Barber", tagline: "Barber and salon booking with admin, barber and customer roles.",
    summary: "A Flutter booking app with separate admin, barber and customer experiences, Firebase data and messaging, and Google Maps.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase Auth", "Cloud Firestore", "FCM", "Google Maps"], repos: ["online-barber-private-1"], fromProfile: true,
    modules: ["Admin", "Barber", "Customer"], pending: ["Store link", "Screenshots"],
  }),
  entry({
    slug: "quicksaver", name: "QuickSaver", tagline: "A social video downloader.",
    summary: "A Flutter utility for saving social videos, with direct downloads and a download history.",
    categories: ["Mobile", "Tools"], technologies: ["Flutter", "GetX"], repos: ["quicksaver-private-1"], fromProfile: true, pending: ["Store link"],
  }),
  entry({
    slug: "top-coaches", name: "Top Coaches", tagline: "Published mobile application.",
    summary: "A published Flutter application listed in Asad's portfolio. The repository holds only a README, so no further detail is shown.",
    categories: ["Mobile"], technologies: ["Flutter"], repos: ["top-coaches-private-1"], fromProfile: true,
    verification: "reported", completeness: "minimal", pending: ["Source code", "Description", "Store link"],
  }),
  entry({
    slug: "mood-panda", name: "Mood Panda", tagline: "A mood app, rebuilt in a second version.",
    summary: "A Flutter app in two generations; the second version adds Firebase data and push notifications.",
    categories: ["Mobile"], technologies: ["Flutter", "Firebase", "Cloud Firestore", "FCM"], repos: ["mood_panda", "mood-panda-private-1"],
  }),
  entry({
    slug: "jordanian-sports", name: "Jordanian Sports", tagline: "Sports community: academies, pitches, tournaments and matchmaking.",
    summary: "A Flutter app covering academies, pitch booking, tournaments, U18 competitions, matchmaking, a shop, sponsors, media and multiple languages.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX"], repos: ["jordanian-sports-private-1"],
    modules: ["Academies", "Pitch booking", "Tournaments", "Matchmaking", "Shop", "Sponsors", "Community"],
    screenshots: [{ src: "/images/projects/jordanian-sports/jordanian-sports-thumbnail.webp", alt: "Jordanian Sports project thumbnail with JSC branding" }],
  }),
  entry({
    slug: "odyssey-hub", name: "Odyssey Hub", tagline: "A Flutter mobile app built with GetX and Dio.",
    summary: "A Flutter application using GetX for state management and Dio for networking. Product features and screenshots are not yet documented.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Dio"], repos: ["odyssy_hub"],
    pending: ["Product description", "Screenshots"],
  }),
  entry({
    slug: "football-app", name: "Football App", tagline: "Player profiles, favourites, chat and payments for football fans.",
    summary: "A Flutter app with player profiles, sports views, favourites, chat, sponsors and payments on Firebase.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase Auth", "Cloud Firestore"], repos: ["football-app-private-1"],
  }),
  entry({
    slug: "safe-city", name: "Safe City", tagline: "Citizen safety reporting with an admin side.",
    summary: "A Flutter app with user and admin roles, Firebase authentication, data and push notifications, and Google Maps.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase Auth", "Cloud Firestore", "FCM", "Google Maps"], repos: ["safe-city-private-1"],
  }),
  entry({
    slug: "budget-mart", name: "Budget Mart", tagline: "A shopping app with customer and admin roles.",
    summary: "A Flutter shopping app ('Smart Shopping') with user and admin sides, Firebase and Google Maps.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase Auth", "Cloud Firestore", "FCM", "Google Maps"], repos: ["budget-mart-private-1"],
  }),
  entry({
    slug: "softheal", name: "SoftHeal", tagline: "Guided healing programmes, journaling and urge intervention.",
    summary: "A Flutter wellbeing app with a healing programme, journal, grounding exercises, night routine, urge intervention and premium tier, using Firebase plus Hive and SQLite on-device.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase", "FCM", "Hive", "SQLite", "Dio"], repos: ["softheal-private-1"],
    modules: ["Healing programme", "Journal", "Grounding", "Night routine", "Urge intervention", "Premium"],
  }),
  entry({
    slug: "smart-splitter", name: "Smart Splitter", tagline: "Split bills with groups and contacts.",
    summary: "A Flutter app for splitting expenses across groups and contacts, with a scan-and-pay flow.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX"], repos: ["smart-splitter-private-1"],
  }),
  entry({
    slug: "student-boys-hostel", name: "Student Hostel Manager", tagline: "Rooms, students, rent and inspections for hostel owners.",
    summary: "A Flutter management app for hostels: rooms, students, guests, rent, inspections, reports and a lock screen.",
    categories: ["Mobile", "Enterprise"], technologies: ["Flutter"], repos: ["student-boys-hostel-private-1"],
  }),
  entry({
    slug: "sugarwell", name: "SugarWell", tagline: "Diabetes care for patients, with an admin side.",
    summary: "A Flutter app with patient and admin roles, Firebase and FCM, Hive local storage and go_router navigation.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Provider", "go_router", "Firebase", "FCM", "Hive", "Dio"], repos: ["sugarwell-private-1"],
  }),
  entry({
    slug: "askio-ai", name: "Askio AI — University App", tier: "featured", origin: "academic",
    tagline: "An AI-powered student portal for NUML.",
    summary: "A Flutter student portal with an AI chat assistant, classroom, schedule, results, calculations and academic resources.",
    categories: ["Mobile", "AI"], technologies: ["Flutter", "GetX"], repos: ["askio-ai-private-1", "askio-ai-private-2"],
    modules: ["AI chat", "Classroom", "Schedule", "Results", "Resources", "Notifications"],
    pending: ["Which AI model/provider powers chat", "Whether the second NUML repository is part of this project"],
  }),
  entry({
    slug: "clinic-token", name: "Clinic Token System", tagline: "A desktop queue system for clinics.",
    summary: "A Flutter desktop app with receptionist and doctor panels and an LCD display view for calling tokens, storing data locally in SQLite.",
    categories: ["Mobile", "Enterprise", "Tools"], technologies: ["Flutter (desktop)", "GetX", "SQLite"], repos: ["clinic-token-private-1"],
    modules: ["Receptionist panel", "Doctor panel", "LCD display"],
    screenshots: [{ src: "/images/projects/clinic-token/clinic-token-thumbnail.webp", alt: "Clinic Token System project thumbnail with its app branding" }],
  }),
  entry({
    slug: "muatabarea", published: false, name: "Muatabarea", tagline: "A Flutter app with Firebase, maps and push notifications.",
    summary: "A Flutter application using Firebase authentication, data, push notifications and Google Maps.",
    categories: ["Mobile"], technologies: ["Flutter", "GetX", "Firebase", "FCM", "Google Maps"], repos: ["muatabarea-private-1"],
    completeness: "minimal", pending: ["Product description", "Screenshots"],
  }),
  entry({
    slug: "cypher", published: false, name: "Cypher", tagline: "A project-management tool.",
    summary: "A Flutter project-management application using GetX and Dio.",
    categories: ["Mobile", "Tools"], technologies: ["Flutter", "GetX", "Dio"], repos: ["cypher-private-1"], completeness: "minimal",
  }),
  entry({
    slug: "greenguide", name: "GreenGuide", tagline: "Plant care with an AI assistant, marketplace and community chat.",
    summary: "A Flutter app with AI tips (Gemini), articles, a marketplace, chat and admin tools, plus a Node.js/Express and MySQL API.",
    categories: ["Mobile", "AI", "Backend"], technologies: ["Flutter", "GetX", "Firebase", "Gemini", "Node.js", "Express", "MySQL"],
    repos: ["GreenGuide", "greenguide-private-1"],
    screenshots: [{ src: "/images/projects/greenguide/greenguide-thumbnail.webp", alt: "GreenGuide project thumbnail with its app branding" }],
  }),
  entry({
    slug: "loombyte", name: "LoomByte", tagline: "A Next.js site with GSAP and Three.js.",
    summary: "A Next.js and TypeScript site using GSAP and Three.js.",
    categories: ["Web"], technologies: ["Next.js", "TypeScript", "GSAP", "Three.js"], repos: ["loombyte-private-1"], completeness: "minimal",
    live: "https://loombyte.online", status: "Live",
    screenshots: [{ src: "/images/projects/loombyte/loombyte-homepage.webp", alt: "LoomByte homepage about software, AI and engineering" }],
    pending: ["Purpose / client"],
  }),

  // ───────────── Systems, AI & research ─────────────
  entry({
    slug: "clubsync", published: false, name: "ClubSync", tagline: "Sports club management — players, grounds, events and jobs.",
    summary: "A React, Node.js/Express and MySQL web application for managing sports clubs, players, ground bookings, jobs and applications.",
    categories: ["Web", "Backend"], technologies: ["React", "Node.js", "Express", "MySQL", "Sequelize", "Tailwind CSS"], repos: ["ClubSync"],
  }),
  entry({
    slug: "voice-library", published: false, name: "Voice Library", origin: "academic",
    tagline: "A digital library with an AI voice assistant and Urdu text-to-speech.",
    summary: "A Django REST Framework API and React/Vite client for a digital library with voice navigation and Urdu TTS.",
    categories: ["Web", "AI", "Backend"], technologies: ["Django REST Framework", "Python", "React", "Vite", "MySQL"], repos: ["voice-library-private-1"],
    pending: ["Confirm whether this was the 2025 competition entry"],
  }),
  entry({
    slug: "signlink", published: false, name: "SignLink", origin: "academic",
    tagline: "AI sign-language translation from the camera.",
    summary: "A React/Vite camera and translation dashboard with a FastAPI backend that uses MediaPipe recognition, text-to-speech, authentication and MySQL.",
    categories: ["AI", "Web", "Backend"], technologies: ["React", "Vite", "FastAPI", "Python", "MediaPipe", "MySQL"], repos: ["signlink-private-1"],
  }),
  entry({
    slug: "librarypro-api", published: false, name: "LibraryPro API", tagline: "Library management REST API with RBAC and fines.",
    summary: "A NestJS, MongoDB and TypeScript API for catalogues, acquisitions, borrowing logs, automatic overdue fines and dashboards, with role-based access control.",
    categories: ["Backend", "Tools"], technologies: ["NestJS", "TypeScript", "MongoDB"], repos: ["library-api-nestjs"],
  }),
  entry({
    slug: "smart-log-analyzer", published: false, name: "Smart Log Analyzer", tagline: "A streaming CLI for server logs of any size.",
    summary: "A Node.js CLI that processes log files line by line with streams, so it never loads a whole file into memory.",
    categories: ["Tools"], technologies: ["Node.js", "TypeScript"], repos: ["smart-log-analyzer"],
  }),
  entry({
    slug: "eiva", name: "EIVA", status: "Research", origin: "research",
    tagline: "Evidence-Invariant Video Authentication.",
    summary: "Research into whether redundant video evidence distorts video-level authentication confidence, and whether correlation-aware aggregation improves robustness without losing sensitivity to informative frames.",
    categories: ["Research", "AI"], technologies: ["Python", "PyTorch", "scikit-learn"], repos: ["eiva-private-1"],
    highlight: "Pre-registered hypotheses and leakage rules: split videos before perturbation, keep the test set out of model selection, record seeds and versions.",
  }),
  entry({
    slug: "rcr-deepfake", name: "RCR-DeepFake", status: "Research", origin: "research",
    tagline: "Cross-generator deepfake video detection.",
    summary: "Research into cross-generator deepfake video detection using spatial–frequency–temporal camera-residual consistency.",
    categories: ["Research", "AI"], technologies: ["Python", "PyTorch"], repos: [], fromProfile: true,
    verification: "reported", completeness: "minimal", pending: ["Repository or paper link"],
  }),
  entry({
    slug: "freqkan", name: "FreqKAN / FreqKANPP", status: "Research", origin: "research",
    tagline: "Frequency-domain KAN and ConvKAN architectures for image classification.",
    summary: "Research on frequency-domain feature processing with KAN and ConvKAN architectures for image classification.",
    categories: ["Research", "AI"], technologies: ["Python", "PyTorch"], repos: [], fromProfile: true,
    verification: "reported", completeness: "minimal", pending: ["Repository or paper link"],
  }),
  entry({
    slug: "electronic-voting-machine", name: "Electronic Voting Machine", origin: "academic",
    tagline: "Authenticated voting with duplicate-vote protection and audit trails.",
    summary: "Voter authentication, candidate management, duplicate-vote protection, audit trails and results, built with React, Node.js/Express, MongoDB and JWT.",
    categories: ["Web", "Backend"], technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"], repos: [], fromProfile: true,
    verification: "reported", completeness: "minimal", pending: ["Repository link"],
  }),
  entry({
    slug: "supervisor-allocation", name: "Supervisor Allocation System", origin: "academic",
    tagline: "Expertise-based matching of students to supervisors.",
    summary: "Supervisor capacity, proposals, expertise-based matching and allocation workflows, built with Laravel, Blade, Tailwind, Alpine.js and MySQL.",
    categories: ["Web", "Backend", "Enterprise"], technologies: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js", "MySQL"], repos: [], fromProfile: true,
    verification: "reported", completeness: "minimal", pending: ["Repository link"],
  }),
];
