const fs = require('fs');
const path = require('path');
const { SITEMAP_PATHS } = require('./public-routes.cjs');

const BASE = 'https://hexastacksolutions.com';
const lastmod = new Date().toISOString().split('T')[0];

const urls = SITEMAP_PATHS.map((route) => ({
    loc: `${BASE}${route}`,
    lastmod,
    priority:
        route === '/' ? '1.0' :
        route.startsWith('/blog/') ? '0.7' :
        route.startsWith('/services/') || route.startsWith('/seo/') ? '0.6' :
        '0.8',
}));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Wrote sitemap.xml with', urls.length, 'URLs');

module.exports = { urls };
