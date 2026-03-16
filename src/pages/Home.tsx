import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Calculator, Bot, Cloud, Layout as LayoutIcon, BarChart3, X, Quote } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';
import { PortfolioCard } from '@/components/PortfolioCard';
import { API_URL } from '@/lib/utils';

const productCards = [
    { to: '/products/hexabill', title: 'HexaBill', desc: 'Complete business management: invoicing, POS, inventory, multi-branch. VAT-compliant for India and Gulf.', cta: 'Request Demo', ctaLink: '/contact?demo=1' },
    { to: 'https://www.hexacv.online/', title: 'HexaCV', desc: 'Free ATS resume builder. Privacy-first, no login. Score checker, keyword gap, JD analyzer.', cta: 'Try Now', ctaLink: 'https://www.hexacv.online/', isExternal: true },
    { to: 'https://www.hexacv.online/free-tools', title: 'Hexa AI Tool Suite', desc: 'Career optimization tools: ATS checker, JD analyzer, bullet improver, section checker.', cta: 'Explore Tools', ctaLink: 'https://www.hexacv.online/free-tools', isExternal: true },
    { to: 'https://studentshub-gold.vercel.app/', title: 'Student Tools', desc: 'Academic productivity SaaS with CGPA, attendance, internal marks calculators, and client-side PDF tools.', cta: 'Open App', ctaLink: 'https://studentshub-gold.vercel.app/', isExternal: true },
];

const serviceIcons = [Code2, Calculator, Bot, Cloud, LayoutIcon, BarChart3];
const services = [
    { title: 'Custom Enterprise Software Development', desc: 'Eliminate manual processes and unify operations with software tailored to your workflows. Data-driven systems that scale with your business.' },
    { title: 'ERP & Billing System Implementation', desc: 'Deploy scalable billing, inventory, and reporting platforms. VAT-compliant for India and Gulf; multi-branch and audit-ready.' },
    { title: 'AI Automation & Integration', desc: 'Reduce manual dependency with intelligent automation. Integrate systems and workflows so your team focuses on high-value work.' },
    { title: 'SaaS Platform Engineering', desc: 'Design and engineer scalable SaaS products. From architecture to deployment, we deliver platforms that grow with your users.' },
    { title: 'Cloud Infrastructure & Architecture', desc: 'Secure, scalable hosting and architecture. Reliable deployment and operations so your systems stay available and performant.' },
    { title: 'System Optimization & Digital Audit', desc: 'Identify inefficiencies and performance gaps. Actionable recommendations to reduce cost and improve digital operations.' },
];

const processSteps = [
    { name: 'We listen first', desc: 'One call to understand your problem.' },
    { name: 'We design before building', desc: 'You see the blueprint before a line of code is written.' },
    { name: 'You see progress weekly', desc: 'Working software every week, not a big reveal at the end.' },
    { name: 'We go live together', desc: 'Your team is trained, data is migrated, we stay available.' },
    { name: 'We don\'t disappear', desc: 'Monitoring and fixes included after launch.' },
];

const defaultCaseStudies: { title: string; problem: string; build: string; result: string; to: string }[] = [
    { title: 'Trading company billing', problem: '200+ orders/month done by hand.', build: 'We automated invoicing and reconciliation.', result: 'Manual work cut 70%.', to: '/work' },
    { title: 'UAE restaurant POS', problem: 'Orders lost between floors.', build: 'We built VAT-compliant POS with live inventory sync.', result: 'Zero manual reconciliation.', to: '/work' },
    { title: 'Medical lab (Kerala)', problem: 'Paper registers. 200+ samples/month tracked manually.', build: 'Lab management system — intake to final report.', result: 'Reporting time cut 60%.', to: '/work' },
    { title: 'NutriScan AI', problem: 'Founder had an idea — photo your food, get nutrition data.', build: 'GPT-4o Vision + SaaS platform — architecture to launch.', result: 'Live and growing.', to: '/work' },
];

const testimonials = [
    { quote: 'HexaStack delivered our POS and billing system on time. We now run multi-branch operations without manual reconciliation.', name: 'Ahmed R.', role: 'Dubai' },
    { quote: 'From discovery to deployment, the process was clear. Our lab software has cut reporting time significantly.', name: 'Restaurant owner', role: 'Dubai, 2024' },
    { quote: 'We needed a SaaS product that could scale. HexaStack designed the architecture and built it — we\'re live and growing.', name: 'SaaS founder', role: 'India, 2024' },
];

interface PortfolioProject {
    id: string;
    title: string;
    description: string;
    featured: boolean;
    displayOrder: number;
}

export default function Home() {
    const [products, setProducts] = useState<{ id: string; name: string; description: string; link?: string; isComingSoon: boolean }[]>([]);
    const [dbServices, setDbServices] = useState<{ id: string; name: string; icon: string; link?: string; isComingSoon: boolean; description?: string }[]>([]);
    const [caseStudies, setCaseStudies] = useState<{ title: string; outcome?: string; problem?: string; build?: string; result?: string; to: string }[]>(defaultCaseStudies);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [exitIntentShown, setExitIntentShown] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setProducts(Array.isArray(data) ? data : []))
            .catch(() => { })
            .finally(() => setLoadingProducts(false));

        fetch(`${API_URL}/api/services`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setDbServices(Array.isArray(data) ? data : []))
            .catch(() => { })
            .finally(() => setLoadingServices(false));

        fetch(`${API_URL}/api/portfolio`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data: PortfolioProject[]) => {
                const featured = (Array.isArray(data) ? data : [])
                    .filter((p) => p.featured)
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .slice(0, 4);
                if (featured.length >= 2) {
                    setCaseStudies(
                        featured.map((p) => ({
                            title: p.title,
                            outcome: p.description?.slice(0, 80) + (p.description && p.description.length > 80 ? '…' : '') || 'Delivered on scope and timeline.',
                            problem: p.description?.slice(0, 60) || '',
                            build: 'We delivered on scope and timeline.',
                            result: 'Delivered.',
                            to: '/work',
                        }))
                    );
                }
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !exitIntentShown) setExitIntentShown(true);
        };
        document.addEventListener('mouseout', handleMouseLeave);
        return () => document.removeEventListener('mouseout', handleMouseLeave);
    }, [exitIntentShown]);

    const productCardByTitle = (title: string) => productCards.find((c) => c.title.toLowerCase() === title.toLowerCase());
    const apiProductsFiltered = products.filter((p: { isComingSoon?: boolean }) => !p.isComingSoon);
    const displayProducts = apiProductsFiltered.length > 0
        ? apiProductsFiltered.map((p: { id: string; name: string; description: string; link?: string }) => {
            const card = productCardByTitle(p.name);
            return {
                ...p,
                cta: card?.cta ?? 'Learn more',
                ctaLink: card?.ctaLink ?? (p as { link?: string }).link ?? card?.to ?? '/contact',
            };
        })
        : productCards.map((p) => ({ id: p.to, name: p.title, description: p.desc, link: p.to, cta: p.cta, ctaLink: p.ctaLink }));

    const apiServicesFiltered = dbServices.filter((s: { isComingSoon?: boolean }) => !s.isComingSoon);
    const displayServices = apiServicesFiltered.length > 0 ? apiServicesFiltered : services;

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                name: 'HexaStack Solutions',
                legalName: 'HexaStack Solutions',
                url: 'https://www.hexastacksolutions.com',
                logo: 'https://www.hexastacksolutions.com/logo-dark-new.png',
                description: 'AI automation consulting, custom enterprise software development, SaaS platform engineering, and cloud infrastructure. Thrissur-based, serving Kerala and Gulf.',
                areaServed: [{ '@type': 'Place', name: 'Thrissur' }, { '@type': 'Place', name: 'Kerala' }, { '@type': 'Place', name: 'UAE' }],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+91-7591999365',
                    contactType: 'customer service',
                    areaServed: 'IN, AE',
                    availableLanguage: 'English',
                    availableChannel: { '@type': 'ContactChannel', contactType: 'whatsapp' },
                },
            },
            {
                '@type': 'ProfessionalService',
                name: 'HexaStack Solutions',
                url: 'https://www.hexastacksolutions.com',
                description: 'AI automation consulting, custom enterprise software development, SaaS platform engineering, and cloud infrastructure.',
                areaServed: [{ '@type': 'Place', name: 'Kerala' }, { '@type': 'Place', name: 'UAE' }],
            },
        ],
    };

    return (
        <Layout>
            <SEO
                title="Custom Software & POS Company | Kerala & UAE | HexaStack Solutions"
                description="Billing software, POS systems, and AI tools for Kerala businesses and Gulf restaurants. VAT-compliant. Live in 4–6 weeks. Free quote."
                keywords="custom software Kerala, POS software UAE, billing software Thrissur, software company Kerala, restaurant POS Dubai, VAT billing software UAE, web development Thrissur, ERP software Kerala, AI automation Kerala, SaaS development India, software development company Thrissur, best billing software Kerala, Vadanappally Thrissur Kerala, software company Vadanappally, web development Vadanappally Thrissur, billing software Vadanappally"
                canonical="/"
                schema={schemaOrg}
            />

            <main>
                {/* 1. Hero – outcome-led, Z-pattern, staggered entrance */}
                <section
                    className="relative px-4 sm:px-6 overflow-x-hidden min-w-0 bg-[var(--background)]"
                    style={{ minHeight: 'calc(100vh - 80px)' }}
                    aria-labelledby="hero-heading"
                >
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-16 pt-10 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-24">
                        {/* Left: copy */}
                        <div className="flex-1 min-w-0">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-4">
                                    Software Development · Thrissur, Kerala
                                </p>
                            </motion.div>

                            <motion.h1
                                id="hero-heading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.05 }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[var(--foreground)] leading-[1.1] mb-4 sm:mb-5 max-w-xl"
                            >
                                Custom software that grows your Kerala business.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl mb-6 sm:mb-8"
                            >
                                Web apps, POS and billing systems, and AI automation for Kerala businesses and Gulf clients.
                                Built by a Thrissur-based team using React, Node.js, and MongoDB — typically live in 4–8 weeks.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.25 }}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
                            >
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 sm:px-8 py-3.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm sm:text-base font-semibold shadow-[0_10px_25px_rgba(37,99,235,0.35)] transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
                                >
                                    Get a Free Quote <span aria-hidden>→</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const el = document.getElementById('homepage-portfolio');
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }}
                                    className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[var(--foreground)] underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
                                >
                                    See Our Work <span aria-hidden>↓</span>
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm text-[var(--muted-foreground)]"
                            >
                                <div>
                                    <p className="font-medium text-[var(--foreground)]">Trusted by 50+ Kerala businesses</p>
                                    <p className="text-xs sm:text-[13px]">
                                        From restaurants and labs to SaaS founders — projects delivered in Kerala, UAE, and Oman.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 sm:ml-auto">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="h-8 w-16 sm:h-9 sm:w-20 rounded-md border border-[var(--border)] bg-[var(--card)]/80 shadow-sm"
                                            aria-hidden
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: simple visual placeholder to complete Z-pattern */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="w-full max-w-md lg:max-w-sm xl:max-w-md flex-1 lg:flex-none"
                            aria-hidden
                        >
                            <div className="relative rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[var(--shadow-card)] px-6 py-5 sm:px-7 sm:py-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)] mb-3">
                                    Recent outcomes
                                </p>
                                <ul className="space-y-3 text-sm text-[var(--foreground)]">
                                    <li>
                                        <span className="inline-flex items-center gap-2">
                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold">
                                                60%
                                            </span>
                                            Checkout time cut for an e‑commerce brand.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="inline-flex items-center gap-2">
                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold">
                                                3x
                                            </span>
                                            Faster invoicing for a trading company.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="inline-flex items-center gap-2">
                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-50 text-violet-600 text-[11px] font-semibold">
                                                70%
                                            </span>
                                            Less manual work for a medical lab.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 1b. Social proof strip directly under hero */}
                <section className="border-t border-[var(--border)] bg-[var(--card)]/70">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center gap-3">
                        <p className="text-xs sm:text-sm font-medium text-[var(--muted-foreground)]">
                            Trusted by businesses across Kerala
                        </p>
                        <div className="flex-1 overflow-hidden">
                            <div className="flex items-center gap-6 sm:gap-8 text-[var(--muted-foreground)] text-xs whitespace-nowrap animate-[hero-marquee_20s_linear_infinite]">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="h-6 w-20 rounded-md border border-[var(--border)] bg-[var(--background)]/90"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Case Studies / Portfolio preview */}
                <section id="homepage-portfolio" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--card)]/50 overflow-visible" aria-labelledby="case-studies-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="case-studies-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">
                                Recent projects from Kerala & Gulf
                            </h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">
                                Outcome-led case studies so you can see the problems we solved and the results we delivered.
                            </p>
                        </ScrollReveal>
                        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {caseStudies.slice(0, 3).map((c, i) => (
                                <Link key={i} to={c.to} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] rounded-2xl">
                                    <PortfolioCard
                                        category={i === 0 ? 'Billing & ERP' : i === 1 ? 'Restaurant POS' : 'Medical / SaaS'}
                                        techLabel={i === 1 ? 'POS · React + Node.js' : 'Web App · React + Node.js'}
                                        name={c.title}
                                        outcome={c.result || c.outcome || 'Delivered on scope and timeline.'}
                                        problem={c.problem || 'We replaced manual work with a structured system.'}
                                        techStack={i === 1 ? ['React', 'Node.js', 'MongoDB'] : ['React', 'Node.js', 'MongoDB']}
                                        to={c.to}
                                        featured={i === 0}
                                    />
                                </Link>
                            ))}
                        </ScrollRevealStagger>
                        <ScrollReveal className="mt-10">
                            <Link to="/portfolio" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline">
                                View full portfolio <ArrowRight className="w-4 h-4" />
                            </Link>
                        </ScrollReveal>
                    </div>
                </section>

                {/* 3. Testimonials */}
                <section id="testimonials" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="testimonials-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">What clients say</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">What businesses in Kerala and the Gulf say about working with us.</p>
                        </ScrollReveal>
                        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((t, i) => (
                                <GlassCard key={i} gradientBorder hover className="p-6 flex flex-col">
                                    <span className="text-amber-500 text-base mb-2" aria-hidden>★★★★★</span>
                                    <Quote className="w-8 h-8 text-[var(--primary)]/60 mb-4" aria-hidden />
                                    <blockquote className="text-[var(--foreground)] mb-4 flex-1 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</blockquote>
                                    <footer>
                                        <cite className="not-italic font-semibold text-[var(--foreground)]">{t.name}</cite>
                                        <span className="text-[var(--muted-foreground)] text-sm block">{t.role}</span>
                                    </footer>
                                </GlassCard>
                            ))}
                        </ScrollRevealStagger>
                    </div>
                </section>

                {/* 4. Mid-page CTA Banner */}
                <section className="py-10 md:py-12 bg-[#EFF6FF] border-t border-[var(--border)]" aria-label="Mid-page call to action">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                        <p className="text-lg font-semibold text-[var(--foreground)] mb-4">Seen enough? Tell us what you need.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/contact" className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95 transition-opacity">
                                Get Free Quote
                            </Link>
                            <a href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20saw%20your%20site%20and%20want%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full border-2 border-[#25D366] bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors">
                                WhatsApp in 2 hrs
                            </a>
                        </div>
                    </div>
                </section>

                {/* 5. Services */}
                <section id="services" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="services-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="services-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">What we build</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">Software that replaces spreadsheets, manual billing, and broken workflows.</p>
                        </ScrollReveal>
                        {loadingServices ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array(6).fill(0).map((_, i) => <div key={i} className="h-44 rounded-2xl bg-[var(--card)] animate-pulse border border-[var(--border)]" />)}
                            </div>
                        ) : (
                            <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayServices.map((s: { id?: string; title?: string; name?: string; desc?: string; description?: string; link?: string; icon?: string }, i: number) => {
                                    const Icon = serviceIcons[i % serviceIcons.length];
                                    const title = s.title || s.name;
                                    const desc = s.desc || s.description || s.link;
                                    return (
                                        <GlassCard key={s.id || title || i} gradientBorder hover className="p-6 flex flex-col items-start h-full group">
                                            {s.icon && typeof s.icon === 'string' ? (
                                                <img src={s.icon} alt={title || ''} className="w-9 h-9 rounded-lg mb-4 object-contain group-hover:scale-105 transition-transform" />
                                            ) : Icon ? (
                                                <div className="mb-4 p-2 rounded-lg bg-[var(--secondary)] text-[var(--primary)] group-hover:scale-105 transition-transform duration-300">
                                                    <Icon className="w-6 h-6" aria-hidden />
                                                </div>
                                            ) : null}
                                            <h3 className="font-semibold text-lg mb-2 text-[var(--foreground)]">{title}</h3>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">{desc}</p>
                                        </GlassCard>
                                    );
                                })}
                            </ScrollRevealStagger>
                        )}
                    </div>
                </section>

                {/* 6. Products */}
                <section id="products" className="py-16 md:py-20 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="products-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="products-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Products</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 max-w-xl">Business management, ATS resume tools, and career optimization.</p>
                        </ScrollReveal>
                        {loadingProducts ? (
                            <div className="space-y-8">
                                <div className="h-48 rounded-2xl bg-[var(--card)] animate-pulse" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[1, 2].map((i) => <div key={i} className="h-40 rounded-2xl bg-[var(--card)] animate-pulse" />)}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">Business Software</span>
                                    <div className="mt-3">
                                        {displayProducts.filter((p: { name: string }) => p.name.toLowerCase().includes('hexabill')).map((p: { id: string; name: string; description: string; cta: string; ctaLink: string }) => (
                                            <ScrollReveal key={p.id}>
                                                <GlassCard hover className="p-6 md:p-8 flex flex-col">
                                                    <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{p.name} — Billing &amp; POS for Kerala and Gulf</h3>
                                                    <p className="text-sm text-[var(--muted-foreground)] mb-2">Our flagship billing and POS product. Used by businesses in UAE and Kerala right now.</p>
                                                    <p className="text-sm text-[var(--muted-foreground)] mb-4 flex-1">{p.description}</p>
                                                    <Link to={p.ctaLink.startsWith('http') ? '/contact?demo=hexabill' : p.ctaLink} className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-95 transition-opacity">
                                                        Request Demo <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </GlassCard>
                                            </ScrollReveal>
                                        ))}
                                        {displayProducts.filter((p: { name: string }) => p.name.toLowerCase().includes('hexabill')).length === 0 && (
                                            <GlassCard hover className="p-6 md:p-8">
                                                <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">HexaBill — Billing &amp; POS for Kerala and Gulf</h3>
                                                <p className="text-sm text-[var(--muted-foreground)] mb-4">Our flagship billing and POS product. Used by businesses in UAE and Kerala right now.</p>
                                                <Link to="/contact?demo=hexabill" className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-95">Request Demo <ArrowRight className="w-4 h-4" /></Link>
                                            </GlassCard>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Free tools for anyone</span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                                        {displayProducts.filter((p: { name: string }) => !p.name.toLowerCase().includes('hexabill')).slice(0, 3).map((p: { id: string; name: string; description: string; cta: string; ctaLink: string }) => (
                                            <ScrollReveal key={p.id}>
                                                <GlassCard hover className="p-5 md:p-6 flex flex-col h-full">
                                                    <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">{p.name}</h3>
                                                    <p className="text-sm text-[var(--muted-foreground)] mb-4 flex-1">{p.description}</p>
                                                    {p.ctaLink.startsWith('http') ? (
                                                        <a href={p.ctaLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                                                            {p.cta} <ArrowRight className="w-4 h-4" />
                                                        </a>
                                                    ) : (
                                                        <Link to={p.ctaLink} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                                                            {p.cta} <ArrowRight className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                </GlassCard>
                                            </ScrollReveal>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* 7. Process */}
                <section id="process" className="py-16 md:py-24 border-t border-[var(--border)] overflow-visible" aria-labelledby="process-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="process-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">How we work</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">Clear phases so you know what to expect.</p>
                        </ScrollReveal>
                        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {processSteps.map((step, i) => (
                                <GlassCard key={step.name} gradientBorder hover className="p-6 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-sm font-bold text-[var(--primary)] mb-3">
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <h3 className="font-semibold text-[var(--foreground)] mb-1">{step.name}</h3>
                                    <p className="text-xs text-[var(--muted-foreground)]">{step.desc}</p>
                                </GlassCard>
                            ))}
                        </ScrollRevealStagger>
                    </div>
                </section>

                {/* 8. Final CTA */}
                <section id="final-cta" className="py-20 md:py-24 border-t border-[var(--border)] bg-[var(--card)]/50 overflow-visible" aria-labelledby="final-cta-heading">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="final-cta-heading" className="text-2xl md:text-4xl font-bold tracking-tight mb-4 break-words text-[var(--foreground)]">Tell us what you&apos;re building.</h2>
                            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-10">WhatsApp or form — we reply same day, tell you if we can build it, give you a rough cost. No pressure, no sales pitch.</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20want%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors">
                                    WhatsApp Now
                                </a>
                                <Link to="/contact" className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95 transition-opacity">
                                    Fill the Form
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Blog */}
                <section className="py-12 md:py-16 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="blog-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <h2 id="blog-heading" className="text-2xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Blog</h2>
                        <p className="text-[var(--muted-foreground)] mb-6">Insights on ATS, VAT, and business software.</p>
                        <Link to="/blog" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] hover:underline">View blog →</Link>
                    </div>
                </section>

                {/* Exit intent */}
                {exitIntentShown && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[70] flex items-center gap-4 p-4 rounded-xl glass-card border border-[var(--border)] shadow-lg"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--foreground)]">Book a demo</p>
                            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">See HexaBill in action for your business.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Link to="/contact?demo=1" className="px-4 py-2 rounded-full bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-95 whitespace-nowrap transition-opacity" onClick={() => setExitIntentShown(false)}>
                                Book Demo
                            </Link>
                            <button onClick={() => setExitIntentShown(false)} className="p-1.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors" aria-label="Dismiss">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </main>
        </Layout>
    );
}
