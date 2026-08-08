/**
 * Route / sitemap parity check.
 *
 * Ensures the public route set (scripts/public-routes.cjs → ALL_PUBLIC_PATHS, used by
 * generate-sitemap.cjs and prerender.cjs) stays in sync with the real route table in
 * src/App.tsx and the concrete service/blog slug sets. Fails the build (exit 1) on drift
 * so a new page can never silently disappear from the sitemap (or a sitemap URL 404) again.
 *
 * Wired into "prebuild" in package.json, before generate-sitemap.cjs.
 */
const fs = require('fs');
const path = require('path');
const { ALL_PUBLIC_PATHS, BLOG_PATHS, LOCAL_SEO_PATHS } = require('./public-routes.cjs');

const ROOT = path.join(__dirname, '..');

function readSource(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

/** All `<Route path="..." />` values declared in src/App.tsx. */
function readAppRoutes() {
  const src = readSource('src/App.tsx');
  return [...src.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
}

/** `slug: '...'` values from a data file (serviceCatalog.ts / servicesManifest.ts). */
function readSlugs(relPath) {
  const src = readSource(relPath);
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

/** Special-case slugs handled directly in ServiceDetailPage (`if (slug === '...')`). */
function readServiceDetailSpecialSlugs() {
  const src = readSource('src/pages/ServiceDetailPage.tsx');
  return [...src.matchAll(/slug === '([^']+)'/g)].map((m) => m[1]);
}

const errors = [];

function main() {
  const appRoutes = readAppRoutes();

  // Concrete static routes from App.tsx (drop dynamic :param, /admin, and the 404 catch-all).
  const staticConcrete = appRoutes.filter(
    (p) => !p.includes(':') && p !== '/admin' && p !== '*'
  );

  // Expand the dynamic service route against every real slug.
  const serviceSlugs = new Set([
    ...readSlugs('src/data/serviceCatalog.ts'),
    ...readSlugs('src/data/servicesManifest.ts'),
    ...readServiceDetailSpecialSlugs(),
  ]);
  const serviceRoutes = [...serviceSlugs].map((slug) => `/services/${slug}`);

  // Every concrete public page that has real content and is routed.
  const routedPublicPaths = new Set([...staticConcrete, ...serviceRoutes]);

  // Check A: a routed page with real content must appear in the sitemap/prerender set.
  for (const route of [...routedPublicPaths].sort()) {
    if (!ALL_PUBLIC_PATHS.includes(route)) {
      errors.push(`Route exists but is MISSING from sitemap (scripts/public-routes.cjs): ${route}`);
    }
  }

  // Check B: every sitemap URL must have a matching route.
  for (const route of ALL_PUBLIC_PATHS) {
    if (!routedPublicPaths.has(route)) {
      errors.push(`Sitemap URL has NO matching route in src/App.tsx: ${route}`);
    }
  }

  if (errors.length > 0) {
    console.error('\n[route-parity] FAILED — public routes and sitemap are out of sync:\n');
    for (const e of errors) console.error('  ✗ ' + e);
    console.error(
      '\nFix scripts/public-routes.cjs (or the route/App.tsx) so every routed page is in the sitemap and every sitemap URL resolves.'
    );
    process.exit(1);
  }

  console.log(
    `[route-parity] OK — ${ALL_PUBLIC_PATHS.length} sitemap URLs all resolve; ` +
      `${routedPublicPaths.size} routed public pages all in sitemap.`
  );
}

main();
