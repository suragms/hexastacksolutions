import type { LucideIcon } from 'lucide-react'
import { Code2 } from 'lucide-react'

/** Only these service URLs exist; other `/services/*` paths redirect to `/services`. */
export type ServiceSlug = 'web-design' | 'web-applications'

export type ServiceEntry = {
  slug: ServiceSlug
  title: string
  navLabel?: string
  shortDescription: string
  icon: LucideIcon
  hubOrder: number
  pageTitle: string
  metaDescription: string
}

const P = '/images/portfolio'

export const servicesManifest: ServiceEntry[] = [
  {
    slug: 'web-design',
    title: 'Web design & development',
    navLabel: 'Website design & development',
    shortDescription:
      'Fast, SEO-aware marketing and business sites with maintainable code and analytics hooks.',
    icon: Code2,
    hubOrder: 0,
    pageTitle: 'Website design & development',
    metaDescription:
      'Custom website design and development for Kerala and Gulf businesses: SEO-ready, fast, and conversion-focused. HexaStack Solutions, Thrissur.',
  },
  {
    slug: 'web-applications',
    title: 'Custom software development',
    navLabel: 'Custom software development',
    shortDescription:
      'Web applications, MVPs, and internal tools: auth, APIs, and dashboards built for how you operate.',
    icon: Code2,
    hubOrder: 1,
    pageTitle: 'Custom software development',
    metaDescription:
      'Custom software and web applications for Kerala and global teams: MVPs, portals, and scalable products. HexaStack Solutions, Thrissur.',
  },
]

const bySlug = new Map<ServiceSlug, ServiceEntry>(servicesManifest.map((s) => [s.slug, s]))

export function getServiceBySlug(slug: string): ServiceEntry | undefined {
  return bySlug.get(slug as ServiceSlug)
}

/** Hub cards: the two primary service landings (Quixta-style paths). */
export function getHubServices(): ServiceEntry[] {
  return servicesManifest.slice().sort((a, b) => a.hubOrder - b.hubOrder)
}

/**
 * Solutions dropdown (Quixta-style, dedicated SEO landing).
 */
export function getSolutionNavLinks(): { label: string; to: string }[] {
  return [
    { label: 'Website design & development', to: '/services/web-design' },
    { label: 'Custom software development', to: '/services/web-applications' },
    { label: 'Search engine optimization', to: '/services/seo' },
  ]
}

export const solutionNavOrder: ServiceSlug[] = ['web-design', 'web-applications']

/** Portfolio imagery shared by service landings */
export const portfolio = {
  heroCollage: [
    `${P}/web-ecommerce-fashion-store-landing-01.jpg`,
    `${P}/web-interior-design-architecture-landing-01.webp`,
    `${P}/web-digital-marketing-agency-landing-modern-green-20.webp`,
    `${P}/mobile-app-ecommerce-shopping-ui-01.webp`,
  ],
  webDesign: {
    tailored: `${P}/web-interior-design-architecture-landing-01.webp`,
    mobileFirst: `${P}/mobile-app-ecommerce-shopping-ui-01.webp`,
    seoPerf: `${P}/web-digital-marketing-agency-landing-modern-green-20.webp`,
    strategy: `${P}/web-ecommerce-fashion-store-landing-01.jpg`,
  },
  webApps: {
    mvp: `${P}/web-saas-dashboard-landing-gradient-clean-ui-21.webp`,
    business: `${P}/web-rizeshift-hr-payroll-dashboard-dark-06.webp`,
    ecommerce: `${P}/web-ecommerce-fashion-store-landing-01.jpg`,
    industry: `${P}/web-interior-design-architecture-landing-01.webp`,
  },
  webAppHero: `${P}/web-rizeshift-hr-payroll-dashboard-dark-06.webp`,
} as const
