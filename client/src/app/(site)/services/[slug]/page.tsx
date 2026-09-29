import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return [{ slug: "gaming" }, { slug: "tech" }];
}

export function generateMetadata(): Metadata {
  return { title: "Services · Collabind" };
}

export default function ServicePage() {
  return (
    <div className="atmosphere min-h-screen pt-28 pb-20 px-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-ink">
        Creator Services
      </h1>
      <p className="mt-4 text-subtext max-w-md leading-relaxed">
        Explore our campaign models, verticals, and roster playbooks on the main site.
      </p>
      <Link
        href="/#niches"
        className="mt-8 btn bg-purple text-canvas px-6 py-3 rounded-xl font-bold text-sm"
      >
        Explore Verticals →
      </Link>
    </div>
  );
}
