/**
 * HexaBill product landing: copy, SEO, CTA URLs, and image manifest.
 * Marketing site: hexabillmarketingpage.com (override with VITE_HEXABILL_MARKETING_URL).
 */

export function hexabillMarketingUrl(): string {
  const v = import.meta.env.VITE_HEXABILL_MARKETING_URL
  if (typeof v === 'string' && v.trim() !== '') return v.replace(/\/$/, '')
  return 'https://hexabillmarketingpage.com'
}

/** When optional /images/hexabill/* assets are missing */
export const HEXABILL_IMAGE_FALLBACK = '/images/portfolio/placeholder.svg'

export const hexabillSeo = {
  pageTitle: 'HexaBill: Best VAT, POS & ERP Software in UAE & Gulf | HexaStack Solutions',
  metaDescription:
    'All-in-one VAT billing software UAE, POS system UAE, and ERP software UAE for Gulf businesses. VAT compliant billing, e-invoicing, retail & restaurant POS, ERP, and analytics. Built for UAE, Saudi Arabia, Qatar, and Oman.',
  primaryKeywords: [
    'VAT billing software UAE',
    'POS system UAE',
    'ERP software UAE',
    'accounting software Saudi Arabia',
    'VAT compliant billing system',
  ] as const,
  secondaryKeywords: [
    'best POS system Dubai',
    'ERP for small business UAE',
    'cloud billing software Gulf',
    'retail POS Saudi Arabia',
    'business management software UAE',
  ] as const,
  longTailKeywords: [
    'best VAT billing software for small business UAE',
    'affordable POS system for retail in Dubai',
    'ERP software with VAT compliance UAE',
    'all in one business software Gulf',
  ] as const,
} as const

export const hexabillHero = {
  headline: 'All-in-One VAT, POS & ERP Software for Gulf Businesses',
  subtext:
    'UAE & Saudi compliant billing, real-time analytics, and seamless business automation for teams in UAE, Saudi Arabia, Qatar, Oman, and beyond.',
  /** Primary CTA opens the standalone marketing domain (pricing and trials live there). */
  ctaProductSite: 'Visit HexaBill product site',
} as const

export type ProductModuleId = 'vat' | 'pos' | 'erp' | 'analytics'

export const hexabillModules: {
  id: ProductModuleId
  title: string
  subtitle: string
  bullets: readonly string[]
}[] = [
  {
    id: 'vat',
    title: 'VAT billing system',
    subtitle: 'UAE FTA aligned workflows',
    bullets: ['UAE FTA compliant', 'Auto VAT calculation', 'E-invoicing ready'],
  },
  {
    id: 'pos',
    title: 'POS system',
    subtitle: 'Retail + restaurant',
    bullets: ['Barcode & receipts', 'Offline + cloud sync', 'Fast checkout flows'],
  },
  {
    id: 'erp',
    title: 'ERP system',
    subtitle: 'Operations in one stack',
    bullets: ['Inventory management', 'HR + payroll', 'Accounting automation'],
  },
  {
    id: 'analytics',
    title: 'Analytics dashboard',
    subtitle: 'Decisions from live data',
    bullets: ['Sales insights', 'Profit / loss views', 'Real-time reports'],
  },
] as const

export const hexabillGulf = {
  title: 'Built for UAE, Saudi Arabia, Qatar & Oman',
  bullets: ['Arabic-ready workflows', 'Multi-currency', 'VAT compliance built in', 'Gulf-first rollout support'],
} as const

export const hexabillFeatures = [
  { title: 'Cloud-based', desc: 'Access from branch, warehouse, or home.' },
  { title: 'Mobile app', desc: 'Sell and approve on the go.' },
  { title: 'Secure data', desc: 'Role-based access and audit-friendly trails.' },
  { title: 'Fast setup', desc: 'Guided onboarding for teams moving off spreadsheets.' },
  { title: 'Multi-branch', desc: 'Stock, billing, and reporting across locations.' },
] as const

export const hexabillTrusted = {
  headline: 'Trusted by growing Gulf teams',
  sub: 'Used by 3+ Gulf companies (logos can be added as you onboard customers).',
} as const

export type PreviewSlide = {
  id: string
  caption: string
  alt: string
  /** Preferred asset under public/images/hexabill/ */
  src: string
}

/**
 * Three distinct screenshots (run `npm run sync:images` after adding files to `images/hexabill/`).
 * Falls back to placeholder.svg if a file is missing.
 */
export const hexabillPreviewSlides: PreviewSlide[] = [
  {
    id: 'pos',
    caption: 'POS & checkout',
    alt: 'HexaBill POS and billing screens',
    src: '/images/hexabill/POS.png',
  },
  {
    id: 'erp',
    caption: 'ERP & inventory',
    alt: 'HexaBill ERP inventory and operations',
    src: '/images/hexabill/erp.png',
  },
  {
    id: 'analytics',
    caption: 'Analytics & reports',
    alt: 'HexaBill analytics dashboard and reports',
    src: '/images/hexabill/pos-dashboard.png',
  },
]

export const hexabillTestimonials = [
  {
    quote: 'Reduced manual reconciliation work by roughly 80%. VAT lines and branch stock finally match.',
    name: 'Operations lead',
    company: 'Retail chain, UAE',
  },
  {
    quote: 'One stack for POS, back office, and reports. Onboarding was faster than our last ERP trial.',
    name: 'Finance manager',
    company: 'Distribution, Saudi Arabia',
  },
] as const

