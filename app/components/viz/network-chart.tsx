"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { REACTION_TYPES, type Network, type Reaction } from "@/lib/networks";
import { reactionHtml } from "@/lib/format";

export type ExpInfo = { id: string; title: string; status: string; result?: string; facility: string };

const CELL = 96;
const BOX = 52;
const PAD = 46;

type Edge = Reaction & { d: string; mid: [number, number]; len: number; measured: boolean; live: boolean };

/** Split "12C" into mass number and symbol for the nuclide boxes. */
const parts = (label: string) => {
  const m = label.match(/^(\d+)([A-Za-z]+)(\*?)$/);
  return m ? { a: m[1], el: m[2] + m[3] } : { a: "", el: label };
};

export default function NetworkChart({
  network,
  color,
  exps,
}: {
  network: Network;
  color: string;
  exps: Record<string, ExpInfo>;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotion(!q.matches);
  }, []);
  useEffect(() => setActive(null), [network]);

  const { nodes, edges, width, height } = useMemo(() => {
    // Drawing coordinates: true (N, Z) unless a schematic position is given.
    const ns = network.nuclides.map((x) => ({ ...x, n: x.at?.[0] ?? x.n, z: x.at?.[1] ?? x.z }));
    const nMin = Math.min(...ns.map((n) => n.n));
    const nMax = Math.max(...ns.map((n) => n.n));
    const zMin = Math.min(...ns.map((n) => n.z));
    const zMax = Math.max(...ns.map((n) => n.z));
    const pos = (id: string) => {
      const n = ns.find((x) => x.id === id)!;
      return [PAD + (n.n - nMin) * CELL + BOX / 2, PAD + (zMax - n.z) * CELL + BOX / 2] as const;
    };
    // Trim a segment so arrows start and stop at the box edges.
    const trim = (x: number, y: number, tx: number, ty: number) => {
      const dx = tx - x, dy = ty - y;
      const k = (BOX / 2 + 6) / Math.max(Math.abs(dx), Math.abs(dy));
      return [x + dx * k, y + dy * k] as const;
    };
    const edges: Edge[] = network.reactions.map((r) => {
      const [x1, y1] = pos(r.from);
      const [x2, y2] = pos(r.to);
      const len = Math.hypot(x2 - x1, y2 - y1);
      const bend = r.bend ?? 0;
      const cx = (x1 + x2) / 2 + (y2 - y1) * bend;
      const cy = (y1 + y2) / 2 - (x2 - x1) * bend;
      const [sx, sy] = trim(x1, y1, bend ? cx : x2, bend ? cy : y2);
      const [ex, ey] = trim(x2, y2, bend ? cx : x1, bend ? cy : y1);
      const d = bend ? `M${sx},${sy} Q${cx},${cy} ${ex},${ey}` : `M${sx},${sy} L${ex},${ey}`;
      const mid: [number, number] = bend
        ? [0.25 * sx + 0.5 * cx + 0.25 * ex, 0.25 * sy + 0.5 * cy + 0.25 * ey]
        : [(sx + ex) / 2, (sy + ey) / 2];
      const linked = (r.exps ?? []).map((id) => exps[id]).filter(Boolean);
      return {
        ...r,
        d,
        mid,
        len,
        measured: linked.length > 0 || !!r.luna,
        live: linked.some((e) => e.status === "ongoing"),
      };
    });
    const nodes = ns.map((n) => ({ ...n, xy: pos(n.id) }));
    return {
      nodes,
      edges,
      width: PAD * 2 + (nMax - nMin) * CELL + BOX,
      height: PAD * 2 + (zMax - zMin) * CELL + BOX,
    };
  }, [network, exps]);

  const sel = active !== null ? edges[active] : null;
  const selExps = sel ? (sel.exps ?? []).map((id) => exps[id]).filter(Boolean) : [];
  const measured = edges.filter((e) => e.measured);
  const style = { "--c": color } as React.CSSProperties;

  return (
    <div className="net" style={style}>
      <div className="net-chart">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Reaction network: ${network.title}`}>
          <defs>
            {["muted", "hot", "plan"].map((k) => (
              <marker key={k} id={`arrow-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
                <path d="M0,1 L9,5 L0,9 z" className={`net-head ${k}`} />
              </marker>
            ))}
            <filter id="net-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {!network.schematic && (
            <>
              <text x={PAD - 18} y={height - 12} className="net-axis">N →</text>
              <text x={10} y={PAD - 16} className="net-axis">Z ↑</text>
            </>
          )}

          {/* Edges */}
          {edges.map((e, i) => {
            const cls = [
              "net-edge",
              `t-${e.type}`,
              e.measured ? "measured" : "",
              e.planned ? "planned" : "",
              e.live ? "live" : "",
              active === i ? "active" : "",
              active !== null && active !== i ? "dim" : "",
            ].join(" ");
            const head = e.measured ? "hot" : e.planned ? "plan" : "muted";
            return (
              <g key={i} className={cls}>
                {e.measured && <path d={e.d} className="net-halo" filter="url(#net-glow)" />}
                <path d={e.d} className="net-line" markerEnd={`url(#arrow-${head})`} />
                <path
                  d={e.d}
                  className="net-hit"
                  tabIndex={0}
                  role="button"
                  aria-label={e.label}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                />
              </g>
            );
          })}

          {/* Particles flowing along the main cycle */}
          {motion &&
            edges.map((e, i) =>
              e.flow ? (
                <circle key={`p${i}`} r={3.2} className="net-particle">
                  <animateMotion dur={`${(1.1 + e.len / 130).toFixed(2)}s`} begin={`${((i * 0.37) % 2).toFixed(2)}s`} repeatCount="indefinite" path={e.d} />
                </circle>
              ) : null,
            )}

          {/* Nuclides */}
          {nodes.map((n) => {
            const { a, el } = parts(n.label);
            const [x, y] = n.xy;
            return (
              <g key={n.id} className={`net-node ${n.unstable ? "unstable" : ""} ${n.compound ? "compound" : ""}`} transform={`translate(${x - BOX / 2},${y - BOX / 2})`}>
                <rect width={BOX} height={BOX} rx={10} />
                <text x={BOX / 2} y={BOX / 2 + 6} textAnchor="middle">
                  {a && <tspan className="net-a" dy={-6}>{a}</tspan>}
                  <tspan dy={a ? 6 : 0}>{el}</tspan>
                </text>
              </g>
            );
          })}

          {/* Label of the active reaction */}
          {sel && (
            <g className="net-tag" transform={`translate(${sel.mid[0]},${sel.mid[1]})`} pointerEvents="none">
              <rect x={-sel.label.length * 3.9 - 10} y={-15} width={sel.label.length * 7.8 + 20} height={26} rx={13} />
              <text textAnchor="middle" y={4}>{sel.label}</text>
            </g>
          )}
        </svg>
        <ul className="net-legend" aria-label="Legend">
          <li><i className="lg measured" />Measured at LUNA</li>
          <li><i className="lg live" />Data taking now</li>
          <li><i className="lg planned" />Planned</li>
          <li><i className="lg beta" />β decay</li>
          <li><i className="lg box-u" />Unstable nucleus</li>
        </ul>
      </div>

      <aside className="net-info" aria-live="polite">
        {sel ? (
          <>
            <span className="label">{REACTION_TYPES[sel.type]}</span>
            <h3 dangerouslySetInnerHTML={{ __html: sel.label }} />
            <div className="net-status">
              {sel.live ? (
                <span className="chip chip-live"><i />Data taking</span>
              ) : sel.measured ? (
                <span className="chip">Measured at LUNA</span>
              ) : sel.planned ? (
                <span className="chip">Planned or under way</span>
              ) : (
                <span className="chip">Not measured by LUNA</span>
              )}
            </div>
            {selExps.map((e) => (
              <Link key={e.id} href={`/experiments/${e.id}/`} className="net-exp">
                <span>
                  <strong dangerouslySetInnerHTML={{ __html: reactionHtml(e.title) }} />
                  <small>{e.facility} · {e.status === "ongoing" ? "ongoing" : "completed"}</small>
                  {e.result && <em>{e.result}</em>}
                </span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <button className="link net-back" onClick={() => setActive(null)}>← Back to overview</button>
          </>
        ) : (
          <>
            <span className="label">Reaction network</span>
            <h3>{network.title}</h3>
            <p>{network.text}</p>
            <p className="net-hint">Hover or tap an arrow to see the reaction and the LUNA measurement behind it.</p>
            <div className="net-chips">
              {measured.map((e) => (
                <button key={e.label} className={`chip ${e.live ? "chip-live" : ""}`} onClick={() => setActive(edges.indexOf(e))}>
                  {e.live && <i />}
                  {e.label}
                </button>
              ))}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
