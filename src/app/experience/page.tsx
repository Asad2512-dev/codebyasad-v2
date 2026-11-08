import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({ title: "Experience", description: "Senior Full-Stack Engineer & Senior Product Designer at Buildexa Technologies; previously The Code Kraft, Cyphersol Technologies and as a freelance software engineer, plus awards and education.", path: "/experience/" });

export default function ExperiencePage() {
  return (
    <>
      <PageHero label="Experience" title="Roles, teams and milestones." lead="Currently Senior Full-Stack Engineer & Senior Product Designer at Buildexa Technologies — after Flutter and full-stack roles at The Code Kraft and Cyphersol, and freelance work since October 2022." />
      <Timeline showHeader={false} detailed />
      <div className="container-x pb-24"><Button href="/resume/" variant="secondary" icon={false}>Full resume</Button></div>
    </>
  );
}
