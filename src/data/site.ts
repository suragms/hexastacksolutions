import { allPortfolioSeoKeywords } from './portfolioManifest'

/** HexaStack Solutions, Vadanappally, Thrissur, Kerala */
export const site = {
  name: 'HexaStack Solutions',
  shortName: 'Hexastack',
  legalName: 'HexaStack Solutions',
  tagline:
    'Websites, POS, billing, and custom software for Kerala, Gulf, and global businesses: clear delivery and long-term support.',
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
  phones: ['+91 75919 99365', '+91 70127 14150'] as const,
  whatsappUrl: 'https://wa.me/917591999365',
  social: {
    x: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  /** Public site URL for JSON-LD and canonical URLs */
  siteUrl: 'https://www.hexastacksolutions.com',
} as const

/** Primary phrases for on-page copy (Services section, etc.). */
export const coreSeoKeywords = [
  'custom software Thrissur',
  'web development company Kerala',
  'software company Thrissur',
  'POS billing software India',
  'UAE VAT billing software',
  'Gulf invoicing software',
  'ecommerce website development Kerala',
  'healthcare website design India',
  'tourism booking website Kerala',
  'SaaS development Kerala',
  'mobile app development Thrissur',
  'B2B website design Gulf',
  'SEO services Kerala',
  'FTA compliant billing UAE',
  'GST billing software India',
  'AI automation Kerala',
] as const

/** Deduplicated: core business terms + long-tail portfolio intents. */
export const seoKeywords: readonly string[] = Array.from(
  new Set([...coreSeoKeywords, ...allPortfolioSeoKeywords]),
)
