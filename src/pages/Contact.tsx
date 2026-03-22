import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, ExternalLink, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { API_URL } from '@/lib/utils';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';

interface CompanySettings {
    primaryEmail?: string;
    supportEmail?: string | null;
    primaryWhatsApp?: string;
    secondaryWhatsApp?: string | null;
    address?: string | null;
}

const serviceOptions = [
    'Not sure yet',
    'Website Design / SEO',
    'Custom Web App',
    'POS / Billing Software',
    'ERP / Inventory',
    'AI Automation',
    'Maintenance / Support',
];

const budgetOptions = [
    'Not sure yet',
    'Under Rs. 25K',
    'Rs. 25K - Rs. 75K',
    'Rs. 75K - Rs. 2L',
    'Rs. 2L - Rs. 5L',
    'Above Rs. 5L',
];

const CONTACT_EMAIL = 'hexastacksolutions@gmail.com';

const nextSteps = [
    'We review your message and understand the scope.',
    'We reply with the right next step, questions, or a rough direction on cost and approach.',
    'If the project is a fit, we move to a clearer discussion and planning stage.',
];

const fitPoints = [
    'Business websites and landing pages',
    'Custom software and operational tools',
    'POS, billing and inventory systems',
    'AI workflows and automation ideas',
];

function normalizeService(service: string | null) {
    if (!service) {
        return '';
    }

    const value = service.toLowerCase();
    if (value.includes('website') || value.includes('seo')) return 'Website Design / SEO';
    if (value.includes('web app') || value.includes('portal') || value.includes('custom')) return 'Custom Web App';
    if (value.includes('pos') || value.includes('billing')) return 'POS / Billing Software';
    if (value.includes('erp') || value.includes('inventory')) return 'ERP / Inventory';
    if (value.includes('ai') || value.includes('automation')) return 'AI Automation';
    if (value.includes('support') || value.includes('maintenance')) return 'Maintenance / Support';
    return 'Not sure yet';
}

export default function Contact() {
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        service: '',
        budget: '',
        requirement: '',
        website: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [error, setError] = useState('');
    const [settings, setSettings] = useState<CompanySettings | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/api/settings`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => data && setSettings(data))
            .catch(() => { });
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const requestedService = normalizeService(params.get('service'));
        const demo = params.get('demo');

        setFormData((current) => {
            const next = { ...current };
            let changed = false;

            if (requestedService && !current.service) {
                next.service = requestedService;
                changed = true;
            }

            if (demo && !current.requirement) {
                if (demo === 'hexabill' || demo === '1') {
                    next.service = current.service || 'POS / Billing Software';
                    next.requirement = 'I would like a demo of HexaBill for my business.';
                } else {
                    next.requirement = 'I would like to discuss a software or website project.';
                }
                changed = true;
            } else if (requestedService && !current.requirement) {
                next.requirement = `I would like to discuss ${requestedService.toLowerCase()} for my business.`;
                changed = true;
            }

            return changed ? next : current;
        });
    }, [location.search]);

    const primaryPhone = settings?.primaryWhatsApp || '+917591999365';
    const secondaryPhone = settings?.secondaryWhatsApp || '+917012714150';
    const primaryEmail = settings?.primaryEmail || CONTACT_EMAIL;
    const supportEmail = settings?.supportEmail || primaryEmail;
    const address = settings?.address || 'Vadanappally, Thrissur, Kerala 680614, India';

    const normalizePhoneForLink = (value: string) => value.replace(/[^+\d]/g, '');
    const normalizePhoneForWhatsApp = (value: string) => value.replace(/\D/g, '');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (formData.website) {
            setSubmitted(true);
            return;
        }

        const payload = {
            name: formData.name.trim(),
            requirement: formData.requirement.trim(),
            email: formData.email.trim() || undefined,
            whatsapp: formData.whatsapp.trim() || undefined,
            service: formData.service || undefined,
            budget: formData.budget || undefined,
        };

        if (!payload.name || payload.name.length < 2) {
            setError('Please enter your full name.');
            return;
        }

        if (!payload.requirement) {
            setError('Please describe your requirement.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/contact`.replace(/([^:])\/\/+/, '$1/'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            let data: { error?: string; message?: string } = {};
            try {
                data = await response.json();
            } catch {
                setError(response.ok ? 'Something went wrong. Please try again.' : `Server error (${response.status}). Please try again.`);
                return;
            }

            if (!response.ok) {
                const message =
                    data.message ||
                    data.error ||
                    (response.status === 429
                        ? 'Too many enquiries were sent recently. Please try again in an hour.'
                        : 'Failed to submit the form. Please try again.');
                setError(message);
                return;
            }

            setFormData({
                name: '',
                email: '',
                whatsapp: '',
                service: '',
                budget: '',
                requirement: '',
                website: '',
            });
            setShowSuccessPopup(true);
        } catch (submitError) {
            console.error('[Contact submit]', submitError);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <Layout>
                <SEO
                    title="Thanks for Contacting HexaStack Solutions"
                    description="Your message has been received by HexaStack Solutions."
                    canonical="/contact"
                />
                <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
                    <div className="surface-panel rounded-[32px] px-6 py-10 text-center sm:px-10 md:py-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Your enquiry has been received
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[var(--muted-foreground)]">
                            Thank you for reaching out. We will review your requirement and get back to you with the
                            next step as soon as possible.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href={`tel:${normalizePhoneForLink(primaryPhone)}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <Phone className="h-4 w-4" />
                                Call us
                            </a>
                            <a
                                href={`https://wa.me/${normalizePhoneForWhatsApp(primaryPhone)}?text=${encodeURIComponent('Hi HexaStack, I just submitted an enquiry and wanted to follow up.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white"
                            >
                                <MessageCircle className="h-4 w-4" />
                                WhatsApp us
                            </a>
                        </div>
                        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                            Back to Home
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ContactPage',
                name: 'Contact HexaStack Solutions',
                url: 'https://www.hexastacksolutions.com/contact',
            },
            {
                '@type': 'Organization',
                name: 'HexaStack Solutions',
                url: 'https://www.hexastacksolutions.com',
                telephone: primaryPhone,
                email: primaryEmail,
            },
            {
                '@type': 'ContactPoint',
                contactType: 'sales',
                telephone: primaryPhone,
                email: primaryEmail,
                areaServed: ['IN', 'AE', 'US'],
                availableLanguage: ['English'],
            },
            {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                telephone: primaryPhone,
                email: supportEmail,
                areaServed: ['IN', 'AE', 'US'],
                availableLanguage: ['English'],
            },
        ],
    };

    const inputClass =
        'w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10';
    const labelClass = 'mb-2 block text-sm font-medium text-[var(--foreground)]';

    return (
        <Layout>
            <SEO
                title="Contact HexaStack Solutions | Software Company in Thrissur, Kerala"
                description="Contact HexaStack Solutions for website development, custom software, POS, billing systems and AI automation. Reach our Thrissur, Kerala team for projects across India, the United States, and the UAE."
                keywords="contact HexaStack Solutions, software company Thrissur contact, website development enquiry Kerala, custom software quote India, software development company united states contact, POS software demo Thrissur, billing software company Kerala, AI automation consultation Kerala"
                canonical="/contact"
                localeAlternates={['en_US']}
                meta={[
                    { name: 'geo.region', content: 'IN-KL' },
                    { name: 'geo.placename', content: 'Thrissur, Kerala' },
                ]}
                schema={schemaOrg}
            />

            <section className="page-shell overflow-hidden border-b border-[var(--border)] py-16 md:py-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 12% 10%, rgba(37,99,235,0.15), transparent 28%), radial-gradient(circle at 88% 18%, rgba(14,165,233,0.12), transparent 22%)',
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="section-kicker">Contact</span>
                        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.5rem]">
                            Tell us what you want to build, improve, or launch next.
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            Use this page for business websites, custom software, POS, billing platforms, or AI
                            automation ideas. We are based in Thrissur, Kerala and work with businesses across Kerala,
                            India, the United States, and the UAE.
                        </p>
                    </ScrollReveal>

                    <ScrollRevealStagger className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                        <GlassCard className="p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Call</p>
                            <a href={`tel:${normalizePhoneForLink(primaryPhone)}`} className="mt-3 block text-lg font-semibold text-[var(--foreground)]">
                                {primaryPhone}
                            </a>
                        </GlassCard>
                        <GlassCard className="p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Primary email</p>
                            <a href={`mailto:${primaryEmail}`} className="mt-3 block break-all text-lg font-semibold text-[var(--foreground)]">
                                {primaryEmail}
                            </a>
                        </GlassCard>
                        <GlassCard className="p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Support email</p>
                            <a href={`mailto:${supportEmail}`} className="mt-3 block break-all text-lg font-semibold text-[var(--foreground)]">
                                {supportEmail}
                            </a>
                        </GlassCard>
                        <GlassCard className="p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Location</p>
                            <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">Thrissur, Kerala</p>
                            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{address}</p>
                        </GlassCard>
                        <GlassCard className="p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Quick message</p>
                            <a
                                href={`https://wa.me/${normalizePhoneForWhatsApp(primaryPhone)}?text=${encodeURIComponent('Hi HexaStack, I would like to discuss a project.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]"
                            >
                                WhatsApp
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </GlassCard>
                    </ScrollRevealStagger>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <ScrollReveal>
                            <div id="enquiry-form" className="surface-panel rounded-[30px] p-6 sm:p-8">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <span className="section-kicker">Send an enquiry</span>
                                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                                            Share your requirement
                                        </h2>
                                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
                                            A good message can be simple: tell us what you need, who it is for, and what
                                            kind of result you want.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className={labelClass}>Full name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                                className={inputClass}
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className={labelClass}>Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                                className={inputClass}
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="whatsapp" className={labelClass}>Phone or WhatsApp</label>
                                        <input
                                            id="whatsapp"
                                            type="tel"
                                            value={formData.whatsapp}
                                            onChange={(event) => setFormData({ ...formData, whatsapp: event.target.value })}
                                            className={inputClass}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="service" className={labelClass}>Service</label>
                                            <select
                                                id="service"
                                                value={formData.service}
                                                onChange={(event) => setFormData({ ...formData, service: event.target.value })}
                                                className={inputClass}
                                            >
                                                <option value="">Select a service</option>
                                                {serviceOptions.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="budget" className={labelClass}>Budget</label>
                                            <select
                                                id="budget"
                                                value={formData.budget}
                                                onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
                                                className={inputClass}
                                            >
                                                <option value="">Select a budget</option>
                                                {budgetOptions.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="requirement" className={labelClass}>Requirement</label>
                                        <textarea
                                            id="requirement"
                                            value={formData.requirement}
                                            onChange={(event) => setFormData({ ...formData, requirement: event.target.value })}
                                            className={`${inputClass} min-h-[160px] resize-y`}
                                            placeholder="Describe your project, business, or what you want to improve."
                                            required
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={(event) => setFormData({ ...formData, website: event.target.value })}
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        aria-hidden="true"
                                    />

                                    {error && (
                                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {loading ? 'Sending enquiry...' : 'Send enquiry'}
                                            {!loading && <ArrowRight className="h-4 w-4" />}
                                        </button>
                                        <p className="text-sm text-[var(--muted-foreground)]">
                                            Your message is sent securely to our team.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </ScrollReveal>

                        <div className="space-y-6">
                            <ScrollReveal>
                                <GlassCard className="p-6">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--primary)]" />
                                        <div>
                                            <h3 className="text-xl font-semibold text-[var(--foreground)]">What happens next</h3>
                                            <div className="mt-4 space-y-3">
                                                {nextSteps.map((item, index) => (
                                                    <p key={item} className="text-sm leading-7 text-[var(--muted-foreground)]">
                                                        <span className="font-semibold text-[var(--foreground)]">{index + 1}.</span> {item}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </ScrollReveal>

                            <ScrollReveal>
                                <GlassCard className="p-6">
                                    <h3 className="text-xl font-semibold text-[var(--foreground)]">Good fit enquiries</h3>
                                    <div className="mt-4 space-y-3">
                                        {fitPoints.map((item) => (
                                            <div key={item} className="flex items-start gap-3 text-sm leading-7 text-[var(--muted-foreground)]">
                                                <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[var(--primary)]" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </ScrollReveal>

                            <ScrollReveal>
                                <GlassCard className="p-6">
                                    <h3 className="text-xl font-semibold text-[var(--foreground)]">Direct contact details</h3>
                                    <div className="mt-5 space-y-4 text-sm text-[var(--foreground)]">
                                        <a href={`tel:${normalizePhoneForLink(primaryPhone)}`} className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-[var(--primary)]" />
                                            <span>{primaryPhone}</span>
                                        </a>
                                        {secondaryPhone && (
                                            <a
                                                href={`https://wa.me/${normalizePhoneForWhatsApp(secondaryPhone)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3"
                                            >
                                                <MessageCircle className="h-4 w-4 text-[var(--primary)]" />
                                                <span>{secondaryPhone}</span>
                                            </a>
                                        )}
                                        <a href={`mailto:${primaryEmail}`} className="flex items-center gap-3 break-all">
                                            <Mail className="h-4 w-4 text-[var(--primary)]" />
                                            <span>Primary: {primaryEmail}</span>
                                        </a>
                                        <a href={`mailto:${supportEmail}`} className="flex items-center gap-3 break-all">
                                            <Mail className="h-4 w-4 text-[var(--primary)]" />
                                            <span>Support: {supportEmail}</span>
                                        </a>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--primary)]" />
                                            <span className="text-[var(--muted-foreground)]">{address}</span>
                                        </div>
                                        <a
                                            href="https://share.google/cnsKSTykx8sjMzNxC"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 font-medium text-[var(--primary)]"
                                        >
                                            View Google profile
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                </GlassCard>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[28px] border border-[var(--border)] bg-white p-6 text-center shadow-2xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                            <CheckCircle className="h-7 w-7" />
                        </div>
                        <h2 className="mt-5 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                            Message sent successfully
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                            Thanks for contacting HexaStack Solutions. We have received your details.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setShowSuccessPopup(false);
                                setSubmitted(true);
                            }}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}
