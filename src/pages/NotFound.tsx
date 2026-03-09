import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

export default function NotFound() {
    return (
        <Layout>
            <SEO title="Page Not Found | HexaStack Solutions" description="The page you are looking for could not be found." noindex />
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">404</h1>
                <p className="text-[var(--muted-foreground)] mb-8">The page you are looking for could not be found.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90">
                        Back to Home
                    </Link>
                    <a
                        href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20couldn%27t%20find%20a%20page%20on%20your%20site."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)]"
                    >
                        WhatsApp Us
                    </a>
                </div>
            </div>
        </Layout>
    );
}
