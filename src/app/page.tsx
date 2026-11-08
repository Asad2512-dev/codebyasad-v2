import { Hero } from "@/components/sections/Hero";
import { Identity } from "@/components/sections/Identity";
import { Stats } from "@/components/sections/Stats";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Systems } from "@/components/sections/Systems";
import { Expertise } from "@/components/sections/Expertise";
import { Timeline } from "@/components/sections/Timeline";
import { Philosophy } from "@/components/sections/Philosophy";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Identity />
      <Stats />
      <SelectedWork />
      <Systems />
      <Expertise />
      <Timeline />
      <Philosophy />
      <OpenSource />
      <Contact />
    </>
  );
}
