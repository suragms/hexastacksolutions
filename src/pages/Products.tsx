import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

const products = [
    {
        title: 'HexaBill',
        type: 'Business software',
        description: 'Billing, POS, stock control, and branch reporting for Kerala and Gulf businesses.',
        detail: 'Built for shops, restaurants, clinics, and teams that need daily billing without chaos.',
        cta: 'View HexaBill',
        href: '/products/hexabill',
        isExternal: false,
    },
    {
        title: 'HexaCV',
        type: 'Career tool',
        description: 'ATS scoring and resume improvement tools for job seekers who want clearer feedback.',
        detail: 'A fast way to check how your resume reads before it reaches a recruiter.',
        cta: 'Open HexaCV',
        href: 'https://www.hexacv.online/',
        isExternal: true,
    },
    {
        title: 'Hexa AI Tool Suite',
        type: 'AI tools',
        description: 'Resume comparison, bullet improvement, section checks, and related job-document helpers.',
        detail: 'Useful when you want quick AI help without building the workflow yourself.',
        cta: 'Explore Tools',
        href: 'https://www.hexacv.online/free-tools',
        isExternal: true,
    },
    {
        title: 'Student Tools',
        type: 'Education utility',
        description: 'CGPA, attendance, and internal-mark tools built for students who need quick calculations.',
        detail: 'Simple web tools that save time for students checking academic numbers.',
        cta: 'Open Student Tools',
        href: 'https://studentshub-gold.vercel.app/',
        isExternal: true,
    },
];

const schema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'CollectionPage',
            name: 'Products | HexaStack Solutions',
            url: 'https://hexastacksolutions.com/products',
            description: 'HexaStack products including HexaBill, HexaCV, Hexa AI Tool Suite, and Student Tools.',
        },
        createBreadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'Products', item: '/products' },
        ]),
    ],
};

export default function Products() {
    return (
        <Layout>
            <SEO
                title="Products | HexaBill, HexaCV, Hexa AI Tool Suite, Student Tools"
                description="Explore HexaStack products including HexaBill, HexaCV, Hexa AI Tool Suite, and Student Tools."
                keywords="HexaBill, HexaCV, Hexa AI Tool Suite, Student Tools, billing software Kerala, POS software Gulf, ATS tool, student calculator"
                canonical="/products"
                schema={schema}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))]">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Products</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.4rem] md:leading-[1.04]">
                            HexaBill, HexaCV, Hexa AI Tool Suite, and Student Tools
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            One business product and three utility tools, all grouped in one place so visitors can find the right product quickly.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {products.map((product) => (
                            <GlassCard key={product.title} className="p-6 sm:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">{product.type}</p>
                                <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{product.title}</h2>
                                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{product.description}</p>
                                <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/85">{product.detail}</p>
                                {product.isExternal ? (
                                    <a
                                        href={product.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                    >
                                        {product.cta}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <Link
                                        to={product.href}
                                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(37,99,235,0.24)]"
                                    >
                                        {product.cta}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        Need a custom product or a billing demo?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
                        If you want something beyond these products, message the team and we can discuss a custom build or a HexaBill demo.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            to="/products/hexabill"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                        >
                            View HexaBill
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        >
                            Start Your Project Today
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
