/** Shown on the homepage when there are fewer than three approved reviews (fills the marquee). Replace by approving real client submissions in Admin. */
export type SeedTestimonial = { id: string; name: string; message: string }

export const testimonialsSeed: readonly SeedTestimonial[] = [
  {
    id: 'seed-kerala-retail',
    name: 'Retail owner · Kerala',
    message:
      'Clear timelines and a site we can update without calling devs every week. Local team that actually answers on WhatsApp.',
  },
  {
    id: 'seed-gulf-ops',
    name: 'Operations lead · UAE',
    message:
      'They understood VAT-facing copy and checkout flows for our Gulf customers — not generic “AI” filler.',
  },
  {
    id: 'seed-healthcare',
    name: 'Clinic admin · Thrissur district',
    message:
      'Booking and service pages are structured the way patients search. Google-friendly without looking robotic.',
  },
  {
    id: 'seed-b2b',
    name: 'B2B director · GCC',
    message:
      'Solid handoff: repo, docs, and a roadmap we could share with our finance team. Rare for a small studio.',
  },
]
