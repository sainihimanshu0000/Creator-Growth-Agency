"use client";

import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Creators() {
  return (
    <section id="creators" className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="For Creators"
              title={siteConfig.creators.headline}
              description={siteConfig.creators.narrative}
            />
            <ul className="mt-8 space-y-3">
              {siteConfig.creators.bullets.map((bullet, i) => (
                <Reveal key={bullet} as="li" variant="left" delay={120 + i * 70}>
                  <div className="flex gap-3 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                    <span>{bullet}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {siteConfig.creators.features.map((feature, i) => (
              <Reveal key={feature.title} variant="up" delay={i * 100}>
                <div className="border-t border-line pt-5">
                  <h3 className="text-lg text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
