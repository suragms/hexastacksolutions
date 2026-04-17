import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { readOperationalProducts, type OperationalProduct } from '../../lib/adminContent'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

export function OperationalProducts() {
  const [items, setItems] = useState<OperationalProduct[]>([])

  useEffect(() => {
    function sync() {
      setItems(readOperationalProducts())
    }
    sync()
    function onStorage(e: StorageEvent) {
      if (e.key === 'hs_operational_products') sync()
    }
    window.addEventListener('hs-admin-content-updated', sync)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('hs-admin-content-updated', sync)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  if (items.length === 0) return null

  return (
    <Section className="border-t border-orange-100/80 bg-gradient-to-b from-orange-50/30 to-white !py-14 md:!py-20">
      <Container>
        <FadeInView className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Operational products</p>
          <h2 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">What we are shipping</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-text-muted">
            Managed from Admin → add title, link, image, and CTA. Shown here when you have at least one entry.
          </p>
        </FadeInView>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <FadeInView key={p.id} delay={i * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-orange-200">
                <div className="aspect-[16/10] bg-zinc-100">
                  {p.imageDataUrl ? (
                    <img
                      src={p.imageDataUrl}
                      alt={p.title ? `${p.title} — HexaStack operational product` : 'HexaStack operational product'}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50 text-sm font-medium text-orange-800/70">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-text-primary">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-text-muted">{p.description}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-orange-600 hover:to-amber-600"
                  >
                    {p.ctaLabel || 'Open'}
                  </a>
                </div>
              </article>
            </FadeInView>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-text-muted">
          <Link to="/admin" className="font-semibold text-orange-600 hover:underline">
            Manage in Admin
          </Link>
        </p>
      </Container>
    </Section>
  )
}
