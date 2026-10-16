import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
execFileSync(process.execPath, ["scripts/check-export.mjs"], {
  stdio: "inherit",
});
fs.mkdirSync("exports", { recursive: true });
const filename = base
  ? "luna-website-" + base.replace(/^\//, "").replaceAll("/", "-") + ".zip"
  : "luna-website-html.zip";
const destination = path.resolve("exports", filename);
if (fs.existsSync(destination)) fs.unlinkSync(destination);
fs.writeFileSync(
  "out/DEPLOYMENT.txt",
  `LUNA static website\n\nBuilt for URL path: ${base || "/"}\nUpload the contents of this directory to that path on an HTTP(S) server.\nNo Node.js, database, PHP or server-side rendering is required.\nKeep _next, vendor, legacy, data and all page directories alongside index.html.\nServe index.html for directory URLs and 404.html for missing pages.\nThe explorer and filters use the included JavaScript. Do not open via file://.\n\nTo build for another institution path, run:\nNEXT_PUBLIC_BASE_PATH=/your/path npm run export:html\n\nSource: https://github.com/Alecompa/LUNA-website\n`,
);
execFileSync("/usr/bin/zip", ["-qr", destination, "."], { cwd: "out" });
console.log(`Static HTML package: ${destination}`);
