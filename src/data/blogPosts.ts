export type BlogPost = {
  id: string
  title: string
  dateLabel: string
  /** ISO date for sorting */
  dateIso: string
  excerpt: string
  coverImage: string
  coverAlt: string
  category: string
  tags: readonly string[]
  /** Shown in sidebar “Featured” */
  featured?: boolean
}

/**
 * Cover JPEGs live under public/images/blog/ (sourced from Unsplash; see Unsplash license).
 */
export const blogPosts: readonly BlogPost[] = [
  {
    id: 'vat-einvoice-2026',
    title: 'VAT e-invoicing in UAE (2026): what your site should say',
    dateLabel: 'Jan 2026',
    dateIso: '2026-01-12',
    excerpt:
      'Keywords buyers use: VAT billing software UAE, FTA alignment, POS handoff. Structure pages so finance and ops both find answers.',
    coverImage: '/images/blog/cover-vat-2026.jpg',
    coverAlt: 'Person reviewing invoices and payment documents at a desk',
    category: 'VAT & compliance',
    tags: ['VAT', 'UAE', 'Gulf B2B', 'SEO'],
    featured: true,
  },
  {
    id: 'cwv-gulf-leads',
    title: 'Core Web Vitals and B2B lead quality in the Gulf',
    dateLabel: 'Feb 2026',
    dateIso: '2026-02-03',
    excerpt:
      'Speed still ranks. Pair technical SEO with Gulf trust signals and Arabic-ready layouts where needed.',
    coverImage: '/images/blog/cover-cwv-gulf.jpg',
    coverAlt: 'Laptop screen showing charts and analytics on a desk',
    category: 'Performance & SEO',
    tags: ['SEO', 'Gulf B2B', '2026'],
    featured: true,
  },
  {
    id: 'pos-erp-narrative',
    title: 'POS + ERP stories that convert (without generic AI fluff)',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-01',
    excerpt:
      'Replace vague icons with real workflows: branches, stock, VAT lines, and SLAs buyers can verify.',
    coverImage: '/images/blog/cover-pos-erp.jpg',
    coverAlt: 'Customer paying at a retail counter with card terminal',
    category: 'Products',
    tags: ['POS', 'ERP', 'HexaBill'],
  },
  {
    id: 'seo-keywords-2026',
    title: 'Keyword clusters for Kerala → Gulf software buyers',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-18',
    excerpt:
      'Rank faster: map intent to pages (Thrissur web dev, UAE VAT software, Saudi POS) in clean silos.',
    coverImage: '/images/blog/cover-seo-2026.jpg',
    coverAlt: 'Notebook and laptop suggesting research and search strategy',
    category: 'Performance & SEO',
    tags: ['SEO', 'Kerala', 'Gulf'],
  },
  {
    id: 'gst-india-gulf',
    title: 'GST in India vs Gulf VAT: one team, two ledgers',
    dateLabel: 'Apr 2026',
    dateIso: '2026-04-05',
    excerpt:
      'How export teams keep GST and GCC VAT reporting clear when branches span India and UAE.',
    coverImage: '/images/blog/cover-gst-gulf.jpg',
    coverAlt: 'Desk with laptop, coffee, and paperwork for finance work',
    category: 'VAT & compliance',
    tags: ['GST', 'VAT', 'Gulf B2B'],
  },
  {
    id: 'ops-automation',
    title: 'Operational workflows before “AI” labels on the homepage',
    dateLabel: 'Apr 2026',
    dateIso: '2026-04-22',
    excerpt:
      'Automate receipts, approvals, and stock first; then talk intelligence. Buyers notice empty AI badges.',
    coverImage: '/images/blog/cover-ops-automation.jpg',
    coverAlt: 'Person using a smartphone for everyday business tasks',
    category: 'Operations',
    tags: ['Automation', 'B2B'],
  },
] as const

export function blogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((p) => p.category)))
}

export function sortedBlogPostsByDate(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.dateIso.localeCompare(a.dateIso))
}
