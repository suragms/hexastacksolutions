import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, MessageCircle, ExternalLink } from 'lucide-react';
import { API_URL } from '@/lib/utils';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

interface CompanySettings {
    primaryEmail?: string;
    primaryWhatsApp?: string;
    secondaryWhatsApp?: string | null;
    address?: string | null;
}

const serviceOptions = ['I\'m not sure', 'Website', 'Web App / Business Software', 'POS / Billing', 'ERP / Inventory', 'AI / SaaS', 'Other'];
const budgetOptions = ['Under Rs.15K', 'Rs.15K – Rs.60K', 'Rs.60K – Rs.1.5L', 'Rs.1.5L – Rs.2L', 'Rs.2L+', 'Not sure'];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        service: '',
        budget: '',
        requirement: '',
        website: '', // honeypot
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [error, setError] = useState('');
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const [settings, setSettings] = useState<CompanySettings | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/api/settings`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => data && setSettings(data))
            .catch(() => { });
    }, []);

    const primaryPhone = settings?.primaryWhatsApp || '+917591999365';
    const secondaryPhone = settings?.secondaryWhatsApp || '+917012714150';
    const email = settings?.primaryEmail || 'supporthexastack@hexastacksolutions.com';
    const address = settings?.address || 'Vadanappally, Thrissur, Kerala 680614, India';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.website) {
            setSubmitted(true);
            return;
        }
        setLoading(true);
        setError('');
        const submitData = {
            name: formData.name.trim(),
            requirement: formData.requirement.trim(),
            email: formData.email?.trim() || undefined,
            whatsapp: formData.whatsapp?.trim() || undefined,
            service: formData.service || undefined,
            budget: formData.budget || undefined,
        };
        if (!submitData.name || submitData.name.length < 2) {
            setError('Please enter your full name.');
            setLoading(false);
            return;
        }
        if (!submitData.requirement) {
            setError('Please describe what you need.');
            setLoading(false);
            return;
        }
        try {
            const url = `${API_URL}/api/contact`.replace(/([^:])\/\/+/, '$1/'); // avoid double slash
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });
            let data: { error?: string; message?: string } = {};
            try {
                data = await response.json();
            } catch {
                // Server returned non-JSON (e.g. HTML error page)
                setError(response.ok ? 'Something went wrong.' : `Server error (${response.status}). Please try again.`);
                setLoading(false);
                return;
            }
            if (!response.ok) {
                const msg = data.message || data.error || (response.status === 429 ? 'Too many enquiries. Please try again in an hour.' : 'Failed to submit. Please try again.');
                setError(msg);
                setLoading(false);
                return;
            }
            setFormData({ name: '', email: '', whatsapp: '', service: '', budget: '', requirement: '', website: '' });
            setShowSuccessPopup(true);
        } catch (err) {
            console.error('[Contact submit]', err);
            setError('Network error. Check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const whatsappContacts = [
        { number: primaryPhone, label: 'Line 1' },
        ...(secondaryPhone ? [{ number: secondaryPhone, label: 'Line 2' }] : []),
    ];

    if (submitted) {
        return (
            <Layout>
                <SEO title="Message Received | HexaStack Solutions" description="We got your message. Expect a reply within 2 hours." />
                <div className="min-h-[80vh] flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6">
                    <div className="max-w-lg w-full text-center">
                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-sm">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-[var(--foreground)]">We got it!</h1>
                            <p className="text-[var(--muted-foreground)] mb-2 leading-relaxed">Expect a reply within 2 hours.</p>
                            <p className="text-sm text-[var(--muted-foreground)] mb-8 leading-relaxed max-w-sm mx-auto">
                                1. We&apos;ll read your message · 2. We&apos;ll tell you if we can build it · 3. We&apos;ll give you a rough cost — no obligation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a href={`tel:${primaryPhone.replace(/\D/g, '')}`} className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                                    <Phone className="w-4 h-4" /> Call
                                </a>
                                <button type="button" onClick={() => setShowWhatsApp(true)} className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Us
                                </button>
                            </div>
                            <Link to="/" className="inline-block mt-8 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>

                {showWhatsApp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowWhatsApp(false)}>
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-lg font-semibold tracking-tight mb-5 text-[var(--foreground)]">Choose a number</h3>
                            <div className="space-y-2">
                                {whatsappContacts.map((c) => (
                                    <a key={c.number} href={`https://wa.me/${c.number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-[var(--muted)]/50 border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)]/80 transition-all">
                                        <span className="font-medium text-[var(--foreground)] text-sm">{c.label}</span>
                                        <span className="text-[var(--muted-foreground)] font-mono text-xs">{c.number}</span>
                                    </a>
                                ))}
                            </div>
                            <button type="button" onClick={() => setShowWhatsApp(false)} className="mt-5 w-full py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-lg">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Layout>
        );
    }

    const inputClass = "w-full min-h-[48px] bg-[var(--background)] px-4 py-3 border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-sm";
    const selectClass = inputClass + " appearance-none cursor-pointer pr-10";
    const labelClass = "block text-xs font-medium text-[var(--foreground)] mb-2";

    return (
        <Layout>
            <SEO
                title="Contact HexaStack | Free Quote | Software Kerala & UAE"
                description="Get a free quote in 2 hours. WhatsApp or form. Custom software, POS, billing, AI. Thrissur, Kerala."
                keywords="contact HexaStack, free quote software Kerala, get quote Thrissur, software quote Kerala, request demo POS, contact software company Thrissur, WhatsApp software enquiry, free consultation Kerala UAE, contact software company Vadanappally, software quote Vadanappally Thrissur"
                canonical="/contact"
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Contact HexaStack Solutions',
                    mainEntity: {
                        '@type': 'ContactPoint',
                        telephone: primaryPhone,
                        contactType: 'sales',
                        email,
                        areaServed: ['IN', 'AE'],
                    },
                }}
            />
            <div className="min-h-0 flex-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
                    {/* Hero */}
                    <div className="mb-8 sm:mb-10">
                        <div className="flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div className="max-w-2xl">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-2">
                                    Tell us what you need. We&apos;ll tell you if we can build it.
                                </h1>
                                <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
                                    No sales pitch. A direct answer on scope and cost — usually within 2 hours.
                                </p>
                            </div>
                            <Link to="/" className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors sm:shrink-0 self-start sm:self-auto">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* WhatsApp CTA banner */}
                    <a
                        href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi HexaStack! I want to discuss a project with you.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full min-h-[52px] px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors text-sm mb-8 sm:mb-10"
                    >
                        <MessageCircle className="w-5 h-5 shrink-0" />
                        Fastest reply — WhatsApp us now (reply in 2 hrs)
                    </a>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Form */}
                        <div className="lg:col-span-7">
                            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
                                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Send a message</h2>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="name" className={labelClass}>Name <span className="text-red-500">*</span></label>
                                            <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Your name" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className={labelClass}>Email</label>
                                            <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="whatsapp" className={labelClass}>Phone / WhatsApp</label>
                                        <input type="tel" id="whatsapp" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className={inputClass} placeholder="e.g. +91 98765 43210" />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="service" className={labelClass}>Service</label>
                                            <select id="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={selectClass}>
                                                <option value="">Select...</option>
                                                {serviceOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="budget" className={labelClass}>Budget</label>
                                            <select id="budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={selectClass}>
                                                <option value="">Select...</option>
                                                {budgetOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="requirement" className={labelClass}>What do you need? <span className="text-red-500">*</span></label>
                                        <textarea id="requirement" required rows={4} value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })} className={inputClass + ' min-h-[120px] resize-none'} placeholder="E.g. I need a POS system for my restaurant in Dubai with VAT billing" />
                                    </div>
                                    <input type="text" name="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                                    {error && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                            <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                                        </div>
                                    )}

                                    <div className="pt-1">
                                        <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm transition-all">
                                            {loading ? 'Sending...' : "Send — we'll reply in 2 hours"}
                                            {!loading && <ArrowRight className="w-4 h-4" />}
                                        </button>
                                        <p className="mt-3 text-center text-xs text-[var(--muted-foreground)]">Your data is sent securely.</p>
                                    </div>
                                </form>

                                {/* Confirmation popup after successful send */}
                                {showSuccessPopup && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="success-title">
                                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl text-center">
                                            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <h2 id="success-title" className="text-xl font-bold tracking-tight mb-2 text-[var(--foreground)]">Message sent successfully</h2>
                                            <p className="text-[var(--muted-foreground)] mb-6">We&apos;ve received your details and will get back to you within 2 hours.</p>
                                            <button
                                                type="button"
                                                onClick={() => { setShowSuccessPopup(false); setSubmitted(true); }}
                                                className="w-full h-12 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-95 transition-opacity"
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact info sidebar */}
                        <div className="lg:col-span-5">
                            <div className="lg:sticky lg:top-28 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
                                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Contact info</h2>
                                {/* Clear business address & contact (visible for Google / citations) */}
                                <div className="mb-6 p-4 rounded-xl bg-[var(--muted)]/30 border border-[var(--border)]">
                                    <p className="font-semibold text-[var(--foreground)] mb-2">HexaStack Solutions</p>
                                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-2">
                                        Vadanappally, Thrissur<br />
                                        Kerala 680614<br />
                                        India
                                    </p>
                                    <p className="text-sm mt-3">
                                        Phone: <a href="tel:+917591999365" className="font-medium text-[var(--primary)] hover:underline">+91 75919 99365</a>
                                    </p>
                                    <p className="text-sm mt-1">
                                        Email: <a href={`mailto:${email}`} className="font-medium text-[var(--primary)] hover:underline break-all">{email}</a>
                                    </p>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">Direct lines</p>
                                        <div className="space-y-2.5">
                                            <a href="tel:+917591999365" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)]/50 transition-colors">
                                                <div className="w-10 h-10 rounded-xl bg-[var(--muted)]/60 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)]/10 transition-colors">
                                                    <Phone className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                                </div>
                                                <span className="font-medium text-sm text-[var(--foreground)]">+91 75919 99365</span>
                                            </a>
                                            <a href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)]/50 transition-colors">
                                                <div className="w-10 h-10 rounded-xl bg-[var(--muted)]/60 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)]/10 transition-colors">
                                                    <MessageCircle className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                                </div>
                                                <span className="font-medium text-sm text-[var(--foreground)]">WhatsApp</span>
                                            </a>
                                            {secondaryPhone && (
                                                <a href={`https://wa.me/${secondaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)]/50 transition-colors">
                                                    <div className="w-10 h-10 rounded-xl bg-[var(--muted)]/60 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)]/10 transition-colors">
                                                        <MessageCircle className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                                    </div>
                                                    <span className="font-medium text-sm text-[var(--foreground)]">{secondaryPhone}</span>
                                                </a>
                                            )}
                                            <a href={`mailto:${email}`} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)]/50 transition-colors">
                                                <div className="w-10 h-10 rounded-xl bg-[var(--muted)]/60 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)]/10 transition-colors">
                                                    <Mail className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                                </div>
                                                <span className="text-sm text-[var(--foreground)] break-all">{email}</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">Office</p>
                                        <div className="flex items-start gap-3 p-3 rounded-xl">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--muted)]/60 flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-[var(--muted-foreground)]" />
                                            </div>
                                            <span className="text-sm text-[var(--muted-foreground)] leading-relaxed pt-1.5">
                                                Vadanappally, Thrissur<br />
                                                Kerala 680614, India
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">More</p>
                                        <a href="https://share.google/cnsKSTykx8sjMzNxC" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)]/50 transition-colors">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--muted)]/60 flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)]/10 transition-colors">
                                                <ExternalLink className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                                            </div>
                                            <span className="font-medium text-sm text-[var(--foreground)]">Google</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-[var(--border)] flex items-center gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-medium text-[var(--foreground)]">Available for new projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
