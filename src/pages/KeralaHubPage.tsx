import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { getKeralaDistricts } from '@/data/seoLocationPages';

/**
 * When users search "Kerala" or "software Kerala" they land here.
 * Lists all Kerala districts with links to real SEO pages (/seo/thrissur/web-development etc.).
 */
export default function KeralaHubPage() {
    const districts = getKeralaDistricts();

    return (
        <Layout>
            <SEO
                title="Software & Web Development Kerala | HexaStack Solutions"
                description="Web development, POS, billing, and custom software across Kerala. Thrissur, Ernakulam, Kozhikode, and all 14 districts. Talk to the developer."
                canonical="/kerala"
                keywords="software company Kerala, web development Kerala, POS Kerala, billing software Kerala, HexaStack, Thrissur software, Ernakulam web development, Kozhikode POS, software all districts Kerala, custom software Kerala 14 districts, Vadanappally Thrissur Kerala, software company Vadanappally, web development Vadanappally Thrissur"
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    Software & Web Development in Kerala
                </h1>
                <p className="text-[var(--muted-foreground)] mb-10 leading-relaxed">
                    We serve all 14 districts of Kerala: websites, POS, billing software, and custom apps. Thrissur-based team — you talk directly to the developer. Reply in 2 hours on WhatsApp.
                </p>
                <section>
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5" aria-hidden />
                        Choose your district
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
                </section>
                <div className="mt-10 pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Get a quote for Kerala
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
