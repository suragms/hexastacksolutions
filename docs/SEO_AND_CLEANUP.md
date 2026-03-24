# SEO scope & cleanup — HexaStack Solutions

**We are not pushing to Google domain.** No URL submission, no GSC indexing requests required for launch. SEO is **on-site only**: titles, meta, sitemap, clear copy.

---

## What we use (keep)

- **On-site SEO:** `src/components/SEO.tsx`, page titles, meta descriptions, canonical URLs, JSON-LD where needed.
- **Sitemap:** `public/sitemap.xml` (built from routes + `src/data/seoLocationPages.ts`).
- **Location pages:** `/seo/:locationSlug/:serviceSlug` (e.g. Thrissur, UAE) — one template, many entries in `seoLocationPages.ts`.
- **Blog:** Individual blog pages with their own titles/descriptions.

---

## Optional reference only (do not require for go-live)

- **GSC_GBP_CHECKLIST.md** — Use only if you later add the site to Google Search Console or Google Business Profile. Not required to push domain.
- **MASTER_TODO_0001_1000.md** — Task list; GSC-related tasks are optional.
- **SEO_RANKING_TODO.md, SEO_SCOPE_AND_BACKLINKS.md, DOMAIN_STRATEGY.md** — Reference. No dependency on "pushing" anything to Google.

---

## Clean repo (no extra folders)

- **No `api/`** — Removed. Backend is `server/` + Netlify Functions only.
- **No root `db/`** — Removed (legacy custom.db). DB is Prisma + MongoDB via `server/db.ts`.
- **No `files/`** — Static assets in `public/`; no standalone "files" folder at root.
- **No project-level .mjs** — Only dependencies in `node_modules` use .mjs. Root `eslint.config.mjs` and `postcss.config.mjs` are required config.
- **Build output:** `dist/` is gitignored; delete to clean; `npm run build` recreates it.

---

*Last updated: 2026-03*
