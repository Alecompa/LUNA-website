import Link from "next/link";
import PageHeading from "../components/page-heading";
import { asset } from "@/lib/site";
export const metadata = { title: "Science stories" };
export default function Blog() {
  return (
    <>
      <PageHeading title="Science stories" eyebrow="EXPLORE LUNA" />
      <section className="shell community">
        <img
          src={asset("/images/posts/Sun_evolution.jpg")}
          alt="Illustration of stellar evolution"
        />
        <div>
          <p className="eyebrow">IN PREPARATION</p>
          <h2>The physics of LUNA</h2>
          <p>
            A space for stories about nuclear reactions, stellar evolution and
            life in an underground laboratory.
          </p>
          <div className="button-row">
            <Link className="button button-dark" href="/about/">
              Explore our science →
            </Link>
            <Link className="text-link" href="/news/">
              Collaboration news →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
