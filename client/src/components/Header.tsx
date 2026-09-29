"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onOpenModal?: (tab: "brand" | "creator") => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-2.5 sm:px-6">
      <div className="max-w-6xl mx-auto mt-2 sm:mt-4">
        <nav
          id="nav"
          className={`glass rounded-xl sm:rounded-2xl px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between shadow-ink/5 transition-all duration-300 ${
            scrolled ? "bg-card/90 shadow-lg border-clay/60" : "bg-card/75"
          }`}
        >
          <Link href="#top" className="inline-flex items-center shrink-0" aria-label="Collabind home">
            <Image
              src="/brand/logo-wordmark-on-dark.png"
              alt="Collabind"
              width={150}
              height={40}
              className="h-7 sm:h-9 w-auto rounded-lg object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="#roster"
              className="nav-link px-4 py-2 rounded-xl text-sm font-medium text-subtext hover:text-purple hover:bg-purple/5 transition"
            >
              Creators
            </Link>
            <Link
              href="#bridge"
              className="nav-link px-4 py-2 rounded-xl text-sm font-medium text-subtext hover:text-purple hover:bg-purple/5 transition"
            >
              The Bridge
            </Link>
            <Link
              href="#niches"
              className="nav-link px-4 py-2 rounded-xl text-sm font-medium text-subtext hover:text-purple hover:bg-purple/5 transition"
            >
              Creator Niches
            </Link>
            <Link
              href="#playbooks"
              className="nav-link px-4 py-2 rounded-xl text-sm font-medium text-subtext hover:text-purple hover:bg-purple/5 transition"
            >
              Playbooks
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => (onOpenModal ? onOpenModal("creator") : null)}
              className="hidden sm:inline-block text-xs sm:text-sm font-semibold text-subtext hover:text-purple transition px-2.5 py-2 cursor-pointer"
            >
              Get Paid Collabs
            </button>

            <button
              type="button"
              onClick={() => (onOpenModal ? onOpenModal("brand") : null)}
              className="btn magnetic glow-orange inline-flex bg-orange text-[#090D10] text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl cursor-pointer"
            >
              <span className="sp">Promote My Brand</span>
            </button>

            <button
              id="menuBtn"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-ink hover:bg-ink/5 transition cursor-pointer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto lg:hidden">
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-[4.5rem] bg-canvas/80 backdrop-blur-md z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="mobileMenu"
              className="relative z-50 glass rounded-xl mt-2 p-3 shadow-2xl border border-clay/60 space-y-1.5 animate-fadeIn"
            >
              <Link
                href="#roster"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-medium text-subtext hover:text-purple hover:bg-purple/5 transition text-sm"
              >
                Creators
              </Link>
              <Link
                href="#bridge"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-medium text-subtext hover:text-purple hover:bg-purple/5 transition text-sm"
              >
                The Bridge
              </Link>
              <Link
                href="#niches"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-medium text-subtext hover:text-purple hover:bg-purple/5 transition text-sm"
              >
                Creator Niches
              </Link>
              <Link
                href="#playbooks"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-medium text-subtext hover:text-purple hover:bg-purple/5 transition text-sm"
              >
                Playbooks
              </Link>
              <div className="pt-2 border-t border-clay/40 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenModal) onOpenModal("creator");
                  }}
                  className="w-full text-center px-4 py-2.5 rounded-xl font-semibold text-ink bg-clay/40 hover:bg-clay/60 transition text-xs"
                >
                  Get Paid Collabs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenModal) onOpenModal("brand");
                  }}
                  className="w-full text-center px-4 py-2.5 rounded-xl font-bold text-[#090D10] bg-orange hover:bg-orange/90 transition text-xs"
                >
                  Promote My Brand →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}