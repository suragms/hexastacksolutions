# Static prerender (`scripts/prerender.cjs`)

After `vite build`, the build script runs **`node scripts/prerender.cjs`**, which:

1. Serves the `dist/` folder over HTTP on a random local port.
2. Launches **headless Chrome/Chromium** via Puppeteer.
3. Visits each route listed in [`scripts/public-routes.cjs`](scripts/public-routes.cjs) (`ALL_PUBLIC_PATHS`).
4. Waits until `#root` has children and the body has sufficient text, then writes **per-route HTML** (e.g. `dist/pricing/index.html`).

## Requirements

- **Local builds:** A Chrome or Edge binary must be available. The script checks common paths (Windows Program Files, macOS, Linux) or **`PUPPETE_EXECUTABLE_PATH`**.
- **Vercel:** Uses **`@sparticuz/chromium`** (see `prerender.cjs`); `VERCEL` / `VERCEL_ENV` must be set as on the platform.

## Failure mode

If no browser executable is found, **`prerender.cjs` exits with code 1** and the build fails (see `package.json` `build` script). If prerender is skipped or fails silently in a custom pipeline, you only get the **Vite SPA shell** (`<div id="root"></div>`) in `index.html`, which is weaker for crawlers that do not execute JavaScript.

**Mitigation:** Ensure CI installs Chrome/Chromium or sets `PUPPETE_EXECUTABLE_PATH`, and keep new public marketing routes added to `scripts/public-routes.cjs` so they receive static HTML.

## Verification

After a successful build, open `dist/index.html` and a nested route such as `dist/pricing/index.html` and confirm visible headings and copy in the saved HTML, not an empty root.
