# 10 — PRODUCTION AGENT
# Deploy & Performance | Vercel + MongoDB

---

## DEPLOY CHECKLIST

```
□ npm run build completes with zero errors (tsc -b → vite build → scripts/prerender.cjs → scripts/build-api-bundle.cjs)
□ npx prisma generate runs (provider=mongodb)
□ All Vercel env vars set: DATABASE_URL, JWT_SECRET, NODE_ENV, ADMIN_EMAIL, RESEND_API_KEY
□ vercel.json controls buildCommand, outputDirectory (dist), SPA + /api rewrites, functions include for api/server-bundle.cjs
□ RESEND_API_KEY configured → test contact form → confirm email received
□ Lighthouse mobile score > 80 (test at pagespeed.web.dev)
□ No console errors in browser
□ /api/health returns { status: 'ok', db: 'connected' }
□ WhatsApp button color is green (#25D366) not dark
□ canonical URL is https://www.hexastacksolutions.com (apex 301s to www via vercel.json)
□ Prerendered static HTML: dist/<route>/index.html has real content (scripts/prerender.cjs; SKIP_PRERENDER=1 to opt out)
```

---

## PRERENDERING (static HTML per route)

- Runs as part of `npm run build` via `scripts/prerender.cjs` — renders every route in
  `scripts/public-routes.cjs` headless (Vercel: `@sparticuz/chromium`; local: system Chrome/Edge).
- **Fails soft** — if Chromium is unavailable the build still succeeds with SPA-only output.
- Opt out per-build with `SKIP_PRERENDER=1` (faster previews/CI).
- `scripts/check-route-parity.cjs` (prebuild) fails the build if `src/App.tsx` routes drift from
  `scripts/public-routes.cjs` — keep new public routes in both places.

---

## VERIFYING A DEPLOY

```
curl -sI https://www.hexastacksolutions.com/services | head -20   # expect 200, security headers, no Vary on HTML
curl -s https://www.hexastacksolutions.com/services | grep -o '<title>[^<]*'   # expect real per-route title, not SPA shell
curl -s https://www.hexastacksolutions.com/sitemap.xml | head -5   # expect XML, 45 URLs
```
