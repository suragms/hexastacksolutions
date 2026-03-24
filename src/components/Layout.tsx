import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Mail, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

const COMPANY_NAME = 'HexaStack Solutions';
const PRIMARY_PHONE = '+91-75919-99365';
const PRIMARY_PHONE_LINK = '+917591999365';
const FOOTER_PRIMARY_PHONE = '+917591999365';
const SECONDARY_PHONE = '+917012714150';
const PRIMARY_EMAIL = 'hexastacksolutions@gmail.com';
const SUPPORT_EMAIL = 'supporthexastack@hexastacksolutions.com';
const ADDRESS = 'Vadanappally, Thrissur, Kerala 680614, India';
const SERVICE_AREA_TEXT = 'Serving Kerala, India, and the Gulf region (UAE and GCC)';
const LOGO_URL = '/logo-dark.svg';
const TAGLINE = 'Software for Kerala & Gulf';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/work', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/products', label: 'Products' },
    { to: '/work', label: 'Work' },
    { to: '/pricing', label: 'Pricing' },
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
        return to === '/' ? location.pathname === '/' : location.pathname === to || location.pathname.startsWith(`${to}/`);
    };

    const hideWhatsAppFab = ['/admin', '/login', '/register', '/dashboard'].some((p) => location.pathname === p || location.pathname.startsWith(`${p}/`));

    return (
        <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
            <header className={headerClass}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                                Get a Quote
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
                                {navLinks.map((link) => (
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

            <div className="h-[60px] sm:h-[64px] lg:h-[68px]" aria-hidden />

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

            {!hideWhatsAppFab && (
                <a
                    href={`https://wa.me/${PRIMARY_PHONE_LINK.replace('+', '')}?text=${encodeURIComponent('Hi HexaStack, I would like to discuss a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-[100] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.38)] transition-transform hover:scale-105 max-sm:animate-pulse sm:animate-none"
                    aria-label="Chat on WhatsApp"
                    title="We reply within 2 hours on WhatsApp."
                >
                    <span className="sr-only">Chat on WhatsApp</span>
                    <svg className="h-7 w-7" viewBox="0 0 24 24" aria-hidden="true" fill="#FFFFFF">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>
            )}
        </div>
    );
}
