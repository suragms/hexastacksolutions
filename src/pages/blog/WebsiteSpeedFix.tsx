import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/seoSchemas';

export default function WebsiteSpeedFix() {
    return (
        <>
            <SEO
                title="Website Speed: Why Your Site Is Slow and How to Fix It | HexaStack"
                description="Slow websites lose customers and rankings. A practical guide to the real causes of slow websites in 2026 — and the fixes that actually move the needle."
                keywords="website speed optimization, why website is slow, website performance fix"
                canonical="/blog/website-speed-fix-guide"
                schema={[
                    createArticleSchema({
                        headline: 'Website Speed: Why Your Site Is Slow and How to Fix It',
                        description:
                            'Slow websites lose customers and rankings. A practical guide to the real causes of slow websites in 2026 - and the fixes that actually move the needle.',
                        path: '/blog/website-speed-fix-guide',
                        datePublished: '2026-08-08',
                    }),
                    createBreadcrumbSchema([
                        { name: 'Home', item: '/' },
                        { name: 'Blog', item: '/blog' },
                        { name: 'Website Speed: Why Your Site Is Slow', item: '/blog/website-speed-fix-guide' },
                    ]),
                ]}
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    Website Speed: Why Your Site Is Slow and How to Fix It
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8">
                    A slow website quietly costs you business. Visitors leave, and Google ranks faster sites above
                    yours. Speed isn't magic — it has identifiable causes and measurable fixes. Here's how to find and
                    fix them.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">The Most Common Causes</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        In 2026 the usual culprits are: oversized images that are bigger than the screen needs,
                        too much JavaScript loading on every page, hosting that's far from your visitors, and plugins or
                        third-party scripts you don't really need. Very often it's the images — a single photo can be
                        larger than the entire rest of the page.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Measure Before You Change</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Don't guess — measure. Run a speed test and note the real numbers: how long the first content
                        takes to appear, when the main element loads, and how much time the browser spends on scripts.
                        Change one thing at a time and measure again. If a fix doesn't improve the numbers, remove it.
                        Our{" "}
                        <Link to="/services/seo" className="text-orange-600 hover:text-orange-700">
                            SEO and technical services
                        </Link>{" "}
                        team follows exactly this measurement-first approach.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">The Fixes That Matter</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Compress and resize images, load images only when they're about to appear on screen, delay
                        non-essential scripts, and make sure your hosting serves files from a server close to your
                        audience. For Kerala and Gulf visitors, CDN placement matters. These aren't exotic —
                        they're standard practice on well-run sites.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Speed Is an Ongoing Job</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        A site that's fast today slows down again as you add content and features. That's why we
                        recommend re-measuring regularly and keeping new pages lean. If your business depends on the
                        site — bookings, enquiries, or sales — treat speed as a maintenance habit, not a one-time fix.
                        Google's Core Web Vitals remain a ranking signal; we've written about that in{" "}
                        <Link to="/blog/cwv-gulf-leads" className="text-orange-600 hover:text-orange-700">
                            Core Web Vitals and B2B lead quality in the Gulf
                        </Link>
                        .
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Get a speed assessment
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </>
    );
}
