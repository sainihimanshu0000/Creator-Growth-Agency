import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Insights() {
  return (
    <section id="insights" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="Thought leadership for commercial teams"
          description="Short briefs on creator economics, brand safety, and reporting that leadership trusts."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {siteConfig.insights.map((insight) => (
            <Link
              key={insight.title}
              href={insight.href}
              className="group flex flex-col border border-line bg-canvas-elevated/50 p-6 transition-colors hover:border-accent/40 hover:bg-accent-dim/40"
            >
              <h3 className="text-xl text-ink group-hover:text-accent">{insight.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {insight.line}
              </p>
              <span className="mt-6 text-sm font-medium text-accent">
                Request insight brief →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
