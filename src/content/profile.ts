import type { Link } from "@/types/content";

export const profile = {
  name: "Muhammad Asad Ullah",
  role: "Full-Stack Engineer / Product Engineer",
  location: "Multan, Pakistan",
  timezone: "PKT (UTC+5)",
  email: "masadullah1206@gmail.com",
  // PENDING VERIFICATION: confirm remote / relocation preference before showing.
  availability: "Open to full-time remote roles",
  experienceYears: 3,

  hero: {
    label: "Full-Stack Engineer / Product Engineer",
    headline: ["I engineer", "ideas into", "products."],
    support:
      "Full-Stack Software Engineer building scalable digital products, intelligent systems, and production-ready web and mobile experiences.",
    ctas: {
      primary: { label: "Explore My Work", href: "/work/" },
      secondary: { label: "View Resume", href: "/resume/" },
      tertiary: { label: "Let's Talk", href: "/contact/" },
    },
  },

  identity: {
    headline: "From architecture to production.",
    intro:
      "I take products from a page of requirements to software people rely on — and I stay for what comes after launch. Most of my work is end-to-end: the data model, the API, the interface, the mobile client and the server it all runs on.",
    pipeline: [
      { step: "Requirements", text: "Turn business needs into roles, workflows and a scope that can ship." },
      { step: "Architecture", text: "Model data, boundaries and permissions before writing features." },
      { step: "Backend", text: "REST APIs, authentication and RBAC in Laravel or Node.js/Express." },
      { step: "Frontend", text: "Responsive interfaces in React, Next.js, Blade and Tailwind." },
      { step: "Mobile", text: "Cross-platform Flutter apps for Android and iOS, published to stores." },
      { step: "Data", text: "Relational schemas in MySQL and PostgreSQL; MongoDB and Firebase where they fit." },
      { step: "Deployment", text: "Linux servers, Nginx, Docker and AWS EC2/S3; release processes." },
      { step: "Maintenance", text: "Debugging, monitoring and iterating on software in production." },
    ],
  },

  about: {
    paragraphs: [
      "I'm Muhammad Asad Ullah, a Full-Stack Software Engineer from Multan, Pakistan. I build complete web and cross-platform mobile products — frontend interfaces, backend services, REST APIs, databases, authentication, deployment and ongoing production maintenance.",
      "I enjoy turning practical requirements into maintainable software: responsive web platforms, Flutter applications, multi-role business systems and research implementations. Since 2022 I have freelanced for clients while working with product teams at Cyphersol Technologies and The Code Kraft.",
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
    text: "I'm interested in Senior Full-Stack, Product Engineering and Backend roles with teams that ship. The fastest way to reach me is email.",
  },

  socials: [
    { label: "GitHub", href: "https://github.com/Asad2512-dev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/asadullah2512" },
    { label: "Email", href: "mailto:masadullah1206@gmail.com" },
  ] satisfies Link[],
} as const;
