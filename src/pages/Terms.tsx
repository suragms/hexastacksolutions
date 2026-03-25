import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, FileText, Scale, ShieldAlert } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';

const effectiveDate = new Date('2026-03-22').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

const highlights = [
    {
        icon: FileText,
        title: 'Clear service framework',
        description: 'These terms outline the basic rules that apply when you use our website, products, or services.',
    },
    {
        icon: BriefcaseBusiness,
        title: 'Business engagement context',
        description: 'They are written for client work such as websites, custom software, SaaS, billing, and consulting.',
    },
    {
        icon: Scale,
        title: 'Reasonable legal baseline',
        description: 'They set expectations around ownership, payments, usage, support, and limits of liability.',
    },
];

const sections = [
    {
        title: '1. Agreement to Terms',
        body: [
            'These Terms of Service govern your use of the HexaStack Solutions website, products, software, and services. By using our website or engaging our services, you agree to these terms unless a separate written agreement applies to your engagement.',
        ],
    },
    {
        title: '2. Services and Deliverables',
        body: [
            'HexaStack Solutions may provide website development, custom software development, SaaS access, billing or POS systems, automation, integrations, consulting, and related support services.',
            'The exact scope of deliverables, timelines, support, and ownership terms may be further defined in proposals, statements of work, invoices, or separate written agreements.',
        ],
    },
    {
        title: '3. Client Responsibilities',
        body: [
            'Clients are responsible for providing accurate business requirements, timely feedback, required content, approvals, lawful use of the delivered systems, and payment according to the agreed schedule.',
            'Delays in inputs, approvals, access, or third-party dependencies may affect project timelines and delivery expectations.',
        ],
    },
    {
        title: '4. Payments and Commercial Terms',
        body: [
            'Fees, milestones, subscription terms, and billing structures are defined based on the agreed engagement. Unless otherwise stated in writing, invoices are due according to the schedule shared in the project or commercial document.',
            'HexaStack Solutions may pause work, support, or service access if payments remain overdue beyond a reasonable period.',
        ],
    },
    {
        title: '5. Ownership and Intellectual Property',
        body: [
            'For custom project work, ownership and handover terms depend on the scope agreed with the client and may become effective only after applicable payments are completed.',
            'HexaStack Solutions retains ownership of internal frameworks, reusable components, methods, and general know-how unless explicitly transferred in writing.',
            'For SaaS or hosted products, access is typically provided as a limited license for business use and does not transfer source-code ownership.',
        ],
    },
    {
        title: '6. Acceptable Use and Restrictions',
        body: [
            'You agree not to misuse our website, software, or services. This includes attempting unauthorized access, disrupting service availability, infringing intellectual property, reselling licensed products without permission, or using our systems for unlawful activity.',
        ],
    },
    {
        title: '7. Availability, Support, and Changes',
        body: [
            'We aim to provide reliable service and reasonable support, but continuous availability cannot be guaranteed unless separately agreed in a service-level commitment.',
            'We may update, improve, maintain, or modify our services where necessary for security, performance, compliance, or product evolution.',
        ],
    },
    {
        title: '8. Liability and Disclaimers',
        body: [
            'To the extent permitted by law, our website, products, and services are provided on an as-available basis unless a separate written agreement states otherwise.',
            'HexaStack Solutions is not liable for indirect, incidental, or consequential losses arising from website use, service interruptions, third-party failures, or misuse outside the agreed scope of service.',
        ],
    },
    {
        title: '9. Governing Law and Contact',
        body: [
            'These Terms are governed by the laws applicable in India, with business operations based in Kerala, unless a separate agreement specifies otherwise.',
            'If you need clarification about these Terms, please contact HexaStack Solutions through our contact page or at hexastacksolutions@gmail.com.',
        ],
    },
];

export default function Terms() {
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                name: 'Terms of Service | HexaStack Solutions',
                url: 'https://hexastacksolutions.com/terms',
                description: 'Terms of Service for HexaStack Solutions.',
            },
        ],
    };

    return (
        <Layout>
            <SEO
                title="Terms of Service | HexaStack Solutions"
                description="Read the Terms of Service for HexaStack Solutions, including service scope, payments, ownership, usage rules, and liability limits."
                keywords="terms of service HexaStack Solutions, software company terms Kerala, website development terms, SaaS terms HexaStack, legal terms software services"
                canonical="/terms"
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
                        <span className="section-kicker">Terms</span>
                        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.4rem]">
                            Terms of Service redesigned to feel clear, modern, and easier to read.
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            These terms explain the basic conditions for using the HexaStack Solutions website and for
                            engaging our company for software, website, SaaS, billing, POS, and automation services.
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
                            Effective date: {effectiveDate}
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
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Applies to</p>
                                    <p className="mt-3 text-base font-semibold text-[var(--foreground)]">Website, services, software, products</p>
                                </div>
                                <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Business type</p>
                                    <p className="mt-3 text-base font-semibold text-[var(--foreground)]">Client projects and platform use</p>
                                </div>
                                <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Need help?</p>
                                    <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
                                        <BadgeCheck className="h-4 w-4 text-[var(--primary)]" />
                                        Contact our team
                                    </Link>
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
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--primary)]">
                                <ShieldAlert className="h-7 w-7" />
                            </div>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)]">Need clarification before starting a project?</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
                                If you want help understanding ownership, payments, support, or service scope before
                                working with HexaStack Solutions, reach out and we will clarify it directly.
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
                                    to="/privacy"
                                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    View Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
}
