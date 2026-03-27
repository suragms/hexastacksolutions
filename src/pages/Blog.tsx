import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

const categories = ['Websites', 'POS', 'Billing', 'Gulf VAT', 'Automation'];

const guides = [
    { title: 'How Much Does a Website Cost in Kerala in 2026?', excerpt: 'Website pricing for Kerala businesses, from brochure sites to lead-ready business websites.', category: 'Websites', slug: '/blog/website-cost-kerala-2026' },
    { title: 'UAE Restaurant POS: A Real Case Study', excerpt: 'How a custom POS system solved billing, VAT, and multi-branch operations for a restaurant in the UAE.', category: 'POS', slug: '/blog/restaurant-pos-uae-case-study' },
    { title: 'VAT-Compliant Billing Software for UAE Businesses (2026)', excerpt: 'What UAE and Gulf businesses should check before buying billing software.', category: 'Gulf VAT', slug: '/blog/vat-billing-software-uae-2026' },
    { title: 'AI Integration for Small Business in Kerala', excerpt: 'Where AI and automation actually help Kerala teams save time.', category: 'Automation', slug: '/blog/ai-integration-small-business-kerala' },
    { title: 'Medical Lab Software Kerala - Features and Pricing (2026)', excerpt: 'What clinics and labs in Kerala should expect from billing, reporting, and workflow software.', category: 'Billing', slug: '/blog/medical-lab-software-kerala-2026' },
    { title: 'POS Software for Restaurants in Kerala in 2026', excerpt: 'What restaurant owners in Kerala should ask before buying POS software.', category: 'POS', slug: '/blog/pos-software-restaurants-kerala-2026' },
    { title: 'Web Development Company in Thrissur - What to Look For', excerpt: 'How to compare web teams in Thrissur, pricing, support, and what actually matters.', category: 'Websites', slug: '/blog/web-development-company-thrissur' },
    { title: 'WhatsApp Business Setup in Kerala in 2026', excerpt: 'How Kerala businesses use WhatsApp for sales, support, and reminders.', category: 'Automation', slug: '/blog/whatsapp-business-setup-kerala-2026' },
    { title: 'How to Choose a Mobile App Developer in Kerala', excerpt: 'Questions to ask before paying for a mobile app build in Kerala.', category: 'Automation', slug: '/blog/choose-mobile-app-developer-kerala' },
    { title: 'NutriScan AI - Food Recognition App with GPT-4 Vision', excerpt: 'A product story from the HexaStack team and how AI ideas move from prototype to release.', category: 'Automation', slug: '/blog/nutriscan-ai-food-recognition-app' },
];

const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'CollectionPage',
            name: 'HexaStack blog',
            url: 'https://hexastacksolutions.com/blog',
        },
        createBreadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'Blog', item: '/blog' },
        ]),
    ],
};

export default function Blog() {
    return (
        <Layout>
            <SEO
                title="HexaStack Blog | Thrissur, Kerala & Gulf Software Guides"
                description="Guides on websites, POS software, billing systems, Gulf VAT, and automation from a Thrissur software team."
                keywords="web development company Thrissur, POS software Kerala restaurant, billing software UAE VAT, WhatsApp automation Kerala"
                canonical="/blog"
                schema={schemaOrg}
            />

            <section className="relative pt-8 pb-16 md:pt-20 md:pb-24 overflow-x-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.1),transparent)]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-6 break-words">
                        Kerala and Gulf software guides
                    </h1>
                    <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed break-words">
                        Short guides on websites, POS software, billing systems, Gulf VAT, and automation.
                    </p>
                </div>
            </section>

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

            <section className="py-8 md:py-16 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0 w-full">
                    <h2 className="text-2xl font-bold tracking-tight mb-2 break-words">Guides and insights</h2>
                    <p className="text-[var(--muted-foreground)] mb-10 max-w-xl break-words">
                        Built for buyers in Thrissur, Kerala, and Gulf markets.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {guides.map((guide) => (
                            <article
                                key={guide.title}
                                className="p-5 md:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors flex flex-col"
                            >
                                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
                                    {guide.category}
                                </span>
                                <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">{guide.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 flex-1">
                                    {guide.excerpt}
                                </p>
                                <Link
                                    to={guide.slug}
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
        </Layout>
    );
}
