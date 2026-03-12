import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown, Menu, X, MessageCircle, LogOut } from 'lucide-react';
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

    useEffect(() => {
        fetch(`${API_URL}/api/settings`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => data && setSettings(data))
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
    const email = settings?.primaryEmail || 'hexastack78@gmail.com';
    const address = settings?.address || 'Thrissur, Kerala';

    const navLinks = [
        { to: '/services', label: 'Services' },
        { to: '/work', label: 'Work' },
        { to: '/blog', label: 'Blog' },
        { to: '/solutions', label: 'Solutions' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    const productLinks = [
        { to: '/products/hexabill', label: 'HexaBill' },
        { to: 'https://www.hexacv.online/', label: 'HexaCV', isExternal: true },
        { to: 'https://www.hexacv.online/free-tools', label: 'Hexa AI Tool Suite', isExternal: true },
        { to: 'https://studentshub-gold.vercel.app/', label: 'Student Tools', isExternal: true },
    ];

    const headerClass = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 sm:py-5 pt-[calc(1rem+env(safe-area-inset-top))] pb-5 lg:bg-transparent bg-[var(--background)]/98 backdrop-blur-md border-b border-[var(--border)]/50 lg:border-b-0";

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
                            <Link
                                to="/"
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] ${location.pathname === '/' ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/80'}`}
                            >
                                Home
                                {location.pathname === '/' && (
                                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--primary)] rounded-full" />
                                )}
                            </Link>
                            <div
                                className="relative"
                                onMouseEnter={() => setProductsOpen(true)}
                                onMouseLeave={() => setProductsOpen(false)}
                            >
                                <button className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] flex items-center gap-1 text-[var(--foreground)]/80">
                                    Products
                                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {productsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute left-0 top-full pt-2 z-50"
                                        >
                                            <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-2xl p-4 min-w-[280px] max-w-[320px]">
                                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--border)]">
                                                    <span className="font-semibold text-sm text-[var(--foreground)]">Products</span>
                                                </div>
                                                <div className="space-y-1 max-h-[300px] overflow-y-auto">
                                                    {productLinks.map((link) => (
                                                        link.isExternal ? (
                                                            <a
                                                                key={link.to}
                                                                href={link.to}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]/50 px-2 py-1.5 rounded-md transition-all duration-200"
                                                                onClick={() => setProductsOpen(false)}
                                                            >
                                                                {link.label}
                                                            </a>
                                                        ) : (
                                                            <Link
                                                                key={link.to}
                                                                to={link.to}
                                                                className="flex items-center justify-between gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]/50 px-2 py-1.5 rounded-md transition-all duration-200"
                                                                onClick={() => setProductsOpen(false)}
                                                            >
                                                                {link.label}
                                                            </Link>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] ${isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/80'}`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--primary)] rounded-full" />
                                        )}
                                    </Link>
                                );
                            })}
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] text-[var(--foreground)]/80">Dashboard</Link>
                                    <button type="button" onClick={logout} className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] text-[var(--foreground)]/80 flex items-center gap-1">
                                        <LogOut className="w-3.5 h-3.5" /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[var(--primary)] text-[var(--foreground)]/80">
                                    Client Login
                                </Link>
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
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] px-4 mb-2">Products &amp; Tools</p>
                                    <div className="grid gap-1">
                                        {productLinks.map((link) => (
                                            link.isExternal ? (
                                                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer" className="min-h-[48px] flex items-center rounded-xl px-4 text-[15px] font-medium py-3 transition-colors text-[var(--foreground)]/90 hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]" onClick={() => setIsMenuOpen(false)}>{link.label}</a>
                                            ) : (
                                                <Link key={link.to} to={link.to} className="min-h-[48px] flex items-center rounded-xl px-4 text-[15px] font-medium py-3 transition-colors text-[var(--foreground)]/90 hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 mt-auto border-t border-[var(--border)] space-y-1">
                                    {user ? (
                                        <>
                                            <Link to="/dashboard" className="min-h-[48px] flex items-center rounded-xl px-4 text-base font-medium py-3 transition-colors text-[var(--foreground)] hover:bg-[var(--muted)]/60" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                                            <button type="button" onClick={() => { logout(); setIsMenuOpen(false); }} className="min-h-[48px] w-full flex items-center rounded-xl px-4 text-base font-medium py-3 transition-colors text-[var(--foreground)] hover:bg-[var(--muted)]/60 active:bg-[var(--muted)] text-left cursor-pointer">Logout</button>
                                        </>
                                    ) : (
                                        <Link to="/login" className="min-h-[48px] flex items-center rounded-xl px-4 text-base font-medium py-3 transition-colors text-[var(--foreground)] hover:bg-[var(--muted)]/60" onClick={() => setIsMenuOpen(false)}>Client Login</Link>
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

            {/* Footer - responsive */}
            <footer className="border-t border-[var(--border)] bg-[var(--card)]" role="contentinfo">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12">
                        <div className="md:col-span-4">
                            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                                <img src={logoUrl} alt="HexaStack Solutions - AI automation and enterprise software consulting Thrissur Kerala" className="h-8 w-8 object-contain" />
                                <span className="text-base sm:text-lg font-bold uppercase tracking-[0.15em] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                    HEXASTACK SOLUTIONS
                                </span>
                            </Link>
                            <p className="text-base text-[var(--muted-foreground)] max-w-sm leading-relaxed mb-8">
                                AI automation consulting, custom enterprise software, and SaaS platform engineering from Thrissur. Kerala and Gulf — you talk directly to the team. Reply in 2 hours.
                            </p>
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]">Follow</span>
                                <a href="https://www.linkedin.com/company/hexastack-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgRPeQwUCSyGi54I4m7rNLw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-4 sm:mb-6">Products</h4>
                            <nav aria-label="Footer products">
                                <ul className="space-y-1 sm:space-y-2">
                                    {productLinks.map((link) => (
                                        <li key={link.label}>
                                            {link.isExternal ? (
                                                <a href={link.to} target="_blank" rel="noopener noreferrer" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link to={link.to} className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-4 sm:mb-6">Explore</h4>
                            <nav aria-label="Footer explore">
                                <ul className="space-y-1 sm:space-y-2">
                                    {navLinks.map((link) => (
                                        <li key={link.to}>
                                            <Link to={link.to} className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-4 sm:mb-6">SEO &amp; Locations</h4>
                            <nav aria-label="Footer SEO and locations">
                                <ul className="space-y-1 sm:space-y-2">
                                    <li><Link to="/services" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Services</Link></li>
                                    <li><Link to="/work" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Case Studies</Link></li>
                                    <li><Link to="/about" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">About</Link></li>
                                    <li><Link to="/kerala" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Kerala</Link></li>
                                    <li><Link to="/gulf-vat" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Gulf VAT</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-4 sm:mb-6">Contact</h4>
                            <ul className="space-y-1 sm:space-y-2">
                                <li>
                                    <a href={`mailto:${email}`} className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-2 break-all">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0 mt-1.5"></div>
                                        <span className="break-all">{email}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0 mt-1.5"></div>
                                        {primaryPhone}
                                    </a>
                                </li>
                                {secondaryPhone && (
                                    <li>
                                        <a href={`https://wa.me/${secondaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-block py-2 sm:py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0 mt-1.5"></div>
                                            {secondaryPhone}
                                        </a>
                                    </li>
                                )}
                                <li className="pt-2">
                                    <span className="text-sm text-[var(--muted-foreground)] leading-relaxed block">{address}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 md:mt-20 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                        <p className="text-xs text-[var(--muted-foreground)] tracking-wide text-center md:text-left">
                            © {new Date().getFullYear()} HEXASTACK SOLUTIONS. ALL RIGHTS RESERVED.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                            <Link to="/privacy" className="inline-block py-2 sm:py-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">Privacy Policy</Link>
                            <Link to="/terms" className="inline-block py-2 sm:py-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">Terms of Service</Link>
                            <a href="https://www.linkedin.com/company/hexastack-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgRPeQwUCSyGi54I4m7rNLw%3D%3D" target="_blank" rel="noopener noreferrer" className="inline-block py-2 sm:py-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">LinkedIn</a>
                            <a href="#" className="inline-block py-2 sm:py-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">Twitter</a>
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

