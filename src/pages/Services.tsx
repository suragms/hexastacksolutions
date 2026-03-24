import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

const services = [
    {
        title: 'Website & SEO - Kerala & Gulf',
        description: 'Built to rank in Google for your city and get you calls.',
        outcome: 'Pages and structure built for local search and clear enquiries, not just a pretty template.',
        whatsappText: 'Hi HexaStack, I need a website and SEO quote.',
    },
    {
        title: 'POS & Billing Software',
        description: 'VAT-ready for India and Gulf. Works offline. Runs on any device.',
        outcome: 'Stable billing flow, fewer day-end surprises, and reports your team actually opens.',
        whatsappText: 'Hi HexaStack, I need POS or billing software.',
    },
    {
        title: 'Custom Software & Apps',
        description: 'Replace your spreadsheets, paper records, and manual billing.',
        outcome: 'Workflow-fit tools that reduce double entry and give everyone the same source of truth.',
        whatsappText: 'Hi HexaStack, I need custom software for my workflow.',
    },
    {
        title: 'AI & WhatsApp Automation',
        description: 'Automate bookings, reminders, and customer replies on WhatsApp.',
        outcome: 'Faster replies and fewer missed leads without hiring another full-time desk role.',
        whatsappText: 'Hi HexaStack, I need AI or WhatsApp automation for my business.',
    },
];

const whoWeBuildFor = {
    left: {
        title: 'Kerala teams',
        lines: ['Retail and restaurant counters', 'Clinics and labs', 'Trading and distribution desks', 'Owners who outgrew spreadsheets'],
    },
    right: {
        title: 'Gulf operations',
        lines: ['UAE outlets needing VAT-ready billing', 'Qatar and Saudi teams scaling billing and POS', 'Multi-branch stock and sales visibility', 'Teams coordinating with India for build and support'],
    },
};

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
                    streetAddress: 'Vadanappally',
                    addressLocality: 'Thrissur',
                    addressRegion: 'Kerala',
                    postalCode: '680614',
                    addressCountry: 'IN',
                },
            },
            areaServed: ['Thrissur', 'Kerala', 'UAE', 'Qatar', 'Saudi Arabia', 'Kuwait', 'Bahrain'],
            description: service.description,
        })),
        createBreadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'Services', item: '/services' },
        ]),
    ],
};

export default function Services() {
    return (
        <Layout>
            <SEO
                title="Website Development Services Kerala | HexaStack"
                description="Website development services in Kerala from Thrissur for websites, POS, billing, and apps. Serving UAE, Qatar, and Saudi buyers."
                keywords="website development services Kerala, website development company Thrissur, web designers in Thrissur Kerala, app development company Thrissur, web development services UAE, web development services Qatar, web development services Saudi, hire web developer Kerala"
                canonical="/services"
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-18">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Services</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.35rem] md:leading-[1.05]">
                        Website and software services for Kerala and Gulf businesses
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                        Need website development services in Kerala or Gulf rollout support? We build websites, POS systems, billing software, and custom apps from Thrissur for Kerala, UAE, Qatar, and Saudi teams.
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

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Who we build for</p>
                    <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
                        Teams in Kerala and the Gulf who need software that matches real operations
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Problem: tools that look good but fail during daily operations.
                        Proof: we ship workflow-fit systems with direct founder communication and measurable day-end improvements.
                    </p>
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        <div className="rounded-[28px] border border-[var(--border)] bg-white p-8 shadow-sm">
                            <h3 className="text-lg font-semibold text-[var(--foreground)]">{whoWeBuildFor.left.title}</h3>
                            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
                                {whoWeBuildFor.left.lines.map((line) => (
                                    <li key={line} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-[28px] border border-[var(--border)] bg-white p-8 shadow-sm">
                            <h3 className="text-lg font-semibold text-[var(--foreground)]">{whoWeBuildFor.right.title}</h3>
                            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
                                {whoWeBuildFor.right.lines.map((line) => (
                                    <li key={line} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {services.map((service) => (
                            <GlassCard key={service.title} className="p-6">
                                <h2 className="text-xl font-semibold text-[var(--foreground)]">{service.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{service.description}</p>
                                <p className="mt-5 text-sm leading-7 text-[var(--foreground)]">
                                    <span className="font-semibold">Outcome: </span>
                                    {service.outcome}
                                </p>
                                <a
                                    href={`https://wa.me/917591999365?text=${encodeURIComponent(service.whatsappText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                                >
                                    Get a quote
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
