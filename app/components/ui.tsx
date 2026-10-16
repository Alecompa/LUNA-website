import Link from "next/link";
import { stageById, REVIEWS, type Figure, type StageId } from "@/lib/content";
import { asset } from "@/lib/paths";
import { reactionHtml } from "@/lib/format";
import Zoomable from "./zoomable";

export const Rx = ({
  html,
  as: Tag = "span",
  className,
}: {
  html: string;
  as?: "span" | "h1" | "h2" | "h3" | "strong";
  className?: string;
}) => (
  <Tag
    className={className}
    dangerouslySetInnerHTML={{ __html: reactionHtml(html) }}
  />
);

export const StageChip = ({ id }: { id: StageId }) => {
  const s = stageById(id);
  return (
    <span className="chip" style={{ "--c": s.color } as React.CSSProperties}>
      <i />
      {s.short}
    </span>
  );
};

export const StatusChip = ({ status }: { status: string }) =>
  status === "ongoing" ? (
    <span className="chip chip-live">
      <i />
      Ongoing
    </span>
  ) : (
    <span className="chip">Completed</span>
  );

export function PageHead({
  crumbs = [],
  title,
  lead,
  night,
  children,
}: {
  crumbs?: [string, string?][];
  title: React.ReactNode;
  lead?: React.ReactNode;
  night?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <header className={night ? "page-head page-head-night" : "page-head"}>
      <div className="shell">
        <nav className="crumbs label" aria-label="Breadcrumb">
          <Link href="/">LUNA</Link>
          {crumbs.map(([label, href]) => (
            <span key={label} className="contents">
              <span aria-hidden>/</span>
              {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="h1">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

export function Fig({
  figure,
  cover,
  className = "",
}: {
  figure: Figure;
  cover?: boolean;
  className?: string;
}) {
  const credit =
    figure.source && figure.source !== "archive"
      ? `${REVIEWS[figure.source].short}${figure.fig ? `, ${figure.fig}` : ""}`
      : "LUNA archive";
  return (
    <figure className={`fig ${className}`}>
      <Zoomable
        src={asset(figure.src)}
        alt={figure.caption}
        caption={figure.caption}
        className={`fig-frame ${cover ? "cover" : figure.kind}`}
      />
      <figcaption>
        {figure.caption}
        <cite>{credit}</cite>
      </figcaption>
    </figure>
  );
}

/** Reaction label over a darkened facility photo, for items without imagery. */
export const Glyph = ({ html, stage, photo }: { html: string; stage: StageId; photo?: string }) => (
  <div
    className="glyph"
    style={{ "--c": stageById(stage).color, backgroundImage: photo ? `url(${asset(photo)})` : undefined } as React.CSSProperties}
  >
    <span dangerouslySetInnerHTML={{ __html: reactionHtml(html) }} />
  </div>
);
