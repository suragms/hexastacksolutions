/**
 * Copy image files from project-root `images/hexabill` → `public/images/hexabill`
 * so Vite can serve them. Run: npm run sync:images
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'images', 'hexabill')
const dstDir = path.join(root, 'public', 'images', 'hexabill')

const exts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'])

function main() {
  if (!fs.existsSync(srcDir)) {
    console.log('No folder:', srcDir)
    console.log('Create images/hexabill and add pos.png, erp.png, analytics.png (or any names), then run again.')
    process.exit(0)
  }
  fs.mkdirSync(dstDir, { recursive: true })
  const files = fs.readdirSync(srcDir)
  let n = 0
  for (const f of files) {
    const ext = path.extname(f).toLowerCase()
    if (!exts.has(ext)) continue
    const from = path.join(srcDir, f)
    const to = path.join(dstDir, f)
    fs.copyFileSync(from, to)
    console.log('Copied', f, '→ public/images/hexabill/')
    n++
  }
  if (n === 0) {
    console.log('No image files found in images/hexabill (supported:', [...exts].join(', '), ')')
  } else {
    console.log('Done. Update src/data/hexabillPage.ts if your filenames differ from hexabill-pos.svg etc.')
  }
}

main()
