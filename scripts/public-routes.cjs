/** Routes used for Vite prerender (full list). */
const CORE_PATHS = [
    '/',
    '/services',
    '/products',
    '/work',
    '/portfolio',
    '/blog',
    '/contact',
    '/about',
    '/products/hexabill',
    '/privacy',
    '/terms',
    '/kerala',
    '/gulf-vat',
];

/** Blog URLs (single canonical slug per article; no duplicate paths). */
const BLOG_PATHS = [
    '/blog/website-cost-kerala-2026',
    '/blog/restaurant-pos-uae-case-study',
    '/blog/pos-software-restaurants-kerala-2026',
    '/blog/vat-compliant-billing-software-uae',
    '/blog/vat-billing-software-uae-2026',
    '/blog/web-development-company-thrissur',
    '/blog/medical-lab-software-kerala',
    '/blog/whatsapp-business-setup-kerala-2026',
    '/blog/ai-integration-small-business-kerala',
    '/blog/choose-mobile-app-developer-kerala',
    '/blog/nutriscan-ai-food-recognition-app',
];

/** All SEO template routes (prerender + legacy URLs). */
const SEO_PATHS = [
    '/seo/thrissur/web-development',
    '/seo/ernakulam/web-development',
    '/seo/kozhikode/web-development',
    '/seo/thrissur/pos-software',
    '/seo/ernakulam/pos-software',
    '/seo/kozhikode/pos-software',
    '/seo/thrissur/billing-software',
    '/seo/thrissur/custom-software',
    '/seo/ernakulam/custom-software',
    '/seo/uae/vat-billing',
    '/seo/dubai/vat-billing',
    '/seo/kuwait/vat-billing',
    '/seo/bahrain/vat-billing',
    '/services/website-development-thrissur-kerala',
    '/services/website-development-ernakulam-kerala',
    '/services/website-development-kozhikode-kerala',
    '/services/pos-software-thrissur-kerala',
    '/services/pos-software-ernakulam-kerala',
    '/services/pos-software-kozhikode-kerala',
    '/services/billing-software-thrissur-kerala',
    '/services/custom-software-thrissur-kerala',
    '/services/custom-software-ernakulam-kerala',
    '/services/website-development-uae',
    '/services/website-development-kuwait',
    '/services/website-development-bahrain',
    '/services/pos-software-uae',
    '/services/pos-software-kuwait',
    '/services/pos-software-bahrain',
    '/services/billing-software-uae',
    '/services/billing-software-kuwait',
    '/services/billing-software-bahrain',
    '/services/custom-software-uae',
    '/services/custom-software-kuwait',
    '/services/custom-software-bahrain',
];

/**
 * Quality sitemap: core + blog + Thrissur-only SEO templates (no thin duplicates, no legal pages).
 * Other URLs remain prerendered via ALL_PUBLIC_PATHS for direct visits.
 */
const SITEMAP_PATHS = [
    '/',
    '/services',
    '/products',
    '/work',
    '/blog',
    '/contact',
    '/pricing',
    '/about',
    '/products/hexabill',
    '/kerala',
    '/gulf-vat',
    ...BLOG_PATHS,
    '/seo/thrissur/web-development',
    '/seo/thrissur/pos-software',
    '/seo/thrissur/billing-software',
    '/seo/thrissur/custom-software',
    '/services/website-development-thrissur-kerala',
    '/services/pos-software-thrissur-kerala',
    '/services/billing-software-thrissur-kerala',
    '/services/custom-software-thrissur-kerala',
];

const ALL_PUBLIC_PATHS = [...CORE_PATHS, ...BLOG_PATHS, ...SEO_PATHS];

module.exports = {
    CORE_PATHS,
    BLOG_PATHS,
    SEO_PATHS,
    SITEMAP_PATHS,
    ALL_PUBLIC_PATHS,
};
