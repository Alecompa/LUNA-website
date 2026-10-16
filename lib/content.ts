// Editorial layer on top of the imported archive: burning stages, figures,
// facility facts and short scientific summaries. Facts are drawn from
// Guglielmetti et al., Oxford Research Encyclopedia of Physics (2026) and
// Aliotta et al., Annu. Rev. Nucl. Part. Sci. 72 (2022) 177.

export const REVIEWS = {
  oxford: {
    short: "Guglielmetti et al. 2026",
    cite: "A. Guglielmetti, E. Masha, D. Piatti, D. Rapagnani, J. Skowronski, “Reactions in Stars Measured in Underground Laboratories”, Oxford Research Encyclopedia of Physics (2026)",
    href: "https://doi.org/10.1093/9780197851753.003.0170",
  },
  annrev: {
    short: "Aliotta et al. 2022",
    cite: "M. Aliotta, A. Boeltzig, R. Depalo, Gy. Gyürky, “Exploring Stars in Underground Laboratories: Challenges and Solutions”, Annu. Rev. Nucl. Part. Sci. 72 (2022) 177",
    href: "https://www.annualreviews.org/doi/abs/10.1146/annurev-nucl-110221-103625",
  },
} as const;
export type ReviewKey = keyof typeof REVIEWS;

// ---------------------------------------------------------------- stages
export type StageId = "bbn" | "pp" | "cno" | "nena" | "he" | "c" | "methods";
export type Stage = {
  id: StageId;
  name: string;
  short: string;
  where: string;
  temperature: string;
  color: string;
};
export const STAGES: Stage[] = [
  { id: "bbn", name: "Big Bang nucleosynthesis", short: "Big Bang", where: "The first minutes", temperature: "≈ 1 GK", color: "#7c6cf2" },
  { id: "pp", name: "p–p chain", short: "p–p chain", where: "The Sun and low-mass stars", temperature: "≈ 15 MK", color: "#e9a23b" },
  { id: "cno", name: "CNO cycles", short: "CNO", where: "Massive stars, giants, novae", temperature: "20–80 MK", color: "#e2582f" },
  { id: "nena", name: "NeNa & MgAl cycles", short: "NeNa · MgAl", where: "AGB stars, novae, globular clusters", temperature: "> 50 MK", color: "#c8325f" },
  { id: "he", name: "Helium burning & s-process", short: "He · s-process", where: "AGB and massive stars", temperature: "0.1–0.3 GK", color: "#8a3fb0" },
  { id: "c", name: "Carbon burning", short: "Carbon", where: "Massive stars, supernovae", temperature: "≈ 0.8 GK", color: "#3657c9" },
];
export const METHODS_STAGE: Stage = { id: "methods", name: "Methods & instrumentation", short: "Methods", where: "", temperature: "", color: "#8b8b8b" };
export const stageById = (id: StageId) =>
  id === "methods" ? METHODS_STAGE : STAGES.find((s) => s.id === id)!;

// --------------------------------------------------------------- figures
export type Figure = {
  src: string;
  caption: string;
  source?: ReviewKey | "archive";
  fig?: string;
  kind: "plot" | "photo" | "diagram";
};
const f = (src: string, caption: string, kind: Figure["kind"], source?: Figure["source"], fig?: string): Figure => ({ src, caption, kind, source, fig });
export const FIGURES = {
  network: f("/media/figures/pp-cno-network.webp", "Hydrogen burning: the three p–p chains and the CNO cycles.", "diagram", "oxford", "Fig. 1"),
  gamow: f("/media/figures/gamow-peak.webp", "The Gamow peak for ⁶Li(p,γ)⁷Be at 5 MK: the product of the Maxwell–Boltzmann tail and the tunnelling probability.", "plot", "oxford", "Fig. 2"),
  depth: f("/media/figures/depth-flux.webp", "Cosmic-ray fluxes versus depth. Under 1.4 km of rock, Gran Sasso suppresses the muon flux by about six orders of magnitude.", "plot", "oxford", "Fig. 3"),
  luna400: f("/media/figures/luna400-setup.webp", "The LUNA 400 kV accelerator with its solid-target (red) and gas-target (blue) beamlines.", "photo", "oxford", "Fig. 4"),
  beamlines: f("/media/figures/luna400-beamlines.webp", "Inside the LUNA 400 kV hall.", "photo", "annrev", "Fig. 2"),
  carbon: f("/media/figures/carbon-sfactors.webp", "S-factors of ¹²C+p and ¹³C+p from LUNA and Felsenkeller, with the Gamow windows of red-giant and AGB burning.", "plot", "oxford", "Fig. 8"),
  bgo: f("/media/figures/bgo-setup.webp", "The high-efficiency BGO setup used for the 64.5 keV resonance in ¹⁷O(p,γ)¹⁸F.", "diagram", "oxford", "Fig. 9"),
  nenamgal: f("/media/figures/nena-mgal-cycles.webp", "The NeNa (light) and MgAl (dark) cycles.", "diagram", "oxford", "Fig. 10"),
  neon: f("/media/figures/neon-rates.webp", "LUNA rates for ²⁰Ne(p,γ)²¹Na (left) and ²¹Ne(p,γ)²²Na (right) relative to Iliadis et al. (2010); shaded bands are 1σ.", "plot", "oxford", "Fig. 11"),
  particles: f("/media/figures/particle-array.webp", "The silicon particle-detector array at LUNA 400 kV, seen from the target position.", "photo", "oxford", "Fig. 12"),
  alratio: f("/media/figures/al27-ratio.webp", "Rate ratio ²⁷Al(p,γ)²⁸Si / ²⁷Al(p,α)²⁴Mg and its uncertainty: up to six orders of magnitude.", "plot", "oxford", "Fig. 13"),
  n14bellotti: f("/media/figures/n14-bellotti-setup.webp", "Angular-distribution setup for ¹⁴N(p,γ)¹⁵O at the Bellotti Ion Beam Facility.", "photo", "oxford", "Fig. 14"),
  c12c12: f("/media/figures/c12c12-setup.webp", "The ¹²C+¹²C setup at the Bellotti facility, shielding open.", "photo", "oxford", "Fig. 15"),
  nealpha: f("/media/figures/ne22-alpha-setup.webp", "The ²²Ne+α setup at the Bellotti facility.", "photo", "oxford", "Fig. 16"),
  hpgeBackground: f("/media/figures/background-hpge.webp", "γ-ray background in a HPGe detector: surface laboratory (black) versus shielded at LUNA (red).", "plot", "annrev", "Fig. 3a"),
  dpg: f("/media/figures/dpg-sfactor.webp", "S-factor of D(p,γ)³He: LUNA data (red) against the literature.", "plot", "annrev", "Fig. 3b"),
  neutronBackground: f("/media/figures/neutron-background.webp", "Neutron-counter background on the surface and underground, for aluminium and steel housings.", "plot", "annrev", "Fig. 5a"),
  c13an: f("/media/figures/c13an-sfactor.webp", "S-factor of ¹³C(α,n)¹⁶O: the LUNA points reach into the s-process Gamow window.", "plot", "annrev", "Fig. 5b"),
  baryon: f("/legacy/images/News/plot-1D.png", "Likelihood of the baryon density with (red) and without the LUNA rate, against CMB constraints.", "plot", "archive"),
  dpgNature: f("/legacy/images/News/Sfactor_web.png", "S-factor of D(p,γ)³He with the new LUNA data and best fit.", "plot", "archive"),
  lunaMv: f("/media/photos/luna-mv-render.webp", "Design of the accelerator hall for the 3.5 MV machine in Hall B.", "diagram", "archive"),
} satisfies Record<string, Figure>;
export type FigureId = keyof typeof FIGURES;

export const PHOTOS = {
  hero: "/media/photos/luna-5258.webp",
  tube: "/media/photos/source.webp",
  hall: "/media/photos/accelerator.webp",
  luna400: "/media/photos/luna-5218.webp",
  collab: "/media/photos/collab-3.webp",
  collab2: "/media/photos/collab-2.webp",
};

export const facilityPhoto = (facility: string) =>
  facility.startsWith("Bellotti") ? PHOTOS.hall : facility.includes("50") ? PHOTOS.tube : PHOTOS.luna400;

// ------------------------------------------------------------ facilities
export const SITE_FACTS = [
  { value: "1.4 km", label: "of rock above the laboratory" },
  { value: "10⁻⁶", label: "residual cosmic-ray muon flux" },
  { value: "1991", label: "the first deep-underground accelerator lab" },
  { value: "90+", label: "refereed publications" },
];

export type Facility = {
  id: string;
  name: string;
  years: string;
  status: "operating" | "retired";
  image: string;
  figure?: FigureId;
  lead: string;
  specs: [string, string][];
  paper?: { label: string; href: string };
};
export const FACILITIES: Facility[] = [
  {
    id: "bellotti",
    name: "Bellotti Ion Beam Facility",
    years: "Since 2023",
    status: "operating",
    image: "/media/photos/14n-pg-mv.webp",
    figure: "lunaMv",
    lead: "A 3.5 MV single-ended Cockcroft–Walton accelerator in a dedicated, shielded hall of Hall B, opening helium and carbon burning to underground study.",
    specs: [
      ["Energy range", "0.3–3.5 MeV"],
      ["Beams", "H⁺ 1000 eμA · ⁴He⁺ 500 eμA · ¹²C⁺ 150 eμA"],
      ["Carbon, ¹²C⁺⁺", "up to 7 MeV"],
      ["Shielding", "80 cm concrete walls and doors"],
      ["Builder", "High Voltage Engineering Europa"],
      ["Programme", "¹⁴N(p,γ)¹⁵O · ¹²C+¹²C · ²²Ne+α"],
    ],
  },
  {
    id: "luna-400",
    name: "LUNA 400 kV",
    years: "Since 2001",
    status: "operating",
    image: "/media/photos/luna-5218.webp",
    figure: "luna400",
    lead: "An inline Cockcroft–Walton machine with two beamlines, a windowless gas target and a solid target, built for months-long unattended runs.",
    specs: [
      ["Beams", "H⁺ 1 mA · ⁴He⁺ 500 μA"],
      ["Energy calibration", "± 300 eV"],
      ["Proton energy spread", "< 100 eV"],
      ["Long-term drift", "5 eV/h"],
      ["Gas target", "Windowless, 3 pumping stages, 0.1–10 mbar"],
      ["Solid target", "Water-cooled, LN₂ cold trap, Faraday cup"],
    ],
    paper: { label: "Nucl. Instrum. Methods A 507 (2003) 609", href: "https://doi.org/10.1016/S0168-9002(03)01435-9" },
  },
  {
    id: "luna-50",
    name: "LUNA 50 kV",
    years: "1993–2003",
    status: "retired",
    image: "/media/photos/source.webp",
    lead: "The home-made pilot accelerator that first reached the solar Gamow window in the laboratory, with a windowless gas target and a 90° double-focusing magnet.",
    specs: [
      ["Beams", "p, ³He, ⁴He"],
      ["Energy precision", "better than 0.2 %"],
      ["Landmark", "³He(³He,2p)⁴He at solar energies"],
    ],
    paper: { label: "Nucl. Instrum. Methods A 350 (1994) 327", href: "https://doi.org/10.1016/0168-9002(94)91182-7" },
  },
];

export const TIMELINE = [
  { year: "1991", text: "LUNA founded at Gran Sasso" },
  { year: "1999", text: "³He(³He,2p)⁴He measured inside the solar Gamow peak" },
  { year: "2001", text: "400 kV accelerator replaces the 50 kV pilot" },
  { year: "2004", text: "¹⁴N(p,γ)¹⁵O rate 40 % lower: globular clusters ~1 Gyr older" },
  { year: "2017", text: "Origin of presolar stardust grains from ¹⁷O(p,α)¹⁴N" },
  { year: "2020", text: "Baryon density of the Universe from D(p,γ)³He, Nature" },
  { year: "2021", text: "¹³C(α,n)¹⁶O measured inside the s-process Gamow peak" },
  { year: "2023", text: "Bellotti Ion Beam Facility inaugurated" },
  { year: "2025", text: "LUNANOVA awarded an ERC Synergy Grant" },
  { year: "2026", text: "¹⁶O(p,γ)¹⁷F and the isotopic ratios of red giants, PRL" },
];

// Open questions driving the next campaigns (Oxford review, §6).
export const OPEN_QUESTIONS = [
  { title: "Globular-cluster anomalies", text: "O–Na and Mg–Al anticorrelations point to polluting first-generation stars.", reactions: "²³Na(p,α)²⁰Ne · ²⁴Mg(p,γ)²⁵Al · ²⁷Al(p,α/γ) · ³⁰Si(p,γ)³¹P" },
  { title: "Novae and type Ia supernovae", text: "Explosive hydrogen burning feeds Si, S, Cl and K into the interstellar medium.", reactions: "²⁸Si(p,γ)²⁹P · ²⁹Si(p,γ)³⁰P" },
  { title: "The first stars", text: "Breakout from the CNO cycle and the hot p–p chain in zero-metallicity stars.", reactions: "¹⁹F(p,γ)²⁰Ne · ¹⁹F(p,α)¹⁶O · ¹⁰B(α,d/n)" },
  { title: "The fluorine puzzle", text: "AGB stars alone cannot account for the fluorine in the Milky Way.", reactions: "¹⁵N(p,α)¹²C · ¹⁹F+p" },
  { title: "Mixing in young stars", text: "Boron isotopes burn at 3–6 MK and trace convective mixing.", reactions: "¹⁰,¹¹B(p,γ) · ¹⁰,¹¹B(p,α)" },
];

// ----------------------------------------------------------- experiments
export type ExperimentExtra = {
  stage: StageId;
  image?: string;
  figures?: FigureId[];
  result?: string;
  energies?: string;
  technique?: string;
};
export const EXPERIMENT_EXTRA: Record<string, ExperimentExtra> = {
  "19f-pg": { stage: "cno", figures: ["particles"], result: "¹⁹F(p,γ)²⁰Ne can break out of the CNO cycle in the first stars; its branching against (p,α) is the key quantity." },
  "24mg-pg": { stage: "nena", figures: ["nenamgal"], result: "The 213 keV resonance dominates the rate with up to 40 % uncertainty, limiting models of the Mg–Al anticorrelation in globular clusters.", technique: "4π BGO and HPGe at 0°" },
  "10b-alpha": { stage: "pp", image: "/media/photos/10b-alpha.webp", figures: ["particles"], result: "α captures on ¹⁰B are candidate routes of the hot p–p chain that bypass the 3α process in primordial stars." },
  shades: { stage: "he", image: "/media/photos/shades.webp", figures: ["nealpha"], result: "The main neutron source of the s-process in massive stars, studied with 18 ³He counters and 12 liquid scintillators.", technique: "Recirculating >99.995 % ²²Ne gas target" },
  "12c-12c": { stage: "c", image: "/media/photos/12c-12c.webp", figures: ["c12c12"], result: "First direct access to the carbon-burning Gamow window, 1–2 MeV, where cross sections fall to sub-femtobarn.", technique: "HPGe at 0° with NaI anti-Compton shield" },
  "3he-3he-past": { stage: "pp", result: "Measured inside the solar Gamow peak: no resonance, ruling out a nuclear solution to the solar neutrino problem.", energies: "16.5–24.4 keV", technique: "Gas target · Si detectors" },
  "luna-136": { stage: "pp", result: "Electron screening at the lowest energies.", energies: "4.2–13.8 keV", technique: "Gas target · Si detectors" },
  "luna-137": { stage: "pp", result: "Electron screening in deuterated metals." },
  "luna-129": { stage: "pp", energies: "2.5–22 keV", technique: "Gas target · 4π BGO" },
  "luna-132": { stage: "pp", result: "Prompt-γ and activation measurements for the solar ⁷Be neutrino flux.", energies: "93–170 keV", technique: "Gas target · HPGe and activation" },
  "luna-133": { stage: "cno", result: "The rate below 100 MK is 40 % lower than previously adopted, raising the age of globular clusters by 0.7–1 Gyr.", energies: "70–370 keV", technique: "Gas target · 4π BGO; solid target · HPGe" },
  "luna-134": { stage: "cno", energies: "70–375 keV", technique: "Gas and solid targets · BGO and HPGe" },
  "luna-135": { stage: "nena", result: "Total rate about twice as high, and up to five times more production of the ²⁶Al isomer.", technique: "Solid target · HPGe and 4π BGO" },
  "luna-122": { stage: "bbn", result: "First direct measurement at Big Bang energies: no resonance, so ²H(α,γ)⁶Li cannot explain the primordial ⁶Li problem.", energies: "80–133 keV", technique: "Gas target · HPGe" },
  "luna-130": { stage: "cno", result: "First access to the nova Gamow window; rate uncertainty reduced to 10 %, four times smaller.", energies: "167–370 keV", technique: "Solid target · HPGe and activation" },
  "luna-124": { stage: "cno", result: "A factor-two higher rate in intermediate-mass AGB stars, identifying 4–8 M☉ stars as the source of group II presolar grains.", technique: "Solid target · Si detectors" },
  "22ne-pg-past": { stage: "nena", figures: ["nenamgal"], result: "Three resonances observed for the first time: the AGB rate is ten times higher, its uncertainty two orders of magnitude smaller.", energies: "68–300 keV", technique: "Gas target · HPGe and 4π BGO" },
  "luna-125": { stage: "cno", energies: "55–340 keV", technique: "Solid target · Si detectors" },
  "luna-64": { stage: "nena", image: "/legacy/images/Ongoing-experiments/23Na_setup.jpg", energies: "Resonances at 138, 240, 296 keV", technique: "Solid target · HPGe and 4π BGO" },
  "luna-63": { stage: "cno", image: "/legacy/images/Ongoing-experiments/O18_pg_Setup_1.jpg", energies: "85–150 keV", technique: "Solid target · HPGe and 4π BGO" },
  "luna-60": { stage: "bbn", image: "/legacy/images/Ongoing-experiments/pd_pict.jpg", figures: ["dpg", "hpgeBackground"], result: "Cross section with ≤ 3 % systematic error, settling the most uncertain nuclear input to Big Bang deuterium predictions.", energies: "32–263 keV", technique: "Gas target · HPGe" },
  "luna-86": { stage: "bbn", image: "/legacy/images/Ongoing-experiments/6Li_setup.png", result: "The supposed resonance at 195 keV does not exist.", energies: "60–350 keV", technique: "Solid target · HPGe" },
  "luna-75": { stage: "he", image: "/legacy/images/Ongoing-experiments/Can_setup1.png", figures: ["c13an", "neutronBackground"], result: "First direct data inside the s-process Gamow window.", energies: "230–300 keV", technique: "Solid target · 18 ³He counters" },
  "luna-76": { stage: "he", image: "/legacy/images/Ongoing-experiments/22Ne-alpha_2017-2018_LUNA.png", result: "First direct limit on the 334 keV resonance that controls the rate below 0.3 GK.", energies: "Resonance at 334 keV", technique: "Gas target · 4π BGO" },
  "luna-147": { stage: "cno", figures: ["carbon"], result: "S-factors 25–30 % below earlier data; the equilibrium ¹²C/¹³C ratio is 3.6 ± 0.4 for 20–140 MK.", energies: "74–371 keV", technique: "Solid target · HPGe, BGO and activation" },
  "luna-148": { stage: "nena", image: "/legacy/images/Ongoing-experiments/20ne_pict.jpg", figures: ["neon"], result: "The slowest reaction of the NeNa cycle: first low-energy direct-capture data and the 368 keV resonance.", technique: "Gas target · HPGe" },
  "luna-156": { stage: "cno", figures: ["bgo"], result: "First direct measurement of the 64.5 keV resonance: ωγ = 30(4) peV, constraining ¹⁷O/¹⁶O to 10 %.", technique: "Solid target · segmented BGO" },
  "luna-166": { stage: "cno", result: "Constrains the carbon and oxygen isotopic ratios in red-giant-branch stars." },
  "luna-167": { stage: "nena", image: "/legacy/images/Ongoing-experiments/21Ne_pg.png", figures: ["neon"], result: "High-precision study of five low-energy resonances between 127 and 353 keV.", technique: "Gas target · HPGe" },
  "luna-163": { stage: "cno", result: "Cross section from 130 to 400 keV with the high-efficiency BGO setup.", energies: "130–400 keV", technique: "Solid target · BGO" },
  "14n-pg": { stage: "cno", image: "/media/photos/14n-bellotti.webp", figures: ["n14bellotti"], result: "The first experiment at the Bellotti facility: cross section and angular distributions from 0.25 to 1.5 MeV.", energies: "0.25–1.5 MeV", technique: "Solid target · HPGe at several angles" },
};

// --------------------------------------------------------- publications
export type PublicationExtra = {
  match: RegExp;
  figure?: FigureId;
  summary?: string;
  experiment?: string;
  highlight?: boolean;
  story?: "deuterium-nature";
};
export const PUBLICATION_EXTRA: PublicationExtra[] = [
  { match: /16O\(p,γ\)17F Reaction and the C and O/, experiment: "luna-166", figure: "network", highlight: true },
  { match: /new detection array for underground charged particle/, figure: "particles", summary: "Silicon detectors in backward geometry with 20–80 keV resolution at 3 MeV and about 10 % efficiency." },
  { match: /21Ne\(p,γ\)22Na/, experiment: "luna-167", figure: "neon", summary: "Five low-energy resonances at 127.3, 271.4, 272.3, 291.5 and 352.6 keV." },
  { match: /comprehensive study of the 14N\(p,γ\)15O/, experiment: "14n-pg", figure: "n14bellotti" },
  { match: /Detector characterization for a new 12C\+12C/, experiment: "12c-12c", figure: "c12c12" },
  { match: /high energy resolution gas target setup/, figure: "luna400" },
  { match: /Rate of 17O destruction/, experiment: "luna-156", figure: "network" },
  { match: /R-Matrix Fitting: 12C\(p,γ\)13N/, experiment: "luna-147", figure: "carbon" },
  { match: /Status and future directions .*13C\(α,n\)16O/, experiment: "luna-75", figure: "c13an" },
  { match: /D\(p,γ\)3He angular distribution/, experiment: "luna-60", figure: "dpg" },
  { match: /64\.5 keV Resonance Strength in the 17O\(p,γ\)18F/, experiment: "luna-156", figure: "bgo", highlight: true, summary: "ωγ = 30(4) peV, measured with a 200 μA beam, a redesigned target chamber and a triple-layer shield. The ¹⁷O/¹⁶O prediction is now good to 10 %." },
  { match: /Direct capture cross section and resonances in the 22Ne/, experiment: "22ne-pg-past", figure: "nenamgal" },
  { match: /Detectors and Shieldings: Past and Future/, figure: "hpgeBackground" },
  { match: /low-energy direct capture in 20Ne\(p,γ\)21Na/, experiment: "luna-148", figure: "neon", summary: "Direct capture below 352 keV and the 368 keV resonance, for nova and hot-bottom-burning temperatures." },
  { match: /Proton-Capture Rates on Carbon Isotopes/, experiment: "luna-147", figure: "carbon", highlight: true, summary: "S-factors 25 % (¹²C) and 30 % (¹³C) below the reference data. With Felsenkeller, the equilibrium ¹²C/¹³C ratio becomes 3.6 ± 0.4." },
  { match: /segmented BGO detector/, figure: "bgo" },
  { match: /334 keV resonance strength in 22Ne\(α,γ\)26Mg/, experiment: "luna-76" },
  { match: /13C\(α,n\)16O Cross Section into the s-Process Gamow Peak/, experiment: "luna-75", figure: "c13an", highlight: true, summary: "An 18-counter ³He array in steel housings brought the background low enough to reach the s-process Gamow window directly." },
  { match: /Low-energy resonances in the 18O\(p,γ\)19F/, experiment: "luna-63" },
  { match: /LUNA neutron detector array/, experiment: "luna-75", figure: "neutronBackground" },
  { match: /baryon density of the Universe/, experiment: "luna-60", figure: "dpgNature", highlight: true, story: "deuterium-nature", summary: "D(p,γ)³He with ≤ 3 % systematics, settling the most uncertain nuclear input to Big Bang nucleosynthesis." },
  { match: /no evidence of low-energy resonance in the 6Li/, experiment: "luna-86", summary: "The proposed broad resonance at 195 keV does not exist." },
  { match: /Setup commissioning for an improved measurement of the D\(p,γ\)3He/, experiment: "luna-60", figure: "hpgeBackground" },
  { match: /monitor 13C-targets degradation/, experiment: "luna-75" },
  { match: /18O\(p,γ\)19F at astrophysical energies/, experiment: "luna-63" },
  { match: /23Na\(p,γ\)24Mg reaction for astrophysics/, experiment: "luna-64" },
  { match: /18O\(p,α\)15N reaction by underground/, experiment: "luna-125" },
  { match: /Ep=71 and 105 keV Resonances in the 22Ne/, experiment: "22ne-pg-past" },
  { match: /Origin of meteoritic stardust/, experiment: "luna-124", highlight: true, summary: "The new ¹⁷O proton-capture rate matches group II presolar grains and points to 4–8 M☉ stars as their source." },
  { match: /Improved Direct Measurement of the 64\.5 keV Resonance in the 17O\(p,α\)/, experiment: "luna-124" },
  { match: /Three New Low-Energy Resonances in the 22Ne/, experiment: "22ne-pg-past", highlight: true, summary: "First direct observation of resonances below 400 keV; the AGB rate rose tenfold." },
  { match: /2H\(α,γ\)6Li Cross Section at Big Bang/, experiment: "luna-122", highlight: true, summary: "No low-energy resonance: this reaction cannot solve the primordial ⁶Li problem." },
  { match: /Underground study of the 17O\(p,γ\)18F/, experiment: "luna-130" },
  { match: /17O\(p,g\)18F Reaction Cross Section at Gamow Energies for Classical Novae/, experiment: "luna-130", summary: "Down to 167 keV, inside the Gamow window of classical novae." },
  { match: /revised 25Mg\(p,γ\)26Al/, experiment: "luna-135" },
  { match: /25Mg\(p,g\)26Al reaction at low/, experiment: "luna-135" },
  { match: /15N\(p,g\)16O/, experiment: "luna-134" },
  { match: /bottleneck of the CNO burning/, experiment: "luna-133", highlight: true, summary: "A 40 % lower ¹⁴N(p,γ)¹⁵O rate makes globular clusters, and the Universe, 0.7–1 Gyr older." },
  { match: /14N\(p,g\)15O cross section down to 70 keV/, experiment: "luna-133" },
  { match: /3He\(a,g\)7Be|3He\( a,g\)7Be|3He\(α,g\)7Be|3He\(α,γ\)7Be/, experiment: "luna-132" },
  { match: /LUNA II 400 kV accelerator/, figure: "beamlines", summary: "Up to 1 mA of protons, ± 300 eV energy calibration and 5 eV/h drift." },
  { match: /d\(p,g\)3He cross section down to the solar Gamow/, experiment: "luna-129" },
  { match: /3He\(3He,2p\)/, experiment: "3he-3he-past" },
  { match: /First Measurement of the 3He\(3He,2p\)3He Cross Section/, highlight: true, summary: "The first nuclear cross section measured inside the solar Gamow peak, and the proof that underground accelerators work." },
];
