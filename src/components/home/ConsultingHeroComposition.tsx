import { Check, MessageCircle } from 'lucide-react';

type ConsultingHeroCompositionProps = {
    websiteImageUrl?: string | null;
    erpImageUrl?: string | null;
};

/**
 * Bright layered hero composition:
 * 1) Lead website mockup (phone)
 * 2) Floating green profit card (ERP/backend)
 * 3) WhatsApp lead captured notification bubble
 *
 * The intent is "premium tech partner" not "single-product SaaS".
 */
export function ConsultingHeroComposition({
    websiteImageUrl,
    erpImageUrl,
}: ConsultingHeroCompositionProps) {
    return (
        <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-[#f8fafc] via-[#f4f6fa] to-[#ffffff]" />

            {/* Phone lead funnel */}
            <div className="relative z-10 mx-auto mt-6 w-[88%] rounded-[26px] bg-white p-3 ring-1 ring-black/5 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.35)]">
                <div className="flex items-center justify-between rounded-[18px] bg-gradient-to-r from-[#0f172a] to-[#111827] px-3 py-2">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="h-2 w-2 rounded-full bg-amber-300" />
                        <span className="h-2 w-2 rounded-full bg-rose-400" />
                        <span className="ml-1 text-[11px] font-semibold text-white/90">Lead capture</span>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-200/95 ring-1 ring-emerald-400/25">
                        Live routing
                    </span>
                </div>

                    <div className="mt-3 overflow-hidden rounded-[18px] border border-black/5 bg-gradient-to-b from-[#0b1220] to-[#0f172a] p-3">
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-white/80">Hot inquiries</p>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-200 ring-1 ring-emerald-400/30">
                            WhatsApp
                        </span>
                    </div>

                    <div className="mt-3 space-y-2">
                        {[
                            { who: 'UAE logistics', note: 'Routing now', tone: 'emerald' },
                            { who: 'Thrissur retail', note: 'Reply in 2 hours', tone: 'amber' },
                            { who: 'Clinic billing', note: 'Owner notified', tone: 'rose' },
                        ].map((row) => (
                            <div key={row.who} className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/10">
                                <span
                                    className={`mt-0.5 h-9 w-9 shrink-0 rounded-lg ${
                                        row.tone === 'emerald'
                                            ? 'bg-emerald-500/20'
                                            : row.tone === 'amber'
                                              ? 'bg-amber-500/20'
                                              : 'bg-rose-500/20'
                                    }`}
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[11px] font-semibold text-white/90">{row.who}</p>
                                    <p className="truncate text-[10px] text-white/55">{row.note}</p>
                                </div>
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" strokeWidth={3} aria-hidden />
                            </div>
                        ))}
                    </div>

                    {websiteImageUrl ? (
                        <div className="mt-3 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                            <img
                                src={websiteImageUrl}
                                alt="Lead generation website mockup"
                                className="aspect-[16/9] w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Floating profit / backend card */}
            <div className="absolute left-[10%] top-[38%] z-20 w-[44%] translate-y-0 sm:left-[12%] sm:w-[42%]">
                <div className="rounded-[22px] bg-[#0b1220] p-3 shadow-[0_30px_90px_-40px_rgba(2,6,23,0.8)] ring-1 ring-white/10">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60">Billing &amp; stock control</p>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-200 ring-1 ring-emerald-400/30">
                            Running clean
                        </span>
                    </div>

                    <div className="mt-3 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
                        {erpImageUrl ? (
                            <img
                                src={erpImageUrl}
                                alt="Custom operations dashboard preview"
                                className="h-[120px] w-full rounded-lg object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex items-end gap-1.5 px-1 pb-1">
                                {[30, 52, 42, 70, 58, 86].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-full rounded-t bg-emerald-400/80 shadow-[0_0_16px_rgba(52,211,153,0.35)]"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        )}
                        <p className="mt-2 text-[10px] font-medium text-emerald-200/90">Fewer errors. Better reporting.</p>
                    </div>
                </div>
            </div>

            {/* WhatsApp notification bubble */}
            <div className="absolute -right-2 bottom-10 z-30">
                <div className="flex items-center gap-2 rounded-full bg-[#1f2937] px-3 py-2 text-white shadow-[0_22px_60px_-35px_rgba(2,6,23,0.9)] ring-1 ring-white/10">
                    <MessageCircle className="h-4 w-4 text-emerald-300" strokeWidth={2.5} aria-hidden />
                    <span className="text-[11px] font-semibold">WhatsApp lead captured</span>
                </div>
            </div>
        </div>
    );
}

