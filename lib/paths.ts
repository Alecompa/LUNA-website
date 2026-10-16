export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  "",
);
export const asset = (path: string) =>
  path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
// Archive pages that were merged into the redesigned site.
const MOVED: Record<string, string> = {
  "/resources/50-kv/": "/facilities/#luna-50",
  "/resources/400-kv/": "/facilities/#luna-400",
  "/experiments/future/": "/facilities/#bellotti",
  "/network/": "/collaboration/#networks",
};
export const localHtml = (html: string) =>
  html
    .replace(/(href)="(\/[^"#]*)"/g, (m, attr, url) =>
      MOVED[url] ? `${attr}="${MOVED[url]}"` : m,
    )
    .replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
export const plainTitle = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
