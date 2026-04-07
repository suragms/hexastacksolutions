import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { site } from './data/site'

type PrerenderInput = { url: string }

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title:
      'HexaStack Solutions — Official Site | Web Design Kerala & Web Development Thrissur | SEO & Digital Marketing',
    description:
      'HexaStack Solutions — official website (hexastacksolutions.com). Web design, web development, SEO & digital marketing from Vadanappally, Thrissur, Kerala for India, UAE, Saudi Arabia, GCC & global clients. Kerala software company; Thrissur web agency.',
  },
  '/work': {
    title: 'Portfolio & case studies | Web design & software | Kerala, Gulf & global',
    description:
      'Selected websites, dashboards, e‑commerce, and custom software delivered for Kerala, UAE, Saudi Arabia, GCC, and global clients.',
  },
  '/services': {
    title: 'Web design, development & SEO services | Thrissur, Kerala | Gulf & global',
    description:
      'End-to-end delivery: website design, custom web applications, technical SEO, and digital marketing for Kerala, UAE, Saudi Arabia, GCC, and remote clients worldwide.',
  },
  '/services/web-design': {
    title: 'Website design & development Thrissur & Kerala | UAE & GCC | HexaStack',
    description:
      'Custom website design and development for Kerala, UAE, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar, and global teams: fast, SEO-ready, conversion-focused.',
  },
  '/services/web-applications': {
    title: 'Custom web applications & software | Thrissur, Kerala | MVPs & B2B portals',
    description:
      'Custom web applications and software for Kerala, GCC, and global teams: MVPs, internal portals, dashboards, and scalable products.',
  },
  '/services/seo': {
    title: 'SEO services Kerala & Gulf | technical SEO, content & local visibility',
    description:
      'Technical SEO, on-page optimization, content strategy, and digital marketing visibility for Kerala, UAE, Saudi Arabia, GCC, and India-wide queries.',
  },
  '/products/hexabill': {
    title: 'HexaBill',
    description:
      'HexaBill: POS, ERP, and VAT-ready billing software for retail and Gulf-facing businesses.',
  },
  '/about': {
    title: 'About HexaStack Solutions | Web & software studio Thrissur, Kerala | UAE & GCC clients',
    description:
      'Meet the HexaStack team: VAT-aware POS, billing, web apps, SEO, and digital marketing for Kerala, UAE, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar, and global B2B teams.',
  },
  '/blog': {
    title: 'Blog | VAT, POS, ERP, SEO & digital marketing | HexaStack Kerala & Gulf',
    description:
      'Articles on VAT billing UAE, POS and ERP rollout, technical SEO, web performance, and digital marketing for Kerala, UAE, Saudi Arabia, GCC, and global B2B teams.',
  },
  '/contact': {
    title: 'Contact HexaStack | Request a quote | Thrissur, Kerala | UAE & GCC projects',
    description:
      'Contact HexaStack Solutions in Vadanappally, Thrissur, Kerala. Quotes for web design, web development, SEO, digital marketing, custom software, POS, and VAT-aware billing.',
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
  const ogImageAlt = `${site.name} — ${fullTitle.replace(/\s*\|\s*HexaStack Solutions\s*$/i, '').trim()}`

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
        { type: 'meta', props: { property: 'og:type', content: 'website' } },
        { type: 'meta', props: { property: 'og:site_name', content: site.name } },
        { type: 'meta', props: { property: 'og:title', content: fullTitle } },
        { type: 'meta', props: { property: 'og:description', content: meta.description } },
        { type: 'meta', props: { property: 'og:url', content: canonical } },
        { type: 'meta', props: { property: 'og:image', content: site.defaultOgImage } },
        { type: 'meta', props: { property: 'og:image:alt', content: ogImageAlt } },
        { type: 'meta', props: { property: 'og:locale', content: 'en_IN' } },
        { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
        { type: 'meta', props: { name: 'twitter:title', content: fullTitle } },
        { type: 'meta', props: { name: 'twitter:description', content: meta.description } },
        { type: 'meta', props: { name: 'twitter:image', content: site.defaultOgImage } },
        { type: 'meta', props: { name: 'twitter:image:alt', content: ogImageAlt } },
      ]),
    },
  }
}
