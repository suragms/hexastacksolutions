import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { site } from './data/site'

type PrerenderInput = { url: string }

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title:
      'HexaStack Solutions — Web Design Kerala & Web Development Thrissur | SEO | Gulf UAE & Global',
    description:
      'HexaStack Solutions — web design & web development Thrissur, Kerala; custom software for India, UAE, Saudi Arabia, GCC & global clients.',
  },
  '/work': {
    title: 'Our Work & Portfolio',
    description:
      'Websites and products we have shipped across Kerala, the Gulf, and global clients. Browse categories and case studies.',
  },
  '/services': {
    title: 'Services',
    description:
      'Website design, web app development, and SEO services by HexaStack Solutions for Kerala, GCC, and global businesses.',
  },
  '/services/web-design': {
    title: 'Website Design & Development',
    description:
      'Conversion-focused web design and development for Kerala and Gulf businesses, from strategy to launch.',
  },
  '/services/web-applications': {
    title: 'Web Application Development',
    description:
      'Custom web applications, dashboards, and portals built for reliability, scale, and measurable outcomes.',
  },
  '/services/seo': {
    title: 'SEO Services',
    description:
      'Technical SEO, on-page optimization, and content strategy to improve visibility and qualified enquiries.',
  },
  '/products/hexabill': {
    title: 'HexaBill',
    description:
      'HexaBill: POS, ERP, and VAT-ready billing software for retail and Gulf-facing businesses.',
  },
  '/about': {
    title: 'About HexaStack Solutions',
    description:
      'Meet the founders and approach behind HexaStack Solutions, a Kerala software studio serving Gulf and global teams.',
  },
  '/blog': {
    title: 'Blog',
    description:
      'Practical articles on VAT, POS, ERP, SEO, and digital product execution for Kerala and Gulf business teams.',
  },
  '/contact': {
    title: 'Contact & Request a Quote',
    description:
      'Contact HexaStack Solutions in Vadanappally, Thrissur for websites, custom software, POS, and VAT-aware systems.',
  },
  '/terms': { title: 'Terms of Service', description: 'Terms of Service for HexaStack Solutions.' },
  '/privacy': { title: 'Privacy Policy', description: 'Privacy Policy for HexaStack Solutions.' },
  '/security': { title: 'Security Practices', description: 'Security practices for HexaStack Solutions projects.' },
  '/rules': {
    title: 'Project & Communication Rules',
    description: 'How we work with clients: communication, scope, and delivery rules.',
  },
  '/refund-policy': {
    title: 'Refund Policy',
    description: 'Refund and cancellation policy for HexaStack Solutions services.',
  },
}

export async function prerender({ url }: PrerenderInput) {
  const meta = routeMeta[url] ?? routeMeta['/']
  const fullTitle = meta.title.includes(site.name) ? meta.title : `${meta.title} | ${site.name}`
  const canonical = `${site.siteUrl.replace(/\/$/, '')}${url}`

  const html = renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )

  return {
    html,
    links: new Set(Object.keys(routeMeta)),
    head: {
      title: fullTitle,
      elements: new Set([
        { type: 'meta', props: { name: 'description', content: meta.description } },
        { type: 'link', props: { rel: 'canonical', href: canonical } },
        { type: 'meta', props: { property: 'og:title', content: fullTitle } },
        { type: 'meta', props: { property: 'og:description', content: meta.description } },
        { type: 'meta', props: { property: 'og:url', content: canonical } },
        { type: 'meta', props: { property: 'og:image', content: site.defaultOgImage } },
        { type: 'meta', props: { name: 'twitter:title', content: fullTitle } },
        { type: 'meta', props: { name: 'twitter:description', content: meta.description } },
        { type: 'meta', props: { name: 'twitter:image', content: site.defaultOgImage } },
      ]),
    },
  }
}

