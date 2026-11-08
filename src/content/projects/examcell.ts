import type { Project } from "@/types/content";
import { evidence, profileSource } from "./_helpers";

/**
 * Source: GitHub profile README only. ExamCell's (private) repository is empty
 * (its docs/ARCHITECTURE.md says so), so no technical architecture is claimed here.
 */
export const examcell: Project = {
  slug: "examcell",
  name: "ExamCell",
  tagline: "AI-assisted examination management for universities.",
  summary:
    "An examination system with admin, teacher and student portals covering academic setup, exam planning, seating, invigilation, marks, results and analytics.",
  tier: "flagship",
  published: true,
  categories: ["Web", "AI", "Enterprise"],
  technologies: [],
  origin: "original",
  role: "Full-stack engineer.",
  highlight: "Three role-specific portals over one exam lifecycle — from academic setup to published results.",
  repos: ["examcell-private-1"],
  links: {},
  screenshots: [],
  problem:
    "University exam offices coordinate courses, rooms, seating, invigilators, marks and results across spreadsheets and email. Every exam season repeats the same manual, error-prone work.",
  solution:
    "ExamCell gives admins, teachers and students their own portals over one system — from academic setup and exam planning to seating plans, invigilation duties, marks entry, results and analytics.",
  modules: ["Academic setup", "Exam planning", "Seating plans", "Invigilation", "Marks entry", "Results", "Analytics"],
  architecture: [],
  decisions: ["Separate portals per role rather than one interface with hidden menus."],
  challenges: [{ title: "Seating and invigilation constraints", detail: "Rooms, capacities, clashes and staff availability all constrain what counts as a valid exam plan." }],
  outcomes: [],
  related: ["unisecure"],
  pending: ["Source code (repository is empty)", "Technology stack", "Which steps are AI-assisted", "Screenshots", "Deployment / demo link"],
  evidence: evidence([profileSource, { label: "Private repository (empty default branch)", kind: "repository" }], "reported", "minimal"),
};
