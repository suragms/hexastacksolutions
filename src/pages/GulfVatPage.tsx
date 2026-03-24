import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { getGulfVatPages } from '@/data/seoLocationPages';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

const highlights = [
    'VAT-ready billing for UAE restaurant and retail workflows.',
    'Built from Thrissur with direct WhatsApp support.',
    'Good for UAE, Kuwait, and Bahrain businesses that need cleaner reporting.',
];

export default function GulfVatPage() {
    const vatPages = getGulfVatPages();

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                serviceType: 'VAT billing software',
                provider: {
                    '@type': 'LocalBusiness',
                    name: 'HexaStack Solutions',
                    telephone: '+91-75919-99365',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'Vadanappally',
                        addressLocality: 'Thrissur',
                        addressRegion: 'Kerala',
                        postalCode: '680614',
                        addressCountry: 'IN',
                    },
                },
                areaServed: ['UAE', 'Dubai', 'Kuwait', 'Bahrain'],
                description: 'VAT-ready billing software and POS support for UAE and Gulf businesses from a Thrissur software team.',
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'Gulf VAT', item: '/gulf-vat' },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title="VAT Billing Software UAE | POS Gulf | HexaStack Solutions Thrissur"
                description="VAT-ready billing software for UAE and Gulf businesses. Built in Thrissur for billing, POS, and daily reporting."
                canonical="/gulf-vat"
                keywords="VAT billing software UAE, POS software Dubai restaurant, billing software Gulf, Kuwait billing software, Bahrain billing software"
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-18">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Gulf billing</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.35rem] md:leading-[1.05]">
                        VAT-Ready Billing Software for UAE & Gulf Businesses
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                        We build billing and POS systems for Gulf businesses from Thrissur, Kerala. Start with UAE, Kuwait, or Bahrain if you need VAT-ready sales and reporting.
                    </p>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
                    {highlights.map((item) => (
                        <GlassCard key={item} className="p-6">
                            <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        Gulf locations we support first
                    </h2>
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {vatPages.map((entry) => (
                            <GlassCard key={`${entry.locationSlug}-${entry.serviceSlug}`} className="p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">{entry.location}</p>
                                <h3 className="mt-4 text-xl font-semibold text-[var(--foreground)]">{entry.service}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{entry.description}</p>
                                <Link
                                    to={`/seo/${entry.locationSlug}/${entry.serviceSlug}`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                                >
                                    View page
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </GlassCard>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
                        >
                            Get a Gulf billing quote
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
