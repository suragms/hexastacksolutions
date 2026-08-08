import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/seoSchemas';

export default function WebsiteDevelopmentTimeline() {
    return (
        <>
            <SEO
                title="How Long Does It Take to Build a Website in 2026? | HexaStack"
                description="A realistic website development timeline for 2026: how long brochure sites, ecommerce and custom web apps take, and the milestones that keep a Kerala project on track."
                keywords="website development timeline, how long to build a website, web development time 2026"
                canonical="/blog/website-development-timeline-2026"
                schema={[
                    createArticleSchema({
                        headline: 'How Long Does It Take to Build a Website in 2026?',
                        description:
                            'A realistic website development timeline for 2026: how long brochure sites, ecommerce and custom web apps take, and the milestones that keep a Kerala project on track.',
                        path: '/blog/website-development-timeline-2026',
                        datePublished: '2026-08-08',
                    }),
                    createBreadcrumbSchema([
                        { name: 'Home', item: '/' },
                        { name: 'Blog', item: '/blog' },
                        { name: 'How Long Does It Take to Build a Website in 2026?', item: '/blog/website-development-timeline-2026' },
                    ]),
                ]}
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    How Long Does It Take to Build a Website in 2026?
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8">
                    "It should be ready in two weeks" is one of the most common — and most expensive — assumptions in
                    web projects. Here's what a realistic timeline looks like in 2026, why it varies, and how to keep
                    your project moving instead of stalling.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Brochure and Business Sites</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        A standard business site (5–10 pages, contact form, basic SEO, WhatsApp integration) typically
                        takes 3–6 weeks from kickoff to launch. Most of that is content and approvals, not coding. The
                        fastest way to shorten it is to deliver your text, images, and brand details early. A good team
                        will show you a working preview as pages are built, so you're never surprised at the end.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Ecommerce and Booking Sites</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Anything with products, payments, or booking logic takes longer — usually 6–12 weeks — because
                        there is more to test: the catalogue, the checkout, tax settings, and how orders reach your team.
                        For Kerala and Gulf sellers, GST/VAT lines and payment gateways add review time. Don't let a
                        shortcut here compromise accuracy; billing mistakes cost more than an extra week of build.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Custom Web Applications</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        A custom web app (client portal, dashboard, booking engine, POS) is a project with phases —
                        discovery, design, build, testing, rollout. Expect 2–4 months for a solid MVP, then planned
                        additions. These are engineering projects, not brochure sites. Teams that build custom web
                        applications for a living, such as our{" "}
                        <Link to="/services/web-applications" className="text-orange-600 hover:text-orange-700">
                            web application development
                        </Link>{" "}
                        practice, usually estimate in sprints rather than a single date, because scope changes are normal.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">What Actually Causes Delays</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        The same three things delay most projects: late content, changing requirements mid-build, and
                        slow approvals. Agree on a milestone plan up front and treat the timeline as a shared commitment.
                        If you're also wondering about budget, our breakdown of{" "}
                        <Link to="/blog/website-cost-kerala" className="text-orange-600 hover:text-orange-700">
                            website costs in Kerala
                        </Link>{" "}
                        gives realistic ranges so you can plan time and money together.
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Ask for a realistic timeline
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </>
    );
}
