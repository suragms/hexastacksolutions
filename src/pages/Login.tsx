import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, LockKeyhole, MessageCircle, ShieldCheck } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';

const portalHighlights = [
    'Check project status and account progress',
    'Access a cleaner client workspace',
    'Contact the team quickly when needed',
];

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);
        setLoading(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        navigate('/dashboard', { replace: true });
    };

    return (
        <Layout>
            <SEO
                title="Client Login | HexaStack Solutions"
                description="Log in to the HexaStack client dashboard."
                canonical="/login"
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
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                        <ScrollReveal>
                            <span className="section-kicker">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Client portal
                            </span>
                            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.4rem]">
                                Sign in to your HexaStack workspace.
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                                Access your client dashboard to review account status, follow project progress, and stay
                                connected with the HexaStack team from one place.
                            </p>

                            <ScrollRevealStagger className="mt-8 space-y-4">
                                {portalHighlights.map((item) => (
                                    <GlassCard key={item} className="p-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                            <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </ScrollRevealStagger>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="https://wa.me/917591999365"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    Need help?
                                </a>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)]"
                                >
                                    Create Account
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="surface-panel rounded-[30px] p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                                        <LockKeyhole className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Login</h2>
                                        <p className="text-sm text-[var(--muted-foreground)]">
                                            Sign in to continue to your dashboard.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                        />
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
                                        {loading ? 'Signing in...' : 'Sign in'}
                                        {!loading && <ArrowRight className="h-4 w-4" />}
                                    </button>
                                </form>

                                <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                                    Do not have an account?{' '}
                                    <Link to="/register" className="font-semibold text-[var(--primary)] hover:underline">
                                        Register here
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
