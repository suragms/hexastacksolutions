import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { hexastackLocalBusinessFragment } from '@/lib/seoSchemas';

const serviceCards = [
    {
        title: 'Website & SEO in Kerala',
        description: 'Built to rank in Google for your city and get you calls.',
        outcome: 'Enquiry-focused pages and SEO structure that match how people search in your city.',
        whatsappText: 'Hi HexaStack, I need a website and SEO quote for my business.',
    },
    {
        title: 'POS & Billing Software',
        description: 'VAT-ready for India and Gulf teams that need faster billing and cleaner reports.',
        outcome: 'Faster checkout, fewer billing errors, and reports your accountant can use.',
        whatsappText: 'Hi HexaStack, I need POS or billing software for my business.',
    },
    {
        title: 'Custom Software & Apps',
        description: 'Built for your workflow when spreadsheets, paper records, or manual billing slow the team down.',
        outcome: 'One system for your process, less double entry, and clearer status for the team.',
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
        outcome: 'Scoped to your outlets: billing, POS, stock, and branch-ready reporting in one stack.',
        link: '/products/hexabill',
        cta: 'View product',
    },
];

const testimonials = [
    {
        quote: 'They moved our billing off spreadsheets and the day-end close is finally predictable.',
        attribution: 'Operations lead, retail, Kerala',
    },
    {
        quote: 'Clear communication on WhatsApp and no surprise scope creep, we got what we discussed.',
        attribution: 'Owner, F&B, UAE',
    },
    {
        quote: 'The site actually brings phone calls; we did not want another brochure that sits idle.',
        attribution: 'Clinic administrator, Thrissur',
    },
];

const faqs = [
    {
        question: 'How much does a website cost in Kerala?',
        answer: 'Every scope is different. Message us on WhatsApp with your goals and we send a clear quote. You can also read typical ranges on our pricing page. Final numbers always follow a short discovery call.',
    },
    {
        question: 'Do you work with businesses in the UAE and Gulf?',
        answer: 'Yes. We build VAT-ready billing and POS systems for UAE, Kuwait, and Bahrain businesses from our base in Thrissur.',
    },
    {
        question: 'How quickly can you start?',
        answer: 'Most projects start within a week of the first conversation. Delivery depends on scope. We give you a timeline after discovery, not a guess from a landing page.',
    },
    {
        question: 'Can Gulf clients work with you fully remotely?',
        answer: 'Yes. Discovery, demos, and handover happen over WhatsApp and calls. We align VAT, invoicing, and branch reporting to how your team actually works on the ground.',
    },
    {
        question: 'What do you need from us to begin?',
        answer: 'A short description of the problem, who uses the system daily, and any must-have integrations. Screenshots or a quick Loom help. We reply with next steps within two hours on WhatsApp.',
    },
    {
        question: 'Is support included after launch?',
        answer: 'We do not disappear after go-live. Fixes and small tweaks are part of how we work; larger changes are quoted separately so you always know what you are paying for.',
    },
];

const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
        hexastackLocalBusinessFragment(),
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
                title="Web Development Company Kerala | HexaStack Thrissur"
                description="Web development company in Kerala for business websites, POS, billing, and custom apps. Serving Thrissur, UAE, Qatar, and Saudi teams."
                keywords="web development company Kerala, software company Thrissur Kerala, website development company Thrissur, build business website Kerala, hire web developer Kerala, web development services UAE, web development services Qatar, web development services Saudi"
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
                        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.45rem] md:leading-[1.05]">
                            Web development company in Kerala for businesses that need leads and clean operations
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            If you want to build a business website in Kerala or hire a web developer in Thrissur, we can help. We build websites, POS and billing systems, and custom software for teams in Kerala, UAE, Qatar, and Saudi.
                        </p>
                        <p className="mt-4 text-sm font-medium text-[var(--foreground)]/90">
                            Based in Thrissur. Founder-led delivery. Same-day replies on WhatsApp for most enquiries.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-[var(--foreground)]">
                            <a
                                href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20discuss%20a%20project."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-[0_16px_34px_rgba(37,211,102,0.25)] hover:bg-[#20BA5A]"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Get a quote on WhatsApp
                            </a>
                            <a
                                href="tel:+917591999365"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <Phone className="h-4 w-4 text-[var(--primary)]" />
                                Call 75919 99365
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Services</p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            The main work we do for Kerala and Gulf businesses.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                            Problem: low-quality leads, manual billing, and disconnected tools.
                            Solution: one practical stack for website leads, billing flow, and reporting.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {serviceCards.map((service) => (
                            <GlassCard key={service.title} className="p-6">
                                <h3 className="text-xl font-semibold text-[var(--foreground)]">{service.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{service.description}</p>
                                <p className="mt-5 text-sm leading-7 text-[var(--foreground)]">
                                    <span className="font-semibold">Outcome: </span>
                                    {service.outcome}
                                </p>
                                <a
                                    href={`https://wa.me/917591999365?text=${encodeURIComponent(service.whatsappText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                                >
                                    Get a quote
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </GlassCard>
                        ))}
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
                                <p className="mt-5 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[var(--foreground)]">
                                    <span className="font-semibold">Outcome: </span>
                                    {product.outcome}
                                </p>
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
                        <Link to="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                            View case studies
                            <ArrowRight className="h-4 w-4" />
                        </Link>
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
                    <p className="mt-8 text-sm text-[var(--muted-foreground)]">
                        Trusted by local business teams in Kerala and active operations in UAE projects.
                    </p>
                </div>
            </section>

            <section className="border-b border-[var(--border)] bg-[var(--secondary)]/25 py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">What clients say</p>
                    <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        Feedback from real projects (names withheld for privacy)
                    </h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {testimonials.map((t) => (
                            <GlassCard key={t.quote.slice(0, 24)} className="flex h-full flex-col p-6">
                                <p className="text-sm leading-7 text-[var(--foreground)]">&ldquo;{t.quote}&rdquo;</p>
                                <p className="mt-6 text-xs font-medium text-[var(--muted-foreground)]">{t.attribution}</p>
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

            <section className="border-t border-[var(--border)] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-12 md:py-14">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Tell us what you are building</h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Send a short message on WhatsApp. We usually reply within two hours with next steps.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <a
                            href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20discuss%20a%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(37,211,102,0.28)] hover:bg-[#20BA5A]"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Get a quote on WhatsApp
                        </a>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        >
                            Contact form
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
