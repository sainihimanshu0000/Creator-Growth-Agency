import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.line,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const index = siteConfig.services.findIndex((s) => s.slug === slug);

  return (
    <div className="atmosphere pt-28 pb-20 lg:pt-32 lg:pb-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Service"
          title={service.title}
          description={service.line}
        />

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink-muted">
          <p>
            {siteConfig.company.name} delivers this engagement through the same operating
            model used across our vertical practice: specialist strategy, managed execution,
            and transparent reporting.
          </p>

          <div className="grid gap-6 border-y border-line py-8 sm:grid-cols-3">
            {siteConfig.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="text-base text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{pillar.description}</p>
              </div>
            ))}
          </div>

          <p>
            Typical engagements start with a strategy call to align on commercial objectives,
            audience definition, compliance constraints, and reporting cadence—then move into
            casting and live delivery.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/#contact">{siteConfig.ctas.primary}</Button>
          <Button href="/#services" variant="secondary">
            All services
          </Button>
        </div>

        <p className="mt-8 text-xs text-ink-subtle">
          Service {String(index + 1).padStart(2, "0")} of {siteConfig.services.length}
        </p>
      </Container>
    </div>
  );
}
