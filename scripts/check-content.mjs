import fs from "node:fs";
import assert from "node:assert/strict";
import crypto from "node:crypto";
const data = JSON.parse(
  fs.readFileSync("content/imported/legacy.json", "utf8"),
);
assert.equal(data.pages.publications.records.length, 97);
assert.equal(data.experiments.length, 31);
assert.equal(data.experiments.filter((e) => e.status === "ongoing").length, 5);
assert.equal(data.experiments.filter((e) => e.status === "past").length, 26);
assert.equal(new Set(data.experiments.map((e) => e.id)).size, 31);
assert.equal(data.experiments.find((e) => e.id === "luna-156").status, "past");
assert.equal(data.experiments.find((e) => e.id === "14n-pg").status, "past");
assert.equal(data.unavailableRates.length, 8);
assert.equal(data.rates.length, 5);
const counts = {
  "6Lipg7Be": 46,
  "12Cpg13N": 54,
  "13Cpg14N": 54,
  "13Can16O": 78,
  "17Opg18F": 99,
};
for (const rate of data.rates) {
  const raw = fs.readFileSync(`public/data/rates/${rate.id}.txt`);
  assert.equal(
    crypto.createHash("sha256").update(raw).digest("hex"),
    rate.sha256,
  );
  const rows = raw
    .toString()
    .split(/\r?\n/)
    .map((l) => l.trim().split(/\s+/).map(Number))
    .filter((r) => r.length === 8 && r.every(Number.isFinite));
  assert.deepEqual(rate.rows, rows);
  assert.equal(rows.length, counts[rate.id]);
  assert.equal(
    rows.filter((r) => r[4] === 0).length,
    rate.id === "17Opg18F" ? 16 : 0,
  );
  assert.equal(
    Math.max(...rows.filter((r) => r[4] > 0).map((r) => r[0])),
    rate.validMax,
  );
  for (let i = 0; i < rows.length; i++) {
    assert(rows[i][0] > 0);
    if (i) assert(rows[i][0] > rows[i - 1][0]);
    for (let j = 1; j < 7; j++) assert(rows[i][j] <= rows[i][j + 1]);
  }
  const csv = fs
    .readFileSync(`public/data/rates/${rate.id}.csv`, "utf8")
    .trim()
    .split("\n")
    .slice(1)
    .map((l) => l.split(",").map(Number));
  assert.deepEqual(rows, csv);
}
const contents = [
  ...Object.values(data.pages),
  ...data.experiments,
  ...data.news,
  ...data.rates,
];
for (const item of contents) {
  assert(!/<script|<form| on\w+=|javascript:/i.test(item.html));
  for (const match of item.html.matchAll(
    /(?:href|src)="(\/(?:legacy|data)\/[^"#]+)"/g,
  )) {
    assert(fs.existsSync("public" + decodeURIComponent(match[1])), match[1]);
  }
}
assert(
  data.pages["work-with-us"].html.includes(
    "mailto:alba.formicola@roma1.infn.it",
  ),
);
assert(data.pages["work-with-us"].html.includes("mailto:m.aliotta@ed.ac.uk"));
console.log(
  "Content checks passed: 31 experiments, 5 rates / 331 rows, 8 catalogue-only entries, local assets, contact links and original-data hashes.",
);
