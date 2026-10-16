import data from "@/content/imported/legacy.json";
import updates from "@/content/updates.json";
import { EXPERIMENT_EXTRA, type ExperimentExtra } from "./content";
// Keep additions separate from the pinned legacy import so reimports retain them.
export const archiveUpdated = updates.updated;
export const legacy = {
  ...data,
  pages: {
    ...data.pages,
    publications: {
      ...data.pages.publications,
      records: [...updates.publications, ...data.pages.publications.records],
    },
  },
  rates: [...data.rates, ...updates.rates],
};
export { basePath, asset, localHtml, plainTitle } from "./paths";

export type Experiment = (typeof data.experiments)[number] &
  ExperimentExtra & { name: string };
const facilityName = (f: string) =>
  f === "Bellotti Ion Beam Facility" ? "Bellotti IBF" : f;
export const experiments: Experiment[] = data.experiments.map((e) => ({
  ...e,
  ...(EXPERIMENT_EXTRA[e.id] ?? { stage: "pp" }),
  // The import stores titles as HTML; strip the facility suffix used once.
  title: e.title.replace(/\s*at IBF\s*$/, ""),
  name: e.title.replace(/<[^>]+>/g, "").replace(/\s*at IBF\s*$/, ""),
  facility: facilityName(e.facility),
  image: EXPERIMENT_EXTRA[e.id]?.image || e.image,
}));
export const experimentById = (id: string) =>
  experiments.find((e) => e.id === id);

export const newsTitles: Record<string, string> = {
  "184-borse-di-studio-2026":
    "INFN scholarships for undergraduate and master’s students",
  "183-news-villi-prize": "Jakub Skowronski receives the Villi Prize Mention",
  "181-lunanova-news": "LUNANOVA awarded an ERC Synergy Grant",
};
