const fs = require('fs');
const path = require('path');
const { SITEMAP_PATHS, BLOG_PATHS, LOCAL_SEO_PATHS } = require('./public-routes.cjs');

const BASE = 'https://www.hexastacksolutions.com';
const fallbackLastmod = new Date().toISOString().split('T')[0];

/** Light parse of blogPosts.ts purely for per-slug `lastmod` dates (URL list comes from public-routes.cjs). */
function parseBlogLastmod() {
    const dataPath = path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts');
    const source = fs.readFileSync(dataPath, 'utf8');
    const postRegex = /id:\s*'([^']+)'.*?dateIso:\s*'([^']+)'/gs;
    const map = new Map();
    for (const match of source.matchAll(postRegex)) {
        map.set(match[1], match[2]);
    }
    return map;
}

/** Optional: merge published DB posts when API_URL / DATABASE is reachable at build time. */
async function fetchDbBlogPosts() {
    const api = process.env.SITEMAP_API_URL || process.env.VITE_API_URL || '';
    if (!api) return [];
    try {
        const res = await fetch(`${api.replace(/\/$/, '')}/api/blog`);
        if (!res.ok) return [];
        const posts = await res.json();
        return (posts || []).map((p) => ({
            slug: p.slug,
            dateIso: (p.publishedAt || p.createdAt || fallbackLastmod).toString().slice(0, 10),
        }));
    } catch {
        return [];
    }
}

async function main() {
    const staticLastmod = parseBlogLastmod();

    // Canonical static routes only — blog slugs come from public-routes.cjs (real content pages).
    const basePaths = [...new Set([...SITEMAP_PATHS, ...BLOG_PATHS, ...LOCAL_SEO_PATHS])];

    // Optional: real DB-published posts (only when SITEMAP_API_URL / VITE_API_URL is reachable at build).
    const dbBlog = await fetchDbBlogPosts();
    const dbBlogPaths = dbBlog.map((p) => `/blog/${p.slug}`);

    const allPaths = [...new Set([...basePaths, ...dbBlogPaths])];
    const lastmodFor = (route) => {
        if (route.startsWith('/blog/')) {
            const slug = route.replace('/blog/', '');
            return staticLastmod.get(slug) || dbBlog.find((p) => p.slug === slug)?.dateIso || fallbackLastmod;
        }
        return fallbackLastmod;
    };

    const urls = allPaths.map((route) => {
        const isBlog = route.startsWith('/blog/');
        const isLocal = LOCAL_SEO_PATHS.includes(route);
        const isLegal = ['/terms', '/privacy', '/security', '/rules', '/refund-policy'].includes(route);
        return {
            loc: `${BASE}${route}`,
            lastmod: lastmodFor(route),
            changefreq: isBlog ? 'monthly' : 'weekly',
            priority:
                route === '/' ? '1.0' :
                route.startsWith('/services/') ? '0.85' :
                isLegal ? '0.3' :
                isBlog ? '0.7' :
                isLocal ? '0.6' :
                '0.8',
        };
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

    const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(outPath, xml, 'utf8');
    console.log('Wrote sitemap.xml with', urls.length, 'URLs (canonical static routes +', dbBlog.length, 'DB posts)');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
