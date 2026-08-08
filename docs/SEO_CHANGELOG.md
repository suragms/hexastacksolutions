# SEO implementation changelog

## Google Search Console — sitemap

After each deploy, confirm the live sitemap loads: `https://www.hexastacksolutions.com/sitemap.xml`

1. Open [Google Search Console](https://search.google.com/search-console) → property **URL prefix**: `https://www.hexastacksolutions.com/`
2. **Sitemaps** (left menu) → add `sitemap.xml` (or full URL above) → **Submit**
3. [`public/robots.txt`](../public/robots.txt) already references the sitemap; no change needed there unless the domain changes

`lastmod` in the sitemap is bumped when you ship meaningful URL updates so crawlers see fresh signals.

## 2026-03-28

### Per-route meta (SPA)

- Extended [`src/hooks/usePageSeo.ts`](../src/hooks/usePageSeo.ts) to set `document.title`, meta description, canonical link, **Open Graph** (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:locale`), and **Twitter** (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) on client navigation.
- Default share image: [`site.defaultOgImage`](../src/data/site.ts) (aligned with `index.html`).

### Routes wired with `usePageSeo`

- Home, Work, Contact, Terms, Privacy, Security, Rules, Refund Policy (plus existing: Blog, About, Services index, HexaBill, service landings).

### Sitemap & manifest

- [`public/sitemap.xml`](../public/sitemap.xml): `lastmod` set to **2026-04-01** (re-bump after major deploys); URLs aligned with public app routes (admin excluded).
- [`public/manifest.json`](../public/manifest.json): minimal web app manifest; linked from [`index.html`](../index.html).

### Structured data

- [`src/components/seo/FaqJsonLd.tsx`](../src/components/seo/FaqJsonLd.tsx): `FAQPage` + `Question` / `Answer` on the homepage only; FAQ copy lives in [`src/data/faq.ts`](../src/data/faq.ts) (shared with the FAQ section).
- [`src/components/seo/JsonLd.tsx`](../src/components/seo/JsonLd.tsx): Organization `sameAs` is emitted only when [`brandSocialProfileUrls`](../src/data/site.ts) is non-empty (add real profile URLs there; placeholder social links stay out of schema).

### Share previews and crawlers (important)

- **In-browser** and **Google’s rendered HTML** after JS run: meta/OG match the current route via `usePageSeo`.
- **Some social crawlers** (WhatsApp, LinkedIn, Facebook) often fetch the **initial HTML only** and may not execute JavaScript. Deep links like `/contact` may show **homepage** Open Graph tags from `index.html` until you add **SSR, prerender, or edge HTML** for those URLs. Optional follow-up: Vercel prerender or `vite-plugin-prerender` for top paths.

### Ongoing

- Re-run **Search Console** “URL inspection” after deploys.
- Bump `lastmod` in `sitemap.xml` when you materially change priority URLs.
- Add real URLs to `brandSocialProfileUrls` in `site.ts` when available.

## 2026-08-08

### Prerender root-cause fix (live site was serving a blank SPA shell)

- [`scripts/prerender.cjs`](../scripts/prerender.cjs): `@sparticuz/chromium` v149 is **ESM-only** — the CJS `require()` returns a namespace whose API lives on `.default`. The old call `chromium.executablePath()` threw `TypeError` inside the fail-soft guard, so **every route deployed as the 3.8KB empty shell** (`<div id=”root”></div>`, no content, no JSON-LD). Fixed with `chromiumNs.default || chromiumNs`, `headless: 'shell'`, and `ignoreHTTPSErrors`. Verified locally: prerendered HTML now has real title / JSON-LD / H1.
- If you deploy and want to double-check: `curl -s https://www.hexastacksolutions.com/services | grep -o '<title>[^<]*'` should show the per-route title, not the shell.

### Route / sitemap parity (enforced at build)

- New [`scripts/check-route-parity.cjs`](../scripts/check-route-parity.cjs): parses `<Route path>` from `src/App.tsx`, expands `/services/:slug` from the service catalogs, and fails the build if `src/App.tsx` and `scripts/public-routes.cjs` drift in either direction. **45/45 routes verified**; wired into the `prebuild` hook.
- `package.json` `prebuild`: `node scripts/check-route-parity.cjs && node scripts/generate-sitemap.cjs`.

### 404 handling

- Catch-all `<Route path=”*”>` added; [`src/pages/NotFound.tsx`](../src/pages/NotFound.tsx) rebuilt (Container/Section design system, `robots: noindex, follow`, WhatsApp CTA). Stale URLs now get a real 404 instead of a soft-404.

### Dead file cleanup (27 files removed)

- Removed pages/components/scripts that had **zero references** (verified across `src/`, `scripts/`, `docs/`, config): old `About/ Blog/ Contact/ Dashboard/ GulfVatPage/ Home/ KeralaHubPage/ LocationServicePage/ Login/ Portfolio/ Pricing/ Privacy/ Products/ Register/ Services/ Solutions/ Terms/ Work/`, `seo/SEOLocationPage.tsx`, `seo/WebDevelopmentThrissur.tsx`, `products/HexaBill.tsx`, `products/HexaCV.tsx`, `components/Layout.tsx`, `src/prerender.tsx`, `netlify.toml`, `netlify/functions/api.ts`, `public/_redirects`.
- **One false-positive corrected:** `src/components/SEO.tsx` was initially flagged dead by a regex bug (missed `import X from '@/components/SEO'`) and restored — it is live (blog pages + Admin).

### Structured data

- [`src/components/seo/JsonLd.tsx`](../src/components/seo/JsonLd.tsx): `ProfessionalService` node now includes `address` (PostalAddress) + `geo` (10.787, 76.23); Organization already had geo/founder/address. `sameAs` now points at **real** profiles only: X, `linkedin.com/company/hexastacksolutions` (corrected from the hyphenated URL that 301-redirected), `github.com/hexastacksolutions`.

### Local SEO content audit (Step 3)

- Re-verified the 7 local-SEO pages (`src/data/localSeoPages.ts`): max pairwise verbatim sentence overlap **19%** (software vs ERP), all others ≤17% — no doorway-page flag; pages are genuinely differentiated (distinct FAQs/services/stats/process/techStack).

### Backlink / GBP verification (Step 5)

- ✅ GitHub org `github.com/hexastacksolutions` — live. ✅ LinkedIn `in.linkedin.com/company/hexastacksolutions` — live, 136 followers (**note:** its website field currently points to a typo domain — fix in LinkedIn). ❌ JustDial / Sulekha / IndiaMART / Clutch / GoodFirms / Product Hunt — **no indexed listings found** (still outstanding). ⚠️ GBP (#23–33) cannot be verified from here — **user action required at business.google.com**. See [`SEO_RANKING_TODO.md`](../docs/SEO_RANKING_TODO.md) for updated status.

### Doc hygiene (Step 6)

- [`README.md`](../README.md): replaced stale `ENABLE_PRERENDER=1` guidance with the real `SKIP_PRERENDER=1` opt-out (prerender is on by default as part of the build).
- [`index.html`](../index.html): comment no longer references the deleted `src/prerender.tsx`.
- `.cursor/rules/`: `00-MASTER.md` (page inventory → real files, Netlify → Vercel, domain/LinkedIn), `02-SEO.md` (www canonical, `/pricing` removed from sitemap example), `10-PRODUCTION.md` (Netlify → Vercel + prerender section), `20-GOOGLE-RANKINGS.md` (www property, `/pricing` → `/contact` redirect, `/admin` noindex header).

### Image dedupe report (Step 7 — report only, nothing deleted)

- Full report presented to owner: `public/images/hexastack-assets/` (79 files, 13M) is **100% byte-duplicated** by `public/images/portfolio/` with **zero references**; root `images/` (100 files, 14M) is legacy/never-deployed; `public/images/ss/` (229K) is orphaned. **~13.2 MB** reclaimable off the deploy with sign-off. No files deleted.

### Search Console follow-up (Aug 2026 data) — user-side actions, no code

- Trend positive (homepage impressions 57→138, +142%); **zero impressions** for the 7 local-SEO target keywords; trust queries suggest GBP is unverified/wrong-city. Actions: verify GBP, fix city to Thrissur, NAP audit, request indexing for the 7 local-SEO pages via URL Inspection.

## 2026-08-08 — Web-development blog cluster + internal linking (SEO pass)

### 10 new web-development articles (all live routes, sitemap + prerender + route-parity)

New static pages in [`src/pages/blog/`](../src/pages/blog/), each with `<SEO>` + `createArticleSchema` **and** `createBreadcrumbSchema`, internal links to service pages + related posts, and a `/contact` CTA. Added to [`src/App.tsx`](../src/App.tsx) (lazy import + static route), [`scripts/public-routes.cjs`](../scripts/public-routes.cjs) (`BLOG_PATHS`), and [`src/data/blogPosts.ts`](../src/data/blogPosts.ts) (category `Web development`, Aug 2026):

1. `web-design-vs-web-development-kerala` — design vs development scoping
2. `website-development-timeline-2026` — realistic build timelines
3. `website-vs-web-application` — tool vs website decision
4. `ecommerce-website-development-kerala` — e-commerce scope + costs
5. `website-maintenance-budget-kerala` — maintenance budget/red flags
6. `web-development-company-vs-freelancer` — agency vs freelancer trade-offs
7. `website-redesign-without-losing-seo` — safe redesign checklist
8. `react-nextjs-vs-wordpress-2026` — tech-stack plain-language guide
9. `website-speed-fix-guide` — slow-site causes + fixes
10. `thrissur-business-website-not-facebook` — why own your web presence

Covers reuse the existing 6 blog JPGs (incl. previously-unused `cover-gst-gulf.jpg`); no new imagery. Sitemap now lists 20 blog posts. `check-route-parity` expects **55** public paths (was 45).

### Homepage → blog surfacing (internal linking)

- New [`src/components/sections/BlogSection.tsx`](../src/components/sections/BlogSection.tsx) renders the 3 latest posts (from `sortedBlogPostsByDate()`), linked into [`src/pages/HomePage.tsx`](../src/pages/HomePage.tsx) between OperationalProducts and Comparison. Homepage (highest authority) now links to blog posts directly.

### Structured data fixes

- [`src/components/services/SeoLanding.tsx`](../src/components/services/SeoLanding.tsx): added `Service` + `FAQPage` schema (from its existing visible FAQ) — previously only BreadcrumbList. Brings `/services/seo` to parity with the 13 catalog service pages.
- [`src/lib/seoSchemas.ts`](../src/lib/seoSchemas.ts): `createLocalBusinessSchema` postalCode **680569 → 680614** to match [`src/data/site.ts`](../src/data/site.ts) — removed a conflicting NAP signal.

### Docs

- [`docs/SEO_RANKING_TODO.md`](../docs/SEO_RANKING_TODO.md): marked genuinely-shipped items `[x]` (#34–48 blog, #51–55, #59–62) and added a dated note for the 10 new articles. Off-site/GBP/perf items left unchecked (honest status).

