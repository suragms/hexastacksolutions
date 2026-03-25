import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

const waKerala = 'https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20need%20POS%20or%20billing%20for%20Kerala.';

/** Document title ≤60 chars — POS / billing intent for Thrissur & Kerala. */
const PAGE_TITLE = 'POS & Billing Software Thrissur, Kerala | HexaStack';

/** Meta description ≤155 chars — support + dashboards + product. */
const META_DESC =
    'Founder-led 2-hour WhatsApp support. Custom dashboards & GST-ready HexaBill POS for Kerala retail, logistics & clinics. Thrissur-based team.';

export default function KeralaHubPage() {
    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                name: 'Custom software and POS for Kerala',
                url: 'https://hexastacksolutions.com/kerala',
                description: META_DESC,
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'Kerala', item: '/kerala' },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title={PAGE_TITLE}
                description={META_DESC}
                canonical="/kerala"
                keywords="POS software Kerala, billing software Thrissur, GST billing software Kerala, custom software Kerala, multi branch POS Kerala, stock software Kerala"
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Kerala master service page</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.15rem] md:leading-[1.06]">
                        Custom software and POS for Kerala businesses
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                        HexaBill covers GST billing, stock, branches, and owner dashboards. We also ship lead websites that push enquiries into WhatsApp. One Thrissur
                        crew for build and support—no handoff to a silent offshore desk.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={waKerala}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                        >
                            WhatsApp about Kerala POS
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
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">What we ship for Kerala teams</h2>
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-[var(--foreground)]">HexaBill POS and billing</h3>
                            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted-foreground)]">
                                <li>Multi-branch stock with low-line visibility for owners.</li>
                                <li>GST invoices your CA can reconcile without rework.</li>
                                <li>Role-based permissions so counters cannot quietly discount.</li>
                                <li>Offline-tolerant flows for shops where connectivity drops.</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-[var(--foreground)]">Lead websites and funnels</h3>
                            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted-foreground)]">
                                <li>Landing pages wired for Google and Meta ad traffic.</li>
                                <li>Direct WhatsApp handoff instead of dead contact forms.</li>
                                <li>Local structure for Thrissur, Kochi, and state-wide service pages when you need them.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Local case studies</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                        We publish selective write-ups on <Link to="/work" className="font-medium text-[var(--primary)] hover:underline">our work page</Link>. Typical
                        Kerala wins: clinics replacing brochure sites with call-heavy pages, retail chains standardising billing across branches, trading firms cutting
                        month-end Excel chaos.
                    </p>
                    <ul className="mt-6 list-inside list-disc space-y-2 text-sm leading-7 text-[var(--muted-foreground)]">
                        <li>Thrissur healthcare and lab sites with measurable phone and WhatsApp leads.</li>
                        <li>Multi-counter retail with daily cash discipline and stock alerts.</li>
                        <li>Distribution desks coordinating Kerala supply with Gulf-facing billing.</li>
                    </ul>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Why hire a Kerala agency for Gulf tech</h2>
                    <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-[var(--muted-foreground)]">
                        <p>
                            The same HexaStack team that codes your Thrissur rollout configures VAT, Arabic-English invoices, and ZATCA-aware flows for UAE and Gulf
                            clients. You avoid the classic split: India vendor for cheap labour, Gulf vendor for tax, nobody owning the full picture.
                        </p>
                        <p>
                            Founder WhatsApp stays open after go-live. When Dubai fires a critical billing issue, you are not stuck in a ticket queue—you reach the
                            people who wrote the software.
                        </p>
                    </div>
                    <Link
                        to="/gulf-vat"
                        className="mt-8 inline-flex text-sm font-semibold text-[var(--primary)] hover:underline"
                    >
                        Read Gulf VAT and ZATCA positioning
                    </Link>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Areas we serve in Kerala</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Base in Vadanappally, Thrissur district. Active projects and on-site visits across Thrissur city, Kochi / Ernakulam, Kozhikode, and state-wide
                        remote delivery for POS and website work.
                    </p>
                    <h3 className="mt-8 text-lg font-semibold text-[var(--foreground)]">On-site and remote</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                        Counter training and go-live support around Thrissur; structured remote rollouts for multi-city groups with WhatsApp and video checkpoints.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Ready for numbers you can trust?</h2>
                    <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
                        Tell us your branch count and whether you run ads. We respond on WhatsApp with a concrete next step—not a generic brochure.
                    </p>
                    <a
                        href={waKerala}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#25D366] px-8 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                    >
                        Message HexaStack on WhatsApp
                    </a>
                </div>
            </section>
        </Layout>
    );
}
