import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Approach() {
  return (
    <section id="approach" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Approach"
          title={siteConfig.approach.headline}
          description={siteConfig.approach.subcopy}
        />

        <ol className="mt-16 space-y-0 divide-y divide-line border-y border-line">
          {siteConfig.approach.steps.map((step) => (
            <li
              key={step.number}
              className="grid gap-4 py-10 sm:grid-cols-[7rem_1fr] sm:gap-10 lg:grid-cols-[10rem_1fr_1.2fr] lg:items-baseline"
            >
              <span className="font-display text-5xl tracking-tight text-accent sm:text-6xl">
                {step.number}
              </span>
              <h3 className="text-2xl text-ink sm:pt-2 lg:pt-3">{step.title}</h3>
              <p className="text-base leading-relaxed text-ink-muted sm:col-span-2 lg:col-span-1 lg:pt-3">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
