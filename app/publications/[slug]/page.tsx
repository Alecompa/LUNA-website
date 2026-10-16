import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { legacy, experimentById } from "@/lib/site";
import { publications, publicationBySlug, publicationsFor } from "@/lib/publications";
import { stageById } from "@/lib/content";
import { PageHead, Fig, Rx, StageChip, StatusChip } from "@/app/components/ui";
import LegacyContent from "@/app/components/legacy-content";

export const dynamicParams = false;
export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = publicationBySlug((await params).slug);
  return { title: p?.title ?? "Publication", description: p?.summary };
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = publicationBySlug((await params).slug);
  if (!p) notFound();
  const exp = p.experiment ? experimentById(p.experiment) : undefined;
  const stage = stageById(p.stage);
  const siblings = p.experiment ? publicationsFor(p.experiment).filter((x) => x.slug !== p.slug) : [];
  // The Nature deuterium story was a stand-alone page on the old site.
  const story = p.story ? legacy.pages[p.story].html.replace(/<h3>[\s\S]*?<\/h3>/, "").replace(/<p>A paper entitled[\s\S]*?<\/p>/, "") : "";
  const authorCount = p.authors.split(/,\s*/).filter(Boolean).length;
  return (
    <>
      <PageHead crumbs={[["Publications", "/publications/"], [p.year]]} title={<Rx html={p.titleHtml} />}>
        <div className="meta">
          <StageChip id={p.stage} />
          {p.highlight && <span className="chip chip-live" style={{ animation: "none" }}>★ Highlight</span>}
          {p.href ? (
            <a className="chip" href={p.href}>{p.journal.replace(/\s*·.*$/, "")} ↗</a>
          ) : (
            <span className="chip">{p.journal}</span>
          )}
        </div>
      </PageHead>
      <div className="shell detail">
        <article style={{ "--c": stage.color } as React.CSSProperties}>
          {p.summary && (
            <div className="result">
              <span className="label">In short</span>
              <p>{p.summary}</p>
            </div>
          )}
          {p.figure && !story && <div className="detail-figs"><Fig figure={p.figure} /></div>}
          {story && <LegacyContent html={story} />}
          <h2 className="block-title">Authors · {authorCount}</h2>
          <p className="authors">{p.authors}</p>
          {siblings.length > 0 && (
            <>
              <h2 className="block-title">Same experiment</h2>
              <div className="related">
                {siblings.map((s) => (
                  <Link key={s.slug} href={`/publications/${s.slug}/`}>
                    <Rx as="span" html={s.titleHtml} className="h4" />
                    <div className="pub-meta" style={{ marginTop: 4 }}>{s.journal}</div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </article>
        <aside>
          <dl className="facts">
            <div><dt>Year</dt><dd>{p.year}</dd></div>
            <div><dt>Journal</dt><dd>{p.journal}</dd></div>
            <div><dt>Topic</dt><dd>{stage.name}</dd></div>
          </dl>
          {p.href && <a className="btn btn-primary" href={p.href} style={{ justifyContent: "center" }}>Read the paper <ArrowUpRight size={16} /></a>}
          {exp && (
            <Link href={`/experiments/${exp.id}/`} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              <span className="label">Experiment</span>
              <Rx as="strong" html={exp.title} className="h3" />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><StatusChip status={exp.status} /><span className="chip">{exp.facility}</span></div>
            </Link>
          )}
          <Link href="/publications/" className="link"><ArrowLeft size={15} /> All publications</Link>
        </aside>
      </div>
    </>
  );
}
