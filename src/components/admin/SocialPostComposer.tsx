import { useState } from 'react'
import { site } from '../../data/site'
import {
  companySiteLine,
  facebookShareUrl,
  linkedInShareUrl,
  twitterIntentUrl,
  whatsAppShareUrl,
  withCompanyBacklink,
} from '../../lib/socialShare'

const defaultBody = `HexaStack builds VAT-ready POS, billing, and fast websites for Kerala and Gulf businesses.

Reply on WhatsApp or book a call—we usually respond within one business day.`

export function SocialPostComposer() {
  const [body, setBody] = useState(defaultBody)
  const [copied, setCopied] = useState(false)
  const pageUrl = `${site.siteUrl.replace(/\/$/, '')}/`
  const fullText = withCompanyBacklink(body)

  async function copyFull() {
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('Could not copy. Select the text manually.')
    }
  }

  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Social post builder</h2>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-sm text-zinc-600 space-y-4">
        <p>
          Draft a post; we append your live site line <code className="rounded bg-zinc-100 px-1 text-xs">{companySiteLine}</code>{' '}
          for backlinks. Copy the text, then use the share links (LinkedIn and X open with your URL; Instagram has no web
          share API—paste there manually).
        </p>
        <div>
          <label htmlFor="social-body" className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Post body
          </label>
          <textarea
            id="social-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Preview with backlink</p>
          <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-xs text-zinc-700">
            {fullText}
          </pre>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copyFull()}
            className="rounded-lg bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700"
          >
            {copied ? 'Copied' : 'Copy full text'}
          </button>
          <a
            href={linkedInShareUrl(pageUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-orange-200 hover:text-orange-800"
          >
            Share on LinkedIn
          </a>
          <a
            href={twitterIntentUrl(fullText.slice(0, 220), pageUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-orange-200 hover:text-orange-800"
          >
            Post on X (Twitter)
          </a>
          <a
            href={facebookShareUrl(pageUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-orange-200 hover:text-orange-800"
          >
            Share on Facebook
          </a>
          <a
            href={whatsAppShareUrl(fullText)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-orange-200 hover:text-orange-800"
          >
            Send in WhatsApp
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-500 hover:border-orange-200"
          >
            Instagram (paste manually)
          </a>
          <a
            href="https://www.youtube.com/upload"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-500 hover:border-orange-200"
          >
            YouTube Studio
          </a>
        </div>
      </div>
    </section>
  )
}
