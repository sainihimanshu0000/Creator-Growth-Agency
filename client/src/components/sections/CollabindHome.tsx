import Link from "next/link";
import { Contact } from "@/components/sections/Contact";
import { siteConfig } from "@/config/siteConfig";

export function CollabindHome() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section
        id="home"
        className="home-hero relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:pb-24"
      >
        <div className="home-hero__grid" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="home-kicker motion-fade-up">
            {siteConfig.company.eyebrow}
          </p>

          <h1 className="motion-fade-up motion-delay-1 mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
            {siteConfig.hero.headline}
            <span className="mt-2 block text-accent">
              For people, not metrics.
            </span>
          </h1>

          <p className="motion-fade-up motion-delay-2 mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {siteConfig.hero.subcopy}
          </p>

          <div className="motion-fade-up motion-delay-3 mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#contact"
              className="home-button home-button--bright inline-flex items-center justify-center gap-2"
            >
              {siteConfig.ctas.primary}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="#creators"
              className="home-button home-button--quiet inline-flex items-center justify-center gap-2"
            >
              For creators
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="motion-fade-up motion-delay-4 mx-auto mt-14 grid max-w-4xl grid-cols-2 border-y border-line sm:grid-cols-4">
            {siteConfig.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`home-stat px-3 py-5 sm:py-6 ${
                  index < siteConfig.stats.length - 1
                    ? "sm:border-r border-line"
                    : ""
                } ${index % 2 === 0 ? "border-r border-line sm:border-r" : ""}`}
              >
                <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-subtle sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TICKER ================= */}
      <section
        className="home-ticker overflow-hidden border-y border-line"
        aria-label="Platforms we activate"
      >
        <div className="home-ticker__track" aria-hidden="true">
          {[...siteConfig.platforms, ...siteConfig.platforms].map(
            (platform, index) => (
              <span key={`${platform}-${index}`} className="home-ticker__item">
                {platform}
                <span className="home-ticker__dot" />
              </span>
            )
          )}
        </div>
      </section>

      {/* ================= APPROACH ================= */}
      <section
        id="approach"
        className="home-section scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 lg:py-28"
      >
        <span id="story" className="anchor-alias" />

        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading">
            <p className="home-kicker">The bridge</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {siteConfig.approach.headline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              {siteConfig.approach.subcopy}
            </p>
          </div>

          <div
            id="features"
            className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3"
          >
            {siteConfig.approach.steps.map((step, index) => (
              <article
                key={step.number}
                className="home-process relative bg-canvas p-6 sm:p-8"
              >
                <span className="home-process__number">{step.number}</span>
                <h3 className="mt-10 font-display text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
                <span className="home-process__index">
                  0{index + 1} / 03
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VERTICALS ================= */}
      <section
        id="verticals"
        className="home-section scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading">
            <p className="home-kicker">{siteConfig.rosterMatrix.headline}</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {siteConfig.rosterMatrix.subcopy}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.rosterMatrix.sectors.map((sector, index) => (
              <article
                key={sector.title}
                className="home-vertical group flex flex-col overflow-hidden rounded-md border border-line bg-canvas transition-colors hover:border-accent/40"
              >
                <div
                  className="home-vertical__image relative flex h-44 flex-col justify-end p-5 sm:h-52"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(8, 13, 16, 0.05), rgba(8, 13, 16, 0.85)), url("${
                      siteConfig.frameImages.sectors[
                        index % siteConfig.frameImages.sectors.length
                      ]
                    }")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  role="img"
                  aria-label={`${sector.title} creator campaigns`}
                >
                  <span className="home-vertical__number absolute left-5 top-5 text-xs font-semibold text-white/60">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {sector.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {sector.description}
                  </p>
                  <span className="mt-auto inline-flex w-fit border border-accent/25 bg-accent-dim px-3 py-1 text-[11px] font-semibold text-accent">
                    {sector.tags}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PLAYBOOKS ================= */}
      <section
        id="playbooks"
        className="home-section scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading">
            <p className="home-kicker">{siteConfig.playbooks.headline}</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {siteConfig.playbooks.subcopy}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {siteConfig.playbooks.items.map((playbook) => (
              <article
                key={playbook.number}
                className="home-playbook relative flex flex-col rounded-md border border-line bg-canvas p-6 transition-colors hover:border-accent/40 sm:p-8"
              >
                <span className="home-kicker">{playbook.number}</span>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink sm:mt-8">
                  {playbook.title}
                </h3>
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-muted">
                  <p>
                    <span className="font-semibold text-accent">
                      Objective —{" "}
                    </span>
                    {playbook.objective}
                  </p>
                  <p>
                    <span className="font-semibold text-accent">
                      Execution —{" "}
                    </span>
                    {playbook.execution}
                  </p>
                  <p>
                    <span className="font-semibold text-accent">
                      Core assets —{" "}
                    </span>
                    {playbook.coreAssets}
                  </p>
                </div>
                <span className="home-playbook__rule mt-6 block h-px w-full bg-line" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CREATORS ================= */}
      <section className="home-section px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div
            id="creators"
            className="home-section-heading scroll-mt-24 self-start lg:sticky lg:top-28"
          >
            <p className="home-kicker">For creators</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {siteConfig.creators.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              {siteConfig.creators.narrative}
            </p>
            <Link
              href="#contact"
              className="home-text-link mt-7 inline-flex items-center gap-3 text-accent"
            >
              Meet your next partner <span aria-hidden="true">↗</span>
            </Link>

            <ul className="mt-6 space-y-2">
              {siteConfig.creators.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm text-ink-muted"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {siteConfig.creators.features.map((feature, index) => (
              <article
                key={feature.title}
                className="home-feature bg-canvas p-6 sm:p-8"
              >
                <span className="home-feature__number text-xs font-semibold text-accent">
                  0{index + 1}
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink sm:mt-7">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section
        id="brands"
        className="home-section scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="home-section-heading">
            <p className="home-kicker">For brand teams</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {siteConfig.forBrands.headline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              {siteConfig.forBrands.subcopy}
            </p>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.forBrands.points.map((point, index) => (
              <article className="home-check flex gap-4" key={point.title}>
                <span className="home-check__number flex-shrink-0 text-xs font-semibold text-accent">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {point.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="home-creator-band px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div>
            <p className="home-kicker">Built for both sides</p>
            <h2 className="mt-4 max-w-3xl font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">
              Better partnerships start with better operating systems.
            </h2>
          </div>
          <Link
            href="#contact"
            className="home-button home-button--bright inline-flex w-full items-center justify-center gap-2 whitespace-nowrap lg:w-auto"
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* ================= QUALITY STANDARDS ================= */}
      <section className="home-section px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl rounded-md border border-line bg-canvas-elevated p-6 sm:p-10">
          <p className="home-kicker">{siteConfig.qualityStandards.headline}</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            {siteConfig.qualityStandards.subcopy}
          </h2>

          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
            {siteConfig.qualityStandards.points.map((point) => (
              <article
                key={point.title}
                className="home-feature bg-canvas p-6 sm:p-8"
              >
                <span className="text-2xl" aria-hidden="true">
                  {point.icon}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}