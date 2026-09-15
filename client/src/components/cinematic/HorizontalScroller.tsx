"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";
import { AnimatedText } from "@/components/cinematic/AnimatedText";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

export type HorizontalPanel = {
  index: string;
  title: string;
  description: string;
  meta?: string;
  image?: string;
};

type HorizontalScrollerProps = {
  id?: string;
  eyebrow?: string;
  headline: string;
  panels: HorizontalPanel[];
};

export function HorizontalScroller({
  id = "horizontal",
  eyebrow = "Capabilities",
  headline,
  panels,
}: HorizontalScrollerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [panels.length, reduced]);

  return (
    <section ref={sectionRef} id={id} className="relative overflow-hidden bg-canvas-elevated">
      <TechnicalGrid variant="sparse" className="opacity-40" />
      <div className="relative flex min-h-[100svh] flex-col justify-center py-16 md:h-[100svh] md:py-0">
        <div className="mx-auto mb-10 w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            {eyebrow}
          </p>
          <AnimatedText
            as="h2"
            text={headline}
            mode="words"
            className="max-w-3xl font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl"
          />
        </div>

        <div
          ref={trackRef}
          className="flex w-max gap-5 overflow-x-auto px-5 will-change-transform sm:gap-6 sm:px-8 md:overflow-visible lg:px-10"
        >
          {panels.map((panel) => (
            <article
              key={panel.index}
              className="relative flex h-[48vh] w-[78vw] max-w-[520px] shrink-0 flex-col justify-between overflow-hidden border border-line p-6 sm:h-[56vh] sm:w-[48vw] sm:p-8 lg:w-[34vw]"
              style={{
                backgroundImage: panel.image
                  ? `linear-gradient(180deg, rgba(7,8,7,0.35) 0%, rgba(7,8,7,0.88) 100%), url(${panel.image})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(16,19,16,0.7)",
              }}
            >
              <TechnicalGrid variant="sparse" showCoords={false} className="opacity-25" />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-accent">{panel.index}</p>
                  {panel.meta ? (
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                      {panel.meta}
                    </p>
                  ) : null}
                </div>
                <BrandLogo variant="mark" className="opacity-90" />
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-3xl text-ink sm:text-4xl">{panel.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
                  {panel.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-line bg-canvas/60 p-6 ${className}`}>{children}</div>;
}
