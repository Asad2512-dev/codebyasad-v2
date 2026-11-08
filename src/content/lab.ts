import type { LabItem } from "@/types/content";

export const lab: LabItem[] = [
  { title: "RCR-DeepFake", kind: "Research", summary: "Cross-generator deepfake video detection using spatial–frequency–temporal camera-residual consistency.", stack: ["Python", "PyTorch", "Computer vision"] },
  { title: "FreqKAN / FreqKANPP", kind: "Research", summary: "Frequency-domain feature processing with KAN / ConvKAN architectures for image classification.", stack: ["Python", "PyTorch", "KAN", "ConvKAN"] },
  { title: "Smart Log Analyzer", kind: "Experiment", summary: "A streaming CLI that analyses server logs of any size line by line with Node.js streams.", stack: ["Node.js", "TypeScript"], repo: "https://github.com/Asad2512-dev/smart-log-analyzer" },
  { title: "AutoCategory AI Platform", kind: "Experiment", summary: "Laravel API plus a FastAPI microservice serving a scikit-learn model for product categorisation.", stack: ["Laravel", "FastAPI", "scikit-learn"], repo: "https://github.com/Asad2512-dev/autocategory-ai-platform" },
  { title: "EIVA", kind: "Research", summary: "Evidence-Invariant Video Authentication — does redundant evidence distort video-level confidence, and can correlation-aware aggregation fix it?", stack: ["Python", "PyTorch"] },
  { title: "Library API (NestJS)", kind: "Open source", summary: "A library-management REST API built to explore NestJS.", stack: ["NestJS", "TypeScript"], repo: "https://github.com/Asad2512-dev/library-api-nestjs" },
  { title: "Google DSA Prep", kind: "Open source", summary: "Daily data-structures and algorithms practice in Python.", stack: ["Python"], repo: "https://github.com/Asad2512-dev/google-dsa-prep" },
  { title: "Campus Ride", kind: "Academic", summary: "Flutter / Firebase campus ride-sharing concept.", stack: ["Flutter", "Firebase"] },
];

/** Curated public repositories (static — no client-side GitHub API calls). */
export const repositories = [
  { name: "unisecure", desc: "Laravel 13 + Flutter campus attendance and gate security.", href: "https://github.com/Asad2512-dev/unisecure", lang: "PHP · Dart" },
  { name: "ClubSync", desc: "React / Express / MySQL sports club management.", href: "https://github.com/Asad2512-dev/ClubSync", lang: "JavaScript" },
  { name: "library-api-nestjs", desc: "REST API exploration with NestJS.", href: "https://github.com/Asad2512-dev/library-api-nestjs", lang: "TypeScript" },
  { name: "smart-log-analyzer", desc: "Streaming log-analysis CLI built on Node.js streams.", href: "https://github.com/Asad2512-dev/smart-log-analyzer", lang: "TypeScript" },
  { name: "codebyasad-v2", desc: "This portfolio — Next.js, GSAP, React Three Fiber.", href: "https://github.com/Asad2512-dev/codebyasad-v2", lang: "TypeScript" },
] as const;
