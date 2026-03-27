const API_BASE = String(import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api').replace(/\/+$/, '')

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`Sync API failed: ${res.status}`)
  }
  return (await res.json()) as T
}

export async function pullContact(): Promise<{ items: unknown[] }> {
  return req('/sync/contact')
}

export async function pushContact(items: unknown[]): Promise<void> {
  await req('/sync/contact', { method: 'PUT', body: JSON.stringify({ items }) })
}

export async function pullTestimonials(): Promise<{ items: unknown[] }> {
  return req('/sync/testimonials')
}

export async function pushTestimonials(items: unknown[]): Promise<void> {
  await req('/sync/testimonials', { method: 'PUT', body: JSON.stringify({ items }) })
}

export async function pullContent(): Promise<{ categories: unknown[]; products: unknown[] }> {
  return req('/sync/content')
}

export async function pushContent(payload: { categories: unknown[]; products: unknown[] }): Promise<void> {
  await req('/sync/content', { method: 'PUT', body: JSON.stringify(payload) })
}
