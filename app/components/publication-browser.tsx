"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { STAGES, METHODS_STAGE, stageById, type StageId } from "@/lib/content";
import { asset } from "@/lib/paths";
import { reactionHtml } from "@/lib/format";

type Item = {
  slug: string; year: string; titleHtml: string; title: string; journal: string;
  authors: string; short: string; stage: StageId; summary?: string; highlight: boolean; thumb?: string;
};
const FILTERS = [...STAGES, METHODS_STAGE];

export default function PublicationBrowser({ items }: { items: Item[] }) {
  const [stage, setStage] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [only, setOnly] = useState(false);
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter(
      (p) =>
        (stage === "all" || p.stage === stage) &&
        (!only || p.highlight) &&
        `${p.title} ${p.journal} ${p.authors}`.toLowerCase().includes(q),
    );
  }, [items, stage, query, only]);
  const years = [...new Set(filtered.map((p) => p.year))];
  return (
    <>
      <div className="toolbar">
        <div className="seg" role="group" aria-label="Topic">
          <button aria-pressed={stage === "all"} onClick={() => setStage("all")}>All</button>
          {FILTERS.map((s) => (
            <button key={s.id} aria-pressed={stage === s.id} onClick={() => setStage(s.id)} style={{ "--c": s.color } as React.CSSProperties}>
              <i />{s.short}
            </button>
          ))}
        </div>
        <div className="seg" style={{ gap: 8 }}>
          <button aria-pressed={only} onClick={() => setOnly(!only)}>★ Highlights</button>
          <input type="search" className="search" placeholder="Title, author, journal" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search publications" />
        </div>
      </div>
      <p className="count" aria-live="polite">{filtered.length} publications</p>
      <div className="pub-list">
        {years.map((y) => (
          <section key={y} className="pub-year">
            <h2>{y}</h2>
            <div className="pub-items">
              {filtered.filter((p) => p.year === y).map((p) => (
                <Link key={p.slug} href={`/publications/${p.slug}/`} className="pub-row" style={{ "--c": stageById(p.stage).color } as React.CSSProperties}>
                  <div>
                    <h3 dangerouslySetInnerHTML={{ __html: reactionHtml(p.titleHtml) }} />
                    <div className="pub-meta">
                      <i />
                      <span>{p.short}</span>
                      {p.highlight && <span className="star">★ Highlight</span>}
                    </div>
                  </div>
                  {p.thumb ? (
                    <div className="pub-thumb"><img src={asset(p.thumb)} alt="" loading="lazy" /></div>
                  ) : <span />}
                </Link>
              ))}
            </div>
          </section>
        ))}
        {!filtered.length && <div className="empty-state">No matching publications.</div>}
      </div>
    </>
  );
}
