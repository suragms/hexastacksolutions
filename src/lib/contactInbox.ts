import { pullContact, pushContact } from './remoteSync'

export type ContactMessage = {
  id: string
  ts: number
  name: string
  email: string
  message: string
  product?: string
  read: boolean
}

const LS_KEY = 'hs_contact_inbox'
let pushTimer: number | null = null

function readAll(): ContactMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as ContactMessage[]
  } catch {
    return []
  }
}

function schedulePush() {
  if (typeof window === 'undefined') return
  if (pushTimer) window.clearTimeout(pushTimer)
  pushTimer = window.setTimeout(() => {
    void pushContact(readAll()).catch(() => {
      /* ignore network sync failures */
    })
  }, 350)
}

export function appendContactMessage(msg: Omit<ContactMessage, 'id' | 'ts' | 'read'>): ContactMessage {
  const row: ContactMessage = {
    ...msg,
    id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    ts: Date.now(),
    read: false,
  }
  const next = [row, ...readAll()]
  localStorage.setItem(LS_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event('hs-contact-inbox-updated'))
  schedulePush()
  return row
}

export function readContactMessages(): ContactMessage[] {
  return readAll().sort((a, b) => b.ts - a.ts)
}

export function markContactRead(id: string) {
  const next = readAll().map((m) => (m.id === id ? { ...m, read: true } : m))
  localStorage.setItem(LS_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event('hs-contact-inbox-updated'))
  schedulePush()
}

export function unreadContactCount(): number {
  return readAll().filter((m) => !m.read).length
}

export async function hydrateContactInboxFromServer() {
  if (typeof window === 'undefined') return
  try {
    const local = readAll()
    const remote = (await pullContact()).items as ContactMessage[]
    if (Array.isArray(remote) && remote.length > 0) {
      localStorage.setItem(LS_KEY, JSON.stringify(remote))
      window.dispatchEvent(new Event('hs-contact-inbox-updated'))
      return
    }
    if (local.length > 0) {
      await pushContact(local)
    }
  } catch {
    /* ignore network sync failures */
  }
}
