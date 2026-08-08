import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/seoSchemas';

export default function ThrissurBusinessWebsite() {
    return (
        <>
            <SEO
                title="Why Your Thrissur Business Needs a Real Website, Not Just Facebook | HexaStack"
                description="A Facebook page reaches followers; a website turns searches into customers. Why Thrissur businesses should own their online presence in 2026."
                keywords="Thrissur business website, website instead of Facebook Kerala, small business website Thrissur"
                canonical="/blog/thrissur-business-website-not-facebook"
                schema={[
                    createArticleSchema({
                        headline: 'Why Your Thrissur Business Needs a Real Website, Not Just Facebook',
                        description:
                            'A Facebook page reaches followers; a website turns searches into customers. Why Thrissur businesses should own their online presence in 2026.',
                        path: '/blog/thrissur-business-website-not-facebook',
                        datePublished: '2026-08-08',
                    }),
                    createBreadcrumbSchema([
                        { name: 'Home', item: '/' },
                        { name: 'Blog', item: '/blog' },
                        { name: 'A Real Website, Not Just Facebook', item: '/blog/thrissur-business-website-not-facebook' },
                    ]),
                ]}
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    Why Your Thrissur Business Needs a Real Website, Not Just Facebook
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8">
                    Many Thrissur businesses run their whole online presence from a Facebook page. It works — until it
                    doesn't. Here's why a website of your own is a business asset that a social page can't replace, and
                    how small the step really is.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">You Don't Own Your Facebook Page</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        A social page follows a platform's rules. Your page can be restricted, shadow-limited, or simply
                        outshone by ads from competitors. A website is yours — your design, your contact details, your
                        content, your customer data. When someone searches for your service in Thrissur, a website is
                        what Google shows; a Facebook page is optional content.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Search Brings New Customers; Social Brings Followers</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Facebook is great for staying in touch with people who already know you. But most customers
                        find new businesses through search — "plumber Thrissur", "café in Vadanappally", "gym near me".
                        A website lets you appear in those searches and gives visitors a credible, organised place to
                        understand what you offer. Social can't do that alone.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">A Website Works While You Sleep</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Your website answers questions, shows your work, and captures enquiries 24 hours a day — from
                        Thrissur, across Kerala, and even from Gulf customers planning visits. Link it to WhatsApp and
                        every enquiry reaches you instantly. A page requires constant posting; a website works on its
                        own.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Starting Is Simpler Than You Think</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        You don't need an elaborate build. A clean site with your services, photos, contact details, and
                        a WhatsApp button is enough to start — and it can grow into e-commerce or a booking system
                        later. Teams in Thrissur like ours at HexaStack build exactly this kind of{" "}
                        <Link to="/services/web-design" className="text-orange-600 hover:text-orange-700">
                            business website
                        </Link>
                        . Keep the Facebook page too — just make it point to your website, so every channel funnels into
                        something you own.
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Start with a simple site
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </>
    );
}
