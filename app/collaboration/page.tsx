import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHead } from "../components/ui";
import NetworkCards from "../components/network-cards";
import { asset } from "@/lib/site";
import { PHOTOS } from "@/lib/content";
import { institutions, spokesperson } from "@/lib/people";
export const metadata = { title: "Collaboration" };


export default function Collaboration() {
  const members = institutions.reduce((n, i) => n + i.members.length, 0);
  const countries = [...new Set(institutions.map((i) => i.country))];
  return (
    <>
      <PageHead crumbs={[["Collaboration"]]} title="The LUNA Collaboration" />
      <section className="shell" style={{ paddingBottom: 72 }}>
        <img src={asset(PHOTOS.collab)} alt="Members of the LUNA collaboration at Gran Sasso" style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover", borderRadius: 14 }} />
        <div className="stats" style={{ marginTop: 40 }}>
          <div><strong>{members}</strong><span>researchers</span></div>
          <div><strong>{institutions.length}</strong><span>institutions</span></div>
          <div><strong>{countries.length}</strong><span>countries</span></div>
          <div><strong>{spokesperson.name}</strong><span>spokesperson · INFN Roma</span></div>
        </div>
      </section>
      <section className="shell" style={{ paddingBottom: 96 }} id="institutions">
        <h2 className="block-title" style={{ marginTop: 0 }}>Institutions</h2>
        <div className="inst-grid">
          {institutions.map((i) => (
            <div key={i.name} className="inst">
              <span className="where">{i.city} · {i.country}</span>
              <h3>{i.name}</h3>
              <p>{i.members.join(", ")}</p>
            </div>
          ))}
        </div>
        <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>* Gran Sasso Science Institute (GSSI), L’Aquila.</p>
      </section>
      <section className="section panel-bg" id="networks">
        <div className="shell">
          <span className="label">Networks</span>
          <h2 className="h2" style={{ margin: "14px 0 12px" }}>Part of a wider community</h2>
          <p className="lead" style={{ marginBottom: 40 }}>Connecting nuclear astrophysics research in Italy, across Europe, and worldwide.</p>
          <NetworkCards />
        </div>
      </section>
      <section className="section-sm">
        <div className="shell split-even">
          <h2 className="h2">Join us</h2>
          <div className="hero-actions" style={{ marginTop: 0 }}>
            <Link className="btn btn-primary" href="/work-with-us/">Theses & fellowships <ArrowRight size={16} /></Link>
            <Link className="btn btn-ghost" href="/contact/">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
