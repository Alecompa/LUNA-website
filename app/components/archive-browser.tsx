"use client";
import { useState } from "react";
import LegacyContent from "./legacy-content";
import { plainTitle } from "@/lib/paths";
type Section = { year: string; html: string };
export default function ArchiveBrowser({ sections, kind }: { sections: Section[]; kind: string }) {
  const [query, setQuery] = useState("");
  const years = sections.filter((s) => s.year !== "Overview");
  const visible = years.filter((s) => plainTitle(s.html).toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <div className="toolbar">
        <span className="count" style={{ margin: 0 }}>{visible.length} years</span>
        <input type="search" className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Author, supervisor, reaction" aria-label={`Search ${kind}`} />
      </div>
      <div className="pub-list">
        {visible.map((s) => (
          <section className="pub-year" key={s.year}>
            <h2>{s.year}</h2>
            <LegacyContent html={s.html} className="archive" />
          </section>
        ))}
        {!visible.length && <div className="empty-state">Nothing matches.</div>}
      </div>
    </>
  );
}
