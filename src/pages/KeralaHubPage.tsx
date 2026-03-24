import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { getKeralaDistricts } from '@/data/seoLocationPages';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

export default function KeralaHubPage() {
    const districts = getKeralaDistricts();

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                name: 'Kerala software pages',
                url: 'https://hexastacksolutions.com/kerala',
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'Kerala', item: '/kerala' },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title="Software Company Kerala | District Pages | HexaStack Solutions"
                description="Kerala district pages for websites, POS software, billing systems, and custom software from a Thrissur team."
                canonical="/kerala"
                keywords="software company Kerala, web development Kerala, POS software Kerala, billing software Kerala, Thrissur software company"
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-18">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Kerala pages</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-[3.35rem] md:leading-[1.05]">
                        Kerala software pages from a Thrissur team
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                        Choose your district if you want a local landing page for websites, software, or direct contact with HexaStack.
                    </p>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5" aria-hidden />
                        Kerala districts
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {districts.map((entry) => (
                            <li key={entry.locationSlug}>
                                <Link
                                    to={`/seo/${entry.locationSlug}/web-development`}
                                    className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]"
                                >
                                    <span className="font-medium">{entry.location}</span>
                                    <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)] shrink-0" aria-hidden />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 pt-8 border-t border-[var(--border)]">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            Get a Kerala quote
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
