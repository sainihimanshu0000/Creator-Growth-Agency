"use client";

import dynamic from "next/dynamic";
import { AnimatedText } from "@/components/cinematic/AnimatedText";
import { ScrollReveal } from "@/components/cinematic/ScrollReveal";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";

const FeatureGeometry = dynamic(
  () => import("@/components/cinematic/FeatureGeometry").then((m) => m.FeatureGeometry),
  { ssr: false, loading: () => <div className="aspect-square w-full bg-canvas-elevated" /> }
);

type Feature = {
  title: string;
  description: string;
};

type FeatureSectionProps = {
  id?: string;
  eyebrow?: string;
  headline: string;
  description?: string;
  features: readonly Feature[];
};

export function FeatureSection({
  id = "features",
  eyebrow = "System",
  headline,
  description,
  features,
}: FeatureSectionProps) {
  return (
    <section id={id} className="relative overflow-hidden py-24 lg:py-32">
      <TechnicalGrid variant="full" className="opacity-40" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            {eyebrow}
          </p>
          <AnimatedText
            as="h2"
            text={headline}
            mode="blur"
            className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl"
          />
          {description ? (
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">{description}</p>
          ) : null}

          <div className="mt-12 space-y-8">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08} y={28}>
                <div className="border-t border-line pt-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl text-ink">{f.title}</h3>
                  </div>
                  <p className="mt-2 pl-10 text-sm leading-relaxed text-ink-muted">
                    {f.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal
          scale={0.92}
          y={0}
          className="relative mx-auto aspect-square w-full max-h-[280px] max-w-[280px] sm:max-h-[360px] sm:max-w-[360px] lg:max-h-none lg:max-w-none"
        >
          <div className="absolute inset-0 border border-line bg-canvas-elevated/50">
            <FeatureGeometry />
            <TechnicalGrid variant="scan" showCoords className="opacity-50" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
