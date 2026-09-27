import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `Selected campaign outcomes from ${siteConfig.company.name}.`,
};

export default function CaseStudiesPage() {
  notFound();
}
