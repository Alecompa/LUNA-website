import Link from "next/link";
import { PageHead } from "../components/ui";
import { asset } from "@/lib/site";
import { allNews } from "@/lib/news";
import { formatDate } from "@/lib/format";
export const metadata = { title: "News" };
export default async function News() {
  const news = await allNews();
  return (
    <>
      <PageHead crumbs={[["News"]]} title="News" />
      <div className="shell news-grid" style={{ paddingBottom: 112 }}>
        {news.map((n) => (
          <Link key={n.id} href={`/news/${n.id}/`} className="card news-card">
            <div className={`card-media ${n.logo ? "logo" : ""}`}>
              {n.image && <img src={asset(n.image)} alt="" loading="lazy" />}
            </div>
            <div className="card-body">
              <span className="pub-meta">{formatDate(n.date)}</span>
              <h3 dangerouslySetInnerHTML={{ __html: n.title }} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
