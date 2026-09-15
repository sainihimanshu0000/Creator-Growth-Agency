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

    const lenis = new Lenis({
      // Softer, more cinematic inertia
      lerp: 0.075,
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.15,
      syncTouch: true,
      syncTouchLerp: 0.075,
      infinite: false,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // Keep ScrollTrigger in sync with Lenis virtual scroll
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Recalculate pin distances after fonts/images settle
    const refresh = () => ScrollTrigger.refresh();
    const refreshTimers = [400, 1200, 2500].map((ms) => window.setTimeout(refresh, ms));
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    const onClick = (e: MouseEvent) => {
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

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      refreshTimers.forEach((id) => window.clearTimeout(id));
      gsap.ticker.remove(ticker);
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
