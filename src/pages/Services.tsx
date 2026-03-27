import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

const services = [
    {
        id: 'websites-seo',
        title: 'Website & SEO - Kerala & Gulf',
        description: 'Built to rank in Google for your city and get you calls.',
        price: 'From Rs.25,000',
        timeline: '2 to 4 weeks',
        whatsappText: 'Hi HexaStack, I need a website and SEO quote.',
    },
    {
        id: 'pos-billing',
        title: 'POS & Billing Software',
        description: 'VAT-ready for India and Gulf. Works offline. Runs on any device.',
        price: 'From Rs.60,000',
        timeline: '4 to 6 weeks',
        whatsappText: 'Hi HexaStack, I need POS or billing software.',
    },
    {
        id: 'custom-apps',
        title: 'Custom Software & Apps',
        description: 'Replace your spreadsheets, paper records, and manual billing.',
        price: 'From Rs.75,000',
        timeline: '4 to 8 weeks',
        whatsappText: 'Hi HexaStack, I need custom software for my workflow.',
    },
    {
        id: 'automation',
        title: 'AI & WhatsApp Automation',
        description: 'Automate bookings, reminders, and customer replies on WhatsApp.',
        price: 'From Rs.40,000',
        timeline: '2 to 4 weeks',
        whatsappText: 'Hi HexaStack, I need AI or WhatsApp automation for my business.',
    },
];

const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
        ...services.map((service) => ({
            '@type': 'Service',
            serviceType: service.title,
            provider: {
                '@type': 'LocalBusiness',
                name: 'HexaStack Solutions',
                telephone: '+91-75919-99365',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Thrissur',
                    addressRegion: 'Kerala',
                    addressCountry: 'IN',
                },
            },
            areaServed: ['Thrissur', 'Kerala', 'UAE', 'Kuwait', 'Bahrain'],
            description: service.description,
        })),
        createBreadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'Services', item: '/services' },
        ]),
    ],
};

export default function Services() {
    const location = useLocation();

    useLayoutEffect(() => {
        const id = location.hash.replace(/^#/, '');
        if (!id) return;
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [location.hash, location.pathname]);

    return (
        <Layout>
            <SEO
                title="POS Software Kerala | Website Development Thrissur | HexaStack"
                description="Software services from Thrissur for Kerala and Gulf businesses: websites, POS, billing systems, custom software, and WhatsApp automation."
                keywords="custom software Kerala, software company Thrissur, POS software Kerala restaurant, billing software Thrissur, VAT billing software UAE"
                canonical="/services"
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-18">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Services</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.35rem] md:leading-[1.05]">
                        Software Services in Kerala & Gulf | HexaStack Solutions
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                        Talk to a Thrissur team for websites, POS systems, billing software, and internal tools built for daily work.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20discuss%20a%20service." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]">
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp Us
                        </a>
                        <a href="tel:+917591999365" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]">
                            <Phone className="h-4 w-4" />
                            Call 75919 99365
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {services.map((service) => (
                            <GlassCard key={service.title} id={service.id} className="scroll-mt-28 p-6">
                                <h2 className="text-xl font-semibold text-[var(--foreground)]">{service.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{service.description}</p>
                                <div className="mt-5 space-y-2 text-sm text-[var(--foreground)]">
                                    <p><span className="font-semibold">Starting price:</span> {service.price}</p>
                                    <p><span className="font-semibold">Delivery time:</span> {service.timeline}</p>
                                </div>
                                <a
                                    href={`https://wa.me/917591999365?text=${encodeURIComponent(service.whatsappText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                                >
                                    WhatsApp about this
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
