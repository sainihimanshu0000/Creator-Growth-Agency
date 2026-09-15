"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

type ParallaxImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  speed?: number;
  scaleFrom?: number;
  scaleTo?: number;
  objectPosition?: string;
  label?: string;
  gradient?: string;
};

export function ParallaxImage({
  src,
  alt = "",
  className = "",
  speed = 0.2,
  scaleFrom = 1.15,
  scaleTo = 1,
  objectPosition = "50% 50%",
  label,
  gradient = "linear-gradient(135deg, #1a2218 0%, #0c0e0c 45%, #152018 100%)",
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const wrap = wrapRef.current;
    const media = mediaRef.current;
    if (!wrap || !media || reduced) return;

    const tween = gsap.fromTo(
      media,
      { yPercent: -speed * 40, scale: scaleFrom },
      {
        yPercent: speed * 40,
        scale: scaleTo,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, scaleFrom, scaleTo, reduced]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={mediaRef}
        className="absolute inset-[-12%] will-change-transform"
        style={
          {
            backgroundImage: src
              ? `linear-gradient(180deg, rgba(12,14,12,0.15), rgba(12,14,12,0.55)), url(${src})`
              : gradient,
            backgroundSize: "cover",
            backgroundPosition: objectPosition,
          } as CSSProperties
        }
        role={src ? "img" : undefined}
        aria-label={src ? alt : undefined}
      />
      {label ? (
        <span className="absolute bottom-3 left-3 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/80">
          {label}
        </span>
      ) : null}
    </div>
  );
}
