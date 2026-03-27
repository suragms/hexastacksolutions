/**
 * Organizes images from images/ (including images/ss/) → public/assets/images/{folder}/
 * Naming: {category}-{type}-{industry}-{nn}.jpg
 * Generates src/data/generated/assetPortfolio.manifest.json
 *
 * Drop screenshots in images/ss/ or anywhere under images/, then run: npm run organize:assets
 */
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcRoot = path.join(root, 'images')
const outRoot = path.join(root, 'public', 'assets', 'images')
const manifestPath = path.join(root, 'src', 'data', 'generated', 'assetPortfolio.manifest.json')

const IMG_EXT = /\.(webp|png|jpe?g|gif)$/i

const INDUSTRY_FOLDERS = new Set([
  'tourism',
  'ecommerce',
  'healthcare',
  'events',
  'corporate',
  'portfolio',
  'ai',
  'education',
  'finance',
  'web',
  'mobile',
  'dashboard',
])

/** Curated UI/UX classification by exact basename (deep review). */
const CURATED = {
  'original-5a40d548b0bd366be32aebe44e5a6fae.jpg': {
    assetCategory: 'web',
    uiType: 'landing',
    industry: 'healthcare',
    uiStyle: 'light-modern',
    components: ['navbar', 'hero', 'search', 'forms'],
    projectTitle: 'Healthcare appointment & clinic marketing',
  },
  'a138faba151ee78cfe30a22610166545.png': {
    assetCategory: 'mobile',
    uiType: 'app',
    industry: 'healthcare',
    uiStyle: 'light-minimal',
    components: ['hero', 'cards', 'charts', 'navigation'],
    projectTitle: 'Smart vitals & health analysis (mobile)',
  },
  'b5367eaaa3be6d49f0c5ae6c9dd90a2d.png': {
    assetCategory: 'web',
    uiType: 'landing',
    industry: 'tourism',
    uiStyle: 'dark-luxury',
    components: ['navbar', 'hero', 'cards', 'gallery'],
    projectTitle: 'Luxury island tourism & experiences',
  },
  'cf0840a78628d7f597420df281c5e7de.jpg': {
    assetCategory: 'dashboard',
    uiType: 'saas',
    industry: 'healthcare',
    uiStyle: 'light-corporate',
    components: ['sidebar', 'charts', 'cards', 'forms'],
    projectTitle: 'Clinical patient insights console',
  },
  'e61cb7896c5b97d1bdee48368bdb112f.jpg': {
    assetCategory: 'web',
    uiType: 'landing',
    industry: 'corporate',
    uiStyle: 'light-corporate',
    components: ['navbar', 'hero', 'cards', 'stats'],
    projectTitle: 'Corporate & advisory services landing',
  },
  'b44e8a172861077.6486edc76c7f3.jpg': {
    assetCategory: 'mobile',
    uiType: 'app',
    industry: 'events',
    uiStyle: 'dark-gradient',
    components: ['navigation', 'cards', 'hero', 'forms'],
    projectTitle: 'Event discovery & digital ticketing',
  },
  '1faaff15f14b913145b7ca3b6aba537b.jpg': {
    assetCategory: 'mobile',
    uiType: 'app',
    industry: 'tourism',
    uiStyle: 'light-modern',
    components: ['navigation', 'cards', 'product-grid', 'hero'],
    projectTitle: 'Luxury stay booking & discovery',
  },
  '64edc9038996e8d051b99e5f_637003349b96f71c1aed48c4_thumbnail.jpeg': {
    assetCategory: 'web',
    uiType: 'store',
    industry: 'ecommerce',
    uiStyle: 'light-minimal',
    components: ['navbar', 'hero', 'product-grid', 'footer'],
    projectTitle: 'Fashion retail storefront template',
  },
  'original-a173d6747938931ba2ee033a4174d3c3.jpg': {
    assetCategory: 'web',
    uiType: 'landing',
    industry: 'portfolio',
    uiStyle: 'light-modern',
    components: ['navbar', 'hero', 'cards', 'stats'],
    projectTitle: 'Creative studio portfolio system',
  },
  'original-c91e5bd66978749ff418b53442ce382b.png': {
    assetCategory: 'web',
    uiType: 'landing',
    industry: 'portfolio',
    uiStyle: 'light-modern',
    components: ['navbar', 'hero', 'cards'],
    projectTitle: 'Developer portfolio & project grid',
  },
}

function walk(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'renamed' || e.name === 'node_modules') continue
      out.push(...walk(p))
    } else if (IMG_EXT.test(e.name)) out.push(p)
  }
  return out
}

function hashBuf(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex')
}

function inferFromGeometry(w, h, filename) {
  const r = w / Math.max(h, 1)
  const fn = filename.toLowerCase()
  let assetCategory = 'web'
  if (r < 0.62) assetCategory = 'mobile'
  else if (r > 1.35 && w > 900) assetCategory = 'dashboard'
  else assetCategory = 'web'

  let uiType = 'landing'
  if (assetCategory === 'mobile') uiType = 'app'
  if (assetCategory === 'dashboard') uiType = 'saas'

  let industry = 'portfolio'
  if (/frame-11712751(49|50|51)/i.test(fn)) {
    industry = 'events'
    assetCategory = 'mobile'
    uiType = 'app'
  } else if (/frame-11712751(5[2-9]|6)/i.test(fn)) {
    industry = 'ecommerce'
  } else if (/frame-161887/i.test(fn)) {
    industry = 'corporate'
    assetCategory = 'web'
    uiType = 'landing'
  } else if (/still-|original-8|original-9/i.test(fn)) {
    industry = 'tourism'
  }

  return {
    assetCategory,
    uiType,
    industry,
    uiStyle: w > 1400 ? 'modern' : 'minimal',
    components: ['hero', 'cards'],
    projectTitle: `UI concept ${path.basename(filename, path.extname(filename)).slice(0, 24)}`,
  }
}

function pickFolder({ industry, assetCategory }) {
  if (INDUSTRY_FOLDERS.has(industry) && industry !== 'web') return industry
  if (assetCategory === 'mobile') return 'mobile'
  if (assetCategory === 'dashboard') return 'dashboard'
  return 'web'
}

function mapToPortfolioCategory(classification) {
  const { industry, assetCategory } = classification
  if (industry === 'tourism') return 'Tourism / Travel'
  if (industry === 'ecommerce') return 'E-commerce'
  if (industry === 'healthcare') return 'Healthcare / Medical'
  if (industry === 'events') return 'Event Management'
  if (industry === 'corporate') return 'Corporate / Business'
  if (industry === 'portfolio') return 'Portfolio / Personal'
  if (industry === 'ai') return 'AI / Tech Platforms'
  if (industry === 'education') return 'Corporate / Business'
  if (industry === 'finance') return 'Corporate / Business'
  if (assetCategory === 'mobile') return 'Mobile Apps'
  if (assetCategory === 'dashboard') return 'Dashboard / SaaS'
  return 'Web Design'
}

async function main() {
  const files = walk(srcRoot).sort((a, b) => a.localeCompare(b, 'en'))
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
  for (const sub of INDUSTRY_FOLDERS) {
    fs.mkdirSync(path.join(outRoot, sub), { recursive: true })
  }

  const seen = new Set()
  const counters = Object.fromEntries([...INDUSTRY_FOLDERS].map((k) => [k, 0]))
  const records = []
  const projectMap = new Map()

  for (const abs of files) {
    const rel = path.relative(srcRoot, abs).replace(/\\/g, '/')
    const base = path.basename(abs)
    const buf = fs.readFileSync(abs)

    const sig = hashBuf(buf)
    if (seen.has(sig)) continue
    seen.add(sig)

    if (buf.length < 5000) continue

    let w = 0,
      h = 0
    try {
      const m = await sharp(buf).metadata()
      w = m.width ?? 0
      h = m.height ?? 0
    } catch {
      continue
    }
    if (w < 180 || h < 180) continue

    const curated = CURATED[base]
    const classification = curated ?? inferFromGeometry(w, h, base)

    const folder = pickFolder(classification)
    counters[folder] = (counters[folder] || 0) + 1
    const n = counters[folder]
    const fname = `${classification.assetCategory}-${classification.uiType}-${classification.industry}-${String(n).padStart(2, '0')}.jpg`
    const dest = path.join(outRoot, folder, fname)

    await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toFile(dest)

    const publicPath = `/assets/images/${folder}/${fname}`
    const frameMatch = base.match(/Frame-(\d+)/i)
    const projectGroupId = frameMatch ? `frame-${frameMatch[1]}` : `asset-${sig.slice(0, 10)}`

    const rec = {
      originalRelative: rel,
      publicPath,
      folder,
      filename: fname,
      width: w,
      height: h,
      classification,
      portfolioCategory: mapToPortfolioCategory(classification),
      projectGroupId,
      projectTitle: classification.projectTitle,
    }
    records.push(rec)

    if (!projectMap.has(projectGroupId)) {
      projectMap.set(projectGroupId, [])
    }
    projectMap.get(projectGroupId).push(publicPath)
  }

  const projects = []
  for (const [pid, images] of projectMap) {
    const first = records.find((r) => r.projectGroupId === pid)
    if (!first) continue
    projects.push({
      id: pid,
      title: first.projectTitle,
      category: first.portfolioCategory,
      industry: first.classification.industry,
      uiType: first.classification.uiType,
      assetCategory: first.classification.assetCategory,
      uiStyle: first.classification.uiStyle,
      components: first.classification.components,
      images,
      description: `${first.classification.assetCategory.toUpperCase()} · ${first.classification.uiStyle} · ${first.classification.components.join(', ')}`,
      features: [
        `Layout: ${first.classification.assetCategory} (${first.classification.uiType})`,
        `Industry focus: ${first.classification.industry}`,
        `Visible patterns: ${first.classification.components.join(', ')}`,
      ],
      techStack: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Figma handoff'],
    })
  }

  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        summary: {
          totalProcessed: records.length,
          projectsGrouped: projects.length,
          folders: [...INDUSTRY_FOLDERS],
        },
        records,
        projects,
      },
      null,
      2,
    ),
  )

  console.log(`OK: ${records.length} images → public/assets/images/`)
  console.log(`Manifest: ${path.relative(root, manifestPath)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
