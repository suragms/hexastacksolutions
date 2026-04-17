import { brandSocialProfileUrls, coreSeoKeywords, site } from '../../data/site'

/** Organization + WebSite + ProfessionalService (JSON-LD) for Google rich results & trust signals */
export function JsonLd() {
  const base = site.siteUrl.replace(/\/$/, '')
  const orgId = `${base}/#organization`
  const websiteId = `${base}/#website`
  const serviceId = `${base}/#professional-service`

  const orgNode: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    alternateName: [site.shortName, 'Hexa Stack Solutions'],
    legalName: site.legalName,
    url: `${base}/`,
    description: site.tagline,
    email: site.email,
    telephone: [...site.phones],
    logo: { '@type': 'ImageObject', url: `${base}/brand-icon-512.png` },
    image: site.defaultOgImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.area}, ${site.city}`,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.787,
      longitude: 76.23,
    },
    founder: [
      { '@type': 'Person', name: 'Anandu Krishna', jobTitle: 'Co-founder & developer' },
      { '@type': 'Person', name: 'Surag', jobTitle: 'Co-founder & developer' },
    ],
  }
  if (brandSocialProfileUrls.length > 0) {
    orgNode.sameAs = [...brandSocialProfileUrls]
  }

  const serviceOfferings = [
    {
      '@type': 'Service',
      '@id': `${base}/#service-web-development`,
      name: 'Web development',
      serviceType: 'Web development company in Kerala',
      provider: { '@id': orgId },
      areaServed: ['Thrissur', 'Kerala', 'India', 'GCC'],
      url: `${base}/services/web-design`,
    },
    {
      '@type': 'Service',
      '@id': `${base}/#service-mobile-apps`,
      name: 'Mobile app development',
      serviceType: 'Mobile app development Kerala',
      provider: { '@id': orgId },
      areaServed: ['Thrissur', 'Kerala', 'India', 'GCC'],
      url: `${base}/services/web-applications`,
    },
    {
      '@type': 'Service',
      '@id': `${base}/#service-erp`,
      name: 'ERP software',
      serviceType: 'ERP software company Kerala',
      provider: { '@id': orgId },
      areaServed: ['Thrissur', 'Kerala', 'India', 'GCC'],
      url: `${base}/products/hexabill`,
    },
    {
      '@type': 'Service',
      '@id': `${base}/#service-ai-automation`,
      name: 'AI automation',
      serviceType: 'AI automation services Kerala',
      provider: { '@id': orgId },
      areaServed: ['Thrissur', 'Kerala', 'India', 'GCC'],
      url: `${base}/services/web-applications`,
    },
  ]

  const graph = [
    orgNode,
    ...serviceOfferings,
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${base}/`,
      name: site.name,
      description: site.tagline,
      inLanguage: ['en-IN', 'en'],
      publisher: { '@id': orgId },
      potentialAction: {
        '@type': 'ContactAction',
        name: 'Contact or request a quote',
        target: `${base}/contact`,
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': serviceId,
      name: site.name,
      parentOrganization: { '@id': orgId },
      description: site.tagline,
      email: site.email,
      telephone: [...site.phones],
      url: `${base}/`,
      knowsAbout: [...coreSeoKeywords],
      areaServed: site.serviceAreas.map((name) => ({ '@type': 'AdministrativeArea', name })),
      priceRange: '$$',
    },
  ]

  const data = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
