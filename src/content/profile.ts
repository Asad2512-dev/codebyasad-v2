import type { Link } from "@/types/content";

export const profile = {
  name: "Muhammad Asad Ullah",
  role: "Senior Full-Stack Engineer & Senior Product Designer",
  currentCompany: "Buildexa Technologies",
  location: "Multan, Pakistan",
  timezone: "PKT (UTC+5)",
  email: "masadullah1206@gmail.com",
  // PENDING VERIFICATION: confirm remote / relocation preference before showing.
  availability: "Open to full-time remote roles",
  experienceYears: 3,

  hero: {
    label: "Design × Engineering",
    headline: ["I design", "the experience.", "I engineer", "the product."],
    /** Index of the headline line set in the accent colour. */
    accentLine: 3,
    support:
      "Senior Full-Stack Engineer & Senior Product Designer at Buildexa Technologies, creating thoughtfully designed, scalable digital products from concept to production.",
    ctas: {
      primary: { label: "Explore My Work", href: "/work/" },
      secondary: { label: "View Resume", href: "/resume/" },
      tertiary: { label: "Let's Talk", href: "/contact/" },
    },
  },

  identity: {
    label: "Design × Engineering",
    headline: "From first idea to production.",
    intro:
      "I work on both sides of a product: the experience people see and the systems that make it work. Designing the journey and building the architecture together means fewer hand-offs, and decisions that hold up in production.",
    pipeline: [
      { step: "Discover", discipline: "design", text: "Understand the users, the business and the problem worth solving." },
      { step: "Design", discipline: "design", text: "User journeys, interaction design and interfaces built on a consistent design system." },
      { step: "Architect", discipline: "engineering", text: "Data model, boundaries, permissions and APIs planned before features." },
      { step: "Build", discipline: "engineering", text: "Full-stack implementation — Laravel or Node.js backends, React/Next.js and Flutter clients." },
      { step: "Deploy", discipline: "engineering", text: "Linux servers, Nginx, Docker and cloud; release processes for web and app stores." },
      { step: "Improve", discipline: "design", text: "Observe real usage, fix what hurts and refine the experience." },
    ],
  },

  about: {
    paragraphs: [
      "I'm Muhammad Asad Ullah, a Senior Full-Stack Engineer and Senior Product Designer at Buildexa Technologies, based in Multan, Pakistan and working remotely. I design product experiences and engineer the systems behind them — from user journeys and interfaces to APIs, databases, deployment and ongoing production maintenance.",
      "I enjoy turning practical requirements into maintainable software: responsive web platforms, Flutter applications, multi-role business systems and research implementations. Before Buildexa I worked with product teams at Cyphersol Technologies and The Code Kraft, alongside freelance work since 2022.",
      "Outside product work I explore computer vision and deep learning, particularly frequency-domain methods and deepfake detection.",
    ],
  },

  philosophy: {
    headline: "Good engineering is invisible until it matters.",
    principles: [
      { title: "Maintainability", text: "Code is read far more than it is written. Clear boundaries and boring conventions let the next engineer move fast — including future me." },
      { title: "Performance", text: "Speed is a feature users feel before they can name it. Measure first, then remove work rather than add caching." },
      { title: "Reliability", text: "A system is only as good as its worst Tuesday. Validation, idempotent jobs and audit trails beat heroics." },
      { title: "Scalability", text: "Design for the next order of magnitude, build for today. Multi-tenancy and roles are cheaper on day one than day ninety." },
      { title: "Product thinking", text: "Understand the restaurant, the exam office or the security gate before the database. The best feature is often the one you don't build." },
      { title: "Ownership", text: "From the first schema to the 2 a.m. fix — I own outcomes, not tickets." },
      { title: "User experience", text: "Every role in a system deserves an interface designed for its job, on the device it actually uses." },
    ],
  },

  contact: {
    headline: "Let's build something that matters.",
    text: "I'm a Senior Full-Stack Engineer & Senior Product Designer at Buildexa Technologies. For collaborations and conversations about product design, full-stack engineering or product engineering, email is the fastest way to reach me.",
  },

  socials: [
    { label: "GitHub", href: "https://github.com/Asad2512-dev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/asadullah2512" },
    { label: "Email", href: "mailto:masadullah1206@gmail.com" },
  ] satisfies Link[],
} as const;
