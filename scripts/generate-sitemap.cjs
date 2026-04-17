const fs = require('fs');
const path = require('path');
const { SITEMAP_PATHS } = require('./public-routes.cjs');

const BASE = 'https://www.hexastacksolutions.com';
const fallbackLastmod = new Date().toISOString().split('T')[0];

function parseBlogPosts() {
    const dataPath = path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts');
    const source = fs.readFileSync(dataPath, 'utf8');
    const postRegex = /id:\s*'([^']+)'.*?dateIso:\s*'([^']+)'/gs;
    const posts = [];
    for (const match of source.matchAll(postRegex)) {
        posts.push({ slug: match[1], dateIso: match[2] });
    }
    return posts;
}

const blogEntries = parseBlogPosts();
const blogLastmodMap = new Map(blogEntries.map((post) => [`/blog/${post.slug}`, post.dateIso]));

const urls = SITEMAP_PATHS.map((route) => {
    const isBlog = route.startsWith('/blog/');
    return {
        loc: `${BASE}${route}`,
        lastmod: blogLastmodMap.get(route) || fallbackLastmod,
        changefreq: isBlog ? 'monthly' : 'weekly',
        priority:
            route === '/' ? '1.0' :
            isBlog ? '0.75' :
            route.startsWith('/services/') ? '0.85' :
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
console.log('Wrote sitemap.xml with', urls.length, 'URLs');

module.exports = { urls };
