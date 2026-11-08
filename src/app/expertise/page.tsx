import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Expertise } from "@/components/sections/Expertise";
import { Systems } from "@/components/sections/Systems";

export const metadata = pageMetadata({ title: "Expertise", description: "Product design, UX/UI and design systems, plus frontend, backend, mobile, databases, cloud infrastructure and AI research — the tools and where they were used.", path: "/expertise/" });

export default function ExpertisePage() {
  return (
    <>
      <PageHero label="Expertise" title="Design × Engineering." lead="Product design and full-stack engineering — the experience people use and the systems behind it." />
      <Expertise showHeader={false} />
      <Systems />
    </>
  );
}
