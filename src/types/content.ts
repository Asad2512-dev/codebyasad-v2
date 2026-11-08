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

export type ProjectCategory = "Web" | "Mobile" | "SaaS" | "Backend" | "AI" | "Other";

export interface ArchitectureLayer {
  id: "frontend" | "api" | "services" | "database" | "infrastructure";
  name: string;
  items: string[];
  note: string;
  status: Verification;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  featured: boolean;
  categories: ProjectCategory[];
  /** Short accent label shown on the project stage. */
  index: string;
  problem: string;
  solution: string;
  role: string;
  technologies: { items: string[]; status: Verification };
  modules: string[];
  architecture: ArchitectureLayer[];
  decisions: string[];
  challenges: { title: string; detail: string }[];
  deployment: { text: string; status: Verification };
  security: string[];
  performance: string[];
  outcomes: { text: string; status: Verification }[];
  lessons: string[];
  links: { live?: string; repo?: string };
  screenshots: { src: string; alt: string }[];
  /** Content the owner must still confirm before launch. */
  pending: string[];
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
