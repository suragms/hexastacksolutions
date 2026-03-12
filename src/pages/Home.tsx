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
    { name: 'Discovery', desc: 'Requirements, constraints, and success criteria.' },
    { name: 'Architecture', desc: 'System design and technology choices.' },
    { name: 'Development', desc: 'Iterative delivery with clear milestones.' },
    { name: 'Deployment', desc: 'Secure rollout and handover.' },
    { name: 'Optimization', desc: 'Monitoring, support, and continuous improvement.' },
];

const techStackItems = ['AWS', 'GCP', 'Node.js', 'React', 'TypeScript', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'Prisma', 'REST & APIs', 'AI/ML'];

const GULF_COUNTRY_CODES = ['AE', 'SA', 'OM', 'QA', 'KW', 'BH'];

const HERO_INDIA = {
    eyebrow: '5 Projects  ·  2 Countries  ·  Rs.2Cr/mo client volume  ·  2hr Reply',
    h1line1: 'Custom Software Built in',
    h1line2: 'Thrissur, Kerala',
    sub: 'We build websites, POS systems, billing software, and AI tools. UAE experience. Kerala roots. WhatsApp reply in 2 hours.',
    ctaText: 'WhatsApp Us Now',
};
const HERO_GULF = {
    eyebrow: 'Software & POS for UAE & Gulf  ·  VAT-compliant  ·  2hr Reply',
    h1line1: 'Custom Software & POS for',
    h1line2: 'UAE & Gulf',
    sub: 'Websites, POS, billing, and AI tools. Built in Kerala, deployed in the Gulf. VAT-compliant. WhatsApp reply in 2 hours.',
    ctaText: 'WhatsApp Us Now',
};

const defaultCaseStudies = [
    { title: 'Automated billing workflow for trading company', outcome: 'Reduced manual work by 70%', to: '/work' },
    { title: 'Restaurant POS & inventory (UAE)', outcome: 'Multi-branch, VAT-compliant operations', to: '/work' },
    { title: 'Medical lab management (Kerala)', outcome: 'Sample tracking and reporting automated', to: '/work' },
    { title: 'NutriScan AI food recognition', outcome: 'SaaS product from concept to launch', to: '/work' },
];

const testimonials = [
    { quote: 'HexaStack delivered our POS and billing system on time. We now run multi-branch operations without manual reconciliation.', name: 'Client', role: 'Restaurant group, UAE' },
    { quote: 'From discovery to deployment, the process was clear. Our lab software has cut reporting time significantly.', name: 'Client', role: 'Medical lab, Kerala' },
    { quote: 'We needed a SaaS product that could scale. HexaStack designed the architecture and built it — we\'re live and growing.', name: 'Client', role: 'SaaS startup' },
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
    const [caseStudies, setCaseStudies] = useState<{ title: string; outcome: string; to: string }[]>(defaultCaseStudies);
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

    const apiProductsFiltered = products.filter((p: { isComingSoon?: boolean }) => !p.isComingSoon);
    const displayProducts = apiProductsFiltered.length > 0
        ? apiProductsFiltered.map((p: { id: string; name: string; description: string; link?: string }, i: number) => ({
            ...p,
            cta: productCards[i]?.cta ?? 'Learn more',
            ctaLink: productCards[i]?.ctaLink ?? (p as { link?: string }).link ?? productCards[i]?.to,
        }))
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
                url: 'https://hexastacksolutions.com',
                logo: 'https://hexastacksolutions.com/logo-dark-new.png',
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
                url: 'https://hexastacksolutions.com',
                description: 'AI automation consulting, custom enterprise software development, SaaS platform engineering, and cloud infrastructure.',
                areaServed: [{ '@type': 'Place', name: 'Kerala' }, { '@type': 'Place', name: 'UAE' }],
            },
        ],
    };

    return (
        <Layout>
            <SEO
                title="HexaStack Solutions | Software Company Thrissur Kerala"
                description="Custom software development in Thrissur, Kerala. Websites, POS, billing, AI. UAE experience. Starting Rs.15,000. WhatsApp: +917591999365"
                keywords="web development Thrissur, software company Kerala, website design Thrissur, POS Thrissur, HexaStack, HexaBill"
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
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.15] mb-4 sm:mb-6 break-words break-words">
                                        {heroData.h1line1}<br /><span className="text-[#3B82F6]">{heroData.h1line2}</span>
                                    </h1>
                                    <p className="text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed mb-4 sm:mb-6 max-w-2xl font-light break-words">
                                        {heroData.sub}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                                {['3+ Gulf Projects', 'Kerala & UAE', 'Direct to Developer', 'Rs.15K websites'].map((stat, i) => (
                                    <span key={i} className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm text-[var(--muted-foreground)] text-xs sm:text-sm font-medium">
                                        {stat}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
                                <a
                                    href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20found%20your%20website%20and%20I%20need%20help%20with%20a%20software%20project."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cta-glow inline-flex items-center justify-center gap-2 min-h-[48px] px-6 sm:px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95 active:scale-[0.98] transition-all duration-300 touch-manipulation"
                                >
                                    {heroData.ctaText} <ArrowRight className="w-4 h-4 shrink-0" />
                                </a>
                                <Link
                                    to="/work"
                                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 sm:px-8 py-3.5 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] font-medium transition-colors active:scale-[0.98] touch-manipulation"
                                >
                                    View Our Work
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Services */}
                <section id="services" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="services-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="services-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Services</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">Enterprise software, AI automation, SaaS platforms, and cloud architecture. Delivered — not vapour.</p>
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

                {/* 3. Featured case studies */}
                <section id="case-studies" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--card)]/50 overflow-visible" aria-labelledby="case-studies-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="case-studies-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Featured Case Studies</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">Outcome-first delivery: real projects for trading, retail, healthcare, and SaaS.</p>
                        </ScrollReveal>
                        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {caseStudies.map((c, i) => (
                                <Link key={i} to={c.to} className="block h-full">
                                    <GlassCard gradientBorder hover className="p-6 h-full flex flex-col">
                                        <h3 className="font-semibold text-[var(--foreground)] mb-2">{c.title}</h3>
                                        <p className="text-sm text-[var(--muted-foreground)] mb-4 flex-1">{c.outcome}</p>
                                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)]">View case study <ArrowRight className="w-4 h-4" /></span>
                                    </GlassCard>
                                </Link>
                            ))}
                        </ScrollRevealStagger>
                        <ScrollReveal className="mt-10">
                            <Link to="/work" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline">View all work <ArrowRight className="w-4 h-4" /></Link>
                        </ScrollReveal>
                    </div>
                </section>

                {/* 4. Technology stack */}
                <section id="tech-stack" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="tech-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="tech-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Technology Stack</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 max-w-xl">Cloud, languages, frameworks, and AI/ML we use to deliver enterprise systems.</p>
                        </ScrollReveal>
                        <ScrollReveal>
                            <div className="flex flex-wrap gap-3">
                                {techStackItems.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm text-[var(--muted-foreground)] text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* 5. Process workflow */}
                <section id="process" className="py-16 md:py-24 border-t border-[var(--border)] overflow-visible" aria-labelledby="process-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="process-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Process Workflow</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">From discovery to optimization. Clear phases for predictable outcomes.</p>
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

                {/* 6. Client testimonials */}
                <section id="testimonials" className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--card)]/50 overflow-visible" aria-labelledby="testimonials-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Client Testimonials</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 md:mb-14 max-w-xl">What businesses in Kerala and the Gulf say about working with us.</p>
                        </ScrollReveal>
                        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((t, i) => (
                                <GlassCard key={i} gradientBorder hover className="p-6 flex flex-col">
                                    <Quote className="w-8 h-8 text-[var(--primary)]/60 mb-4" aria-hidden />
                                    <blockquote className="text-[var(--foreground)] mb-4 flex-1 text-sm leading-relaxed">"{t.quote}"</blockquote>
                                    <footer>
                                        <cite className="not-italic font-semibold text-[var(--foreground)]">{t.name}</cite>
                                        <span className="text-[var(--muted-foreground)] text-sm block">{t.role}</span>
                                    </footer>
                                </GlassCard>
                            ))}
                        </ScrollRevealStagger>
                    </div>
                </section>

                {/* 7. Contact CTA */}
                <section id="contact-cta" className="py-20 md:py-24 border-t border-[var(--border)] bg-[var(--foreground)] text-white overflow-visible" aria-labelledby="contact-cta-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="contact-cta-heading" className="text-2xl md:text-4xl font-bold tracking-tight mb-4 break-words">Ready to discuss your project?</h2>
                            <p className="text-white/80 max-w-xl mx-auto mb-10">Request a consultation. We respond within 24 hours and can align scope, timeline, and next steps.</p>
                            <Link
                                to="/contact"
                                className="cta-glow inline-block px-8 py-4 rounded-full bg-white text-[var(--foreground)] font-semibold hover:bg-white/95 transition-all duration-300"
                            >
                                Request Consultation
                            </Link>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Products */}
                <section id="products" className="py-16 md:py-20 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="products-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="products-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Products</h2>
                            <p className="text-[var(--muted-foreground)] mb-10 max-w-xl">Business management, ATS resume tools, and career optimization.</p>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {loadingProducts
                                ? Array(4).fill(0).map((_, i) => <div key={i} className="h-64 rounded-2xl bg-[var(--card)] animate-pulse" />)
                                : displayProducts.slice(0, 4).map((p: { id: string; name: string; description: string; cta: string; ctaLink: string }, i: number) => {
                                    const card = productCards[i];
                                    const cta = p.cta || card?.cta || 'Learn more';
                                    const ctaLink = p.ctaLink || card?.ctaLink || '/solutions';
                                    const benefits = card?.title === 'HexaBill' ? ['VAT-compliant', 'Multi-branch'] : card?.title === 'HexaCV' ? ['Privacy-first', 'ATS-optimized'] : card?.title === 'Student Tools' ? ['CGPA Calculators', 'PDF tools'] : ['Career tools', 'JD analyzer'];
                                    return (
                                        <ScrollReveal key={p.id} delay={i * 0.08}>
                                            <GlassCard hover className="p-6 md:p-8 flex flex-col h-full">
                                                <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{p.name}</h3>
                                                <p className="text-sm text-[var(--muted-foreground)] mb-4 flex-1">{p.description}</p>
                                                <ul className="text-sm text-[var(--muted-foreground)] mb-4 space-y-1">
                                                    {benefits.slice(0, 2).map((b) => <li key={b}>• {b}</li>)}
                                                </ul>
                                                {ctaLink.startsWith('http') ? (
                                                    <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-95 transition-opacity">
                                                        {cta} <ArrowRight className="w-4 h-4" />
                                                    </a>
                                                ) : (
                                                    <Link to={ctaLink} className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-95 transition-opacity">
                                                        {cta} <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                )}
                                            </GlassCard>
                                        </ScrollReveal>
                                    );
                                })}
                        </div>
                    </div>
                </section>

                {/* Industries */}
                <section id="industries" className="py-12 md:py-16 border-t border-[var(--border)] bg-[var(--background)] overflow-visible" aria-labelledby="industries-heading">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                        <ScrollReveal>
                            <h2 id="industries-heading" className="text-2xl font-bold tracking-tight mb-2 text-[var(--foreground)] break-words">Industries We Serve</h2>
                            <p className="text-[var(--muted-foreground)] mb-6 max-w-xl">Retail, healthcare, logistics, hospitality, and growing enterprises.</p>
                        </ScrollReveal>
                        <div className="flex flex-wrap gap-3">
                            {['Retail & Wholesale', 'Healthcare', 'Logistics & Distribution', 'Restaurants & Hospitality', 'SMEs & Growing Enterprises'].map((ind) => (
                                <span key={ind} className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] text-sm font-medium">
                                    {ind}
                                </span>
                            ))}
                        </div>
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
