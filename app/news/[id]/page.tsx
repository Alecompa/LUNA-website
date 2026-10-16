import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { allNews } from "@/lib/news";
import { formatDate } from "@/lib/format";
import { plainTitle } from "@/lib/site";
import { PageHead } from "@/app/components/ui";
import LegacyContent from "@/app/components/legacy-content";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await allNews()).map((n) => ({ id: n.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = (await allNews()).find((n) => n.id === id);
  return { title: n ? plainTitle(n.title) : "News" };
}
export default async function NewsArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = (await allNews()).find((n) => n.id === id);
  if (!n) notFound();
  return (
    <>
      <PageHead crumbs={[["News", "/news/"], [formatDate(n.date)]]} title={<span dangerouslySetInnerHTML={{ __html: n.title }} />} />
      <article className="shell" style={{ paddingBottom: 112 }}>
        <LegacyContent html={n.html ?? ""} />
        <Link className="link" href="/news/" style={{ marginTop: 32 }}><ArrowLeft size={15} /> All news</Link>
      </article>
    </>
  );
}
