"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
};

/** Line-by-line clip reveal — Hello Monday / Immersive-G style. */
export function TextReveal({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 80,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const lines = text.split("\n").filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`text-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--text-delay": `${delay}ms`, "--text-stagger": `${stagger}ms` } as CSSProperties}
    >
      {lines.map((line, i) => (
        <span key={i} className="text-reveal-line" style={{ "--i": i } as CSSProperties}>
          <span className="text-reveal-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
