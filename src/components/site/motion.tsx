"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal engine — a single IntersectionObserver that watches every
 * `.reveal` element and adds `.is-visible`, exactly like the original
 * `main.js`, but re-scanned whenever the route changes.
 */
export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible):not(.reveal--visible)")
    );

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/**
 * Animated counter (`.reveal`-aware). Counts up when scrolled into view.
 */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const duration = 1100;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(to * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${to}${suffix}`}
    </span>
  );
}
