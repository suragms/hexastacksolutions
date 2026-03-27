import { site } from '../data/site'

/** Always append for LinkedIn / copy-friendly posts */
export const companySiteLine = `${site.siteUrl.replace(/\/$/, '')}/`

export function withCompanyBacklink(body: string): string {
  const t = body.trim()
  if (t.includes('hexastacksolutions.com')) return t
  return `${t}\n\n${companySiteLine}`
}

export function linkedInShareUrl(pageUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
}

export function twitterIntentUrl(text: string, pageUrl: string): string {
  const p = new URLSearchParams()
  p.set('text', text)
  p.set('url', pageUrl)
  return `https://twitter.com/intent/tweet?${p.toString()}`
}

export function facebookShareUrl(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
}

export function whatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
