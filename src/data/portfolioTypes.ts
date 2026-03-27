export const PORTFOLIO_CATEGORIES = [
  'Web Design',
  'Mobile Apps',
  'Dashboard / SaaS',
  'E-commerce',
  'Tourism / Travel',
  'Event Management',
  'Corporate / Business',
  'Portfolio / Personal',
  'Healthcare / Medical',
  'Education',
  'Cybersecurity',
  'Architecture & BIM',
  'Industrial & Manufacturing',
  'Energy & Sustainability',
  'AI / Tech Platforms',
] as const

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number]

export type PortfolioProject = {
  id: string
  title: string
  category: PortfolioCategory
  image: string
  imageAlt: string
  seoKeywords: readonly string[]
  shortDescription: string
  features: string[]
  uiHighlights: string[]
  techStack: string[]
  caseStudy: {
    problem: string
    solution: string
    outcome: string
  }
  gallery?: readonly string[]
  projectGroupId?: string
}
