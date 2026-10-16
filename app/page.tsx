import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { asset, experiments, legacy, newsTitles } from "@/lib/site";
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <img
          className="hero-photo"
          src={asset("/images/hero/accelerator.jpg")}
          alt="Beam lines at the LUNA underground laboratory"
        />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="eyebrow light">
            <span className="status-dot" /> GRAN SASSO NATIONAL LABORATORIES ·
            ITALY
          </p>
          <h1>
            The stars,
            <br />
            from underground.
          </h1>
          <p>
            Measuring the nuclear reactions
            <br />
            that shape our Universe.
          </p>
          <Link className="button button-red" href="/experiments/">
            Explore our research <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hero-caption">
          LUNA / UNDERGROUND NUCLEAR ASTROPHYSICS
        </div>
      </section>
      <div className="research-strip">
        <div className="shell">
          <span>
            <b>Since 1991</b> Pioneering underground astrophysics
          </span>
          <span>
            <b>400 kV</b> LUNA accelerator
          </span>
          <span>
            <b>3.5 MV</b> Bellotti Ion Beam Facility
          </span>
        </div>
      </div>
      <section className="shell intro-section">
        <div>
          <p className="eyebrow">A LABORATORY FOR THE UNIVERSE</p>
          <h2>
            Fundamental questions.
            <br />
            Extraordinary conditions.
          </h2>
        </div>
        <div>
          <p>
            Deep beneath the Gran Sasso mountain, LUNA measures nuclear
            reactions that are too rare to study at the Earth’s surface. Our
            experiments connect the physics of atomic nuclei to the lives of
            stars and the origin of the elements.
          </p>
          <Link className="text-link" href="/about/">
            Discover LUNA <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section-tint">
        <div className="shell section-pad">
          <div className="section-head">
            <div>
              <p className="eyebrow">THE EXPERIMENTAL PROGRAMME</p>
              <h2>Inside the laboratory</h2>
            </div>
            <Link className="text-link" href="/experiments/">
              All experiments <ArrowRight size={18} />
            </Link>
          </div>
          <div className="experiment-feature-grid">
            <Link href="/experiments/12c-12c/" className="experiment-feature">
              <img
                src={asset("/images/experiments/12C_12C.jpg")}
                alt="Carbon fusion experiment"
              />
              <div>
                <span className="tag light-tag">
                  BELLOTTI ION BEAM FACILITY
                </span>
                <h3>
                  Carbon burning.
                  <br />
                  Stellar evolution.
                </h3>
                <p>
                  Explore the ¹²C + ¹²C programme <ArrowUpRight size={19} />
                </p>
              </div>
            </Link>
            <div className="experiment-list">
              <p className="eyebrow">ONGOING EXPERIMENTS</p>
              {experiments
                .filter((e) => e.status === "ongoing")
                .map((e) => (
                  <Link key={e.id} href={"/experiments/" + e.id + "/"}>
                    <div>
                      <h3 dangerouslySetInnerHTML={{ __html: e.title }} />
                      <span>{e.facility}</span>
                    </div>
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
              <Link className="text-link" href="/experiments/future/">
                Future programme & facility history <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="rate-promo">
        <div className="shell rate-promo-inner">
          <div>
            <p className="eyebrow light">OPEN SCIENTIFIC DATA</p>
            <h2>
              From measurements
              <br />
              to stellar models.
            </h2>
            <p>
              Explore LUNA reaction rates, their uncertainties
              <br className="desktop-only" /> and the measurements behind them.
            </p>
            <Link className="button button-light" href="/reaction-rates/">
              Explore reaction rates <ArrowRight size={18} />
            </Link>
          </div>
          <Link
            className="rate-preview"
            href="/reaction-rates/"
            aria-label="Open the reaction-rate explorer"
          >
            <div className="plot-top">
              <span>¹³C(α,n)¹⁶O</span>
              <span>REACTION RATE</span>
            </div>
            <svg
              viewBox="0 0 470 235"
              role="img"
              aria-label="Illustrative reaction-rate curve"
            >
              <g stroke="#ffffff18">
                {[40, 85, 130, 175, 220].map((y) => (
                  <path key={y} d={`M20 ${y}H450`} />
                ))}
                {[30, 135, 240, 345, 450].map((x) => (
                  <path key={x} d={`M${x} 20V220`} />
                ))}
              </g>
              <path
                d="M25 218 C100 210 110 170 170 140 S260 100 315 65 S390 35 450 22 L450 44 C390 55 370 70 315 90 S225 137 170 165 S100 231 25 230Z"
                fill="#efb49733"
              />
              <path
                d="M25 224 C100 220 110 183 170 152 S260 119 315 77 S390 45 450 33"
                fill="none"
                stroke="#efb497"
                strokeWidth="3"
              />
            </svg>
            <div className="plot-bottom">
              <span>Temperature / GK</span>
              <span>
                5 datasets <Download size={14} />
              </span>
            </div>
            <small>Illustration · explore the tabulated data →</small>
          </Link>
        </div>
      </section>
      <section className="shell section-pad">
        <div className="section-head">
          <div>
            <p className="eyebrow">FROM THE COLLABORATION</p>
            <h2>News & announcements</h2>
          </div>
          <Link className="text-link" href="/news/">
            All news <ArrowRight size={18} />
          </Link>
        </div>
        <div className="news-grid">
          {[...legacy.news].reverse().map((n, i) => (
            <Link className="news-card" href={"/news/" + n.id + "/"} key={n.id}>
              <div className={"news-image news-image-" + i}>
                {n.image ? (
                  <img src={asset(n.image)} alt="" />
                ) : (
                  <>
                    <span>LUNA</span>
                    <small>OPPORTUNITIES / 2026</small>
                  </>
                )}
              </div>
              <div className="news-meta">
                <span>
                  {i === 0 ? "OPPORTUNITIES" : i === 1 ? "PEOPLE" : "RESEARCH"}
                </span>
                <time dateTime={n.date}>
                  {n.date
                    ? new Date(n.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "From the collaboration"}
                </time>
              </div>
              <h3>{newsTitles[n.id]}</h3>
              <span className="text-link">
                Read article <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="shell community">
        <img
          src={asset("/images/LUNA_collab-3.jpg")}
          alt="Members of the LUNA collaboration"
        />
        <div>
          <p className="eyebrow">THE LUNA COLLABORATION</p>
          <h2>Science across borders.</h2>
          <p>
            Researchers, students and institutions working together on the
            nuclear physics of the cosmos.
          </p>
          <div className="button-row">
            <Link className="button button-dark" href="/collaboration/">
              Meet the collaboration <ArrowRight size={16} />
            </Link>
            <Link className="text-link" href="/work-with-us/">
              Work with us <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
