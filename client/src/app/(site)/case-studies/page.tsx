import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `Selected campaign outcomes from ${siteConfig.company.name}.`,
};

export default function CaseStudiesPage() {
  return (
    <div className="atmosphere pt-28 pb-20 lg:pt-32 lg:pb-28">
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          title="Selected outcomes"
          description="Confidential-safe summaries from recent vertical work. Full decks available under NDA on a strategy call."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {siteConfig.caseStudies.map((study) => (
            <article
              key={study.title}
              className="border border-line bg-canvas-elevated/40 p-6 transition-colors hover:border-accent/30"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {study.vertical}
              </p>
              <h3 className="mt-3 text-xl text-ink">{study.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{study.outcome}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl text-ink">Want the full story?</h2>
          <p className="mt-3 max-w-xl text-sm text-ink-muted">
            We share methodology, creative samples, and reporting packs on a scoped call—not in
            public PDFs.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/#contact">{siteConfig.ctas.primary}</Button>
            <Button href="/" variant="secondary">
              ← Back to home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
