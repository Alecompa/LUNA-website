"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { plainTitle } from "@/lib/paths";
type Experiment = {
  id: string;
  title: string;
  status: string;
  facility: string;
  excerpt: string;
  pi: string;
};
export default function ExperimentBrowser({ items }: { items: Experiment[] }) {
  const [status, setStatus] = useState("ongoing"),
    [query, setQuery] = useState("");
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (["ongoing", "past", "all"].includes(hash)) setStatus(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const filtered = items.filter(
    (e) =>
      (status === "all" || e.status === status) &&
      `${plainTitle(e.title)} ${e.facility} ${e.pi} ${e.excerpt}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="experiment-tools">
        <div className="filter-tabs" aria-label="Experiment status">
          {[
            ["ongoing", "Ongoing"],
            ["past", "Past"],
            ["all", "All experiments"],
          ].map(([s, label]) => (
            <button
              key={s}
              aria-pressed={status === s}
              onClick={() => {
                setStatus(s);
                window.history.replaceState(null, "", "#" + s);
              }}
            >
              {label}{" "}
              <span>
                ({items.filter((e) => s === "all" || e.status === s).length})
              </span>
            </button>
          ))}
        </div>
        <label className="relative">
          <span className="sr-only">Search experiments</span>
          <Search size={15} className="absolute right-3 top-3.5" />
          <input
            className="search-input"
            placeholder="Reaction, investigator or facility"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} experiments · status follows the supplied LUNA
        programme
      </p>
      <div className="experiment-results">
        {filtered.map((e) => (
          <Link
            href={"/experiments/" + e.id + "/"}
            key={e.id}
            className="experiment-card"
          >
            <div className="card-status">
              <span>
                {e.status === "ongoing" ? "● Ongoing" : "Past programme"}
              </span>
              <ArrowUpRight size={17} />
            </div>
            <h2 dangerouslySetInnerHTML={{ __html: e.title }} />
            <p>
              {e.pi
                ? `Principal investigator${e.pi.includes(",") ? "s" : ""}: ${e.pi}`
                : "Published measurements and references"}
            </p>
            <footer>
              <span>{e.facility}</span>
              <span>Explore →</span>
            </footer>
          </Link>
        ))}
        {!filtered.length && (
          <div className="empty-state">
            No experiments match your search.{" "}
            <button
              className="text-link"
              onClick={() => {
                setQuery("");
                setStatus("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
