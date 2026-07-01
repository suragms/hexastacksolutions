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

const SITE_URL = 'https://www.hexastacksolutions.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo-full-white.png`;

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
                url: `${SITE_URL}/logo-brand.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function createLocalBusinessSchema(options?: { name?: string; description?: string; image?: string; priceRange?: string }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: options?.name || 'HexaStack Solutions',
        image: options?.image || DEFAULT_IMAGE,
        '@id': SITE_URL,
        url: SITE_URL,
        telephone: '+917591999365', // Primary business phone number
        priceRange: options?.priceRange || '$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Thrissur',
            addressLocality: 'Thrissur',
            addressRegion: 'KL',
            postalCode: '680569',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 10.787,
            longitude: 76.23,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            opens: '09:00',
            closes: '18:00',
        },
        description: options?.description || 'HexaStack Solutions is a Kerala-based web development and AI automation company.',
    };
}

export function createServiceSchema(options: { name: string; description: string; serviceType?: string }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: options.name,
        description: options.description,
        provider: {
            '@type': 'LocalBusiness',
            name: 'HexaStack Solutions',
        },
        serviceType: options.serviceType || 'Web Development',
        areaServed: {
            '@type': 'State',
            name: 'Kerala',
        },
    };
}

export function createReviewSchema(reviews: { author: string; reviewBody: string; ratingValue: number }[], itemName: string = 'HexaStack Solutions') {
    return reviews.map((review) => ({
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
            '@type': 'LocalBusiness',
            name: itemName,
        },
        author: {
            '@type': 'Person',
            name: review.author,
        },
        reviewRating: {
            '@type': 'Rating',
            ratingValue: review.ratingValue,
            bestRating: 5,
        },
        reviewBody: review.reviewBody,
    }));
}
