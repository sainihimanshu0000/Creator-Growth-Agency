import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [];
}

export function generateMetadata(): Metadata {
  return { title: "Service" };
}

export default function ServicePage() {
  notFound();
}
