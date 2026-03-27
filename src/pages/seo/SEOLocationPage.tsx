import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { getSeoPageByPath, isIndexableSeoPath } from '@/data/seoRoutes';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

export default function SEOLocationPage() {
    const { seoSlug } = useParams<{ seoSlug: string }>();
    const path = seoSlug ? `/services/${seoSlug}` : '';
    const page = path ? getSeoPageByPath(path) : null;

    if (!page) {
        return (
            <Layout>
                <SEO title="Page Not Found | HexaStack" description="The requested page could not be found." noindex />
                <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Page not found</h1>
                    <Link to="/services" className="text-[var(--primary)] font-semibold hover:underline">View services</Link>
                </div>
            </Layout>
        );
    }

    const indexable = isIndexableSeoPath(page.path);
    const description = `${page.service} in ${page.location}. ${page.quoteLine}. Typical timeline ${page.timeline}. Built in Thrissur for Kerala and Gulf buyers.`;

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                serviceType: page.service,
                areaServed: [page.location, 'Thrissur', 'Kerala', 'UAE', 'Kuwait', 'Bahrain'],
                provider: {
                    '@type': 'LocalBusiness',
                    name: 'HexaStack Solutions',
                    telephone: '+91-75919-99365',
                },
                description,
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'Services', item: '/services' },
                { name: `${page.service} ${page.location}`, item: page.path },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title={`${page.service} in ${page.location} | HexaStack Solutions`}
                description={description}
                canonical={page.path}
                keywords={`${page.keyword} ${page.location}, software company Thrissur, HexaStack Solutions`}
                schema={schemaOrg}
                noindex={!indexable}
            />
            <article className="bg-[var(--background)] text-[var(--foreground)]">
                <section className="hero-parallax pt-12 pb-16 md:pt-24 md:pb-24 px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-4">
                            {page.service} in {page.location}
                        </h1>
                        <p className="text-lg text-[var(--muted-foreground)] mb-6 max-w-2xl">
                            {page.quoteLine}. Typical delivery window: {page.timeline}. Built in Thrissur for teams in {page.location} that want fewer manual steps and clearer day-to-day operations.
                        </p>
                        <a
                            href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20need%20help%20with%20a%20software%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A]"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp Us Now
                        </a>
                    </div>
                </section>

                <section className="py-16 md:py-20 border-t border-[var(--border)]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-4">What you get</h2>
                        <p className="text-[var(--muted-foreground)] leading-8">
                            We scope the work, agree a plan, and build around the workflow your team already uses. That works better than forcing your staff into a tool they do not like.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-20 border-t border-[var(--border)] bg-[var(--card)]/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-4">Need a quote for {page.location}?</h2>
                        <p className="text-[var(--muted-foreground)] mb-8">Message the HexaStack team on WhatsApp or send a short enquiry.</p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95"
                        >
                            Send Enquiry
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </article>
        </Layout>
    );
}
