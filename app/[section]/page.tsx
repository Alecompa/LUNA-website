import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "../components/page-heading";
import LegacyContent from "../components/legacy-content";
import ArchiveBrowser from "../components/archive-browser";
import { legacy, asset } from "@/lib/site";
const sections = [
  "collaboration",
  "theses",
  "network",
  "work-with-us",
] as const;
const titles = {
  collaboration: "People & institutions",
  theses: "Theses",
  network: "Scientific networks",
  "work-with-us": "Work with us",
};
export const dynamicParams = false;
export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return { title: titles[section as keyof typeof titles] || "LUNA" };
}
export default async function Section({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!sections.includes(section as (typeof sections)[number])) notFound();
  const key = section as (typeof sections)[number];
  return (
    <>
      <PageHeading
        title={titles[key]}
        eyebrow={key === "theses" ? "SCIENTIFIC OUTPUT" : "COLLABORATION"}
      />
      <div className="shell content-layout">
        <aside className="side-nav">
          {sections.map((s) => (
            <Link href={"/" + s + "/"} key={s}>
              {titles[s]}
            </Link>
          ))}
          <Link href="/contact/">Contact</Link>
        </aside>
        <article>
          {key === "collaboration" && (
            <img
              className="article-hero"
              src={asset("/images/LUNA_collab-3.jpg")}
              alt="LUNA collaboration"
            />
          )}
          {key === "work-with-us" && (
            <div className="notice">
              Thesis topics, contacts and fellowship schemes from the supplied
              LUNA archive. Funding terms and deadlines can change; use the
              linked institution pages to check current calls.
            </div>
          )}
          {key === "theses" ? (
            <ArchiveBrowser
              sections={legacy.pages.theses.sections}
              kind="theses"
            />
          ) : (
            <LegacyContent html={legacy.pages[key].html} />
          )}
        </article>
      </div>
    </>
  );
}
