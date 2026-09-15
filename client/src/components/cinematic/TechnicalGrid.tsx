"use client";

import { useEffect, useId, useRef } from "react";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

type TechnicalGridProps = {
  className?: string;
  variant?: "full" | "sparse" | "scan";
  showCoords?: boolean;
  animate?: boolean;
};

export function TechnicalGrid({
  className = "",
  variant = "sparse",
  showCoords = true,
  animate = true,
}: TechnicalGridProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!animate || reduced) return;
    registerGsap();
    const root = ref.current;
    if (!root) return;

    const scan = root.querySelector<HTMLElement>("[data-scan]");
    const dots = root.querySelectorAll<HTMLElement>("[data-dot]");
    const lines = root.querySelectorAll<HTMLElement>("[data-line]");

    const ctx = gsap.context(() => {
      if (scan) {
        gsap.to(scan, {
          yPercent: 1200,
          duration: 7,
          ease: "none",
          repeat: -1,
        });
      }

      dots.forEach((dot, i) => {
        gsap.to(dot, {
          opacity: gsap.utils.random(0.2, 0.9),
          duration: gsap.utils.random(1.5, 3.5),
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
          ease: "sine.inOut",
        });
      });

      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: i % 2 ? "right" : "left" },
          {
            scaleX: 1,
            duration: 1.6,
            delay: 0.2 + i * 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [animate, reduced]);

  const density = variant === "full" ? 8 : variant === "scan" ? 5 : 4;

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(242,244,239,0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,244,239,0.35) 1px, transparent 1px)
          `,
          backgroundSize: `${100 / density}% ${100 / density}%`,
        }}
      />

      <div
        data-line
        className="absolute left-[8%] right-[8%] top-[18%] h-px origin-left bg-accent/25"
      />
      <div
        data-line
        className="absolute left-[12%] right-[20%] bottom-[22%] h-px origin-right bg-white/15"
      />
      <div
        data-line
        className="absolute left-[18%] top-[12%] bottom-[18%] w-px origin-top bg-white/10"
        style={{ transform: "scaleY(0)" }}
      />

      {(variant === "scan" || variant === "full") && (
        <div
          data-scan
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        />
      )}

      {[
        [12, 20],
        [78, 28],
        [64, 72],
        [24, 68],
        [88, 58],
      ].map(([x, y], i) => (
        <span
          key={`${id}-dot-${i}`}
          data-dot
          className="absolute h-1 w-1 rounded-full bg-accent/70"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}

      {showCoords && (
        <>
          <span className="absolute left-4 top-4 font-mono text-[10px] tracking-widest text-ink-subtle/80">
            X:{Math.round(12.4)} · Y:{Math.round(8.2)}
          </span>
          <span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-widest text-ink-subtle/80">
            SYS // {variant.toUpperCase()}
          </span>
          <span className="absolute right-4 top-4 font-mono text-[10px] tracking-widest text-accent/50">
            LAT 28.61 · LNG 77.20
          </span>
        </>
      )}
    </div>
  );
}
