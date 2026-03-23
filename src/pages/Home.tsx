import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';

const serviceCards = [
    {
        title: 'Website & SEO in Kerala',
        description: 'Built to rank in Google for your city and get you calls.',
        price: 'From Rs.25,000',
        timeline: '3 to 4 week delivery',
        whatsappText: 'Hi HexaStack, I need a website and SEO quote for my business.',
    },
    {
        title: 'POS & Billing Software',
        description: 'VAT-ready for India and Gulf teams that need faster billing and cleaner reports.',
        price: 'From Rs.60,000',
        timeline: '4 to 6 week delivery',
        whatsappText: 'Hi HexaStack, I need POS or billing software for my business.',
    },
    {
        title: 'Custom Software & Apps',
        description: 'Built for your workflow when spreadsheets, paper records, or manual billing slow the team down.',
        price: 'From Rs.75,000',
        timeline: '4 to 8 week delivery',
        whatsappText: 'Hi HexaStack, I need custom software for my workflow.',
    },
];

const proofCards = [
    {
        name: 'Website for a Thrissur clinic',
        clientType: 'Healthcare website',
        location: 'Thrissur, Kerala',
        outcome: 'A local website with direct phone and WhatsApp leads.',
    },
    {
        name: 'Restaurant POS rollout',
        clientType: 'Restaurant POS',
        location: 'UAE',
        outcome: 'VAT-ready billing with fewer order and reporting errors.',
    },
    {
        name: 'Billing dashboard for a trading team',
        clientType: 'Billing software',
        location: 'Kerala',
        outcome: 'Manual invoicing work dropped and reports became faster to check.',
    },
];

const productCards = [
    {
        name: 'HexaBill',
        label: 'Billing and POS software',
        description: 'Built for Kerala shops, restaurants, clinics, and Gulf teams that need billing, POS, stock, and branch reports in one place.',
        price: 'Starts from Rs.60,000',
        link: '/products/hexabill',
        cta: 'View product',
    },
];

const faqs = [
    {
        question: 'How much does a website cost in Kerala?',
        answer: 'Basic business websites start from Rs.25,000. POS and custom software from Rs.60,000. Gulf and UAE projects are quoted separately.',
    },
    {
        question: 'Do you work with businesses in the UAE and Gulf?',
        answer: 'Yes. We build VAT-ready billing and POS systems for UAE, Kuwait, and Bahrain businesses from our base in Thrissur.',
    },
    {
        question: 'How quickly can you start?',
        answer: 'Most projects start within 1 week of the first conversation. Websites usually ship in 2 to 4 weeks. POS systems take 4 to 8 weeks.',
    },
];

const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'LocalBusiness',
            '@id': 'https://hexastacksolutions.com/#localbusiness',
            name: 'HexaStack Solutions',
            telephone: '+91-75919-99365',
            email: 'hexastacksolutions@gmail.com',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Vadanappally',
                addressLocality: 'Thrissur',
                addressRegion: 'Kerala',
                postalCode: '680614',
                addressCountry: 'IN',
            },
            areaServed: ['Thrissur', 'Ernakulam', 'Kozhikode', 'Kerala', 'UAE', 'Kuwait', 'Bahrain'],
            priceRange: 'Rs.25,000+',
            openingHours: 'Mo-Sa 09:00-18:00',
            url: 'https://hexastacksolutions.com',
        },
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        },
    ],
};

export default function Home() {
    return (
        <Layout>
            <SEO
                title="Software Company Thrissur | Website, POS & Billing | HexaStack Solutions"
                description="HexaStack Solutions builds websites, POS software, billing systems and custom apps for businesses in Thrissur, Kerala and the Gulf."
                keywords="software company Thrissur, web development company Thrissur, POS software Thrissur, billing software Thrissur, custom software Kerala, VAT billing software UAE"
                canonical="/"
                meta={[
                    { name: 'geo.region', content: 'IN-KL' },
                    { name: 'geo.placename', content: 'Thrissur, Kerala' },
                ]}
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))]">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.55rem] md:leading-[1.02]">
                            Software Development Company in Thrissur, Kerala
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            We build websites, POS software, billing systems and custom apps for businesses in Kerala and the Gulf.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-[var(--foreground)]">
                            <a
                                href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20discuss%20a%20project."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-[0_16px_34px_rgba(37,211,102,0.25)] hover:bg-[#20BA5A]"
                            >
                                <MessageCircle className="h-4 w-4" />
                                WhatsApp: 75919 99365
                            </a>
                            <a
                                href="tel:+917591999365"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <Phone className="h-4 w-4 text-[var(--primary)]" />
                                Call Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-6 md:py-8">
                <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3">
                    {['Thrissur, Kerala', 'Websites / POS / Billing / AI', 'Kerala + UAE + Gulf'].map((item) => (
                        <div key={item} className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--foreground)] shadow-sm">
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Services</p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            The main work we do for Kerala and Gulf businesses.
                        </h2>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {serviceCards.map((service) => (
                            <GlassCard key={service.title} className="p-6">
                                <h3 className="text-xl font-semibold text-[var(--foreground)]">{service.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{service.description}</p>
                                <div className="mt-5 space-y-2 text-sm text-[var(--foreground)]">
                                    <p><span className="font-semibold">Price:</span> {service.price}</p>
                                    <p><span className="font-semibold">Timeline:</span> {service.timeline}</p>
                                </div>
                                <a
                                    href={`https://wa.me/917591999365?text=${encodeURIComponent(service.whatsappText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                                >
                                    WhatsApp about this
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] bg-slate-950 py-14 text-white md:py-16">
                <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to start?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
                        Message us on WhatsApp. We reply within 2 hours.
                    </p>
                    <div className="mt-8">
                        <a
                            href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20start%20a%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                        >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp: +91 75919 99365
                        </a>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Products</p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Products built for daily business billing and POS work.
                        </h2>
                        <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
                            HexaBill is our main live product for billing, POS, stock control, and daily reporting across Kerala and Gulf operations.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                        {productCards.map((product) => (
                            <GlassCard key={product.name} className="p-6 sm:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">{product.label}</p>
                                <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{product.name}</h3>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">{product.description}</p>
                                <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--foreground)]">
                                    {product.price}
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link
                                        to={product.link}
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(37,99,235,0.24)]"
                                    >
                                        {product.cta}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <a
                                        href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20a%20HexaBill%20demo."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                    >
                                        <MessageCircle className="h-4 w-4 text-[var(--primary)]" />
                                        WhatsApp for Demo
                                    </a>
                                </div>
                            </GlassCard>
                        ))}
                        <GlassCard className="p-6 sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">What buyers ask first</p>
                            <div className="mt-5 space-y-5 text-sm leading-7 text-[var(--muted-foreground)]">
                                <p>
                                    <span className="font-semibold text-[var(--foreground)]">Who it is for:</span> restaurants, retail counters, clinics, and multi-branch teams.
                                </p>
                                <p>
                                    <span className="font-semibold text-[var(--foreground)]">What it handles:</span> billing, POS, stock tracking, VAT and GST-ready invoices, and daily sales reports.
                                </p>
                                <p>
                                    <span className="font-semibold text-[var(--foreground)]">How we roll it out:</span> short discovery call, workflow fit, and setup based on your outlet or branch needs.
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Projects and Work</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                                Recent projects from Kerala and Gulf client work
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                                View projects
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]">
                                View work
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {proofCards.map((item) => (
                            <GlassCard key={item.name} className="p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">{item.clientType}</p>
                                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">{item.name}</h3>
                                <p className="mt-3 text-sm text-[var(--primary)]">{item.location}</p>
                                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{item.outcome}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">FAQ</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        Questions buyers ask before they call.
                    </h2>
                    <Accordion type="single" collapsible className="mt-8 rounded-[28px] border border-[var(--border)] bg-white px-5 sm:px-8">
                        {faqs.map((item, index) => (
                            <AccordionItem key={item.question} value={`faq-${index}`}>
                                <AccordionTrigger className="text-left text-base font-semibold text-[var(--foreground)]">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-7 text-[var(--muted-foreground)]">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </Layout>
    );
}
