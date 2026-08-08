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
  {
    id: 'web-design-vs-web-development-kerala',
    title: 'Web design vs web development in Kerala: what you actually need',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'Design is the look, development is the engineering. How to brief a Kerala web team so you pay only for what moves your business forward.',
    coverImage: '/images/blog/cover-seo-2026.jpg',
    coverAlt: 'Designer and developer collaborating on a website project',
    category: 'Web development',
    tags: ['Web development', 'Web design', 'Kerala'],
  },
  {
    id: 'website-development-timeline-2026',
    title: 'How long does it take to build a website in 2026?',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'A realistic website development timeline for 2026 — brochure sites, ecommerce and custom web apps — and the milestones that keep a project on track.',
    coverImage: '/images/blog/cover-cwv-gulf.jpg',
    coverAlt: 'Project planning calendar and website development milestones',
    category: 'Web development',
    tags: ['Web development', 'Timeline', '2026'],
  },
  {
    id: 'website-vs-web-application',
    title: 'Website vs web application: which does your business need?',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'Websites present your business; web applications do work for it. Practical examples for Kerala and Gulf companies choosing between the two.',
    coverImage: '/images/blog/cover-ops-automation.jpg',
    coverAlt: 'Desktop and browser windows showing a business workflow',
    category: 'Web development',
    tags: ['Web applications', 'Web development', 'Kerala'],
  },
  {
    id: 'ecommerce-website-development-kerala',
    title: 'E-commerce website development in Kerala: costs and what is included',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'What a custom e-commerce build in Kerala should include — catalogue, payments, GST/VAT, delivery — and the costs to plan for.',
    coverImage: '/images/blog/cover-pos-erp.jpg',
    coverAlt: 'Customer checking out on an online store with payment terminal',
    category: 'Web development',
    tags: ['E-commerce', 'Kerala', 'Websites'],
  },
  {
    id: 'website-maintenance-budget-kerala',
    title: 'Website maintenance: what every Kerala business should budget',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'Updates, backups, security and small content changes keep a site working. What maintenance covers and the budget that makes sense.',
    coverImage: '/images/blog/cover-vat-2026.jpg',
    coverAlt: 'Business owner reviewing website maintenance and budget documents',
    category: 'Web development',
    tags: ['Website maintenance', 'Kerala', 'Support'],
  },
  {
    id: 'web-development-company-vs-freelancer',
    title: 'Web development company vs freelancer: choosing right in Kerala',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'The honest trade-offs on price, support and reliability when choosing between a development company and a freelancer in Kerala.',
    coverImage: '/images/blog/cover-seo-2026.jpg',
    coverAlt: 'Two options being weighed for a software project decision',
    category: 'Web development',
    tags: ['Web development', 'Agency selection', 'Kerala'],
  },
  {
    id: 'website-redesign-without-losing-seo',
    title: 'Website redesign without losing SEO: a Kerala business guide',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'A redesign can erase years of rankings if it ignores SEO. A practical checklist for modernising your site safely.',
    coverImage: '/images/blog/cover-vat-2026.jpg',
    coverAlt: 'Website before and after screenshots with analytics in the background',
    category: 'Web development',
    tags: ['Redesign', 'SEO', 'Websites'],
  },
  {
    id: 'react-nextjs-vs-wordpress-2026',
    title: 'React, Next.js or WordPress for your business site in 2026?',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'The technology behind your site decides its speed, flexibility and future-proofing. A plain-language comparison for business owners.',
    coverImage: '/images/blog/cover-cwv-gulf.jpg',
    coverAlt: 'Code editor and website preview side by side',
    category: 'Web development',
    tags: ['React', 'Next.js', 'WordPress'],
  },
  {
    id: 'website-speed-fix-guide',
    title: 'Website speed: why your site is slow and how to fix it',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'Slow sites lose visitors and rankings. The real causes of slow websites in 2026 — and the fixes that actually move the numbers.',
    coverImage: '/images/blog/cover-cwv-gulf.jpg',
    coverAlt: 'Laptop showing a website performance and speed report',
    category: 'Web development',
    tags: ['Performance', 'Speed', 'SEO'],
  },
  {
    id: 'thrissur-business-website-not-facebook',
    title: 'Why your Thrissur business needs a real website, not just Facebook',
    dateLabel: 'Aug 2026',
    dateIso: '2026-08-08',
    excerpt:
      'A Facebook page reaches followers; a website turns searches into customers. Why Thrissur businesses should own their online presence.',
    coverImage: '/images/blog/cover-gst-gulf.jpg',
    coverAlt: 'Local business owner in Thrissur checking a website on a laptop',
    category: 'Web development',
    tags: ['Thrissur', 'Websites', 'Local business'],
  },
] as const

export function blogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((p) => p.category)))
}

export function sortedBlogPostsByDate(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.dateIso.localeCompare(a.dateIso))
}
