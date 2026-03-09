import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function Pricing() {
    const waQuery = encodeURIComponent('Hi HexaStack! I checked your pricing and I want to get a quote for my project.');
    return (
        <Layout>
            <SEO
                title="Pricing | HexaStack Solutions — Thrissur Kerala"
                description="Transparent pricing: websites from ₹15,000, web apps from ₹60,000, AI projects from ₹1,20,000. No hidden fees. Thrissur, Kerala."
                keywords="website cost Kerala, website price Thrissur, custom software pricing, affordable web development Kerala"
                canonical="/pricing"
            />
            <div className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">Development Pricing</h1>
                    <p className="text-lg text-[var(--muted-foreground)] mb-12 max-w-2xl">
                        Transparent pricing. 50% advance, 50% on delivery. No hidden fees. Thrissur, Kerala — India & Gulf.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Basic Website</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.15,000</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-4">10–14 days</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>5 pages, mobile-first</li>
                                <li>SEO-ready, contact form</li>
                                <li>WhatsApp CTA</li>
                            </ul>
                            <Link to="/contact" className="block w-full py-2.5 text-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-sm hover:opacity-90 transition-colors">Get Quote</Link>
                        </div>
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Business</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.60,000</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-4">4–5 weeks</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>Login, roles, dashboards</li>
                                <li>Data management, reports</li>
                                <li>Like medical lab / enquiry apps</li>
                            </ul>
                            <Link to="/contact" className="block w-full py-2.5 text-center rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:bg-[var(--muted)] transition-colors">Get Quote</Link>
                        </div>
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">POS</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.75,000</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-4">4–6 weeks</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>Orders, inventory, billing</li>
                                <li>Kerala & Gulf VAT-ready</li>
                                <li>UAE restaurant case study</li>
                            </ul>
                            <Link to="/contact" className="block w-full py-2.5 text-center rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:bg-[var(--muted)] transition-colors">Get Quote</Link>
                        </div>
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Enterprise</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.2L+</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-4">Scope-based</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>AI, SaaS, multi-tenant</li>
                                <li>Custom scope & timeline</li>
                                <li>Like NutriScan AI, HexaBill</li>
                            </ul>
                            <a href={`https://wa.me/917591999365?text=${waQuery}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20BA5A] transition-colors">
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                            </a>
                        </div>
                    </div>

                    <p className="text-sm text-[var(--muted-foreground)]">Prices may vary by scope. We accept UPI, bank transfer, and international wire (Gulf clients).</p>
                </div>
            </div>
        </Layout>
    );
}
