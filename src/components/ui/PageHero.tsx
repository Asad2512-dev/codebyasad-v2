import { SectionHeader } from "./SectionHeader";

export function PageHero({ label, title, lead }: { label: string; title: string; lead?: string }) {
  return (
    <section className="grid-paper border-b hairline pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="container-x">
        <SectionHeader as="h1" label={label} title={title} lead={lead} />
      </div>
    </section>
  );
}
