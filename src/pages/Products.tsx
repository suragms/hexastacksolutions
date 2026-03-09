import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const products = [
    {
        title: 'HexaBill',
        description: 'Billing, POS, and inventory in one. Used by restaurants in the Gulf and businesses in Kerala. VAT-ready for India and UAE.',
        benefits: [
            'Invoicing that stays compliant with local tax',
            'POS that works across multiple branches',
            'Stock and reports that actually match reality',
        ],
        cta: 'Request Demo',
        ctaLink: '/contact?demo=1',
        to: '/products/hexabill',
    },
    {
        title: 'HexaCV',
        description: 'Build a resume that passes ATS. No account, no paywall. We run it; you get a score, keyword gaps, and a JD breakdown.',
        benefits: [
            'See how ATS-friendly your resume is',
            'Compare your wording to the job description',
            'Use it from the browser, nothing to install',
        ],
        cta: 'Try Now',
        ctaLink: 'https://www.hexacv.online/',
        to: 'https://www.hexacv.online/',
        isExternal: true,
    },
    {
        title: 'Hexa AI Tool Suite',
        description: 'Free tools for job seekers: ATS checker, JD vs resume comparison, bullet improver, section checker. Part of HexaCV.',
        benefits: [
            'Check ATS score and fix weak spots',
            'Match your bullets to the job ad',
            'Improve one section at a time',
        ],
        cta: 'Explore Tools',
        ctaLink: 'https://www.hexacv.online/free-tools',
        to: 'https://www.hexacv.online/free-tools',
        isExternal: true,
    },
    {
        title: 'Student Tools',
        description: 'CGPA and internal marks calculators, attendance tracker, and PDF helpers. Built for students; data stays in your browser.',
        benefits: [
            'CGPA and internal marks in one place',
            'Attendance and deficit calculators',
            'PDF tools that run locally, no uploads',
        ],
        cta: 'Open App',
        ctaLink: 'https://studentshub-gold.vercel.app/',
        to: 'https://studentshub-gold.vercel.app/',
        isExternal: true,
    }
];

export default function Products() {
    return (
        <Layout>
            <SEO
                title="Products | HexaStack — HexaBill, HexaCV, Student Tools"
                description="HexaBill for billing and POS in Kerala and Gulf. HexaCV for ATS resumes. Student calculators and PDF tools. Built in Thrissur."
                keywords="HexaBill, HexaCV, billing software Kerala, POS UAE, free ATS resume builder, student CGPA calculator"
            />

            {/* Hero */}
            <section className="relative pt-8 pb-16 md:pt-20 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.1),transparent)]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-6">
                        What we build and run
                    </h1>
                    <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed mb-10">
                        Billing for shops and restaurants. Resumes that get past ATS. Student calculators and PDF tools. All built in Thrissur; some used in the Gulf.
                    </p>
                    <Link to="/contact?demo=1" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full brand-gradient text-white font-semibold hover:opacity-90 transition-opacity">
                        See HexaBill in action
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Product cards */}
            <section className="py-8 md:py-20 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Live products</h2>
                    <p className="text-[var(--muted-foreground)] mb-10 max-w-xl">Not mockups. Things we built and people use.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {products.map((p) => (
                            <div
                                key={p.title}
                                className="p-5 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors flex flex-col"
                            >
                                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6 flex-1">{p.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {p.benefits.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                                            <Check className="w-4 h-4 text-[var(--accent)] shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {p.isExternal ? (
                                        <a
                                            href={p.ctaLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                                        >
                                            {p.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={p.ctaLink}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                                        >
                                            {p.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {p.isExternal ? (
                                        <a
                                            href={p.to}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] text-sm font-medium transition-colors"
                                        >
                                            Learn more
                                        </a>
                                    ) : (
                                        <Link
                                            to={p.to}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] text-sm font-medium transition-colors"
                                        >
                                            Learn more
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 md:py-20 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Need something different?</h2>
                    <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">We build custom software too. Describe what you need and we’ll say if we can do it.</p>
                    <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] rounded-full brand-gradient text-white font-semibold hover:opacity-90 transition-opacity">
                        Tell us what you need
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
