/** "verified" = backed by a public source we audited. "reported" = stated by Asad
 *  in his profile/CV but not independently evidenced. "pending" = missing; never
 *  rendered as a fact. */
export type Verification = "verified" | "reported" | "pending";

export interface Link { label: string; href: string; }

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  note?: string;
  evidence?: Link;
  status: Verification;
}

export interface Role {
  id: string;
  title: string;
  org: string;
  location: string;
  start: string; // "2023-06"
  end: string | "present";
  summary: string;
  points: string[];
  /** Figures that are self-reported, shown with a "reported" tag. */
  reported?: string[];
  kind: "work" | "education" | "award";
}

/** Catalogue categories. A project may belong to several. */
export type ProjectCategory = "SaaS" | "Web" | "Mobile" | "Backend" | "AI" | "Enterprise" | "Research" | "Tools";

/** Only statuses supported by evidence are assigned; otherwise the field is omitted. */
export type ProjectStatus = "Live" | "Completed" | "In Development" | "Research" | "Archived";

/** How the codebase originated — keeps authorship claims honest. */
export type ProjectOrigin =
  | "original" // built by Asad
  | "customised" // launched on a licensed/third-party commercial base, customised and rebranded
  | "academic" // university / competition work
  | "research";

/** Implementation state of an architecture component. */
export type ImplementationState = "implemented" | "planned" | "experimental" | "unverified";

export interface EvidenceSource {
  label: string;
  href?: string;
  kind: "repository" | "architecture-doc" | "source-code" | "manifest" | "live-site" | "profile";
}

export interface Evidence {
  sources: EvidenceSource[];
  /** Strongest support for the project's core claims. */
  verification: Verification;
  /** ISO date the evidence was last reviewed. */
  lastReviewed: string;
  /** How much of a full case study the evidence supports. */
  completeness: "full" | "partial" | "minimal";
}

export interface ArchitectureLayer {
  id: "frontend" | "api" | "services" | "database" | "infrastructure";
  name: string;
  items: string[];
  note: string;
  status: Verification;
  state?: ImplementationState;
  /** Where in the codebase this was observed. */
  evidence?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** 1–3 sentence description used by cards and search. */
  summary: string;
  tier: "flagship" | "featured" | "catalog";
  /** Set false to hide a project everywhere without deleting its data. */
  published: boolean;
  categories: ProjectCategory[];
  technologies: string[];
  status?: ProjectStatus;
  origin: ProjectOrigin;
  role?: string;
  /** One concrete, evidence-backed technical highlight. */
  highlight?: string;
  year?: string;
  /** GitHub repository names (owner Asad2512-dev) that make up this project. */
  repos: string[];
  links: { live?: string; repo?: string };
  screenshots: { src: string; alt: string }[];
  evidence: Evidence;
  /** Content to confirm before it can be shown (internal; never rendered as fact). */
  pending: string[];
  related?: string[];

  // ---- Optional case-study depth (rendered only when present) ----
  problem?: string;
  solution?: string;
  modules?: string[];
  stats?: { label: string; value: string }[];
  architecture?: ArchitectureLayer[];
  decisions?: string[];
  challenges?: { title: string; detail: string }[];
  deployment?: string;
  security?: string[];
  performance?: string[];
  outcomes?: { text: string; status: Verification }[];
  lessons?: string[];
}

export interface RepositoryRecord {
  name: string;
  defaultBranch: string;
  visibility: "public" | "private";
  architectureDoc: "substantive" | "stub" | "empty-repo";
  technologies: string[];
  /** Project slug, or a classification for repositories that are not portfolio projects. */
  project: string | null;
  classification: "project" | "learning" | "fork" | "third-party" | "assessment" | "starter" | "profile" | "unpublished";
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  skills: string[];
  usedIn: string[];
}

export interface LabItem {
  title: string;
  kind: "Research" | "Experiment" | "Academic" | "Open source";
  summary: string;
  stack: string[];
  repo?: string;
}
