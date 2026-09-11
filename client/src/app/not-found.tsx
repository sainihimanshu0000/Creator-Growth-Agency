import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="atmosphere flex min-h-[100svh] items-center">
      <Container className="py-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 max-w-xl font-display text-4xl tracking-tight text-ink sm:text-5xl">
          This page is off the growth map
        </h1>
        <p className="mt-4 max-w-md text-base text-ink-muted">
          The link may be outdated, or the page never existed. Head home or book a strategy call.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to {siteConfig.company.name}</Button>
          <Button href="/#contact" variant="secondary">
            {siteConfig.ctas.primary}
          </Button>
        </div>
        <p className="mt-8 text-sm text-ink-subtle">
          Looking for services?{" "}
          <Link href="/#services" className="text-accent hover:underline">
            Explore offerings
          </Link>
        </p>
      </Container>
    </div>
  );
}
