"use client";

import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Services() {
  return (
    <section id="services" className="atmosphere border-y border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="For Brands"
          title={siteConfig.forBrands.headline}
          description={siteConfig.forBrands.subcopy}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {siteConfig.forBrands.points.map((point, i) => (
            <Reveal key={point.title} variant="up" delay={i * 100}>
              <article className="motion-lift group flex h-full flex-col border border-line p-6 hover:border-accent/40">
                <h3 className="text-xl text-ink group-hover:text-accent">{point.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {point.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
