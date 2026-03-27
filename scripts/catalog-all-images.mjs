/**
 * Copies every image from images/ (recursive) into public/images/hexastack-assets/
 * with SEO-friendly filenames — no Frame-* / random hash-only names.
 * Uses neutral "portfolio UI" naming so we never mislabel a screenshot with the wrong industry.
 *
 * Run: npm run catalog:images
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outDir = path.join(root, 'public', 'images', 'hexastack-assets')
const mapPath = path.join(root, 'public', 'image-asset-map.json')

/** Optional: extra slug segment for files we’ve manually reviewed (accurate SEO segment). */
const REVIEWED_SLUGS = {
  'original-5a40d548b0bd366be32aebe44e5a6fae.jpg': 'healthcare-doctor-booking-web',
  'a138faba151ee78cfe30a22610166545.png': 'smart-health-mobile-app',
  'b5367eaaa3be6d49f0c5ae6c9dd90a2d.png': 'luxury-tourism-travel-web',
  'cf0840a78628d7f597420df281c5e7de.jpg': 'healthcare-dashboard-saas',
  'e61cb7896c5b97d1bdee48368bdb112f.jpg': 'corporate-financial-services',
  'b44e8a172861077.6486edc76c7f3.jpg': 'event-ticketing-mobile-ui',
  '1faaff15f14b913145b7ca3b6aba537b.jpg': 'luxury-travel-booking-mobile',
  '64edc9038996e8d051b99e5f_637003349b96f71c1aed48c4_thumbnail.jpeg': 'fashion-ecommerce-web',
  'original-a173d6747938931ba2ee033a4174d3c3.jpg': 'creative-portfolio-landing-web',
  'original-c91e5bd66978749ff418b53442ce382b.png': 'developer-portfolio-web',
}

const IMG_EXT = /\.(webp|png|jpe?g|gif)$/i

function walk(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'hexastack-assets' || e.name === 'renamed') continue
      out.push(...walk(p))
    } else if (IMG_EXT.test(e.name)) out.push(p)
  }
  return out
}

async function main() {
  const imagesRoot = path.join(root, 'images')
  const files = walk(imagesRoot).sort((a, b) => a.localeCompare(b, 'en'))
  fs.mkdirSync(outDir, { recursive: true })

  // Clear previous catalog outputs in target folder (keep portfolio/*.jpg manual assets if any)
  for (const f of fs.readdirSync(outDir)) {
    fs.unlinkSync(path.join(outDir, f))
  }

  const map = []
  const seenContent = new Map()

  let seq = 0
  for (const abs of files) {
    const rel = path.relative(imagesRoot, abs).replace(/\\/g, '/')
    const baseName = path.basename(abs)

    const buf = fs.readFileSync(abs)
    const sig = `${buf.length}-${buf.length > 512 ? buf.subarray(0, 512).toString('hex').slice(0, 40) : buf.toString('hex')}`
    if (seenContent.has(sig)) {
      map.push({
        originalRelative: rel,
        skipped: true,
        reason: 'duplicate-binary',
        duplicateOf: seenContent.get(sig),
      })
      continue
    }
    seenContent.set(sig, rel)

    let w = 0
    let h = 0
    let fmt = path.extname(abs).slice(1).toLowerCase() || 'bin'
    try {
      const meta = await sharp(buf).metadata()
      w = meta.width ?? 0
      h = meta.height ?? 0
      if (meta.format) fmt = meta.format
    } catch {
      // skip
    }

    const ext =
      fmt === 'jpeg'
        ? '.jpg'
        : fmt === 'png'
          ? '.png'
          : fmt === 'webp'
            ? '.webp'
            : fmt === 'gif'
              ? '.gif'
              : path.extname(abs).toLowerCase() || '.bin'

    seq++
    const reviewed = REVIEWED_SLUGS[baseName]
    const mid = reviewed ? `${reviewed}-${String(seq).padStart(3, '0')}` : `portfolio-ui-${String(seq).padStart(3, '0')}`
    const base = `hexastack-kerala-${mid}-${w}x${h}${ext}`
    let finalDest = path.join(outDir, base)
    let n = 2
    while (fs.existsSync(finalDest)) {
      finalDest = path.join(outDir, base.replace(ext, `-${n}${ext}`))
      n++
    }

    fs.copyFileSync(abs, finalDest)
    const publicPath = `/images/hexastack-assets/${path.basename(finalDest)}`
    const topic = reviewed ? reviewed.replace(/-/g, ' ') : 'portfolio UI screen'

    map.push({
      originalRelative: rel,
      publicPath,
      filename: path.basename(finalDest),
      width: w,
      height: h,
      reviewedSlug: reviewed ?? null,
      altText: `HexaStack Solutions ${topic} — Kerala software & web portfolio (${w}×${h})`,
    })
  }

  fs.writeFileSync(
    mapPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        note: 'Neutral SEO names + optional reviewed slugs. Original Frame/hash files listed under originalRelative.',
        count: map.filter((m) => !m.skipped).length,
        assets: map,
      },
      null,
      2,
    ),
  )
  console.log(`Wrote ${map.filter((m) => !m.skipped).length} files → public/images/hexastack-assets/`)
  console.log(`Map → ${path.relative(root, mapPath)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
