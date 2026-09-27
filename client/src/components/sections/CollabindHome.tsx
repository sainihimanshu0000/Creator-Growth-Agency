import Link from "next/link";
import { Contact } from "@/components/sections/Contact";
import { siteConfig } from "@/config/siteConfig";

export function CollabindHome() {
  return (
    <>
      <section id="home" className="home-hero relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:pb-24">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="home-kicker motion-fade-up">{siteConfig.company.eyebrow}</p>
          <h1 className="motion-fade-up motion-delay-1 mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] text-ink sm:text-6xl lg:text-8xl">
            {siteConfig.hero.headline}
            <span className="mt-2 block text-accent">For people, not metrics.</span>
          </h1>
          <p className="motion-fade-up motion-delay-2 mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {siteConfig.hero.subcopy}
          </p>
          <div className="motion-fade-up motion-delay-3 mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#contact" className="home-button home-button--bright">
              {siteConfig.ctas.primary}<span aria-hidden="true">↗</span>
            </Link>
            <Link href="#creators" className="home-button home-button--quiet">
              For creators<span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="motion-fade-up motion-delay-4 mx-auto mt-14 grid max-w-4xl grid-cols-2 border-y border-line sm:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="home-stat px-3 py-5 sm:py-6">
                <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                  {stat.prefix}{stat.value}{stat.suffix}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-subtle sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-ticker border-y border-line" aria-label="Platforms we activate">
        <div className="home-ticker__track" aria-hidden="true">
          {[...siteConfig.platforms, ...siteConfig.platforms].map((platform, index) => (
            <span key={`${platform}-${index}`} className="home-ticker__item">
              {platform}<span className="home-ticker__dot" />
            </span>
          ))}
        </div>
      </section>

      <section id="approach" className="home-section px-5 py-20 sm:px-8 sm:py-28">
        <span id="story" className="anchor-alias" />
        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading">
            <p className="home-kicker">The bridge</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
              {siteConfig.approach.headline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              {siteConfig.approach.subcopy}
            </p>
          </div>
          <div id="features" className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {siteConfig.approach.steps.map((step, index) => (
              <article key={step.number} className="home-process">
                <span className="home-process__number">{step.number}</span>
                <h3 className="mt-10 font-display text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                <span className="home-process__index">0{index + 1} / 03</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="verticals" className="home-section px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="home-kicker">{siteConfig.rosterMatrix.headline}</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl">
                {siteConfig.rosterMatrix.subcopy}
              </h2>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.rosterMatrix.sectors.map((sector, index) => (
              <article className="home-vertical" key={sector.title}>
                <div
                  className="home-vertical__image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 13, 16, 0.04), rgba(8, 13, 16, 0.84)), url("${siteConfig.frameImages.sectors[index % siteConfig.frameImages.sectors.length]}")` }}
                  role="img"
                  aria-label={`${sector.title} creator campaigns`}
                >
                  <span className="home-vertical__number">0{index + 1}</span>
                  <h3 className="font-display text-2xl font-semibold text-white">{sector.title}</h3>
                </div>
                <p className="px-5 py-4 text-sm leading-relaxed text-ink-muted">{sector.description}</p>
                <span className="mx-5 mb-5 inline-flex border border-accent/25 bg-accent-dim px-3 py-1 text-[11px] font-semibold text-accent">
                  {sector.tags}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="playbooks" className="home-section px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading">
            <p className="home-kicker">{siteConfig.playbooks.headline}</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
              {siteConfig.playbooks.subcopy}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {siteConfig.playbooks.items.map((playbook) => (
              <article className="home-playbook" key={playbook.number}>
                <span className="home-kicker">{playbook.number}</span>
                <h3 className="mt-8 font-display text-xl font-semibold">{playbook.title}</h3>
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-muted">
                  <p><span className="text-accent">Objective — </span>{playbook.objective}</p>
                  <p><span className="text-accent">Execution — </span>{playbook.execution}</p>
                  <p><span className="text-accent">Core assets — </span>{playbook.coreAssets}</p>
                </div>
                <span className="home-playbook__rule" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div id="creators" className="home-section-heading self-start lg:sticky lg:top-28">
            <p className="home-kicker">For creators</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
              {siteConfig.creators.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">{siteConfig.creators.narrative}</p>
            <Link href="#contact" className="home-text-link mt-7 inline-flex items-center gap-3">
              Meet your next partner <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {siteConfig.creators.features.map((feature, index) => (
              <article className="home-feature" key={feature.title}>
                <span className="home-feature__number">0{index + 1}</span>
                <h3 className="mt-7 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="home-section px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading">
            <p className="home-kicker">For brand teams</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
              {siteConfig.forBrands.headline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">{siteConfig.forBrands.subcopy}</p>
          </div>
          <div className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.forBrands.points.map((point, index) => (
              <article className="home-check" key={point.title}>
                <span className="home-check__number">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-base font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-creator-band px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="home-kicker">Built for both sides</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">
              Better partnerships start with better operating systems.
            </h2>
          </div>
          <Link href="#contact" className="home-button home-button--bright whitespace-nowrap">
            Start a conversation<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="home-section px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl border border-line bg-canvas-elevated p-6 sm:p-10">
          <p className="home-kicker">{siteConfig.qualityStandards.headline}</p>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{siteConfig.qualityStandards.subcopy}</h2>
          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
            {siteConfig.qualityStandards.points.map((point) => (
              <article className="home-feature" key={point.title}>
                <span className="text-2xl" aria-hidden="true">{point.icon}</span>
                <h3 className="mt-5 font-display text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}