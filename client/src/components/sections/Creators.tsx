import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Creators() {
  return (
    <section id="creators" className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="For Creators"
              title={siteConfig.creators.headline}
              description={siteConfig.creators.narrative}
            />
            <ul className="mt-8 space-y-3">
              {siteConfig.creators.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-ink-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {siteConfig.creators.features.map((feature) => (
              <div
                key={feature.title}
                className="border-t border-line pt-5"
              >
                <h3 className="text-lg text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
