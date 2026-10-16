import { legacy, plainTitle } from "./site";

export type Institution = {
  name: string;
  city: string;
  country: string;
  members: string[];
};

// The archive lists each institution as a bold paragraph followed by names.
function parse() {
  const html = legacy.pages.collaboration.html;
  const paras = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
  const spokesperson = plainTitle(paras[1] || "");
  const spokesInst = plainTitle(paras[2] || "");
  const list: Institution[] = [];
  for (let i = 0; i < paras.length; i++) {
    const p = paras[i];
    if (!/^<b>/.test(p) || /Spokesperson|Participating|Alba Formicola|^<b>INFN Roma, ROMA, Italy<\/b>$/.test(p) && i < 4) continue;
    const label = plainTitle(p);
    const next = paras[i + 1] && !/^<b>/.test(paras[i + 1]) ? plainTitle(paras[i + 1]) : "";
    // "Name, CITY, Country" — possibly with a second "/" affiliation.
    const parts = label.split("/")[0].split(",").map((s) => s.trim());
    const country = parts.at(-1) || "";
    const city = parts.at(-2) || "";
    const name = label.replace(/,\s*[A-ZÀ-Ý' ]{3,},\s*[A-Za-z ]+$/, "").replace(/\s*\/\s*\*?/, " · ");
    list.push({
      name: name.replace(/,\s*[A-ZÀ-Ý ]{3,},\s*\w+/g, ""),
      city: city.charAt(0) + city.slice(1).toLowerCase(),
      country,
      members: next.split(",").map((s) => s.trim()).filter(Boolean),
    });
  }
  return { spokesperson, spokesInst, list };
}
const parsed = parse();
export const spokesperson = { name: parsed.spokesperson, institution: parsed.spokesInst };
// Two entries carry a second affiliation that the generic split misreads.
export const institutions = parsed.list.map((i) =>
  i.name.startsWith("Laboratori Nazionali del Gran Sasso")
    ? { ...i, name: "INFN Laboratori Nazionali del Gran Sasso · GSSI (*)", city: "Assergi · L’Aquila" }
    : i.name.startsWith("Osservatorio Astronomico di Collurania")
      ? { ...i, name: "Osservatorio Astronomico di Collurania and INFN LNGS", city: "Teramo" }
      : i,
);
