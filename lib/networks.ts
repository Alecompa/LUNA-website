import type { StageId } from "./content";

// Reaction networks drawn on a chart of nuclides (x = neutrons N, y = protons Z),
// following Figs. 1 and 10 of Guglielmetti et al. 2026. `exps` link a reaction
// to LUNA experiment pages; `luna` marks reactions measured without their own
// page; `planned` marks campaigns announced in the review.

export type ReactionType = "pg" | "pa" | "ag" | "an" | "beta" | "other";
export type Nuclide = {
  id: string;
  z: number;
  n: number;
  /** Mass number and symbol, e.g. "12C"; "n", "p", "d", "t" for light particles. */
  label: string;
  unstable?: boolean;
  compound?: boolean;
  /** Drawing position [N, Z] when it differs from the true one (schematic charts). */
  at?: [number, number];
};
export type Reaction = {
  from: string;
  to: string;
  type: ReactionType;
  label: string;
  exps?: string[];
  luna?: boolean;
  planned?: boolean;
  /** Curvature as a fraction of the edge length; sign picks the side. */
  bend?: number;
  /** Part of the main flow animated along the network. */
  flow?: boolean;
};
export type Network = {
  stage: StageId;
  title: string;
  text: string;
  nuclides: Nuclide[];
  reactions: Reaction[];
  /** Positions compressed for legibility: no N/Z axes are drawn. */
  schematic?: boolean;
};

export const REACTION_TYPES: Record<ReactionType, string> = {
  pg: "Proton capture (p,γ)",
  pa: "(p,α) — closes a cycle",
  ag: "α capture (α,γ)",
  an: "Neutron source (α,n)",
  beta: "β⁺ decay or electron capture",
  other: "Other reaction",
};

const N = (label: string, z: number, n: number, extra: Partial<Nuclide> = {}): Nuclide => ({
  id: label,
  label,
  z,
  n,
  ...extra,
});

export const NETWORKS: Network[] = [
  {
    stage: "bbn",
    title: "Big Bang nucleosynthesis",
    text: "In the first minutes the Universe made deuterium, helium and traces of lithium. LUNA fixed the deuterium-burning rate that links primordial deuterium to the baryon density.",
    nuclides: [
      N("n", 0, 1, { unstable: true }),
      N("p", 1, 0),
      N("d", 1, 1),
      N("t", 1, 2, { unstable: true }),
      N("3He", 2, 1),
      N("4He", 2, 2),
      N("6Li", 3, 3),
      N("7Li", 3, 4),
      N("7Be", 4, 3, { unstable: true }),
    ],
    reactions: [
      { from: "p", to: "d", type: "other", label: "p(n,γ)d", flow: true },
      { from: "n", to: "d", type: "other", label: "n(p,γ)d", flow: true },
      { from: "d", to: "3He", type: "pg", label: "D(p,γ)³He", exps: ["luna-60", "luna-129"], flow: true },
      { from: "d", to: "t", type: "other", label: "d(d,p)t", exps: ["luna-137"] },
      { from: "3He", to: "4He", type: "other", label: "d(³He,p)⁴He", exps: ["luna-136"], flow: true },
      { from: "3He", to: "t", type: "other", label: "³He(n,p)t" },
      { from: "t", to: "4He", type: "other", label: "t(d,n)⁴He" },
      { from: "3He", to: "7Be", type: "ag", label: "³He(α,γ)⁷Be", exps: ["luna-132"], flow: true },
      { from: "t", to: "7Li", type: "ag", label: "t(α,γ)⁷Li" },
      { from: "7Be", to: "7Li", type: "other", label: "⁷Be(n,p)⁷Li", flow: true },
      { from: "7Li", to: "4He", type: "pa", label: "⁷Li(p,α)⁴He", flow: true },
      { from: "d", to: "6Li", type: "ag", label: "²H(α,γ)⁶Li", bend: -0.45, exps: ["luna-122"] },
      { from: "6Li", to: "7Be", type: "pg", label: "⁶Li(p,γ)⁷Be", exps: ["luna-86"] },
    ],
  },
  {
    stage: "pp",
    title: "The p–p chains",
    text: "The Sun fuses hydrogen through three branches. ³He(α,γ)⁷Be sets how often the chain takes the branches that emit ⁷Be and ⁸B neutrinos. In the first stars, α captures on boron may open a hot p–p chain.",
    nuclides: [
      N("p", 1, 0),
      N("d", 1, 1),
      N("3He", 2, 1),
      N("4He", 2, 2),
      N("7Li", 3, 4),
      N("7Be", 4, 3, { unstable: true }),
      N("8Be", 4, 4, { unstable: true }),
      N("8B", 5, 3, { unstable: true }),
      N("10B", 5, 5),
      N("12C", 6, 6),
      N("13N", 7, 6, { unstable: true }),
    ],
    reactions: [
      { from: "p", to: "d", type: "other", label: "p(p,e⁺ν)d", flow: true },
      { from: "d", to: "3He", type: "pg", label: "D(p,γ)³He", exps: ["luna-129", "luna-60"], flow: true },
      { from: "3He", to: "4He", type: "other", label: "³He(³He,2p)⁴He", exps: ["3he-3he-past"], flow: true },
      { from: "3He", to: "7Be", type: "ag", label: "³He(α,γ)⁷Be", exps: ["luna-132"], flow: true },
      { from: "7Be", to: "7Li", type: "beta", label: "⁷Be(e⁻,ν)⁷Li", flow: true },
      { from: "7Li", to: "4He", type: "pa", label: "⁷Li(p,α)⁴He", flow: true },
      { from: "7Be", to: "8B", type: "pg", label: "⁷Be(p,γ)⁸B", flow: true },
      { from: "8B", to: "8Be", type: "beta", label: "⁸B(β⁺)⁸Be", flow: true },
      { from: "8Be", to: "4He", type: "other", label: "⁸Be → 2α", flow: true },
      { from: "10B", to: "12C", type: "ag", label: "¹⁰B(α,d)¹²C", exps: ["10b-alpha"] },
      { from: "10B", to: "13N", type: "an", label: "¹⁰B(α,n)¹³N", exps: ["10b-alpha"] },
    ],
  },
  {
    stage: "cno",
    title: "The CNO cycles",
    text: "Carbon, nitrogen and oxygen catalyse hydrogen burning in stars heavier than about 1.3 M☉. ¹⁴N(p,γ)¹⁵O is the bottleneck. The (p,α) branches close the CN, NO and higher cycles, and ¹⁹F(p,γ) can break out of them.",
    nuclides: [
      N("12C", 6, 6),
      N("13N", 7, 6, { unstable: true }),
      N("13C", 6, 7),
      N("14N", 7, 7),
      N("15O", 8, 7, { unstable: true }),
      N("15N", 7, 8),
      N("16O", 8, 8),
      N("17F", 9, 8, { unstable: true }),
      N("17O", 8, 9),
      N("18F", 9, 9, { unstable: true }),
      N("18O", 8, 10),
      N("19F", 9, 10),
      N("20Ne", 10, 10),
    ],
    reactions: [
      { from: "12C", to: "13N", type: "pg", label: "¹²C(p,γ)¹³N", exps: ["luna-147"], flow: true },
      { from: "13N", to: "13C", type: "beta", label: "¹³N(β⁺)¹³C", flow: true },
      { from: "13C", to: "14N", type: "pg", label: "¹³C(p,γ)¹⁴N", exps: ["luna-147"], flow: true },
      { from: "14N", to: "15O", type: "pg", label: "¹⁴N(p,γ)¹⁵O", exps: ["luna-133", "luna-163", "14n-pg"], flow: true },
      { from: "15O", to: "15N", type: "beta", label: "¹⁵O(β⁺)¹⁵N", flow: true },
      { from: "15N", to: "12C", type: "pa", label: "¹⁵N(p,α)¹²C", flow: true },
      { from: "15N", to: "16O", type: "pg", label: "¹⁵N(p,γ)¹⁶O", exps: ["luna-134"] },
      { from: "16O", to: "17F", type: "pg", label: "¹⁶O(p,γ)¹⁷F", exps: ["luna-166"] },
      { from: "17F", to: "17O", type: "beta", label: "¹⁷F(β⁺)¹⁷O" },
      { from: "17O", to: "14N", type: "pa", label: "¹⁷O(p,α)¹⁴N", exps: ["luna-124"] },
      { from: "17O", to: "18F", type: "pg", label: "¹⁷O(p,γ)¹⁸F", exps: ["luna-156", "luna-130"] },
      { from: "18F", to: "18O", type: "beta", label: "¹⁸F(β⁺)¹⁸O" },
      { from: "18O", to: "15N", type: "pa", label: "¹⁸O(p,α)¹⁵N", exps: ["luna-125"] },
      { from: "18O", to: "19F", type: "pg", label: "¹⁸O(p,γ)¹⁹F", exps: ["luna-63"] },
      { from: "19F", to: "16O", type: "pa", label: "¹⁹F(p,α)¹⁶O", planned: true },
      { from: "19F", to: "20Ne", type: "pg", label: "¹⁹F(p,γ)²⁰Ne", exps: ["19f-pg"] },
    ],
  },
  {
    stage: "nena",
    title: "The NeNa and MgAl cycles",
    text: "Hotter hydrogen burning reshuffles neon, sodium, magnesium and aluminium. It shapes the O–Na and Mg–Al anticorrelations of globular clusters and makes the radioactive ²⁶Al seen across the Galaxy.",
    nuclides: [
      N("20Ne", 10, 10),
      N("21Na", 11, 10, { unstable: true }),
      N("21Ne", 10, 11),
      N("22Na", 11, 11, { unstable: true }),
      N("22Ne", 10, 12),
      N("23Na", 11, 12),
      N("24Mg", 12, 12),
      N("25Al", 13, 12, { unstable: true }),
      N("25Mg", 12, 13),
      N("26Al", 13, 13, { unstable: true }),
      N("26Mg", 12, 14),
      N("27Si", 14, 13, { unstable: true }),
      N("27Al", 13, 14),
      N("28Si", 14, 14),
    ],
    reactions: [
      { from: "20Ne", to: "21Na", type: "pg", label: "²⁰Ne(p,γ)²¹Na", exps: ["luna-148"], flow: true },
      { from: "21Na", to: "21Ne", type: "beta", label: "²¹Na(β⁺)²¹Ne", flow: true },
      { from: "21Ne", to: "22Na", type: "pg", label: "²¹Ne(p,γ)²²Na", exps: ["luna-167"], flow: true },
      { from: "22Na", to: "22Ne", type: "beta", label: "²²Na(β⁺)²²Ne", flow: true },
      { from: "22Ne", to: "23Na", type: "pg", label: "²²Ne(p,γ)²³Na", exps: ["22ne-pg-past"], flow: true },
      { from: "23Na", to: "20Ne", type: "pa", label: "²³Na(p,α)²⁰Ne", planned: true, flow: true },
      { from: "23Na", to: "24Mg", type: "pg", label: "²³Na(p,γ)²⁴Mg", exps: ["luna-64"] },
      { from: "24Mg", to: "25Al", type: "pg", label: "²⁴Mg(p,γ)²⁵Al", exps: ["24mg-pg"], flow: true },
      { from: "25Al", to: "25Mg", type: "beta", label: "²⁵Al(β⁺)²⁵Mg", flow: true },
      { from: "25Mg", to: "26Al", type: "pg", label: "²⁵Mg(p,γ)²⁶Al", exps: ["luna-135"], flow: true },
      { from: "26Al", to: "26Mg", type: "beta", label: "²⁶Al(β⁺)²⁶Mg", flow: true },
      { from: "26Mg", to: "27Al", type: "pg", label: "²⁶Mg(p,γ)²⁷Al", luna: true, flow: true },
      { from: "26Al", to: "27Si", type: "pg", label: "²⁶Al(p,γ)²⁷Si" },
      { from: "27Si", to: "27Al", type: "beta", label: "²⁷Si(β⁺)²⁷Al" },
      { from: "27Al", to: "24Mg", type: "pa", label: "²⁷Al(p,α)²⁴Mg", planned: true, flow: true },
      { from: "27Al", to: "28Si", type: "pg", label: "²⁷Al(p,γ)²⁸Si", planned: true },
    ],
  },
  {
    stage: "he",
    title: "Helium burning and neutron sources",
    text: "Helium burning builds carbon and oxygen. Two α-induced reactions, ¹³C(α,n)¹⁶O and ²²Ne(α,n)²⁵Mg, release the neutrons that make half of the elements heavier than iron in the s-process.",
    schematic: true,
    nuclides: [
      N("4He", 2, 2, { at: [5, 5] }),
      N("12C", 6, 6),
      N("13C", 6, 7),
      N("14N", 7, 7),
      N("16O", 8, 8),
      N("18F", 9, 9, { unstable: true }),
      N("18O", 8, 10),
      N("22Ne", 10, 12),
      N("25Mg", 12, 13),
      N("26Mg", 12, 14),
    ],
    reactions: [
      { from: "4He", to: "12C", type: "other", label: "3α → ¹²C", flow: true },
      { from: "12C", to: "16O", type: "ag", label: "¹²C(α,γ)¹⁶O", bend: 0.35, flow: true },
      { from: "12C", to: "13C", type: "other", label: "¹²C(p,γ)¹³N(β⁺)¹³C" },
      { from: "13C", to: "16O", type: "an", label: "¹³C(α,n)¹⁶O", exps: ["luna-75"] },
      { from: "14N", to: "18F", type: "ag", label: "¹⁴N(α,γ)¹⁸F", bend: 0.35, flow: true },
      { from: "18F", to: "18O", type: "beta", label: "¹⁸F(β⁺)¹⁸O", flow: true },
      { from: "18O", to: "22Ne", type: "ag", label: "¹⁸O(α,γ)²²Ne", flow: true },
      { from: "22Ne", to: "25Mg", type: "an", label: "²²Ne(α,n)²⁵Mg", exps: ["shades"], flow: true },
      { from: "22Ne", to: "26Mg", type: "ag", label: "²²Ne(α,γ)²⁶Mg", exps: ["luna-76"] },
    ],
  },
  {
    stage: "c",
    title: "Carbon burning",
    text: "Two carbon nuclei fuse into an excited ²⁴Mg that breaks up by emitting an α particle, a proton or a neutron. The rate controls carbon burning in massive stars and helps decide whether they explode as supernovae.",
    schematic: true,
    nuclides: [
      N("12C", 6, 6, { at: [10, 13] }),
      N("24Mg*", 12, 12, { compound: true }),
      N("20Ne", 10, 10),
      N("23Na", 11, 12),
      N("23Mg", 12, 11, { unstable: true }),
    ],
    reactions: [
      { from: "12C", to: "24Mg*", type: "other", label: "¹²C + ¹²C", exps: ["12c-12c"], flow: true },
      { from: "24Mg*", to: "20Ne", type: "other", label: "¹²C(¹²C,α)²⁰Ne", exps: ["12c-12c"], flow: true },
      { from: "24Mg*", to: "23Na", type: "other", label: "¹²C(¹²C,p)²³Na", exps: ["12c-12c"], flow: true },
      { from: "24Mg*", to: "23Mg", type: "other", label: "¹²C(¹²C,n)²³Mg" },
    ],
  },
];

export const networkFor = (stage: StageId) => NETWORKS.find((n) => n.stage === stage);
