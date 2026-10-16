import { ArrowUpRight } from "lucide-react";
import { PageHead, Fig } from "../components/ui";
import LegacyContent from "../components/legacy-content";
import { asset, legacy } from "@/lib/site";
import { FACILITIES, FIGURES } from "@/lib/content";
export const metadata = { title: "Facilities" };
export default function Facilities() {
  return (
    <>
      <PageHead
        crumbs={[["Facilities"]]}
        title="Facilities"
        lead="Two accelerators in operation in the LNGS underground halls, and the pilot machine that started it all."
      />
      <div className="shell" style={{ paddingBottom: 72 }}>
        {FACILITIES.map((f) => (
          <section key={f.id} id={f.id} className="facility">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="facility-media"><img src={asset(f.image)} alt={f.name} loading="lazy" /></div>
              {f.figure && <Fig figure={FIGURES[f.figure]} />}
            </div>
            <div>
              <div style={{ display: "flex", gap: 8 }}>
                <span className={f.status === "operating" ? "chip chip-live" : "chip"}><i />{f.years}</span>
              </div>
              <h2 className="h2">{f.name}</h2>
              <p>{f.lead}</p>
              <dl className="spec">
                {f.specs.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              {f.paper && (
                <a className="link" href={f.paper.href} style={{ marginTop: 20 }}>
                  {f.paper.label} <ArrowUpRight size={15} />
                </a>
              )}
              {f.id === "bellotti" && (
                <details className="more">
                  <summary>Original facility proposal</summary>
                  <div>
                    <p className="notice" style={{ marginBottom: 16 }}>Written before installation; the facility was inaugurated in October 2023.</p>
                    <LegacyContent html={legacy.pages.future.html} />
                  </div>
                </details>
              )}
            </div>
          </section>
        ))}
      </div>
      <section className="section panel-bg">
        <div className="shell">
          <span className="label">Setups</span>
          <h2 className="h2" style={{ margin: "14px 0 40px" }}>Targets and detectors</h2>
          <div className="grid-3">
            <Fig figure={FIGURES.bgo} />
            <Fig figure={FIGURES.particles} />
            <Fig figure={FIGURES.n14bellotti} />
            <Fig figure={FIGURES.c12c12} />
            <Fig figure={FIGURES.nealpha} />
            <Fig figure={FIGURES.beamlines} />
          </div>
          <p className="muted" style={{ marginTop: 40, fontSize: 14 }}>
            The ¹²C/¹³C campaign combined LUNA data with measurements at the shallow-underground Felsenkeller laboratory in Dresden.
          </p>
        </div>
      </section>
    </>
  );
}
