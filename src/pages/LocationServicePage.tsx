import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { findSeoLocationPage } from '@/data/seoLocationPages';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

/** Only Thrissur district templates are indexable; other districts and Gulf /seo paths use noindex. */
function isIndexableLocationPage(locationSlug: string): boolean {
    return locationSlug === 'thrissur';
}

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
    const indexable = isIndexableLocationPage(entry.locationSlug);
    const keywords = [
        `${entry.service} ${entry.location}`,
        `${entry.service.toLowerCase()} ${entry.location}`,
        'HexaStack Solutions',
    ].join(', ');

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                serviceType: entry.service,
                areaServed: [entry.location, 'Thrissur', 'Kerala', 'UAE', 'Kuwait', 'Bahrain'],
                provider: {
                    '@type': 'LocalBusiness',
                    name: 'HexaStack Solutions',
                    telephone: '+91-75919-99365',
                },
                description: entry.description,
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: entry.location, item: canonical },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title={entry.title}
                description={entry.description}
                canonical={canonical}
                keywords={keywords}
                schema={schemaOrg}
                noindex={!indexable}
            />
            <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    {entry.h1}
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                    HexaStack Solutions builds {entry.service.toLowerCase()} for businesses in {entry.location}. The team works from Vadanappally, Thrissur and handles Kerala and Gulf projects directly on WhatsApp.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                    <a
                        href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20need%20help%20with%20this%20service."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp now
                    </a>
                    <a
                        href="tel:+917591999365"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                        <Phone className="h-4 w-4" />
                        Call 75919 99365
                    </a>
                </div>

                <section className="space-y-4 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">How we quote</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        We confirm scope, integrations, and rollout steps first, then share a clear written plan. No surprise line items; pricing is agreed before build starts.
                    </p>
                </section>

                <section className="space-y-4 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">What clients usually ask for</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Most buyers ask for a faster billing flow, a clearer website, or an internal tool that saves staff time. We keep the conversation simple and tell you quickly if the fit is right.
                    </p>
                </section>

                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Start the conversation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
