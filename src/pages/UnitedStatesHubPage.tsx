import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, Clock3, Globe2, SearchCheck } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';
import { getUnitedStatesSeoPages } from '@/data/seoLocationPages';

const marketBenefits = [
    {
        icon: Globe2,
        title: 'US-facing delivery',
        description: 'Professional websites, software, and product builds shaped for United States business expectations and online credibility.',
    },
    {
        icon: SearchCheck,
        title: 'SEO-aware build quality',
        description: 'Clear service positioning, cleaner page structure, and stronger enquiry flows that support search visibility and conversion.',
    },
    {
        icon: Clock3,
        title: 'Fast communication',
        description: 'Direct founder-led communication, practical planning, and a faster reply cycle for active projects and enquiries.',
    },
];

export default function UnitedStatesHubPage() {
    const pages = getUnitedStatesSeoPages();

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'HexaStack Solutions',
        url: 'https://www.hexastacksolutions.com/united-states',
        areaServed: ['United States', 'Kerala', 'India', 'United Arab Emirates'],
        serviceType: pages.map((page) => page.service),
        description: 'HexaStack Solutions builds websites, custom software, AI solutions, and business systems for United States businesses from its Kerala-based delivery team.',
    };

    return (
        <Layout>
            <SEO
                title="Software Development Company for United States Businesses | HexaStack Solutions"
                description="HexaStack Solutions builds professional websites, custom software, AI solutions, CRM, ERP, and product experiences for United States businesses."
                canonical="/united-states"
                keywords="software development company united states, web development company usa, website design company united states, custom software development usa, offshore development team kerala for us businesses, ai solutions united states, crm software united states, erp software united states, hexastack solutions"
                locale="en_US"
                localeAlternates={['en_IN']}
                schema={schemaOrg}
            />

            <section className="page-shell overflow-hidden border-b border-[var(--border)] py-16 md:py-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 14% 12%, rgba(37,99,235,0.15), transparent 28%), radial-gradient(circle at 86% 18%, rgba(6,182,212,0.12), transparent 22%)',
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">
                            <BriefcaseBusiness className="h-3.5 w-3.5" />
                            United States
                        </span>
                        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.5rem]">
                            Websites and custom software for United States businesses that want a more professional digital presence.
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            HexaStack Solutions helps businesses in the United States with website design, web
                            development, custom software, mobile apps, CRM, ERP, and AI-supported workflows. We are a
                            Kerala-based team focused on clean execution, founder-led communication, and stronger
                            enquiry quality.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                            >
                                Start a United States Project
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                Explore Services
                            </Link>
                        </div>
                    </ScrollReveal>

                    <ScrollRevealStagger className="mt-10 grid gap-5 md:grid-cols-3">
                        {marketBenefits.map((item) => {
                            const Icon = item.icon;
                            return (
                                <GlassCard key={item.title} className="p-6">
                                    <div className="w-fit rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{item.title}</h2>
                                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
                                </GlassCard>
                            );
                        })}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">Service pages</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Search-ready landing pages for United States service intent
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                            These pages help connect broad United States search terms to specific services, while still
                            pushing visitors toward a direct enquiry when they are ready.
                        </p>
                    </ScrollReveal>

                    <ScrollRevealStagger className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {pages.map((page) => (
                            <GlassCard key={page.serviceSlug} className="p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                                    United States
                                </p>
                                <h3 className="mt-4 text-xl font-semibold text-[var(--foreground)]">{page.service}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{page.description}</p>
                                <Link
                                    to={`/seo/${page.locationSlug}/${page.serviceSlug}`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                                >
                                    View page
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="surface-panel rounded-[32px] px-6 py-10 text-center sm:px-10 md:py-12">
                            <span className="section-kicker justify-center">Enquiries</span>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                                Need a website or software partner for a United States-facing project?
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
                                Share the business problem, the service you need, or the product idea you are planning.
                                We will reply with the next step and a practical direction on scope.
                            </p>
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                                >
                                    Send an Enquiry
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    to="/kerala"
                                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    Explore Kerala Pages
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
}
