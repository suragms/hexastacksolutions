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
    id: 'restaurant-pos-case-study',
    title: 'UAE restaurant POS case study: billing, VAT and multi-branch operations',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'How a custom POS flow improved billing accuracy and daily operations for a growing UAE restaurant business.',
    coverImage: '/images/blog/cover-pos-erp.jpg',
    coverAlt: 'Customer paying at a restaurant counter with POS terminal',
    category: 'Products',
    tags: ['POS', 'UAE', 'Case study'],
    featured: true,
  },
  {
    id: 'medical-lab-software-kerala',
    title: 'Medical lab software in Kerala: core features and pricing expectations',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'What labs should evaluate before choosing software: patient flow, report speed, billing logic, and support quality.',
    coverImage: '/images/blog/cover-cwv-gulf.jpg',
    coverAlt: 'Medical analytics and records dashboard on a laptop',
    category: 'Healthcare software',
    tags: ['Healthcare', 'Kerala', 'Software'],
  },
  {
    id: 'ai-integration-small-business-kerala',
    title: 'AI integration for small businesses in Kerala: practical adoption roadmap',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'A practical implementation sequence for chatbot workflows, automation and measurable outcomes without hype.',
    coverImage: '/images/blog/cover-seo-2026.jpg',
    coverAlt: 'Business owner reviewing AI workflow notes and dashboards',
    category: 'Automation',
    tags: ['AI', 'Kerala', 'SMB'],
  },
  {
    id: 'website-cost-kerala',
    title: 'How much does a website cost in Kerala in 2026?',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'Transparent cost ranges for brochure websites, ecommerce and custom web applications in Kerala.',
    coverImage: '/images/blog/cover-vat-2026.jpg',
    coverAlt: 'Calculator and project planning documents for website budgeting',
    category: 'Web development',
    tags: ['Pricing', 'Kerala', 'Websites'],
  },
  {
    id: 'vat-billing-uae',
    title: 'VAT-compliant billing software for UAE businesses',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'A practical checklist for VAT-ready invoicing software, compliance coverage and branch-level controls.',
    coverImage: '/images/blog/cover-vat-2026.jpg',
    coverAlt: 'VAT billing and compliance paperwork for UAE businesses',
    category: 'VAT & compliance',
    tags: ['VAT', 'UAE', 'Billing'],
  },
  {
    id: 'web-development-company-thrissur',
    title: 'What to look for in a web development company in Thrissur',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'How to evaluate delivery quality, communication process, technical depth, and post-launch support.',
    coverImage: '/images/blog/cover-seo-2026.jpg',
    coverAlt: 'Development team discussing project scope and delivery milestones',
    category: 'Web development',
    tags: ['Thrissur', 'Web development', 'Agency selection'],
  },
  {
    id: 'whatsapp-business-kerala',
    title: 'WhatsApp Business setup in Kerala for 2026 growth',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'How to structure catalog, automation, support and sales flows for WhatsApp-driven customer communication.',
    coverImage: '/images/blog/cover-ops-automation.jpg',
    coverAlt: 'Smartphone showing WhatsApp business interface and workflows',
    category: 'Growth',
    tags: ['WhatsApp', 'Kerala', 'Automation'],
  },
  {
    id: 'mobile-app-developer-kerala',
    title: 'How to choose a mobile app developer in Kerala',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'A practical checklist for selecting a reliable mobile app partner with the right platform and maintenance strategy.',
    coverImage: '/images/blog/cover-cwv-gulf.jpg',
    coverAlt: 'Mobile app wireframes and product planning session',
    category: 'Mobile development',
    tags: ['Mobile app', 'Kerala', 'Vendor selection'],
  },
  {
    id: 'pos-software-restaurants-kerala',
    title: 'POS software for restaurants in Kerala in 2026',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'Restaurant operators should evaluate billing reliability, table flow, kitchen integration and reporting depth.',
    coverImage: '/images/blog/cover-pos-erp.jpg',
    coverAlt: 'Restaurant POS interface used for order and billing management',
    category: 'Products',
    tags: ['POS', 'Restaurants', 'Kerala'],
  },
  {
    id: 'nutriscan-ai-food-recognition',
    title: 'NutriScan AI: food recognition app with GPT-4 vision',
    dateLabel: 'Mar 2026',
    dateIso: '2026-03-23',
    excerpt:
      'How image-based food recognition and nutritional insights are implemented for consumer health use cases.',
    coverImage: '/images/blog/cover-ops-automation.jpg',
    coverAlt: 'Mobile app analyzing food photo and showing nutrition data',
    category: 'AI products',
    tags: ['AI', 'Mobile app', 'Case study'],
  },
] as const

export function blogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((p) => p.category)))
}

export function sortedBlogPostsByDate(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.dateIso.localeCompare(a.dateIso))
}
