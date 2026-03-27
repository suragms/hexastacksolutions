import { Link } from 'react-router-dom';
import { ArrowRight, Database, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';

const lastUpdated = new Date('2026-03-22').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

const highlights = [
    {
        icon: ShieldCheck,
        title: 'Privacy-first handling',
        description: 'We only use information that helps us communicate, deliver services, support clients, and improve our systems.',
    },
    {
        icon: Database,
        title: 'Business-use data only',
        description: 'We do not sell, rent, or trade client data to third-party marketing vendors.',
    },
    {
        icon: LockKeyhole,
        title: 'Security-aware operations',
        description: 'We use reasonable technical and operational safeguards to protect business and contact information.',
    },
];

const sections = [
    {
        title: '1. Introduction',
        body: [
            'This Privacy Policy explains how HexaStack Solutions collects, uses, stores, and protects information when you use our website, contact our team, or engage us for software development, SaaS, billing, POS, automation, or consulting services.',
            'This policy is intended to help visitors and clients understand what information we handle and the practical reasons we handle it.',
        ],
    },
    {
        title: '2. Information We Collect',
        body: [
            'We may collect contact information such as your name, company name, email address, phone number, and project details when you submit an enquiry or communicate with our team.',
            'For service delivery, we may also receive business and technical information relevant to the project, including workflow details, system requirements, integrations, and deployment-related information.',
            'We may collect limited website usage or analytics information to understand site performance and improve our digital experience.',
        ],
    },
    {
        title: '3. How We Use Information',
        body: [
            'We use information to respond to enquiries, prepare proposals, deliver software and consulting services, provide support, maintain security, and improve our products or website experience.',
            'We may also use your information for essential service communication, including project updates, operational notices, support responses, or important maintenance-related messages.',
        ],
    },
    {
        title: '4. Data Sharing and Third Parties',
        body: [
            'We may use trusted service providers or technical platforms where necessary to host services, manage infrastructure, process communications, or support integrations required for a client project.',
            'We only share information where it is reasonably required for service delivery, support, compliance, or technical operation. We do not sell or trade personal or business information for advertising purposes.',
        ],
    },
    {
        title: '5. Data Security and Retention',
        body: [
            'We apply reasonable safeguards to protect information from unauthorized access, misuse, alteration, or disclosure. These safeguards may include secure hosting environments, restricted access, transport encryption, and controlled operational processes.',
            'We retain information only for as long as it is needed for business communication, legal obligations, security, service continuity, or project support.',
        ],
    },
    {
        title: '6. Your Rights',
        body: [
            'You may contact us to request clarification about the information we hold, ask for corrections, or request deletion where appropriate and legally possible.',
            'Clients may also request export or operational handover of project-related information subject to the scope of engagement, payment status, and practical service constraints.',
        ],
    },
    {
        title: '7. Contact',
        body: [
            'If you have questions about this Privacy Policy or about how HexaStack Solutions handles information, please contact us at hexastacksolutions@gmail.com or through our contact page.',
        ],
    },
];

export default function Privacy() {
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                name: 'Privacy Policy | HexaStack Solutions',
                url: 'https://hexastacksolutions.com/privacy',
                description: 'Privacy policy for HexaStack Solutions.',
            },
        ],
    };

    return (
        <Layout>
            <SEO
                title="Privacy Policy | HexaStack Solutions"
                description="Read the privacy policy for HexaStack Solutions, including how we collect, use, protect, and manage business and contact information."
                keywords="privacy policy HexaStack Solutions, data privacy software company Kerala, privacy policy website development company, HexaStack legal"
                canonical="/privacy"
                noindex
                schema={schema}
            />

            <section className="page-shell overflow-hidden border-b border-[var(--border)] py-16 md:py-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 12% 10%, rgba(37,99,235,0.14), transparent 28%), radial-gradient(circle at 88% 18%, rgba(14,165,233,0.1), transparent 22%)',
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">Privacy</span>
                        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.4rem]">
                            Privacy information presented with the same clarity as the rest of the website.
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            This page explains how HexaStack Solutions handles contact information, business data, and
                            project-related information across our website, software services, and client engagements.
                        </p>
                    </ScrollReveal>

                    <ScrollRevealStagger className="mt-10 grid gap-5 md:grid-cols-3">
                        {highlights.map((item) => {
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

                    <ScrollReveal>
                        <div className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm">
                            Last updated: {lastUpdated}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="surface-panel rounded-[30px] p-6 sm:p-8">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Policy owner</p>
                                    <p className="mt-3 text-base font-semibold text-[var(--foreground)]">HexaStack Solutions</p>
                                </div>
                                <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Applies to</p>
                                    <p className="mt-3 text-base font-semibold text-[var(--foreground)]">Website, enquiries, software and support</p>
                                </div>
                                <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Contact</p>
                                    <a href="mailto:hexastacksolutions@gmail.com" className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
                                        <Mail className="h-4 w-4 text-[var(--primary)]" />
                                        Email us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollRevealStagger className="mt-10 space-y-6">
                        {sections.map((section) => (
                            <GlassCard key={section.title} className="p-6 sm:p-8">
                                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{section.title}</h2>
                                <div className="mt-4 space-y-4">
                                    {section.body.map((paragraph) => (
                                        <p key={paragraph} className="text-sm leading-8 text-[var(--muted-foreground)] sm:text-base">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>

                    <ScrollReveal>
                        <div className="mt-10 surface-panel rounded-[30px] px-6 py-10 text-center sm:px-10">
                            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Need clarification on privacy or data handling?</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
                                If your team needs a direct answer about how HexaStack Solutions handles enquiries,
                                project data, or software-related information, contact us and we will help.
                            </p>
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                                >
                                    Contact Us
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    to="/terms"
                                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    View Terms
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
}
