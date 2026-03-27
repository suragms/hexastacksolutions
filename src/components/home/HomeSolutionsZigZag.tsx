import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DarkSaaSPlaceholder } from '@/components/home/HexaBillHeroMockup';

const blocks = [
    {
        eyebrow: 'HexaBill',
        title: "The commander's dashboard",
        copy: [
            'Open your phone. Profit and loss by branch—from Dubai to Thrissur—on one screen.',
            'HexaBill splits numbers the way you run the business, not how a foreign template guessed.',
            'Role-based admin stops casual discounts. Staff sell. You approve.',
        ],
        visual: 'commander' as const,
        imageFirst: true,
        ctaTo: '/products/hexabill' as const,
        ctaLabel: 'See HexaBill details',
    },
    {
        eyebrow: 'Lead websites',
        title: 'Instant WhatsApp closing',
        copy: [
            'Hot enquiries from Meta and Google Ads skip the graveyard inbox.',
            'Our builds push the tap straight into your WhatsApp thread.',
            'No slow forms. You reply while they still intend to buy.',
        ],
        visual: 'whatsapp' as const,
        imageFirst: false,
        ctaTo: '/services#websites-seo' as const,
        ctaLabel: 'Website & lead routing',
    },
    {
        eyebrow: 'HexaBill',
        title: 'One-click tax-ready invoices',
        copy: [
            'PDF invoices wired for Gulf ZATCA phase rules and Indian GST in the same workflow.',
            'Arabic-English layouts when your market demands it.',
            'Your CA spends less time fixing files. Auditors see a clean trail.',
        ],
        visual: 'tax' as const,
        imageFirst: true,
        ctaTo: '/products/hexabill' as const,
        ctaLabel: 'See HexaBill details',
    },
];

export function HomeSolutionsZigZag() {
    return (
        <section className="border-b border-[var(--border)] py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Solutions</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        HexaBill POS plus websites built to close
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
                        Speed, automation, and control for owners who sign the cheques—not for developers hunting resume lines.
                    </p>
                </div>

                <div className="mt-14 space-y-16 md:space-y-24">
                    {blocks.map((block) => (
                        <div
                            key={block.title}
                            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${block.imageFirst ? '' : ''}`}
                        >
                            <div
                                className={`order-2 ${block.imageFirst ? 'lg:order-1' : 'lg:order-2'} rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 shadow-[0_28px_80px_-24px_rgba(0,0,0,0.45)] ring-1 ring-white/10 sm:p-5`}
                            >
                                <DarkSaaSPlaceholder variant={block.visual} />
                            </div>
                            <div className={`order-1 max-w-xl ${block.imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">{block.eyebrow}</p>
                                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">{block.title}</h3>
                                <div className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--muted-foreground)] md:text-base">
                                    {block.copy.map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>
                                <Link
                                    to={block.ctaTo}
                                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
                                >
                                    {block.ctaLabel}
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
