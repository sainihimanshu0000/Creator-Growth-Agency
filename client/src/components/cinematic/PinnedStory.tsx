"use client";

import { useEffect, useRef } from "react";
import { AnimatedText } from "@/components/cinematic/AnimatedText";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

export type StoryPanel = {
  index: string;
  title: string;
  body: string;
  accent?: string;
  gradient?: string;
  image?: string;
};

type PinnedStoryProps = {
  id?: string;
  eyebrow?: string;
  headline: string;
  panels: StoryPanel[];
};

export function PinnedStory({
  id = "story",
  eyebrow = "Operating model",
  headline,
  panels,
}: PinnedStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const frames = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-frame]"));
      const texts = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-copy]"));
      const media = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-media]"));

      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(texts, { autoAlpha: 0, y: 40 });
      gsap.set(media, { scale: 0.55, borderRadius: 28 });
      gsap.set(frames[0], { autoAlpha: 1 });
      gsap.set(texts[0], { autoAlpha: 1, y: 0 });
      gsap.set(media[0], { scale: 1, borderRadius: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${panels.length * 120}%`,
          pin: pin,
          scrub: 1.25,
          anticipatePin: 1,
        },
      });

      panels.forEach((_, i) => {
        if (i === 0) return;
        const prev = i - 1;
        tl.to(texts[prev], { autoAlpha: 0, y: -30, duration: 0.35 }, i);
        tl.to(
          media[prev],
          { scale: 1.08, autoAlpha: 0, duration: 0.45, ease: "power2.inOut" },
          i
        );
        tl.to(frames[prev], { autoAlpha: 0, duration: 0.2 }, i);
        tl.to(frames[i], { autoAlpha: 1, duration: 0.2 }, i + 0.05);
        tl.fromTo(
          media[i],
          { scale: 0.48, borderRadius: 32, autoAlpha: 1, xPercent: 18 },
          { scale: 1, borderRadius: 0, xPercent: 0, duration: 0.7, ease: "power3.out" },
          i + 0.05
        );
        tl.to(texts[i], { autoAlpha: 1, y: 0, duration: 0.45 }, i + 0.2);
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [panels, reduced]);

  return (
    <section ref={sectionRef} id={id} className="relative bg-canvas">
      {/* Desktop cinematic pin */}
      <div ref={pinRef} className="relative hidden h-[100svh] items-center overflow-hidden md:flex">
        <TechnicalGrid variant="sparse" className="opacity-50" />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="relative min-h-[220px]">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              {eyebrow}
            </p>
            <AnimatedText
              as="h2"
              text={headline}
              mode="words"
              className="max-w-xl font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
            />

            <div className="relative mt-10 min-h-[160px]">
              {panels.map((panel) => (
                <div key={panel.index} data-copy className="absolute inset-x-0 top-0">
                  <p className="font-mono text-sm text-accent">{panel.index}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{panel.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                    {panel.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden">
            {panels.map((panel, i) => (
              <div key={panel.index} data-frame className="absolute inset-0">
                <div
                  data-media
                  className="absolute inset-0 overflow-hidden will-change-transform"
                  style={{
                    backgroundImage: panel.image
                      ? `linear-gradient(180deg, rgba(7,8,7,0.15) 0%, rgba(7,8,7,0.72) 100%), url(${panel.image})`
                      : panel.gradient ??
                        `linear-gradient(145deg, ${panel.accent ?? "#1a2618"} 0%, #0a0c0a 55%, #152018 100%)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <TechnicalGrid variant="scan" showCoords={false} className="opacity-40" />
                  <div className="absolute inset-0 flex items-end justify-between p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/80">
                      IMG //{String(i + 1).padStart(2, "0")}
                    </span>
                    <BrandLogo variant="mark" className="h-6 opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile stacked storytelling */}
      <div className="relative space-y-12 px-5 py-20 md:hidden">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl tracking-tight text-ink">{headline}</h2>
        </div>
        {panels.map((panel, i) => (
          <article key={panel.index} className="space-y-4">
            <div
              className="aspect-[5/4] w-full border border-line bg-cover bg-center"
              style={{
                backgroundImage: panel.image
                  ? `linear-gradient(180deg, rgba(7,8,7,0.1) 0%, rgba(7,8,7,0.65) 100%), url(${panel.image})`
                  : panel.gradient ??
                    "linear-gradient(145deg, #1a2618 0%, #0a0c0a 55%, #152018 100%)",
              }}
            >
              <div className="flex h-full items-end justify-between p-4">
                <span className="font-mono text-[10px] tracking-[0.18em] text-ink/80">
                  IMG //{String(i + 1).padStart(2, "0")}
                </span>
                <BrandLogo variant="mark" className="h-5 opacity-80" />
              </div>
            </div>
            <p className="font-mono text-sm text-accent">{panel.index}</p>
            <h3 className="font-display text-2xl text-ink">{panel.title}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{panel.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
