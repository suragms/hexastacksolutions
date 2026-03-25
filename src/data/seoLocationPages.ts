export interface SeoLocationPageEntry {
    location: string;
    locationSlug: string;
    service: string;
    serviceSlug: string;
    title: string;
    description: string;
    h1: string;
}

const keralaDistricts = [
    'Thrissur',
    'Ernakulam',
    'Kozhikode',
    'Thiruvananthapuram',
    'Kollam',
    'Alappuzha',
    'Palakkad',
    'Malappuram',
    'Kannur',
    'Kasaragod',
    'Kottayam',
    'Pathanamthitta',
    'Idukki',
    'Wayanad',
];

function slugify(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const KERALA_DISTRICT_PAGES: SeoLocationPageEntry[] = keralaDistricts.map((district) => ({
    location: district,
    locationSlug: slugify(district),
    service: 'Web Development',
    serviceSlug: 'web-development',
    title: `Web Development Company ${district} | HexaStack Solutions`,
    description: `Business websites for ${district}, Kerala. Built in Thrissur for local calls, WhatsApp leads, and faster enquiries.`,
    h1: `Web Development Company in ${district}, Kerala`,
}));

const TARGETED_KERALA_PAGES: SeoLocationPageEntry[] = [
    {
        location: 'Thrissur',
        locationSlug: 'thrissur',
        service: 'POS Software',
        serviceSlug: 'pos-software',
        title: 'POS Software Thrissur | HexaStack Solutions',
        description: 'POS and billing software for Thrissur businesses. Kerala-ready workflows, clear reporting, and direct support after scoping.',
        h1: 'POS Software in Thrissur, Kerala',
    },
    {
        location: 'Thrissur',
        locationSlug: 'thrissur',
        service: 'Billing Software',
        serviceSlug: 'billing-software',
        title: 'Billing Software Thrissur | HexaStack Solutions',
        description: 'Billing software for shops, clinics, and teams in Thrissur. Built in Kerala with GST-ready flows and clear reporting.',
        h1: 'Billing Software in Thrissur, Kerala',
    },
    {
        location: 'Thrissur',
        locationSlug: 'thrissur',
        service: 'Custom Software',
        serviceSlug: 'custom-software',
        title: 'Custom Software Development Thrissur | HexaStack Solutions',
        description: 'Custom software for Thrissur businesses that are done with spreadsheets, paper billing, and repeated manual work.',
        h1: 'Custom Software Development in Thrissur, Kerala',
    },
    {
        location: 'Ernakulam',
        locationSlug: 'ernakulam',
        service: 'POS Software',
        serviceSlug: 'pos-software',
        title: 'POS Software Ernakulam | HexaStack Solutions',
        description: 'POS and billing software for Ernakulam restaurants and retailers. Built from Thrissur and delivered across Kerala.',
        h1: 'POS Software in Ernakulam, Kerala',
    },
    {
        location: 'Kozhikode',
        locationSlug: 'kozhikode',
        service: 'POS Software',
        serviceSlug: 'pos-software',
        title: 'POS Software Kozhikode | HexaStack Solutions',
        description: 'POS software for Kozhikode businesses that need clear billing, stock control, and direct support from a Kerala team.',
        h1: 'POS Software in Kozhikode, Kerala',
    },
    {
        location: 'Ernakulam',
        locationSlug: 'ernakulam',
        service: 'Custom Software',
        serviceSlug: 'custom-software',
        title: 'Custom Software Ernakulam | HexaStack Solutions',
        description: 'Custom software for Ernakulam teams that need dashboards, approvals, and internal tools built around their workflow.',
        h1: 'Custom Software in Ernakulam, Kerala',
    },
];

const GULF_VAT_PAGES: SeoLocationPageEntry[] = [
    {
        location: 'UAE',
        locationSlug: 'uae',
        service: 'VAT Billing',
        serviceSlug: 'vat-billing',
        title: 'VAT Billing Software UAE | HexaStack Solutions',
        description: 'VAT-ready billing software for UAE businesses. Built in Thrissur for restaurants, shops, and operations teams.',
        h1: 'VAT Billing Software in UAE',
    },
    {
        location: 'Dubai',
        locationSlug: 'dubai',
        service: 'VAT Billing',
        serviceSlug: 'vat-billing',
        title: 'VAT Billing Software Dubai | HexaStack Solutions',
        description: 'VAT billing software for Dubai businesses that need invoices, TRN-ready records, and simple daily operations.',
        h1: 'VAT Billing Software in Dubai',
    },
    {
        location: 'Kuwait',
        locationSlug: 'kuwait',
        service: 'VAT Billing',
        serviceSlug: 'vat-billing',
        title: 'Billing Software Kuwait | HexaStack Solutions',
        description: 'Billing software for Kuwait businesses that want faster invoicing and clearer reports from a Kerala software team.',
        h1: 'Billing Software in Kuwait',
    },
    {
        location: 'Bahrain',
        locationSlug: 'bahrain',
        service: 'VAT Billing',
        serviceSlug: 'vat-billing',
        title: 'Billing Software Bahrain | HexaStack Solutions',
        description: 'Billing software for Bahrain businesses that need a simple system for sales, invoices, and reporting.',
        h1: 'Billing Software in Bahrain',
    },
];

export const SEO_LOCATION_PAGES: SeoLocationPageEntry[] = [
    ...KERALA_DISTRICT_PAGES,
    ...TARGETED_KERALA_PAGES,
    ...GULF_VAT_PAGES,
];

export function getSeoLocationPaths(): string[] {
    return SEO_LOCATION_PAGES.map((entry) => `/seo/${entry.locationSlug}/${entry.serviceSlug}`);
}

export function findSeoLocationPage(locationSlug: string, serviceSlug: string): SeoLocationPageEntry | undefined {
    return SEO_LOCATION_PAGES.find(
        (entry) => entry.locationSlug === locationSlug && entry.serviceSlug === serviceSlug
    );
}

const KERALA_LOCATION_SLUGS = new Set(keralaDistricts.map(slugify));
const GULF_LOCATION_SLUGS = new Set(['uae', 'dubai', 'kuwait', 'bahrain']);

export function getKeralaSeoPages(): SeoLocationPageEntry[] {
    return SEO_LOCATION_PAGES.filter((entry) => KERALA_LOCATION_SLUGS.has(entry.locationSlug));
}

export function getKeralaDistricts(): SeoLocationPageEntry[] {
    return KERALA_DISTRICT_PAGES;
}

export function getGulfVatPages(): SeoLocationPageEntry[] {
    return SEO_LOCATION_PAGES.filter(
        (entry) => GULF_LOCATION_SLUGS.has(entry.locationSlug) && entry.serviceSlug === 'vat-billing'
    );
}
