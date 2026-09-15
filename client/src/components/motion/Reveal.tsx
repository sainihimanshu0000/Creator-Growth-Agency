"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

type RevealVariant = "up" | "fade" | "left" | "right" | "scale" | "clip";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "span" | "li" | "article" | "section";
  style?: CSSProperties;
};

const variantClass: Record<RevealVariant, string> = {
  up: "reveal-up",
  fade: "reveal-fade",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  clip: "reveal-clip",
};

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 900,
  once = true,
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${variantClass[variant]} ${visible ? "is-visible" : ""} ${className}`}
      style={
        {
          ...style,
          "--reveal-delay": `${delay}ms`,
          "--reveal-duration": `${duration}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  baseDelay?: number;
  variant?: RevealVariant;
  as?: "div" | "ul" | "ol";
};

/** Wraps each direct child in Reveal with incremental delay. */
export function Stagger({
  children,
  className = "",
  stagger = 90,
  baseDelay = 0,
  variant = "up",
  as: Tag = "div",
}: StaggerProps) {
  return (
    <Tag className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        return (
          <Reveal key={child.key ?? i} variant={variant} delay={baseDelay + i * stagger}>
            {cloneElement(child as ReactElement)}
          </Reveal>
        );
      })}
    </Tag>
  );
}
