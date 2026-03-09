import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { getGulfVatPages } from '@/data/seoLocationPages';

/**
 * When users search "Gulf VAT" or "VAT billing UAE/Dubai" they land here.
 * Lists all Gulf VAT billing SEO pages (UAE, Dubai, Abu Dhabi, etc.).
 */
export default function GulfVatPage() {
    const vatPages = getGulfVatPages();

    return (
        <Layout>
            <SEO
                title="VAT Billing Software Gulf | UAE, Dubai, Abu Dhabi | HexaStack"
                description="VAT-compliant billing and invoicing software for Gulf: UAE, Dubai, Abu Dhabi, Sharjah, Riyadh, Jeddah. TRN, reports. Built by Kerala team."
                canonical="/gulf-vat"
                keywords="Gulf VAT billing, VAT software UAE, VAT billing Dubai, VAT compliant UAE, HexaStack"
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    VAT Billing Software for the Gulf
                </h1>
                <p className="text-[var(--muted-foreground)] mb-10 leading-relaxed">
                    VAT-compliant billing and invoicing for UAE, Saudi Arabia, and the Gulf. TRN support, multi-currency, reports. We’ve built restaurant POS and billing for UAE clients — you talk to the developer.
                </p>
                <section>
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">VAT billing by location</h2>
                    <ul className="space-y-3">
                        {vatPages.map((entry) => (
                            <li key={`${entry.locationSlug}-${entry.serviceSlug}`}>
                                <Link
                                    to={`/seo/${entry.locationSlug}/${entry.serviceSlug}`}
                                    className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]"
                                >
                                    <span className="font-medium">{entry.h1}</span>
                                    <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)] shrink-0" aria-hidden />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
                <div className="mt-10 pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Get VAT billing quote for Gulf
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
