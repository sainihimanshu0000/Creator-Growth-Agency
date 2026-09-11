import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Team() {
  return (
    <section id="team" className="border-y border-line bg-canvas-elevated/40 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Leadership"
          title="Operators, not intermediaries"
          description="A leadership bench that owns strategy, network quality, and performance systems."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.team.map((person) => (
            <article key={person.name} className="group">
              <div className="flex h-28 w-28 items-center justify-center bg-accent-dim font-display text-2xl text-accent transition-colors group-hover:bg-accent group-hover:text-[#0c0e0c]">
                {person.initials}
              </div>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                {person.role}
              </p>
              <h3 className="mt-2 text-lg text-ink">{person.name}</h3>
              <p className="text-sm text-ink-muted">{person.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-subtle">{person.bio}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
