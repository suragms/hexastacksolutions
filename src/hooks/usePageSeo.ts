import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

const META_NAME = 'description'
const CANONICAL_ID = 'hs-canonical'

type Options = {
  title: string
  description: string
  /** Path including leading slash, e.g. /services/web-design */
  canonicalPath?: string
}

export function usePageSeo({ title, description, canonicalPath }: Options) {
  const { pathname } = useLocation()
  const path = canonicalPath ?? pathname

  useEffect(() => {
    const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`
    document.title = fullTitle

    let meta = document.querySelector(`meta[name="${META_NAME}"]`) as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', META_NAME)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    const canonicalHref = `${site.siteUrl.replace(/\/$/, '')}${path}`
    let link = document.getElementById(CANONICAL_ID) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = CANONICAL_ID
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonicalHref

    return () => {
      // Leave meta/canonical in place; next page effect overwrites. Avoid flash on unmount.
    }
  }, [title, description, path])
}
