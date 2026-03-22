import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, Globe, ShieldCheck, Users, Workflow } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';

const FOUNDED_YEAR = '2024';
const TECH_STACK = 'React, Node.js, TypeScript, MongoDB, PostgreSQL, AWS and modern web infrastructure';

const founders = [
    {
        name: 'Anandu',
        role: 'Founder and Lead Developer',
        imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEiWUz1x8TqFA/profile-displayphoto-scale_400_400/B56ZnwzFGVJ4Ag-/0/1760681546981?e=1775088000&v=beta&t=7G-CHY_T7SR7QByvAS1uJFiPGt1W_Xfgx2iOc1ASj7s',
    },
    {
        name: 'Surag',
        role: 'Founder and Lead Developer',
        imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQH8pB2vlL3GeA/profile-displayphoto-scale_400_400/B56Zwxt2X8K4Ag-/0/1770360629769?e=1775088000&v=beta&t=TSADhSp0jRbM2Gu5BKIBdgES-cMj8DAiEAczRGWV-rs',
    },
];

const values = [
    {
        icon: Users,
        title: 'Founder-led communication',
        description: 'Clients talk directly to the people shaping the product, not layers of account management.',
    },
    {
        icon: Workflow,
        title: 'Practical delivery',
        description: 'We focus on useful software, clear structure, and launch-ready work instead of unnecessary complexity.',
    },
    {
        icon: ShieldCheck,
        title: 'Long-term trust',
        description: 'We care about whether the result feels credible to customers and dependable for your team.',
    },
];

const capabilities = [
    'Professional business websites and landing pages',
    'Custom web applications and dashboards',
    'Billing, POS and internal operations software',
    'AI integrations and workflow automation',
    'SEO-aware page structure and conversion improvements',
    'Launch support, iteration and ongoing improvements',
];

export default function About() {
    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                name: 'HexaStack Solutions',
                url: 'https://www.hexastacksolutions.com',
                foundingDate: FOUNDED_YEAR,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Thrissur',
                    addressRegion: 'Kerala',
                    addressCountry: 'IN',
                },
                areaServed: ['Kerala', 'India', 'United States', 'United Arab Emirates'],
                description: 'Software development company in Thrissur, Kerala building professional websites, custom software, POS, billing systems and AI automation for businesses in India, the United States, and the UAE.',
            },
            ...founders.map((founder) => ({
                '@type': 'Person',
                name: founder.name,
                jobTitle: founder.role,
                image: founder.imageUrl,
                worksFor: {
                    '@type': 'Organization',
                    name: 'HexaStack Solutions',
                },
            })),
        ],
    };

    return (
        <Layout>
            <SEO
                title="About HexaStack Solutions | Software Company in Thrissur, Kerala"
                description="Learn about HexaStack Solutions, a founder-led software development company in Thrissur, Kerala building websites, custom software, POS, billing systems and AI automation for India, United States, and UAE businesses."
                keywords="about HexaStack Solutions, software company Thrissur, website development company Kerala, custom software team India, founder led software company Kerala, software development company united states partner, POS software company Thrissur, software developers Kerala"
                canonical="/about"
                localeAlternates={['en_US']}
                schema={schemaOrg}
            />

            <section className="page-shell overflow-hidden border-b border-[var(--border)] py-16 md:py-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 12% 10%, rgba(37,99,235,0.15), transparent 28%), radial-gradient(circle at 88% 15%, rgba(14,165,233,0.12), transparent 22%)',
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">
                            <Building2 className="h-3.5 w-3.5" />
                            About HexaStack
                        </span>
                        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.5rem]">
                            A founder-led software company focused on professional digital experiences that businesses can actually grow with.
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            HexaStack Solutions started in Thrissur, Kerala with a simple belief: businesses deserve
                            websites and software that feel credible, work reliably, and make everyday operations less
                            chaotic. We build for companies that want quality, clarity, and a team that stays close to
                            the work across Kerala, India, the United States, and the UAE.
                        </p>
                    </ScrollReveal>

                    <ScrollRevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            `Founded ${FOUNDED_YEAR}`,
                            'Based in Thrissur, Kerala',
                            'Serving India, the United States and the UAE',
                            'Founder-led delivery and support',
                        ].map((item) => (
                            <GlassCard key={item} className="p-5">
                                <p className="text-sm font-semibold text-[var(--foreground)]">{item}</p>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <ScrollReveal>
                        <span className="section-kicker">What we do</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            We build with business outcomes in mind
                        </h2>
                        <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
                            Some clients need a stronger company website. Others need internal software, better billing
                            tools, or product support that improves how the business runs. We approach all of it with
                            the same goal: make the experience more professional and more useful for local and
                            international business teams.
                        </p>
                        <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
                            Our stack includes {TECH_STACK}. We use technology where it creates clarity and speed, not
                            just because it sounds advanced.
                        </p>
                    </ScrollReveal>
                    <ScrollRevealStagger className="grid gap-4 sm:grid-cols-2">
                        {capabilities.map((item) => (
                            <GlassCard key={item} className="p-5">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                    <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                                </div>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">How we work</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            The standards we bring to every project
                        </h2>
                    </ScrollReveal>
                    <ScrollRevealStagger className="mt-10 grid gap-6 md:grid-cols-3">
                        {values.map((item) => {
                            const Icon = item.icon;
                            return (
                                <GlassCard key={item.title} className="p-6">
                                    <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)] w-fit">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
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
                        <span className="section-kicker">
                            <Globe className="h-3.5 w-3.5" />
                            Team
                        </span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Meet the founders
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                            HexaStack stays intentionally close to delivery. That means the people leading the company
                            are also involved in the technical decisions, planning, and product quality.
                        </p>
                    </ScrollReveal>
                    <ScrollRevealStagger className="mt-10 grid gap-6 md:grid-cols-2">
                        {founders.map((founder) => (
                            <GlassCard key={founder.name} className="p-6 sm:p-8">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                    <img
                                        src={founder.imageUrl}
                                        alt={founder.name}
                                        width={120}
                                        height={120}
                                        className="h-24 w-24 rounded-full object-cover border border-[var(--border)] sm:h-28 sm:w-28"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-semibold text-[var(--foreground)]">{founder.name}</h3>
                                        <p className="mt-1 text-sm text-[var(--muted-foreground)]">{founder.role}</p>
                                        <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                                            Leading product planning, development quality, and delivery communication so
                                            the final output feels clear, stable, and professional.
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="surface-panel rounded-[32px] px-6 py-10 text-center sm:px-10 md:py-12">
                            <span className="section-kicker justify-center">Work with us</span>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                                If your website or software needs to feel more impressive, more reliable, and easier to grow, let us help.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
                                We work with businesses that care about presentation, quality, and practical outcomes.
                                If that sounds like your next step, we would be glad to hear what you are building.
                            </p>
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                                >
                                    Contact HexaStack
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    to="/portfolio"
                                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    View Our Work
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
}
