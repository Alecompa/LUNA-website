import { notFound } from "next/navigation";
import Link from "next/link";
import { legacy, newsTitles } from "@/lib/site";
import { getContentData, getAllContentIds } from "@/utils/markdown";
import PageHeading from "@/app/components/page-heading";
import LegacyContent from "@/app/components/legacy-content";
export const dynamicParams = false;
export function generateStaticParams() {
  return [...getAllContentIds("article"), ...legacy.news.map((n) => n.id)].map(
    (id) => ({ id }),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: newsTitles[id] || "News" };
}
export default async function NewsArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const imported = legacy.news.find((n) => n.id === id);
  if (!imported && !getAllContentIds("article").includes(id)) notFound();
  const n = imported || (await getContentData(id, "article"));
  const html = imported ? imported.html : "content" in n ? n.content : "";
  return (
    <>
      <PageHeading
        title={
          newsTitles[id] || (
            <span dangerouslySetInnerHTML={{ __html: n.title }} />
          )
        }
        eyebrow="NEWS"
      >
        <p className="detail-meta">
          <time dateTime={n.date}>{n.date}</time>
        </p>
      </PageHeading>
      <article className="shell article-width">
        {id === "184-borse-di-studio-2026" && (
          <div className="notice">
            Archived scholarship announcement, published March 2026. See the
            linked INFN call for deadlines and eligibility.
          </div>
        )}
        <LegacyContent html={html} />
        <Link className="text-link mt-8" href="/news/">
          ← All news
        </Link>
      </article>
    </>
  );
}
