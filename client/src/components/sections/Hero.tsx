"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const visual = visualRef.current;
    if (!visual) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > window.innerHeight) return;
        visual.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden hero-visual"
    >
      <div
        ref={visualRef}
        className="pointer-events-none absolute inset-0 opacity-40 will-change-transform"
        aria-hidden
      >
        <svg
          className="hero-network h-full w-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="rgba(200,245,66,0.22)" strokeWidth="1">
            <path d="M80 620 L320 280 L560 520 L820 160 L1120 480" />
            <path d="M140 180 L380 420 L640 240 L900 560 L1100 300" />
            <path d="M200 700 L480 400 L760 640 L980 220" />
          </g>
          <g fill="rgba(200,245,66,0.55)">
            <circle cx="320" cy="280" r="4" />
            <circle cx="560" cy="520" r="3" />
            <circle cx="820" cy="160" r="5" />
            <circle cx="380" cy="420" r="3" />
            <circle cx="640" cy="240" r="4" />
            <circle cx="900" cy="560" r="3" />
            <circle cx="480" cy="400" r="4" />
            <circle cx="760" cy="640" r="3" />
          </g>
        </svg>
      </div>

      <Container className="relative z-10 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <p className="motion-fade-up text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {siteConfig.company.eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="motion-fade-up motion-delay-1 block overflow-hidden">
            <span className="block text-accent">{siteConfig.company.name}</span>
          </span>
          <span className="motion-fade-up motion-delay-2 mt-2 block overflow-hidden">
            <span className="block">{siteConfig.hero.headline}</span>
          </span>
        </h1>

        <p className="motion-fade-up motion-delay-3 mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {siteConfig.hero.subcopy}
        </p>

        <p className="motion-fade-up motion-delay-3 mt-8 text-sm tracking-wide text-ink-subtle">
          {siteConfig.verticals.join(" · ")}
        </p>

        <div className="motion-fade-up motion-delay-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/#contact">{siteConfig.ctas.primary}</Button>
          <Button href="/#brands" variant="secondary">
            {siteConfig.ctas.secondaryBrand}
          </Button>
        </div>
      </Container>
    </section>
  );
}
