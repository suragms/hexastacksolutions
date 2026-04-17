import { useEffect } from 'react'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID) return

    const gtagScriptId = 'gtag-js'
    if (!document.getElementById(gtagScriptId)) {
      const script = document.createElement('script')
      script.id = gtagScriptId
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(script)
    }

    const inlineId = 'gtag-init'
    if (!document.getElementById(inlineId)) {
      const inline = document.createElement('script')
      inline.id = inlineId
      inline.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { anonymize_ip: true });
      `
      document.head.appendChild(inline)
    }
  }, [])

  return null
}
