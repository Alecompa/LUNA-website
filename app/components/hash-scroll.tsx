"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Keeps #anchor links on target. Images and client components above the
 * anchor can settle after the browser's initial jump, leaving the page at the
 * top or short of the section; re-apply the scroll until layout is stable or
 * the visitor scrolls on their own.
 */
export default function HashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const go = () =>
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    const timers = [0, 150, 500, 1200, 2500].map((d) => window.setTimeout(go, d));
    const stop = () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", go);
    };
    window.addEventListener("load", go, { once: true });
    const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));
    return () => {
      stop();
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, [pathname]);
  return null;
}
