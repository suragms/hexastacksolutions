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
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">Clear pricing. No surprises.</h1>
                    <p className="text-lg text-[var(--muted-foreground)] mb-4 max-w-2xl">
                        50% to start, 50% on delivery. Fixed scope, fixed cost. Most projects live in 4–6 weeks.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] mb-12">Not sure which plan fits? WhatsApp us — we&apos;ll tell you in 5 minutes.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Basic Website</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.15,000</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-2">10–14 days</p>
                            <p className="text-xs text-[var(--primary)] font-medium mb-4">Best for: Shops, clinics, restaurants needing an online presence</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>5 pages, mobile-first</li>
                                <li>SEO-ready, contact form</li>
                                <li>WhatsApp CTA</li>
                            </ul>
                            <Link to="/contact" className="block w-full py-2.5 text-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-sm hover:opacity-90 transition-colors">Get Quote</Link>
                        </div>
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Business App</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.60,000</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-2">4–5 weeks</p>
                            <p className="text-xs text-[var(--primary)] font-medium mb-4">Best for: Companies needing login, roles, data management</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>Login, roles, dashboards</li>
                                <li>Data management, reports</li>
                                <li>Like medical lab / enquiry apps</li>
                            </ul>
                            <Link to="/contact" className="block w-full py-2.5 text-center rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:bg-[var(--muted)] transition-colors">Get Quote</Link>
                        </div>
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">POS &amp; Billing</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.75,000</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-2">4–6 weeks</p>
                            <p className="text-xs text-[var(--primary)] font-medium mb-4">Best for: Restaurants, retail shops — Kerala or Gulf VAT</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>Orders, inventory, billing</li>
                                <li>Kerala &amp; Gulf VAT-ready</li>
                                <li>UAE restaurant case study</li>
                            </ul>
                            <Link to="/contact" className="block w-full py-2.5 text-center rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:bg-[var(--muted)] transition-colors">Get Quote</Link>
                        </div>
                        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-colors">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Enterprise</h3>
                            <p className="text-2xl font-bold text-[var(--foreground)] mb-1">Rs.2L+</p>
                            <p className="text-xs text-[var(--muted-foreground)] mb-2">Scope-based</p>
                            <p className="text-xs text-[var(--primary)] font-medium mb-4">Best for: SaaS products, multi-tenant systems, AI features</p>
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                                <li>AI, SaaS, multi-tenant</li>
                                <li>Custom scope &amp; timeline</li>
                                <li>Like NutriScan AI, HexaBill</li>
                            </ul>
                            <a href={`https://wa.me/917591999365?text=${waQuery}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20BA5A] transition-colors">
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                            </a>
                        </div>
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
