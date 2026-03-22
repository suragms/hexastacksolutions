import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, LogOut, Mail, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { API_URL } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface CompanySettings {
    logoUrl?: string | null;
    primaryWhatsApp?: string;
    secondaryWhatsApp?: string | null;
    primaryEmail?: string;
    supportEmail?: string | null;
    address?: string | null;
}

interface LayoutProps {
    children: React.ReactNode;
}

interface ProductLink {
    to: string;
    label: string;
    isExternal?: boolean;
}

const defaultBusinessSoftwareLinks: ProductLink[] = [
    { to: '/products/hexabill', label: 'HexaBill' },
];

const defaultFreeToolsLinks: ProductLink[] = [
    { to: 'https://www.hexacv.online/', label: 'HexaCV', isExternal: true },
    { to: 'https://www.hexacv.online/free-tools', label: 'Hexa AI Tool Suite', isExternal: true },
    { to: 'https://studentshub-gold.vercel.app/', label: 'Student Tools', isExternal: true },
];

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const { user, logout } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [settings, setSettings] = useState<CompanySettings | null>(null);
    const [businessSoftwareLinks, setBusinessSoftwareLinks] = useState<ProductLink[]>(defaultBusinessSoftwareLinks);
    const [freeToolsLinks, setFreeToolsLinks] = useState<ProductLink[]>(defaultFreeToolsLinks);

    useEffect(() => {
        fetch(`${API_URL}/api/settings`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => data && setSettings(data))
            .catch(() => { });
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data: { name: string; link?: string | null; category?: string | null; displayOrder?: number }[]) => {
                if (!Array.isArray(data) || data.length === 0) {
                    return;
                }

                const business = data
                    .filter((product) => product.category === 'business')
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
                const free = data
                    .filter((product) => product.category === 'free')
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

                if (business.length > 0) {
                    setBusinessSoftwareLinks(
                        business.map((product) => ({
                            to: product.link || `/products/${product.name.toLowerCase().replace(/\s+/g, '')}`,
                            label: product.name,
                            isExternal: Boolean(product.link?.startsWith('http')),
                        }))
                    );
                }

                if (free.length > 0) {
                    setFreeToolsLinks(
                        free.map((product) => ({
                            to: product.link || '#',
                            label: product.name,
                            isExternal: true,
                        }))
                    );
                }
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            return;
        }

        const scrollY = document.body.style.top ? Math.abs(parseInt(document.body.style.top, 10)) : 0;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        if (scrollY) {
            window.scrollTo(0, scrollY);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 24);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoUrl = settings?.logoUrl || '/logo-dark.svg';
    const primaryEmail = settings?.primaryEmail || 'hexastacksolutions@gmail.com';
    const supportEmail = settings?.supportEmail || primaryEmail;
    const address = settings?.address || 'Vadanappally, Thrissur, Kerala 680614, India';
    const primaryPhone = settings?.primaryWhatsApp || '+917591999365';
    const secondaryPhone = settings?.secondaryWhatsApp || '+917012714150';
    const serviceAreaText = 'Serving Kerala, India, the United States and the UAE';
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/services', label: 'Services' },
        { to: '/products', label: 'Products' },
        { to: '/portfolio', label: 'Work' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/blog', label: 'Blog' },
    ];

    const whatsappNumbers = [
        { number: primaryPhone, label: 'Primary' },
        ...(secondaryPhone ? [{ number: secondaryPhone, label: 'Secondary' }] : []),
    ];

    const normalizePhoneForLink = (value: string) => value.replace(/[^+\d]/g, '');
    const normalizePhoneForWhatsApp = (value: string) => value.replace(/\D/g, '');
    const isActiveLink = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

    const renderProductLink = (link: ProductLink, className: string) => {
        if (link.isExternal) {
            return (
                <a
                    key={`${link.label}-${link.to}`}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                >
                    <span>{link.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
            );
        }

        return (
            <Link key={`${link.label}-${link.to}`} to={link.to} className={className}>
                {link.label}
            </Link>
        );
    };

    const headerClass = [
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled
            ? 'border-[var(--border)] bg-white/94 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl'
            : 'border-[var(--border)]/70 bg-white/90 backdrop-blur-xl',
    ].join(' ');

    return (
        <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
            <div
                aria-hidden
                className="fixed inset-x-0 top-0 z-[60] h-[2px]"
                style={{ background: 'linear-gradient(90deg, #0f172a 0%, #2563eb 45%, #06b6d4 100%)' }}
            />

            <header className={headerClass}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="hidden xl:flex items-center justify-between gap-6 border-b border-[var(--border)]/70 py-3 text-xs text-[var(--muted-foreground)]">
                        <div className="flex items-center gap-5">
                            <span className="inline-flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" />
                                Thrissur, Kerala
                            </span>
                            <a
                                href={`mailto:${primaryEmail}`}
                                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
                            >
                                <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
                                {primaryEmail}
                            </a>
                        </div>
                        <div className="flex items-center gap-5">
                            <a
                                href={`tel:${normalizePhoneForLink(primaryPhone)}`}
                                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
                            >
                                <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
                                {primaryPhone}
                            </a>
                            <span>{serviceAreaText}</span>
                        </div>
                    </div>

                    <nav className="flex items-center justify-between gap-4 py-3 xl:py-4">
                        <Link to="/" className="group flex min-w-0 items-center gap-3">
                            <img
                                src={logoUrl}
                                alt="HexaStack Solutions"
                                className="h-10 w-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold uppercase tracking-[0.22em] text-[var(--foreground)] sm:text-[15px]">
                                    HexaStack Solutions
                                </p>
                                <p className="hidden text-xs text-[var(--muted-foreground)] sm:block">
                                    Websites, software, POS and AI automation
                                </p>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/80 px-2 py-1 shadow-sm">
                            {navLinks.map((link) => {
                                const active = isActiveLink(link.to);
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        aria-current={active ? 'page' : undefined}
                                        className={[
                                            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                                            active
                                                ? 'bg-[var(--primary)] text-white shadow-sm'
                                                : 'text-[var(--foreground)]/80 hover:text-[var(--primary)]',
                                        ].join(' ')}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            {user && (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="rounded-full px-4 py-2 text-sm font-medium text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <a
                                href={`tel:${normalizePhoneForLink(primaryPhone)}`}
                                className="hidden xl:inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <Phone className="h-4 w-4" />
                                Call us
                            </a>
                            <Link
                                to="/contact"
                                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition-transform hover:scale-[1.02]"
                            >
                                Start a Project
                            </Link>
                            <button
                                type="button"
                                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[var(--border)] bg-white px-3 text-[var(--foreground)] shadow-sm transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] lg:hidden"
                                onClick={() => setIsMenuOpen((open) => !open)}
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.aside
                            id="mobile-menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-sm flex-col overflow-y-auto border-l border-[var(--border)] bg-white shadow-2xl lg:hidden"
                            aria-label="Mobile menu"
                        >
                            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                                <div>
                                    <p className="text-sm font-semibold text-[var(--foreground)]">Navigation</p>
                                    <p className="text-xs text-[var(--muted-foreground)]">{serviceAreaText}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--foreground)]"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-8 px-5 py-5">
                                <div className="space-y-2">
                                    {navLinks.map((link) => {
                                        const active = isActiveLink(link.to);
                                        return (
                                            <Link
                                                key={link.to}
                                                to={link.to}
                                                className={[
                                                    'flex min-h-[48px] items-center rounded-2xl px-4 text-base font-medium transition-colors',
                                                    active
                                                        ? 'bg-[var(--primary)] text-white'
                                                        : 'bg-[var(--muted)]/60 text-[var(--foreground)] hover:bg-[var(--secondary)]',
                                                ].join(' ')}
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                    {user && (
                                        <>
                                            <Link
                                                to="/dashboard"
                                                className="flex min-h-[48px] items-center rounded-2xl bg-[var(--muted)]/60 px-4 text-base font-medium text-[var(--foreground)]"
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    logout();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="flex min-h-[48px] w-full items-center rounded-2xl bg-[var(--muted)]/60 px-4 text-left text-base font-medium text-[var(--foreground)]"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                                        Business software
                                    </p>
                                    <div className="space-y-2">
                                        {businessSoftwareLinks.map((link) =>
                                            renderProductLink(
                                                link,
                                                'flex min-h-[48px] items-center justify-between rounded-2xl border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)]'
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                                        Free tools
                                    </p>
                                    <div className="space-y-2">
                                        {freeToolsLinks.map((link) =>
                                            renderProductLink(
                                                link,
                                                'flex min-h-[48px] items-center justify-between rounded-2xl border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)]'
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-[var(--border)] bg-[var(--secondary)]/40 p-5">
                                    <p className="text-sm font-semibold text-[var(--foreground)]">Talk directly to the team</p>
                                    <div className="mt-4 space-y-3">
                                        <a
                                            href={`tel:${normalizePhoneForLink(primaryPhone)}`}
                                            className="flex items-center gap-3 text-sm text-[var(--foreground)]"
                                        >
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            {primaryPhone}
                                        </a>
                                        <a
                                            href={`mailto:${primaryEmail}`}
                                            className="flex items-center gap-3 text-sm text-[var(--foreground)]"
                                        >
                                            <Mail className="h-4 w-4 text-[var(--primary)]" />
                                            {primaryEmail}
                                        </a>
                                        <Link
                                            to="/contact"
                                            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
                                        >
                                            Start a Project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="h-[79px] sm:h-[83px] xl:h-[127px]" aria-hidden />

            <main className="min-w-0 flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="min-w-0"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer
                className="border-t border-[var(--border)] bg-white/90 backdrop-blur-sm"
                role="contentinfo"
                data-deploy-version="2026-03-22"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-8 lg:py-16">
                        <div className="md:col-span-5">
                            <Link to="/" className="inline-flex items-center gap-3">
                                <img src={logoUrl} alt="HexaStack Solutions" className="h-10 w-10 object-contain" />
                                <span className="text-base font-bold uppercase tracking-[0.16em] text-[var(--foreground)]">
                                    HexaStack Solutions
                                </span>
                            </Link>
                            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted-foreground)]">
                                HexaStack Solutions is a software development company in Thrissur, Kerala building
                                professional websites, custom business software, billing systems, POS platforms and AI
                                automation for growing companies across Kerala, India, the United States, and the UAE.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href="https://www.linkedin.com/company/hexastack-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgRPeQwUCSyGi54I4m7rNLw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    LinkedIn
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                                <a
                                    href="https://share.google/cnsKSTykx8sjMzNxC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    Google Profile
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                                Navigation
                            </h2>
                            <div className="mt-4 space-y-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className="block text-sm text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    to="/kerala"
                                    className="block text-sm text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]"
                                >
                                    Kerala
                                </Link>
                                <Link
                                    to="/united-states"
                                    className="block text-sm text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]"
                                >
                                    United States
                                </Link>
                                <Link
                                    to="/gulf-vat"
                                    className="block text-sm text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]"
                                >
                                    Gulf VAT
                                </Link>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                                Products
                            </h2>
                            <div className="mt-4 space-y-3">
                                {businessSoftwareLinks.map((link) =>
                                    renderProductLink(
                                        link,
                                        'flex items-center gap-2 text-sm text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]'
                                    )
                                )}
                                {freeToolsLinks.map((link) =>
                                    renderProductLink(
                                        link,
                                        'flex items-center gap-2 text-sm text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]'
                                    )
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                                Contact
                            </h2>
                            <div className="mt-4 space-y-4 text-sm text-[var(--foreground)]/85">
                                <p className="font-semibold text-[var(--foreground)]">HexaStack Solutions</p>
                                <p className="leading-7 text-[var(--muted-foreground)]">{address}</p>
                                <p className="text-[var(--muted-foreground)]">{serviceAreaText}</p>
                                <a
                                    href={`tel:${normalizePhoneForLink(primaryPhone)}`}
                                    className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
                                >
                                    <Phone className="h-4 w-4 text-[var(--primary)]" />
                                    {primaryPhone}
                                </a>
                                {secondaryPhone && (
                                    <a
                                        href={`tel:${normalizePhoneForLink(secondaryPhone)}`}
                                        className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
                                    >
                                        <Phone className="h-4 w-4 text-[var(--primary)]" />
                                        {secondaryPhone}
                                    </a>
                                )}
                                <div className="space-y-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                                        Primary email
                                    </p>
                                    <a
                                        href={`mailto:${primaryEmail}`}
                                        className="flex items-center gap-2 break-all transition-colors hover:text-[var(--primary)]"
                                    >
                                        <Mail className="h-4 w-4 text-[var(--primary)]" />
                                        {primaryEmail}
                                    </a>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                                        Support email
                                    </p>
                                    <a
                                        href={`mailto:${supportEmail}`}
                                        className="flex items-center gap-2 break-all transition-colors hover:text-[var(--primary)]"
                                    >
                                        <Mail className="h-4 w-4 text-[var(--primary)]" />
                                        {supportEmail}
                                    </a>
                                </div>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)]"
                                >
                                    Request a Quote
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-[var(--border)] py-5 text-xs text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
                        <p>© {new Date().getFullYear()} HexaStack Solutions. All rights reserved.</p>
                        <div className="flex flex-wrap gap-5">
                            <Link to="/privacy" className="transition-colors hover:text-[var(--primary)]">
                                Privacy
                            </Link>
                            <Link to="/terms" className="transition-colors hover:text-[var(--primary)]">
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>

            {whatsappNumbers.length > 0 && (
                <a
                    href={`https://wa.me/${normalizePhoneForWhatsApp(whatsappNumbers[0].number)}?text=${encodeURIComponent('Hi HexaStack, I would like to discuss a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.38)] transition-transform hover:scale-105"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle className="h-6 w-6" />
                </a>
            )}
        </div>
    );
}
