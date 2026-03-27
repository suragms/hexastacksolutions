export interface ServiceItem {
    slug: string;
    label: string;
    /** Short scope line (no rupee amounts on public SEO templates). */
    quoteLine: string;
    keyword: string;
    timeline: string;
}

export interface SEOPageProps {
    location: string;
    service: string;
    serviceSlug: string;
    quoteLine: string;
    keyword: string;
    timeline: string;
    type: 'kerala' | 'gulf';
    path: string;
}

const SERVICES: ServiceItem[] = [
    { slug: 'website-development', label: 'Website Development', quoteLine: 'Scoped to your pages, forms, and integrations', keyword: 'website development', timeline: '2 to 4 weeks' },
    { slug: 'pos-software', label: 'POS Software', quoteLine: 'Tailored to your counters, branches, and reporting needs', keyword: 'POS software', timeline: '4 to 6 weeks' },
    { slug: 'billing-software', label: 'Billing Software', quoteLine: 'Aligned to GST or VAT profile after discovery', keyword: 'billing software', timeline: '4 to 6 weeks' },
    { slug: 'custom-software', label: 'Custom Software', quoteLine: 'Fixed plan agreed before build', keyword: 'custom software', timeline: '4 to 8 weeks' },
];

const KERALA_LOCATIONS = [
    { name: 'Thrissur', slug: 'thrissur' },
    { name: 'Ernakulam', slug: 'ernakulam' },
    { name: 'Kozhikode', slug: 'kozhikode' },
];

const GULF_LOCATIONS = [
    { name: 'UAE', slug: 'uae' },
    { name: 'Kuwait', slug: 'kuwait' },
    { name: 'Bahrain', slug: 'bahrain' },
];

function createKeralaPaths(): SEOPageProps[] {
    return KERALA_LOCATIONS.flatMap((location) =>
        SERVICES.map((service) => ({
            location: location.name,
            service: service.label,
            serviceSlug: service.slug,
            quoteLine: service.quoteLine,
            keyword: service.keyword,
            timeline: service.timeline,
            type: 'kerala' as const,
            path: `/services/${service.slug}-${location.slug}-kerala`,
        }))
    );
}

function createGulfPaths(): SEOPageProps[] {
    return GULF_LOCATIONS.flatMap((location) =>
        SERVICES.map((service) => ({
            location: location.name,
            service: service.label,
            serviceSlug: service.slug,
            quoteLine: service.quoteLine,
            keyword: service.keyword,
            timeline: service.timeline,
            type: 'gulf' as const,
            path: `/services/${service.slug}-${location.slug}`,
        }))
    );
}

const allPaths = [...createKeralaPaths(), ...createGulfPaths()];
const pathToProps = new Map(allPaths.map((page) => [page.path, page]));

export function getSeoPageByPath(path: string): SEOPageProps | null {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    const withLeading = normalized.startsWith('/services/') ? normalized : `/services/${normalized}`;
    return pathToProps.get(withLeading) ?? pathToProps.get(normalized) ?? null;
}

export function getAllSeoPaths(): string[] {
    return allPaths.map((page) => page.path);
}

/** Index /services/:slug in search only for Thrissur Kerala landing pages. */
export function isIndexableSeoPath(path: string): boolean {
    return path.includes('-thrissur-kerala');
}
