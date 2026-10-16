import { PageHead } from "../components/ui";
import ExperimentBrowser from "../components/experiment-browser";
import { experiments } from "@/lib/site";
export const metadata = { title: "Experiments" };
export default function Experiments() {
  return (
    <>
      <PageHead
        crumbs={[["Experiments"]]}
        title="Experiments"
        lead={`${experiments.length} campaigns across three accelerators, from Big Bang nucleosynthesis to carbon burning.`}
      />
      <section className="shell" style={{ paddingBottom: 112 }}>
        <ExperimentBrowser items={experiments} />
      </section>
    </>
  );
}
