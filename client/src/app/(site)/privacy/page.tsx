import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy and data handling policies for ${siteConfig.company.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="atmosphere pt-28 pb-20 lg:pt-32 lg:pb-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Governance"
          title="Privacy Policy"
          description="How we collect, use, and protect information submitted through this site."
        />

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink-muted">
          <section>
            <h3 className="text-lg text-ink">1. Who we are</h3>
            <p className="mt-2">
              {siteConfig.company.legalName} (“{siteConfig.company.name}”, “we”) operates this
              website and related inquiry forms for brand and creator partnership discussions
              across {siteConfig.company.region}.
            </p>
          </section>

          <section>
            <h3 className="text-lg text-ink">2. Information we collect</h3>
            <p className="mt-2">
              When you submit a contact form, we collect the details you provide—such as name,
              company, email, channel information, and message content—solely to evaluate and
              respond to your inquiry.
            </p>
          </section>

          <section>
            <h3 className="text-lg text-ink">3. How we use information</h3>
            <p className="mt-2">
              We use submitted information to route inquiries, assess commercial fit, schedule
              strategy conversations, and maintain basic records of correspondence. We do not sell
              personal data.
            </p>
          </section>

          <section>
            <h3 className="text-lg text-ink">4. Retention & security</h3>
            <p className="mt-2">
              Inquiry records are retained only as long as needed for legitimate business follow-up
              and compliance. Access is limited to relevant team members. This page is a stub—replace
              with counsel-approved language before production launch.
            </p>
          </section>

          <section>
            <h3 className="text-lg text-ink">5. Contact</h3>
            <p className="mt-2">
              Privacy questions:{" "}
              <a className="text-accent hover:underline" href={`mailto:${siteConfig.contact.generalEmail}`}>
                {siteConfig.contact.generalEmail}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Button href="/" variant="secondary">
            ← Back to home
          </Button>
        </div>
        <p className="mt-6 text-xs text-ink-subtle">
          Also see{" "}
          <Link href="/case-studies" className="text-ink-muted hover:text-accent">
            Case Studies
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
