import { homePageFaqs } from '../../data/faq'
import { site } from '../../data/site'

/** FAQPage mainEntity Question/Answer for Google rich results (homepage only). */
export function FaqJsonLd() {
  const base = site.siteUrl.replace(/\/$/, '')
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homePageFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
    url: `${base}/`,
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
