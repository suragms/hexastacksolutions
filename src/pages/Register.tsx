import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, UserPlus } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';

const registrationHighlights = [
    'Request a client account for project access',
    'Accounts are reviewed before activation',
    'Designed for secure client communication',
];

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        company: '',
        email: '',
        whatsapp: '',
        password: '',
        confirm: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (form.password !== form.confirm) {
            setError('Passwords do not match.');
            return;
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/client/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    company: form.company || undefined,
                    email: form.email,
                    whatsapp: form.whatsapp || undefined,
                    password: form.password,
                }),
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                setError(data.error || 'Registration failed.');
                setLoading(false);
                return;
            }

            setSuccess(true);
        } catch {
            setError('Network error. Please try again.');
        }

        setLoading(false);
    };

    if (success) {
        return (
            <Layout>
                <SEO
                    title="Registration Received | HexaStack Solutions"
                    description="Your client account request is pending approval."
                    canonical="/register"
                    noindex
                />
                <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
                    <div className="surface-panel rounded-[32px] px-6 py-10 text-center sm:px-10 md:py-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Account request received
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[var(--muted-foreground)]">
                            Your client account has been created and is now pending approval. We will notify you once it
                            is active and ready to use.
                        </p>
                        <Link
                            to="/login"
                            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                        >
                            Go to Login
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO
                title="Client Register | HexaStack Solutions"
                description="Request a client account for the HexaStack dashboard."
                canonical="/register"
                noindex
            />

            <section className="page-shell overflow-hidden py-16 md:py-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 12% 10%, rgba(37,99,235,0.14), transparent 28%), radial-gradient(circle at 88% 18%, rgba(14,165,233,0.1), transparent 22%)',
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <ScrollReveal>
                            <span className="section-kicker">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Client access
                            </span>
                            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.4rem]">
                                Create a client account for a more organized project experience.
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                                Register for the HexaStack client portal to access future project updates, communication,
                                and account-based workflow support. New accounts are reviewed before approval.
                            </p>

                            <ScrollRevealStagger className="mt-8 space-y-4">
                                {registrationHighlights.map((item) => (
                                    <GlassCard key={item} className="p-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                            <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </ScrollRevealStagger>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="surface-panel rounded-[30px] p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                                        <UserPlus className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Register</h2>
                                        <p className="text-sm text-[var(--muted-foreground)]">
                                            Create your client account request.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Name</label>
                                            <input
                                                required
                                                value={form.name}
                                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Company</label>
                                            <input
                                                value={form.company}
                                                onChange={(event) => setForm({ ...form, company: event.target.value })}
                                                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                                placeholder="Company name"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Email</label>
                                            <input
                                                required
                                                type="email"
                                                value={form.email}
                                                onChange={(event) => setForm({ ...form, email: event.target.value })}
                                                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">WhatsApp</label>
                                            <input
                                                value={form.whatsapp}
                                                onChange={(event) => setForm({ ...form, whatsapp: event.target.value })}
                                                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                                placeholder="+91..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Password</label>
                                            <input
                                                required
                                                type="password"
                                                value={form.password}
                                                onChange={(event) => setForm({ ...form, password: event.target.value })}
                                                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                                placeholder="Minimum 6 characters"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Confirm password</label>
                                            <input
                                                required
                                                type="password"
                                                value={form.confirm}
                                                onChange={(event) => setForm({ ...form, confirm: event.target.value })}
                                                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading ? 'Creating account...' : 'Create account'}
                                        {!loading && <ArrowRight className="h-4 w-4" />}
                                    </button>
                                </form>

                                <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-semibold text-[var(--primary)] hover:underline">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
