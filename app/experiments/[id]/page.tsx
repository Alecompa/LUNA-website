import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { experiments, experimentById, asset } from "@/lib/site";
import { FIGURES, stageById } from "@/lib/content";
import { publicationsFor } from "@/lib/publications";
import { PageHead, Fig, Rx, StageChip, StatusChip } from "@/app/components/ui";
import LegacyContent from "@/app/components/legacy-content";

export const dynamicParams = false;
export function generateStaticParams() {
  return experiments.map((e) => ({ id: e.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const e = experimentById((await params).id);
  return { title: e ? e.name : "Experiment" };
}

// The archive bodies repeat the reaction and PI as headings; drop them.
const body = (html: string) =>
  html.replace(/^\s*<div>\s*<h4>[\s\S]*?<\/h4>\s*/, "<div>").replace(/<h5>\s*PI:[\s\S]*?<\/h5>/i, "").replace(/<h5>\s*<\/h5>/g, "");

export default async function ExperimentPage({ params }: { params: Promise<{ id: string }> }) {
  const e = experimentById((await params).id);
  if (!e) notFound();
  const stage = stageById(e.stage);
  const pubs = publicationsFor(e.id);
  const figs = (e.figures ?? []).map((f) => FIGURES[f]);
  const siblings = experiments.filter((x) => x.name === e.name && x.id !== e.id);
  return (
    <>
      <PageHead crumbs={[["Experiments", "/experiments/"], [e.name]]} title={<Rx html={e.title} />}>
        <div className="meta">
          <StatusChip status={e.status} />
          <StageChip id={e.stage} />
          <span className="chip">{e.facility}</span>
        </div>
      </PageHead>
      <div className="shell detail">
        <article style={{ "--c": stage.color } as React.CSSProperties}>
          {e.result && (
            <div className="result">
              <span className="label">Key result</span>
              <p>{e.result}</p>
            </div>
          )}
          {e.image && (
            <div style={{ marginBottom: 40 }}>
              <img src={asset(e.image)} alt={`Setup for ${e.name}`} style={{ width: "100%", borderRadius: 14, maxHeight: 520, objectFit: "cover" }} />
            </div>
          )}
          {figs.length > 0 && (
            <div className={`detail-figs ${figs.length > 1 ? "two" : ""}`}>
              {figs.map((f) => <Fig key={f.src} figure={f} />)}
            </div>
          )}
          <LegacyContent html={body(e.html)} />
          {pubs.length > 0 && (
            <>
              <h2 className="block-title">Publications</h2>
              <div className="related">
                {pubs.map((p) => (
                  <Link key={p.slug} href={`/publications/${p.slug}/`}>
                    <Rx as="span" html={p.titleHtml} className="h4" />
                    <div className="pub-meta" style={{ marginTop: 4 }}>{p.journal}</div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </article>
        <aside>
          <dl className="facts">
            <div><dt>Status</dt><dd>{e.status === "ongoing" ? "Data taking" : "Completed"}</dd></div>
            <div><dt>Facility</dt><dd>{e.facility}</dd></div>
            <div><dt>Burning stage</dt><dd>{stage.name}</dd></div>
            {stage.temperature && <div><dt>Temperature</dt><dd>{stage.temperature}</dd></div>}
            {e.energies && <div><dt>Energies</dt><dd>{e.energies}</dd></div>}
            {e.technique && <div><dt>Technique</dt><dd>{e.technique}</dd></div>}
            {e.pi && <div><dt>{e.pi.match(/,| and |\//) ? "PIs" : "PI"}</dt><dd>{e.pi}</dd></div>}
          </dl>
          {siblings.map((s) => (
            <Link key={s.id} href={`/experiments/${s.id}/`} className="link">
              Also at {s.facility} <ArrowUpRight size={15} />
            </Link>
          ))}
          <Link href="/experiments/" className="link"><ArrowLeft size={15} /> All experiments</Link>
        </aside>
      </div>
    </>
  );
}
