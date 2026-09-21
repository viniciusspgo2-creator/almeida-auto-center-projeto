"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Robust visit tracking — fires once per path change (the API dedupes
 * repeated hits from the same visitor inside a time window and ignores bots).
 */
export function VisitTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string>("");

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || "",
    });

    const send = () => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    };

    // Slight delay so SPA quick-bounces (instant back/forward) don't inflate
    const t = setTimeout(send, 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
