import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';

export default function Register() {
    const [form, setForm] = useState({ name: '', company: '', email: '', whatsapp: '', password: '', confirm: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirm) {
            setError('Passwords do not match');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/client/register`, {
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
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data.error || 'Registration failed');
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
                <SEO title="Registration Received | HexaStack Solutions" description="Your account is pending approval." canonical="/register" />
                <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
                        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Account created</h1>
                        <p className="text-[var(--muted-foreground)] mb-6">Your account is pending approval. We will notify you once it is active.</p>
                        <Link to="/login" className="inline-block py-3 px-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90">Go to Login</Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO title="Client Register | HexaStack Solutions" description="Create a client account." canonical="/register" />
            <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
                    <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Register</h1>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6">Create a client account. Approval required.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Name *</label>
                            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]" placeholder="Your name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Company</label>
                            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]" placeholder="Company name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Email *</label>
                            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]" placeholder="you@company.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">WhatsApp</label>
                            <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]" placeholder="+91..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Password *</label>
                            <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]" placeholder="Min 6 characters" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Confirm password *</label>
                            <input required type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]" />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full py-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 disabled:opacity-50">
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                        Already have an account? <Link to="/login" className="text-[var(--primary)] font-medium hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
