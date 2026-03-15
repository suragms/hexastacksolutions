/**
 * Generate public/sitemap.xml for www.hexastacksolutions.com
 * Core pages + blog + Kerala (14×14) + India (36×14) + Gulf (10×14)
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.hexastacksolutions.com';
const lastmod = new Date().toISOString().split('T')[0];

const corePaths = [
    '/',
    '/services',
    '/work',
    '/blog',
    '/contact',
    '/pricing',
    '/about',
    '/solutions',
    '/products',
    '/products/hexabill',
    '/privacy',
    '/terms',
    '/kerala',
    '/gulf-vat',
];

const blogSlugs = [
    'website-cost-kerala-2026',
    'restaurant-pos-uae-case-study',
    'pos-software-restaurants-kerala-2026',
    'vat-compliant-billing-software-uae',
    'vat-billing-software-uae-2026',
    'web-development-company-thrissur',
    'medical-lab-software-kerala',
    'medical-lab-software-kerala-2026',
    'whatsapp-business-setup-kerala-2026',
    'ai-integration-small-business-kerala',
    'choose-mobile-app-developer-kerala',
    'nutriscan-ai-food-recognition-app',
];

const serviceSlugs = [
    'website-development', 'pos-software', 'billing-software', 'restaurant-pos', 'erp-software',
    'medical-software', 'lab-software', 'ecommerce', 'custom-software', 'web-app',
    'ai-solutions', 'mobile-app-development', 'crm', 'whatsapp-business',
];

const keralaSlugs = [
    'thrissur', 'ernakulam', 'kozhikode', 'thiruvananthapuram', 'kollam', 'alappuzha',
    'palakkad', 'malappuram', 'kannur', 'kasaragod', 'kottayam', 'pathanamthitta', 'idukki', 'wayanad',
];

const indiaSlugs = [
    'kerala', 'tamil-nadu', 'karnataka', 'maharashtra', 'andhra-pradesh', 'telangana',
    'west-bengal', 'gujarat', 'rajasthan', 'madhya-pradesh', 'uttar-pradesh', 'delhi',
    'punjab', 'haryana', 'bihar', 'odisha', 'assam', 'jharkhand', 'chhattisgarh',
    'uttarakhand', 'himachal-pradesh', 'goa', 'jammu-kashmir', 'ladakh', 'sikkim',
    'meghalaya', 'manipur', 'nagaland', 'tripura', 'mizoram', 'arunachal-pradesh',
    'chandigarh', 'puducherry', 'andaman-nicobar', 'dadra-nagar-haveli',
];

const gulfSlugs = ['uae', 'saudi-arabia', 'oman', 'qatar', 'kuwait', 'bahrain', 'yemen', 'iraq', 'jordan', 'lebanon'];

const urls = [];

function add(loc, priority = '0.8') {
    urls.push({ loc: BASE + loc, lastmod, priority });
}

corePaths.forEach((p) => add(p));
blogSlugs.forEach((slug) => add(`/blog/${slug}`, '0.7'));

serviceSlugs.forEach((svc) => {
    keralaSlugs.forEach((loc) => add(`/services/${svc}-${loc}-kerala`, '0.6'));
});
serviceSlugs.forEach((svc) => {
    indiaSlugs.forEach((state) => add(`/services/${svc}-${state}-india`, '0.6'));
});
serviceSlugs.forEach((svc) => {
    gulfSlugs.forEach((country) => add(`/services/${svc}-${country}`, '0.6'));
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Wrote sitemap.xml with', urls.length, 'URLs');
module.exports = { urls };
