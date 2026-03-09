import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Clock, MessageCircle } from 'lucide-react';
import { API_URL } from '@/lib/utils';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

interface CompanySettings {
    primaryEmail?: string;
    primaryWhatsApp?: string;
    secondaryWhatsApp?: string | null;
    address?: string | null;
}

const serviceOptions = ['Website', 'Web App / Business Software', 'POS / Billing', 'ERP / Inventory', 'AI / SaaS', 'Other'];
const budgetOptions = ['Under Rs.15K', 'Rs.15K – Rs.60K', 'Rs.60K – Rs.1.5L', 'Rs.1.5L – Rs.2L', 'Rs.2L+', 'Not sure'];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        service: '',
        budget: '',
        requirement: '',
        website: '', // honeypot
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
    const email = settings?.primaryEmail || 'hexastack78@gmail.com';
    const address = settings?.address || 'Thrissur, Kerala';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.website) {
            setSubmitted(true);
            return;
        }
        setLoading(true);
        setError('');
        try {
            const { website, ...rest } = formData;
            const submitData = { name: rest.name, whatsapp: rest.whatsapp, service: rest.service, budget: rest.budget, requirement: rest.requirement };
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || data.message || (response.status === 429 ? 'Too many enquiries. Please try again in an hour.' : 'Failed to submit'));
                return;
            }
            setSubmitted(true);
            setFormData({ name: '', whatsapp: '', service: '', budget: '', requirement: '', website: '' });
        } catch {
            setError('Network error. Please try again.');
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
                <SEO title="Message Received | HEXASTACK SOLUTIONS" description="Your inquiry has been logged. Our technical team will be in touch shortly." />
                <div className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-6">
                    <div className="max-w-xl w-full text-center p-12 border border-[var(--border)] rounded bg-[var(--card)]">
                        <div className="w-16 h-16 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-8 h-8 text-[var(--foreground)]" />
                        </div>
                        <h1 className="text-3xl font-medium tracking-tight mb-4 text-white">Message Received</h1>
                        <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">Your project details have been securely logged. Our technical team will review your requirements and reach out within 24 hours.</p>
                        <div className="p-6 border border-[var(--border)] bg-[var(--input)] rounded-2xl text-left mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-4 h-4 text-[var(--muted-foreground)]" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Next Steps</span>
                            </div>
                            <ul className="text-[var(--muted-foreground)] space-y-3 text-sm">
                                <li className="flex gap-3"><span className="text-white">01 //</span> Requirement analysis</li>
                                <li className="flex gap-3"><span className="text-white">02 //</span> Technical viability assessment</li>
                                <li className="flex gap-3"><span className="text-white">03 //</span> Scope & Architecture proposal</li>
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={`tel:${primaryPhone.replace(/\D/g, '')}`} className="flex items-center justify-center h-12 px-8 bg-[var(--card)] border border-[var(--border)] text-white font-medium rounded-full hover:bg-[var(--muted)] transition-colors">
                                Call Directly
                            </a>
                            <button onClick={() => setShowWhatsApp(true)} className="flex items-center justify-center h-12 px-8 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                                WhatsApp Connect
                            </button>
                        </div>
                        <Link to="/" className="inline-block mt-10 text-sm font-medium tracking-wide text-[var(--muted-foreground)] hover:text-white uppercase">← Back to Home</Link>
                    </div>
                </div>

                {showWhatsApp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowWhatsApp(false)}>
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded p-8 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-medium tracking-tight mb-6 text-[var(--foreground)]">Secure Line Routing</h3>
                            <div className="space-y-3">
                                {whatsappContacts.map((c) => (
                                    <a key={c.number} href={`https://wa.me/${c.number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[var(--muted)] rounded border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)] transition-all">
                                        <span className="font-medium text-[var(--foreground)] tracking-wide text-sm">{c.label}</span>
                                        <span className="text-[var(--muted-foreground)] font-mono text-xs">{c.number}</span>
                                    </a>
                                ))}
                            </div>
                            <button onClick={() => setShowWhatsApp(false)} className="mt-6 w-full py-3 text-sm tracking-widest uppercase font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Abort</button>
                        </div>
                    </div>
                )}
            </Layout>
        );
    }

    const inputClass = "w-full min-h-[44px] bg-[var(--input)] px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] text-white text-sm placeholder:text-[var(--muted-foreground)] transition-all";
    const selectClass = inputClass + " appearance-none cursor-pointer";
    const labelClass = "block text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1.5";

    return (
        <Layout>
            <SEO
                title="Contact | HexaStack Solutions — Thrissur Kerala"
                description="Get a free quote. We reply within 2 hours on WhatsApp, within 24 hours by email. Thrissur, Kerala — India & Gulf."
                keywords="contact HexaStack Solutions, web developer Thrissur, software company Kerala, get quote"
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
                    },
                }}
            />
            <div className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--secondary)] selection:text-[var(--foreground)] flex-1 flex flex-col justify-center py-6 md:py-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Let&apos;s Build Together</h1>
                            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                                Tell us about your project. We reply within 2 hours on WhatsApp, within 24 hours by email.
                            </p>
                        </div>
                        <Link to="/" className="hidden md:inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-white text-xs font-semibold tracking-widest uppercase transition-colors shrink-0">← Back to Home</Link>
                    </div>

                    {/* WhatsApp CTA - fastest reply */}
                    <div className="mb-6">
                        <a href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi HexaStack! I want to discuss a project with you.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors text-sm">
                            <MessageCircle className="w-5 h-5" /> Fastest reply — Chat on WhatsApp
                        </a>
                        <p className="mt-2 text-xs text-[var(--muted-foreground)]">We reply within 2 hours on WhatsApp, within 24 hours by email.</p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* FORM SECTION - 5 fields only */}
                        <div className="md:col-span-8">
                            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 lg:p-8">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className={labelClass}>Name <span className="text-red-500">*</span></label>
                                        <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label htmlFor="whatsapp" className={labelClass}>WhatsApp number</label>
                                        <input type="tel" id="whatsapp" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className={inputClass} placeholder="Include country code (e.g. +91)" />
                                    </div>
                                    <div>
                                        <label htmlFor="service" className={labelClass}>Service</label>
                                        <select id="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={selectClass}>
                                            <option value="" className="bg-[var(--muted)]">Select...</option>
                                            {serviceOptions.map((opt) => (
                                                <option key={opt} value={opt} className="bg-[var(--muted)]">{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="budget" className={labelClass}>Budget</label>
                                        <select id="budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={selectClass}>
                                            <option value="" className="bg-[var(--muted)]">Select...</option>
                                            {budgetOptions.map((opt) => (
                                                <option key={opt} value={opt} className="bg-[var(--muted)]">{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="requirement" className={labelClass}>Requirement <span className="text-red-500">*</span></label>
                                        <textarea id="requirement" required rows={4} value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })} className={inputClass + ' resize-none'} placeholder="Describe your project: website, POS, billing, AI, etc." />
                                    </div>
                                    <input type="text" name="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                                    {error && (
                                        <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg">
                                            <p className="text-sm font-medium text-red-500">Error: {error}</p>
                                        </div>
                                    )}

                                    <div className="pt-2">
                                        <button type="submit" disabled={loading} className="w-full h-12 bg-white text-black font-semibold rounded-full hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2 text-sm transition-colors tracking-wide">
                                            {loading ? 'Sending Message...' : 'Send Message'}
                                            {!loading && <ArrowRight className="w-4 h-4" />}
                                        </button>
                                        <p className="mt-2 text-center text-[10px] text-[var(--muted-foreground)] tracking-wider uppercase">Your data is securely encrypted</p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* INFO SECTION */}
                        <div className="md:col-span-4 flex flex-col justify-center">
                            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
                                <h2 className="text-lg font-medium tracking-tight mb-6 text-white">Contact Information</h2>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Direct Lines</p>
                                        <a href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white hover:text-[var(--muted-foreground)] mb-3 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-[var(--input)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
                                                <Phone className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                                            </div>
                                            <span className="font-medium tracking-wide text-sm">{primaryPhone}</span>
                                        </a>
                                        {secondaryPhone && (
                                            <a href={`https://wa.me/${secondaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white hover:text-[var(--muted-foreground)] mb-3 transition-colors">
                                                <div className="w-8 h-8 rounded-full bg-[var(--input)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
                                                    <Phone className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                                                </div>
                                                <span className="font-medium tracking-wide text-sm">{secondaryPhone}</span>
                                            </a>
                                        )}
                                        <a href={`mailto:${email}`} className="group flex items-center gap-3 text-white hover:text-[var(--muted-foreground)] transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-[var(--input)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
                                                <Mail className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                                            </div>
                                            <span className="font-medium tracking-wide text-sm">{email}</span>
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Headquarters</p>
                                        <div className="flex items-start gap-3 text-white">
                                            <div className="w-8 h-8 rounded-full bg-[var(--input)] border border-[var(--border)] flex items-center justify-center shrink-0">
                                                <MapPin className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                                            </div>
                                            <span className="leading-relaxed text-[var(--muted-foreground)] mt-1 text-sm">
                                                {address}<br />
                                                Kerala, India
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Available for New Projects</span>
                                    </div>
                                    <p className="text-[10px] text-[var(--muted-foreground)] tracking-wide uppercase">Ready to scale your business operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
