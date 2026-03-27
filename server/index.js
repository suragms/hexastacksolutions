import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = Number(process.env.API_PORT || 4000)
const DB_URL = process.env.DATABASE_URL || ''
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CORS_ORIGIN }))
app.use(express.json({ limit: '8mb' }))

const syncBucketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
)

const SyncBucket = mongoose.model('SyncBucket', syncBucketSchema)

async function readBucket(name, fallback) {
  const doc = await SyncBucket.findOne({ name }).lean()
  if (!doc || typeof doc.payload !== 'object' || doc.payload == null) return fallback
  return doc.payload
}

async function writeBucket(name, payload) {
  await SyncBucket.updateOne({ name }, { $set: { payload } }, { upsert: true })
}

function normalizeContactRows(items) {
  if (!Array.isArray(items)) return []
  return items
    .filter((x) => x && typeof x === 'object')
    .map((x) => ({
      id: String(x.id ?? ''),
      ts: Number(x.ts ?? Date.now()),
      name: String(x.name ?? '').slice(0, 120),
      email: String(x.email ?? '').slice(0, 240),
      message: String(x.message ?? '').slice(0, 4000),
      product: x.product ? String(x.product).slice(0, 120) : undefined,
      read: Boolean(x.read),
    }))
    .filter((x) => x.id && x.name && x.email && x.message)
}

function normalizeTestimonialRows(items) {
  if (!Array.isArray(items)) return []
  return items
    .filter((x) => x && typeof x === 'object')
    .map((x) => ({
      id: String(x.id ?? ''),
      name: String(x.name ?? '').slice(0, 80),
      message: String(x.message ?? '').slice(0, 600),
      ts: Number(x.ts ?? Date.now()),
      source: x.source === 'admin' ? 'admin' : 'public',
      approved: Boolean(x.approved),
    }))
    .filter((x) => x.id && x.name && x.message)
}

function normalizeContent(payload) {
  const categories = Array.isArray(payload?.categories)
    ? [...new Set(payload.categories.map((x) => String(x).trim()).filter(Boolean))]
    : []
  const products = Array.isArray(payload?.products)
    ? payload.products
        .filter((x) => x && typeof x === 'object')
        .map((x) => ({
          id: String(x.id ?? ''),
          title: String(x.title ?? '').slice(0, 160),
          description: String(x.description ?? '').slice(0, 2000),
          href: String(x.href ?? '').slice(0, 600),
          ctaLabel: String(x.ctaLabel ?? '').slice(0, 80),
          imageDataUrl: x.imageDataUrl ? String(x.imageDataUrl) : null,
        }))
        .filter((x) => x.id && x.title)
    : []

  return { categories, products }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'hexastack-sync-api' })
})

app.get('/api/sync/contact', async (_req, res) => {
  const payload = await readBucket('contact', { items: [] })
  res.json({ items: normalizeContactRows(payload.items) })
})

app.put('/api/sync/contact', async (req, res) => {
  const items = normalizeContactRows(req.body?.items)
  await writeBucket('contact', { items })
  res.json({ ok: true, count: items.length })
})

app.get('/api/sync/testimonials', async (_req, res) => {
  const payload = await readBucket('testimonials', { items: [] })
  res.json({ items: normalizeTestimonialRows(payload.items) })
})

app.put('/api/sync/testimonials', async (req, res) => {
  const items = normalizeTestimonialRows(req.body?.items)
  await writeBucket('testimonials', { items })
  res.json({ ok: true, count: items.length })
})

app.get('/api/sync/content', async (_req, res) => {
  const payload = await readBucket('content', { categories: [], products: [] })
  const normalized = normalizeContent(payload)
  res.json(normalized)
})

app.put('/api/sync/content', async (req, res) => {
  const payload = normalizeContent(req.body)
  await writeBucket('content', payload)
  res.json({ ok: true, categories: payload.categories.length, products: payload.products.length })
})

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ ok: false, error: 'Internal server error' })
})

async function main() {
  if (!DB_URL) {
    throw new Error('DATABASE_URL is missing in .env')
  }
  await mongoose.connect(DB_URL, { dbName: 'hexastacksolutions' })
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  console.error('Failed to start API:', err)
  process.exit(1)
})
