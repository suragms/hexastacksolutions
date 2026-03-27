import { AlertTriangle, FilterX, TrendingDown } from 'lucide-react';

const columns = [
    {
        title: 'Lost leads',
        icon: FilterX,
        iconClass: 'bg-rose-500/15 text-rose-600 ring-rose-500/35',
        body: [
            'Your ads run. Traffic lands. Then silence.',
            'Generic sites bury WhatsApp three taps deep.',
            'You paid for the click. The chat never started.',
            'Every delayed second is cash burned.',
        ],
    },
    {
        title: 'Inventory leaks',
        icon: TrendingDown,
        iconClass: 'bg-amber-500/15 text-amber-700 ring-amber-500/35',
        body: [
            'Multi-branch means blind spots.',
            'Stock walks off the books. Nobody notices until stocktake.',
            'Excel snaps at month-end. Numbers stop trusting each other.',
            'Unrecorded shrink can eat up to fifteen percent of margin.',
        ],
    },
    {
        title: 'Compliance risk',
        icon: AlertTriangle,
        iconClass: 'bg-red-600/15 text-red-700 ring-red-600/35',
        body: [
            'UAE Corporate Tax and ZATCA do not negotiate.',
            'Manual invoices miss QR and phase rules.',
            'Fines land bigger than any software line item.',
            'Paper billing is a bet your auditor will not cover.',
        ],
    },
];

export function HomePainPoints() {
    return (
        <section className="border-b border-[var(--border)] bg-[var(--background)] py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Where money bleeds</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        Retail, logistics, and multi-branch owners: three leaks we see every week
                    </h2>
                </div>
                <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
                    {columns.map((col) => {
                        const Icon = col.icon;
                        return (
                            <div key={col.title} className="flex flex-col border-t border-[var(--border)] pt-8 md:border-t-0 md:pt-0">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-2 ring-inset ${col.iconClass}`}
                                        aria-hidden
                                    >
                                        <Icon className="h-6 w-6" strokeWidth={2.25} />
                                    </span>
                                    <h3 className="text-lg font-bold text-[var(--foreground)]">{col.title}</h3>
                                </div>
                                <ul className="mt-6 space-y-3 text-sm font-medium leading-relaxed text-[var(--muted-foreground)]">
                                    {col.body.map((line) => (
                                        <li key={line} className="border-l-2 border-[var(--border)] pl-3">
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
