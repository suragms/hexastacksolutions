import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Calculator, Bot, Cloud, Layout as LayoutIcon, BarChart3 } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';
import { motion } from 'framer-motion';

const serviceIcons = [Code2, Calculator, Bot, Cloud, LayoutIcon, BarChart3];

const FALLBACK_SERVICES = [
    { id: '1', name: 'Website Development', description: 'Mobile-first websites, 5+ pages, SEO-ready. Starting Rs.15,000.', priceHint: 'From Rs.15K', isComingSoon: false },
    { id: '2', name: 'Business Web App', description: 'Login, roles, dashboards, data management. Like our medical lab and enquiry apps.', priceHint: 'From Rs.60K', isComingSoon: false },
    { id: '3', name: 'POS & Billing System', description: 'Orders, inventory, billing. Kerala & Gulf VAT-ready. We built one for a UAE restaurant.', priceHint: 'From Rs.75K', isComingSoon: false },
    { id: '4', name: 'ERP & Billing', description: 'Scalable billing, inventory, reporting. Multi-branch, audit-ready.', priceHint: 'Custom', isComingSoon: false },
    { id: '5', name: 'AI & SaaS Product', description: 'Custom ML, user accounts, subscriptions. Like NutriScan AI.', priceHint: 'From Rs.1.2L', isComingSoon: false },
    { id: '6', name: 'Cloud & Integration', description: 'Secure hosting, APIs, system integration and optimization.', priceHint: 'Custom', isComingSoon: false },
];

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
                title="Services | HEXASTACK SOLUTIONS"
                description="Business software build, SaaS build, mobile app build, and custom ERP. Web development, POS, and automation across India and the Gulf."
                canonical="/services"
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'ProfessionalService',
                    name: 'HexaStack Solutions',
                    description: 'Custom ERP, SaaS platforms, and automation systems built for modern businesses across India and the Gulf.',
                    url: 'https://hexastacksolutions.com/services',
                    areaServed: [{ '@type': 'Place', name: 'Thrissur, Kerala' }, { '@type': 'Place', name: 'UAE' }],
                    serviceType: ['Web Development', 'POS Software', 'Custom Software', 'AI Solutions', 'SaaS Development', 'Business Software', 'Mobile App Development'],
                }}
            />
            <div className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--secondary)] selection:text-[var(--foreground)]">

                {/* SECTION 1: HERO */}
                <section className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-32 max-w-4xl mx-auto min-h-[70vh]">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4">
                        Software Development Company in Thrissur, Kerala
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                        Business software build, SaaS build, mobile app build, and custom ERP. Web development, POS, and automation across India and the Gulf.
                    </p>
                    <div className="flex flex-col w-full md:w-auto md:flex-row gap-2 md:gap-4">
                        <Link to="/contact" className="flex items-center justify-center h-12 w-full md:w-auto px-8 bg-[var(--primary)] text-[var(--primary-foreground)] font-medium rounded hover:bg-white transition-colors">
                            Book Consultation
                        </Link>
                        <Link to="/work" className="flex items-center justify-center h-12 w-full md:w-auto px-8 bg-transparent border border-[var(--border)] text-[var(--foreground)] font-medium rounded hover:bg-[var(--muted)] transition-colors">
                            View Work
                        </Link>
                    </div>
                </section>

                {/* SECTION 2: CORE SERVICES */}
                <section className="px-4 py-16 md:py-32 max-w-7xl mx-auto border-t border-[var(--border)]">
                    <div className="mb-12 md:mb-16">
                        <h2 className="text-3xl font-medium tracking-tight mb-4">Core Competencies</h2>
                        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
                            Precision-engineered tech stacks designed to handle high transaction volumes and complex workflows securely.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-48 rounded bg-[var(--card)] border border-[var(--border)] animate-pulse" />
                            ))
                        ) : (
                            displayServices.map((service, i) => {
                                const Icon = serviceIcons[i % serviceIcons.length];
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

                {/* SECTION 3: READY-TO-DEPLOY PLATFORMS */}
                <section className="px-4 pb-16 md:pb-32 max-w-7xl mx-auto">
                    <div className="mb-8 md:mb-16">
                        <h2 className="text-3xl font-medium tracking-tight mb-4">Platforms Ready to Customize</h2>
                        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
                            Pre-architected platforms that act as a foundation for your specific business requirements, accelerating deployment timelines.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[var(--border)] rounded hover:bg-[#141414] transition-colors duration-300 mb-8">
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-[var(--border)] pb-8 md:pb-0 md:pr-16">
                            <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">Online Shopping App (QuickCart)</h3>
                            <span className="inline-block text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase mt-2">E-Commerce Architecture</span>

                            <div className="mt-auto hidden md:block pt-8">
                                <h4 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React 19, TypeScript, Recharts, DB</p>
                            </div>
                        </div>

                        <div className="space-y-8 flex flex-col justify-center">
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3">Core Capabilities</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Developed multi-role e-commerce platform (Customer/Admin/Staff) with marketing campaign analytics dashboard.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Implemented dynamic brand customization using CSS variables and advanced filtering/search modules.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Foundation ready to be customized strictly based on the company's requirements.</span></li>
                                </ul>
                            </div>

                            <div className="md:hidden pt-4 mt-2 border-t border-[var(--border)]">
                                <h4 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React 19, TypeScript, Recharts, DB</p>
                            </div>
                        </div>
                    </div>

                    {/* HexaBill Integration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[var(--border)] rounded hover:bg-[#141414] transition-colors duration-300">
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-[var(--border)] pb-8 md:pb-0 md:pr-16">
                            <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">HexaBill</h3>
                            <span className="inline-block text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase mt-2">Enterprise Billing & ERP Software</span>

                            <div className="mt-auto hidden md:block pt-8">
                                <h4 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React, Node.js, Cloud DB Architecture, Secure Auth</p>
                            </div>
                        </div>

                        <div className="space-y-8 flex flex-col justify-center">
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3">Core Capabilities</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">GST & Tax Compliant Invoicing system with automated complex taxation handling.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Advanced Inventory Management, real-time stock tracking, and automated low-stock threshold alerts.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Comprehensive Finance Ledgers keeping track of Supplier payments and Customer credit autonomously.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Deep Analytical Dashboard generating custom date-range sales reports and profit statistics.</span></li>
                                </ul>
                            </div>

                            <div className="md:hidden pt-4 mt-2 border-t border-[var(--border)]">
                                <h4 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React, Node.js, Cloud DB Architecture, Secure Auth</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: INDUSTRIES */}
                <section className="px-4 pb-16 md:pb-32 max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                    {['Retail & Wholesale', 'Healthcare', 'Logistics', 'Restaurants', 'SMEs & Enterprises'].map((ind) => (
                        <span key={ind} className="h-12 px-6 flex items-center justify-center border border-[var(--border)] rounded-full text-[var(--muted-foreground)] text-sm md:text-base tracking-wide whitespace-nowrap">
                            {ind}
                        </span>
                    ))}
                </section>

                {/* SECTION 5: WHY HEXASTACK */}
                <section className="px-4 py-16 md:py-32 max-w-7xl mx-auto border-t border-[var(--border)]">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 md:sticky md:top-32 text-[#F5F5F5]">
                                We engineer structured digital foundations — not temporary fixes.
                            </h2>
                        </div>
                        <div className="md:w-1/2 flex flex-col justify-center">
                            <ul className="space-y-6 text-lg text-[#F5F5F5]">
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Multi-tenant SaaS expertise</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Route-based ERP systems</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> VAT-ready infrastructure</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Secure role-based access</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Long-term technical support</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: CTA */}
                <section className="bg-[#111111] px-4 py-16 md:py-32 text-center border-t border-[var(--border)]">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-[#F5F5F5]">
                        Let’s Build Better Systems.
                    </h2>
                    <div className="flex justify-center flex-col md:flex-row">
                        <Link to="/contact" className="flex items-center justify-center h-12 w-full md:w-auto px-12 bg-[var(--primary)] text-[var(--primary-foreground)] font-medium rounded hover:bg-white transition-colors">
                            Book Consultation
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
