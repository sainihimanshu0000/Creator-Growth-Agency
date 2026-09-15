"use client";

import { useEffect, useRef } from "react";
import { AnimatedText } from "@/components/cinematic/AnimatedText";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

type ScalePanel = {
  label: string;
  title: string;
  body: string;
  position?: string;
  gradient?: string;
  image?: string;
};

type ImageScaleStoryProps = {
  id?: string;
  eyebrow?: string;
  headline: string;
  panels: ScalePanel[];
};

/** Cinematic: small card → scale to fullscreen → reveal next */
export function ImageScaleStory({
  id = "scale-story",
  eyebrow = "Signal",
  headline,
  panels,
}: ImageScaleStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reduced) return;

    const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-scale-card]"));
    const copies = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-scale-copy]"));

    gsap.set(cards, {
      scale: 0.35,
      transformOrigin: "50% 50%",
      autoAlpha: 0,
      objectPosition: "50% 50%",
    });
    gsap.set(copies, { autoAlpha: 0, y: 24 });
    gsap.set(cards[0], { scale: 0.42, autoAlpha: 1 });
    gsap.set(copies[0], { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${panels.length * 140}%`,
        pin: pin,
        scrub: 1.35,
        anticipatePin: 1,
      },
    });

    panels.forEach((_, i) => {
      const card = cards[i];
      const copy = copies[i];
      // Scale current card to fullscreen
      tl.to(
        card,
        {
          scale: 1,
          borderRadius: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        i
      );
      tl.to(
        card,
        {
          backgroundPosition: i % 2 ? "70% 40%" : "30% 60%",
          duration: 0.7,
          ease: "none",
        },
        i
      );

      if (i < panels.length - 1) {
        tl.to(copy, { autoAlpha: 0, y: -20, duration: 0.25 }, i + 0.55);
        tl.to(card, { autoAlpha: 0, scale: 1.05, duration: 0.35 }, i + 0.65);
        tl.set(cards[i + 1], { autoAlpha: 1, scale: 0.38 }, i + 0.75);
        tl.to(copies[i + 1], { autoAlpha: 1, y: 0, duration: 0.35 }, i + 0.8);
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [panels, reduced]);

  return (
    <section ref={sectionRef} id={id} className="relative bg-canvas">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        {panels.map((panel) => (
          <div
            key={panel.label}
            data-scale-card
            className="absolute inset-[8%] overflow-hidden rounded-3xl will-change-transform sm:inset-[6%]"
            style={{
              backgroundImage: panel.image
                ? `linear-gradient(180deg, rgba(7,8,7,0.2) 0%, rgba(7,8,7,0.7) 100%), url(${panel.image})`
                : panel.gradient ??
                  "linear-gradient(145deg, #1a2618 0%, #0a0c0a 55%, #152018 100%)",
              backgroundSize: "cover",
              backgroundPosition: panel.position ?? "50% 50%",
            }}
          >
            <TechnicalGrid variant="scan" showCoords={false} className="opacity-40" />
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-canvas via-canvas/80 to-transparent px-5 pb-12 pt-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              {eyebrow}
            </p>
            <AnimatedText
              as="h2"
              text={headline}
              mode="words"
              className="mb-8 max-w-2xl font-display text-3xl text-ink sm:text-4xl"
            />
            <div className="relative min-h-[110px]">
              {panels.map((panel) => (
                <div key={panel.label} data-scale-copy className="absolute inset-x-0 top-0">
                  <p className="font-mono text-xs text-accent">{panel.label}</p>
                  <h3 className="mt-1 font-display text-2xl text-ink sm:text-3xl">{panel.title}</h3>
                  <p className="mt-2 max-w-lg text-sm text-ink-muted">{panel.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
