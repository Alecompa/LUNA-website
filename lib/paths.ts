export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  "",
);
export const asset = (path: string) =>
  path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
export const localHtml = (html: string) =>
  html.replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
export const plainTitle = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
