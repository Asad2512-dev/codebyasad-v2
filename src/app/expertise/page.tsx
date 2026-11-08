import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Expertise } from "@/components/sections/Expertise";
import { Systems } from "@/components/sections/Systems";

export const metadata = pageMetadata({ title: "Expertise", description: "Frontend, backend, mobile, databases, cloud infrastructure and AI research — the tools and where they were used.", path: "/expertise/" });

export default function ExpertisePage() {
  return (
    <>
      <PageHero label="Expertise" title="Depth across the whole stack." lead="Grouped by the job each tool does, with the projects where I used it." />
      <Expertise showHeader={false} />
      <Systems />
    </>
  );
}
