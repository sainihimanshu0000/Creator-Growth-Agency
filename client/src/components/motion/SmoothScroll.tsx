"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import {
  gsap,
  registerGsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "@/lib/motion";

/** Read current header offset from CSS variable (single source of truth) */
function getHeaderOffset(): number {
  if (typeof window === "undefined") return 88;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-offset")
    .trim();
  if (!raw) return 88;
  if (raw.endsWith("rem")) return parseFloat(raw) * 16;
  if (raw.endsWith("px")) return parseFloat(raw);
  return parseFloat(raw) || 88;
}

export function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    if (prefersReducedMotion()) {
      ScrollTrigger.clearScrollMemory?.();
      return;
    }

    const desktopMq = window.matchMedia("(min-width: 768px)");
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;
    let refreshTimers: number[] = [];
    let onClick: ((e: MouseEvent) => void) | null = null;
    let onHashChange: (() => void) | null = null;
    let onLoad: (() => void) | null = null;
    let onResize: (() => void) | null = null;

    /** Scroll to hash target with correct header offset */
    const scrollToHash = (hash: string, smooth = true): boolean => {
      if (!hash || hash === "#") return false;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return false;

      const offset = getHeaderOffset();

      if (lenis) {
        lenis.scrollTo(el, {
          offset: -offset,
          duration: 1.55,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top,
          behavior: smooth ? "smooth" : "auto",
        });
      }
      return true;
    };

    const teardown = () => {
      if (onClick) document.removeEventListener("click", onClick);
      if (onHashChange) window.removeEventListener("hashchange", onHashChange);
      if (onLoad) window.removeEventListener("load", onLoad);
      if (onResize) window.removeEventListener("resize", onResize);
      refreshTimers.forEach((id) => window.clearTimeout(id));
      refreshTimers = [];
      if (ticker) gsap.ticker.remove(ticker);
      ticker = null;
      onClick = null;
      onHashChange = null;
      onLoad = null;
      onResize = null;
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      lenis?.destroy();
      lenis = null;
    };

    const setup = () => {
      teardown();

      // ===== MOBILE: native scroll + custom anchor offset =====
      if (!desktopMq.matches) {
        ScrollTrigger.refresh();

        onClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          const anchor = target?.closest?.(
            "a[href*='#']"
          ) as HTMLAnchorElement | null;
          if (!anchor) return;

          const href = anchor.getAttribute("href");
          if (!href) return;

          const hashIndex = href.indexOf("#");
          if (hashIndex === -1) return;
          const hash = href.slice(hashIndex);
          if (hash === "#") return;

          const path = href.slice(0, hashIndex);
          const samePage =
            !path ||
            path === window.location.pathname ||
            href.startsWith("#") ||
            href.startsWith("/#");
          if (!samePage) return;

          if (scrollToHash(hash, true)) {
            e.preventDefault();
            history.pushState(null, "", hash);
          }
        };

        onHashChange = () => {
          const hash = window.location.hash;
          if (hash) scrollToHash(hash, true);
        };

        document.addEventListener("click", onClick);
        window.addEventListener("hashchange", onHashChange);
        return;
      }

      // ===== DESKTOP: Lenis smooth scroll =====
      lenis = new Lenis({
        lerp: 0.075,
        duration: 1.45,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.15,
        syncTouch: false,
        infinite: false,
      });

      (window as Window & { __lenis?: Lenis }).__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      ticker = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const refresh = () => ScrollTrigger.refresh();
      refreshTimers = [400, 1200, 2500].map((ms) =>
        window.setTimeout(refresh, ms)
      );
      onLoad = refresh;
      onResize = refresh;
      window.addEventListener("load", onLoad);
      window.addEventListener("resize", onResize);

      onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest?.(
          "a[href*='#']"
        ) as HTMLAnchorElement | null;
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        const hashIndex = href.indexOf("#");
        if (hashIndex === -1) return;
        const hash = href.slice(hashIndex);
        if (hash === "#") return;

        const path = href.slice(0, hashIndex);
        const samePage =
          !path ||
          path === window.location.pathname ||
          href.startsWith("#") ||
          href.startsWith("/#");
        if (!samePage) return;

        if (scrollToHash(hash, true)) {
          e.preventDefault();
          history.pushState(null, "", hash);
        }
      };

      onHashChange = () => {
        const hash = window.location.hash;
        if (hash) scrollToHash(hash, true);
      };

      document.addEventListener("click", onClick);
      window.addEventListener("hashchange", onHashChange);

      // Handle initial hash (deep-link / cross-page nav)
      const initialHash = window.location.hash;
      if (initialHash && initialHash !== "#") {
        window.setTimeout(() => scrollToHash(initialHash, false), 150);
      }
    };

    setup();
    desktopMq.addEventListener("change", setup);

    return () => {
      desktopMq.removeEventListener("change", setup);
      teardown();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}