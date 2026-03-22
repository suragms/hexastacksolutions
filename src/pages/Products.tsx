import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';

const FALLBACK_BUSINESS = [
    { title: 'HexaBill', subtitle: 'Billing & POS for Kerala and Gulf', hook: 'Your restaurant or shop, without the billing chaos.', description: 'Invoicing, POS, inventory, multi-branch, VAT-ready â€” India and Gulf. Used by businesses in UAE and Kerala right now.', cta: 'Request Demo', ctaLink: '/contact?demo=hexabill', to: '/products/hexabill', isExternal: false },
];
const FALLBACK_FREE = [
    { title: 'HexaCV', description: 'Your resume is probably getting rejected before a human sees it. Find out your ATS score â€” free.', cta: 'Try HexaCV Free', ctaLink: 'https://www.hexacv.online/', isExternal: true },
    { title: 'Hexa AI Tool Suite', description: 'ATS checker, JD vs resume comparison, bullet improver, section checker. Part of HexaCV.', cta: 'Explore Tools', ctaLink: 'https://www.hexacv.online/free-tools', isExternal: true },
    { title: 'Student Tools', description: 'CGPA, attendance deficit, internal marks. Built for Kerala university students.', cta: 'Open Student Tools', ctaLink: 'https://studentshub-gold.vercel.app/', isExternal: true },
];

export default function Products() {
    const [businessProducts, setBusinessProducts] = useState<{ title: string; subtitle?: string; hook?: string; description: string; cta: string; ctaLink: string; to?: string; isExternal: boolean }[]>(FALLBACK_BUSINESS);
    const [freeTools, setFreeTools] = useState<{ title: string; description: string; cta: string; ctaLink: string; isExternal: boolean }[]>(FALLBACK_FREE);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data: { name: string; description: string; link?: string | null; category?: string | null; isComingSoon: boolean }[]) => {
                if (!Array.isArray(data) || data.length === 0) return;
                const business = data.filter((p) => p.category === 'business' && !p.isComingSoon).sort((a, b) => (a as any).displayOrder - (b as any).displayOrder);
                const free = data.filter((p) => p.category === 'free' && !p.isComingSoon).sort((a, b) => (a as any).displayOrder - (b as any).displayOrder);
                if (business.length > 0) {
                    setBusinessProducts(business.map((p) => ({
                        title: p.name,
                        subtitle: p.name === 'HexaBill' ? 'Billing & POS for Kerala and Gulf' : undefined,
                        hook: p.name === 'HexaBill' ? 'Your restaurant or shop, without the billing chaos.' : undefined,
                        description: p.description,
                        cta: p.link?.startsWith('/') ? 'Request Demo' : 'Open',
                        ctaLink: p.link || (p.name === 'HexaBill' ? '/contact?demo=hexabill' : '#'),
                        isExternal: !!p.link?.startsWith('http'),
                    })));
                }
                if (free.length > 0) {
                    setFreeTools(free.map((p) => ({
                        title: p.name,
                        description: p.description,
                        cta: p.name === 'HexaCV' ? 'Try HexaCV Free' : p.name === 'Hexa AI Tool Suite' ? 'Explore Tools' : p.name === 'Student Tools' ? 'Open Student Tools' : 'Open',
                        ctaLink: p.link || '#',
                        isExternal: !!p.link?.startsWith('http'),
                    })));
                }
            })
            .catch(() => {});
    }, []);

    return (
        <Layout>
            <SEO
                title="Products | HexaStack - HexaBill, HexaCV, Student Tools"
                description="Explore HexaStack products including HexaBill for billing and POS, HexaCV for ATS resumes, and utility tools built by our Kerala-based software team."
                keywords="HexaBill, HexaCV, billing software Kerala, POS software India, software product company Kerala, free ATS resume builder, student CGPA calculator, GST billing software, ATS resume checker free, inventory software Kerala, POS for restaurant UAE, software tools by HexaStack"
                canonical="/products"
                localeAlternates={['en_US']}
            />

            {/* Hero */}
            <section className="relative pt-8 pb-16 md:pt-20 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.1),transparent)]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-6">
                        Software we built and run.
                    </h1>
                    <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
                        One for businesses. Two free tools for anyone.
                    </p>
                </div>
            </section>

            {/* Business Software â€” HexaBill */}
            <section className="py-8 md:py-12 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">Business Software</span>
                    <div className="mt-4">
                        {businessProducts.map((p) => (
                            <div
                                key={p.title}
                                className="p-6 md:p-10 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] hover:shadow-[0_4px_12px_rgba(29,78,216,0.08)] transition-all duration-150 flex flex-col md:flex-row md:items-center gap-8"
                            >
                                <div className="flex-1">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">{p.title}{p.subtitle ? ` â€” ${p.subtitle}` : ''}</h2>
                                    {p.hook && <p className="text-[var(--foreground)] font-medium mb-2">{p.hook}</p>}
                                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{p.description}</p>
                                    {p.isExternal ? (
                                        <a href={p.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-95 transition-opacity">
                                            {p.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <Link to={p.ctaLink} className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-95 transition-opacity">
                                            {p.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                                <div className="w-full md:w-80 h-48 rounded-xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] text-sm">
                                    {p.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Free tools */}
            <section className="py-12 md:py-20 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Free tools â€” no login, no payment</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {freeTools.map((p) => (
                            <div
                                key={p.title}
                                className="p-5 md:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-colors flex flex-col"
                            >
                                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{p.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6 flex-1">{p.description}</p>
                                <a
                                    href={p.ctaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                                >
                                    {p.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 md:py-20 border-t border-[var(--border)] bg-[var(--card)]/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-[var(--foreground)]">Need something different?</h2>
                    <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">We build custom software too. Tell us what you need and we&apos;ll say if we can do it.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-95 transition-opacity">
                        Tell us what you need
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}

