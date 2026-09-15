import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();
  const { columns } = siteConfig.footer;

  return (
    <footer className="border-t border-line bg-canvas-elevated">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <BrandLogo variant="wordmark" className="h-8" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.company.description}
            </p>
            <p className="mt-4 text-sm text-ink-subtle">{siteConfig.company.region}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Verticals
            </p>
            <ul className="mt-4 space-y-2.5">
              {columns.Verticals.map((item) => (
                <li key={item}>
                  <Link href="/#verticals" className="text-sm text-ink-muted hover:text-accent">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {columns.Company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Programs
            </p>
            <ul className="mt-4 space-y-2.5">
              {columns.Programs.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Governance
            </p>
            <ul className="mt-4 space-y-2.5">
              {columns.Governance.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-ink-muted hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Contact
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.brandEmail}`}
                  className="text-sm text-ink-muted hover:text-accent"
                >
                  {siteConfig.contact.brandEmail}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.creatorEmail}`}
                  className="text-sm text-ink-muted hover:text-accent"
                >
                  {siteConfig.contact.creatorEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-subtle">
            © {year} {siteConfig.company.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-ink-subtle">{siteConfig.company.region}</p>
        </div>
      </Container>
    </footer>
  );
}
