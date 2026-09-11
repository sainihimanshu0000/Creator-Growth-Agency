"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const decimals = String(target).includes(".") ? 1 : 0;

  useEffect(() => {
    if (!active) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, decimals]);

  return value;
}

function StatItem({
  label,
  value,
  suffix,
  prefix,
  active,
}: {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
  active: boolean;
}) {
  const current = useCountUp(value, active);
  const display =
    String(value).includes(".") ? current.toFixed(1) : Math.round(current).toLocaleString();

  return (
    <div className="min-w-0">
      <p className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
        {prefix}
        {display}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ink-subtle">{label}</p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-y border-line bg-canvas-elevated/60"
      aria-label="Key metrics"
    >
      <Container className="grid grid-cols-2 gap-8 py-10 sm:gap-10 lg:grid-cols-4 lg:py-12">
        {siteConfig.stats.map((stat) => (
          <StatItem key={stat.label} {...stat} active={active} />
        ))}
      </Container>
    </section>
  );
}
