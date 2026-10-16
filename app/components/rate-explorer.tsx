"use client";
import { useState } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/paths";
import LegacyContent from "./legacy-content";
type Rate = {
  id: string;
  label: string;
  rows: number[][];
  columns: string[];
  html: string;
  validMax: number;
};
const fmt = (n: number) => (n === 0 ? "0" : n.toExponential(3));
const near = (rows: number[][], t: number) =>
  rows.reduce(
    (best, r, i) =>
      Math.abs(Math.log10(r[0] / t)) < Math.abs(Math.log10(rows[best][0] / t))
        ? i
        : best,
    0,
  );
export default function RateExplorer({
  rates,
  unavailable,
}: {
  rates: Rate[];
  unavailable: string[];
}) {
  const [id, setId] = useState("13Can16O"),
    [sigma, setSigma] = useState(1),
    [range, setRange] = useState("full"),
    [temperature, setTemperature] = useState(0.1);
  const rate = rates.find((r) => r.id === id)!,
    positive = rate.rows.filter((r) => r[4] > 0),
    rows = positive.filter(
      (r) => range === "full" || (r[0] >= 0.01 && r[0] <= 1),
    );
  const low = 4 - sigma,
    high = 4 + sigma,
    index = near(rows, temperature),
    row = rows[index];
  const W = 800,
    H = 365,
    L = 80,
    R = 25,
    T = 25,
    B = 55,
    pw = W - L - R,
    ph = H - T - B;
  const xmin = Math.log10(rows[0][0]),
    xmax = Math.log10(rows.at(-1)![0]),
    ymin = Math.floor(Math.log10(Math.min(...rows.map((r) => r[low])))),
    ymax = Math.ceil(Math.log10(Math.max(...rows.map((r) => r[high]))));
  const x = (t: number) => L + ((Math.log10(t) - xmin) / (xmax - xmin)) * pw,
    y = (v: number) => T + ((ymax - Math.log10(v)) / (ymax - ymin)) * ph;
  const line = rows
    .map(
      (r, i) => `${i ? "L" : "M"}${x(r[0]).toFixed(2)},${y(r[4]).toFixed(2)}`,
    )
    .join(" ");
  const band =
    rows
      .map(
        (r, i) =>
          `${i ? "L" : "M"}${x(r[0]).toFixed(2)},${y(r[low]).toFixed(2)}`,
      )
      .join(" ") +
    " " +
    [...rows]
      .reverse()
      .map((r) => `L${x(r[0]).toFixed(2)},${y(r[high]).toFixed(2)}`)
      .join(" ") +
    "Z";
  const ystep = Math.max(1, Math.ceil((ymax - ymin) / 5)),
    yticks = Array.from(
      { length: Math.floor((ymax - ymin) / ystep) + 1 },
      (_, i) => ymin + i * ystep,
    );
  const xticks = Array.from(
    { length: Math.floor(xmax) - Math.ceil(xmin) + 1 },
    (_, i) => 10 ** (Math.ceil(xmin) + i),
  );
  const select = (newId: string) => {
    setId(newId);
    setTemperature(0.1);
  };
  const bandLabel =
    rate.id === "13Can16O"
      ? `${rate.columns[low - 1]}–${rate.columns[high - 1]} quantiles`
      : `−${sigma}σ to +${sigma}σ`;
  return (
    <div className="shell rate-workspace">
      <aside className="rate-sidebar">
        <h2>AVAILABLE REACTIONS</h2>
        {rates.map((r) => (
          <button
            key={r.id}
            aria-pressed={id === r.id}
            onClick={() => select(r.id)}
          >
            {r.label}
            <small>
              {r.rows.filter((row) => row[4] > 0).length} tabulated points ·{" "}
              {r.rows[0][0]}–{r.validMax} GK
            </small>
          </button>
        ))}
        <div className="unavailable-rates">
          <h2>CATALOGUE ONLY</h2>
          <p>Listed in the source archive; no numerical table was supplied.</p>
          {unavailable.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </aside>
      <div className="rate-main">
        <section className="rate-panel" aria-label="Reaction-rate chart">
          <div className="rate-title">
            <h2>{rate.label}</h2>
            <span>Nₐ〈σv〉 / cm³ mol⁻¹ s⁻¹</span>
          </div>
          <div className="rate-controls">
            <label>
              Uncertainty
              <select
                value={sigma}
                onChange={(e) => setSigma(Number(e.target.value))}
              >
                {[1, 2, 3].map((s) => (
                  <option key={s} value={s}>
                    {rate.id === "13Can16O"
                      ? ["15.9–84.1%", "2.3–97.7%", "0.1–99.9%"][s - 1]
                      : `±${s}σ`}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Temperature
              <select value={range} onChange={(e) => setRange(e.target.value)}>
                <option value="full">Full supplied range</option>
                <option value="stellar">0.01–1 GK</option>
              </select>
            </label>
            <span>Logarithmic axes</span>
          </div>
          <svg
            className="chart"
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-labelledby="rate-chart-title rate-chart-description"
            onPointerMove={(e) => {
              const bounds = e.currentTarget.getBoundingClientRect();
              const fraction = Math.max(
                0,
                Math.min(
                  1,
                  (((e.clientX - bounds.left) / bounds.width) * W - L) / pw,
                ),
              );
              setTemperature(10 ** (xmin + fraction * (xmax - xmin)));
            }}
          >
            <title id="rate-chart-title">{`${rate.label} reaction rate and ${bandLabel}`}</title>
            <desc id="rate-chart-description">
              Logarithmic plot of supplied table values. Use the temperature
              slider or the complete data table below for exact values.
            </desc>
            {yticks.map((v) => (
              <g key={v}>
                <path className="grid" d={`M${L} ${y(10 ** v)}H${W - R}`} />
                <text x={L - 12} y={y(10 ** v) + 4} textAnchor="end">
                  10
                  <tspan dy="-5" fontSize="8">
                    {v}
                  </tspan>
                </text>
              </g>
            ))}
            {xticks.map((v) => (
              <g key={v}>
                <path className="grid" d={`M${x(v)} ${T}V${H - B}`} />
                <text x={x(v)} y={H - B + 24} textAnchor="middle">
                  {v}
                </text>
              </g>
            ))}
            <path className="band" d={band} />
            <path className="median-line" d={line} />
            <path
              stroke="#88949a"
              strokeDasharray="4 4"
              d={`M${x(row[0])} ${T}V${H - B}`}
            />
            <circle
              cx={x(row[0])}
              cy={y(row[4])}
              r="5"
              fill="#b52d28"
              stroke="white"
              strokeWidth="2"
            />
            <text x={L + pw / 2} y={H - 7} textAnchor="middle">
              Temperature (GK)
            </text>
            <text
              transform={`translate(18 ${T + ph / 2}) rotate(-90)`}
              textAnchor="middle"
            >
              Nₐ〈σv〉 (cm³ mol⁻¹ s⁻¹)
            </text>
          </svg>
          <div className="chart-legend">
            <span>Median</span>
            <span>{bandLabel}</span>
          </div>
          <div className="rate-readout">
            <label htmlFor="temperature-slider" className="result-count">
              Inspect a tabulated temperature
            </label>
            <input
              id="temperature-slider"
              type="range"
              min="0"
              max={rows.length - 1}
              value={index}
              aria-valuetext={`${row[0]} GK, median ${fmt(row[4])} cubic centimetres per mole per second`}
              onChange={(e) => setTemperature(rows[Number(e.target.value)][0])}
            />
            <div className="readout-values" aria-live="polite">
              <span>
                Temperature<strong>{row[0]} GK</strong>
              </span>
              <span>
                Median rate<strong>{fmt(row[4])}</strong>
              </span>
              <span>
                Lower ({rate.columns[low - 1]})<strong>{fmt(row[low])}</strong>
              </span>
              <span>
                Upper ({rate.columns[high - 1]})
                <strong>{fmt(row[high])}</strong>
              </span>
            </div>
          </div>
          <p className="rate-notes">
            Values are read directly from the supplied table. Lines connect
            tabulated points for viewing; no interpolated or extrapolated rates
            are reported. 1 GK = 10⁹ K.
          </p>
          {rate.rows.length !== positive.length && (
            <div className="notice mt-5 mb-0">
              <strong>Source-table limitation:</strong> the 16 rows above 2 GK
              contain zeros in every rate column. They are retained in the table
              and downloads, and excluded from the plot and temperature
              selector.
            </div>
          )}
          <div className="downloads">
            <a
              className="button button-dark"
              href={asset(`/data/rates/${id}.csv`)}
              download
            >
              <Download size={14} /> Download CSV
            </a>
            <a
              className="button button-outline"
              href={asset(`/data/rates/${id}.txt`)}
              download
            >
              Original text <Download size={14} />
            </a>
            <a
              className="button button-outline"
              href={asset(`/data/rates/${id}.zip`)}
              download
            >
              Original ZIP <Download size={14} />
            </a>
          </div>
        </section>
        <details className="table-details">
          <summary>Complete data table · {rate.rows.length} rows</summary>
          <div className="table-scroll">
            <table className="rate-table">
              <caption className="sr-only">
                {rate.label}. Temperature in GK; all rate columns in cm³ mol⁻¹
                s⁻¹. Zero-filled rows are flagged.
              </caption>
              <thead>
                <tr>
                  <th scope="col">T / GK</th>
                  {rate.columns.map((c) => (
                    <th scope="col" key={c}>
                      {c}
                    </th>
                  ))}
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {rate.rows.map((r) => (
                  <tr key={r[0]} aria-selected={r[0] === row[0]}>
                    <th scope="row">{r[0]}</th>
                    {r.slice(1).map((v, i) => (
                      <td key={i}>{fmt(v)}</td>
                    ))}
                    <td>
                      {r[4] === 0 ? "Zero-filled source row" : "Tabulated"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <section className="rate-method">
          <h3>
            Method & reference <ArrowUpRight size={16} className="inline" />
          </h3>
          <LegacyContent
            html={rate.html.replace(
              /<p>\s*(?:<[^>]+>)*\s*(?:VIEW|DOWNLOAD)[\s\S]*?<\/p>/g,
              "",
            )}
          />
          <p className="rate-notes">
            Method descriptions and references are preserved from the source
            archive. Consult the cited publication for definitions and
            applicability.
          </p>
        </section>
        <details className="table-details">
          <summary>All 13 reactions in the source catalogue</summary>
          <p className="rate-notes">
            Interactive data are available for the five reactions above. The
            following eight entries were listed without a numerical table:
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            {unavailable.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
