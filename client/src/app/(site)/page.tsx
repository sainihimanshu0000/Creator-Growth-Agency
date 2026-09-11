import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ApproachPillars } from "@/components/sections/ApproachPillars";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { Approach } from "@/components/sections/Approach";
import { ForBrands } from "@/components/sections/ForBrands";
import { Creators } from "@/components/sections/Creators";
import { Team } from "@/components/sections/Team";
import { Insights } from "@/components/sections/Insights";
import { Services } from "@/components/sections/Services";
import { Verticals } from "@/components/sections/Verticals";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ApproachPillars />
      <BrandsMarquee />
      <Approach />
      <ForBrands />
      <Creators />
      <Verticals />
      <Team />
      <Insights />
      <Services />
      <Contact />
    </>
  );
}
