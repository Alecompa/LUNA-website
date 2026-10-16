"use client";
import { useState } from "react";
import LegacyContent from "./legacy-content";
import { plainTitle } from "@/lib/paths";
type Section = { year: string; html: string };
export default function ArchiveBrowser({
  sections,
  kind,
}: {
  sections: Section[];
  kind: string;
}) {
  const [query, setQuery] = useState(""),
    [year, setYear] = useState("all");
  const overview = sections.filter((s) => s.year === "Overview"),
    years = sections.filter((s) => s.year !== "Overview");
  // Filter complete year sections so bibliographic context and full author lists remain intact.
  const visible = years.filter(
    (s) =>
      (year === "all" || s.year === year) &&
      plainTitle(s.html).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      {overview.map((s, i) => (
        <details className="archive-overview" key={i}>
          <summary>
            {kind === "publications"
              ? "Reviews, access & related coverage"
              : "About the thesis archive"}
          </summary>
          <LegacyContent html={s.html} />
        </details>
      ))}
      <div className="archive-search">
        <label>
          <span className="sr-only">Search {kind}</span>
          <input
            type="search"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author or reaction"
          />
        </label>
        <label>
          <span className="sr-only">Filter by year</span>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="all">All years</option>
            {years.map((s) => (
              <option key={s.year}>{s.year}</option>
            ))}
          </select>
        </label>
        <button
          className="button button-outline"
          onClick={() => {
            setQuery("");
            setYear("all");
          }}
        >
          Reset filters
        </button>
      </div>
      <p aria-live="polite" className="result-count">
        {visible.length} year sections
        {query ? " containing “" + query + "”" : ""} · full references and
        author lists retained
      </p>
      {visible.map((s, i) => (
        <section className="archive-year" key={i}>
          <h2>{s.year}</h2>
          <LegacyContent html={s.html} />
        </section>
      ))}
      {!visible.length && (
        <div className="empty-state">
          No matching year sections. Try another author, reaction or year.
        </div>
      )}
    </>
  );
}
