"use client";

import { Button } from "@/components/ui/Button";
import { AnimatedText } from "@/components/cinematic/AnimatedText";
import { ScrollReveal } from "@/components/cinematic/ScrollReveal";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";

type CTASectionProps = {
  id?: string;
  eyebrow?: string;
  headline: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  id = "cta",
  eyebrow = "Engage",
  headline,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section id={id} className="relative overflow-hidden border-y border-line py-20 sm:py-28 lg:py-36">
      <TechnicalGrid variant="scan" className="opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,245,66,0.1), transparent 65%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          {eyebrow}
        </p>
        <AnimatedText
          as="h2"
          text={headline}
          mode="words"
          className="font-display text-3xl leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl"
        />
        {description ? (
          <ScrollReveal>
            <p className="mx-auto mt-6 max-w-xl text-base text-ink-muted">{description}</p>
          </ScrollReveal>
        ) : null}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primaryHref}>{primaryLabel}</Button>
            {secondaryLabel && secondaryHref ? (
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
