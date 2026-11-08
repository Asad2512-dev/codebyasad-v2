import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchitectureExplorer } from "@/components/projects/ArchitectureExplorer";

export function Systems() {
  // Fully documented system first so visitors land on verified detail.
  const ordered = [...projects].sort((a, b) => (a.slug === "unisecure" ? -1 : b.slug === "unisecure" ? 1 : 0));
  return (
    <section aria-labelledby="systems-title" className="border-t hairline py-24 md:py-36">
      <div className="container-x">
        <SectionHeader index="05" label="The systems behind the products" title="Built beyond the interface."
          lead="Select a project and a layer. Details marked “pending confirmation” have not yet been verified and are not presented as fact." />
        <h3 id="systems-title" className="sr-only">Architecture explorer</h3>
        <div className="mt-14" data-reveal><ArchitectureExplorer projects={ordered} /></div>
      </div>
    </section>
  );
}
