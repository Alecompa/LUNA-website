import Link from "next/link";
import { PageHead, Rx, StageChip } from "../components/ui";
import PublicationBrowser from "../components/publication-browser";
import { archiveUpdated, asset } from "@/lib/site";
import { publications, highlights, shortJournal } from "@/lib/publications";
import { REVIEWS } from "@/lib/content";
export const metadata = { title: "Publications" };
export default function Publications() {
  const featured = highlights.filter((p) => p.figure).slice(0, 4);
  return (
    <>
      <PageHead
        crumbs={[["Publications"]]}
        title="Publications"
        lead={`${publications.length} papers since 1994. Updated ${archiveUpdated}.`}
      >
        <div className="meta">
          <Link className="chip" href="/theses/">Theses →</Link>
          <a className="chip" href={REVIEWS.oxford.href}>Review · Oxford Encyclopedia 2026 ↗</a>
          <a className="chip" href={REVIEWS.annrev.href}>Review · Annu. Rev. 2022 ↗</a>
        </div>
      </PageHead>
      <section className="shell" style={{ paddingBottom: 56 }}>
        <div className="grid-4 rail">
          {featured.map((p) => (
            <Link key={p.slug} href={`/publications/${p.slug}/`} className="card highlight-card">
              <div className="card-media"><img src={asset(p.figure!.src)} alt="" loading="lazy" /></div>
              <div className="card-body">
                <div className="card-top"><StageChip id={p.stage} /><span className="pub-meta">{p.year}</span></div>
                <Rx as="h3" html={p.titleHtml} className="" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="shell" style={{ paddingBottom: 112 }}>
        <PublicationBrowser items={publications.map((p) => ({ slug: p.slug, year: p.year, titleHtml: p.titleHtml, title: p.title, journal: p.journal, authors: p.authors, stage: p.stage, highlight: p.highlight, short: shortJournal(p.journal), thumb: p.figure?.src }))} />
      </section>
    </>
  );
}
