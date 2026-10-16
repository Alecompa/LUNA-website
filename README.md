# LUNA website

The LUNA collaboration website, built on the existing Next.js / React / Tailwind project. It exports a complete static HTML site with local CSS, JavaScript, images, fonts and reaction-rate downloads.

- GitHub: https://github.com/Alecompa/LUNA-website
- Testing deployment: https://luna-website-pi.vercel.app
- Legacy content source: https://github.com/mariannavagnoni/LUNAweb

## Run locally

Use Node.js 22 LTS or a newer compatible version.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Development output is kept in `.next-dev/`, separate from production builds.

## Export for institutional hosting

```sh
npm run export:html
```

This builds the site, checks every local HTML link and asset reference, and creates:

- `out/`: the complete deployable website
- `exports/luna-website-html.zip`: an uploadable archive for a domain root

For a site served at `https://institution.example/luna/`, use:

```sh
NEXT_PUBLIC_BASE_PATH=/luna npm run export:html
```

That creates `exports/luna-website-luna.zip`. Upload its contents to the institution's `/luna/` directory. The path is compiled into the website; rebuild if the destination path changes. Leave the environment variable unset for Vercel and root hosting.

The host only needs to serve static files, resolve directory URLs to `index.html`, and use `404.html` for missing pages. No Node.js server, PHP, database, image service, external font service or CDN is required at runtime. The data explorer and search controls use the included client-side JavaScript. Open the export over HTTP(S), not `file://`.

To test a root export:

```sh
python3 -m http.server 4173 --directory out --bind 127.0.0.1
```

`npm start` serves the built `out/` folder at http://127.0.0.1:4173 using the included static preview server. Set the same `NEXT_PUBLIC_BASE_PATH` when previewing a subdirectory build.

## Vercel

Keep the existing GitHub-connected project. Use the Next.js preset, `npm run build`, and the default output directory detection. Pushes to the configured production branch (`main`) should trigger the existing testing deployment. No replacement hosting project is required. `.vercel` credentials are neither needed nor committed.

## Content

- `content/imported/legacy.json`: all imported scientific content, experiment statuses, original references and five numerical rate tables.
- `content/imported/manifest.json`: pinned source commit, source-to-route map, content fingerprints and local-link audit.
- `content/experiments/`: existing Markdown descriptions, retained as additional background in the corresponding experiment pages.
- `content/articles/`, `content/posts/`: existing news and science stories. The unfinished science story is visibly marked as in preparation.
- `public/legacy/images/`: assets and original downloads from the backup.
- `public/data/rates/`: byte-preserved source text/ZIP files and CSV derivatives.
- `docs/PORTING.md`: scope, editorial decisions and remaining source caveats.

To repeat the legacy import from a local checkout (Python with `beautifulsoup4` installed):

```sh
python3 scripts/import-legacy.py /absolute/path/to/LUNAweb
npm run check:content
```

Do not import a new snapshot without reviewing its scientific and editorial changes. The importer intentionally strips Joomla styles/scripts/forms, decodes public contact addresses, remaps internal links, and keeps all substantive text and references.

## Checks

```sh
npm run check:content
npm run typecheck
npm run build
npm run check:export
```

Content checks cover 31 experiment records, status assignment, all 331 supplied rate rows, numerical column ordering, original-data hashes, CSV equality, public contacts and local assets. Export checks scan every generated HTML file, including subdirectory prefixes. Run `npm run lint` separately when needed.

The static build uses ordinary `<img>` elements intentionally, so it does not depend on a Next.js image-optimization service. Existing Next image components are configured as unoptimized.
