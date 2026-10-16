import Link from "next/link";
import PageHeading from "../components/page-heading";
import LegacyContent from "../components/legacy-content";
import { asset, legacy } from "@/lib/site";
export const metadata = { title: "About LUNA" };
export default function About() {
  return (
    <>
      <PageHeading
        title="A window into the stars."
        eyebrow="ABOUT LUNA"
        description="The Laboratory for Underground Nuclear Astrophysics at INFN’s Gran Sasso National Laboratories."
      />
      <div className="shell content-layout">
        <aside className="side-nav">
          <a href="#science">Our science</a>
          <Link href="/collaboration/">People & institutions</Link>
          <Link href="/network/">Scientific networks</Link>
          <Link href="/experiments/future/">Facility history</Link>
          <Link href="/work-with-us/">Work with us</Link>
        </aside>
        <article>
          <img
            src={asset("/images/hero/Luna-5218.jpg")}
            alt="The LUNA accelerator at Gran Sasso"
            className="article-hero"
          />
          <div className="timeline">
            <div>
              <strong>1991</strong>
              <span>LUNA proposed</span>
            </div>
            <div>
              <strong>2001</strong>
              <span>400 kV accelerator</span>
            </div>
            <div>
              <strong>2023</strong>
              <span>Bellotti facility inauguration</span>
            </div>
          </div>
          <div id="science">
            <LegacyContent html={legacy.pages.about.html} />
          </div>
        </article>
      </div>
    </>
  );
}
