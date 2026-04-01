import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

const META_NAME = 'description'
const baseUrl = site.siteUrl.replace(/\/$/, '')

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${baseUrl}${path}`
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

type Options = {
  title: string
  description: string
  /** Path including leading slash, e.g. /services/web-design */
  canonicalPath?: string
  /** Overrides default OG/Twitter image (absolute URL or site path starting with /) */
  ogImage?: string
}

export function usePageSeo({ title, description, canonicalPath, ogImage }: Options) {
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

    const canonicalHref = `${baseUrl}${path}`
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonicalHref

    const imageAbs = absoluteUrl(ogImage ?? site.defaultOgImage)

    setMetaProperty('og:type', 'website')
    setMetaProperty('og:title', fullTitle)
    setMetaProperty('og:description', description)
    setMetaProperty('og:url', canonicalHref)
    setMetaProperty('og:image', imageAbs)
    setMetaProperty('og:locale', 'en_IN')

    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', fullTitle)
    setMetaName('twitter:description', description)
    setMetaName('twitter:image', imageAbs)
  }, [title, description, path, ogImage])
}
