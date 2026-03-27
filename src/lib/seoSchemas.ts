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
