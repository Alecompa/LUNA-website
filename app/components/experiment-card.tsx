import Link from "next/link";
import { asset } from "@/lib/paths";
import type { Experiment } from "@/lib/site";
import { Glyph, Rx, StageChip, StatusChip } from "./ui";
import { facilityPhoto } from "@/lib/content";

export default function ExperimentCard({ e }: { e: Experiment }) {
  return (
    <Link href={`/experiments/${e.id}/`} className="card exp-card">
      <div className="card-media">
        {e.image ? <img src={asset(e.image)} alt="" loading="lazy" /> : <Glyph html={e.title} stage={e.stage} photo={facilityPhoto(e.facility)} />}
      </div>
      <div className="card-body">
        <div className="card-top">
          <StageChip id={e.stage} />
          <StatusChip status={e.status} />
        </div>
        <Rx as="h3" html={e.title} />
        <p>{e.facility}{e.pi ? ` · PI ${e.pi}` : ""}</p>
      </div>
    </Link>
  );
}
