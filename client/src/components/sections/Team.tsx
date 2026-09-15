"use client";

import { siteConfig } from "@/config/siteConfig";
import { ScrollReveal } from "@/components/cinematic/ScrollReveal";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";
import { AnimatedText } from "@/components/cinematic/AnimatedText";

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden border-y border-line py-24 lg:py-32">
      <TechnicalGrid variant="sparse" className="opacity-35" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Leadership
        </p>
        <AnimatedText
          as="h2"
          text="Operators, not intermediaries"
          mode="words"
          className="max-w-2xl font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl"
        />
        <p className="mt-4 max-w-xl text-base text-ink-muted">
          A leadership bench that owns strategy, network quality, and performance systems.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.team.map((person, i) => (
            <ScrollReveal key={person.name} delay={i * 0.08} y={36}>
              <article className="group relative border border-line bg-canvas/40 p-5 transition-colors hover:border-accent/35">
                <TechnicalGrid variant="sparse" showCoords={false} animate={false} className="opacity-20" />
                <div className="relative flex h-24 w-24 items-center justify-center bg-accent-dim font-display text-2xl text-accent transition-all duration-500 group-hover:scale-105 group-hover:bg-accent group-hover:text-[#0c0e0c]">
                  {person.initials}
                </div>
                <p className="relative mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {person.role}
                </p>
                <h3 className="relative mt-2 text-lg text-ink">{person.name}</h3>
                <p className="relative text-sm text-ink-muted">{person.title}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-subtle">{person.bio}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
