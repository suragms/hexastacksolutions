/** Homepage FAQ copy — shared with FAQ section and FAQPage JSON-LD. */
export type FaqItem = { q: string; a: string }

export const homePageFaqs: readonly FaqItem[] = [
  {
    q: 'How do you price projects?',
    a: 'We scope milestones with fixed deliverables for clarity. Larger programs can run in monthly product increments with a shared roadmap.',
  },
  {
    q: 'What is a typical timeline?',
    a: 'Marketing sites often land in 4–8 weeks. Product work depends on integrations and compliance needs; we’ll give you a week-by-week plan after discovery.',
  },
  {
    q: 'Which stack do you use?',
    a: 'We usually ship with modern React ecosystems and a pragmatic backend choice for your scale, prioritizing maintainability, observability, and performance.',
  },
  {
    q: 'Do you provide ongoing support?',
    a: 'Yes: launch is the beginning. We offer retainers for improvements, monitoring, and iterative releases.',
  },
  {
    q: 'Can you work with our internal team?',
    a: 'Absolutely. We integrate with your designers and engineers, document decisions, and keep workflows transparent.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a short call. We’ll confirm fit, outline next steps, and share a proposal with assumptions and milestones.',
  },
]
