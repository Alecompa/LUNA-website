import Link from "next/link";
import { notFound } from "next/navigation";
import { experiments, plainTitle, asset } from "@/lib/site";
import { getExperimentData, getAllExperimentIds } from "@/utils/markdown";
import PageHeading from "@/app/components/page-heading";
import LegacyContent from "@/app/components/legacy-content";
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...new Set([...experiments.map((e) => e.id), ...getAllExperimentIds()]),
  ].map((id) => ({ id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const e = experiments.find((e) => e.id === id);
  return { title: e ? plainTitle(e.title) : "LUNA experiment" };
}
export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const e = experiments.find((e) => e.id === id);
  if (!e) {
    if (!getAllExperimentIds().includes(id)) notFound();
    const m = await getExperimentData(id);
    return (
      <>
        <PageHeading title={plainTitle(m.title)} eyebrow="EXPERIMENT" />
        <div className="shell article-width">
          <LegacyContent html={m.content} />
        </div>
      </>
    );
  }
  const original = getAllExperimentIds().includes(id)
    ? await getExperimentData(id)
    : null;
  return (
    <>
      <PageHeading title={plainTitle(e.title)} eyebrow="EXPERIMENT">
        <div className="detail-meta">
          <span className="tag">
            {e.status === "ongoing" ? "Ongoing" : "Past programme"}
          </span>
          <span>{e.facility}</span>
          {e.pi && (
            <span>
              <strong>PI:</strong> {e.pi}
            </span>
          )}
        </div>
      </PageHeading>
      <div className="shell content-layout">
        <aside className="side-nav">
          <Link href="/experiments/">← All experiments</Link>
          <Link href="/reaction-rates/">Reaction rates</Link>
          <Link href="/publications/">Publications</Link>
          <Link href="/experiments/future/">Future programme</Link>
        </aside>
        <article>
          <LegacyContent html={e.html} />
          {original && (
            <details className="table-details">
              <summary>Additional background from the LUNA website</summary>
              <div className="pt-5">
                {original.coverImage && (
                  <img
                    src={asset(original.coverImage)}
                    alt="Experimental setup"
                    className="article-hero"
                  />
                )}
                <LegacyContent html={original.content} />
              </div>
            </details>
          )}
          <p className="source-note">
            Programme status and description follow the supplied LUNA archive.{" "}
            <a
              href={
                "https://github.com/mariannavagnoni/LUNAweb/blob/" +
                encodeURIComponent("main") +
                "/" +
                e.source.replace(/\?/g, "%3F")
              }
            >
              Source record ↗
            </a>
          </p>
        </article>
      </div>
    </>
  );
}
