import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeading from "../components/page-heading";
import { legacy, asset, newsTitles } from "@/lib/site";
import { getAllContentData } from "@/utils/markdown";
export const metadata = { title: "News & announcements" };
export default async function News() {
  const originals = await getAllContentData("article");
  return (
    <>
      <PageHeading
        title="News & announcements"
        eyebrow="FROM THE COLLABORATION"
      />
      <div className="shell pb-20">
        <div className="news-grid">
          {[...legacy.news].reverse().map((n, i) => (
            <Link className="news-card" href={"/news/" + n.id + "/"} key={n.id}>
              <div className={"news-image news-image-" + i}>
                {n.image ? (
                  <img src={asset(n.image)} alt="" />
                ) : (
                  <>
                    <span>LUNA</span>
                    <small>OPPORTUNITIES / 2026</small>
                  </>
                )}
              </div>
              <div className="news-meta">
                <time>{n.date}</time>
                <span>COLLABORATION</span>
              </div>
              <h2 className="text-xl mb-4">{newsTitles[n.id]}</h2>
              <span className="text-link">
                Read article <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
        <div className="section-head mt-16">
          <h2>Earlier stories</h2>
        </div>
        <div className="news-grid">
          {originals.map((n) => (
            <Link href={"/news/" + n.id + "/"} key={n.id} className="news-card">
              {n.coverImage && (
                <div className="news-image">
                  <img src={asset(n.coverImage)} alt="" />
                </div>
              )}
              <div className="news-meta">
                <time>{n.date}</time>
              </div>
              <h3 dangerouslySetInnerHTML={{ __html: n.title }} />
              <span className="text-link">
                Read story <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
        <p className="source-note">
          Announcements retain their publication dates. Scholarship and funding
          notices are archival; consult the linked call for its current status.
        </p>
      </div>
    </>
  );
}
