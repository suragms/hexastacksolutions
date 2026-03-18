import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown, Menu, X, MessageCircle, LogOut, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompanySettings {
    logoUrl?: string | null;
    primaryWhatsApp?: string;
    secondaryWhatsApp?: string | null;
    primaryEmail?: string;
    address?: string | null;
}

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [settings, setSettings] = useState<CompanySettings | null>(null);
    const [businessSoftwareLinks, setBusinessSoftwareLinks] = useState<{ to: string; label: string; isExternal?: boolean }[]>([{ to: '/products/hexabill', label: 'HexaBill' }]);
    const [freeToolsLinks, setFreeToolsLinks] = useState<{ to: string; label: string; isExternal?: boolean }[]>([
        { to: 'https://www.hexacv.online/', label: 'HexaCV', isExternal: true },
        { to: 'https://www.hexacv.online/free-tools', label: 'Hexa AI Tool Suite', isExternal: true },
        { to: 'https://studentshub-gold.vercel.app/', label: 'Student Tools', isExternal: true },
    ]);

    const [scrolled, setScrolled] = useState(false);

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
                if (!Array.isArray(data) || data.length === 0) return;
                const business = data.filter((p) => p.category === 'business').sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
                const free = data.filter((p) => p.category === 'free').sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
                if (business.length > 0) setBusinessSoftwareLinks(business.map((p) => ({ to: p.link || `/products/${p.name.toLowerCase().replace(/\s+/g, '')}`, label: p.name, isExternal: !!p.link?.startsWith('http') })));
                if (free.length > 0) setFreeToolsLinks(free.map((p) => ({ to: p.link || '#', label: p.name, isExternal: true })));
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
        } else {
            const scrollY = document.body.style.top ? Math.abs(parseInt(document.body.style.top, 10)) : 0;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            if (scrollY) window.scrollTo(0, scrollY);
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const logoUrl = '/logo-dark-new.png'; /* Dark logo for white/blue theme */
    const whatsappNumbers = [
        ...(settings?.primaryWhatsApp ? [{ number: settings.primaryWhatsApp, label: 'Line 1' }] : []),
        ...(settings?.secondaryWhatsApp ? [{ number: settings.secondaryWhatsApp, label: 'Line 2' }] : []),
    ];
    if (whatsappNumbers.length === 0) {
        whatsappNumbers.push({ number: '+917591999365', label: 'Line 1' }, { number: '+917012714150', label: 'Line 2' });
    }

    const primaryPhone = settings?.primaryWhatsApp || '+917591999365';
    const secondaryPhone = settings?.secondaryWhatsApp || '+917012714150';
    /** Public contact email for footer and mailto links. */
    const email = 'supporthexastack@hexastacksolutions.com';
    const address = settings?.address || 'Vadanappally, Thrissur, Kerala 680614, India';
    const serviceAreaText = 'Serving clients across Kerala, India and UAE';

    const navLinks = [
        { to: '/services', label: 'Services' },
        { to: '/portfolio', label: 'Portfolio' },
        { to: '/about', label: 'About' },
        { to: '/blog', label: 'Blog' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClass = [
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 sm:py-5 pt-[calc(1rem+env(safe-area-inset-top))] pb-5",
        scrolled
            ? "bg-[var(--background)]/98 border-b border-[var(--border)]/70 backdrop-blur-md shadow-sm"
            : "lg:bg-transparent bg-[var(--background)]/95 border-b border-[var(--border)]/30 lg:border-b-0",
    ].join(" ");

    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans antialiased overflow-x-hidden">
            {/* Blue accent line at top */}
            <div style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg,#1E40AF,#3B82F6,#1E40AF)' }} aria-hidden />
            {/* Header - mobile: solid bar with menu; desktop: transparent */}
            <header className={headerClass}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border">
                    <nav className="flex items-center justify-between gap-3 min-h-[44px] sm:min-h-0 w-full">
                        <Link to="/" className="relative z-10 flex items-center gap-2 sm:gap-2.5 group min-h-[44px] min-w-0 flex-shrink overflow-hidden">
                            <img src={logoUrl} alt="HEXASTACK" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain transition-all duration-300 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300 hidden sm:block max-w-[160px] md:max-w-none truncate">
                                HEXASTACK SOLUTIONS
                            </span>
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.1em] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300 sm:hidden truncate">
                                HEXASTACK
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] ${location.pathname === link.to ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/80'}`}
                                >
                                    {link.label}
                                    {location.pathname === link.to && (
                                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--primary)] rounded-full" />
                                    )}
                                </Link>
                            ))}
                            <a href="tel:+917591999365" className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] text-[var(--foreground)]/80 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5" /> Call: +91 75919 99365
                            </a>
                            {user && (
                                <>
                                    <Link to="/dashboard" className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] text-[var(--foreground)]/80">Dashboard</Link>
                                    <button type="button" onClick={logout} className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] text-[var(--foreground)]/80 flex items-center gap-1">
                                        <LogOut className="w-3.5 h-3.5" /> Logout
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Right: Get Quote (desktop) + Menu button (mobile/tablet) - always visible */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <Link to="/contact" className="items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_4px_14px_rgba(26,115,232,0.25)] hover:opacity-90 hover:scale-105 min-h-[44px] h-11 px-4 sm:px-6 py-2 hidden lg:inline-flex">
                                Get Quote
                            </Link>
                            <button
                                type="button"
                                className="flex lg:hidden items-center gap-2 min-h-[44px] py-2 pl-3 pr-4 rounded-xl border-2 border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8] font-semibold text-sm hover:bg-[#d2e3fc] active:bg-[#c2d9fa] active:scale-[0.98] transition-colors shadow-sm touch-manipulation cursor-pointer select-none"
                                style={{ minWidth: 'max-content', WebkitTapHighlightColor: 'transparent' }}
                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen((prev) => !prev); }}
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu-drawer"
                            >
                                {isMenuOpen ? <X className="w-5 h-5 shrink-0" aria-hidden /> : <Menu className="w-5 h-5 shrink-0" aria-hidden />}
                                <span className="inline">Menu</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile menu: rendered outside header so z-index stacks above everything */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm cursor-pointer touch-none lg:hidden"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                            onClick={() => setIsMenuOpen(false)}
                            aria-hidden
                        />
                        <motion.div
                            id="mobile-menu-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed top-0 right-0 bottom-0 z-[9999] w-full max-w-[min(100%,320px)] overflow-y-auto overflow-x-hidden bg-[var(--background)] shadow-2xl flex flex-col lg:hidden"
                            style={{ maxHeight: '100dvh', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Main menu"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border)] flex-shrink-0">
                                <span className="text-sm font-semibold text-[var(--muted-foreground)]">Menu</span>
                                <button
                                    type="button"
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[var(--foreground)] hover:bg-[var(--muted)] active:bg-[var(--muted)] -mr-2 cursor-pointer touch-manipulation"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-1 min-h-0">
                                <Link to="/" className="min-h-[48px] flex items-center rounded-xl px-4 text-base font-medium py-3 transition-colors bg-[var(--muted)]/40 text-[var(--primary)]" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                <div className="grid gap-1 pt-2">
                                    {navLinks.map((link) => {
                                        const isActive = location.pathname === link.to;
                                        return (
                                            <Link key={link.to} to={link.to} className={`min-h-[48px] flex items-center rounded-xl px-4 text-base font-medium py-3 transition-colors ${isActive ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'text-[var(--foreground)] hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]'}`} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
                                        );
                                    })}
                                </div>
                                <div className="pt-6 pb-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] px-4 mb-2">Business Software</p>
                                    <div className="grid gap-1 mb-4">
                                        {businessSoftwareLinks.map((link) => (
                                            <Link key={link.to} to={link.to} className="min-h-[48px] flex items-center rounded-xl px-4 text-[15px] font-medium py-3 transition-colors text-[var(--foreground)]/90 hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
                                        ))}
                                    </div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] px-4 mb-2">Free Tools</p>
                                    <div className="grid gap-1">
                                        {freeToolsLinks.map((link) => (
                                            link.isExternal ? (
                                                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer" className="min-h-[48px] flex items-center rounded-xl px-4 text-[15px] font-medium py-3 transition-colors text-[var(--foreground)]/90 hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]" onClick={() => setIsMenuOpen(false)}>{link.label}</a>
                                            ) : (
                                                <Link key={link.to} to={link.to} className="min-h-[48px] flex items-center rounded-xl px-4 text-[15px] font-medium py-3 transition-colors text-[var(--foreground)]/90 hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 mt-auto border-t border-[var(--border)] space-y-1">
                                    <a href="tel:+917591999365" className="min-h-[48px] flex items-center gap-3 rounded-xl px-4 text-base font-medium py-3 transition-colors text-[var(--foreground)] hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]" onClick={() => setIsMenuOpen(false)}>
                                        <Phone className="w-5 h-5 text-[var(--primary)]" /> +91 75919 99365
                                    </a>
                                    {user && (
                                        <>
                                            <Link to="/dashboard" className="min-h-[48px] flex items-center rounded-xl px-4 text-base font-medium py-3 transition-colors text-[var(--foreground)] hover:bg-[var(--muted)]/60" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                                            <button type="button" onClick={() => { logout(); setIsMenuOpen(false); }} className="min-h-[48px] w-full flex items-center rounded-xl px-4 text-base font-medium py-3 transition-colors text-[var(--foreground)] hover:bg-[var(--muted)]/60 active:bg-[var(--muted)] text-left cursor-pointer">Logout</button>
                                        </>
                                    )}
                                    <Link to="/contact" className="min-h-[52px] mt-3 flex items-center justify-center font-semibold rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-[var(--primary)]/20" onClick={() => setIsMenuOpen(false)}>
                                        Get Quote
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {/* Spacer for fixed header */}
            <div className="h-[64px] sm:h-[72px] md:h-[80px] lg:h-[88px] flex-shrink-0" aria-hidden />

            <main className="flex-grow min-w-0 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="min-w-0 w-full"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer - data-deploy-version helps confirm latest build is live (Inspect Element) */}
            <footer className="border-t border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm" role="contentinfo" data-deploy-version="2025-03-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main footer grid */}
                    <div className="py-12 sm:py-14 md:py-16 lg:py-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10 sm:gap-y-12 md:gap-x-10 lg:gap-x-12">
                        {/* Brand column - full width on mobile (row 1), 5 cols on md+ */}
                        <div className="col-span-2 md:col-span-5">
                            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
                                <img src={logoUrl} alt="HexaStack Solutions" className="h-9 w-9 sm:h-10 sm:w-10 object-contain" />
                                <span className="text-base sm:text-lg font-bold uppercase tracking-[0.12em] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                    HexaStack Solutions
                                </span>
                            </Link>
                            <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-md leading-relaxed mb-6">
                                Custom software, POS, billing & AI tools from Thrissur. Kerala & Gulf — you talk directly to the team. Reply in 2 hours.
                            </p>
                            <div className="flex flex-col gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Follow</span>
                                <div className="flex flex-wrap items-center gap-3">
                                    <a
                                        href="https://www.linkedin.com/company/hexastack-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgRPeQwUCSyGi54I4m7rNLw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors w-fit"
                                    >
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--muted)]/60 hover:bg-[var(--primary)]/10 transition-colors">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </span>
                                        LinkedIn
                                    </a>
                                    <a
                                        href="https://share.google/cnsKSTykx8sjMzNxC"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors w-fit"
                                    >
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--muted)]/60 hover:bg-[var(--primary)]/10 transition-colors">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </span>
                                        Google
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Company / Explore */}
                        <div className="md:col-span-2">
                            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground)] mb-4">Company</h4>
                            <nav aria-label="Footer company links">
                                <ul className="space-y-2.5">
                                    {navLinks.map((link) => (
                                        <li key={link.to}>
                                            <Link to={link.to} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li><Link to="/kerala" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Kerala</Link></li>
                                    <li><Link to="/gulf-vat" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Gulf VAT</Link></li>
                                </ul>
                            </nav>
                        </div>

                        {/* Products */}
                        <div className="md:col-span-2">
                            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground)] mb-4">Products</h4>
                            <nav aria-label="Footer products">
                                <ul className="space-y-2.5">
                                    {[...businessSoftwareLinks, ...freeToolsLinks].map((link) => (
                                        <li key={link.label}>
                                            {link.isExternal ? (
                                                <a href={link.to} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                    {link.label}
                                                    <ExternalLink className="w-3 h-3 opacity-60" />
                                                </a>
                                            ) : (
                                                <Link to={link.to} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Contact - full address & clickable phone for Google / citations */}
                        <div className="col-span-2 md:col-span-3">
                            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground)] mb-4">Contact</h4>
                            <p className="text-sm font-semibold text-[var(--foreground)] mb-1">HexaStack Solutions</p>
                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-2">
                                Vadanappally, Thrissur<br />
                                Kerala 680614<br />
                                India
                            </p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-3">{serviceAreaText}</p>
                            <ul className="space-y-3">
                                <li>
                                    <span className="text-sm text-[var(--muted-foreground)]">Call / WhatsApp: </span>
                                    <a href="tel:+917591999365" className="text-sm font-medium text-[var(--primary)] hover:underline">+91 75919 99365</a>
                                </li>
                                <li>
                                    <a href={`mailto:${email}`} className="inline-flex items-start gap-3 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group">
                                        <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                        <span className="break-all">{email}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wa.me/917591999365" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group">
                                        <MessageCircle className="w-4 h-4 flex-shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                        Call / WhatsApp: +91 75919 99365
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wa.me/917012714150" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group">
                                        <MessageCircle className="w-4 h-4 flex-shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                        Call / WhatsApp: +91 70127 14150
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="py-5 sm:py-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[var(--muted-foreground)] order-2 sm:order-1">
                            © {new Date().getFullYear()} HexaStack Solutions. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-end gap-6 sm:gap-8 order-1 sm:order-2">
                            <Link to="/privacy" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                Terms
                            </Link>
                            <a href="https://www.linkedin.com/company/hexastack-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgRPeQwUCSyGi54I4m7rNLw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp - WhatsApp green, pulse */}
            {whatsappNumbers.length > 0 && (
                <a
                    href={`https://wa.me/${whatsappNumbers[0].number.replace(/\D/g, '')}?text=${encodeURIComponent('Hi HexaStack! I found your website and I need help with a software project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20BA5A] transition-colors animate-pulse"
                    style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))', right: 'max(1.5rem, env(safe-area-inset-right))' }}
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                </a>
            )}
        </div>
    );
}

