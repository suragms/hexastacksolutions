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

type FilterTab = 'All' | 'Gulf' | 'Kerala' | 'AI & SaaS' | 'Business Systems';

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
    problem?: string;
    build?: string;
}

/** Map API portfolio row to CaseStudy (liveUrl from projectUrl, media for dialog image). */
function mapPortfolioToCaseStudy(p: CaseStudy & Record<string, unknown>): CaseStudy {
    const loc = (p.location as string | null | undefined) ?? null;
    const clientType = (p.clientType as string | null | undefined) ?? null;
    const baseTags = Array.isArray(p.tags) ? p.tags : [];
    const tags =
        baseTags.length > 0 ? baseTags : ([loc, clientType].filter(Boolean) as string[]);
    const projectUrl = (p.projectUrl as string | null | undefined) ?? null;
    const liveUrl = (p.liveUrl as string | null | undefined) ?? projectUrl;
    return {
        id: String(p.id),
        title: String(p.title),
        description: String(p.description),
        techStack: (p.techStack as string | null | undefined) ?? null,
        projectUrl,
        liveUrl,
        tags,
        results: p.results as string | undefined,
        location: loc,
        clientType,
        media: p.media as CaseStudy['media'],
        problem: p.problem as string | undefined,
        build: p.build as string | undefined,
    };
}

function categoryLabel(p: CaseStudy): string {
    const c = p.clientType || '';
    if (c === 'Restaurant') return 'Restaurant POS';
    if (c === 'Healthcare') return 'Medical Lab Software';
    if (c === 'Trading' || (p.tags || []).includes('Billing')) return 'Billing & ERP';
    return 'Custom Software';
}

function clientContext(p: CaseStudy): string {
    if (p.location?.includes('UAE') && p.clientType === 'Restaurant') return 'UAE restaurant group, multi-floor, multi-branch';
    if (p.location?.includes('UAE') && p.clientType === 'Trading') return 'UAE and Kerala trading operations';
    if (p.location?.includes('Kerala') && p.clientType === 'Healthcare') return 'Kerala medical lab, high sample volume';
    return p.location ? `${p.location} · ${p.clientType || 'Business'}` : 'Kerala and Gulf businesses';
}

const FALLBACK_CASE_STUDIES: CaseStudy[] = [
    {
        id: 'healit',
        title: 'HEALit Medical',
        description:
            'Paper registers. 200+ samples per month tracked manually. We built a lab management system from intake to final report. Reporting time cut 60%.',
        techStack: 'React, Node, PostgreSQL',
        projectUrl: null,
        tags: ['Kerala', 'Healthcare'],
        results: 'Reporting time cut 60%.',
        location: 'Kerala',
        clientType: 'Healthcare',
        problem: 'Paper registers. 200+ samples/month tracked manually.',
        build: 'Lab management system from intake to final report.',
    },
    {
        id: 'hexabill-b2b',
        title: 'HexaBill B2B',
        description:
            'Trading company reconciling 200+ invoices by hand each month. We built automated billing, inventory, and multi-branch ERP. Manual work reduced 70%.',
        techStack: 'React, Node, Cloud DB',
        projectUrl: null,
        liveUrl: null,
        tags: ['UAE', 'Kerala', 'Billing'],
        results: 'Manual work reduced 70%.',
        location: 'UAE',
        clientType: 'Trading',
        problem: 'Trading company reconciling 200+ invoices by hand each month.',
        build: 'Automated billing, inventory, and multi-branch ERP.',
    },
    {
        id: 'uae-restaurant',
        title: 'UAE Restaurant POS',
        description:
            'Orders lost between floors. Cash reconciled manually at close. We built POS with live inventory sync, VAT billing, multi-branch. Zero manual reconciliation.',
        techStack: 'React, Node',
        projectUrl: null,
        tags: ['UAE', 'Restaurant'],
        results: 'Zero manual reconciliation.',
        location: 'UAE',
        clientType: 'Restaurant',
        problem: 'Orders lost between floors. Cash reconciled manually at close.',
        build: 'POS with live inventory sync, VAT billing, multi-branch.',
    },
];

export default function Work() {
    const [apiProjects, setApiProjects] = useState<CaseStudy[]>(FALLBACK_CASE_STUDIES);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
    const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/api/portfolio`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => {
                const rows = Array.isArray(data) ? data : [];
                setApiProjects(rows.length > 0 ? rows.map((row: CaseStudy & Record<string, unknown>) => mapPortfolioToCaseStudy(row)) : FALLBACK_CASE_STUDIES);
            })
            .catch(() => setApiProjects(FALLBACK_CASE_STUDIES))
            .finally(() => setLoading(false));
    }, []);

    const projects: CaseStudy[] = (apiProjects.length > 0 ? apiProjects : FALLBACK_CASE_STUDIES).map((p) => ({
        ...p,
        tags: p.tags?.length ? p.tags : ([p.location, p.clientType].filter(Boolean) as string[]),
    }));
    const filters: FilterTab[] = ['All', 'Gulf', 'Kerala', 'AI & SaaS', 'Business Systems'];
    const filtered = projects.filter((p) => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Gulf') return p.location?.includes('UAE') || p.tags?.some((t) => t.toLowerCase().includes('gulf'));
        if (activeFilter === 'Kerala') return p.location?.includes('Kerala') || p.tags?.some((t) => t.toLowerCase().includes('kerala'));
        if (activeFilter === 'AI & SaaS') return p.clientType === 'SaaS' || p.tags?.some((t) => t === 'AI' || t === 'SaaS') || p.techStack?.toLowerCase().includes('ai');
        if (activeFilter === 'Business Systems')
            return ['Healthcare', 'Trading', 'Wellness', 'Restaurant'].includes(p.clientType || '') || p.tags?.some((t) => ['Billing', 'Healthcare'].includes(t));
        return true;
    });

    const locationBadge = (loc: string | null | undefined) => {
        if (!loc) return null;
        if (loc.includes('UAE') || loc.toLowerCase().includes('gulf'))
            return (
                <span className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-xs font-medium">UAE</span>
            );
        if (loc.includes('Kerala'))
            return (
                <span className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-xs font-medium">Thrissur, Kerala</span>
            );
        if (loc.toLowerCase().includes('saas'))
            return (
                <span className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-xs font-medium">SaaS</span>
            );
        return (
            <span className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-xs font-medium">{loc}</span>
        );
    };

    const whatsappMsg = encodeURIComponent("Hi HexaStack! I'd like to discuss a similar project.");

    return (
        <Layout>
            <SEO
                title="Web Development Case Studies Kerala | HexaStack Work"
                description="Web development case studies in Kerala and Gulf projects from Thrissur. See website, POS, and billing outcomes before you hire."
                keywords="web development case studies Kerala, how we built website for business in Kerala, restaurant POS rollout UAE, software company portfolio Thrissur, billing software case study Gulf"
                canonical="/work"
            />
            <div className="bg-[var(--background)] font-sans text-[var(--foreground)] antialiased selection:bg-[var(--secondary)] selection:text-[var(--foreground)]">
                <section className="mx-auto min-w-0 max-w-6xl px-4 py-16 sm:px-6 md:py-24">
                    <h1 className="mb-4 break-words text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
                        Web development case studies from Kerala and Gulf client work
                    </h1>
                    <p className="mb-6 max-w-2xl break-words text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
                        If you are comparing teams, start here. These case studies show how we built websites, POS, and billing systems for Kerala and Gulf businesses and what improved after launch.
                    </p>

                    <div className="mb-10 flex flex-wrap gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
                        <span className="text-sm font-medium text-[var(--foreground)]">Projects delivered in Kerala and the Gulf</span>
                        <span className="text-sm text-[var(--muted-foreground)]">·</span>
                        <span className="text-sm font-medium text-[var(--foreground)]">Reporting time reduced up to 60 percent</span>
                    </div>

                    <div className="mb-10 flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setActiveFilter(f)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    activeFilter === f
                                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                        : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--card)]" />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] py-16 text-center">
                            <p className="mb-4 text-[var(--muted-foreground)]">
                                No projects in this category yet. We&apos;re building more. WhatsApp us to discuss a similar project.
                            </p>
                            <a
                                href={`https://wa.me/917591999365?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                            >
                                <MessageCircle className="h-5 w-5" /> WhatsApp
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-colors hover:bg-[var(--muted)]"
                                >
                                    {p.media?.[0]?.url ? (
                                        <img src={p.media[0].url} alt="" className="h-40 w-full bg-[var(--card)] object-cover" />
                                    ) : (
                                        <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-[var(--primary)]/20 via-[var(--card)] to-[var(--primary)]/10 text-sm font-medium text-[var(--muted-foreground)]">
                                            {categoryLabel(p)}
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">{categoryLabel(p)}</p>
                                        <p className="mb-2 text-xs text-[var(--muted-foreground)]">{clientContext(p)}</p>
                                        {p.problem ? (
                                            <p className="mb-2 text-sm text-[var(--foreground)]">{p.problem}</p>
                                        ) : (
                                            <p className="mb-2 line-clamp-3 text-sm text-[var(--muted-foreground)]">{p.description}</p>
                                        )}
                                        {p.results ? <p className="mb-3 text-sm font-semibold text-[#059669]">{p.results}</p> : null}
                                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                                            {p.liveUrl ? (
                                                <a
                                                    href={p.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5" /> View live
                                                </a>
                                            ) : null}
                                            <button
                                                type="button"
                                                onClick={() => setSelectedProject(p)}
                                                className="min-h-[44px] rounded-full border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
                                            >
                                                Details
                                            </button>
                                            <a
                                                href={`https://wa.me/917591999365?text=${whatsappMsg}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                                            >
                                                Build something similar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]">
                            <DialogHeader>
                                <DialogTitle className="text-xl text-[var(--foreground)]">{selectedProject?.title}</DialogTitle>
                            </DialogHeader>
                            {selectedProject && (
                                <div className="space-y-5">
                                    {selectedProject.media?.[0]?.url ? (
                                        <img
                                            src={selectedProject.media[0].url}
                                            alt=""
                                            className="mb-2 max-h-56 w-full rounded-xl border border-[var(--border)] object-cover"
                                        />
                                    ) : null}
                                    <div className="flex flex-wrap gap-2">
                                        {locationBadge(selectedProject.location)}
                                        {(selectedProject.tags || []).map((t) => (
                                            <span key={t} className="rounded border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
                                                {t}
                                            </span>
                                        ))}
                                        {selectedProject.clientType && !(selectedProject.tags || []).includes(selectedProject.clientType) ? (
                                            <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
                                                {selectedProject.clientType}
                                            </span>
                                        ) : null}
                                    </div>
                                    {selectedProject.problem ? (
                                        <div>
                                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Problem</h4>
                                            <p className="text-sm text-[var(--foreground)]">{selectedProject.problem}</p>
                                        </div>
                                    ) : null}
                                    {selectedProject.build ? (
                                        <div>
                                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Solution</h4>
                                            <p className="text-sm text-[var(--foreground)]">{selectedProject.build}</p>
                                        </div>
                                    ) : null}
                                    {!selectedProject.problem ? (
                                        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{selectedProject.description}</p>
                                    ) : null}
                                    {selectedProject.results ? (
                                        <p className="text-sm font-semibold text-[#059669]">Result: {selectedProject.results}</p>
                                    ) : null}
                                    {selectedProject.techStack ? (
                                        <p className="text-xs text-[var(--muted-foreground)]">Tech: {selectedProject.techStack}</p>
                                    ) : null}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {selectedProject.liveUrl ? (
                                            <a
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]"
                                            >
                                                <ExternalLink className="h-4 w-4" /> View live
                                            </a>
                                        ) : null}
                                        <a
                                            href={`https://wa.me/917591999365?text=${whatsappMsg}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                                        >
                                            <MessageCircle className="h-5 w-5" /> Build something similar
                                        </a>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </section>

                <section className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-12 md:py-16">
                    <div className="mx-auto max-w-6xl text-center">
                        <h2 className="mb-4 text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Want a system like this for your business?</h2>
                        <p className="mx-auto mb-6 max-w-xl text-[var(--muted-foreground)]">
                            Restaurant like the UAE project? Medical system like HEALit? Tell us and we&apos;ll say if we can build it.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href={`https://wa.me/917591999365?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-8 font-semibold text-white hover:bg-[#20BA5A]"
                            >
                                <MessageCircle className="h-5 w-5" /> WhatsApp
                            </a>
                            <Link
                                to="/contact"
                                className="inline-flex h-12 min-h-[44px] items-center justify-center rounded-full border border-[var(--border)] px-8 font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                Get a quote
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
