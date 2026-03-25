import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const proof = [
    'Zero server downtime — monitored hosting and disciplined release practice.',
    'Direct WhatsApp access to founders. No anonymous ticket queue.',
    'Scalable architecture for more branches, SKUs, and tax zones as you grow.',
];

export function HomeTrustCloser() {
    return (
        <section className="border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(248,250,252,0.95)_0%,var(--background)_100%)] py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                        We do not disappear after launch
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
                        HexaStack is built in Thrissur. You work with founders, not a revolving freelance bench. Critical system failures get a strict two-hour
                        response window on WhatsApp—we treat downtime like cash leaving the building.
                    </p>
                </div>
                <ul className="mx-auto mt-10 max-w-2xl space-y-4">
                    {proof.map((line) => (
                        <li key={line} className="flex gap-3 text-left text-sm font-medium leading-relaxed text-[var(--foreground)] md:text-base">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
                                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                            </span>
                            {line}
                        </li>
                    ))}
                </ul>
                <div className="mt-12 flex justify-center">
                    <Link
                        to="/contact"
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-black md:text-base"
                    >
                        Book your free custom system blueprint (limited slots this week)
                        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    );
}
