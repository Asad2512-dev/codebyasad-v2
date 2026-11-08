import type { Role } from "@/types/content";

/** Source: Asad's GitHub profile README (github.com/Asad2512-dev). Newest first. */
export const experience: Role[] = [
  {
    id: "codekraft",
    title: "Senior Flutter Developer",
    org: "The Code Kraft",
    location: "Remote",
    start: "2025-12",
    end: "2026-10",
    kind: "work",
    summary: "Flutter web and mobile experiences built on Clean Architecture.",
    points: [
      "Developed and maintained Flutter web and mobile experiences with Dart, GetX and Clean Architecture principles.",
      "Built reusable UI components and integrated REST APIs and Firebase-backed services.",
      "Contributed to authentication, content delivery, notifications, debugging and production maintenance.",
    ],
  },
  {
    id: "award-2025",
    title: "First Place — Library App Development Competition",
    org: "MNS University",
    location: "Multan, Pakistan",
    start: "2025",
    end: "2025",
    kind: "award",
    summary: "First place in the MNS University Library App Development Competition.",
    points: [],
  },
  {
    id: "cyphersol",
    title: "Flutter & Full-Stack Developer",
    org: "Cyphersol Technologies",
    location: "Multan, Pakistan",
    start: "2023-06",
    end: "2026-01",
    kind: "work",
    summary: "Six production mobile applications for Android and iOS.",
    points: [
      "Worked across six production mobile applications for Android and iOS.",
      "Integrated REST APIs, Firebase, authentication and push notifications.",
      "Contributed to real-time workflows, stability improvements, architecture refactoring and release processes.",
    ],
    reported: [
      "25% improvement in application stability (self-reported)",
      "30% reduction in feature development time (self-reported)",
    ],
  },
  {
    id: "freelance",
    title: "Freelance Software Engineer",
    org: "Self-employed",
    location: "Remote",
    start: "2022-10",
    end: "present",
    kind: "work",
    summary: "End-to-end web and mobile delivery for clients and own products.",
    points: [
      "Delivered web and mobile projects using React, Next.js, Laravel, Node.js, PHP and Flutter.",
      "Built APIs, database integrations, authentication, dashboards and third-party integrations.",
      "Supported deployment, server configuration, bug fixing and ongoing maintenance.",
    ],
  },
  {
    id: "numl",
    title: "BS Computer Science",
    org: "National University of Modern Languages (NUML)",
    location: "Multan, Pakistan",
    start: "2022",
    end: "2026",
    kind: "education",
    summary: "Bachelor of Science in Computer Science.",
    points: [],
  },
];

export function formatPeriod(r: Role): string {
  const fmt = (s: string) => {
    if (s === "present") return "Present";
    const [y, m] = s.split("-");
    if (!m) return y;
    return new Date(Number(y), Number(m) - 1).toLocaleString("en-US", { month: "short", year: "numeric" });
  };
  return r.start === r.end ? fmt(r.start) : `${fmt(r.start)} — ${fmt(r.end)}`;
}
