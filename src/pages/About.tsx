import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import MapEmbed from '@/components/MapEmbed';
import { createBreadcrumbSchema, hexastackLocalBusinessFragment } from '@/lib/seoSchemas';

const founders = [
    {
        name: 'Anandu',
        role: 'Founder and developer',
        initials: 'AK',
        image: '/founders/anandu.jpg',
        summary: 'Works on frontend delivery, UI decisions, and product implementation.',
    },
    {
        name: 'Surag',
        role: 'Founder and developer',
        initials: 'SU',
        image: '/founders/surag.jpg',
        summary: 'Handles backend planning, product scope, and direct client communication.',
    },
];

const proofPoints = [
    'We rolled out a VAT-ready POS for a UAE restaurant group on an agreed schedule.',
    'We shipped medical lab software in Kerala that cut reporting time.',
    'Clients still call the same founders after launch when they need a fix or update.',
];

const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
        hexastackLocalBusinessFragment({ foundingDate: '2024' }),
        createBreadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'About', item: '/about' },
        ]),
    ],
};

function FounderCard({ founder }: { founder: (typeof founders)[number] }) {
    const [photoFailed, setPhotoFailed] = useState(false);

    return (
        <GlassCard className="p-6 sm:p-8">
            <div className="flex items-start gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--secondary)] text-lg font-bold text-[var(--primary)] shadow-sm">
                    {!photoFailed ? (
                        <img
                            src={founder.image}
                            alt={`${founder.name} — ${founder.role}`}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                            onError={() => setPhotoFailed(true)}
                        />
                    ) : (
                        <span aria-hidden>{founder.initials}</span>
                    )}
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-[var(--foreground)]">{founder.name}</h3>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">{founder.role}</p>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{founder.summary}</p>
                </div>
            </div>
        </GlassCard>
    );
}

export default function About() {
    return (
        <Layout>
            <SEO
                title="About HexaStack | Founder-Led Software Team in Thrissur"
                description="HexaStack Solutions is a founder-led software company in Thrissur, Kerala: websites, POS, billing, and custom software for Kerala and Gulf businesses—with direct access to the people who build it."
                keywords="about software company Thrissur, website development company Kerala, custom software Kerala, founder software team Thrissur"
                canonical="/about"
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-18">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">About HexaStack</p>
                    <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.35rem] md:leading-[1.05]">
                        A small Thrissur team that ships software for Kerala and the Gulf
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                        We started in 2024 to build websites, POS systems, billing tools, and custom software for teams that want clear scope, fast WhatsApp replies, and founders who stay involved after launch.
                    </p>
                    <div className="mt-6">
                        <a href="tel:+917591999365" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)]">
                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                            +91-75919-99365
                        </a>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-8 md:py-10">
                <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-4">
                    {['Founded 2024', 'Based in Thrissur', 'Kerala + Gulf work', 'You talk to the founders'].map((item) => (
                        <div key={item} className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--foreground)] shadow-sm">
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Proof</p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Real work matters more than polished lines.
                        </h2>
                    </div>
                    <div className="grid gap-4">
                        {proofPoints.map((item) => (
                            <GlassCard key={item} className="p-5">
                                <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Founders</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        Anandu and Surag stay on the work.
                    </h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {founders.map((founder) => (
                            <FounderCard key={founder.name} founder={founder} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Location</p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            You can find us in Vadanappally, Thrissur.
                        </h2>
                        <p className="mt-5 text-base leading-8 text-[var(--muted-foreground)]">
                            If you need a website, POS system, billing software, or a custom dashboard, start with a WhatsApp message or a quick call.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-95">
                                Contact HexaStack
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/work" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]">
                                View our work
                            </Link>
                        </div>
                    </div>
                    <MapEmbed title="HexaStack Solutions location in Vadanappally, Thrissur" height={320} />
                </div>
            </section>
        </Layout>
    );
}
