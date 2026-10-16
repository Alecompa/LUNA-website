import data from "@/content/imported/legacy.json";
import updates from "@/content/updates.json";
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
export const experiments = legacy.experiments;
export const newsTitles: Record<string, string> = {
  "184-borse-di-studio-2026":
    "INFN scholarships for undergraduate and master’s students",
  "183-news-villi-prize": "Jakub Skowronski receives the Villi Prize Mention",
  "181-lunanova-news": "LUNANOVA awarded an ERC Synergy Grant",
};
