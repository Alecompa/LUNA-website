"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { STAGES, stageById } from "@/lib/content";
import type { Experiment } from "@/lib/site";
import { reactionHtml } from "@/lib/format";
import ExperimentCard from "./experiment-card";

const FACILITIES = ["Bellotti IBF", "LUNA 400 kV", "LUNA 50 kV"];

export default function ExperimentBrowser({ items }: { items: Experiment[] }) {
  const [stage, setStage] = useState("all");
  const [facility, setFacility] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (STAGES.some((s) => s.id === h)) setStage(h);
  }, []);
  const match = (e: Experiment) =>
    (stage === "all" || e.stage === stage) &&
    (facility === "all" || e.facility === facility) &&
    `${e.name} ${e.pi} ${e.facility}`.toLowerCase().includes(query.toLowerCase());
  const ongoing = useMemo(() => items.filter((e) => e.status === "ongoing" && match(e)), [items, stage, facility, query]); // eslint-disable-line react-hooks/exhaustive-deps
  const past = useMemo(() => items.filter((e) => e.status === "past" && match(e)), [items, stage, facility, query]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="toolbar">
        <div className="seg" role="group" aria-label="Burning stage">
          <button aria-pressed={stage === "all"} onClick={() => setStage("all")}>All</button>
          {STAGES.map((s) => (
            <button
              key={s.id}
              aria-pressed={stage === s.id}
              onClick={() => setStage(s.id)}
              style={{ "--c": s.color } as React.CSSProperties}
            >
              <i />
              {s.short}
            </button>
          ))}
        </div>
        <div className="seg" style={{ gap: 8 }}>
          <select className="select" value={facility} onChange={(e) => setFacility(e.target.value)} aria-label="Facility">
            <option value="all">All facilities</option>
            {FACILITIES.map((f) => <option key={f}>{f}</option>)}
          </select>
          <input className="search" placeholder="Search reaction or PI" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search experiments" />
        </div>
      </div>

      {ongoing.length > 0 && (
        <>
          <h2 className="block-title" style={{ marginTop: 24 }} id="ongoing">Ongoing · {ongoing.length}</h2>
          <div className="exp-grid">
            {ongoing.map((e) => <ExperimentCard key={e.id} e={e} />)}
          </div>
        </>
      )}
      <h2 className="block-title" id="past">Completed · {past.length}</h2>
      <div className="exp-list">
        {past.map((e) => (
          <Link key={e.id} href={`/experiments/${e.id}/`} className="exp-mini" style={{ "--c": stageById(e.stage).color } as React.CSSProperties}>
            <strong dangerouslySetInnerHTML={{ __html: reactionHtml(e.title) }} />
            <span><i />{stageById(e.stage).short} · {e.facility}</span>
          </Link>
        ))}
        {!past.length && !ongoing.length && <div className="empty-state">No experiments match.</div>}
      </div>
    </>
  );
}
