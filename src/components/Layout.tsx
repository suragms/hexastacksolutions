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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

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

    const headerClass = "sticky top-0 z-[60] w-full border-b border-[var(--border)] bg-white/95 backdrop-blur-md";

    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
            {/* Blue accent line at top */}
            <div style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg,#1E40AF,#3B82F6,#1E40AF)' }} aria-hidden />
            {/* Sticky Header */}
            <header className={headerClass}>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <img src={logoUrl} alt="HEXASTACK" className="h-6 w-6 object-contain" />
                            <span className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors hidden sm:block">
                                HEXASTACK SOLUTIONS
                            </span>
                            <span className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors sm:hidden">
                                HEXASTACK
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            <div
                                className="relative"
                                onMouseEnter={() => setProductsOpen(true)}
                                onMouseLeave={() => setProductsOpen(false)}
                            >
                                <button className="flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                                    Products
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {productsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 4 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-3 w-56 bg-white border border-[var(--border)] rounded-md shadow-lg"
                                        >
                                            {productLinks.map((link) => (
                                                link.isExternal ? (
                                                    <a
                                                        key={link.to}
                                                        href={link.to}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block px-5 py-2.5 text-sm font-medium tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                                                        onClick={() => setProductsOpen(false)}
                                                    >
                                                        {link.label}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        key={link.to}
                                                        to={link.to}
                                                        className="block px-5 py-2.5 text-sm font-medium tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                                                        onClick={() => setProductsOpen(false)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                )
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Dashboard</Link>
                                    <button type="button" onClick={logout} className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-1">
                                        <LogOut className="w-3.5 h-3.5" /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Client Login</Link>
                            )}
                        </nav>

                        <div className="flex items-center md:hidden">
                            <button
                                className="p-2 -mr-2 text-[var(--foreground)]"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu - full-screen */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[50] bg-white pt-16"
                    >
                        <nav className="flex flex-col px-6 h-full overflow-y-auto pb-12">
                            <ul className="space-y-1 mt-4">
                                <li>
                                    <Link to="/" className="block py-4 text-3xl font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                </li>
                                {navLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="block py-4 text-3xl font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors border-t border-[var(--border)]" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
                                    </li>
                                ))}
                                {user ? (
                                    <>
                                        <li><Link to="/dashboard" className="block py-4 text-3xl font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors border-t border-[var(--border)]" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                                        <li><button type="button" onClick={() => { logout(); setIsMenuOpen(false); }} className="block py-4 text-3xl font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors border-t border-[var(--border)] w-full text-left">Logout</button></li>
                                    </>
                                ) : (
                                    <li><Link to="/login" className="block py-4 text-3xl font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors border-t border-[var(--border)]" onClick={() => setIsMenuOpen(false)}>Client Login</Link></li>
                                )}
                            </ul>

                            <div className="mt-12 mb-8">
                                <p className="text-xs uppercase font-semibold tracking-widest text-[var(--muted-foreground)] mb-6">Platforms & Tools</p>
                                <ul className="space-y-4">
                                    {productLinks.map((link) => (
                                        <li key={link.to}>
                                            {link.isExternal ? (
                                                <a
                                                    href={link.to}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-4 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)] group-hover:bg-[var(--primary)] transition-colors"></span>
                                                    <span className="text-lg tracking-wide font-medium">{link.label}</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    to={link.to}
                                                    className="flex items-center gap-4 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)] group-hover:bg-[var(--primary)] transition-colors"></span>
                                                    <span className="text-lg tracking-wide font-medium">{link.label}</span>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-auto pt-8 border-t border-[var(--border)]">
                                <Link to="/contact" className="flex items-center justify-center h-14 w-full bg-[var(--primary)] text-white tracking-widest uppercase font-medium rounded hover:opacity-90 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                                    Initiate Engagement
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="border-t border-[var(--border)] bg-[var(--card)]" role="contentinfo">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
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
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-6">Products</h4>
                            <nav aria-label="Footer products">
                                <ul className="space-y-4">
                                    {productLinks.map((link) => (
                                        <li key={link.label}>
                                            {link.isExternal ? (
                                                <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                    {link.label}
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
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-6">Explore</h4>
                            <nav aria-label="Footer explore">
                                <ul className="space-y-4">
                                    {navLinks.map((link) => (
                                        <li key={link.to}>
                                            <Link to={link.to} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-6">SEO &amp; Locations</h4>
                            <nav aria-label="Footer SEO and locations">
                                <ul className="space-y-4">
                                    <li><Link to="/services" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Services</Link></li>
                                    <li><Link to="/work" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Case Studies</Link></li>
                                    <li><Link to="/about" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">About</Link></li>
                                    <li><Link to="/kerala" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Kerala</Link></li>
                                    <li><Link to="/gulf-vat" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">Gulf VAT</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] mb-6">Contact</h4>
                            <ul className="space-y-4">
                                <li>
                                    <a href={`mailto:${email}`} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                                        {email}
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                                        {primaryPhone}
                                    </a>
                                </li>
                                {secondaryPhone && (
                                    <li>
                                        <a href={`https://wa.me/${secondaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
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
                    <div className="mt-20 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs text-[var(--muted-foreground)] tracking-wide">
                            © {new Date().getFullYear()} HEXASTACK SOLUTIONS. ALL RIGHTS RESERVED.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            <Link to="/privacy" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">Privacy Policy</Link>
                            <Link to="/terms" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">Terms of Service</Link>
                            <a href="https://www.linkedin.com/company/hexastack-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgRPeQwUCSyGi54I4m7rNLw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">LinkedIn</a>
                            <a href="#" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest font-medium">Twitter</a>
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

