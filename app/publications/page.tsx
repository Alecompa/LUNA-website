import Link from "next/link";
import PageHeading from "../components/page-heading";
import PublicationBrowser from "../components/publication-browser";
import { legacy } from "@/lib/site";
export const metadata = { title: "Publications" };
export default function Publications() {
  return (
    <>
      <PageHeading
        title="Publications"
        eyebrow="SCIENTIFIC OUTPUT"
        description="The LUNA publication archive, with full author lists and links to the original research."
      >
        <div className="subnav">
          <span>Archive updated June 2026</span>
          <Link href="/theses/">Theses →</Link>
          <Link href="/reaction-rates/">Reaction rates →</Link>
          <Link href="/resources/deuterium-nature/">
            Deuterium burning in Nature →
          </Link>
        </div>
      </PageHeading>
      <div className="shell article-width">
        <PublicationBrowser papers={legacy.pages.publications.records} overview={legacy.pages.publications.sections.find(s=>s.year === "Overview")?.html || ""} />
      </div>
    </>
  );
}
