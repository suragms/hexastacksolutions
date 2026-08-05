# Static prerender (`scripts/prerender.cjs`)

After `vite build`, the build script runs **`node scripts/prerender.cjs`**, which:

1. Serves the `dist/` folder over HTTP on a random local port.
2. Launches **headless Chrome/Chromium** via Puppeteer.
3. Visits each route listed in [`scripts/public-routes.cjs`](scripts/public-routes.cjs) (`ALL_PUBLIC_PATHS`).
4. Waits until `#root` has children and the body has sufficient text, then writes **per-route HTML** (e.g. `dist/pricing/index.html`).

## Requirements

- **Local builds:** A Chrome or Edge binary must be available. The script checks common paths (Windows Program Files, macOS, Linux) or **`PUPPETE_EXECUTABLE_PATH`**.
- **Vercel:** Uses **`@sparticuz/chromium`** (see `prerender.cjs`); `VERCEL` / `VERCEL_ENV` must be set as on the platform.

## Failure mode (fail-soft)

`prerender.cjs` is **fail-soft**: if headless Chrome can't launch (e.g. missing browser on CI) or a route times out, it logs a warning and **continues without failing the build**. The site then ships as the normal SPA (as before), just without per-route static HTML for the skipped routes. This keeps deployments safe while still prerendering whenever a browser is available.

**Mitigation:** To get static HTML for every route, ensure Chrome/Chromium is available (Vercel uses `@sparticuz/chromium`; locally the script finds a system Chrome/Edge or `PUPPETE_EXECUTABLE_PATH`), and keep new public marketing routes in `scripts/public-routes.cjs` so they receive static HTML. To opt out of prerendering entirely, set `SKIP_PRERENDER=1`.

## Verification

After a successful build, open `dist/index.html` and a nested route such as `dist/pricing/index.html` and confirm visible headings and copy in the saved HTML, not an empty root.
