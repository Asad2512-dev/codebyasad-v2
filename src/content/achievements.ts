import type { Stat } from "@/types/content";

/**
 * Only "verified" or "reported" stats are rendered. Reported figures are labelled.
 * Evidence links point to the public inventory on GitHub.
 */
const inventory = { label: "Project inventory on GitHub", href: "https://github.com/Asad2512-dev#project-portfolio" };

export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years shipping production software", note: "Freelance since Oct 2022", status: "verified", evidence: { label: "Experience", href: "/experience/" } },
  { value: 11, label: "Published mobile apps", note: "Store links being compiled", status: "reported", evidence: inventory },
  { value: 13, label: "Web properties delivered", note: "Client, product and personal sites", status: "reported", evidence: inventory },
  { value: 1, suffix: "st", label: "Place, university app competition", note: "MNS University, 2025", status: "verified", evidence: { label: "Timeline", href: "/experience/" } },
];

/** Public web properties from the inventory — rendered on /work as an index. */
export const webProperties = [
  { name: "Total Cash Pro", focus: "Hospitality back-office", href: "https://totalcashpro.com" },
  { name: "MenuWave", focus: "Restaurant operations platform", href: "https://menuwave.com" },
  { name: "LabelBuddy", focus: "Shopify / EU energy labels", href: "https://labelbuddy.co.uk" },
  { name: "Zawaaral 3PL", focus: "Logistics and fulfilment", href: "https://zawaaral.com" },
  { name: "Pak Enterprises Tiles", focus: "Catalogue and tile calculator", href: "https://pakenterprisestiles.com" },
  { name: "Dr. Farhan Siddique", focus: "Academic profile", href: "https://drfarhansiddique.com" },
  { name: "Read Holy Quran", focus: "Quran reading", href: "https://readholyquran.online" },
  { name: "Tangled Synapses", focus: "Brand website + 3 verticals", href: "https://tangledsynapses.com" },
] as const;

export const mobileApps = [
  "GoBirr", "GoBirr Provider", "Beyond Today", "Lite Nurse Clinic", "Blueprint Health & Fitness",
  "SmartPrepX", "Online Barber", "Smart Cubz", "Urdu Poetry", "Top Coaches", "QuickSaver",
] as const;
