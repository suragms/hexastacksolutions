import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BadgeCheck,
    Bot,
    Building2,
    CheckCircle2,
    Globe,
    LayoutDashboard,
    MapPin,
    MessageCircle,
    PhoneCall,
    Rocket,
    Search,
    ShieldCheck,
    Store,
    Workflow,
} from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';
import { API_URL } from '@/lib/utils';

const heroCards = [
    {
        icon: Globe,
        title: 'Business websites',
        description: 'Professional company websites designed to rank, build trust, and turn visits into enquiries.',
    },
    {
        icon: LayoutDashboard,
        title: 'Custom software',
        description: 'Internal dashboards, portals, and web apps built around the way your team actually works.',
    },
    {
        icon: Store,
        title: 'POS and billing',
        description: 'Retail, restaurant, and service-business systems with invoicing, reporting, and operations support.',
    },
    {
        icon: Bot,
        title: 'AI automation',
        description: 'Practical workflow automation that reduces repetitive work and improves response speed.',
    },
];

const servicePillars = [
    {
        icon: Globe,
        title: 'Website Design and Development',
        description: 'Corporate websites, landing pages, and service pages that look polished and support SEO from day one.',
        cta: '/contact?service=Website%20Design%20%2F%20SEO',
    },
    {
        icon: LayoutDashboard,
        title: 'Custom Web Apps and Portals',
        description: 'Admin panels, CRM-style tools, booking flows, and business dashboards built for speed and clarity.',
        cta: '/contact?service=Custom%20Web%20App',
    },
    {
        icon: Store,
        title: 'POS, Billing and Inventory',
        description: 'Operational software for retail, restaurants, and growing businesses that need better control.',
        cta: '/contact?service=POS%20%2F%20Billing%20Software',
    },
    {
        icon: Workflow,
        title: 'ERP and Internal Automation',
        description: 'Multi-step workflows, reporting systems, and process automation that cut manual follow-up.',
        cta: '/contact?service=ERP%20%2F%20Inventory',
    },
    {
        icon: Bot,
        title: 'AI Integration',
        description: 'Customer support helpers, workflow triggers, and AI-assisted experiences integrated into real products.',
        cta: '/contact?service=AI%20Automation',
    },
    {
        icon: Rocket,
        title: 'Launch and Growth Support',
        description: 'Deployment, content guidance, SEO structure, and improvements that help your website keep performing.',
        cta: '/contact?service=Maintenance%20%2F%20Support',
    },
];

const growthHighlights = [
    {
        icon: Search,
        title: 'SEO-ready structure',
        description: 'Clear titles, service keywords, schema, and page hierarchy help search engines understand the site.',
    },
    {
        icon: ShieldCheck,
        title: 'Professional trust signals',
        description: 'Credible design, direct contact details, and confident messaging help visitors feel safe to enquire.',
    },
    {
        icon: PhoneCall,
        title: 'Fast enquiry paths',
        description: 'Phone, WhatsApp, and contact form CTAs stay visible so interested visitors can act immediately.',
    },
];

const marketCoverage = [
    {
        title: 'Kerala',
        description: 'Local SEO pages and business-focused service content for Thrissur, Ernakulam, Kozhikode, and the rest of Kerala.',
        href: '/kerala',
        cta: 'Explore Kerala pages',
    },
    {
        title: 'United States',
        description: 'Professional websites, custom software, and SEO-aware service pages for businesses targeting US customers and markets.',
        href: '/united-states',
        cta: 'Explore United States pages',
    },
    {
        title: 'UAE and Gulf',
        description: 'VAT-ready billing, POS, and operational software experience for businesses that need Gulf-market support as well.',
        href: '/gulf-vat',
        cta: 'Explore Gulf VAT pages',
    },
];

const industries = [
    {
        title: 'Retail and local businesses',
        description: 'Websites, billing tools, and operational software for stores and customer-facing businesses.',
    },
    {
        title: 'Restaurants and hospitality',
        description: 'POS, ordering, reporting, and VAT-aware software for food and hospitality operations.',
    },
    {
        title: 'Healthcare and labs',
        description: 'Internal tools, records workflows, and software that improves accuracy and turnaround.',
    },
    {
        title: 'Founders and service companies',
        description: 'MVPs, client portals, and websites that make growing companies look more established online.',
    },
];

const processSteps = [
    {
        step: '01',
        title: 'Discovery',
        description: 'We understand your business, goals, and what needs to change in the current process.',
    },
    {
        step: '02',
        title: 'Scope and structure',
        description: 'We define the right pages, features, and delivery plan before development moves forward.',
    },
    {
        step: '03',
        title: 'Build and refine',
        description: 'You review working progress, not vague promises, so the result stays aligned with your needs.',
    },
    {
        step: '04',
        title: 'Launch and support',
        description: 'We help you go live cleanly and keep improving the website or software after launch.',
    },
];

const faqs = [
    {
        question: 'What does HexaStack Solutions build?',
        answer: 'We build professional websites, custom software, business web apps, billing systems, POS solutions, and AI-enabled workflows for companies in Kerala, across India, in the United States, and in the UAE.',
    },
    {
        question: 'Can you build an SEO-friendly business website for my company?',
        answer: 'Yes. We structure pages around real services, locations, and enquiry actions so the site supports both search visibility and conversion quality.',
    },
    {
        question: 'Do you only work with companies in Kerala?',
        answer: 'No. We are based in Thrissur, Kerala, and we also work with clients across India, the United States, and Gulf markets such as the UAE.',
    },
    {
        question: 'Can you support remote projects for United States businesses?',
        answer: 'Yes. We work remotely with clear communication, structured delivery, and direct founder-led coordination for businesses that need reliable website or software execution.',
    },
    {
        question: 'Can you build billing or POS software for restaurants and retail businesses?',
        answer: 'Yes. We work on billing, POS, inventory, and operational systems for businesses that need faster daily operations and better reporting.',
    },
];

interface ProductApiRecord {
    name: string;
    description: string;
    link?: string | null;
    category?: string | null;
    isComingSoon?: boolean;
    displayOrder?: number;
}

interface ProductShowcaseItem {
    title: string;
    description: string;
    href: string;
    cta: string;
    isExternal: boolean;
    badge: string;
}

const fallbackBusinessProducts: ProductShowcaseItem[] = [
    {
        title: 'HexaBill',
        description: 'Billing, POS, inventory, and multi-branch business software built for companies in Kerala, India, and Gulf markets.',
        href: '/products/hexabill',
        cta: 'View HexaBill',
        isExternal: false,
        badge: 'Business software',
    },
];

const fallbackFreeProducts: ProductShowcaseItem[] = [
    {
        title: 'HexaCV',
        description: 'A free ATS-focused resume tool that helps candidates improve resume quality before they apply.',
        href: 'https://www.hexacv.online/',
        cta: 'Try HexaCV',
        isExternal: true,
        badge: 'Free tool',
    },
    {
        title: 'Hexa AI Tool Suite',
        description: 'Free resume, JD comparison, bullet improvement, and job-application support tools in one place.',
        href: 'https://www.hexacv.online/free-tools',
        cta: 'Explore Tools',
        isExternal: true,
        badge: 'Free tool',
    },
    {
        title: 'Student Tools',
        description: 'CGPA, attendance, and academic utility tools built for students who want fast answers without friction.',
        href: 'https://studentshub-gold.vercel.app/',
        cta: 'Open Student Tools',
        isExternal: true,
        badge: 'Free tool',
    },
];

function getProductHref(product: ProductApiRecord) {
    if (product.link) {
        return product.link;
    }

    return product.name.toLowerCase() === 'hexabill' ? '/products/hexabill' : '/products';
}

function getProductCta(product: ProductApiRecord, category: 'business' | 'free') {
    if (category === 'free') {
        if (product.name === 'HexaCV') return 'Try HexaCV';
        if (product.name === 'Hexa AI Tool Suite') return 'Explore Tools';
        if (product.name === 'Student Tools') return 'Open Student Tools';
        return product.link?.startsWith('http') ? 'Open Tool' : 'View Tool';
    }

    if (product.name === 'HexaBill') return 'View HexaBill';
    return product.link?.startsWith('http') ? 'Open Product' : 'View Product';
}

function mapShowcaseProduct(product: ProductApiRecord, category: 'business' | 'free'): ProductShowcaseItem {
    return {
        title: product.name,
        description: product.description,
        href: getProductHref(product),
        cta: getProductCta(product, category),
        isExternal: Boolean(product.link?.startsWith('http')),
        badge: category === 'business' ? 'Business software' : 'Free tool',
    };
}

export default function Home() {
    const [businessProducts, setBusinessProducts] = useState<ProductShowcaseItem[]>(fallbackBusinessProducts);
    const [freeProducts, setFreeProducts] = useState<ProductShowcaseItem[]>(fallbackFreeProducts);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data: ProductApiRecord[]) => {
                if (!Array.isArray(data) || data.length === 0) {
                    return;
                }

                const business = data
                    .filter((product) => product.category === 'business' && !product.isComingSoon)
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((product) => mapShowcaseProduct(product, 'business'))
                    .slice(0, 3);

                const free = data
                    .filter((product) => product.category === 'free' && !product.isComingSoon)
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((product) => mapShowcaseProduct(product, 'free'))
                    .slice(0, 3);

                if (business.length > 0) {
                    setBusinessProducts(business);
                }

                if (free.length > 0) {
                    setFreeProducts(free);
                }
            })
            .catch(() => { });
    }, []);

    const featuredBusinessProduct = businessProducts[0];
    const secondaryProductCards = [...businessProducts.slice(1), ...freeProducts];

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                name: 'HexaStack Solutions',
                url: 'https://www.hexastacksolutions.com',
                logo: 'https://www.hexastacksolutions.com/logo.svg',
                telephone: '+91-75919-99365',
                email: 'hexastacksolutions@gmail.com',
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        contactType: 'sales',
                        telephone: '+91-75919-99365',
                        email: 'hexastacksolutions@gmail.com',
                        areaServed: ['IN', 'AE', 'US'],
                        availableLanguage: ['English'],
                    },
                    {
                        '@type': 'ContactPoint',
                        contactType: 'customer support',
                        telephone: '+91-75919-99365',
                        email: 'supporthexastack@hexastacksolutions.com',
                        areaServed: ['IN', 'AE', 'US'],
                        availableLanguage: ['English'],
                    },
                ],
                sameAs: [
                    'https://www.linkedin.com/company/hexastack-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgRPeQwUCSyGi54I4m7rNLw%3D%3D',
                    'https://share.google/cnsKSTykx8sjMzNxC',
                ],
            },
            {
                '@type': 'ProfessionalService',
                name: 'HexaStack Solutions',
                url: 'https://www.hexastacksolutions.com',
                areaServed: ['Thrissur', 'Kerala', 'India', 'United States', 'United Arab Emirates'],
                description: 'Software development company in Thrissur, Kerala offering website development, custom software, POS, billing and AI automation for India, United States, and UAE businesses.',
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer,
                    },
                })),
            },
        ],
    };

    return (
        <Layout>
            <SEO
                title="Software Development Company in Kerala for India, US and UAE Businesses | HexaStack Solutions"
                description="HexaStack Solutions builds professional business websites, custom software, POS, billing systems and AI automation for companies in Kerala, across India, the United States, and the UAE."
                keywords="software development company Kerala, website development company Kerala, web design company United States, custom software company India, offshore development team Kerala, business website company Kerala, POS software company India, billing software Kerala, AI automation company United States, ERP software company Kerala, HexaStack Solutions"
                canonical="/"
                locale="en_IN"
                localeAlternates={['en_US']}
                meta={[
                    { name: 'geo.region', content: 'IN-KL' },
                    { name: 'geo.placename', content: 'Thrissur, Kerala' },
                    { name: 'distribution', content: 'global' },
                ]}
                schema={schemaOrg}
            />

            <section className="page-shell overflow-hidden border-b border-[var(--border)]">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 10% 10%, rgba(37,99,235,0.18), transparent 30%), radial-gradient(circle at 90% 18%, rgba(6,182,212,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0))',
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
                    <div className="max-w-2xl">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <span className="section-kicker">
                                <MapPin className="h-3.5 w-3.5" />
                                Thrissur, Kerala based
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.08 }}
                            className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]"
                        >
                            Professional websites and custom software that help more people trust your business and enquire.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.16 }}
                            className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg"
                        >
                            HexaStack Solutions is a software development company in Thrissur, Kerala building business
                            websites, custom web apps, billing systems, POS software, and AI automation for companies
                            that want a stronger digital presence and a smoother enquiry flow across Kerala, India,
                            the United States, and the UAE.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.24 }}
                            className="mt-8 flex flex-col gap-3 sm:flex-row"
                        >
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)] transition-transform hover:scale-[1.02]"
                            >
                                Start Your Project
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                Learn About HexaStack
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.32 }}
                            className="mt-8 grid gap-4 sm:grid-cols-3"
                        >
                            {[
                                'Website development company in Kerala',
                                'Custom software and operations tools',
                                'Kerala, India, United States and UAE coverage',
                            ].map((item) => (
                                <div key={item} className="rounded-2xl border border-[var(--border)] bg-white/85 px-4 py-4 text-sm text-[var(--foreground)] shadow-sm">
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.18 }}
                        className="mt-10 lg:mt-0"
                    >
                        <GlassCard className="surface-panel rounded-[28px] p-6 sm:p-8" hover={false}>
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                                        Core focus
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                                        What businesses contact us for
                                    </h2>
                                </div>
                                <BadgeCheck className="h-10 w-10 text-[var(--primary)]" />
                            </div>
                            <div className="mt-6 grid gap-4">
                                {heroCards.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-white/90 p-4 shadow-sm">
                                            <div className="flex items-start gap-4">
                                                <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
                                                    <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="soft-divider my-6" />
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="tel:+917591999365"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    <PhoneCall className="h-4 w-4" />
                                    Call us
                                </a>
                                <a
                                    href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20would%20like%20to%20discuss%20a%20project."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20ba5a]"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    WhatsApp
                                </a>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">Services</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Built for visibility, credibility, and real business use
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                            Whether you need a company website, a portal for internal operations, or business software
                            that replaces manual work, we focus on a result that feels professional and is easy for
                            customers or staff to use.
                        </p>
                    </ScrollReveal>
                    <ScrollRevealStagger className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {servicePillars.map((item) => {
                            const Icon = item.icon;
                            return (
                                <GlassCard key={item.title} className="p-6">
                                    <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)] w-fit">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
                                    <Link
                                        to={item.cta}
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                                    >
                                        Enquire about this service
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </GlassCard>
                            );
                        })}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <ScrollReveal>
                            <span className="section-kicker">Products</span>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                                Products and free tools visitors can explore right away
                            </h2>
                            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                                Alongside client services, HexaStack also ships real products. This helps the website
                                showcase working software, product thinking, and tools that bring more engagement than a
                                standard brochure site alone.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal className="lg:pb-1">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                View All Products
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </ScrollReveal>
                    </div>

                    {featuredBusinessProduct && (
                        <ScrollReveal className="mt-10">
                            <GlassCard className="overflow-hidden p-6 sm:p-8">
                                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                                    <div>
                                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                                            <Building2 className="h-3.5 w-3.5" />
                                            Featured product
                                        </div>
                                        <h3 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                                            {featuredBusinessProduct.title}
                                        </h3>
                                        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
                                            {featuredBusinessProduct.description}
                                        </p>
                                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                            {featuredBusinessProduct.isExternal ? (
                                                <a
                                                    href={featuredBusinessProduct.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                                                >
                                                    {featuredBusinessProduct.cta}
                                                    <ArrowRight className="h-4 w-4" />
                                                </a>
                                            ) : (
                                                <Link
                                                    to={featuredBusinessProduct.href}
                                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                                                >
                                                    {featuredBusinessProduct.cta}
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            )}
                                            <Link
                                                to="/products"
                                                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                            >
                                                Browse Products
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--secondary)]/45 p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                                            Why it matters on the site
                                        </p>
                                        <div className="mt-5 space-y-3">
                                            {[
                                                'Shows visitors that HexaStack builds working software, not just service pages.',
                                                'Gives prospects a product-led example they can explore before contacting the team.',
                                                'Supports trust, credibility, and stronger enquiry quality for business software projects.',
                                            ].map((item) => (
                                                <div key={item} className="flex items-start gap-3 text-sm leading-7 text-[var(--muted-foreground)]">
                                                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--primary)]" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </ScrollReveal>
                    )}

                    {secondaryProductCards.length > 0 && (
                        <ScrollRevealStagger className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {secondaryProductCards.map((product) => {
                                const action = product.isExternal ? (
                                    <a
                                        href={product.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                                    >
                                        {product.cta}
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <Link to={product.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                                        {product.cta}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                );

                                return (
                                    <GlassCard key={`${product.badge}-${product.title}`} className="p-6">
                                        <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                                            {product.badge}
                                        </span>
                                        <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{product.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{product.description}</p>
                                        {action}
                                    </GlassCard>
                                );
                            })}
                        </ScrollRevealStagger>
                    )}
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">Reach and enquiries</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            A strong website needs more than design alone
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                            To bring more reach and better enquiries, the site needs clean keywords, stronger hierarchy,
                            better trust signals, simpler contact paths, and pages that match local as well as
                            international search intent. That is the mindset behind how we design and build.
                        </p>
                    </ScrollReveal>
                    <ScrollRevealStagger className="mt-10 grid gap-6 md:grid-cols-3">
                        {growthHighlights.map((item) => {
                            const Icon = item.icon;
                            return (
                                <GlassCard key={item.title} className="p-6">
                                    <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)] w-fit">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
                                </GlassCard>
                            );
                        })}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">Markets we support</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Regional visibility for Kerala, and broader reach for national and US enquiries
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                            The website now supports search paths for Kerala discovery, broader international service
                            intent, and stronger enquiry routes for businesses that need a reliable software partner.
                        </p>
                    </ScrollReveal>
                    <ScrollRevealStagger className="mt-10 grid gap-6 md:grid-cols-3">
                        {marketCoverage.map((market) => (
                            <GlassCard key={market.title} className="p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                                    Market coverage
                                </p>
                                <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{market.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{market.description}</p>
                                <Link to={market.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                                    {market.cta}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <ScrollReveal>
                            <span className="section-kicker">Industries</span>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                                Practical work for growing businesses
                            </h2>
                            <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
                                We are most useful when the business wants something clear, professional, and easier to
                                operate than the current patchwork of tools.
                            </p>
                            <Link
                                to="/about"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                            >
                                Learn how we work
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </ScrollReveal>
                        <ScrollRevealStagger className="grid gap-5 md:grid-cols-2">
                            {industries.map((item) => (
                                <GlassCard key={item.title} className="p-6">
                                    <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
                                </GlassCard>
                            ))}
                        </ScrollRevealStagger>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">Process</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            A professional build process from first call to launch
                        </h2>
                    </ScrollReveal>
                    <ScrollRevealStagger className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {processSteps.map((item) => (
                            <GlassCard key={item.step} className="p-6">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)] text-sm font-bold text-[var(--primary)]">
                                    {item.step}
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="border-b border-[var(--border)] py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">FAQs</span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Common questions before starting a project
                        </h2>
                    </ScrollReveal>
                    <ScrollRevealStagger className="mt-10 grid gap-6 md:grid-cols-2">
                        {faqs.map((item) => (
                            <GlassCard key={item.question} className="p-6">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.question}</h3>
                                        <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.answer}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="surface-panel rounded-[32px] px-6 py-10 text-center sm:px-10 md:py-12">
                            <span className="section-kicker justify-center">Start here</span>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                                Need a more professional website, stronger SEO, or better software for your business?
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
                                Tell us what you want to improve. We can help with business websites, service pages,
                                custom software, POS, billing platforms, and automation that supports more enquiries
                                and smoother day-to-day operations across Kerala, India, the United States, and the UAE.
                            </p>
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                                >
                                    Send an Enquiry
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a
                                    href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20discuss%20a%20website%20or%20software%20project."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    WhatsApp the Team
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
}
