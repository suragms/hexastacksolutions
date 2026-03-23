import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Mail, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WebsiteNotifications from '@/components/WebsiteNotifications';

interface LayoutProps {
    children: React.ReactNode;
}

const COMPANY_NAME = 'HexaStack Solutions';
const PRIMARY_PHONE = '+91 75919 99365';
const PRIMARY_PHONE_LINK = '+917591999365';
const FOOTER_PRIMARY_PHONE = '+917591999365';
const SECONDARY_PHONE = '+917012714150';
const PRIMARY_EMAIL = 'hexastacksolutions@gmail.com';
const SUPPORT_EMAIL = 'supporthexastack@hexastacksolutions.com';
const ADDRESS = 'Vadanappally, Thrissur, Kerala 680614, India';
const SERVICE_AREA_TEXT = 'Serving Kerala, India, the United States and the UAE';
const LOGO_URL = '/logo-dark.svg';
const TAGLINE = 'Websites, POS, billing, and custom software for Kerala and Gulf businesses.';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/products', label: 'Products' },
    { to: '/work', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
];

const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/products', label: 'Products' },
    { to: '/work', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/blog', label: 'Blog' },
];

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    useEffect(() => {
        setMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 18);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const headerClass = useMemo(
        () =>
            [
                'fixed inset-x-0 top-0 z-50 border-b transition-all duration-200',
                scrolled
                    ? 'border-[var(--border)] bg-white/96 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl'
                    : 'border-[var(--border)] bg-white/92 backdrop-blur-xl',
            ].join(' '),
        [scrolled]
    );

    const isActive = (to: string) => {
        if (to === '/work') {
            return location.pathname === '/work' || location.pathname === '/portfolio';
        }
        return to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
            <header className={headerClass}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="hidden items-center justify-between border-b border-[var(--border)]/70 py-3 text-xs text-[var(--muted-foreground)] lg:flex">
                        <div className="flex items-center gap-5">
                            <a href={`tel:${PRIMARY_PHONE_LINK}`} className="inline-flex items-center gap-2 hover:text-[var(--primary)]">
                                <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
                                {PRIMARY_PHONE}
                            </a>
                            <a href={`mailto:${PRIMARY_EMAIL}`} className="inline-flex items-center gap-2 hover:text-[var(--primary)]">
                                <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
                                {PRIMARY_EMAIL}
                            </a>
                        </div>
                        <p>{ADDRESS}</p>
                    </div>

                    <nav className="flex items-center justify-between gap-4 py-3 lg:py-4">
                        <Link to="/" className="flex min-w-0 items-center gap-3">
                            <img src={LOGO_URL} alt={COMPANY_NAME} className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold uppercase tracking-[0.18em] text-[var(--foreground)] sm:text-[15px]">
                                    {COMPANY_NAME}
                                </p>
                                <p className="hidden text-xs text-[var(--muted-foreground)] sm:block">{TAGLINE}</p>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-white/80 p-1 shadow-sm lg:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={[
                                        'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                                        isActive(link.to) ? 'bg-[var(--primary)] text-white' : 'text-[var(--foreground)]/80 hover:text-[var(--primary)]',
                                    ].join(' ')}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user && (
                                <Link
                                    to="/dashboard"
                                    className="rounded-full px-4 py-2 text-sm font-medium text-[var(--foreground)]/80 transition-colors hover:text-[var(--primary)]"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <a
                                href={`tel:${PRIMARY_PHONE_LINK}`}
                                className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] xl:inline-flex"
                            >
                                <Phone className="h-4 w-4" />
                                Call us
                            </a>
                            <Link
                                to="/contact"
                                className="hidden items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] hover:opacity-95 sm:inline-flex"
                            >
                                Contact
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMenuOpen((open) => !open)}
                                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[var(--border)] bg-white px-3 text-[var(--foreground)] shadow-sm lg:hidden"
                                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={menuOpen}
                            >
                                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-sm lg:hidden"
                            onClick={() => setMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.2 }}
                            className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-sm flex-col border-l border-[var(--border)] bg-white shadow-2xl lg:hidden"
                        >
                            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                                <div>
                                    <p className="text-sm font-semibold text-[var(--foreground)]">Menu</p>
                                    <p className="text-xs text-[var(--muted-foreground)]">Call or WhatsApp the team directly.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(false)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--foreground)]"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4 px-5 py-5">
                                {[...navLinks, { to: '/contact', label: 'Contact' }].map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={[
                                            'flex min-h-[48px] items-center rounded-2xl px-4 text-base font-medium transition-colors',
                                            isActive(link.to) ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)]/60 text-[var(--foreground)]',
                                        ].join(' ')}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {user && (
                                    <>
                                        <Link to="/dashboard" className="flex min-h-[48px] items-center rounded-2xl bg-[var(--muted)]/60 px-4 text-base font-medium text-[var(--foreground)]">
                                            Dashboard
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                logout();
                                                setMenuOpen(false);
                                            }}
                                            className="flex min-h-[48px] w-full items-center rounded-2xl bg-[var(--muted)]/60 px-4 text-left text-base font-medium text-[var(--foreground)]"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="mt-auto border-t border-[var(--border)] px-5 py-5">
                                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--secondary)]/40 p-5">
                                    <p className="text-sm font-semibold text-[var(--foreground)]">Talk to HexaStack</p>
                                    <div className="mt-4 space-y-3 text-sm text-[var(--foreground)]">
                                        <a href={`tel:${PRIMARY_PHONE_LINK}`} className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            {PRIMARY_PHONE}
                                        </a>
                                        <a href={`mailto:${PRIMARY_EMAIL}`} className="flex items-center gap-3 break-all">
                                            <Mail className="h-4 w-4 text-[var(--primary)]" />
                                            {PRIMARY_EMAIL}
                                        </a>
                                        <p className="flex items-start gap-3 text-[var(--muted-foreground)]">
                                            <MapPin className="mt-0.5 h-4 w-4 text-[var(--primary)]" />
                                            <span>{ADDRESS}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="h-[77px] sm:h-[81px] lg:h-[121px]" aria-hidden />

            <WebsiteNotifications />

            <main>{children}</main>

            <footer className="border-t border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.7fr)_minmax(0,0.95fr)] lg:gap-12">
                        <div className="space-y-5">
                            <Link to="/" className="inline-flex items-center gap-3">
                                <img src={LOGO_URL} alt={COMPANY_NAME} className="h-11 w-11 object-contain" />
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--foreground)]">{COMPANY_NAME}</p>
                                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">{TAGLINE}</p>
                                </div>
                            </Link>

                            <div className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-[var(--foreground)]">{COMPANY_NAME}</p>
                                        <p className="text-sm leading-7 text-[var(--muted-foreground)]">{ADDRESS}</p>
                                        <p className="text-sm leading-7 text-[var(--muted-foreground)]">{SERVICE_AREA_TEXT}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Quick Links</p>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {footerLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className="text-sm font-medium text-[var(--foreground)]/85 transition-colors hover:text-[var(--primary)]"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Contact</p>
                            <div className="space-y-4">
                                <div className="rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Phone</p>
                                    <div className="mt-3 space-y-2">
                                        <a href={`tel:${PRIMARY_PHONE_LINK}`} className="flex items-center gap-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            {FOOTER_PRIMARY_PHONE}
                                        </a>
                                        <a href={`tel:${SECONDARY_PHONE}`} className="flex items-center gap-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            {SECONDARY_PHONE}
                                        </a>
                                        <a
                                            href={`https://wa.me/${PRIMARY_PHONE_LINK.replace('+', '')}?text=${encodeURIComponent('Hi HexaStack, I need help with a project.')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)]/35 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                        >
                                            <MessageCircle className="h-4 w-4 text-[var(--primary)]" />
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>

                                <div className="rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Email</p>
                                    <div className="mt-3 space-y-4">
                                        <div>
                                            <p className="text-xs font-medium text-[var(--muted-foreground)]">Primary email</p>
                                            <a href={`mailto:${PRIMARY_EMAIL}`} className="mt-1 flex items-start gap-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
                                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                                                <span className="break-all">{PRIMARY_EMAIL}</span>
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-[var(--muted-foreground)]">Support email</p>
                                            <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-1 flex items-start gap-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
                                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                                                <span className="break-all">{SUPPORT_EMAIL}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-4">
                            <Link to="/privacy" className="transition-colors hover:text-[var(--primary)]">Privacy</Link>
                            <Link to="/terms" className="transition-colors hover:text-[var(--primary)]">Terms</Link>
                        </div>
                        <span>Copyright {new Date().getFullYear()} {COMPANY_NAME}</span>
                    </div>
                </div>
            </footer>

            <a
                href={`https://wa.me/${PRIMARY_PHONE_LINK.replace('+', '')}?text=${encodeURIComponent('Hi HexaStack, I would like to discuss a project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.38)] transition-transform hover:scale-105"
                aria-label="Chat on WhatsApp"
                title="We reply within 2 hours on WhatsApp."
            >
                <MessageCircle className="h-6 w-6" />
            </a>
        </div>
    );
}
