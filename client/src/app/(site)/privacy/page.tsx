import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Privacy Policy & Platform Terms",
  description: `${siteConfig.company.name} Privacy Policy and Platform Terms, effective September 29, 2026.`,
};

type Item = { label?: string; body: ReactNode; children?: ReactNode[] };
type Section = { id?: string; title: string; intro?: ReactNode[]; items?: Item[]; outro?: ReactNode[] };

const sections: Section[] = [
  {
    id: "platform-terms",
    title: "Acceptance and Digital Consent",
    intro: [
      "Welcome to Collabind (“we”, “our”, “us”). This document governs your access to and use of our website, digital rosters, media decks, lead capture mechanisms, and associated marketing coordination services (collectively, the “Platform”).",
      "By accessing, browsing, interacting with, or submitting data through our Platform, you explicitly acknowledge that you have read, understood, and agree to be legally bound by this Privacy Policy and Platform Terms. If you do not agree, you must immediately discontinue using our Platform.",
      "This document is published in accordance with the provisions of:",
    ],
    items: [
      { body: "The Digital Personal Data Protection Act, 2023 (DPDPA) and its operational rules." },
      { body: "The Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011." },
      { body: "The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021." },
    ],
  },
  {
    id: "privacy-policy",
    title: "Information We Collect",
    intro: ["To operate as a marketing and creator facilitation platform, we collect two categories of information:"],
    items: [
      {
        label: "Submitted Information (Voluntary)",
        body: "",
        children: [
          "Full name, business trade name, official email, phone/WhatsApp number, and postal address.",
          "Creator media kits, audience metrics, public social media profile links (e.g., YouTube, Instagram, Facebook, Kick), niche categories, commercial rate cards, and deliverables.",
          "Billing details, GST numbers, PAN details, bank account/UPI data for invoicing and payment clearance, and any inquiries sent via our web forms.",
        ],
      },
      {
        label: "Automatically Collected Technical Data",
        body: "IP addresses, browser types, operating systems, referring URLs, access timestamps, device identifiers, and aggregated analytical interaction data via standard tracking logs and cookies.",
      },
    ],
  },
  {
    title: "Purpose, Legal Basis, and Notice of Processing",
    intro: ["We collect and process digital personal data solely for legitimate, necessary purposes under Section 4 and Section 7 of the DPDPA, 2023:"],
    items: [
      { body: "To verify, curate, and connect creators with relevant brand or property marketing opportunities." },
      { body: "To process campaign agreements, generate invoices, verify bank details, and execute approved disbursements." },
      { body: "To comply with statutory tax, audit, accounting, and anti-fraud mandates under Indian law." },
      { body: "To provide administrative notifications, service updates, and direct project communications." },
      { body: "To maintain technical integrity, safeguard our digital assets, and prevent malicious access." },
    ],
    outro: [
      "Submission of your details via our online inquiry forms, WhatsApp links, or onboarding forms serves as explicit consent to process your data for the stated scope. You may withdraw consent at any time in writing; however, withdrawal does not invalidate prior lawful processing or data retained to satisfy statutory audit mandates.",
    ],
  },
  {
    title: "Data Sharing and Third-Party Safeguards",
    intro: ["We do not sell, rent, monetize, or trade personal data to third-party data brokers. Data is shared strictly under the following controlled scenarios:"],
    items: [
      { label: "Brand & Creator Introductions", body: "Public creator statistics, work samples, and commercial proposals are shared with prospective brand clients solely to evaluate and finalize campaign partnerships." },
      { label: "Infrastructure & Service Providers", body: "Trusted operational vendors (cloud hosts, secure databases, email providers, and payment processors) who process data strictly on our instructions and under confidentiality obligations." },
      { label: "Legal and Regulatory Mandates", body: "When compelled by law, court order, or authorized government bodies for tax, fraud prevention, or judicial proceedings." },
      { label: "Corporate Restructuring", body: "In the event of a merger, acquisition, restructuring, or transfer of operational assets, subject to continued adherence to this policy." },
    ],
  },
  {
    title: "Third-Party Links, Social Platforms & Intermediary Disclaimer",
    intro: ["Our Platform interfaces with external websites, creator channels, booking engines, and major social networks (e.g., Meta/Instagram, YouTube, Kick)."],
    items: [
      { label: "Intermediary Status", body: "Under Section 79 of the Information Technology Act, 2000, Collabind acts as a facilitator and platform organizer. We do not exercise editorial control over independent creator content, external comments, or third-party properties." },
      { label: "External Links", body: "We are not responsible for the privacy practices, tracking mechanisms, terms, or content of third-party platforms. Users access third-party links entirely at their own risk." },
    ],
  },
  {
    title: "Intellectual Property Protection & Anti-Scraping",
    items: [
      { label: "Proprietary Rights", body: "All logos, design layouts, graphics, domain assets, proprietary databases, campaign concepts, and text on this Platform are the exclusive intellectual property of Collabind or its licensors, protected under the Copyright Act, 1957, and the Trade Marks Act, 1999." },
      { label: "Restricted Use", body: "No party may scrape, harvest, reproduce, reverse-engineer, distribute, or frame any platform data, creator roster lists, or commercial copy without prior express written consent from Collabind." },
      { label: "Third-Party Trademarks", body: "Third-party logos displayed on the Platform belong entirely to their respective owners and are referenced solely for identification, descriptive, or nominative purposes." },
    ],
  },
  {
    title: "Non-Circumvention",
    intro: [
      "Any brand, business owner, or creator who accesses, connects with, or discovers opportunities through the Collabind Platform agrees not to directly or indirectly circumvent, bypass, or solicit direct commercial contracts with introduced parties without Collabind's express written authorization. All campaigns initiated through our Platform must be administered and accounted for through Collabind.",
    ],
  },
  {
    title: "Comprehensive Limitation of Liability",
    intro: ["To the maximum extent permitted by applicable Indian law:"],
    items: [
      { label: "“As-Is” Provision", body: "The Platform is provided on an “as is” and “as available” basis without warranties of any kind, whether express, statutory, or implied." },
      { label: "No Guarantee of Commercial Outcomes", body: "Collabind facilitates marketing partnerships and creator coordination; we do not warrant or guarantee specific audience reach, conversion rates, follower growth, revenue increases, or tenant occupancy levels." },
      { label: "Exclusion of Damages", body: "In no event shall Collabind, its founders, operators, or affiliates be liable for any indirect, incidental, punitive, special, or consequential damages—including loss of profits, data corruption, brand reputation, service interruptions, or business disruptions—arising out of your use or inability to use the Platform." },
      { label: "Aggregate Liability Cap", body: "Collabind’s total aggregate liability for any direct claims arising under these terms shall not exceed the actual fees retained by Collabind for the specific deliverable giving rise to the dispute, or ₹5,000 (Five Thousand Rupees), whichever is lower." },
    ],
  },
  {
    title: "Indemnification",
    intro: [
      "You agree to indemnify, defend, and hold harmless Collabind, its operators, co-founders, team members, and representatives from and against any third-party claims, legal disputes, losses, liabilities, fines, penalties, costs, and expenses (including advocate and legal fees) arising from:",
    ],
    items: [
      { body: "Your breach or violation of this Policy and Terms." },
      { body: "Any inaccurate, unlawful, infringing, or misleading information submitted by you." },
      { body: "Any direct contract, property dispute, physical damage, service failure, or financial default between you and third-party creators, guests, or clients introduced via Collabind." },
    ],
  },
  {
    title: "Data Retention, Security, and User Rights",
    items: [
      { label: "Security Practices", body: "We deploy reasonable physical, managerial, and electronic protocols to safeguard data integrity against unauthorized alteration, theft, or access." },
      { label: "Data Retention", body: "Information is retained only as long as commercially necessary to deliver services, execute contracts, or satisfy statutory tax and financial retention laws." },
      { label: "Data Principal Rights", body: "In accordance with the DPDPA, 2023, you have the right to request access to, correction of, or updating of your personal data, or register a grievance with our designated officer." },
    ],
  },
  {
    title: "Grievance Redressal Mechanism",
    intro: [
      "Pursuant to the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, complaints or privacy concerns may be directed to our designated Grievance Officer:",
    ],
    items: [
      { label: "Platform / Enterprise", body: "Collabind" },
      { label: "Grievance Officer", body: "Anushka Bhattacharyya" },
      {
        label: "Official Grievance Email",
        body: (
          <>
            <a className="text-accent hover:underline" href="mailto:legal@collabind.com">
              legal@collabind.com
            </a>{" "}
            (or your primary agency contact email)
          </>
        ),
      },
      { label: "Headquarters / Office", body: "Bengaluru, Karnataka, India" },
      { label: "Response Timeline", body: "Acknowledged within 48 hours and investigated within statutory timelines." },
    ],
  },
  {
    title: "Dispute Resolution, Governing Law & Jurisdiction",
    items: [
      { label: "Negotiation & Mediation", body: "Any dispute, controversy, or claim arising out of or relating to this document shall first be addressed through good-faith mutual discussions." },
      { label: "Governing Law", body: "This document and any related operational claims are strictly governed by and construed under the laws of the Republic of India." },
      { label: "Exclusive Jurisdiction", body: "Both parties agree to submit irrevocably to the exclusive jurisdiction of the competent civil courts in Bengaluru, Karnataka, India, waiving any defense of inconvenient forum." },
    ],
  },
  {
    title: "Modifications and Severability",
    items: [
      { label: "Modifications", body: "We reserve the unilateral right to update, amend, or modify this Policy at any time. Updates become effective immediately upon publication on this URL. Continued use of our Platform constitutes unequivocal acceptance." },
      { label: "Severability", body: "If any provision of this document is determined by a court of competent jurisdiction to be void, unlawful, or unenforceable, that specific clause shall be severed, and the remaining provisions shall continue in full legal force and effect." },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="atmosphere pt-28 pb-20 lg:pt-32 lg:pb-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Effective September 29, 2026"
          title="Privacy Policy & Platform Terms"
          description={`The sections below set out how ${siteConfig.company.name} handles information and the terms for using the Platform.`}
        />

        <nav aria-label="Jump to a section" className="mt-6 flex gap-4 text-sm">
          <a href="#privacy-policy" className="text-accent hover:underline">
            Privacy
          </a>
          <a href="#platform-terms" className="text-accent hover:underline">
            Platform terms
          </a>
        </nav>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink-muted">
          {sections.map((section, i) => (
            <section key={section.title} id={section.id} className="scroll-mt-28">
              <h3 className="text-lg text-ink">
                {String(i + 1).padStart(2, "0")}. {section.title}
              </h3>
              {section.intro?.map((p, j) => (
                <p key={j} className="mt-2">
                  {p}
                </p>
              ))}
              {section.items && (
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {section.items.map((item, j) => (
                    <li key={j}>
                      {item.label && <strong className="text-ink">{item.label}:</strong>}{" "}
                      {item.body}
                      {item.children && (
                        <ul className="mt-2 list-[circle] space-y-1 pl-5">
                          {item.children.map((child, k) => (
                            <li key={k}>{child}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {section.outro?.map((p, j) => (
                <p key={j} className="mt-3">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/" variant="secondary">
            ← Back to home
          </Button>
        </div>
      </Container>
    </div>
  );
}
