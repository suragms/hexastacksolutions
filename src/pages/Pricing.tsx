import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { PRICING_TIERS } from '@/data/pricingTiers';

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'Can I pay in installments?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. 50% to start, 50% on delivery. We don\'t take 100% upfront.' } },
        { '@type': 'Question', name: 'What if I need changes after launch?', acceptedAnswer: { '@type': 'Answer', text: 'First 30 days of bug fixes are included.' } },
        { '@type': 'Question', name: 'How do Gulf clients pay?', acceptedAnswer: { '@type': 'Answer', text: 'International wire or SWIFT. We send a proper invoice in AED or INR.' } },
        { '@type': 'Question', name: 'How do I know the price won\'t change?', acceptedAnswer: { '@type': 'Answer', text: 'We agree scope in writing before starting. Price only changes if scope changes.' } },
    ],
};

const TIER_COPY: Record<string, { days: string; best: string; features: string[]; wa?: boolean }> = {
    basic_website: {
        days: '10–14 days',
        best: 'Best for: Shops, clinics, restaurants needing an online presence',
        features: ['5 pages, mobile-first', 'SEO-ready, contact form', 'WhatsApp CTA'],
    },
    business_app: {
        days: '4–5 weeks',
        best: 'Best for: Companies needing login, roles, data management',
        features: ['Login, roles, dashboards', 'Data management, reports', 'Like medical lab / enquiry apps'],
    },
    pos_billing: {
        days: '4–6 weeks',
        best: 'Best for: Restaurants, retail shops — Kerala or Gulf VAT',
        features: ['Orders, inventory, billing', 'Kerala & Gulf VAT-ready', 'UAE restaurant case study'],
    },
    enterprise: {
        days: 'Scope-based',
        best: 'Best for: SaaS products, multi-tenant systems, AI features',
        features: ['AI, SaaS, multi-tenant', 'Custom scope & timeline', 'Like NutriScan AI, HexaBill'],
        wa: true,
    },
};

export default function Pricing() {
    const waQuery = encodeURIComponent('Hi HexaStack! I checked your pricing and I want to get a quote for my project.');
    return (
        <Layout>
            <SEO
                title="Software Development Pricing Kerala | From Rs.15,000 | HexaStack"
                description="Website from Rs.15K, POS from Rs.75K, AI SaaS from Rs.1.2L. Thrissur, Kerala. No hidden fees."
                keywords="website development cost Kerala, software development price Thrissur, POS system cost India, how much website Kerala, web app development cost, website price Kerala 2026, POS software price UAE, billing software cost India, custom software pricing, fixed price development Kerala, software development price Vadanappally, website cost Vadanappally Thrissur"
                canonical="/pricing"
                schema={faqSchema}
            />
            <div className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">Transparent Pricing — Starting from ₹15,000, No Hidden Fees</h1>
                    <p className="text-lg text-[var(--muted-foreground)] mb-4 max-w-2xl">
                        50% to start, 50% on delivery. Fixed scope, fixed cost. Most projects live in 4–6 weeks.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] mb-12">Not sure which plan fits? WhatsApp us — we&apos;ll tell you in 5 minutes.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {PRICING_TIERS.map((tier, idx) => {
                            const copy = TIER_COPY[tier.id];
                            return (
                        <div key={tier.id} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">{tier.name}</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">{tier.label}</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-2">{copy.days}</p>
                            <p className="text-xs text-[var(--primary)] font-medium mb-4">{copy.best}</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                {copy.features.map((f) => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>
                            {copy.wa ? (
                            <a href={`https://wa.me/917591999365?text=${waQuery}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20BA5A] transition-colors">
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                            </a>
                            ) : (
                            <Link to="/contact" className={`block w-full py-2.5 text-center rounded-full text-sm transition-colors ${idx === 0 ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90' : 'border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)]'}`}>Get a Quote</Link>
                            )}
                        </div>
                            );
                        })}
                    </div>

                    <Accordion type="single" collapsible className="mb-12 max-w-2xl">
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">FAQ</h2>
                        <AccordionItem value="installments">
                            <AccordionTrigger className="text-left">Can I pay in installments?</AccordionTrigger>
                            <AccordionContent>Yes. 50% to start, 50% on delivery. We don&apos;t take 100% upfront.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="changes">
                            <AccordionTrigger className="text-left">What if I need changes after launch?</AccordionTrigger>
                            <AccordionContent>First 30 days of bug fixes are included.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="gulf">
                            <AccordionTrigger className="text-left">How do Gulf clients pay?</AccordionTrigger>
                            <AccordionContent>International wire or SWIFT. We send a proper invoice in AED or INR.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="price">
                            <AccordionTrigger className="text-left">How do I know the price won&apos;t change?</AccordionTrigger>
                            <AccordionContent>We agree scope in writing before starting. Price only changes if scope changes.</AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <p className="text-sm text-[var(--muted-foreground)] mb-8">We accept UPI, bank transfer, and international wire (Gulf clients).</p>

                    <p className="text-[var(--foreground)] font-medium">
                        Not sure? <a href={`https://wa.me/917591999365?text=${encodeURIComponent('Hi! I have a question about your pricing.')}`} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">WhatsApp us — 5 minutes.</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
