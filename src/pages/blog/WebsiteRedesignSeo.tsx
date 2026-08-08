import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/seoSchemas';

export default function WebsiteRedesignSeo() {
    return (
        <>
            <SEO
                title="Website Redesign Without Losing SEO: A Kerala Business Guide | HexaStack"
                description="Redesigning your website can hurt your Google rankings if done carelessly. A practical checklist to redesign without losing SEO — for Kerala businesses in 2026."
                keywords="website redesign without losing SEO, website migration SEO, redesign website Kerala"
                canonical="/blog/website-redesign-without-losing-seo"
                schema={[
                    createArticleSchema({
                        headline: 'Website Redesign Without Losing SEO: A Kerala Business Guide',
                        description:
                            'Redesigning your website can hurt your Google rankings if done carelessly. A practical checklist to redesign without losing SEO - for Kerala businesses in 2026.',
                        path: '/blog/website-redesign-without-losing-seo',
                        datePublished: '2026-08-08',
                    }),
                    createBreadcrumbSchema([
                        { name: 'Home', item: '/' },
                        { name: 'Blog', item: '/blog' },
                        { name: 'Website Redesign Without Losing SEO', item: '/blog/website-redesign-without-losing-seo' },
                    ]),
                ]}
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    Website Redesign Without Losing SEO: A Kerala Business Guide
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8">
                    A redesign is exciting — until the week after launch when your phone calls drop. Rankings built over
                    years can vanish if a redesign ignores SEO. Here's the checklist that keeps your rankings and your
                    traffic safe while you modernise.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Audit What You Have First</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Before touching the design, list every page that gets traffic and every page that ranks. Keep a
                        record of each URL, its title, and roughly what it earns you. Pages that rank today are the ones
                        you must protect most. If you don't know what's working, start with an{" "}
                        <Link to="/services/seo" className="text-orange-600 hover:text-orange-700">
                            SEO audit
                        </Link>{" "}
                        before the redesign.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Preserve URLs or Redirect Them</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        The golden rule: don't change URLs you don't need to. When a URL must change, set up a proper
                        301 redirect from the old address to the new one — every old link, including ones from other
                        sites pointing to you, then flows to the new page. Silent 404s are the fastest way to erase your
                        search history.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Keep Titles, Content, and Speed</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Keep the titles and headings that already work, and don't gut your best content in the name of
                        minimalism. Also watch performance: a heavy redesign can slow the site and hurt your Core Web
                        Vitals, which Google considers. Test the new site on a real mobile connection and keep images
                        optimised. The site should be as fast as it looks good.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Go Live Carefully</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Launch on a quiet day, then watch your search console for a spike in errors or a drop in
                        impressions. Give the new site a few weeks before judging results — small dips are normal as
                        Google re-crawls. If you're redesigning with a{" "}
                        <Link to="/services/web-design" className="text-orange-600 hover:text-orange-700">
                            web design team
                        </Link>
                        , make sure SEO protection is written into the scope, not assumed.
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Plan a safe redesign
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </>
    );
}
