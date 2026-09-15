"use client";

import { useEffect, useRef, useState } from "react";
import { TechnicalGrid } from "@/components/cinematic/TechnicalGrid";
import { siteConfig } from "@/config/siteConfig";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

function useCountUp(target: number, active: boolean, duration = 1.6) {
  const [value, setValue] = useState(0);
  const decimals = String(target).includes(".") ? 1 : 0;
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }

    const proxy = { v: 0 };
    const tween = gsap.to(proxy, {
      v: target,
      duration,
      ease: "power2.out",
      onUpdate: () => setValue(Number(proxy.v.toFixed(decimals))),
    });
    return () => {
      tween.kill();
    };
  }, [active, target, duration, decimals, reduced]);

  return value;
}

function StatCell({
  label,
  value,
  suffix,
  prefix,
  active,
  index,
}: {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
  active: boolean;
  index: number;
}) {
  const current = useCountUp(value, active);
  const display = String(value).includes(".")
    ? current.toFixed(1)
    : Math.round(current).toLocaleString();

  return (
    <div className="relative min-w-0 border border-line bg-canvas/40 p-4 sm:p-6">
      <TechnicalGrid variant="sparse" showCoords={false} animate={false} className="opacity-20" />
      <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
        CH //{String(index + 1).padStart(2, "0")}
      </p>
      <p className="relative mt-3 font-display text-3xl tracking-tight text-ink sm:mt-4 sm:text-5xl">
        {prefix}
        {display}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="relative mt-2 text-[10px] uppercase leading-snug tracking-[0.12em] text-ink-subtle sm:text-xs sm:tracking-[0.16em]">
        {label}
      </p>
    </div>
  );
}

export function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const st = gsap.fromTo(
      el.querySelectorAll("[data-stat]"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          onEnter: () => setActive(true),
        },
      }
    );

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  return (
    <section ref={ref} className="relative border-y border-line py-16 lg:py-20" aria-label="Key metrics">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 sm:gap-4 sm:px-8 lg:grid-cols-4 lg:px-10">
        {siteConfig.stats.map((stat, i) => (
          <div key={stat.label} data-stat className="min-w-0">
            <StatCell {...stat} active={active} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
