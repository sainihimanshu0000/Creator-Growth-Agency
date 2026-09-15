"use client";

import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  id,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <Reveal variant="fade" delay={0}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal variant="up" delay={80}>
        <h2 id={id} className="text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal variant="up" delay={160}>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
