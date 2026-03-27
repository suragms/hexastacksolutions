import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { ScrollReveal, ScrollRevealStagger } from '@/components/ScrollReveal';
import { PortfolioCard } from '@/components/PortfolioCard';

const portfolioItems = [
  {
    category: 'Billing & ERP',
    techLabel: 'Web App · React + Node.js',
    name: 'Trading company billing',
    outcome: 'Cut manual invoicing and reconciliation work by 70%.',
    problem: '200+ monthly orders were billed and reconciled manually in spreadsheets.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    to: '/work',
    featured: true,
  },
  {
    category: 'Restaurant POS',
    techLabel: 'POS · React + Node.js',
    name: 'UAE restaurant POS',
    outcome: 'Zero manual reconciliation at month-end.',
    problem: 'Orders from multiple floors were getting lost between kitchen and counter.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    to: '/work',
    featured: false,
  },
  {
    category: 'Medical / Lab',
    techLabel: 'Lab software · Web App',
    name: 'Medical lab (Kerala)',
    outcome: 'Reporting time reduced by 60%.',
    problem: 'Paper registers and manual tracking for 200+ samples per month.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    to: '/work',
    featured: false,
  },
  {
    category: 'B2B SaaS',
    techLabel: 'Web App · React + Node.js',
    name: 'Distribution ordering portal',
    outcome: 'Fewer phone orders and clearer fulfilment status for the sales team.',
    problem: 'Repeat buyers were placing orders by phone and WhatsApp with no single order history.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    to: '/work',
    featured: false,
  },
];

export default function Portfolio() {
  return (
    <Layout>
      <SEO
        title="Portfolio | HexaStack Solutions — Custom Software & POS Projects"
        description="Selected software, POS, billing, and AI projects delivered for Kerala and Gulf clients. See outcomes, problems solved, and tech stack."
        canonical="/portfolio"
      />
      <main>
        <section className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--background)]" aria-labelledby="portfolio-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">
                Portfolio
              </p>
              <h1
                id="portfolio-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3"
              >
                Software we&apos;ve shipped for Kerala & Gulf clients.
              </h1>
              <p className="text-[var(--muted-foreground)] max-w-2xl mb-10 md:mb-12">
                Each project starts with a real bottleneck — manual billing, lost orders, slow reporting — and ends with
                a measurable result. Here are a few examples.
              </p>
            </ScrollReveal>

            <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <PortfolioCard key={item.name} {...item} />
              ))}
            </ScrollRevealStagger>

            <ScrollReveal className="mt-12">
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Looking for something specific — like billing for multiple branches, lab reporting, or a SaaS platform?
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold hover:opacity-95 transition-opacity"
              >
                Start a similar project
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </Layout>
  );
}

