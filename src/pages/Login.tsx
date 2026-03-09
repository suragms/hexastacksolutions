import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        navigate('/dashboard', { replace: true });
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            <SEO title="Client Login | HexaStack Solutions" description="Log in to your client dashboard." canonical="/login" />
            <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
                    <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Client Login</h1>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6">Sign in to view your project status.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                placeholder="you@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                        Don&apos;t have an account? <Link to="/register" className="text-[var(--primary)] font-medium hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
