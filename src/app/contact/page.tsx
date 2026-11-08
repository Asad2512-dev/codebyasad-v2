import { pageMetadata } from "@/lib/seo";
import { Contact } from "@/components/sections/Contact";

export const metadata = pageMetadata({ title: "Contact", description: "Contact Muhammad Asad Ullah about Senior Full-Stack, Product Engineering and Backend roles.", path: "/contact/" });

export default function ContactPage() {
  return <div className="pt-16"><Contact as="h1" /></div>;
}
