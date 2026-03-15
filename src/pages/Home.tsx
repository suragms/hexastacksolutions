import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Calculator, Bot, Cloud, Layout as LayoutIcon, BarChart3, X, Quote } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';
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

const GULF_COUNTRY_CODES = ['AE', 'SA', 'OM', 'QA', 'KW', 'BH'];

const HERO_INDIA = {
    eyebrow: 'Restaurant POS  ·  Billing Software  ·  AI Tools  ·  UAE + Kerala  ·  Reply in 2 hrs',
    h1line1: 'Your business runs on manual work.',
    h1line2: 'We fix that.',
    sub: 'Billing systems, POS, and AI tools for Kerala businesses and Gulf restaurants. Live in 4–6 weeks. You talk directly to the developer.',
    ctaPrimary: 'See Our Work',
    ctaPrimaryTo: '/work',
    ctaSecondary: 'Get Free Quote',
    ctaSecondaryTo: '/contact',
};
const HERO_GULF = {
    eyebrow: 'Restaurant POS  ·  Billing Software  ·  AI Tools  ·  UAE + Kerala  ·  Reply in 2 hrs',
    h1line1: 'Wrong orders. Manual billing.',
    h1line2: 'We built POS for Gulf restaurants.',
    sub: 'Billing systems, POS, and AI tools for Kerala businesses and Gulf restaurants. Live in 4–6 weeks. You talk directly to the developer.',
    ctaPrimary: 'See Our Work',
    ctaPrimaryTo: '/work',
    ctaSecondary: 'Get Free Quote',
    ctaSecondaryTo: '/contact',
};

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
    const [countryCode, setCountryCode] = useState<string | null>(null);

    const isGulf = countryCode && GULF_COUNTRY_CODES.includes(countryCode);
    const heroData = isGulf ? HERO_GULF : HERO_INDIA;

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then((res) => res.json())
            .then((data) => data?.country_code && setCountryCode(data.country_code))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (countryCode && GULF_COUNTRY_CODES.includes(countryCode)) {
            document.title = 'HexaStack Solutions | Software & POS for UAE & Gulf';
        }
    }, [countryCode]);

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
                {/* 1. Hero */}
                <section className="hero-parallax relative pt-8 pb-14 sm:pt-12 sm:pb-16 md:pt-32 md:pb-32 px-4 sm:px-6 overflow-x-hidden min-w-0">
                    <div className="max-w-6xl mx-auto relative z-10 min-w-0 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl min-w-0 w-full"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-full border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm mb-6 sm:mb-8 max-w-full">
                                <span className="relative flex h-2 w-2 shrink-0 mt-0.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-40" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[var(--muted-foreground)] whitespace-normal break-words leading-snug">{heroData.eyebrow}</span>
                            </div>
                            <div className="mb-6 sm:mb-8">
                                <div className="w-10 h-10 border-2 border-[var(--border)] rounded-lg flex items-center justify-center p-1.5 bg-[var(--card)] shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[var(--foreground)]" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isGulf ? 'gulf' : 'india'}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className="min-w-0"
                                >
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.15] mb-4 sm:mb-6 break-words">
                                        {heroData.h1line1}<br /><span className="text-[var(--primary)]">{heroData.h1line2}</span>
                                    </h1>
                                    <p className="text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed mb-4 sm:mb-6 max-w-2xl font-light break-words">
                                        {heroData.sub}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
                                <Link
                                    to={(heroData as { ctaPrimaryTo?: string }).ctaPrimaryTo || '/work'}
                                    className="cta-glow inline-flex items-center justify-center gap-2 min-h-[48px] px-6 sm:px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95 active:scale-[0.98] transition-all duration-300 touch-manipulation"
                                >
                                    {(heroData as { ctaPrimary?: string }).ctaPrimary || 'See Our Work'} <ArrowRight className="w-4 h-4 shrink-0" />
                                </Link>
                                <Link
                                    to={(heroData as { ctaSecondaryTo?: string }).ctaSecondaryTo || '/contact'}
                                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 sm:px-8 py-3.5 rounded-full border border-[var(--border)] bg-transparent text-[var(--foreground)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 touch-manipulation"
                                >
                                    {(heroData as { ctaSecondary?: string }).ctaSecondary || 'Get Free Quote'}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Case Studies — Work we've delivered */}
                <section id="case-studies" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--card)]/50 overflow-visible" aria-labelledby="case-studies-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="case-studies-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Work we&apos;ve delivered</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">Real projects: problem, solution, result.</p>
                        </ScrollReveal>
                        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {caseStudies.map((c, i) => (
                                <Link key={i} to={c.to} className="block h-full group">
                                    <GlassCard gradientBorder hover className="p-6 h-full flex flex-col border-[var(--border)] group-hover:border-[var(--primary)] group-hover:shadow-[0_4px_12px_rgba(29,78,216,0.08)] transition-all duration-150">
                                        <h3 className="font-semibold text-[var(--foreground)] mb-2">{c.title}</h3>
                                        {c.problem && <p className="text-sm text-[var(--muted-foreground)] mb-1">{c.problem}</p>}
                                        {c.build && <p className="text-sm text-[var(--muted-foreground)] mb-1">{c.build}</p>}
                                        {c.result && <p className="text-base font-semibold text-[#10B981] mt-2">{c.result}</p>}
                                        {!c.problem && c.outcome && <p className="text-sm text-[var(--muted-foreground)] flex-1">{c.outcome}</p>}
                                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] mt-4">View Case Study <ArrowRight className="w-4 h-4" /></span>
                                    </GlassCard>
                                </Link>
                            ))}
                        </ScrollRevealStagger>
                        <ScrollReveal className="mt-10">
                            <Link to="/work" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline">View all work <ArrowRight className="w-4 h-4" /></Link>
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
