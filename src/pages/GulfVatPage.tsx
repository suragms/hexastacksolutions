import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

const waGulf = 'https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20need%20ZATCA%20or%20VAT%20POS%20for%20UAE.';

/** Document title ≤60 chars — ZATCA / VAT POS UAE intent. */
const PAGE_TITLE = 'ZATCA-Ready POS & VAT Billing UAE | HexaStack';

/** Meta description ≤155 chars. */
const META_DESC =
    'Founder-led 2-hour WhatsApp support. Custom dashboards & ZATCA-ready HexaBill POS for UAE retail & trading. Thrissur build team; Arabic-English invoices.';

function CountryBlock({
    title,
    children,
    waText,
}: {
    title: string;
    children: ReactNode;
    waText: string;
}) {
    const href = `https://wa.me/917591999365?text=${encodeURIComponent(waText)}`;
    return (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">{children}</div>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A] sm:w-auto"
            >
                WhatsApp about {title.split('(')[0].trim()}
            </a>
        </div>
    );
}

export default function GulfVatPage() {
    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                serviceType: 'VAT and ZATCA-aware POS billing',
                provider: {
                    '@type': 'LocalBusiness',
                    name: 'HexaStack Solutions',
                    telephone: '+91-75919-99365',
                    email: 'hexastacksolutions@gmail.com',
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: 'Thrissur',
                        addressRegion: 'Kerala',
                        addressCountry: 'IN',
                    },
                },
                areaServed: [
                    { '@type': 'Country', name: 'United Arab Emirates' },
                    { '@type': 'Country', name: 'Saudi Arabia' },
                    { '@type': 'Country', name: 'Kuwait' },
                    { '@type': 'Country', name: 'Bahrain' },
                ],
                description: META_DESC,
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'Gulf VAT', item: '/gulf-vat' },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title={PAGE_TITLE}
                description={META_DESC}
                canonical="/gulf-vat"
                keywords="ZATCA POS UAE, VAT billing software UAE, FTA compliant billing, billing software Dubai, Arabic English invoice UAE, HexaBill Gulf"
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">UAE & Gulf master service page</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.15rem] md:leading-[1.06]">
                        ZATCA-ready POS and VAT billing for UAE businesses
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                        HexaBill outputs FTA-aligned VAT flows, Arabic-English PDFs, and owner dashboards that span UAE counters and Kerala back-office teams. When
                        rules shift, you talk to the founders on WhatsApp—not a black-hole help desk.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={waGulf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                        >
                            WhatsApp about UAE ZATCA / VAT
                        </a>
                        <Link
                            to="/contact?demo=hexabill"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)]"
                        >
                            Book a live HexaBill demo
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">What UAE and Gulf teams get</h2>
                    <ul className="mt-6 max-w-3xl space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
                        <li>Custom dashboards: branch P/L, discount approvals, and stock variance alerts on one owner screen.</li>
                        <li>VAT calculated line by line—not patched in a footer cell.</li>
                        <li>ZATCA Phase 2 awareness for Saudi rollouts; we map what applies before you flip production traffic.</li>
                        <li>Two-hour founder WhatsApp response window for critical billing or sync failures.</li>
                    </ul>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Local case studies</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Gulf-facing builds often pair UAE outlets with Kerala operations. See narrative case studies on{' '}
                        <Link to="/work" className="font-medium text-[var(--primary)] hover:underline">our work page</Link>—retail VAT discipline, trading companies
                        with multi-currency pain, and clinic groups tightening invoice audit trails.
                    </p>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Why a Kerala team for Gulf tech</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Thrissur is the build floor; UAE business hours overlap enough for real-time decisions. You get Gulf tax rigour without losing access to the
                        engineers who wrote your POS. The same people who fix Kerala stock bugs fix your Dubai VAT export.
                    </p>
                    <Link to="/kerala" className="mt-6 inline-flex text-sm font-semibold text-[var(--primary)] hover:underline">
                        Kerala service page and GST side
                    </Link>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Cities and countries</h2>
                    <h3 className="mt-6 text-lg font-semibold text-[var(--foreground)]">UAE</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Dubai, Abu Dhabi, Sharjah, and northern emirates—retail, F&B, trading, and light manufacturing patterns.
                    </p>
                    <h3 className="mt-6 text-lg font-semibold text-[var(--foreground)]">Wider Gulf</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Saudi Arabia, Kuwait, and Bahrain blocks below cover currency, VAT, and branch models we already run in production.
                    </p>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Country-specific billing notes</h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <CountryBlock title="United Arab Emirates" waText="Hi HexaStack, I need HexaBill for UAE VAT and billing.">
                            <p>UAE 5% VAT on every invoice, FTA-aligned flows.</p>
                            <p>Bilingual Arabic-English PDF invoices.</p>
                            <p>TRN on invoices and VAT return report with box breakdown.</p>
                        </CountryBlock>

                        <CountryBlock title="Saudi Arabia (KSA)" waText="Hi HexaStack, I need HexaBill for Saudi Arabia / ZATCA discussion.">
                            <p>ZATCA Phase 2 e-invoicing—we confirm scope before you cut over.</p>
                            <p>Saudi Riyal (SAR) and KSA VAT invoice structure.</p>
                            <p>Talk through fatoorah readiness with your finance lead.</p>
                        </CountryBlock>

                        <CountryBlock title="Kuwait" waText="Hi HexaStack, I need billing software for Kuwait.">
                            <p>Kuwait Dinar (KWD) billing and trading-company branches.</p>
                            <p>Customer credit and delivery route tracking.</p>
                        </CountryBlock>

                        <CountryBlock title="Bahrain" waText="Hi HexaStack, I need billing software for Bahrain.">
                            <p>Bahrain Dinar (BHD) and VAT billing.</p>
                            <p>Retail, clinic, and multi-branch dashboards.</p>
                        </CountryBlock>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-4">
                        <a
                            href={waGulf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                        >
                            WhatsApp HexaStack
                        </a>
                        <Link
                            to="/products/hexabill"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)]"
                        >
                            HexaBill product page
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
