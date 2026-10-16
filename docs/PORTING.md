# First content port

This port retains the existing LUNA-website project and GitHub/Vercel destination. It uses the LUNAweb backup as the content authority for the programme. The exact imported commit is recorded in `content/imported/manifest.json`.

## Coverage

| Source content | Destination |
| --- | --- |
| About LUNA, scientific motivation and accelerator history | `/about/`, `/resources/50-kv/`, `/resources/400-kv/` |
| 5 ongoing experiments | `/experiments/` (Ongoing) |
| 26 past programme entries, including repeated reactions at different facilities/campaigns | `/experiments/#past` |
| Complete experiment motivations, aims, setups, PIs, figures and references | Individual experiment pages |
| Original LUNA-MV future programme | `/experiments/future/`, with historical context |
| Participating institutions and named members | `/collaboration/` |
| 97 publication entries, reviews and related coverage | `/publications/` |
| Full thesis list, supervisors and links | `/theses/` |
| 13-entry reaction-rate catalogue, 5 numerical datasets | `/reaction-rates/` |
| GIANTS, ChETEC and IReNA | `/network/` |
| Eight thesis project descriptions, fellowships and public contacts | `/work-with-us/` |
| Three legacy news articles and scholarship PDF | `/news/` |
| Nature deuterium story and related figures/coverage | `/resources/deuterium-nature/` |
| Existing Markdown experiments, news and science-story route | Retained, with draft content clearly labelled |

All imported article-body text is preserved, apart from decoding Joomla email cloaks and removing presentation/administration markup. Internal links point to the new routes. Source images and downloadable files are local. The full mapping and missing-target report are machine-readable in the manifest (zero unresolved local targets at import).

## Scientific and editorial decisions

- Classification follows the **programme indexes**, not a file's directory name. Oxygen-17 article 156 is listed under past experiments even though its legacy path says ongoing. The Bellotti nitrogen-14 campaign is also past.
- The future page's 2021/2022 delivery schedule is retained as a **historical facility plan**, alongside the supplied About page's October 2023 inauguration date. It is not presented as a current construction schedule.
- The past index's `18O(p,alpha)14N` typo is corrected to `18O(p,alpha)15N`, matching its linked article. Original source bodies and scientific reference wording otherwise remain unchanged.
- The original Markdown descriptions remain available under “Additional background”. They may describe an earlier stage of the campaign; the imported programme status is the displayed status.
- The publication archive is labelled with its actual source update, **June 2026**, rather than claiming an automatic current-date update.
- The existing incomplete PRL news paragraph contained literal `VALUE` placeholders. Those numerical claims are replaced with a link to the corresponding publication. The unfinished science story is explicitly in preparation.
- The previous contact form only logged submissions. It is replaced with the public spokesperson address and real research-opportunity links.
- Opportunities retain historical scheme descriptions. Applicants are directed to the linked institutions for current terms and deadlines.

## Reaction-rate integrity

| Reaction | Rows | Positive-data range (GK) | Source uncertainty columns |
| --- | ---: | --- | --- |
| 6Li(p,gamma)7Be | 46 | 0.001–1 | −3σ, −2σ, −1σ, median, +1σ, +2σ, +3σ |
| 12C(p,gamma)13N | 54 | 0.007–10 | same |
| 13C(p,gamma)14N | 54 | 0.007–10 | same |
| 13C(alpha,n)16O | 78 | 0.001–1 | 0.1%, 2.3%, 15.9%, 50%, 84.1%, 97.7%, 99.9% |
| 17O(p,gamma)18F | 99 | 0.001–2 | −3σ…median…+3σ |

The final 16 oxygen-17 rows (2.5–10 GK) contain zeros in every rate column. They remain in the original downloads, CSV and full table, with an explicit label. They are excluded from logarithmic plotting and the temperature selector. The explorer reports exact tabulated points, never extrapolated or interpolated scientific values. Connecting lines are visual guides only.

The eight other catalogue entries have no supplied tables; they remain discoverable and explicitly marked as catalogue-only. No missing numerical rates were invented.

The source contains historical citation/wording inconsistencies (including the stated year on the carbon-13 alpha-neutron method page and some incomplete publication identifiers). These are preserved pending scientific editorial review; this port verifies transfer fidelity, not every external publication or current institutional affiliation.

## Validation

- Source text comparison, normalized only for whitespace, against the supplied article bodies; public email cloaks checked separately.
- Numerical equality of the imported rows and CSV against the original text files, original-file SHA-256 fingerprints, ordered temperature grids and uncertainty columns.
- Production static build and all generated local HTML href/src targets.
- Root-hosted and `/luna/` subdirectory exports.
- Browser checks of desktop/mobile navigation, experiment filtering, rate selection, uncertainty bands, temperature lookup and archive filters.

The GitHub connection was verified against `origin/main` before editing. Deployment status is checked separately after pushing; a local build alone does not confirm Vercel deployment.
