import { useEffect, useState } from 'react';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import MapEmbed from '@/components/MapEmbed';
import { API_URL } from '@/lib/utils';
import { createBreadcrumbSchema, hexastackLocalBusinessFragment } from '@/lib/seoSchemas';

const PRIMARY_PHONE = '+91-75919-99365';
const PRIMARY_PHONE_LINK = '+917591999365';
const PRIMARY_EMAIL = 'hexastacksolutions@gmail.com';
const ADDRESS = 'Vadanappally, Thrissur, Kerala 680614, India';

const serviceOptions = [
    'Website & SEO',
    'POS / Billing Software',
    'Custom Software',
    'AI & Automation',
    'Gulf / UAE Project',
    'Not sure yet',
];

function normalizeService(service: string | null) {
    if (!service) return '';
    const value = service.toLowerCase();
    if (value.includes('website') || value.includes('seo')) return 'Website & SEO';
    if (value.includes('pos') || value.includes('billing') || value.includes('hexabill')) return 'POS / Billing Software';
    if (value.includes('custom') || value.includes('software')) return 'Custom Software';
    if (value.includes('gulf') || value.includes('uae')) return 'Gulf / UAE Project';
    if (value.includes('ai') || value.includes('automation')) return 'AI & Automation';
    return 'Not sure yet';
}

export default function Contact() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        service: '',
        project_size: '',
        website: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const requestedService = normalizeService(params.get('service'));
        const demo = params.get('demo');

        setFormData((current) => ({
            ...current,
            service:
                current.service ||
                requestedService ||
                (demo === 'hexabill' || demo === '1' ? 'POS / Billing Software' : current.service),
        }));
    }, [location.search]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.website) return;

        if (formData.name.trim().length < 2) {
            setError('Please enter your full name.');
            return;
        }

        if (!formData.whatsapp.trim()) {
            setError('Please enter your WhatsApp number.');
            return;
        }

        if (!formData.service) {
            setError('Please choose the service you need.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/contact`.replace(/([^:])\/\/+/, '$1/'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    whatsapp: formData.whatsapp.trim(),
                    service: formData.service,
                    requirement: [
                        `New enquiry for ${formData.service}.`,
                        formData.project_size ? `Project size: ${formData.project_size}.` : '',
                        'Please reply on WhatsApp.',
                    ]
                        .filter(Boolean)
                        .join(' '),
                }),
            });

            const data = await response.json().catch(() => ({} as { message?: string; error?: string }));
            if (!response.ok) {
                setError(data.message || data.error || 'Could not send your enquiry. Please try again.');
                return;
            }

            setSubmitted(true);
            setFormData({
                name: '',
                whatsapp: '',
                service: '',
                project_size: '',
                website: '',
            });
        } catch (submitError) {
            console.error('[Contact submit]', submitError);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ContactPage',
                name: 'Talk to a Thrissur software team',
                url: 'https://hexastacksolutions.com/contact',
            },
            hexastackLocalBusinessFragment(),
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'Contact', item: '/contact' },
            ]),
        ],
    };

    const inputClass =
        'w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10';

    return (
        <Layout>
            <SEO
                title="Talk to a Thrissur Software Team | HexaStack Solutions"
                description="Call or WhatsApp HexaStack Solutions in Thrissur, Kerala for websites, POS software, billing systems, and Gulf software projects."
                keywords="contact software company Thrissur, website company Thrissur contact, POS software Kerala contact, Gulf software project Kerala"
                canonical="/contact"
                meta={[
                    { name: 'geo.region', content: 'IN-KL' },
                    { name: 'geo.placename', content: 'Thrissur, Kerala' },
                ]}
                schema={schemaOrg}
            />

            <section className="border-b border-[var(--border)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))] py-14 md:py-18">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Contact</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
                            Talk to a Thrissur Software Team
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                            Send a short enquiry or message us on WhatsApp. We reply within 2 hours.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
                    <div className="space-y-6">
                        <div className="surface-panel rounded-[28px] p-6 sm:p-8">
                            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Talk to us directly</h2>
                            <div className="mt-6 flex flex-col gap-3">
                                <a
                                    href="https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20discuss%20a%20project."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    WhatsApp: {PRIMARY_PHONE}
                                </a>
                                <a
                                    href={`tel:${PRIMARY_PHONE_LINK}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                >
                                    <Phone className="h-4 w-4" />
                                    Call: {PRIMARY_PHONE}
                                </a>
                            </div>
                            <div className="mt-6 space-y-3 text-sm text-[var(--foreground)]">
                                <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-[var(--primary)]" /> {PRIMARY_EMAIL}</p>
                                <p className="inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[var(--primary)]" /> <span>{ADDRESS}</span></p>
                            </div>
                            <p className="mt-5 text-sm font-semibold text-[var(--primary)]">We reply within 2 hours on WhatsApp.</p>
                        </div>

                        <div className="space-y-3">
                            <address className="not-italic text-sm leading-7 text-[var(--muted-foreground)]">
                                HexaStack Solutions<br />
                                Vadanappally, Thrissur<br />
                                Kerala 680614, India
                            </address>
                            <MapEmbed title="HexaStack Solutions office in Thrissur, Kerala" height={320} className="mt-4" />
                        </div>
                    </div>

                    <div className="surface-panel rounded-[28px] p-6 sm:p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Send an enquiry</h2>

                        {submitted && (
                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                Received. We will WhatsApp you within 2 hours.
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Your Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                    className={inputClass}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-[var(--foreground)]">WhatsApp Number</label>
                                <input
                                    id="whatsapp"
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={(event) => setFormData({ ...formData, whatsapp: event.target.value })}
                                    className={inputClass}
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Service needed</label>
                                <select
                                    id="service"
                                    value={formData.service}
                                    onChange={(event) => setFormData({ ...formData, service: event.target.value })}
                                    className={inputClass}
                                    required
                                >
                                    <option value="">Choose a service</option>
                                    {serviceOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="project_size" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                                    Project size <span className="font-normal text-[var(--muted-foreground)]">(optional)</span>
                                </label>
                                <select
                                    id="project_size"
                                    value={formData.project_size}
                                    onChange={(event) => setFormData({ ...formData, project_size: event.target.value })}
                                    className={inputClass}
                                >
                                    <option value="">Prefer not to say</option>
                                    <option value="Single location / small team">Single location / small team</option>
                                    <option value="Multi-branch or mid-size">Multi-branch or mid-size</option>
                                    <option value="GCC-wide or complex rollout">GCC-wide or complex rollout</option>
                                    <option value="Not sure yet">Not sure yet</option>
                                </select>
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.24)] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? 'Sending enquiry...' : 'Send Enquiry'}
                                {!loading && <ArrowRight className="h-4 w-4" />}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
