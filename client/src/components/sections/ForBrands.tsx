import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ForBrands() {
  return (
    <section className="atmosphere border-y border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="For Brand Teams"
          title={siteConfig.forBrands.headline}
          description={siteConfig.forBrands.subcopy}
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.forBrands.points.map((point, i) => (
            <div key={point.title}>
              <p className="text-xs font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
