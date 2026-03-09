import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { MessageCircle, ExternalLink } from 'lucide-react';

type FilterTab = 'All' | 'Gulf' | 'Kerala' | 'AI & SaaS' | 'Software Systems';

interface CaseStudy {
    id: string;
    title: string;
    description: string;
    techStack: string | null;
    projectUrl: string | null;
    liveUrl?: string | null;
    tags: string[];
    results?: string;
    location?: string | null;
    clientType?: string | null;
    media?: { id: string; type: string; url: string }[];
}

const FALLBACK_CASE_STUDIES: CaseStudy[] = [
    { id: 'zayoga', title: 'ZAYOGA', description: 'Yoga and wellness brand: website, booking, and digital presence. Clean UI and mobile-first design.', techStack: 'React, Node', projectUrl: null, tags: ['Kerala', 'Website'], results: 'Live site and booking flow', location: 'Kerala', clientType: 'Wellness' },
    { id: 'healit', title: 'HEALit', description: 'Healthcare / medical lab management: sample tracking, reporting, and patient records. Built for a Kerala lab.', techStack: 'React, Node, PostgreSQL', projectUrl: null, tags: ['Kerala', 'Healthcare'], results: 'Reporting time cut significantly', location: 'Kerala', clientType: 'Healthcare' },
    { id: 'hexabill-b2b', title: 'HexaBill B2B', description: 'B2B billing and ERP: multi-branch, VAT-compliant invoicing and inventory. Deployed for trading and retail clients.', techStack: 'React, Node, Cloud DB', projectUrl: null, liveUrl: null, tags: ['Gulf', 'Kerala', 'Billing'], results: 'Rs.2Cr+ client volume', location: 'UAE', clientType: 'Trading' },
    { id: 'nutriscan', title: 'NutriScan AI', description: 'AI-powered food recognition SaaS: users upload food images, get nutrition estimates. From concept to launch.', techStack: 'React, GPT-4o Vision, Node', projectUrl: null, liveUrl: 'https://nutriscan-ai.vercel.app', tags: ['AI', 'SaaS'], results: 'SaaS product live', location: null, clientType: 'SaaS' },
    { id: 'studenthub', title: 'Student Hub', description: 'Academic productivity SaaS: CGPA calculator, attendance, internal marks, PDF tools. Student-focused product.', techStack: 'React, Vercel', projectUrl: null, liveUrl: 'https://studentshub-gold.vercel.app', tags: ['Kerala', 'SaaS'], results: 'Live app in use', location: 'Kerala', clientType: 'SaaS' },
];

export default function Work() {
    const [apiProjects, setApiProjects] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
    const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/api/portfolio`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setApiProjects(Array.isArray(data) ? data : []))
            .catch(() => setApiProjects([]))
            .finally(() => setLoading(false));
    }, []);

    const projects: CaseStudy[] = (apiProjects.length > 0 ? apiProjects : FALLBACK_CASE_STUDIES).map((p) => ({
        ...p,
        tags: p.tags ?? [p.location, p.clientType].filter(Boolean) as string[],
    }));
    const filters: FilterTab[] = ['All', 'Gulf', 'Kerala', 'AI & SaaS', 'Software Systems'];
    const filtered = projects.filter((p) => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Gulf') return p.location?.includes('UAE') || p.tags?.some(t => t.toLowerCase().includes('gulf'));
        if (activeFilter === 'Kerala') return p.location?.includes('Kerala') || p.tags?.some(t => t.toLowerCase().includes('kerala'));
        if (activeFilter === 'AI & SaaS') return p.clientType === 'SaaS' || p.tags?.some(t => t === 'AI' || t === 'SaaS') || p.techStack?.toLowerCase().includes('ai');
        if (activeFilter === 'Software Systems') return ['Healthcare', 'Trading', 'Wellness', 'Restaurant'].includes(p.clientType || '') || p.tags?.some(t => ['Billing', 'Healthcare', 'Website'].includes(t));
        return true;
    });

    const locationBadge = (loc: string | null | undefined) => {
        if (!loc) return null;
        if (loc.includes('UAE') || loc.toLowerCase().includes('gulf')) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--card)] border border-[var(--border)]">UAE</span>;
        if (loc.includes('Kerala')) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--card)] border border-[var(--border)]">Thrissur, Kerala</span>;
        if (loc.toLowerCase().includes('saas')) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--card)] border border-[var(--border)]">SaaS</span>;
        return <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--card)] border border-[var(--border)]">{loc}</span>;
    };

    const whatsappMsg = encodeURIComponent('Hi HexaStack! I saw your portfolio and I\'d like to discuss a similar project.');

    return (
        <Layout>
            <SEO
                title="Our Work | Portfolio | HexaStack Solutions — Thrissur Kerala"
                description="Real projects: Gulf Restaurant POS (UAE), Medical Lab (Kerala), NutriScan AI. Custom software and websites from Thrissur."
                keywords="portfolio HexaStack, web development Thrissur, POS UAE, medical software Kerala, AI app"
                canonical="/work"
            />
            <div className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--secondary)] selection:text-[var(--foreground)]">

                <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4 text-[var(--foreground)]">
                        Our Work
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg max-w-2xl leading-relaxed mb-6">
                        Real projects delivered for clients in Kerala and the Gulf. Custom software, POS, medical systems, and AI apps.
                    </p>

                    {/* Stats bar */}
                    <div className="flex flex-wrap gap-4 mb-10 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                        <span className="text-sm font-medium text-[var(--foreground)]">Rs.2Cr+ client volume</span>
                        <span className="text-sm text-[var(--muted-foreground)]">·</span>
                        <span className="text-sm font-medium text-[var(--foreground)]">2 Gulf</span>
                        <span className="text-sm text-[var(--muted-foreground)]">·</span>
                        <span className="text-sm font-medium text-[var(--foreground)]">3 SaaS</span>
                        <span className="text-sm text-[var(--muted-foreground)]">·</span>
                        <span className="text-sm font-medium text-[var(--foreground)]">5 projects</span>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === f
                                    ? 'bg-white text-black'
                                    : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Project cards from API */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 rounded-2xl bg-[var(--card)] animate-pulse border border-[var(--border)]" />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-16 text-center border border-[var(--border)] rounded-2xl bg-[var(--card)]">
                            <p className="text-[var(--muted-foreground)] mb-4">No projects match this filter yet. Add projects in Admin or run the portfolio seed.</p>
                            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100">
                                Get in touch
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((p) => (
                                <div
                                    key={p.id}
                                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:bg-[var(--muted)] transition-colors flex flex-col"
                                >
                                    {p.media?.[0]?.url ? (
                                        <img src={p.media[0].url} alt={p.title} className="w-full h-40 object-cover bg-[var(--card)]" />
                                    ) : (
                                        <div className="w-full h-40 bg-[var(--card)] flex items-center justify-center text-[var(--muted-foreground)] text-sm">No image</div>
                                    )}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            {locationBadge(p.location)}
                                            {(p.tags || []).map((t) => (
                                                <span key={t} className="px-2 py-0.5 rounded text-xs text-[var(--muted-foreground)] border border-[var(--border)]">{t}</span>
                                            ))}
                                            {p.clientType && !(p.tags || []).includes(p.clientType) && (
                                                <span className="px-2 py-0.5 rounded text-xs text-[var(--muted-foreground)] border border-[var(--border)]">{p.clientType}</span>
                                            )}
                                        </div>
                                        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">{p.title}</h2>
                                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3 flex-1">{p.description}</p>
                                        {p.results && <p className="text-xs text-[var(--primary)] mt-1">{p.results}</p>}
                                        {p.techStack && (
                                            <p className="text-xs text-[var(--muted-foreground)] mt-2 truncate">{p.techStack}</p>
                                        )}
                                        <div className="mt-4 flex gap-2">
                                            {p.liveUrl && (
                                                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90">
                                                    <ExternalLink className="w-3.5 h-3.5" /> View Live
                                                </a>
                                            )}
                                            <button
                                                onClick={() => setSelectedProject(p)}
                                                className="py-2.5 px-4 rounded-full border border-[var(--border)] text-[var(--foreground)] text-sm font-medium hover:bg-[var(--muted)] transition-colors"
                                            >
                                                View case study
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Case study modal */}
                    <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                        <DialogContent className="bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] max-w-lg max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-xl text-[var(--foreground)]">{selectedProject?.title}</DialogTitle>
                            </DialogHeader>
                            {selectedProject && (
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {locationBadge(selectedProject.location)}
                                        {(selectedProject.tags || []).map((t) => (
                                            <span key={t} className="px-2 py-0.5 rounded text-xs text-[var(--muted-foreground)] border border-[var(--border)]">{t}</span>
                                        ))}
                                        {selectedProject.clientType && (
                                            <span className="px-2 py-0.5 rounded text-xs text-[var(--muted-foreground)] border border-[var(--border)]">{selectedProject.clientType}</span>
                                        )}
                                    </div>
                                    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{selectedProject.description}</p>
                                    {selectedProject.results && <p className="text-sm text-[var(--primary)]">{selectedProject.results}</p>}
                                    {selectedProject.techStack && (
                                        <p className="text-xs text-[var(--muted-foreground)]">Tech: {selectedProject.techStack}</p>
                                    )}
                                    {selectedProject.liveUrl && (
                                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:bg-[var(--muted)]">
                                            <ExternalLink className="w-4 h-4" /> View Live
                                        </a>
                                    )}
                                    <a
                                        href={`https://wa.me/917591999365?text=${whatsappMsg}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors text-sm"
                                    >
                                        <MessageCircle className="w-5 h-5" /> Similar project? WhatsApp us
                                    </a>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </section>

                <section className="px-4 py-12 md:py-16 border-t border-[var(--border)] bg-[var(--background)]">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-[var(--foreground)]">Let&apos;s build your next system</h2>
                        <p className="text-[var(--muted-foreground)] mb-6 max-w-xl mx-auto">Website, POS, medical software, or AI app — we deliver from Thrissur to the Gulf.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
                                Get Free Quote
                            </Link>
                            <a href={`https://wa.me/917591999365?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors">
                                <MessageCircle className="w-5 h-5" /> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
