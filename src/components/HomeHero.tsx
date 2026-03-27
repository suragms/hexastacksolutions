import { Link } from 'react-router-dom';
import { ConsultingHeroComposition } from '@/components/home/ConsultingHeroComposition';

export default function HomeHero() {
    return (
        <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#f4f6fa]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-transparent to-[#ffffff]" />

            <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
                    <div className="max-w-xl">
                        <h1 className="text-[2rem] font-bold leading-[1.06] tracking-tight text-[#0f172a] sm:text-5xl lg:text-[3.1rem] lg:leading-[1.02]">
                            Custom Websites &amp; Billing/Stock Systems for Kerala and Gulf Growth.
                        </h1>

                        <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-[#334155] sm:text-lg">
                            <p>
                                Stop losing leads to slow websites and bleeding profit through manual operations. We partner with ambitious
                                multi-branch businesses to build high-converting web platforms and custom billing and stock systems.
                            </p>

                            <ul className="mt-4 space-y-2 text-sm font-semibold text-[#0f172a] sm:text-base">
                                <li>ZATCA/VAT &amp; GST Compliant.</li>
                                <li>100% Custom Architecture.</li>
                                <li>Guaranteed 2-hour founder WhatsApp support.</li>
                            </ul>
                        </div>

                        <div className="mt-8">
                            <Link
                                to="/contact"
                                className="inline-flex min-h-[56px] w-fit items-center justify-center rounded-full bg-[#0f172a] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.45)] transition hover:bg-black"
                            >
                                Book a System Blueprint Call
                            </Link>
                            <p className="mt-3 text-xs leading-relaxed text-[#64748b] sm:text-sm">
                                Trusted by 25+ multi-branch businesses. No salespeople, just engineers.
                            </p>
                        </div>
                    </div>

                    <div className="relative w-full min-w-0 lg:pl-2">
                        <ConsultingHeroComposition />
                    </div>
                </div>
            </div>
        </section>
    );
}
