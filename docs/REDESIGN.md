# 2026 redesign

Branch `redesign/modern-site`. Same Next.js static export, new information architecture and visual system.

## Site map

| Route | Content |
| --- | --- |
| `/` | Hero, latest paper, ongoing experiments, programme by burning stage, why underground, highlights, data, news, collaboration |
| `/about/` | Gamow window, underground background, burning networks, timeline, open questions (replaces the old About text) |
| `/experiments/`, `/experiments/[id]/` | Filter by burning stage and facility; detail pages with key result, facts panel, review figures and linked papers |
| `/facilities/` | Bellotti IBF, LUNA 400 kV, LUNA 50 kV with specifications; merges the old `/resources/50-kv`, `/resources/400-kv` and `/experiments/future` pages |
| `/publications/`, `/publications/[slug]/` | One page per paper (98) with figure, summary, authors, related experiment; the Nature deuterium story lives on its paper page |
| `/reaction-rates/` | Unchanged explorer, restyled |
| `/collaboration/` | Institutions parsed from the archive, networks (merges `/network/`) |
| `/theses/`, `/work-with-us/`, `/news/`, `/contact/` | Restyled archive content |

Removed: the placeholder `/blog/` science story, the duplicated Markdown experiment write-ups (`content/experiments/`), unused shadcn components and dependencies. Old internal links to merged pages are rewritten in `lib/paths.ts`.

## Where content lives

- `content/imported/legacy.json`, `content/updates.json`: archive and additions (unchanged).
- `lib/content.ts`: editorial layer: burning stages, figure registry, facility specs, timeline, open questions, per-experiment and per-publication enrichment (key results, energies, techniques, summaries, figure links). Publication enrichment matches titles with regular expressions, so a re-import keeps working.
- `lib/publications.ts`: builds slugs, topic tags and the publication model.
- `lib/people.ts`: parses the collaboration page into institutions.
- `public/media/figures/`: figures extracted from the two reviews below; `public/media/photos/`: web-sized photos (WebP).

Facts and figures come from:

- A. Guglielmetti et al., *Reactions in Stars Measured in Underground Laboratories*, Oxford Research Encyclopedia of Physics (2026), doi:10.1093/9780197851753.003.0170
- M. Aliotta et al., *Exploring Stars in Underground Laboratories*, Annu. Rev. Nucl. Part. Sci. 72 (2022) 177

Every figure carries a caption and source credit. **Before public release, confirm reuse permission for the review figures** (OUP and Annual Reviews hold the copyright of the published versions; several Annual Reviews figures are themselves “adapted with permission”). Swapping a figure is a one-line change in `FIGURES`.

## Design system

Palette (fixed): Pearl `#F7F6F6` background, Silver mist `#ECEBEB` panels, Bianco `#FFFFFF` cards/tables/fields, Rosso LUNA `#AF2F37` accents (hover `#90272D`), Carbone `#222222` text, footer and dark sections, Grigio medio `#666666` notes, borders `#DEDFD9`. Burning-stage hues in `STAGES` are used only to encode data.

Tokens are CSS variables at the top of `app/globals.css`. System font stack, no external fonts or CDNs.

## Adding interactive or 3D content

`app/components/viz/viz-slot.tsx` is the mount point. Wrap static fallback markup in `<VizSlot scene="name">…</VizSlot>` and register a loader in its `scenes` map. The scene is code-split and only fetched in the browser when the slot scrolls into view, so libraries like three.js never affect the static HTML or first paint. The home-page stage map already sits in a slot (`scene="stage-map"`) as the first candidate.
