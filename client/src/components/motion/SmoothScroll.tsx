"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

export function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    if (prefersReducedMotion()) {
      ScrollTrigger.clearScrollMemory?.();
      return;
    }

    // Native touch scroll on phones — Lenis syncTouch fights horizontal carousels
    const desktopMq = window.matchMedia("(min-width: 768px)");
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;
    let refreshTimers: number[] = [];
    let onClick: ((e: MouseEvent) => void) | null = null;
    let onLoad: (() => void) | null = null;
    let onResize: (() => void) | null = null;

    const teardown = () => {
      if (onClick) document.removeEventListener("click", onClick);
      if (onLoad) window.removeEventListener("load", onLoad);
      if (onResize) window.removeEventListener("resize", onResize);
      refreshTimers.forEach((id) => window.clearTimeout(id));
      refreshTimers = [];
      if (ticker) gsap.ticker.remove(ticker);
      ticker = null;
      onClick = null;
      onLoad = null;
      onResize = null;
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      lenis?.destroy();
      lenis = null;
    };

    const setup = () => {
      teardown();
      if (!desktopMq.matches) {
        ScrollTrigger.refresh();
        return;
      }

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
      refreshTimers = [400, 1200, 2500].map((ms) => window.setTimeout(refresh, ms));
      onLoad = refresh;
      onResize = refresh;
      window.addEventListener("load", onLoad);
      window.addEventListener("resize", onResize);

      onClick = (e: MouseEvent) => {
        if (!lenis) return;
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
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

        const el = document.querySelector(hash);
        if (!el) return;

        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, {
          offset: -80,
          duration: 1.55,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
        history.pushState(null, "", hash);
      };

      document.addEventListener("click", onClick);
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
