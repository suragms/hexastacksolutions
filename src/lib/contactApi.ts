import { API_URL } from './utils'
import type { ContactMessage } from './contactInbox'

function apiUrl(path: string): string {
  return `${API_URL}/api${path}`.replace(/([^:])\/\/+/g, '$1/')
}

export type ApiContactRow = {
  id: string
  name: string
  email: string | null
  phone: string | null
  requirement: string
  serviceOrProduct?: string | null
  isRead: boolean
  createdAt: string
}

export function mapApiRowToContactMessage(row: ApiContactRow): ContactMessage {
  return {
    id: row.id,
    ts: new Date(row.createdAt).getTime(),
    name: row.name,
    email: row.email ?? '',
    message: row.requirement,
    product: row.serviceOrProduct?.trim() ? row.serviceOrProduct : undefined,
    read: row.isRead,
  }
}

/** Returns null if the request failed (network or non-OK). Empty array means no enquiries yet. */
export async function fetchContactEnquiriesFromApi(): Promise<ContactMessage[] | null> {
  try {
    const res = await fetch(apiUrl('/contact'))
    if (!res.ok) return null
    const data = (await res.json()) as unknown
    if (!Array.isArray(data)) return null
    return data.map((x) => mapApiRowToContactMessage(x as ApiContactRow))
  } catch {
    return null
  }
}

export async function markContactReadOnApi(id: string): Promise<boolean> {
  try {
    const res = await fetch(apiUrl(`/contact/${encodeURIComponent(id)}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: true }),
    })
    return res.ok
  } catch {
    return false
  }
}

/** Server rows plus local-only drafts (ids starting with `m-`). */
export function mergeApiAndLocalInbox(fromApi: ContactMessage[] | null, local: ContactMessage[]): ContactMessage[] {
  if (fromApi === null) return local
  const localOnly = local.filter((m) => m.id.startsWith('m-'))
  return [...fromApi, ...localOnly].sort((a, b) => b.ts - a.ts)
}
