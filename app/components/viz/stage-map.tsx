import Link from "next/link";
import { STAGES } from "@/lib/content";
import { experiments } from "@/lib/site";
import { reactionHtml } from "@/lib/format";

/** The programme laid out along the life of a star, coolest to hottest. */
export default function StageMap() {
  return (
    <>
      <div className="stages">
        {STAGES.map((s) => {
          const items = experiments
            .filter((e) => e.stage === s.id)
            // One chip per reaction; campaigns at several facilities share it.
            .filter((e, i, a) => a.findIndex((x) => x.name === e.name) === i)
            .sort((a, b) => (a.status === "ongoing" ? -1 : 1) - (b.status === "ongoing" ? -1 : 1));
          return (
            <section
              key={s.id}
              className="stage"
              style={{ "--c": s.color } as React.CSSProperties}
            >
              <span className="t">{s.temperature}</span>
              <h3>{s.name}</h3>
              <p>{s.where}</p>
              <ul>
                {items.map((e) => (
                  <li key={e.id}>
                    <Link
                      href={`/experiments/${e.id}/`}
                      className={e.status === "ongoing" ? "live" : undefined}
                      dangerouslySetInnerHTML={{ __html: reactionHtml(e.title) }}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <div className="temp-axis" aria-hidden>
        <span>cooler</span>
        <span />
        <span>hotter</span>
      </div>
    </>
  );
}
