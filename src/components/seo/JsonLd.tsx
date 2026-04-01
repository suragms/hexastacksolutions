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
    legalName: site.legalName,
    url: `${base}/`,
    description: site.tagline,
    email: site.email,
    telephone: [...site.phones],
    logo: { '@type': 'ImageObject', url: `${base}/favicon.svg` },
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

  const graph = [
    orgNode,
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${base}/`,
      name: site.name,
      description: site.tagline,
      inLanguage: ['en-IN', 'en'],
      publisher: { '@id': orgId },
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
