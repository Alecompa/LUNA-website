import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const root = path.resolve(process.argv[2] || "out");
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
}
walk(root);
const broken = [];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (base && !url.startsWith(base + "/")) {
      broken.push(`${path.relative(root, file)}: unprefixed ${url}`);
      continue;
    }
    const local = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
    let target = path.join(root, local);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory())
      target = path.join(target, "index.html");
    if (!fs.existsSync(target))
      broken.push(`${path.relative(root, file)}: ${url}`);
  }
}
assert.equal(broken.length, 0, broken.join("\n"));
assert(files.length >= 50);
console.log(
  `Static export passed: ${files.length} HTML files; no broken local href/src references; base path ${base || "/"}.`,
);
