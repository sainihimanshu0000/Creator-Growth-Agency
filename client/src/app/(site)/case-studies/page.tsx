import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `Selected campaign outcomes from ${siteConfig.company.name}.`,
};

export default function CaseStudiesPage() {
  return (
    <div className="atmosphere min-h-screen pt-28 pb-20 px-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-ink">
        Case Studies
      </h1>
      <p className="mt-4 text-subtext max-w-md leading-relaxed">
        Our featured case studies and campaign ROI breakdowns are available upon request during partnership discussions.
      </p>
      <Link
        href="/#contact-hub"
        className="mt-8 btn bg-purple text-canvas px-6 py-3 rounded-xl font-bold text-sm"
      >
        Request Campaign Portfolio →
      </Link>
    </div>
  );
}
