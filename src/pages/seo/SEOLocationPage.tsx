import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { getSeoPageByPath } from '@/data/seoRoutes';
import { ArrowRight, Code2, Shield, Zap } from 'lucide-react';

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

    const regionLabel = page.type === 'kerala' ? 'Kerala' : page.type === 'india' ? 'India' : 'Gulf';
    const h1 = `${page.service} in ${page.location} | HexaStack ${regionLabel}`;
    const title = `${page.service} in ${page.location} | HexaStack Solutions`;
    const description = `${page.service} in ${page.location}. ${page.price}. Built in Kerala, delivered for ${page.location}. WhatsApp reply in 2 hours.`;

    return (
        <Layout>
            <SEO
                title={title}
                description={description}
                canonical={page.path}
                keywords={`${page.keyword} ${page.location}, HexaStack, ${regionLabel}`}
            />
            <article className="bg-[var(--background)] text-[var(--foreground)]">
                {/* Hero */}
                <section className="hero-parallax pt-12 pb-16 md:pt-24 md:pb-24 px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-4">
                            {page.service} in {page.location}
                        </h1>
                        <p className="text-lg text-[var(--muted-foreground)] mb-6 max-w-2xl">
                            Custom {page.keyword} for businesses in {page.location}. {page.price}. Kerala-based team — UAE experience. Reply in 2 hours on WhatsApp.
                        </p>
                        <a
                            href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20need%20help%20with%20a%20software%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95 transition-all"
                        >
                            WhatsApp Us Now <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </section>

                {/* Why HexaStack - 3 cards */}
                <section className="py-16 md:py-24 border-t border-[var(--border)]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-10">Why HexaStack</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                                <Code2 className="w-10 h-10 text-[var(--primary)] mb-4" />
                                <h3 className="font-semibold text-[var(--foreground)] mb-2">Direct to developer</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">You work with the team that builds. No middle layers. Thrissur-based, serving {page.location} and beyond.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                                <Shield className="w-10 h-10 text-[var(--primary)] mb-4" />
                                <h3 className="font-semibold text-[var(--foreground)] mb-2">Proven delivery</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">POS for UAE restaurants, medical lab software in Kerala, AI apps. We deliver on scope and timeline.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                                <Zap className="w-10 h-10 text-[var(--primary)] mb-4" />
                                <h3 className="font-semibold text-[var(--foreground)] mb-2">2hr reply</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">WhatsApp or contact form — we respond within 2 hours. Clear pricing and next steps.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Proof */}
                <section className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--card)]/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-6">Proof</h2>
                        <div className="flex flex-wrap gap-3">
                            {['3+ Gulf Projects', 'Kerala & UAE', 'Rs.2Cr+ client volume', 'Rs.15K websites'].map((s, i) => (
                                <span key={i} className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] text-sm font-medium">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 md:py-24 border-t border-[var(--border)]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-4">Get a quote for {page.service} in {page.location}</h2>
                        <p className="text-[var(--muted-foreground)] mb-8">Tell us your requirements. We reply within 2 hours on WhatsApp.</p>
                        <a
                            href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20need%20help%20with%20a%20software%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-95"
                        >
                            WhatsApp Us Now <ArrowRight className="w-4 h-4" />
                        </a>
                        <p className="mt-6">
                            <Link to="/contact" className="text-[var(--primary)] font-medium hover:underline">Or use the contact form</Link>
                        </p>
                    </div>
                </section>
            </article>
        </Layout>
    );
}
