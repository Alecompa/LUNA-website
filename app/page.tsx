import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { asset, experiments, legacy, newsTitles } from "@/lib/site";
import { FIGURES, PHOTOS, SITE_FACTS } from "@/lib/content";
import { highlights, publications } from "@/lib/publications";
import { formatDate } from "@/lib/format";
import { Fig, Rx, StageChip } from "./components/ui";
import ExperimentCard from "./components/experiment-card";
import { institutions } from "@/lib/people";
import StageMap from "./components/viz/stage-map";
import VizSlot from "./components/viz/viz-slot";

export default function Home() {
  const ongoing = experiments.filter((e) => e.status === "ongoing");
  const latest = publications[0];
  const featured = highlights.filter((p) => p.figure).slice(0, 3);
  const news = [...legacy.news].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <section className="hero">
        <img src={asset(PHOTOS.hero)} alt="The LUNA accelerator tube under Gran Sasso" />
        <div className="shell hero-content">
          <p className="label" style={{ color: "rgba(255,255,255,.7)" }}>
            INFN · Laboratori Nazionali del Gran Sasso
          </p>
          <h1 className="display" style={{ marginTop: 18 }}>
            The stars, from underground.
          </h1>
          <p className="lead">
            Nuclear reactions that power stars and forge the elements, measured
            at the energies where they really happen.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/experiments/">
              Experiments <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-ghost" href="/about/" style={{ background: "rgba(255,255,255,.08)", color: "#fff", borderColor: "rgba(255,255,255,.25)" }}>
              Why underground
            </Link>
          </div>
          <div className="hero-stats">
            {SITE_FACTS.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest result */}
      <section className="section-sm">
        <div className="shell">
          <Link href={`/publications/${latest.slug}/`} className="card latest-card">
            <div>
              <span className="label" style={{ color: "var(--red)" }}>Latest · {latest.journal.split("·")[0]}</span>
              <Rx as="h3" className="h3" html={latest.titleHtml} />
            </div>
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      {/* Ongoing programme */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="label">Now running</span>
              <h2 className="h2">Ongoing experiments</h2>
            </div>
            <Link className="link" href="/experiments/">
              Full programme <ArrowRight size={16} />
            </Link>
          </div>
          <div className="exp-grid">
            {ongoing.slice(0, 3).map((e) => (
              <ExperimentCard key={e.id} e={e} />
            ))}
          </div>
          <div className="exp-list mini-2">
            {ongoing.slice(3).map((e) => (
              <Link key={e.id} href={`/experiments/${e.id}/`} className="exp-mini" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ flexDirection: "column", alignItems: "start", gap: 2 }}>
                  <Rx as="strong" html={e.title} />
                  <span>{e.facility}</span>
                </span>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programme along the life of a star */}
      <section className="section night">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="label">Thirty-five years of measurements</span>
              <h2 className="h2">From the Big Bang to carbon burning</h2>
            </div>
            <Link className="link" href="/about/#networks">
              The burning networks <ArrowRight size={16} />
            </Link>
          </div>
          <VizSlot scene="stage-map">
            <StageMap />
          </VizSlot>
        </div>
      </section>

      {/* Why underground */}
      <section className="section">
        <div className="shell feature">
          <Fig figure={FIGURES.depth} />
          <div>
            <span className="label">Why underground</span>
            <h3>A million times quieter</h3>
            <p>
              At stellar energies a reaction may fire once a day. Under 1.4 km
              of rock, cosmic rays that would swamp the signal at the surface
              almost vanish.
            </p>
            <div className="stat-inline">
              <div><strong>10⁻⁶</strong><span>muon flux</span></div>
              <div><strong>±300 eV</strong><span>beam energy</span></div>
              <div><strong>pb–fb</strong><span>cross sections</span></div>
            </div>
            <Link className="link" href="/about/" style={{ marginTop: 28 }}>
              How it works <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section panel-bg">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="label">Results</span>
              <h2 className="h2">Highlights</h2>
            </div>
            <Link className="link" href="/publications/">
              All publications <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-3">
            {featured.map((p) => (
              <Link key={p.slug} href={`/publications/${p.slug}/`} className="card highlight-card">
                <div className="card-media">
                  <img src={asset(p.figure!.src)} alt="" loading="lazy" />
                </div>
                <div className="card-body">
                  <div className="card-top">
                    <StageChip id={p.stage} />
                    <span className="pub-meta">{p.year}</span>
                  </div>
                  <Rx as="h3" html={p.titleHtml} />
                  {p.summary && <p>{p.summary}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Data */}
      <section className="section night">
        <div className="shell split-even">
          <div>
            <span className="label">Open data</span>
            <h2 className="h2" style={{ margin: "14px 0 18px" }}>
              Reaction rates for stellar models
            </h2>
            <p className="lead">
              Tabulated LUNA rates with uncertainty bands, ready to download.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-light" href="/reaction-rates/">
                Open the explorer <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="stats">
            <div><strong>{legacy.rates.length}</strong><span>numerical rate tables</span></div>
            <div><strong>{legacy.rates.reduce((n, r) => n + r.rows.length, 0)}</strong><span>temperature points</span></div>
            <div><strong>±3σ</strong><span>uncertainty bands</span></div>
            <div><strong>CSV</strong><span>and original files</span></div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="label">From the collaboration</span>
              <h2 className="h2">News</h2>
            </div>
            <Link className="link" href="/news/">
              All news <ArrowRight size={16} />
            </Link>
          </div>
          <div className="news-grid">
            {news.map((n) => (
              <Link key={n.id} href={`/news/${n.id}/`} className="card news-card">
                <div className={`card-media ${n.image?.includes("Logo") ? "logo" : ""}`}>
                  {n.image ? <img src={asset(n.image)} alt="" loading="lazy" /> : <img src={asset(PHOTOS.collab2)} alt="" loading="lazy" />}
                </div>
                <div className="card-body">
                  <span className="pub-meta">{formatDate(n.date)}</span>
                  <h3>{newsTitles[n.id]}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="section-sm" style={{ paddingTop: 0, paddingBottom: 112 }}>
        <div className="shell">
          <div className="card collab-card">
            <img src={asset(PHOTOS.collab)} alt="The LUNA collaboration" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 320 }} />
            <div className="card-body" style={{ padding: 40, justifyContent: "center", gap: 16 }}>
              <span className="label">The collaboration</span>
              <h2 className="h2">{institutions.length} institutions, one laboratory</h2>
              <p style={{ fontSize: 16 }}>{[...new Set(institutions.map((i) => i.country))].join(" · ")}</p>
              <div className="hero-actions" style={{ marginTop: 8 }}>
                <Link className="btn btn-dark" href="/collaboration/">People <ArrowRight size={16} /></Link>
                <Link className="btn btn-ghost" href="/work-with-us/">Work with us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
