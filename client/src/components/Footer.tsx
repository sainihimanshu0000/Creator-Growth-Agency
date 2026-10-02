"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  onOpenModal?: (tab: "brand" | "creator") => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="border-t border-clay/30 pt-16 pb-10 bg-card/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="#top" className="inline-flex items-center" aria-label="Collabind home">
              <Image
                src="/brand/logo-wordmark-on-dark.png"
                alt="Collabind"
                width={407}
                height={68}
                className="h-10 w-auto sm:h-11 rounded-lg object-contain"
              />
            </Link>
            <p className="mt-5 text-sm text-subtext max-w-sm leading-relaxed">
              The Ultimate Creator-Brand Bridge. We cut out the DM spam, loose contracts, and late invoices so you can build.
            </p>
            <a
              href="mailto:partnerships@collabind.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple hover:text-purple transition"
            >
              partnerships@collabind.com <span aria-hidden="true">→</span>
            </a>
          </div>
          <div>
            <h4 className="text-xs font-bold text-bordo font-display mb-5 uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-3.5 text-sm text-subtext">
              <li>
                <button
                  type="button"
                  onClick={() => (onOpenModal ? onOpenModal("brand") : null)}
                  className="hover:text-purple transition cursor-pointer text-left"
                >
                  For Brands
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => (onOpenModal ? onOpenModal("creator") : null)}
                  className="hover:text-purple transition cursor-pointer text-left"
                >
                  For Creators
                </button>
              </li>
              <li>
                <Link href="#playbooks" className="hover:text-purple transition">
                  Campaign Models
                </Link>
              </li>
              <li>
                <Link href="#niches" className="hover:text-purple transition">
                  Creator Niches
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-bordo font-display mb-5 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3.5 text-sm text-subtext">
              <li>
                <Link href="#bridge" className="hover:text-purple transition">
                  The Bridge
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-purple transition">
                  Privacy &amp; Terms
                </Link>
              </li>
              <li>
                <a href="mailto:partnerships@collabind.com" className="hover:text-purple transition">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-clay/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-subtext/80">
          <p>© 2026 Collabind. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Zero Friction · Zero Fluff</p>
        </div>
      </div>
    </footer>
  );
}
