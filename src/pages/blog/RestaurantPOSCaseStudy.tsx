import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

export default function RestaurantPOSCaseStudy() {
    return (
        <Layout>
            <SEO
                title="UAE Restaurant POS Case Study | HexaStack Solutions"
                description="How a custom POS system solved billing, VAT, and multi-branch operations for a restaurant in the UAE. Built by HexaStack from Kerala."
                keywords="restaurant POS UAE, VAT compliant POS, UAE billing software case study"
                canonical="/blog/restaurant-pos-uae-case-study"
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    UAE Restaurant POS: A Real Case Study
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8">
                    We built a custom point-of-sale and billing system for a restaurant client in the UAE. Here is what they needed and how we delivered it from our base in Thrissur, Kerala.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">The Challenge</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        The client needed VAT-compliant invoicing, table and order management, and reporting that worked across their operations. Off-the-shelf POS options either did not fit UAE rules or were too rigid. They wanted something that could evolve with their menu and branches.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">What We Built</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        We delivered a web-based POS (HexaBill) with VAT-compliant bills, multiple payment modes, and reports for management. The system runs in the browser, so no heavy installs, and works on tablets and desktops. The client could start with one branch and scale as they grew.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Outcome</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Faster billing, fewer errors, and reports that made it easier to track sales and VAT. The client continues to use and extend the system. If you run a restaurant or F&B business in the UAE or Gulf and need custom POS or billing, we can discuss your requirements and timeline.
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Discuss your project
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
