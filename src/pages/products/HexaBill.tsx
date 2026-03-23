import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

export default function HexaBill() {
    const features = [
        { title: 'Billing and invoicing', desc: 'GST and VAT-ready billing with clean invoice flow, payment tracking, and daily reports.' },
        { title: 'POS for retail and restaurants', desc: 'Fast checkout, item search, receipts, and day-end summaries on the same system.' },
        { title: 'Stock and branch control', desc: 'Track stock, low-stock alerts, and branch-level reporting without switching tools.' },
    ];

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Product',
                name: 'HexaBill',
                description: 'Billing and POS software for Kerala and Gulf businesses.',
                brand: {
                    '@type': 'Brand',
                    name: 'HexaStack Solutions',
                },
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'INR',
                    price: '60000',
                    availability: 'https://schema.org/InStock',
                },
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'HexaBill', item: '/products/hexabill' },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title="HexaBill | Billing Software Kerala | VAT Billing Software UAE"
                description="HexaBill is billing and POS software from HexaStack for Kerala and Gulf businesses. Good for restaurants, shops, and multi-branch teams."
                keywords="billing software Kerala, POS software Thrissur, VAT billing software UAE, restaurant POS Gulf, HexaBill"
                canonical="/products/hexabill"
                schema={schemaOrg}
            />
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <section className="py-16 md:py-24">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">HexaBill</h1>
                    <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl">
                        Billing and POS software for businesses in Kerala and the Gulf. Built for daily use, not just demo screens.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/contact?demo=1" className="px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95">
                            Book a Demo
                        </Link>
                        <a
                            href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20a%20HexaBill%20demo."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] font-medium hover:bg-[var(--muted)]"
                        >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp for Demo
                        </a>
                    </div>
                </section>

                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">Who it is for</h2>
                    <p className="text-[var(--muted-foreground)] max-w-2xl">
                        HexaBill fits shops, restaurants, clinics, and teams that need one place for billing, POS, stock, and reporting.
                    </p>
                </section>

                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-8">Key features</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">Pricing and rollout</h2>
                    <p className="text-[var(--muted-foreground)] max-w-2xl">
                        HexaBill projects usually start from Rs.60,000 depending on billing, POS, branch count, and reporting needs. UAE and Gulf setups are quoted after a short call.
                    </p>
                </section>

                <section className="py-16 border-t border-[var(--border)] text-center">
                    <h2 className="text-2xl font-bold mb-4">Need a billing or POS demo?</h2>
                    <Link to="/contact?demo=1" className="inline-block px-8 py-4 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95">
                        Request Demo
                    </Link>
                </section>
            </div>
        </Layout>
    );
}
