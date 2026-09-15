"use client";

import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Services() {
  return (
    <section id="services" className="atmosphere border-y border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Specialized agency models"
          description="Three entry points into the same operating system—pick the frame that matches how your team buys."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {siteConfig.services.map((service, i) => (
            <Reveal key={service.slug} variant="up" delay={i * 100}>
              <Link
                href={`/services/${service.slug}`}
                className="motion-lift group flex h-full flex-col border border-line p-6 hover:border-accent/40"
              >
                <h3 className="text-xl text-ink group-hover:text-accent">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.line}
                </p>
                <span className="mt-6 text-sm font-medium text-accent">Explore page →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
