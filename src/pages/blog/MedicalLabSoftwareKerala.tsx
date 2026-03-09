import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

export default function MedicalLabSoftwareKerala() {
    return (
        <Layout>
            <SEO
                title="Medical Lab Software Kerala — Features and Pricing | HexaStack"
                description="What to expect from medical lab software in Kerala: patient management, reports, billing, and how custom solutions compare on features and pricing."
                keywords="medical lab software Kerala, lab management software, pathology software Kerala"
                canonical="/blog/medical-lab-software-kerala"
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    Medical Lab Software in Kerala — Features and Pricing
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8">
                    Medical and pathology labs in Kerala need patient registration, test tracking, report generation, and often billing and GST. Here’s what to look for and what typically drives cost.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Core Features</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Good lab software handles patient demographics, test orders, sample tracking, and result entry. Report templates (with your logo and letterhead) and printing or PDF export are standard. Billing with GST and integration with existing instruments or LIS can be part of the scope. Role-based access (reception, lab, admin) keeps data secure.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Pricing Ranges</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Pricing depends on the number of tests, users, branches, and whether you need custom integrations. Packaged lab software may charge per module or user. Custom builds are quoted per project — you pay for the features you need and own the solution. We’ve built lab management for a Kerala client and can scope a system that fits your workflow and budget.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Choosing a Provider</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Prefer a team that understands healthcare workflows and compliance (data privacy, audit trails). Ask for references or a demo. HexaStack is based in Thrissur and has delivered medical lab software for Kerala — we can discuss your requirements and give a transparent quote. Reach out via our contact page or WhatsApp.
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Discuss your lab software
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
