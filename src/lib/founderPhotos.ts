export const FOUNDER_PHOTO_KEYS = {
  anandu: 'hs_founder_anandu_photo',
  surag: 'hs_founder_surag_photo',
} as const

export type FounderKey = keyof typeof FOUNDER_PHOTO_KEYS

export function readFounderPhotos(): { anandu: string | null; surag: string | null } {
  if (typeof window === 'undefined') return { anandu: null, surag: null }
  return {
    anandu: localStorage.getItem(FOUNDER_PHOTO_KEYS.anandu),
    surag: localStorage.getItem(FOUNDER_PHOTO_KEYS.surag),
  }
}

export function persistFounderPhoto(key: FounderKey, dataUrl: string | null) {
  const k = FOUNDER_PHOTO_KEYS[key]
  if (dataUrl) localStorage.setItem(k, dataUrl)
  else localStorage.removeItem(k)
  window.dispatchEvent(new Event('hs-founder-photos-updated'))
}
