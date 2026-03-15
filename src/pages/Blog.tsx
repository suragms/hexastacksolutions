import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const categories = ['Web & Development', 'POS & Billing', 'VAT Compliance', 'Healthcare', 'AI & Mobile'];

// Doc-specified 5 articles first; then rest
const guides = [
    { title: 'How Much Does a Website Cost in Kerala in 2026?', excerpt: 'A practical guide to website costs in Kerala — from brochure sites to custom web apps. Transparent pricing from a Thrissur-based team.', category: 'Web & Development', slug: '/blog/website-cost-kerala-2026' },
    { title: 'UAE Restaurant POS: A Real Case Study', excerpt: 'How a custom POS system solved billing, VAT, and multi-branch operations for a restaurant in the UAE.', category: 'POS & Billing', slug: '/blog/restaurant-pos-uae-case-study' },
    { title: 'VAT-Compliant Billing Software for UAE Businesses (2026)', excerpt: 'A practical guide to VAT-compliant invoicing and billing software for UAE and Gulf businesses.', category: 'VAT Compliance', slug: '/blog/vat-billing-software-uae-2026' },
    { title: 'AI Integration for Small Business in Kerala', excerpt: 'Practical ways to use AI in your Kerala small business — chatbots, automation, and custom AI tools.', category: 'AI & Mobile', slug: '/blog/ai-integration-small-business-kerala' },
    { title: 'Medical Lab Software Kerala — Features and Pricing (2026)', excerpt: 'What to expect from medical lab software in Kerala: patient management, reports, billing, and pricing.', category: 'Healthcare', slug: '/blog/medical-lab-software-kerala-2026' },
    { title: 'POS Software for Restaurants in Kerala in 2026', excerpt: 'What to look for in restaurant POS software — billing, GST, table management, and custom solutions from Thrissur.', category: 'POS & Billing', slug: '/blog/pos-software-restaurants-kerala-2026' },
    { title: 'Web Development Company in Thrissur — What to Look For', excerpt: 'How to choose a web development company in Thrissur: scope, pricing, support, and working with a local team.', category: 'Web & Development', slug: '/blog/web-development-company-thrissur' },
    { title: 'WhatsApp Business Setup in Kerala in 2026', excerpt: 'How to set up WhatsApp Business in Kerala — API, catalog, automation, and using WhatsApp for orders and support.', category: 'Web & Development', slug: '/blog/whatsapp-business-setup-kerala-2026' },
    { title: 'How to Choose a Mobile App Developer in Kerala', excerpt: 'What to look for when choosing a mobile app developer — portfolio, platform, cost, and support.', category: 'AI & Mobile', slug: '/blog/choose-mobile-app-developer-kerala' },
    { title: 'NutriScan AI — Food Recognition App with GPT-4 Vision', excerpt: 'NutriScan AI uses GPT-4 Vision to recognise food from a photo and give nutritional insights. Built by HexaStack.', category: 'AI & Mobile', slug: '/blog/nutriscan-ai-food-recognition-app' },
];

export default function Blog() {
    return (
        <Layout>
            <SEO
                title="Blog | HEXASTACK SOLUTIONS — Guides on ATS, VAT, Billing & Career"
                description="Guides on ATS, VAT compliance, billing software, and career tools. Insights for India, Gulf, and global professionals."
                keywords="ATS guide, VAT compliance UAE, billing software India, career tools, resume optimization, POS software blog, web development Kerala blog, software tips Kerala, Gulf VAT guide, career advice India, software blog Vadanappally Thrissur"
                canonical="/blog"
            />

            {/* Hero */}
            <section className="relative pt-8 pb-16 md:pt-20 md:pb-24 overflow-x-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.1),transparent)]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-6 break-words">
                        Blog
                    </h1>
                    <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed break-words">
                        Guides on ATS, VAT compliance, billing software, and career tools.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section className="py-6 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">Topics</p>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <span
                                key={cat}
                                className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)]"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guides */}
            <section className="py-8 md:py-16 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                    <h2 className="text-2xl font-bold tracking-tight mb-2 break-words">Guides & insights</h2>
                    <p className="text-[var(--muted-foreground)] mb-10 max-w-xl break-words">
                        Practical guides for business software, compliance, and career optimization.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {guides.map((g) => (
                            <article
                                key={g.title}
                                className="p-5 md:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors flex flex-col"
                            >
                                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
                                    {g.category}
                                </span>
                                <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">{g.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 flex-1">
                                    {g.excerpt}
                                </p>
                                <Link
                                    to={g.slug}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                                >
                                    Read more
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 md:py-16 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-[var(--muted-foreground)] mb-6 max-w-md mx-auto">
                        New guides added regularly. Need help with ATS, VAT, or billing? We can help.
                    </p>
                    <Link
                        to="/contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full brand-gradient text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Book Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
