"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Stage, StageId } from "@/lib/content";
import { networkFor } from "@/lib/networks";
import { reactionHtml } from "@/lib/format";
import NetworkChart, { type ExpInfo } from "./network-chart";

export type StageColumn = Stage & { items: { id: string; title: string; live: boolean }[] };

/** Stage columns that open an interactive reaction network underneath. */
export default function StageExplorer({ columns, exps }: { columns: StageColumn[]; exps: Record<string, ExpInfo> }) {
  const [open, setOpen] = useState<StageId | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const current = columns.find((c) => c.id === open);
  const network = open ? networkFor(open) : undefined;

  // Deep link: /about/?network=cno#networks opens that network.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("network");
    if (q && columns.some((c) => c.id === q)) setOpen(q as StageId);
  }, [columns]);

  const toggle = (id: StageId) => {
    const next = open === id ? null : id;
    setOpen(next);
    if (next) {
      // Bring the opened chart into view once it starts expanding.
      window.setTimeout(() => {
        const r = panel.current?.getBoundingClientRect();
        if (r && r.top > window.innerHeight * 0.55) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  return (
    <>
      <div className="stages">
        {columns.map((s) => (
          <section
            key={s.id}
            className={`stage ${open === s.id ? "open" : ""} ${open && open !== s.id ? "muted-col" : ""}`}
            style={{ "--c": s.color } as React.CSSProperties}
          >
            <button
              className="stage-toggle"
              aria-expanded={open === s.id}
              aria-controls="stage-network"
              onClick={() => toggle(s.id)}
            >
              <span className="t">{s.temperature}</span>
              <h3>{s.name}</h3>
              <p>{s.where}</p>
              <span className="stage-cta">
                {open === s.id ? "Close network" : "Explore network"} <ChevronDown size={14} />
              </span>
            </button>
            <ul>
              {s.items.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/experiments/${e.id}/`}
                    className={e.live ? "live" : undefined}
                    dangerouslySetInnerHTML={{ __html: reactionHtml(e.title) }}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="temp-axis" aria-hidden>
        <span>cooler</span>
        <span />
        <span>hotter</span>
      </div>
      <div id="stage-network" ref={panel} className={`stage-panel ${network ? "is-open" : ""}`} aria-hidden={!network}>
        <div>
          {network && current && <NetworkChart network={network} color={current.color} exps={exps} />}
        </div>
      </div>
    </>
  );
}
