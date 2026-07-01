import { allPortfolioSeoKeywords } from './portfolioManifest'

/** HexaStack Solutions, Vadanappally, Thrissur, Kerala */
export const site = {
  name: 'HexaStack Solutions',
  shortName: 'Hexastack',
  legalName: 'HexaStack Solutions',
  tagline:
    'HexaStack Solutions — Web development and AI automation company in Thrissur, Kerala. We build custom websites, mobile apps, ERP systems, and business software for companies across India and the Gulf.',
  city: 'Thrissur',
  region: 'Kerala',
  country: 'India',
  addressLine: 'Vadanappally, Thrissur, Kerala 680614, India',
  postalCode: '680614',
  area: 'Vadanappally',
  /** Regions for JSON-LD / copy — local (Thrissur) + India + GCC + remote worldwide */
  serviceAreas: [
    'Thrissur, Kerala, India',
    'Kerala, India',
    'India',
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Oman',
    'Bahrain',
    'Kuwait',
    'GCC / Gulf Cooperation Council',
    'United States',
    'United Kingdom',
    'Worldwide (remote delivery)',
  ] as const,
  /** One sentence for footer / contact / about (avoids an overly long bullet list in UI) */
  serviceAreasLabel:
    'Kerala & all India; GCC (UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait); US & UK; and remote clients worldwide',
  email: 'hexastacksolutions@gmail.com',
  phones: ['+91 75919 99365', '+91 94009 74150'] as const,
  whatsappUrl: 'https://wa.me/917591999365',
  /** Generic fallbacks for footer/UI only — not used in JSON-LD sameAs. */
  social: {
    x: 'https://x.com/SolutionsHexa',
    linkedin: 'https://www.linkedin.com/company/hexastack-solutions',
    github: 'https://github.com/hexastacksolutions',
    instagram: 'https://www.instagram.com/hexastacksolutions',
  },
  /** Default Open Graph / Twitter preview image (absolute URL). Matches index.html og:image. */
  defaultOgImage:
    'https://www.hexastacksolutions.com/images/portfolio/oripio-healthcare-doctor-booking-web-ui.jpg',
  /** Public site URL for JSON-LD and canonical URLs */
  siteUrl: 'https://www.hexastacksolutions.com',
} as const

/**
 * Real public profile URLs for Organization `sameAs` in JSON-LD.
 * Append X, LinkedIn, GitHub company URLs when ready; leave empty to omit (avoids placeholder domains).
 */
export const brandSocialProfileUrls: readonly string[] = [
  'https://x.com/SolutionsHexa',
  'https://www.linkedin.com/company/hexastack-solutions',
  'https://github.com/hexastacksolutions',
]

/** Primary commercial intent keywords for JSON-LD knowsAbout and on-page copy. */
export const coreSeoKeywords = [
  'web development company Kerala',
  'software company Thrissur',
  'mobile app development Kerala',
  'ERP software Kerala',
  'AI automation company Kerala',
  'SEO company Thrissur',
  'website design company Thrissur',
  'custom software development Kerala',
  'ecommerce development Kerala',
  'SaaS development Kerala',
  'POS billing software India',
  'UAE VAT billing software',
] as const

/** Deduplicated: core business terms + long-tail portfolio intents. */
export const seoKeywords: readonly string[] = Array.from(
  new Set([...coreSeoKeywords, ...allPortfolioSeoKeywords]),
)
