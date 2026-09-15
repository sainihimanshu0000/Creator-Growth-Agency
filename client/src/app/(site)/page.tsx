import { Hero } from "@/components/cinematic/Hero";
import { StatsStrip } from "@/components/cinematic/StatsStrip";
import { PinnedStory } from "@/components/cinematic/PinnedStory";
import { FeatureSection } from "@/components/cinematic/FeatureSection";
import { HorizontalScroller } from "@/components/cinematic/HorizontalScroller";
import { ImageScaleStory } from "@/components/cinematic/ImageScaleStory";
import { CTASection } from "@/components/cinematic/CTASection";
import { Contact } from "@/components/sections/Contact";
import { Team } from "@/components/sections/Team";
import { siteConfig } from "@/config/siteConfig";

export default function HomePage() {
  return (
    <>
      <Hero />

      <StatsStrip />

      <PinnedStory
        id="story"
        eyebrow="Approach"
        headline={siteConfig.approach.headline}
        panels={siteConfig.approach.steps.map((step, i) => ({
          index: step.number,
          title: step.title,
          body: step.description,
          image: siteConfig.frameImages.story[i],
        }))}
      />

      <FeatureSection
        id="features"
        eyebrow="Operating system"
        headline="Strategy. Execution. Reporting."
        description="One coordinated system for creator-led growth—clear ownership at every stage."
        features={siteConfig.pillars}
      />

      <HorizontalScroller
        id="verticals"
        eyebrow="Verticals"
        headline="Specialists where category language matters"
        panels={siteConfig.verticals.map((v, i) => ({
          index: String(i + 1).padStart(2, "0"),
          title: v,
          meta: "SECTOR NODE",
          image: siteConfig.frameImages.sectors[i],
          description:
            {
              Gaming: "Launch, live-ops, and community-led acquisition for titles and platforms.",
              Esports: "Team, tournament, and talent partnerships built for competitive audiences.",
              "Crypto & Trading":
                "Compliant creator systems for education, product, and brand trust.",
              Sports: "Athlete, fan, and apparel campaigns with clear commercial outcomes.",
              Fintech: "App installs, activation, and trust-building through qualified creator reach.",
            }[v] ?? "Category-led creator growth with commercial clarity.",
        }))}
      />

      <ImageScaleStory
        id="brands"
        eyebrow="For brand teams"
        headline={siteConfig.forBrands.headline}
        panels={siteConfig.forBrands.points.slice(0, 4).map((point, i) => ({
          label: String(i + 1).padStart(2, "0"),
          title: point.title,
          body: point.description,
          image: siteConfig.frameImages.brands[i],
        }))}
      />

      <Team />

      <CTASection
        eyebrow="Next signal"
        headline="Ready to install a growth operating model?"
        description="Book a strategy call. We route every inquiry to the right vertical specialist."
        primaryLabel={siteConfig.ctas.primary}
        primaryHref="/#contact"
        secondaryLabel={siteConfig.ctas.secondaryServices}
        secondaryHref="/#services"
      />

      <div id="services" className="sr-only" aria-hidden />
      <Contact />
    </>
  );
}
