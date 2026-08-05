/**
 * Single source of truth for the site's public routes.
 * Used by sitemap generation and (optionally) the puppeteer prerender script.
 * Keep slugs in sync with src/prerender.tsx routeMeta and src/App.tsx routes.
 */

/**
 * Service category detail pages (src/data/serviceCatalog.ts slugs).
 * Must stay in sync with the serviceCatalog entries.
 */
const SERVICE_CATEGORY_PATHS = [
    '/services/software-development',
    '/services/ai-machine-learning',
    '/services/attendance-management-system',
    '/services/website-development',
    '/services/mobile-app-development',
    '/services/ui-ux-design',
    '/services/digital-marketing',
    '/services/branding-creative',
    '/services/business-development',
    '/services/it-support-maintenance',
    '/services/ecommerce-solutions',
    '/services/educational-solutions',
    '/services/healthcare-solutions',
];

/** Routed core pages (must match src/App.tsx). */
const CORE_PATHS = [
    '/',
    '/services',
    '/services/web-design',
    '/services/web-applications',
    '/services/seo',
    ...SERVICE_CATEGORY_PATHS,
    '/products/hexabill',
    '/work',
    '/blog',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
    '/security',
    '/rules',
    '/refund-policy',
];

/**
 * Blog URLs — canonical slugs with real content (static components in src/pages/blog/*).
 * NOTE: these MUST match the route slugs in src/App.tsx and the meta in src/prerender.tsx.
 * Do NOT use blogPosts.ts data ids here — several of those have no routed page.
 */
const BLOG_PATHS = [
    '/blog/vat-compliant-billing-software-uae',
    '/blog/restaurant-pos-case-study',
    '/blog/medical-lab-software-kerala',
    '/blog/ai-integration-small-business-kerala',
    '/blog/website-cost-kerala',
    '/blog/web-development-company-thrissur',
    '/blog/whatsapp-business-setup-kerala',
    '/blog/choose-mobile-app-developer-kerala',
    '/blog/pos-software-restaurants-kerala',
    '/blog/nutriscan-ai-food-recognition',
];

/** Local SEO landing pages (src/pages/seo/LocalSeoPage.tsx + src/data/localSeoPages.ts). */
const LOCAL_SEO_PATHS = [
    '/web-development-company-thrissur',
    '/seo-company-thrissur',
    '/software-company-kerala',
    '/mobile-app-development-kerala',
    '/erp-software-kerala',
    '/ai-automation-company-kerala',
    '/website-design-company-thrissur',
];

/**
 * Legacy / dead SEO template URLs. NOT routed in src/App.tsx (they redirect to /services
 * or render the 404 page), so they must never be prerendered or added to the sitemap.
 * Kept empty for backwards-compatibility with old scripts.
 */
const SEO_PATHS = [];

/** Sitemap: core + service pages + legal (blog + local SEO are appended by generate-sitemap.cjs). */
const SITEMAP_PATHS = CORE_PATHS;

const ALL_PUBLIC_PATHS = [...new Set([...CORE_PATHS, ...BLOG_PATHS, ...LOCAL_SEO_PATHS, ...SEO_PATHS])];

module.exports = {
    CORE_PATHS,
    SERVICE_CATEGORY_PATHS,
    BLOG_PATHS,
    LOCAL_SEO_PATHS,
    SEO_PATHS,
    SITEMAP_PATHS,
    ALL_PUBLIC_PATHS,
};
