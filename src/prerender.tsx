import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { site } from './data/site'
import { getAllLocalSeoSlugs, getLocalSeoPage } from './data/localSeoPages'
import { getServiceCategories } from './data/serviceCatalog'

type PrerenderInput = { url: string }

/** Normalize a title so every page ends with exactly one "| HexaStack Solutions" brand suffix. */
function normalizeTitle(title: string): string {
  const base = title
    .replace(/\s*\|\s*HexaStack(\s*Solutions)?\s*$/i, '')
    .replace(/\s*[-–—]\s*HexaStack(\s*Solutions)?\s*$/i, '')
    .trim()
  return `${base} | ${site.name}`
}

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Web Development & AI Automation Company in Kerala | HexaStack Solutions',
    description:
      'HexaStack Solutions is a Kerala-based web development and AI automation company offering custom websites, mobile apps, ERP systems, SEO, and business software solutions for startups and businesses.',
  },
  '/work': {
    title: 'Portfolio & case studies | Web design & software | Kerala, Gulf & global',
    description:
      'Selected websites, dashboards, e-commerce, and custom software delivered for Kerala, UAE, Saudi Arabia, GCC, and global clients.',
  },
  '/services': {
    title: 'Web design, development & SEO services | Thrissur, Kerala | Gulf & global',
    description:
      'End-to-end delivery: website design, custom web applications, technical SEO, and digital marketing for Kerala, UAE, Saudi Arabia, GCC, and remote clients worldwide.',
  },
  '/services/web-design': {
    title: 'Website design & development Thrissur & Kerala | UAE & GCC',
    description:
      'Custom website design and development for Kerala, UAE, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar, and global teams: fast, SEO-ready, conversion-focused.',
  },
  '/services/web-applications': {
    title: 'Custom web applications & software | Thrissur, Kerala | MVPs & B2B portals',
    description:
      'Custom web applications and software for Kerala, GCC, and global teams: MVPs, internal portals, dashboards, and scalable products.',
  },
  '/services/seo': {
    title: 'SEO services Kerala & Gulf | technical SEO, content & local visibility',
    description:
      'Technical SEO, on-page optimization, content strategy, and digital marketing visibility for Kerala, UAE, Saudi Arabia, GCC, and India-wide queries.',
  },
  '/products/hexabill': {
    title: 'HexaBill — POS, ERP & VAT billing software for retail and Gulf businesses',
    description:
      'HexaBill: POS, ERP, and VAT-ready billing software for retail and Gulf-facing businesses.',
  },
  '/about': {
    title: 'About HexaStack Solutions | Web & software studio Thrissur, Kerala | UAE & GCC clients',
    description:
      'Meet the HexaStack team: VAT-aware POS, billing, web apps, SEO, and digital marketing for Kerala, UAE, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar, and global B2B teams.',
  },
  '/blog': {
    title: 'Blog | VAT, POS, ERP, SEO & digital marketing | Kerala & Gulf',
    description:
      'Articles on VAT billing UAE, POS and ERP rollout, technical SEO, web performance, and digital marketing for Kerala, UAE, Saudi Arabia, GCC, and global B2B teams.',
  },
  '/contact': {
    title: 'Contact HexaStack | Request a quote | Thrissur, Kerala | UAE & GCC projects',
    description:
      'Contact HexaStack Solutions in Vadanappally, Thrissur, Kerala. Quotes for web design, web development, SEO, digital marketing, custom software, POS, and VAT-aware billing.',
  },
  // Canonical blog posts (static content components). Keep in sync with public-routes.cjs BLOG_PATHS.
  '/blog/vat-compliant-billing-software-uae': {
    title: 'VAT-Compliant Billing Software for UAE Businesses',
    description:
      'A practical guide to VAT-compliant invoicing and billing software for UAE and Gulf businesses. What to look for and how custom solutions help.',
  },
  '/blog/restaurant-pos-case-study': {
    title: 'UAE Restaurant POS Case Study',
    description:
      'How a custom POS system solved billing, VAT, and multi-branch operations for a restaurant in the UAE. Built by HexaStack from Kerala.',
  },
  '/blog/medical-lab-software-kerala': {
    title: 'Medical Lab Software Kerala — Features and Pricing',
    description:
      'What to expect from medical lab software in Kerala: patient management, reports, billing, and how custom solutions compare on features and pricing.',
  },
  '/blog/ai-integration-small-business-kerala': {
    title: 'AI Integration for Small Business Kerala',
    description:
      'Practical ways to use AI in your Kerala small business: chatbots, automation, and custom AI tools without huge budgets.',
  },
  '/blog/website-cost-kerala': {
    title: 'How Much Does a Website Cost in Kerala in 2026?',
    description:
      'A practical guide to website costs in Kerala in 2026 — from simple brochure sites to custom web apps. Transparent pricing from a Thrissur-based team.',
  },
  '/blog/web-development-company-thrissur': {
    title: 'Web Development Company Thrissur — What to Look For',
    description:
      'How to choose a web development company in Thrissur: scope, pricing, support, and working with a local team that serves Kerala and Gulf.',
  },
  '/blog/whatsapp-business-setup-kerala': {
    title: 'WhatsApp Business Setup Kerala 2026',
    description:
      'How to set up WhatsApp Business in Kerala in 2026 — API, catalog, automation, and using WhatsApp for orders and support.',
  },
  '/blog/choose-mobile-app-developer-kerala': {
    title: 'How to Choose a Mobile App Developer in Kerala',
    description:
      'What to look for when choosing a mobile app developer in Kerala: portfolio, platform, cost, and support. Practical tips for 2026.',
  },
  '/blog/pos-software-restaurants-kerala': {
    title: 'POS Software for Restaurants in Kerala 2026',
    description:
      'What to look for in restaurant POS software in Kerala in 2026 — billing, GST, table management, and custom solutions from Thrissur.',
  },
  '/blog/nutriscan-ai-food-recognition': {
    title: 'NutriScan AI — Food Recognition App with GPT-4 Vision',
    description:
      'NutriScan AI uses GPT-4 Vision to recognise food from a photo and give nutritional insights. Built by HexaStack Solutions, Thrissur.',
  },
  '/terms': { title: 'Terms of Service', description: 'Terms of Service for HexaStack Solutions.' },
  '/privacy': { title: 'Privacy Policy', description: 'Privacy Policy for HexaStack Solutions.' },
  '/security': { title: 'Security Practices', description: 'Security practices for HexaStack Solutions projects.' },
  '/rules': {
    title: 'Project & Communication Rules',
    description: 'How we work with clients: communication, scope, and delivery rules.',
  },
  '/refund-policy': {
    title: 'Refund Policy',
    description: 'Refund and cancellation policy for HexaStack Solutions services.',
  },
}

// Local SEO landing pages — unique H1 + content per keyword/location (from src/data/localSeoPages.ts).
for (const slug of getAllLocalSeoSlugs()) {
  const page = getLocalSeoPage(slug)
  if (page && page.canonicalPath) {
    routeMeta[page.canonicalPath] = {
      title: page.title,
      description: page.metaDescription,
    }
  }
}

// Service category detail pages (from src/data/serviceCatalog.ts).
for (const category of getServiceCategories()) {
  routeMeta[`/services/${category.slug}`] = {
    title: category.pageTitle,
    description: category.metaDescription,
  }
}

export async function prerender({ url }: PrerenderInput) {
  const meta = routeMeta[url] ?? routeMeta['/']
  const fullTitle = normalizeTitle(meta.title)
  const canonical = `${site.siteUrl.replace(/\/$/, '')}${url}`
  const ogImageAlt = `${site.name} — ${fullTitle.replace(/\s*\|\s*HexaStack Solutions\s*$/i, '').trim()}`

  const html = renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )

  return {
    html,
    links: new Set(Object.keys(routeMeta)),
    head: {
      title: fullTitle,
      lang: 'en-IN',
      elements: new Set([
        { type: 'meta', props: { name: 'description', content: meta.description } },
        { type: 'link', props: { rel: 'canonical', href: canonical } },
        { type: 'meta', props: { property: 'og:type', content: 'website' } },
        { type: 'meta', props: { property: 'og:site_name', content: site.name } },
        { type: 'meta', props: { property: 'og:title', content: fullTitle } },
        { type: 'meta', props: { property: 'og:description', content: meta.description } },
        { type: 'meta', props: { property: 'og:url', content: canonical } },
        { type: 'meta', props: { property: 'og:image', content: site.defaultOgImage } },
        { type: 'meta', props: { property: 'og:image:secure_url', content: site.defaultOgImage } },
        { type: 'meta', props: { property: 'og:image:width', content: '1200' } },
        { type: 'meta', props: { property: 'og:image:height', content: '630' } },
        { type: 'meta', props: { property: 'og:image:alt', content: ogImageAlt } },
        { type: 'meta', props: { property: 'og:locale', content: 'en_IN' } },
        { type: 'meta', props: { property: 'og:locale:alternate', content: 'en_AE' } },
        { type: 'meta', props: { property: 'og:locale:alternate', content: 'en_SA' } },
        { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
        { type: 'meta', props: { name: 'twitter:title', content: fullTitle } },
        { type: 'meta', props: { name: 'twitter:description', content: meta.description } },
        { type: 'meta', props: { name: 'twitter:image', content: site.defaultOgImage } },
        { type: 'meta', props: { name: 'twitter:image:alt', content: ogImageAlt } },
      ]),
    },
  }
}
