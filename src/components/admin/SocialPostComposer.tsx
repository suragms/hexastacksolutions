import { useState } from 'react'
import { site } from '../../data/site'
import { API_URL } from '@/lib/utils'
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

type Props = {
  projectTitle?: string
  projectDescription?: string
  techStack?: string
}

export function SocialPostComposer({ projectTitle, projectDescription, techStack }: Props) {
  const [body, setBody] = useState(defaultBody)
  const [hook, setHook] = useState('')
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)
  const pageUrl = `${site.siteUrl.replace(/\/$/, '')}/`
  const fullText = withCompanyBacklink(hook ? `${hook}\n\n${body}` : body)

  async function generate() {
    setGenerating(true)
    try {
      const token = sessionStorage.getItem('admin_token')
      const res = await fetch(`${API_URL}/api/ai/generate-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: projectTitle || 'HexaStack project update',
          description: projectDescription || body,
          techStack: techStack || '',
          platform: 'instagram',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(data.error || 'Generate failed')
        return
      }
      setHook(data.hook || '')
      const tags = Array.isArray(data.hashtags) ? data.hashtags.join(' ') : ''
      setBody(`${data.caption || ''}${tags ? `\n\n${tags}` : ''}`.trim())
    } finally {
      setGenerating(false)
    }
  }

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
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
        Social post builder
      </h2>
      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
        <p>
          Generate a first draft with a free/open LLM (or fallback), edit it, then Copy & Open. We append{' '}
          <code className="rounded bg-zinc-100 px-1 text-xs">{companySiteLine}</code>. No auto-publish to Meta/X.
        </p>
        <button
          type="button"
          disabled={generating}
          onClick={() => void generate()}
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {generating ? 'Generating…' : 'Generate post'}
        </button>
        {hook && (
          <p className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800">
            Hook: {hook}
          </p>
        )}
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
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-orange-200 hover:text-orange-800"
          >
            Open Instagram (paste)
          </a>
          <a
            href="https://studio.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-orange-200 hover:text-orange-800"
          >
            Open YouTube Studio
          </a>
        </div>
      </div>
    </section>
  )
}
