interface BreadcrumbItem {
    name: string;
    item: string;
}

interface ArticleSchemaOptions {
    headline: string;
    description: string;
    path: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
}

const SITE_URL = 'https://hexastacksolutions.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo-full-white.png`;

const MAP_SEARCH_QUERY = 'Vadanappally, Thrissur, Kerala 680614, India';

/** Google Maps search URL for JSON-LD hasMap */
export const HEXASTACK_HAS_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_SEARCH_QUERY)}`;

/** Approximate coordinates for Thrissur district (business serves wider area) */
const HEXASTACK_GEO = {
    '@type': 'GeoCoordinates' as const,
    latitude: 10.5276,
    longitude: 76.2144,
};

const HEXASTACK_CONTACT_POINTS = [
    {
        '@type': 'ContactPoint' as const,
        telephone: '+91-75919-99365',
        contactType: 'customer service',
        availableLanguage: ['English', 'Malayalam'],
    },
];

const HEXASTACK_AREA_SERVED = [
    { '@type': 'City' as const, name: 'Thrissur', containedInPlace: { '@type': 'Country' as const, name: 'India' } },
    { '@type': 'AdministrativeArea' as const, name: 'Kerala', containedInPlace: { '@type': 'Country' as const, name: 'India' } },
    { '@type': 'Country' as const, name: 'United Arab Emirates' },
    { '@type': 'Country' as const, name: 'Kuwait' },
    { '@type': 'Country' as const, name: 'Bahrain' },
];

/**
 * Shared LocalBusiness fields for Home, About, Contact JSON-LD (no US; Kerala + Gulf).
 */
export function hexastackLocalBusinessFragment(overrides: Record<string, unknown> = {}) {
    return {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'HexaStack Solutions',
        telephone: '+91-75919-99365',
        email: 'hexastacksolutions@gmail.com',
        url: SITE_URL,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Vadanappally',
            addressLocality: 'Thrissur',
            addressRegion: 'Kerala',
            postalCode: '680614',
            addressCountry: 'IN',
        },
        geo: HEXASTACK_GEO,
        hasMap: HEXASTACK_HAS_MAP_URL,
        contactPoint: HEXASTACK_CONTACT_POINTS,
        areaServed: HEXASTACK_AREA_SERVED,
        priceRange: 'Quoted on request',
        openingHours: 'Mo-Sa 09:00-18:00',
        ...overrides,
    };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item.startsWith('http') ? item.item : `${SITE_URL}${item.item}`,
        })),
    };
}

export function createArticleSchema({
    headline,
    description,
    path,
    datePublished,
    dateModified = datePublished,
    image = DEFAULT_IMAGE,
}: ArticleSchemaOptions) {
    const url = path.startsWith('http') ? path : `${SITE_URL}${path}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        image,
        datePublished,
        dateModified,
        author: {
            '@type': 'Organization',
            name: 'HexaStack Solutions',
        },
        publisher: {
            '@type': 'Organization',
            name: 'HexaStack Solutions',
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.svg`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };
}
