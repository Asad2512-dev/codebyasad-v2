import { pageMetadata } from "@/lib/seo";
import { Contact } from "@/components/sections/Contact";

export const metadata = pageMetadata({ title: "Contact", description: "Contact Muhammad Asad Ullah — Senior Full-Stack Engineer & Senior Product Designer at Buildexa Technologies.", path: "/contact/" });

export default function ContactPage() {
  return <div className="pt-16"><Contact as="h1" /></div>;
}
