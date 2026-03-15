import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const FOUNDED_YEAR = '2024';
const TECH_STACK = 'React, Node.js, Python, PostgreSQL, MongoDB, AWS';

const FOUNDERS = [
    { name: 'Anandu', role: 'Founder & Lead Developer', imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEiWUz1x8TqFA/profile-displayphoto-scale_400_400/B56ZnwzFGVJ4Ag-/0/1760681546981?e=1775088000&v=beta&t=7G-CHY_T7SR7QByvAS1uJFiPGt1W_Xfgx2iOc1ASj7s' },
    { name: 'Surag', role: 'Founder & Lead Developer', imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQH8pB2vlL3GeA/profile-displayphoto-scale_400_400/B56Zwxt2X8K4Ag-/0/1770360629769?e=1775088000&v=beta&t=TSADhSp0jRbM2Gu5BKIBdgES-cMj8DAiEAczRGWV-rs' },
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
                address: { '@type': 'PostalAddress', addressRegion: 'Kerala', addressCountry: 'IN' },
                description: 'Custom software, POS, billing, and AI tools for businesses in Kerala and UAE.',
            },
            ...FOUNDERS.map((f) => ({
                '@type': 'Person',
                name: f.name,
                jobTitle: f.role,
                image: f.imageUrl,
                worksFor: { '@type': 'Organization', name: 'HexaStack Solutions' },
            })),
        ],
    };

    return (
        <Layout>
            <SEO
                title="About HexaStack Solutions | Software Company Thrissur Kerala"
                description="HexaStack Solutions — software company in Thrissur, Kerala. Custom billing, POS, and AI tools for businesses in Kerala and UAE."
                keywords="HexaStack Solutions, software company Thrissur, about us Kerala, tech team Thrissur, software developers Kerala, custom software team, POS developers UAE, billing software company India, Vadanappally Thrissur Kerala, software company Vadanappally, HexaStack Vadanappally"
                canonical="/about"
                schema={schemaOrg}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 min-w-0 w-full">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 break-words text-[var(--foreground)]">We&apos;re a small team that builds real software.</h1>
                <p className="text-base sm:text-lg text-[var(--muted-foreground)] mb-6 break-words">
                    HexaStack was started in Thrissur, Kerala by Anandu and Surag. We got tired of watching businesses run on WhatsApp groups and Excel sheets. So we started building the systems they needed — billing tools, POS systems, AI apps.
                </p>
                <p className="text-base text-[var(--foreground)] mb-8 break-words">
                    We&apos;re based in Kerala but our clients are in UAE, Oman, and across India. We work directly with the business owner — no middleman, no agency chain.
                </p>

                <div className="flex flex-wrap gap-4 mb-10 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                    <span className="text-sm font-medium text-[var(--foreground)]">5 projects delivered</span>
                    <span className="text-[var(--muted-foreground)]">·</span>
                    <span className="text-sm font-medium text-[var(--foreground)]">2 countries</span>
                    <span className="text-[var(--muted-foreground)]">·</span>
                    <span className="text-sm font-medium text-[var(--foreground)]">{FOUNDED_YEAR} founded</span>
                    <span className="text-[var(--muted-foreground)]">·</span>
                    <span className="text-sm font-medium text-[var(--foreground)]">Kerala + UAE clients</span>
                </div>

                <div className="flex flex-wrap gap-6 sm:gap-8 mb-10">
                    {FOUNDERS.map((founder) => (
                        <div key={founder.name} className="flex flex-col items-center sm:items-start gap-2">
                            <img
                                src={founder.imageUrl}
                                alt={founder.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[var(--border)]"
                                width={112}
                                height={112}
                            />
                            <div className="text-center sm:text-left">
                                <p className="font-semibold text-[var(--foreground)]">{founder.name}</p>
                                <p className="text-sm text-[var(--muted-foreground)]">{founder.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mb-10">Tools we use: {TECH_STACK}</p>

                <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Why work with us</h2>
                <ul className="space-y-3 text-[var(--foreground)] mb-10">
                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2 shrink-0" /> You talk to the developer directly — not an account manager</li>
                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2 shrink-0" /> We don&apos;t start without a fixed scope and cost agreed in writing</li>
                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2 shrink-0" /> We use WhatsApp like you do — reply in 2 hours</li>
                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2 shrink-0" /> VAT-compliant from day one — India and Gulf</li>
                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2 shrink-0" /> If we can&apos;t build what you need, we tell you</li>
                </ul>

                <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Want to work with us?</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/work" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-95 transition-opacity">
                        See Our Work
                    </Link>
                    <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                        Get a Quote
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
