"use client";

import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function BrandsMarquee() {
  const logos = [...siteConfig.brands, ...siteConfig.brands];

  return (
    <section id="brands" className="border-y border-line py-14 lg:py-16" aria-label="Brands we work with">
      <Container>
        <Reveal variant="fade">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
            Brands We Work With
          </p>
        </Reveal>
      </Container>

      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-24" />

        <div className="animate-marquee flex w-max gap-12 px-6">
          {logos.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-xl tracking-tight text-ink-subtle grayscale transition duration-300 hover:text-ink hover:grayscale-0 sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
