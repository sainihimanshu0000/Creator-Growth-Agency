"use client";

import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const icons = [
  <svg key="s" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="e" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="r" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M4 19V5h4v14H4zm6 0V9h4v10h-4zm6 0v-6h4v6h-4z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export function ApproachPillars() {
  return (
    <section className="atmosphere py-20 lg:py-24" aria-labelledby="pillars-heading">
      <Container>
        <SectionHeading
          id="pillars-heading"
          eyebrow="Value"
          title="Strategy. Execution. Reporting."
          description="One operating system for creator-led growth—clear ownership at every stage."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {siteConfig.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} variant="up" delay={i * 100}>
              <div className="border-t border-line pt-6">
                <div className="text-accent">{icons[i]}</div>
                <h3 className="mt-5 text-xl text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
