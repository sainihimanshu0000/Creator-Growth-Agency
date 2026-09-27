import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const { columns } = siteConfig.footer;
  const footerColumns = Object.entries(columns);

  return (
    <footer className="border-t border-line bg-canvas-elevated">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <BrandLogo variant="wordmark" className="h-8" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.company.description}
            </p>
            <p className="mt-4 text-sm text-ink-subtle">{siteConfig.company.region}</p>
          </div>

          {footerColumns.map(([heading, items]) => (
            <div key={heading}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
                {heading}
              </p>
              <ul className="mt-4 space-y-1">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-sm text-ink-muted hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Contact
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.brandEmail}`}
                  className="inline-flex min-h-10 items-center text-sm text-ink-muted hover:text-accent"
                >
                  {siteConfig.contact.brandEmail}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.creatorEmail}`}
                  className="inline-flex min-h-10 items-center text-sm text-ink-muted hover:text-accent"
                >
                  {siteConfig.contact.creatorEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-subtle">{siteConfig.footer.copyright}</p>
          <p className="text-xs text-ink-subtle">{siteConfig.footer.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
