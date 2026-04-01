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
