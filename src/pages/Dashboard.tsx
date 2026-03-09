import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { MessageCircle, FileText, LogOut } from 'lucide-react';

function DashboardContent() {
    const { user, logout } = useAuth();

    return (
        <Layout>
            <SEO title="Dashboard | HexaStack Solutions" description="Your project dashboard." canonical="/dashboard" />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
                    <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] text-sm font-medium">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
                <p className="text-[var(--muted-foreground)] mb-8">Hello, {user?.name}. {user?.status === 'pending' && 'Your account is pending approval.'}</p>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 mb-8">
                    <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">Project status</h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">Your project updates and deliverables will appear here once approved.</p>
                    {user?.status === 'pending' && (
                        <p className="text-sm text-amber-600 dark:text-amber-400">Account pending approval. We will contact you at {user?.email} or {user?.whatsapp || 'your WhatsApp'} once your account is active.</p>
                    )}
                </div>

                <div className="flex flex-wrap gap-4">
                    <a href="https://wa.me/917591999365" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90">
                        <MessageCircle className="w-5 h-5" /> WhatsApp us
                    </a>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)]">
                        <FileText className="w-5 h-5" /> New enquiry
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
