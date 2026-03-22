import { Link } from 'react-router-dom';
import { FileText, LogOut, MessageCircle, ShieldCheck, UserRound, Workflow } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';

function DashboardContent() {
    const { user, logout } = useAuth();

    return (
        <Layout>
            <SEO
                title="Dashboard | HexaStack Solutions"
                description="View your HexaStack client dashboard."
                canonical="/dashboard"
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
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <ScrollReveal>
                            <span className="section-kicker">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Client dashboard
                            </span>
                            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.2rem]">
                                Welcome back, {user?.name}.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                                This dashboard is your account space for staying aligned with HexaStack Solutions during
                                active and upcoming engagements.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal>
                            <button
                                onClick={logout}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </ScrollReveal>
                    </div>

                    <ScrollRevealStagger className="mt-10 grid gap-5 md:grid-cols-3">
                        <GlassCard className="p-6">
                            <div className="w-fit rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                                <UserRound className="h-5 w-5" />
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-[var(--foreground)]">Account</h2>
                            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                                Logged in as {user?.email}. This portal is linked to your client profile.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <div className="w-fit rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                                <Workflow className="h-5 w-5" />
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-[var(--foreground)]">Project status</h2>
                            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                                {user?.status === 'pending'
                                    ? 'Your account is pending approval. We will activate your project workspace once review is complete.'
                                    : 'Your project updates and deliverables will appear here as they become available.'}
                            </p>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <div className="w-fit rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-[var(--foreground)]">Support access</h2>
                            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                                Need help right away? Use the quick actions below to contact the team directly.
                            </p>
                        </GlassCard>
                    </ScrollRevealStagger>

                    <ScrollReveal>
                        <div className="mt-10 surface-panel rounded-[30px] p-6 sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-[var(--foreground)]">Current workspace state</h2>
                                    <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                                        We are keeping this dashboard simple and responsive so account activity remains
                                        easy to understand on desktop and mobile.
                                    </p>
                                </div>
                                <div className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)]">
                                    Status: {user?.status}
                                </div>
                            </div>

                            {user?.status === 'pending' && (
                                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-800">
                                    Your account is pending approval. We will contact you at {user?.email}
                                    {user?.whatsapp ? ` or ${user.whatsapp}` : ''} when the workspace is active.
                                </div>
                            )}

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="https://wa.me/917591999365"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    WhatsApp us
                                </a>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    <FileText className="h-4 w-4" />
                                    New enquiry
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
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
