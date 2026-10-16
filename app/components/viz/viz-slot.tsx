"use client";
import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Mount point for interactive or 3D scenes (e.g. a three.js model of the
 * accelerator or an animated reaction network). The static `children` are
 * rendered at build time and stay as the fallback; a registered scene is
 * code-split and only loaded in the browser once the slot scrolls into view,
 * so heavy libraries never affect the static export or first paint.
 *
 * To add one: register a loader below and use <VizSlot scene="name">…</VizSlot>.
 */
const scenes: Record<string, () => Promise<{ default: ComponentType }>> = {
  // accelerator: () => import("./scenes/accelerator"),
};

export default function VizSlot({
  scene,
  children,
}: {
  scene: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<ComponentType | null>(null);
  useEffect(() => {
    const load = scenes[scene];
    if (!load || !ref.current) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      load().then((m) => setScene(() => m.default));
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [scene]);
  return <div ref={ref}>{Scene ? <Scene /> : children}</div>;
}
