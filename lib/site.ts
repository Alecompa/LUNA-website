import data from "@/content/imported/legacy.json";
export const legacy = data;
export { basePath, asset, localHtml, plainTitle } from "./paths";
export const experiments = legacy.experiments;
export const newsTitles: Record<string, string> = {
  "184-borse-di-studio-2026":
    "INFN scholarships for undergraduate and master’s students",
  "183-news-villi-prize": "Jakub Skowronski receives the Villi Prize Mention",
  "181-lunanova-news": "LUNANOVA awarded an ERC Synergy Grant",
};
