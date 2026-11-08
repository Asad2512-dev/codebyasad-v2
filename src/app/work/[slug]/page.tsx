import { notFound } from "next/navigation";
import { projects, getProject, nextProject, relatedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { CaseStudy } from "@/components/projects/CaseStudy";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} — Case study`, description: `${p.tagline} ${p.summary}`.slice(0, 158), path: `/work/${p.slug}/` });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.tagline,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/work/${p.slug}/`,
    keywords: [...p.technologies, ...p.categories].join(", "),
    ...(p.links.live ? { sameAs: p.links.live } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <CaseStudy project={p} next={nextProject(p.slug)} related={relatedProjects(p)} />
    </>
  );
}
