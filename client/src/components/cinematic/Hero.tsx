"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";
import { AnimatedText } from "@/components/cinematic/AnimatedText";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

const HeroGeometry = dynamic(
  () => import("@/components/cinematic/HeroGeometry").then((m) => m.HeroGeometry),
  { ssr: false, loading: () => null }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const visual = visualRef.current;
    const content = contentRef.current;
    const parallax = parallaxRef.current;
    if (!section || !visual || !content) return;
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(visual, {
          scale: 0.84,
          borderRadius: 28,
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        });

        gsap.to(content, {
          opacity: 0,
          y: -48,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "55% top",
            scrub: 1.1,
          },
        });
      }, section);

      const onMove = (e: MouseEvent) => {
        if (!parallax) return;
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 28;
        const y = (e.clientY / innerHeight - 0.5) * 18;
        gsap.to(parallax, { x, y, duration: 1.15, ease: "power3.out" });
      };

      window.addEventListener("mousemove", onMove);

      return () => {
        window.removeEventListener("mousemove", onMove);
        ctx.revert();
      };
    });

    // Softer scrub on mobile so content isn't crushed into overflow clip
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(visual, {
          scale: 0.94,
          borderRadius: 16,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(content, {
          opacity: 0,
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "60% top",
            scrub: 1,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div
        ref={visualRef}
        className="absolute inset-0 origin-center overflow-hidden will-change-transform"
      >
        <div ref={parallaxRef} className="absolute inset-[-5%] will-change-transform">
          <div className="absolute inset-0 bg-[#050605]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 70% 55% at 72% 38%, rgba(200,245,66,0.18), transparent 55%),
                radial-gradient(ellipse 50% 40% at 18% 78%, rgba(60,100,80,0.3), transparent 50%),
                linear-gradient(160deg, #121a14 0%, #070807 42%, #0e1510 100%)
              `,
            }}
          />
          <div className="absolute inset-0 hidden opacity-45 md:block">
            <HeroGeometry />
          </div>
          <TechnicalGrid variant="scan" className="opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070807] via-[#070807]/40 to-transparent" />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24"
      >
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:mb-5">
          {siteConfig.company.eyebrow}
        </p>

        <div className="mb-5 sm:mb-6">
          <BrandLogo variant="wordmark" priority className="h-8 sm:h-12 lg:h-14" />
        </div>

        <h1 className="max-w-5xl font-display text-4xl leading-[0.92] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[6.5rem]">
          <AnimatedText
            as="span"
            text={siteConfig.hero.headline}
            mode="words"
            triggerOnView={false}
            delay={0.2}
            stagger={0.055}
            className="block"
          />
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted sm:mt-7 sm:text-lg">
          {siteConfig.hero.subcopy}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <Button href="/#contact">{siteConfig.ctas.primary}</Button>
          <Button href="/#story" variant="secondary">
            Enter the system
          </Button>
        </div>

        <div className="mt-10 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle sm:mt-14 sm:flex">
          <span className="h-px w-10 bg-accent/60" />
          Scroll to enter system
        </div>
      </div>
    </section>
  );
}
