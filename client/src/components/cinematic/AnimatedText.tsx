"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

type Mode = "words" | "chars" | "lines" | "blur";

type AnimatedTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  triggerOnView?: boolean;
  once?: boolean;
};

export function AnimatedText({
  text,
  as: Tag = "p",
  className = "",
  mode = "words",
  delay = 0,
  stagger = 0.045,
  triggerOnView = true,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const units = el.querySelectorAll<HTMLElement>("[data-unit]");
    if (!units.length) return;

    if (reduced) {
      gsap.set(units, { yPercent: 0, opacity: 1, filter: "none" });
      return;
    }

    const fromVars =
      mode === "blur"
        ? { yPercent: 30, opacity: 0, filter: "blur(10px)" }
        : { yPercent: 110, opacity: 0 };

    gsap.set(units, fromVars);

    const tween = gsap.to(units, {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: mode === "chars" ? 0.55 : 0.85,
      ease: "power3.out",
      stagger,
      delay,
      scrollTrigger: triggerOnView
        ? {
            trigger: el,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          }
        : undefined,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, mode, delay, stagger, triggerOnView, once, reduced]);

  const parts =
    mode === "chars"
      ? text.split("")
      : mode === "lines"
        ? text.split("\n")
        : text.split(" ");

  return (
    <Tag className={`animated-text ${className}`} aria-label={text}>
      <span ref={ref} className="contents">
        {parts.map((part, i) => (
          <span key={`${part}-${i}`} className="animated-text__mask" aria-hidden>
            <span data-unit className="animated-text__unit">
              {part === " " ? "\u00A0" : part}
              {mode === "words" && i < parts.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

export function FadeRise({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
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
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
