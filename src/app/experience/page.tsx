import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({ title: "Experience", description: "Roles at The Code Kraft, Cyphersol Technologies and as a freelance software engineer, plus education and awards.", path: "/experience/" });

export default function ExperiencePage() {
  return (
    <>
      <PageHero label="Experience" title="Roles, teams and milestones." lead="Freelancing since October 2022 alongside product teams — Flutter, full-stack web and the infrastructure underneath." />
      <Timeline showHeader={false} detailed />
      <div className="container-x pb-24"><Button href="/resume/" variant="secondary" icon={false}>Full resume</Button></div>
    </>
  );
}
