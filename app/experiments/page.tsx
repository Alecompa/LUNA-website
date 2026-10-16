import Link from "next/link";
import PageHeading from "../components/page-heading";
import ExperimentBrowser from "../components/experiment-browser";
import { experiments } from "@/lib/site";
export const metadata = { title: "Experiments" };
export default function Experiments() {
  return (
    <>
      <PageHeading
        title="Experiments"
        eyebrow="RESEARCH"
        description="From solar hydrogen burning to the neutron sources that build heavy elements."
      >
        <div className="subnav">
          <a href="#ongoing">Ongoing programme</a>
          <a href="#past">Past experiments</a>
          <Link href="/experiments/future/">
            Future programme & facility history →
          </Link>
        </div>
      </PageHeading>
      <section className="shell pb-20">
        <ExperimentBrowser items={experiments} />
      </section>
    </>
  );
}
