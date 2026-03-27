import { useCallback, useEffect, useState } from 'react'
import { readFounderPhotos } from '../lib/founderPhotos'

export function useFounderPhotos() {
  const [photos, setPhotos] = useState(() => readFounderPhotos())

  const refresh = useCallback(() => setPhotos(readFounderPhotos()), [])

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key?.startsWith('hs_founder_')) refresh()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('hs-founder-photos-updated', refresh)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('hs-founder-photos-updated', refresh)
    }
  }, [refresh])

  return photos
}
