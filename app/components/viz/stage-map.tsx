import { STAGES } from "@/lib/content";
import { experiments } from "@/lib/site";
import { NETWORKS } from "@/lib/networks";
import StageExplorer, { type StageColumn } from "./stage-explorer";
import type { ExpInfo } from "./network-chart";

/** The programme laid out along the life of a star, coolest to hottest. */
export default function StageMap() {
  const columns: StageColumn[] = STAGES.map((s) => ({
    ...s,
    items: experiments
      .filter((e) => e.stage === s.id)
      // One chip per reaction; campaigns at several facilities share it.
      .filter((e, i, a) => a.findIndex((x) => x.name === e.name) === i)
      .sort((a, b) => (a.status === "ongoing" ? -1 : 1) - (b.status === "ongoing" ? -1 : 1))
      .map((e) => ({ id: e.id, title: e.title, live: e.status === "ongoing" })),
  }));
  // Only the experiments the networks reference are sent to the browser.
  const ids = new Set(NETWORKS.flatMap((n) => n.reactions.flatMap((r) => r.exps ?? [])));
  const exps: Record<string, ExpInfo> = Object.fromEntries(
    experiments
      .filter((e) => ids.has(e.id))
      .map((e) => [e.id, { id: e.id, title: e.title, status: e.status, result: e.result, facility: e.facility }]),
  );
  return <StageExplorer columns={columns} exps={exps} />;
}
