import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, 'src')

const replacements = [
  { regex: /Get Free Website Consultation/gi, text: 'Get a Quote' },
  { regex: /Get Free Consultation/gi, text: 'Get a Quote' },
  { regex: /Book Free Consultation/gi, text: 'Get a Quote' },
  { regex: /Book Free Strategy Call/gi, text: 'Get a Quote' },
  { regex: /Claim Your Free Audit Now/gi, text: 'Get a Quote' },
  { regex: /Talk to Experts/gi, text: 'Request a Quote' },
  { regex: /Start Your Project Today/gi, text: 'Request Pricing' },
  { regex: /Start Your Project/gi, text: 'Request Pricing' },
  { regex: /Book a Demo/gi, text: 'Request Pricing' },
]

function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath)
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      let changed = false
      
      for (const rep of replacements) {
        if (rep.regex.test(content)) {
          content = content.replace(rep.regex, rep.text)
          changed = true
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content)
        console.log(`Updated ${fullPath}`)
      }
    }
  }
}

walk(srcDir)
console.log('Done')
