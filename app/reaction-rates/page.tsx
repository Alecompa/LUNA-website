import { PageHead } from "../components/ui";
import RateExplorer from "../components/rate-explorer";
import { legacy } from "@/lib/site";
export const metadata = { title: "Reaction rates" };
export default function ReactionRates() {
  return (
    <>
      <PageHead crumbs={[["Data"]]} title="Reaction rates" lead="Tabulated thermonuclear rates with ±1–3σ bands. Download the original tables or CSV." />
      <RateExplorer rates={legacy.rates} unavailable={legacy.unavailableRates} />
    </>
  );
}
