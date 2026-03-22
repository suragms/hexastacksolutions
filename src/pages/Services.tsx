import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Calculator, Bot, Cloud, Layout as LayoutIcon, BarChart3 } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';
import { motion } from 'framer-motion';

const serviceIcons = [Code2, Calculator, Bot, Cloud, LayoutIcon, BarChart3];

const FALLBACK_SERVICES = [
    { id: '1', name: 'Custom Business Software', description: 'You have a workflow nobody\'s software fits. We build the one that does.', priceHint: 'From Rs.15K', isComingSoon: false },
    { id: '2', name: 'Billing & ERP Systems', description: 'Stop reconciling invoices by hand. VAT-ready for India and Gulf.', priceHint: 'From Rs.60K', isComingSoon: false },
    { id: '3', name: 'AI & Automation', description: 'That task your team does 40 times a day â€” we automate it.', priceHint: 'From Rs.75K', isComingSoon: false },
    { id: '4', name: 'SaaS Product Build', description: 'Wireframe to live product. Architecture, build, launch.', priceHint: 'Custom', isComingSoon: false },
    { id: '5', name: 'Cloud & Hosting', description: 'Your software shouldn\'t go down on your busiest day.', priceHint: 'Custom', isComingSoon: false },
    { id: '6', name: 'Software Audit & Fix', description: 'Slow system? Expensive stack? We find what\'s wasting your money.', priceHint: 'Custom', isComingSoon: false },
];

const SERVICE_ICON_MAP: Record<string, typeof Code2> = {
    '1': Code2, '2': Calculator, '3': Bot, '4': Cloud, '5': LayoutIcon, '6': BarChart3,
    'custom business software': Code2, 'billing & erp systems': Calculator, 'ai & automation': Bot,
    'saas product build': Cloud, 'cloud & hosting': LayoutIcon, 'software audit & fix': BarChart3,
};

export default function Services() {
    const [services, setServices] = useState<{ id: string; name: string; description: string; icon: string; link?: string; isComingSoon: boolean }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/services`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setServices(Array.isArray(data) ? data : []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const activeServices = services.filter(s => !s.isComingSoon);
    const displayServices = activeServices.length > 0 ? activeServices : FALLBACK_SERVICES;

    return (
        <Layout>
            <SEO
                title="Software Development Services in Kerala for India, US and UAE Businesses | HexaStack"
                description="Custom software, websites, POS systems, billing, ERP, and AI automation from a Kerala-based team serving India, the United States, and the UAE."
                keywords="software development services Kerala, custom software development Thrissur, web development company Kerala, software development company united states partner, billing software development UAE, ERP development India, AI automation services, SaaS development Kerala, mobile app development Thrissur, business software solutions, software company Thrissur"
                canonical="/services"
                localeAlternates={['en_US']}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'ProfessionalService',
                    name: 'HexaStack Solutions',
                    description: 'Custom ERP, SaaS platforms, websites, and automation systems built for modern businesses across India, the United States, and the Gulf.',
                    url: 'https://www.hexastacksolutions.com/services',
                    areaServed: [{ '@type': 'Place', name: 'Thrissur, Kerala' }, { '@type': 'Place', name: 'India' }, { '@type': 'Place', name: 'United States' }, { '@type': 'Place', name: 'UAE' }],
                    serviceType: ['Web Development', 'POS Software', 'Custom Software', 'AI Solutions', 'SaaS Development', 'Business Software', 'Mobile App Development'],
                }}
            />
            <div className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--secondary)] selection:text-[var(--foreground)]">

                {/* SECTION 1: HERO */}
                <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 md:py-32 max-w-4xl mx-auto min-h-[70vh] min-w-0 w-full">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 break-words">
                        Stop losing money to broken workflows.
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-base sm:text-lg md:text-xl max-w-2xl mb-8 leading-relaxed break-words">
                        We build custom software that replaces manual billing, paper records, and expensive SaaS subscriptions. Kerala-based delivery for India, United States, and Gulf businesses.
                    </p>
                    <div className="flex flex-col w-full md:w-auto md:flex-row gap-3 md:gap-4">
                        <Link to="/work" className="flex items-center justify-center h-12 w-full md:w-auto px-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-95 transition-opacity">
                            See What We Build
                        </Link>
                        <Link to="/contact" className="flex items-center justify-center h-12 w-full md:w-auto px-8 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                            Get a Free Quote
                        </Link>
                    </div>
                </section>

                {/* SECTION 2: CORE SERVICES */}
                <section className="px-4 sm:px-6 py-16 md:py-32 max-w-7xl mx-auto border-t border-[var(--border)] min-w-0 w-full">
                    <div className="mb-12 md:mb-16 min-w-0">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 break-words">What we build</h2>
                        <p className="text-[var(--muted-foreground)] text-base sm:text-lg max-w-2xl break-words">
                            Software that replaces spreadsheets, manual billing, and broken workflows.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-48 rounded bg-[var(--card)] border border-[var(--border)] animate-pulse" />
                            ))
                        ) : (
                            displayServices.map((service, i) => {
                                const Icon = SERVICE_ICON_MAP[service.id] ?? SERVICE_ICON_MAP[service.name?.toLowerCase() ?? ''] ?? serviceIcons[i % serviceIcons.length];
                                const priceHint = 'priceHint' in service ? (service as { priceHint?: string }).priceHint : null;
                                return (
                                    <motion.article
                                        key={service.id || i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-8 border border-[var(--border)] rounded-lg bg-[var(--card)] hover:bg-[var(--muted)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 flex flex-col items-start card-hover"
                                    >
                                        {service.icon && typeof service.icon === 'string' && !service.icon.startsWith('/') ? (
                                            <img src={service.icon} alt={service.name} className="w-8 h-8 rounded mb-6 opacity-90 object-contain" />
                                        ) : Icon ? (
                                            <Icon className="w-8 h-8 text-[var(--foreground)] mb-6 opacity-80" strokeWidth={1.5} />
                                        ) : null}

                                        <h3 className="text-xl font-medium mb-3 text-[var(--foreground)]">{service.name}</h3>
                                        <p className="text-[var(--muted-foreground)] leading-relaxed flex-1">
                                            {service.description || "Deploying robust enterprise solutions tailored to high-scale operations."}
                                        </p>
                                        {priceHint && (
                                            <p className="text-xs font-medium text-[var(--primary)] mt-3">{priceHint}</p>
                                        )}
                                    </motion.article>
                                );
                            })
                        )}
                    </div>
                </section>

                {/* SECTION 3: Built by us. Customizable for you. */}
                <section className="px-4 pb-16 md:pb-32 max-w-7xl mx-auto">
                    <div className="mb-8 md:mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 text-[var(--foreground)]">Built by us. Customizable for you.</h2>
                        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
                            Pre-architected platforms that act as a foundation for your specific business requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--primary)] hover:shadow-[0_4px_12px_rgba(29,78,216,0.08)] transition-all duration-150 mb-8">
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-[var(--border)] pb-8 md:pb-0 md:pr-16">
                            <h3 className="text-2xl font-bold tracking-tight mb-2 text-[var(--foreground)]">Online Shopping App (QuickCart)</h3>
                            <span className="inline-block text-xs font-semibold tracking-widest text-[var(--muted-foreground)] uppercase mt-2">E-Commerce Architecture</span>
                            <div className="mt-auto hidden md:block pt-8">
                                <p className="text-[var(--foreground)] font-medium text-sm">React 19, TypeScript, Recharts, DB</p>
                            </div>
                        </div>
                        <div className="space-y-6 flex flex-col justify-center">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2.5 shrink-0"></span> <span className="text-[var(--foreground)] text-sm">Multi-role e-commerce (Customer/Admin/Staff) with analytics.</span></li>
                                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2.5 shrink-0"></span> <span className="text-[var(--foreground)] text-sm">Dynamic brand customization, filtering, and search.</span></li>
                            </ul>
                            <Link to="/contact" className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] w-fit">Ask about this platform</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--primary)] hover:shadow-[0_4px_12px_rgba(29,78,216,0.08)] transition-all duration-150">
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-[var(--border)] pb-8 md:pb-0 md:pr-16">
                            <h3 className="text-2xl font-bold tracking-tight mb-2 text-[var(--foreground)]">HexaBill</h3>
                            <span className="inline-block text-xs font-semibold tracking-widest text-[var(--muted-foreground)] uppercase mt-2">Enterprise Billing &amp; ERP Software</span>
                            <div className="mt-auto hidden md:block pt-8">
                                <p className="text-[var(--foreground)] font-medium text-sm">React, Node.js, Cloud DB, Secure Auth</p>
                            </div>
                        </div>
                        <div className="space-y-6 flex flex-col justify-center">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2.5 shrink-0"></span> <span className="text-[var(--foreground)] text-sm">GST &amp; Tax compliant invoicing, automated taxation.</span></li>
                                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2.5 shrink-0"></span> <span className="text-[var(--foreground)] text-sm">Inventory, stock tracking, low-stock alerts.</span></li>
                                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2.5 shrink-0"></span> <span className="text-[var(--foreground)] text-sm">Finance ledgers, sales reports, profit statistics.</span></li>
                            </ul>
                            <Link to="/contact?demo=hexabill" className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold w-fit hover:opacity-95">Request Demo</Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: Industries */}
                <section className="px-4 pb-16 md:pb-32 max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                    {['Restaurants', 'Healthcare', 'Retail', 'SaaS'].map((ind) => (
                        <span key={ind} className="h-12 px-6 flex items-center justify-center border border-[var(--border)] rounded-full text-[var(--muted-foreground)] text-sm md:text-base tracking-wide whitespace-nowrap">
                            {ind}
                        </span>
                    ))}
                </section>

                {/* SECTION 5: Why HexaStack */}
                <section className="px-4 py-16 md:py-32 max-w-7xl mx-auto border-t border-[var(--border)] bg-[var(--card)]/50">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 md:sticky md:top-32 text-[var(--foreground)]">
                                Why businesses choose us over a freelancer or an agency
                            </h2>
                        </div>
                        <div className="md:w-1/2 flex flex-col justify-center">
                            <ul className="space-y-4 text-[var(--foreground)]">
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full shrink-0"></span> You talk to the developer directly â€” no account managers</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full shrink-0"></span> We&apos;ve built real POS, billing, and AI tools in production â€” not demos</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full shrink-0"></span> India, United States, and Gulf delivery experience with compliance-aware builds</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full shrink-0"></span> Fixed price, fixed timeline â€” not open-ended billing</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full shrink-0"></span> WhatsApp reply in 2 hours, not 2 days</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: CTA */}
                <section className="px-4 py-16 md:py-32 border-t border-[var(--border)] text-center">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
                        What problem are you trying to solve?
                    </h2>
                    <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-8">Most projects start with a 15-minute call. No commitment, no sales pitch.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20want%20to%20discuss%20a%20software%20project." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors">
                            WhatsApp Us
                        </a>
                        <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                            Fill the Form
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

