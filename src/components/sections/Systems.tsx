import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchitectureExplorer } from "@/components/projects/ArchitectureExplorer";

export function Systems() {
  // Flagships first (already ordered), then any other project with documented architecture.
  const ordered = projects.filter((p) => p.architecture?.length);
  return (
    <section aria-labelledby="systems-title" className="border-t hairline py-24 md:py-36">
      <div className="container-x">
        <SectionHeader index="05" label="The systems behind the products" title="Built beyond the interface."
          lead="Select a project and a layer. Every component listed was observed in the codebase; each layer says where, and whether it is implemented or planned." />
        <h3 id="systems-title" className="sr-only">Architecture explorer</h3>
        <div className="mt-14" data-reveal><ArchitectureExplorer projects={ordered} /></div>
      </div>
    </section>
  );
}
