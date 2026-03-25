/**
 * Dark-mode HexaBill-style dashboard for hero proof column.
 * Not a stock photo — pure UI chrome for B2B credibility.
 */
export function HexaBillHeroMockup() {
    return (
        <div className="flex min-h-[280px] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)] sm:min-h-[320px] md:min-h-[360px]">
            <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-[#0f172a] px-3 sm:px-4">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500/90" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/90" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500/90" />
                    <span className="ml-2 text-[11px] font-semibold tracking-tight text-white/90">HexaBill · Admin</span>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/40">
                    New WhatsApp lead captured
                </span>
            </div>
            <div className="flex min-h-0 flex-1 gap-0 sm:gap-1">
                <aside className="hidden w-[72px] shrink-0 flex-col gap-1 border-r border-white/5 bg-[#0c1424] p-2 sm:flex">
                    {['HQ', 'DXB', 'TCR', 'Reports'].map((label, i) => (
                        <div
                            key={label}
                            className={`rounded-lg px-2 py-2 text-center text-[9px] font-medium ${i === 0 ? 'bg-emerald-500/15 text-emerald-200' : 'text-white/35'}`}
                        >
                            {label}
                        </div>
                    ))}
                </aside>
                <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {[
                            { k: 'Net profit (MTD)', v: '₹ 4.82L', up: true },
                            { k: 'Gulf branches', v: '6 active', up: null },
                            { k: 'GST / VAT filed', v: 'On track', up: null },
                        ].map((cell) => (
                            <div key={cell.k} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5 sm:p-3">
                                <p className="text-[9px] font-medium uppercase tracking-wide text-white/45">{cell.k}</p>
                                <p className="mt-1.5 text-sm font-bold tabular-nums text-white sm:text-base">{cell.v}</p>
                                {cell.up && <p className="mt-0.5 text-[10px] font-semibold text-emerald-400">↑ 12.4% vs last month</p>}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-[11px] font-semibold text-white/80">Revenue by branch</p>
                            <span className="text-[10px] text-emerald-400/90">Live</span>
                        </div>
                        <div className="mt-4 flex h-28 items-end justify-between gap-1 sm:h-32 sm:gap-1.5">
                            {[38, 52, 45, 68, 61, 78, 85, 92, 88].map((h, i) => (
                                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                                    <div
                                        className="w-full max-w-[28px] rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="mt-3 text-[10px] text-white/40">Thrissur · Kochi · Dubai · Abu Dhabi · simulated data</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** Smaller dark panels for zig-zag section (variants). */
export function DarkSaaSPlaceholder({ variant }: { variant: 'commander' | 'whatsapp' | 'tax' }) {
    if (variant === 'whatsapp') {
        return (
            <div className="flex min-h-[220px] flex-col rounded-xl border border-white/10 bg-[#0b1220] p-4 shadow-xl">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Ad landing · Meta</p>
                <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                    <p className="text-xs font-semibold text-emerald-200">Lead routed to WhatsApp</p>
                    <p className="mt-1 text-[11px] text-white/60">No email queue. Owner phone buzzes in under 2s.</p>
                </div>
                <div className="mt-3 flex-1 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex gap-2">
                        <div className="h-9 w-9 shrink-0 rounded-full bg-[#25D366]/30" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="h-2 w-[75%] rounded bg-white/20" />
                            <div className="h-2 w-[50%] rounded bg-white/10" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (variant === 'tax') {
        return (
            <div className="flex min-h-[220px] flex-col rounded-xl border border-white/10 bg-[#0b1220] p-4 shadow-xl">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Invoice preview</p>
                <div className="mt-3 flex-1 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold text-white">TAX INVOICE</p>
                            <p className="mt-1 text-[10px] text-white/50">ZATCA · QR · TRN</p>
                        </div>
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300">GST OK</span>
                    </div>
                    <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
                        <div className="h-2 w-full rounded bg-white/15" />
                        <div className="h-2 w-[85%] rounded bg-white/10" />
                        <div className="h-2 w-[65%] rounded bg-white/10" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex min-h-[220px] flex-col rounded-xl border border-white/10 bg-[#0b1220] p-4 shadow-xl">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Commander view · all branches</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.05] p-2">
                    <p className="text-[9px] text-white/45">P/L today</p>
                    <p className="text-lg font-bold text-emerald-400">+₹ 42.1k</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.05] p-2">
                    <p className="text-[9px] text-white/45">Discount blocks</p>
                    <p className="text-lg font-bold text-amber-200/90">3 pending</p>
                </div>
            </div>
            <div className="mt-3 flex flex-1 items-end gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-2">
                {[45, 62, 55, 71, 80, 77, 90].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-emerald-500/70" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}
