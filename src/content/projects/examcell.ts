import type { Project } from "@/types/content";

export const examcell: Project = {
  slug: "examcell",
  name: "ExamCell",
  tagline: "AI-assisted examination management for universities.",
  year: "2026",
  featured: true,
  index: "03",
  categories: ["Web", "AI", "Backend"],
  problem:
    "University exam offices coordinate courses, rooms, seating, invigilators, marks and results across spreadsheets and email. Each exam season repeats the same manual, error-prone work.",
  solution:
    "ExamCell gives admins, teachers and students their own portals over one system — from academic setup and exam planning to seating, invigilation, marks, results and analytics.",
  role: "Full-stack engineer — system design, backend and portals.",
  technologies: { items: [], status: "pending" },
  modules: ["Academic setup", "Exam planning", "Seating plans", "Invigilation", "Marks entry", "Results", "Analytics"],
  architecture: [
    { id: "frontend", name: "Portals", items: ["Admin portal", "Teacher portal", "Student portal"], note: "Three portals, each scoped to its role.", status: "verified" },
    { id: "api", name: "API", items: ["Role-checked endpoints"], note: "Details pending confirmation.", status: "pending" },
    { id: "services", name: "Services", items: ["Planning", "Seating", "Invigilation", "Results", "AI assistance"], note: "Which steps are AI-assisted is pending confirmation.", status: "pending" },
    { id: "database", name: "Data", items: ["Courses, rooms, students, marks"], note: "Details pending confirmation.", status: "pending" },
    { id: "infrastructure", name: "Infrastructure", items: [], note: "Pending confirmation.", status: "pending" },
  ],
  decisions: ["Separate portals per role rather than one interface with hidden menus."],
  challenges: [
    { title: "Seating and invigilation constraints", detail: "Rooms, capacities, clashes and staff availability all constrain a valid exam plan." },
  ],
  deployment: { text: "Pending confirmation.", status: "pending" },
  security: ["Role-based portals for admin, teacher and student"],
  performance: [],
  outcomes: [],
  lessons: [],
  links: {},
  screenshots: [],
  pending: ["Technology stack", "Exact AI-assisted features", "Deployment", "Screenshots", "Outcomes", "Live/demo link"],
};
