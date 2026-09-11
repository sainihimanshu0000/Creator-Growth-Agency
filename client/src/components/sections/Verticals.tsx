import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const verticalCopy: Record<string, string> = {
  Gaming: "Launch, live-ops, and community-led acquisition for titles and platforms.",
  Esports: "Team, tournament, and talent partnerships built for competitive audiences.",
  "Crypto & Trading": "Compliant creator systems for education, product, and brand trust.",
  Sports: "Athlete, fan, and apparel campaigns with clear commercial outcomes.",
  Fintech: "App installs, activation, and trust-building through qualified creator reach.",
};

export function Verticals() {
  return (
    <section id="verticals" className="border-y border-line py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Verticals"
          title="Specialists where category language matters"
          description="We operate where audience intent, platform norms, and brand risk are specific—not generic."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.verticals.map((vertical, i) => (
            <div key={vertical} className="border-t border-line pt-5">
              <p className="text-xs font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg text-ink">{vertical}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {verticalCopy[vertical] ?? "Category-led creator growth with commercial clarity."}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
