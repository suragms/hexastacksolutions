import { testimonialsSeed } from '../data/testimonialsSeed'
import { pullTestimonials, pushTestimonials } from './remoteSync'

export type TestimonialRow = {
  id: string
  name: string
  message: string
  ts: number
  source: 'admin' | 'public'
  approved: boolean
}

const LS_KEY = 'hs_testimonials_v1'
let pushTimer: number | null = null

function readAll(): TestimonialRow[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as TestimonialRow[]
  } catch {
    return []
  }
}

function writeAll(rows: TestimonialRow[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(rows))
  window.dispatchEvent(new Event('hs-testimonials-updated'))
  if (typeof window !== 'undefined') {
    if (pushTimer) window.clearTimeout(pushTimer)
    pushTimer = window.setTimeout(() => {
      void pushTestimonials(readAll()).catch(() => {
        /* ignore network sync failures */
      })
    }, 350)
  }
}

export function readTestimonials(): TestimonialRow[] {
  return readAll().sort((a, b) => b.ts - a.ts)
}

export function pendingTestimonials(): TestimonialRow[] {
  return readAll().filter((t) => !t.approved)
}

export function appendPublicTestimonial(name: string, message: string): { ok: true } | { ok: false; reason: string } {
  const n = name.trim()
  const m = message.trim()
  if (n.length < 2 || n.length > 80) return { ok: false, reason: 'Please enter your name (2–80 characters).' }
  if (m.length < 10 || m.length > 600) return { ok: false, reason: 'Please write a short review (10–600 characters).' }
  try {
    const last = sessionStorage.getItem('hs_review_last_ts')
    if (last && Date.now() - Number(last) < 90_000) {
      return { ok: false, reason: 'Please wait a minute before sending another review.' }
    }
  } catch {
    /* ignore */
  }
  const row: TestimonialRow = {
    id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: n,
    message: m,
    ts: Date.now(),
    source: 'public',
    approved: false,
  }
  writeAll([row, ...readAll()])
  try {
    sessionStorage.setItem('hs_review_last_ts', String(Date.now()))
  } catch {
    /* ignore */
  }
  return { ok: true }
}

export function addAdminTestimonial(name: string, message: string): TestimonialRow {
  const n = name.trim()
  const m = message.trim()
  const row: TestimonialRow = {
    id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: n.slice(0, 80),
    message: m.slice(0, 600),
    ts: Date.now(),
    source: 'admin',
    approved: true,
  }
  writeAll([row, ...readAll()])
  return row
}

export function approveTestimonial(id: string) {
  const next = readAll().map((t) => (t.id === id ? { ...t, approved: true } : t))
  writeAll(next)
}

export function deleteTestimonial(id: string) {
  writeAll(readAll().filter((t) => t.id !== id))
}

/** Cards for homepage marquee: approved rows first, then seed until at least four cards for smooth loop. */
export function getTestimonialsForHome(): { id: string; name: string; message: string }[] {
  const approved = readAll()
    .filter((t) => t.approved)
    .sort((a, b) => b.ts - a.ts)
    .map((t) => ({ id: t.id, name: t.name, message: t.message }))

  const out = [...approved]
  const sig = new Set(approved.map((t) => t.message.slice(0, 64).toLowerCase()))
  for (const s of testimonialsSeed) {
    if (out.length >= 12) break
    if (!sig.has(s.message.slice(0, 64).toLowerCase())) {
      out.push({ id: s.id, name: s.name, message: s.message })
      sig.add(s.message.slice(0, 64).toLowerCase())
    }
  }
  return out
}

export async function hydrateTestimonialsFromServer() {
  if (typeof window === 'undefined') return
  try {
    const local = readAll()
    const remote = (await pullTestimonials()).items as TestimonialRow[]
    if (Array.isArray(remote) && remote.length > 0) {
      localStorage.setItem(LS_KEY, JSON.stringify(remote))
      window.dispatchEvent(new Event('hs-testimonials-updated'))
      return
    }
    if (local.length > 0) {
      await pushTestimonials(local)
    }
  } catch {
    /* ignore network sync failures */
  }
}
