/**
 * SEO location pages: path pattern /services/{serviceSlug}-{locationSlug}-kerala | -india | Gulf: {serviceSlug}-{countrySlug}
 * 14 Kerala × 14 services = 196, 36 India × 14 = 504, 10 Gulf × 14 = 140 (840 total).
 */

export interface ServiceItem {
    slug: string;
    label: string;
    price: string;
    keyword: string;
}

export const SERVICES: ServiceItem[] = [
    { slug: 'website-development', label: 'Website Development', price: 'From Rs.15K', keyword: 'website development' },
    { slug: 'pos-software', label: 'POS Software', price: 'From Rs.75K', keyword: 'POS software' },
    { slug: 'billing-software', label: 'Billing Software', price: 'From Rs.60K', keyword: 'billing software' },
    { slug: 'restaurant-pos', label: 'Restaurant POS', price: 'From Rs.75K', keyword: 'restaurant POS' },
    { slug: 'erp-software', label: 'ERP Software', price: 'Custom', keyword: 'ERP software' },
    { slug: 'medical-software', label: 'Medical Software', price: 'From Rs.60K', keyword: 'medical software' },
    { slug: 'lab-software', label: 'Lab Software', price: 'From Rs.60K', keyword: 'lab software' },
    { slug: 'ecommerce', label: 'E-commerce', price: 'From Rs.60K', keyword: 'e-commerce' },
    { slug: 'custom-software', label: 'Custom Software', price: 'Custom', keyword: 'custom software' },
    { slug: 'web-app', label: 'Web App', price: 'From Rs.60K', keyword: 'web app' },
    { slug: 'ai-solutions', label: 'AI Solutions', price: 'From Rs.1.2L', keyword: 'AI solutions' },
    { slug: 'mobile-app-development', label: 'Mobile App Development', price: 'Custom', keyword: 'mobile app' },
    { slug: 'crm', label: 'CRM Software', price: 'From Rs.60K', keyword: 'CRM' },
    { slug: 'whatsapp-business', label: 'WhatsApp Business', price: 'Custom', keyword: 'WhatsApp Business' },
];

export const KERALA_DISTRICTS = [
    { name: 'Thrissur', slug: 'thrissur' },
    { name: 'Ernakulam', slug: 'ernakulam' },
    { name: 'Kozhikode', slug: 'kozhikode' },
    { name: 'Thiruvananthapuram', slug: 'thiruvananthapuram' },
    { name: 'Kollam', slug: 'kollam' },
    { name: 'Alappuzha', slug: 'alappuzha' },
    { name: 'Palakkad', slug: 'palakkad' },
    { name: 'Malappuram', slug: 'malappuram' },
    { name: 'Kannur', slug: 'kannur' },
    { name: 'Kasaragod', slug: 'kasaragod' },
    { name: 'Kottayam', slug: 'kottayam' },
    { name: 'Pathanamthitta', slug: 'pathanamthitta' },
    { name: 'Idukki', slug: 'idukki' },
    { name: 'Wayanad', slug: 'wayanad' },
];

export const INDIA_STATES = [
    { name: 'Kerala', slug: 'kerala' },
    { name: 'Tamil Nadu', slug: 'tamil-nadu' },
    { name: 'Karnataka', slug: 'karnataka' },
    { name: 'Maharashtra', slug: 'maharashtra' },
    { name: 'Andhra Pradesh', slug: 'andhra-pradesh' },
    { name: 'Telangana', slug: 'telangana' },
    { name: 'West Bengal', slug: 'west-bengal' },
    { name: 'Gujarat', slug: 'gujarat' },
    { name: 'Rajasthan', slug: 'rajasthan' },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh' },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh' },
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Punjab', slug: 'punjab' },
    { name: 'Haryana', slug: 'haryana' },
    { name: 'Bihar', slug: 'bihar' },
    { name: 'Odisha', slug: 'odisha' },
    { name: 'Assam', slug: 'assam' },
    { name: 'Jharkhand', slug: 'jharkhand' },
    { name: 'Chhattisgarh', slug: 'chhattisgarh' },
    { name: 'Uttarakhand', slug: 'uttarakhand' },
    { name: 'Himachal Pradesh', slug: 'himachal-pradesh' },
    { name: 'Goa', slug: 'goa' },
    { name: 'Jammu and Kashmir', slug: 'jammu-kashmir' },
    { name: 'Ladakh', slug: 'ladakh' },
    { name: 'Sikkim', slug: 'sikkim' },
    { name: 'Meghalaya', slug: 'meghalaya' },
    { name: 'Manipur', slug: 'manipur' },
    { name: 'Nagaland', slug: 'nagaland' },
    { name: 'Tripura', slug: 'tripura' },
    { name: 'Mizoram', slug: 'mizoram' },
    { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh' },
    { name: 'Chandigarh', slug: 'chandigarh' },
    { name: 'Puducherry', slug: 'puducherry' },
    { name: 'Andaman and Nicobar', slug: 'andaman-nicobar' },
    { name: 'Dadra and Nagar Haveli', slug: 'dadra-nagar-haveli' },
];

export const GULF_COUNTRIES = [
    { name: 'UAE', slug: 'uae', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'] },
    { name: 'Saudi Arabia', slug: 'saudi-arabia', cities: ['Riyadh', 'Jeddah', 'Dammam'] },
    { name: 'Oman', slug: 'oman', cities: ['Muscat', 'Salalah'] },
    { name: 'Qatar', slug: 'qatar', cities: ['Doha'] },
    { name: 'Kuwait', slug: 'kuwait', cities: ['Kuwait City'] },
    { name: 'Bahrain', slug: 'bahrain', cities: ['Manama'] },
    { name: 'Yemen', slug: 'yemen', cities: ['Sana\'a', 'Aden'] },
    { name: 'Iraq', slug: 'iraq', cities: ['Baghdad', 'Basra'] },
    { name: 'Jordan', slug: 'jordan', cities: ['Amman'] },
    { name: 'Lebanon', slug: 'lebanon', cities: ['Beirut'] },
];

export interface SEOPageProps {
    location: string;
    state?: string;
    service: string;
    serviceSlug: string;
    price: string;
    keyword: string;
    type: 'kerala' | 'india' | 'gulf';
    cities?: string[];
    path: string;
}

export function getKeralaPaths(): SEOPageProps[] {
    const out: SEOPageProps[] = [];
    for (const d of KERALA_DISTRICTS) {
        for (const s of SERVICES) {
            out.push({
                location: d.name,
                service: s.label,
                serviceSlug: s.slug,
                price: s.price,
                keyword: s.keyword,
                type: 'kerala',
                path: `/services/${s.slug}-${d.slug}-kerala`,
            });
        }
    }
    return out;
}

export function getIndiaPaths(): SEOPageProps[] {
    const out: SEOPageProps[] = [];
    for (const st of INDIA_STATES) {
        for (const s of SERVICES) {
            out.push({
                location: st.name,
                state: st.name,
                service: s.label,
                serviceSlug: s.slug,
                price: s.price,
                keyword: s.keyword,
                type: 'india',
                path: `/services/${s.slug}-${st.slug}-india`,
            });
        }
    }
    return out;
}

export function getGulfPaths(): SEOPageProps[] {
    const out: SEOPageProps[] = [];
    for (const c of GULF_COUNTRIES) {
        for (const s of SERVICES) {
            out.push({
                location: c.name,
                service: s.label,
                serviceSlug: s.slug,
                price: s.price,
                keyword: s.keyword,
                type: 'gulf',
                cities: c.cities,
                path: `/services/${s.slug}-${c.slug}`,
            });
        }
    }
    return out;
}

const allPaths = [...getKeralaPaths(), ...getIndiaPaths(), ...getGulfPaths()];
const pathToProps = new Map(allPaths.map((p) => [p.path, p]));

export function getSeoPageByPath(path: string): SEOPageProps | null {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    const withLeading = normalized.startsWith('/services/') ? normalized : `/services/${normalized}`;
    return pathToProps.get(withLeading) ?? pathToProps.get(normalized) ?? null;
}

export function getAllSeoPaths(): string[] {
    return allPaths.map((p) => p.path);
}
