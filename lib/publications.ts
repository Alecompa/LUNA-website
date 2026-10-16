import { legacy, plainTitle } from "./site";
import {
  FIGURES,
  PUBLICATION_EXTRA,
  type Figure,
  type StageId,
} from "./content";

export type Publication = {
  slug: string;
  year: string;
  titleHtml: string;
  title: string;
  journalHtml: string;
  journal: string;
  href?: string;
  authorsHtml: string;
  authors: string;
  stage: StageId;
  figure?: Figure;
  summary?: string;
  experiment?: string;
  highlight: boolean;
  story?: "deuterium-nature";
  kind: "article" | "review" | "instrument";
};

const TOPICS: [StageId, RegExp][] = [
  ["c", /12C\s*\+\s*12C|carbon burning/i],
  ["he", /\(α,n\)|\(a,n\)|\(α,γ\)26Mg|\(α,g\)26Mg|helium burning|neutron source|s-process|22Ne\(α/i],
  ["nena", /2[0-6](Ne|Na|Mg|Al)|Mg-Al|NeNa|magnesium|Neon and Sodium|27Al/i],
  ["bbn", /Big Bang|baryon density|primordial|D\(p,γ\)|D\(p,g\)|d\(p,g\)|2H\(α|6Li/i],
  ["cno", /1[2-9][CNOF]\(p|CNO|oxygen|carbon isotopes|15N|meteoritic/i],
  ["pp", /3He|d\(3He|D\(3He|d\(d|solar|Sun|electron screening|screening/i],
];
const INSTRUMENT =
  /setup|detector|accelerator|target|array|Monte Carlo|shielding|background|commissioning|beam heating|straggling|characteri|veto|energy loss|stopping power/i;
const REVIEW =
  /Topical issue|why and how|Status and|Perspectives|Prospects|Nuclear Reaction in Stars|nuclear physics of the hydrogen|Primordial nucleosynthesis$|Shell and explosive|Helium burning and neutron|Nuclear aspects|Past and Future/i;

// Display-only abbreviations; the full journal string stays on the detail page.
const ABBREV: [RegExp, string][] = [
  [/Nuclear Instruments and Methods in Physics Research Section A(: Accelerators, Spectrometers, Detectors and Associated Equipment)?,?/, "Nucl. Instrum. Methods A"],
  [/Monthly Notices of the Royal Astronomical Society/, "MNRAS"],
  [/Journal (of )?Physics G: Nuclear and Particle Physics/, "J. Phys. G"],
  [/Physical Review Letters/, "Phys. Rev. Lett."],
  [/Physical Review C/, "Phys. Rev. C"],
  [/European Physical Journal A/, "Eur. Phys. J. A"],
  [/\s*·\s*Published.*$/, ""],
];
export const shortJournal = (j: string) =>
  ABBREV.reduce((s, [re, r]) => s.replace(re, r), j).trim();

const slugify = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, " ")
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .slice(0, 9)
    .join("-")
    .replace(/-+/g, "-");

function build(): Publication[] {
  const seen = new Set<string>();
  return legacy.pages.publications.records.map((p) => {
    const title = plainTitle(p.titleHtml);
    const journalHtml = p.parts[0] || "";
    const authorsHtml = p.parts.slice(1).join("");
    let slug = `${p.year}-${slugify(title)}`;
    while (seen.has(slug)) slug += "-2";
    seen.add(slug);
    const extras = PUBLICATION_EXTRA.filter((x) => x.match.test(title));
    const extra = Object.assign({}, ...extras) as Partial<
      (typeof PUBLICATION_EXTRA)[number]
    >;
    const stage =
      TOPICS.find(([, re]) => re.test(title))?.[0] ??
      (INSTRUMENT.test(title) ? "methods" : "pp");
    const kind = REVIEW.test(title)
      ? "review"
      : INSTRUMENT.test(title)
        ? "instrument"
        : "article";
    return {
      slug,
      year: p.year,
      titleHtml: p.titleHtml.replace(/<\/?p>/g, ""),
      title,
      journalHtml,
      journal: plainTitle(journalHtml),
      href: journalHtml.match(/href="([^"]+)"/)?.[1]?.replace(/&amp;/g, "&"),
      authorsHtml,
      authors: plainTitle(authorsHtml),
      stage: kind === "instrument" && !extra.experiment ? "methods" : stage,
      figure: extra.figure ? FIGURES[extra.figure] : undefined,
      summary: extra.summary,
      experiment: extra.experiment,
      highlight: !!extra.highlight,
      story: extra.story,
      kind,
    };
  });
}

export const publications = build();
export const highlights = publications.filter((p) => p.highlight);
export const publicationsFor = (experimentId: string) =>
  publications.filter((p) => p.experiment === experimentId);
export const publicationBySlug = (slug: string) =>
  publications.find((p) => p.slug === slug);

/** Shortened author list: first authors, then "et al." */
export const shortAuthors = (authors: string, n = 3) => {
  const list = authors
    .replace(/\(LUNA Collaboration\)/, "")
    .split(/,\s*|\s+and\s+/)
    .map((a) => a.trim())
    .filter(Boolean);
  return list.length > n ? `${list.slice(0, n).join(", ")} et al.` : list.join(", ");
};
