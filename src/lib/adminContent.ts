import { pullContent, pushContent } from './remoteSync'

export type OperationalProduct = {
  id: string
  title: string
  description: string
  href: string
  ctaLabel: string
  /** Base64 data URL from admin upload, or null */
  imageDataUrl: string | null
}

const LS_CAT = 'hs_admin_blog_categories'
const LS_PROD = 'hs_operational_products'
let pushTimer: number | null = null

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function schedulePush() {
  if (typeof window === 'undefined') return
  if (pushTimer) window.clearTimeout(pushTimer)
  pushTimer = window.setTimeout(() => {
    void pushContent({
      categories: readAdminCategories(),
      products: readOperationalProducts(),
    }).catch(() => {
      /* ignore network sync failures */
    })
  }, 350)
}

export function readAdminCategories(): string[] {
  if (typeof window === 'undefined') return []
  return safeParse<string[]>(localStorage.getItem(LS_CAT), []).filter(Boolean)
}

export function writeAdminCategories(cats: string[]) {
  const next = [...new Set(cats.map((c) => c.trim()).filter(Boolean))]
  localStorage.setItem(LS_CAT, JSON.stringify(next))
  window.dispatchEvent(new Event('hs-admin-content-updated'))
  schedulePush()
}

export function addAdminCategory(name: string) {
  const n = name.trim()
  if (!n) return
  const cur = readAdminCategories()
  if (cur.includes(n)) return
  writeAdminCategories([...cur, n])
}

export function removeAdminCategory(name: string) {
  writeAdminCategories(readAdminCategories().filter((c) => c !== name))
}

export function readOperationalProducts(): OperationalProduct[] {
  if (typeof window === 'undefined') return []
  return safeParse<OperationalProduct[]>(localStorage.getItem(LS_PROD), [])
}

export function writeOperationalProducts(products: OperationalProduct[]) {
  localStorage.setItem(LS_PROD, JSON.stringify(products))
  window.dispatchEvent(new Event('hs-admin-content-updated'))
  schedulePush()
}

export function upsertOperationalProduct(p: OperationalProduct) {
  const cur = readOperationalProducts()
  const i = cur.findIndex((x) => x.id === p.id)
  if (i >= 0) cur[i] = p
  else cur.push(p)
  writeOperationalProducts(cur)
}

export function deleteOperationalProduct(id: string) {
  writeOperationalProducts(readOperationalProducts().filter((x) => x.id !== id))
}

export async function hydrateAdminContentFromServer() {
  if (typeof window === 'undefined') return
  try {
    const localCategories = readAdminCategories()
    const localProducts = readOperationalProducts()
    const remote = await pullContent()
    const remoteCategories = Array.isArray(remote.categories) ? (remote.categories as string[]) : []
    const remoteProducts = Array.isArray(remote.products) ? (remote.products as OperationalProduct[]) : []

    if (remoteCategories.length > 0 || remoteProducts.length > 0) {
      localStorage.setItem(LS_CAT, JSON.stringify(remoteCategories))
      localStorage.setItem(LS_PROD, JSON.stringify(remoteProducts))
      window.dispatchEvent(new Event('hs-admin-content-updated'))
      return
    }

    if (localCategories.length > 0 || localProducts.length > 0) {
      await pushContent({ categories: localCategories, products: localProducts })
    }
  } catch {
    /* ignore network sync failures */
  }
}
