"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (reduced || !headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: "power3.out" }
    );
  }, [reduced]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-canvas/55 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[4.25rem] lg:px-10">
        <Link
          href="/#home"
          className="inline-flex min-h-11 items-center"
          onClick={() => setOpen(false)}
          aria-label={siteConfig.company.name}
        >
          <BrandLogo variant="wordmark" priority className="h-7 sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {siteConfig.nav.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/#contact" size="sm">
            {siteConfig.ctas.primary}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span className={`block h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-5 bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] overflow-y-auto border-t border-line bg-canvas/98 backdrop-blur-xl lg:hidden"
        >
          <div className="flex min-h-full flex-col gap-1 px-5 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 font-mono text-sm uppercase tracking-[0.14em] text-ink-muted hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button href="/#contact" className="w-full" onClick={() => setOpen(false)}>
                {siteConfig.ctas.primary}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
