import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHead, Fig } from "../components/ui";
import { asset } from "@/lib/site";
import { FIGURES, OPEN_QUESTIONS, PHOTOS, TIMELINE } from "@/lib/content";
import StageMap from "../components/viz/stage-map";
export const metadata = { title: "About" };
export default function About() {
  return (
    <>
      <PageHead
        crumbs={[["About"]]}
        title="Measuring the reactions that make stars shine"
        lead="Stars forge the elements through chains of nuclear reactions. LUNA measures them at the energies at which they occur in stars, deep under the Gran Sasso."
      />

      <section className="shell" style={{ paddingBottom: 96 }}>
        <img src={asset(PHOTOS.luna400)} alt="The LUNA 400 kV accelerator" style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover", borderRadius: 14 }} />
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="gamow">
        <div className="shell feature">
          <Fig figure={FIGURES.gamowCurves} />
          <div>
            <span className="label">01 · The Gamow window</span>
            <h3>Fusion by tunnelling</h3>
            <p>
              In the centre of the Sun protons carry about 1.3 keV, against a
              Coulomb barrier of 500 keV. Reactions happen only by quantum
              tunnelling, in a narrow energy window where cross sections fall
              to picobarns or femtobarns.
            </p>
            <div className="stat-inline">
              <div><strong>1.3 keV</strong><span>mean proton energy in the Sun</span></div>
              <div><strong>~1 / day</strong><span>events, even with intense beams</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section panel-bg" id="underground">
        <div className="shell feature flip">
          <Fig figure={FIGURES.hpgeBackground} />
          <div>
            <span className="label">02 · Why underground</span>
            <h3>Silence under 1.4 km of rock</h3>
            <p>
              Cosmic rays mimic the signals of rare reactions. The mountain
              cuts their flux by six orders of magnitude, and about 25 cm of
              lead removes more than 99.9 % of the remaining environmental
              radioactivity.
            </p>
            <div className="stat-inline">
              <div><strong>10⁻⁶</strong><span>muon flux</span></div>
              <div><strong>~10⁻³</strong><span>thermal neutrons</span></div>
              <div><strong>&gt; 10³×</strong><span>γ background with Pb</span></div>
            </div>
          </div>
        </div>
        <div className="shell" style={{ marginTop: 72 }}>
          <Fig figure={FIGURES.depth} className="" />
        </div>
      </section>

      <section className="section night" id="networks">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="label">03 · Burning networks</span>
              <h2 className="h2">Every stage of a star’s life</h2>
            </div>
            <Link className="link" href="/experiments/">Experiments <ArrowRight size={16} /></Link>
          </div>
          <StageMap />
          <div className="grid-2" style={{ marginTop: 56 }}>
            <Fig figure={FIGURES.network} />
            <Fig figure={FIGURES.nenamgal} />
          </div>
        </div>
      </section>

      <section className="section night" style={{ paddingTop: 0 }} id="history">
        <div className="shell">
          <span className="label">04 · History</span>
          <h2 className="h2" style={{ margin: "14px 0 48px" }}>Since 1991</h2>
          <ol className="timeline">
            {TIMELINE.map((t) => (
              <li key={t.year}><strong>{t.year}</strong><span>{t.text}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section night" style={{ paddingTop: 0 }} id="next">
        <div className="shell">
          <span className="label">05 · Next</span>
          <h2 className="h2" style={{ margin: "14px 0 48px" }}>Open questions</h2>
          <div className="questions">
            {OPEN_QUESTIONS.map((q) => (
              <div key={q.title} className="question">
                <h3>{q.title}</h3>
                <p>{q.text}</p>
                <span className="r">{q.reactions}</span>
              </div>
            ))}
          </div>
          <div className="hero-actions" style={{ marginTop: 48 }}>
            <Link className="btn btn-light" href="/facilities/">Facilities <ArrowRight size={16} /></Link>
            <Link className="btn btn-ghost" href="/collaboration/">Collaboration</Link>
          </div>
        </div>
      </section>
    </>
  );
}
