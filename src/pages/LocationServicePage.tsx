import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { findSeoLocationPage } from '@/data/seoLocationPages';

export default function LocationServicePage() {
    const { locationSlug, serviceSlug } = useParams<{ locationSlug: string; serviceSlug: string }>();
    const entry = locationSlug && serviceSlug ? findSeoLocationPage(locationSlug, serviceSlug) : undefined;

    if (!entry) {
        return (
            <Layout>
                <SEO title="Page Not Found | HexaStack" description="The requested page could not be found." noindex />
                <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
                    <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Page not found</h1>
                    <p className="text-[var(--muted-foreground)] mb-8">The location or service page you are looking for does not exist.</p>
                    <Link to="/services" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline">
                        View our services
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </Layout>
        );
    }

    const canonical = `/seo/${entry.locationSlug}/${entry.serviceSlug}`;
    const isUnitedStatesMarket = entry.locationSlug === 'united-states';
    const keywords = [
        `${entry.service} ${entry.location}`,
        `${entry.service} company ${entry.location}`,
        `${entry.service.toLowerCase()} for ${entry.location}`,
        'HexaStack Solutions',
    ].join(', ');
    const schemaOrg = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'HexaStack Solutions',
        url: `https://www.hexastacksolutions.com${canonical}`,
        areaServed: [entry.location, 'Kerala', 'India', 'United States', 'United Arab Emirates'],
        serviceType: entry.service,
        description: entry.description,
    };

    return (
        <Layout>
            <SEO
                title={entry.title}
                description={entry.description}
                canonical={canonical}
                keywords={keywords}
                locale={isUnitedStatesMarket ? 'en_US' : 'en_IN'}
                localeAlternates={isUnitedStatesMarket ? ['en_IN'] : ['en_US']}
                schema={schemaOrg}
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    {entry.h1}
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                    HexaStack Solutions offers {entry.service.toLowerCase()} for businesses in {entry.location} and beyond. We are a Thrissur-based team building custom software, websites, POS, and digital solutions for clients across Kerala, India, the United States, and Gulf markets.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Why choose us</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        We deliver end-to-end: you work directly with the developers, no middle layers. Our projects include VAT-compliant POS for UAE restaurants, medical lab software in Kerala, SEO-aware business websites, and AI-powered apps. Whether you need a new website, billing system, or custom application in {entry.location}, we can scope it and give you a clear timeline and price.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Get in touch</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Tell us your requirements via the contact page or WhatsApp. We will respond with an honest assessment and a no-obligation quote. We serve {entry.location} with the same quality we bring to businesses across Kerala, India, the United States, and the Gulf.
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Contact us
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
