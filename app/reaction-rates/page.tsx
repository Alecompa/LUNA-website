import PageHeading from "../components/page-heading";
import RateExplorer from "../components/rate-explorer";
import { legacy } from "@/lib/site";
export const metadata = { title: "Reaction-rate explorer" };
export default function ReactionRates() {
  return (
    <>
      <PageHeading
        title="Reaction rates"
        eyebrow="DATA REPOSITORY"
        description="Explore the tabulated thermonuclear rates, inspect their uncertainties, and download the original LUNA datasets."
      />
      <RateExplorer
        rates={legacy.rates}
        unavailable={legacy.unavailableRates}
      />
    </>
  );
}
