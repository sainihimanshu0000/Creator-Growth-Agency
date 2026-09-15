"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

export function ScrollReveal({
  children,
  className = "",
  y = 48,
  x = 0,
  scale = 1,
  delay = 0,
  duration = 1.15,
  start = "top 88%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { y, x, scale, opacity: 0 },
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, x, scale, delay, duration, start, reduced]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
