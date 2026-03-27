import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { FadeInView } from '../components/ui/FadeInView'
import { GradientButton } from '../components/ui/GradientButton'
import { Section } from '../components/ui/Section'
import { site } from '../data/site'
import { appendContactMessage } from '../lib/contactInbox'

const mapsEmbedSrc =
  'https://www.google.com/maps?q=Vadanappally+Thrissur+Kerala+680614&output=embed'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [searchParams] = useSearchParams()
  const productHint = searchParams.get('product')?.trim() ?? ''

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    if (!name || !email || !message) return
    appendContactMessage({
      name,
      email,
      message,
      product: productHint || undefined,
    })
    setSent(true)
  }

  return (
    <Section className="pt-24 md:pt-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Contact</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Request a quote
            </h1>
            <p className="mt-4 text-text-muted">
              Tell us what you’re building: POS, billing, SaaS, or a new site. We usually reply within
              one business day.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-text-muted">
              <li>
                <span className="font-medium text-text-primary">Email:</span>{' '}
                <a href={`mailto:${site.email}`} className="text-orange-600 hover:text-orange-700">
                  {site.email}
                </a>
              </li>
              {site.phones.map((phone) => (
                <li key={phone}>
                  <span className="font-medium text-text-primary">Phone:</span>{' '}
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-orange-600 hover:text-orange-700">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-orange-200 px-3 py-1 text-sm font-semibold text-orange-700 hover:bg-orange-50"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <span className="font-medium text-text-primary">Office:</span> {site.addressLine}
              </li>
              <li>
                <span className="font-medium text-text-primary">Service areas:</span>{' '}
                {site.serviceAreasLabel}
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <iframe
                title="Map: Vadanappally, Thrissur"
                src={mapsEmbedSrc}
                className="aspect-[16/10] h-56 w-full min-h-[240px] border-0 sm:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeInView>

          <FadeInView delay={0.1}>
            {sent ? (
              <div className="rounded-2xl border border-orange-100 bg-card p-8 text-center">
                <p className="text-lg font-semibold text-text-primary">Thanks, we’ve received your note.</p>
                <p className="mt-2 text-sm text-text-muted">
                  For urgent requests, email us at {site.email} or message on WhatsApp.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="w-full min-w-0 rounded-2xl border border-border bg-card p-5 shadow-lg sm:p-6 md:p-8"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-text-primary">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-1.5 w-full min-w-0 rounded-xl border border-border bg-background px-4 py-3 text-base text-text-primary outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-text-primary">
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-1.5 w-full min-w-0 rounded-xl border border-border bg-background px-4 py-3 text-base text-text-primary outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="msg" className="text-sm font-medium text-text-primary">
                      Project details
                    </label>
                    <textarea
                      id="msg"
                      name="message"
                      rows={5}
                      required
                      placeholder="Goals, timeline, POS/billing needs, Gulf invoicing…"
                      className="mt-1.5 w-full min-w-0 resize-y rounded-xl border border-border bg-background px-4 py-3 text-base text-text-primary outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>
                <GradientButton type="submit" className="mt-6 w-full">
                  Send message
                </GradientButton>
                <p className="mt-4 text-center text-xs text-text-muted">
                  Messages are saved in this browser for the admin dashboard (local storage). Add email or a
                  form backend for production.
                </p>
              </form>
            )}
          </FadeInView>
        </div>
      </Container>
    </Section>
  )
}
