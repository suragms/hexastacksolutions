import { useCallback, useEffect, useRef, useState } from 'react'
import type { VisitRecord } from '../components/layout/Layout'
import type { FounderKey } from '../lib/founderPhotos'
import { persistFounderPhoto, readFounderPhotos } from '../lib/founderPhotos'
import { SocialPostComposer } from '../components/admin/SocialPostComposer'
import {
  addAdminCategory,
  deleteOperationalProduct,
  hydrateAdminContentFromServer,
  readAdminCategories,
  readOperationalProducts,
  removeAdminCategory,
  upsertOperationalProduct,
  type OperationalProduct,
} from '../lib/adminContent'
import {
  fetchContactEnquiriesFromApi,
  markContactReadOnApi,
  mergeApiAndLocalInbox,
} from '../lib/contactApi'
import { hydrateContactInboxFromServer, markContactRead, readContactMessages, type ContactMessage } from '../lib/contactInbox'
import { usePageSeo } from '../hooks/usePageSeo'
import {
  addAdminTestimonial,
  approveTestimonial,
  deleteTestimonial,
  hydrateTestimonialsFromServer,
  readTestimonials,
} from '../lib/testimonials'
/** Set `VITE_ADMIN_PASSWORD` in `.env` (see `.env.example`). Defaults for local dev only. */
const ADMIN_PASSWORD = String(import.meta.env.VITE_ADMIN_PASSWORD ?? 'hexastack2025')
const rawAdminUser = import.meta.env.VITE_ADMIN_USER
const ADMIN_USER = typeof rawAdminUser === 'string' && rawAdminUser.trim() !== '' ? rawAdminUser.trim() : ''

const LS_KEY = 'hs_analytics'
const AUTH_KEY = 'hs_admin_auth'

// --- Helpers ---

function readVisits(): VisitRecord[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
}

function dayLabel(daysAgo: number): string {
  if (daysAgo === 0) return 'Today'
  if (daysAgo === 1) return 'Yesterday'
  const d = new Date(); d.setDate(d.getDate() - daysAgo)
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

function startOfDay(daysAgo: number): number {
  const d = new Date(); d.setDate(d.getDate() - daysAgo)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function countBy<T>(arr: T[], key: (x: T) => string): Record<string, number> {
  return arr.reduce<Record<string, number>>((acc, x) => {
    const k = key(x); acc[k] = (acc[k] ?? 0) + 1; return acc
  }, {})
}

// ─── Tiny SVG bar chart ──────────────────────────────────────────────────────

function BarChart({ data, color = '#ea580c' }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const W = 480; const H = 120; const BAR_W = Math.min(40, (W / data.length) - 8)
  const gap = (W - data.length * BAR_W) / (data.length + 1)

  return (
    <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full" aria-label="Bar chart">
      {data.map((d, i) => {
        const barH = (d.value / max) * H
        const x = gap + i * (BAR_W + gap)
        const y = H - barH
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={BAR_W} height={barH} rx="4" fill={color} opacity="0.85" />
            <text x={x + BAR_W / 2} y={H + 16} textAnchor="middle" fontSize="10" fill="#71717a">
              {d.label}
            </text>
            {d.value > 0 && (
              <text x={x + BAR_W / 2} y={y - 4} textAnchor="middle" fontSize="10" fill={color} fontWeight="600">
                {d.value}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// --- Tiny SVG donut ---

function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const R = 45; const cx = 60; const cy = 60
  let angle = -Math.PI / 2
  const paths = segments.map((seg) => {
    const sweep = (seg.value / total) * 2 * Math.PI
    const x1 = cx + R * Math.cos(angle)
    const y1 = cy + R * Math.sin(angle)
    angle += sweep
    const x2 = cx + R * Math.cos(angle)
    const y2 = cy + R * Math.sin(angle)
    const large = sweep > Math.PI ? 1 : 0
    return { ...seg, d: `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} Z` }
  })

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 120 120" className="w-28 shrink-0">
        {paths.map((p) => (
          <path key={p.label} d={p.d} fill={p.color} opacity="0.9" />
        ))}
        <circle cx={cx} cy={cy} r={R * 0.55} fill="white" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#18181b" fontWeight="700">
          {total}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="8" fill="#71717a">
          total
        </text>
      </svg>
      <ul className="space-y-1.5">
        {paths.map((p) => (
          <li key={p.label} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: p.color }} />
            <span className="text-zinc-600">{p.label}</span>
            <span className="ml-auto font-semibold text-zinc-800">
              {total > 0 ? Math.round((p.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── KPI card ────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-zinc-400">{sub}</p>}
    </div>
  )
}

// --- Main page ---

export function AdminPage() {
  usePageSeo({
    title: 'Admin',
    description: 'Sign in to the HexaStack admin dashboard to manage enquiries, testimonials, and content.',
    canonicalPath: '/admin',
    robots: 'noindex, nofollow',
  })

  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === '1')
  const [pw, setPw] = useState('')
  const [userId, setUserId] = useState('')
  const [err, setErr] = useState('')
  const [visits, setVisits] = useState<VisitRecord[]>([])
  const [tick, setTick] = useState(0)
  const [founderPhotos, setFounderPhotos] = useState(() => readFounderPhotos())
  const [inbox, setInbox] = useState<ContactMessage[]>(() => readContactMessages())

  const refreshInbox = useCallback(async () => {
    const local = readContactMessages()
    const fromApi = await fetchContactEnquiriesFromApi()
    if (fromApi !== null) {
      setInbox(mergeApiAndLocalInbox(fromApi, local))
      return
    }
    await hydrateContactInboxFromServer()
    setInbox(readContactMessages())
  }, [])
  const [adminCatList, setAdminCatList] = useState(() => readAdminCategories())
  const [newCatInput, setNewCatInput] = useState('')
  const [opList, setOpList] = useState<OperationalProduct[]>(() => readOperationalProducts())
  const [opTitle, setOpTitle] = useState('')
  const [opDesc, setOpDesc] = useState('')
  const [opHref, setOpHref] = useState('https://www.hexastacksolutions.com/')
  const [opCta, setOpCta] = useState('Learn more')
  const [opImg, setOpImg] = useState<string | null>(null)
  const [adminTab, setAdminTab] = useState<
    'messages' | 'reviews' | 'analytics' | 'content' | 'social' | 'help'
  >('messages')
  const [revName, setRevName] = useState('')
  const [revMsg, setRevMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Reload on tick (after clear)
  useEffect(() => { setVisits(readVisits()) }, [tick, authed])

  useEffect(() => {
    function syncFounders() {
      setFounderPhotos(readFounderPhotos())
    }
    window.addEventListener('hs-founder-photos-updated', syncFounders)
    return () => window.removeEventListener('hs-founder-photos-updated', syncFounders)
  }, [])

  useEffect(() => {
    function syncInbox() {
      void refreshInbox()
    }
    window.addEventListener('hs-contact-inbox-updated', syncInbox)
    return () => window.removeEventListener('hs-contact-inbox-updated', syncInbox)
  }, [refreshInbox])

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === 'hs_contact_inbox') {
        void refreshInbox()
        return
      }
      if (e.key === 'hs_admin_blog_categories' || e.key === 'hs_operational_products') {
        setAdminCatList(readAdminCategories())
        setOpList(readOperationalProducts())
        return
      }
      if (e.key === 'hs_testimonials_v1') {
        setTick((t) => t + 1)
        return
      }
      if (e.key === LS_KEY) {
        setVisits(readVisits())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [refreshInbox])

  useEffect(() => {
    if (!authed) return
    void refreshInbox()
    void hydrateTestimonialsFromServer()
    void hydrateAdminContentFromServer()
  }, [authed, tick, refreshInbox])

  useEffect(() => {
    function syncContent() {
      setAdminCatList(readAdminCategories())
      setOpList(readOperationalProducts())
    }
    window.addEventListener('hs-admin-content-updated', syncContent)
    return () => window.removeEventListener('hs-admin-content-updated', syncContent)
  }, [])

  useEffect(() => {
    function syncReviews() {
      setTick((t) => t + 1)
    }
    window.addEventListener('hs-testimonials-updated', syncReviews)
    return () => window.removeEventListener('hs-testimonials-updated', syncReviews)
  }, [])

  // Auto-refresh every 30 s
  useEffect(() => {
    if (!authed) return
    const id = setInterval(() => setTick((t) => t + 1), 30_000)
    return () => clearInterval(id)
  }, [authed])

  function login() {
    if (ADMIN_USER && userId.trim() !== ADMIN_USER) {
      setErr('Incorrect username or password.')
      inputRef.current?.focus()
      return
    }
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, '1')
      setAuthed(true)
      setErr('')
    } else {
      setErr('Incorrect password.')
      inputRef.current?.focus()
    }
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY)
    setAuthed(false)
    setPw('')
  }

  function clearData() {
    if (confirm('Delete all tracked analytics data?')) {
      localStorage.removeItem(LS_KEY)
      setTick((t) => t + 1)
    }
  }

  async function compressImageToJpeg(file: File): Promise<string> {
    const maxW = 480
    const maxBytes = 420_000
    const bitmap = await createImageBitmap(file)
    let w = bitmap.width
    let h = bitmap.height
    if (w > maxW) {
      h = Math.round((h * maxW) / w)
      w = maxW
    }
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas not supported')
    ctx.drawImage(bitmap, 0, 0, w, h)
    bitmap.close()
    let q = 0.82
    let dataUrl = canvas.toDataURL('image/jpeg', q)
    while (dataUrl.length > maxBytes * 1.4 && q > 0.42) {
      q -= 0.06
      dataUrl = canvas.toDataURL('image/jpeg', q)
    }
    return dataUrl
  }

  async function onOperationalFile(file: File | null) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.')
      return
    }
    try {
      setOpImg(await compressImageToJpeg(file))
    } catch {
      alert('Could not process image.')
    }
  }

  function saveOperationalProduct() {
    const title = opTitle.trim()
    if (!title) {
      alert('Add a title first.')
      return
    }
    upsertOperationalProduct({
      id: `op-${Date.now()}`,
      title,
      description: opDesc.trim(),
      href: opHref.trim() || 'https://www.hexastacksolutions.com/',
      ctaLabel: opCta.trim() || 'Learn more',
      imageDataUrl: opImg,
    })
    setOpList(readOperationalProducts())
    setOpTitle('')
    setOpDesc('')
    setOpHref('https://www.hexastacksolutions.com/')
    setOpCta('Learn more')
    setOpImg(null)
  }

  async function onFounderFile(key: FounderKey, file: File | null) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (JPG or PNG).')
      return
    }
    try {
      const dataUrl = await compressImageToJpeg(file)
      persistFounderPhoto(key, dataUrl)
    } catch {
      alert('Could not process that image. Try a smaller JPG or PNG.')
    }
  }

  function clearFounderPhoto(key: FounderKey) {
    persistFounderPhoto(key, null)
  }

  function exportVisitsJson() {
    const blob = new Blob([JSON.stringify(visits, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `hexastack-visits-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  // --- Login gate ---
  if (!authed) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-zinc-50 p-4">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <span className="font-bold text-lg">
              <span className="text-zinc-900">Hexa</span>
              <span className="text-orange-600">stack</span>
            </span>
            <p className="mt-1 text-sm text-zinc-500">Admin Analytics</p>
          </div>
          {ADMIN_USER && (
            <>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Username</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                className="mb-4 w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="Admin username"
                autoComplete="username"
                autoFocus
              />
            </>
          )}
          <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
          <input
            ref={inputRef}
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            placeholder="Enter admin password"
            autoFocus={!ADMIN_USER}
            autoComplete="current-password"
          />
          {err && <p className="mt-1 text-xs text-red-500">{err}</p>}
          <button
            onClick={login}
            className="mt-4 w-full rounded-xl bg-orange-600 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            Sign in
          </button>
        </div>
      </div>
    )
  }

  // --- Compute analytics ---
  const now = Date.now()
  const DAY = 86_400_000

  const today = visits.filter((v) => v.ts >= startOfDay(0))
  const yesterday = visits.filter((v) => v.ts >= startOfDay(1) && v.ts < startOfDay(0))
  const week = visits.filter((v) => v.ts >= now - 7 * DAY)
  const visits24h = visits.filter((v) => v.ts >= now - 24 * DAY)
  const uniquePagesWeek = new Set(week.map((v) => v.page)).size

  const dailyCounts = Array.from({ length: 7 }, (_, i) => {
    const daysAgo = 6 - i
    const from = startOfDay(daysAgo)
    const to = daysAgo === 0 ? Infinity : startOfDay(daysAgo - 1)
    return { label: dayLabel(daysAgo).split(' ')[0], value: visits.filter((v) => v.ts >= from && v.ts < to).length }
  })

  const sourceCounts = countBy(week, (v) => v.source)
  const deviceCounts = countBy(week, (v) => v.device)
  const pageCounts = countBy(week, (v) => v.page)

  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)

  const sourceColors: Record<string, string> = {
    Direct: '#ea580c', Organic: '#16a34a', Social: '#7c3aed', Referral: '#0284c7',
  }
  const deviceColors: Record<string, string> = {
    Desktop: '#ea580c', Mobile: '#7c3aed', Tablet: '#16a34a',
  }

  const sourceSegments = Object.entries(sourceCounts).map(([label, value]) => ({
    label, value, color: sourceColors[label] ?? '#6b7280',
  }))
  const deviceSegments = Object.entries(deviceCounts).map(([label, value]) => ({
    label, value, color: deviceColors[label] ?? '#6b7280',
  }))

  const recent = [...visits].reverse().slice(0, 30)

  const hourBuckets = Array.from({ length: 24 }, (_, h) => ({
    label: `${h}h`,
    value: today.filter((v) => new Date(v.ts).getHours() === h).length,
  }))
  const peakHourToday = hourBuckets.reduce(
    (best, cur) => (cur.value > best.value ? cur : best),
    hourBuckets[0] ?? { label: '0h', value: 0 },
  )

  const unreadContacts = inbox.filter((m) => !m.read).length
  const pendingReviewsCount = readTestimonials().filter((t) => !t.approved).length
  const testimonialRows = readTestimonials()

  // --- Dashboard ---
  const tabBtn = (id: typeof adminTab, label: string) => (
    <button
      key={id}
      type="button"
      role="tab"
      aria-selected={adminTab === id}
      onClick={() => setAdminTab(id)}
      className={`shrink-0 rounded-t-lg border border-b-0 px-4 py-2.5 text-sm font-semibold transition ${
        adminTab === id
          ? 'border-zinc-200 bg-white text-orange-700 shadow-sm'
          : 'border-transparent text-zinc-500 hover:text-zinc-800'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex min-h-svh flex-col bg-zinc-50">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <span className="font-bold">
              <span className="text-zinc-900">Hexa</span>
              <span className="text-orange-600">stack</span>
            </span>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
              Analytics
            </span>
            {unreadContacts > 0 && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                {unreadContacts} new contact{unreadContacts === 1 ? '' : 's'}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportVisitsJson}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-orange-200 hover:text-orange-700"
            >
              Export JSON
            </button>
            <button
              onClick={clearData}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-red-200 hover:text-red-600"
            >
              Clear data
            </button>
            <button
              onClick={logout}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="scrollbar-thin flex shrink-0 gap-1 overflow-x-auto border-b border-zinc-200 bg-zinc-100/80 px-4 pt-2 md:px-6" role="tablist" aria-label="Admin">
        {tabBtn('messages', `Messages${unreadContacts > 0 ? ` (${unreadContacts})` : ''}`)}
        {tabBtn('reviews', `Reviews${pendingReviewsCount > 0 ? ` (${pendingReviewsCount})` : ''}`)}
        {tabBtn('analytics', 'Analytics')}
        {tabBtn('content', 'Site content')}
        {tabBtn('social', 'Social')}
        {tabBtn('help', 'Help')}
      </div>

      <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-hidden px-4 pb-8 md:px-6">
        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-y-auto overscroll-y-contain py-6 [-webkit-overflow-scrolling:touch]">

        {adminTab === 'analytics' && visits.length === 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
            <strong>No data yet.</strong> Analytics are collected as visitors browse the site in
            this browser. Data accumulates with real visits; share the site and data will appear
            here. For cross-device data, connect Google Analytics (see Help tab).
          </div>
        )}

        {adminTab === 'messages' && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Contact inquiries
          </h2>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm text-zinc-600">
              Contact form submissions are loaded from the site API (<code className="rounded bg-zinc-100 px-1 text-xs">GET /api/contact</code>
              ). Messages saved only in this browser (offline fallback) are merged in. Mark as read after you reply.
            </p>
            {inbox.length === 0 ? (
              <p className="text-sm text-zinc-400">No messages yet. Submit the contact form on the site to test.</p>
            ) : (
              <ul className="space-y-4">
                {inbox.map((m) => (
                  <li
                    key={m.id}
                    className={`rounded-xl border p-4 ${m.read ? 'border-zinc-100 bg-zinc-50/50' : 'border-orange-200 bg-orange-50/30'}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-zinc-800">{m.name}</p>
                        <a href={`mailto:${encodeURIComponent(m.email)}`} className="text-sm text-orange-600 hover:underline">
                          {m.email}
                        </a>
                        {m.product && (
                          <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                            product: {m.product}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-zinc-400">{fmtTime(m.ts)}</span>
                        {!m.read && (
                          <button
                            type="button"
                            onClick={() => {
                              void (async () => {
                                if (m.id.startsWith('m-')) {
                                  markContactRead(m.id)
                                  await refreshInbox()
                                  return
                                }
                                const ok = await markContactReadOnApi(m.id)
                                if (ok) {
                                  setInbox((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: true } : x)))
                                }
                              })()
                            }}
                            className="text-xs font-semibold text-orange-700 hover:underline"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-700">{m.message}</p>
                    <p className="mt-2 text-xs text-zinc-500">
                      Reply by email or WhatsApp, then mark read. Ensure <code className="rounded bg-zinc-100 px-0.5">DATABASE_URL</code> is set on the API host so submissions persist.
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        )}

        {adminTab === 'reviews' && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Homepage client reviews
          </h2>
          <div className="space-y-8">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-sm text-zinc-600">
              <p className="mb-4">
                Public submissions from the site land here as <strong>pending</strong>. Approve to show on the home page
                marquee (stored in this browser&rsquo;s{' '}
                <code className="rounded bg-zinc-100 px-1 text-xs">localStorage</code>). For production, connect a backend
                or email. For Google trust, ask happy clients to leave a review on your Business Profile and set{' '}
                <code className="rounded bg-zinc-100 px-1 text-xs">VITE_GOOGLE_REVIEW_URL</code> in{' '}
                <code className="rounded bg-zinc-100 px-1 text-xs">.env</code>.
              </p>
            </div>

            {pendingReviewsCount > 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900">Pending approval</h3>
                <ul className="mt-4 space-y-4">
                  {testimonialRows
                    .filter((t) => !t.approved)
                    .map((t) => (
                      <li key={t.id} className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className="font-semibold text-zinc-800">{t.name}</p>
                          <span className="text-xs text-zinc-400">{fmtTime(t.ts)}</span>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">{t.message}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              approveTestimonial(t.id)
                              setTick((x) => x + 1)
                            }}
                            className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-700"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Delete this submission?')) {
                                deleteTestimonial(t.id)
                                setTick((x) => x + 1)
                              }
                            }}
                            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">Add approved review (manual)</h3>
              <div className="mt-4 grid gap-3 sm:max-w-lg">
                <input
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="Client name / role"
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <textarea
                  value={revMsg}
                  onChange={(e) => setRevMsg(e.target.value)}
                  placeholder="Short testimonial"
                  rows={3}
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const n = revName.trim()
                    const m = revMsg.trim()
                    if (n.length < 2 || m.length < 10) {
                      alert('Enter a name and at least 10 characters of feedback.')
                      return
                    }
                    addAdminTestimonial(n, m)
                    setRevName('')
                    setRevMsg('')
                    setTick((x) => x + 1)
                  }}
                  className="w-full rounded-xl bg-orange-600 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 sm:w-auto sm:px-6"
                >
                  Save as approved
                </button>
              </div>
            </div>

            {testimonialRows.filter((t) => t.approved).length > 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900">Published (on homepage)</h3>
                <ul className="mt-4 space-y-4">
                  {testimonialRows
                    .filter((t) => t.approved)
                    .map((t) => (
                      <li key={t.id} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className="font-semibold text-zinc-800">{t.name}</p>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Remove from homepage?')) {
                                deleteTestimonial(t.id)
                                setTick((x) => x + 1)
                              }
                            }}
                            className="text-xs font-semibold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">{t.message}</p>
                        <p className="mt-2 text-xs text-zinc-400">
                          {t.source === 'admin' ? 'Added manually' : 'Approved from public'} · {fmtTime(t.ts)}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
        )}

        {adminTab === 'content' && (
        <>
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Blog categories (extra tags) &amp; operational products
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-sm text-zinc-600">
              <p className="mb-3">
                Add filter labels that appear on the Blog page (merged with categories from{' '}
                <code className="rounded bg-zinc-100 px-1 text-xs">blogPosts.ts</code>). For a new label to filter
                posts, set a post&rsquo;s <code className="rounded bg-zinc-100 px-1 text-xs">category</code> in that file
                to the same text (or use an existing category name).
              </p>
              <div className="flex gap-2">
                <input
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  placeholder="e.g. Gulf VAT"
                  className="min-w-0 flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    addAdminCategory(newCatInput)
                    setAdminCatList(readAdminCategories())
                    setNewCatInput('')
                  }}
                  className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700"
                >
                  Add
                </button>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {adminCatList.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => {
                        removeAdminCategory(c)
                        setAdminCatList(readAdminCategories())
                      }}
                      className="text-red-600 hover:underline"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-sm text-zinc-600">
              <p className="mb-3">
                <strong>Operational products</strong> show on the home page when you save at least one. Image is stored
                in localStorage (compressed).
              </p>
              <div className="space-y-2">
                <input
                  value={opTitle}
                  onChange={(e) => setOpTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <textarea
                  value={opDesc}
                  onChange={(e) => setOpDesc(e.target.value)}
                  placeholder="Short description"
                  rows={2}
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <input
                  value={opHref}
                  onChange={(e) => setOpHref(e.target.value)}
                  placeholder="https://…"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <input
                  value={opCta}
                  onChange={(e) => setOpCta(e.target.value)}
                  placeholder="Button label"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <label className="inline-flex cursor-pointer rounded-xl border border-dashed border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-600 hover:border-orange-300">
                  Upload image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => void onOperationalFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                {opImg && <p className="text-xs text-green-700">Image ready ({Math.round(opImg.length / 1024)} KB data)</p>}
                <button
                  type="button"
                  onClick={saveOperationalProduct}
                  className="w-full rounded-xl bg-orange-600 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  Save product to home page
                </button>
              </div>
              <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
                {opList.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-2 text-xs">
                    <span className="font-medium text-zinc-800">{p.title}</span>
                    <button
                      type="button"
                      onClick={() => {
                        deleteOperationalProduct(p.id)
                        setOpList(readOperationalProducts())
                      }}
                      className="shrink-0 text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Founder photos (About page) */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Founder photos (About page)</h2>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-sm text-zinc-600">
            <p className="mb-4">
              Upload headshots for Anandu and Surag. Images are stored in this browser&rsquo;s{' '}
              <code className="rounded bg-zinc-100 px-1 text-xs">localStorage</code> (compressed JPEG) and shown on the public About page.
              For production, replace with a CMS or static assets later.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Anandu Krishna</p>
                <div className="mt-3 flex items-center gap-4">
                  {founderPhotos.anandu ? (
                    <img
                      src={founderPhotos.anandu}
                      alt="Preview Anandu"
                      className="h-16 w-16 rounded-full object-cover ring-1 ring-zinc-200"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-400">No photo</div>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="cursor-pointer rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-700">
                      Upload
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => void onFounderFile('anandu', e.target.files?.[0] ?? null)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => clearFounderPhoto('anandu')}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Surag</p>
                <div className="mt-3 flex items-center gap-4">
                  {founderPhotos.surag ? (
                    <img
                      src={founderPhotos.surag}
                      alt="Preview Surag"
                      className="h-16 w-16 rounded-full object-cover ring-1 ring-zinc-200"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-400">No photo</div>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="cursor-pointer rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-700">
                      Upload
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => void onFounderFile('surag', e.target.files?.[0] ?? null)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => clearFounderPhoto('surag')}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        </>
        )}

        {adminTab === 'analytics' && (
        <>
        {/* KPIs */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <KpiCard label="Today's pageviews" value={today.length} sub={`Yesterday: ${yesterday.length}`} />
            <KpiCard label="Last 24 hours" value={visits24h.length} sub="Rolling window" />
            <KpiCard label="This week" value={week.length} sub="Last 7 days" />
            <KpiCard label="All time tracked" value={visits.length} sub="In this browser" />
            <KpiCard label="Unique pages (7d)" value={uniquePagesWeek} sub="Distinct paths" />
            <KpiCard
              label="Most popular page"
              value={topPages[0]?.[0] ?? 'None yet'}
              sub={topPages[0] ? `${topPages[0][1]} views this week` : undefined}
            />
          </div>
          {today.length > 0 && (
            <p className="mt-3 text-xs text-zinc-500">
              Peak hour today:{' '}
              <span className="font-semibold text-zinc-700">
                {peakHourToday.value > 0 ? `${peakHourToday.label} (${peakHourToday.value} views)` : 'n/a'}
              </span>
            </p>
          )}
        </section>

        {/* Daily chart */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Daily pageviews (last 7 days)</h2>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <BarChart data={dailyCounts} color="#ea580c" />
          </div>
        </section>

        {today.length > 0 && (
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Today by hour (local time)</h2>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <BarChart data={hourBuckets} color="#7c3aed" />
            </div>
          </section>
        )}

        {/* Source + Device */}
        <div className="grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Traffic Sources (7 days)</h2>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              {sourceSegments.length > 0
                ? <DonutChart segments={sourceSegments} />
                : <p className="text-sm text-zinc-400">No data yet</p>}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Device Breakdown (7 days)</h2>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              {deviceSegments.length > 0
                ? <DonutChart segments={deviceSegments} />
                : <p className="text-sm text-zinc-400">No data yet</p>}
            </div>
          </section>
        </div>

        {/* Top pages */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Top Pages (7 days)</h2>
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">Page</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-400">Views</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-400">Share</th>
                </tr>
              </thead>
              <tbody>
                {topPages.length === 0
                  ? <tr><td colSpan={3} className="px-5 py-4 text-zinc-400">No data yet</td></tr>
                  : topPages.map(([page, count]) => (
                    <tr key={page} className="border-b border-zinc-50 hover:bg-zinc-50">
                      <td className="px-5 py-3 font-medium text-zinc-700">{page}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-zinc-600">{count}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="ml-auto flex items-center justify-end gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-zinc-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-orange-500"
                              style={{ width: `${Math.round((count / (topPages[0]?.[1] ?? 1)) * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-zinc-400 w-8 text-right">
                            {week.length > 0 ? `${Math.round((count / week.length) * 100)}%` : '0%'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent visits */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Recent Visits (latest 30)</h2>
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">Time</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">Page</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">Source</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">Device</th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0
                  ? <tr><td colSpan={4} className="px-5 py-4 text-zinc-400">No visits recorded yet</td></tr>
                  : recent.map((v, i) => (
                    <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50">
                      <td className="px-5 py-2.5 text-xs text-zinc-400 whitespace-nowrap">{fmtTime(v.ts)}</td>
                      <td className="px-5 py-2.5 font-medium text-zinc-700">{v.page}</td>
                      <td className="px-5 py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          v.source === 'Organic' ? 'bg-green-50 text-green-700' :
                          v.source === 'Social'  ? 'bg-purple-50 text-purple-700' :
                          v.source === 'Referral'? 'bg-blue-50 text-blue-700' :
                                                   'bg-orange-50 text-orange-700'
                        }`}>{v.source}</span>
                      </td>
                      <td className="px-5 py-2.5 text-xs text-zinc-500">{v.device}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        </>
        )}

        {adminTab === 'social' && <SocialPostComposer />}

        {adminTab === 'help' && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Connect Real Analytics</h2>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-sm text-zinc-600 space-y-3">
            <p>
              <strong className="text-zinc-800">Current mode:</strong> This dashboard tracks visits from the current browser using <code className="bg-zinc-100 px-1 rounded text-xs">localStorage</code>. Data is real but limited to a single device/browser.
            </p>
            <p>
              <strong className="text-zinc-800">For multi-device tracking:</strong> Add your{' '}
              <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                Google Analytics 4
              </a>{' '}
              Measurement ID (format: <code className="bg-zinc-100 px-1 rounded text-xs">G-XXXXXXXXXX</code>) to your Vite <code className="bg-zinc-100 px-1 rounded text-xs">index.html</code> using the GA4 gtag script. Then use GA4&rsquo;s own dashboard for cross-device reporting.
            </p>
            <p>
              <strong className="text-zinc-800">Admin password:</strong> Set <code className="bg-zinc-100 px-1 rounded text-xs">VITE_ADMIN_PASSWORD</code> in <code className="bg-zinc-100 px-1 rounded text-xs">.env</code> (see <code className="bg-zinc-100 px-1 rounded text-xs">.env.example</code>). Rebuild after changing env vars.
            </p>
            <p>
              <strong className="text-zinc-800">SEO:</strong> Submit <code className="bg-zinc-100 px-1 rounded text-xs">/sitemap.xml</code> in{' '}
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                Google Search Console
              </a>
              . Ranking depends on content quality, backlinks, and time; a sitemap helps discovery but does not guarantee positions.
            </p>
          </div>
        </section>
        )}

        </div>
      </main>
    </div>
  )
}
