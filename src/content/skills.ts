import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  { id: "frontend", title: "Frontend Engineering", summary: "Responsive, accessible interfaces for multi-role products.", skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Laravel Blade", "Alpine.js", "Vite"], usedIn: ["ClubSync", "Voice Library", "UniSecure admin"] },
  { id: "backend", title: "Backend Engineering", summary: "APIs, authentication, RBAC and business logic.", skills: ["Node.js", "Express.js", "Laravel", "PHP", "REST APIs", "JWT / OAuth2", "RBAC", "Sequelize", "Eloquent"], usedIn: ["UniSecure", "ClubSync", "Electronic Voting Machine"] },
  { id: "mobile", title: "Mobile Engineering", summary: "Cross-platform apps shipped to Android and iOS.", skills: ["Flutter", "Dart", "GetX", "Provider", "Firebase", "Push notifications", "Flutter Web"], usedIn: ["11 published apps", "UniSecure app", "Cyphersol products"] },
  { id: "data", title: "Databases", summary: "Relational modelling first, document stores where they fit.", skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firestore", "Firebase RTDB"], usedIn: ["UniSecure", "ClubSync", "EVM"] },
  { id: "infra", title: "Cloud & Infrastructure", summary: "Getting software onto servers and keeping it there.", skills: ["Linux", "Nginx", "Docker", "AWS EC2", "AWS S3", "Git / GitHub", "CI/CD"], usedIn: ["Client deployments", "Production maintenance"] },
  { id: "ai", title: "AI & Research", summary: "Computer-vision research in frequency-domain learning.", skills: ["Python", "PyTorch", "CNNs", "Computer vision", "Frequency-domain analysis", "KAN / ConvKAN"], usedIn: ["RCR-DeepFake", "FreqKAN"] },
];
