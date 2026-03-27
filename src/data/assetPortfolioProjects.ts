import manifest from './generated/assetPortfolio.manifest.json'
import type { PortfolioCategory, PortfolioProject } from './portfolioTypes'

type ManifestRecord = (typeof manifest.records)[number]

const groupImages = new Map<string, string[]>()
for (const p of manifest.projects) {
  groupImages.set(p.id, p.images)
}

function safeId(r: ManifestRecord, index: number): string {
  const slug = r.publicPath
    .replace(/^\/assets\/images\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
  return `gen-${slug}-${index}`
}

export const assetPortfolioProjects: PortfolioProject[] = manifest.records.map((r, i) => {
  const c = r.classification
  const gallery = [...new Set(groupImages.get(r.projectGroupId) ?? [r.publicPath])]
  const cat = r.portfolioCategory as PortfolioCategory

  return {
    id: safeId(r, i),
    title: r.projectTitle,
    category: cat,
    image: r.publicPath,
    imageAlt: `HexaStack ${c.assetCategory} UI: ${r.projectTitle} (${c.uiStyle}, ${c.industry})`,
    seoKeywords: [
      `${c.industry} UI design Kerala`,
      `${c.uiType} ${c.assetCategory}`,
      'HexaStack portfolio Thrissur',
    ],
    shortDescription: `${c.assetCategory.toUpperCase()} · ${c.uiStyle} · Visible: ${c.components.join(', ')}`,
    features: [
      `Surface: ${c.assetCategory} (${c.uiType})`,
      `Industry: ${c.industry}`,
      `Components: ${c.components.join(', ')}`,
    ],
    uiHighlights: c.components.map(
      (x) => `${x.charAt(0).toUpperCase() + x.slice(1)} visible in composition`,
    ),
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    caseStudy: {
      problem: `Product needed a credible ${c.uiType} direction for ${c.industry} users.`,
      solution: `Explored layout, hierarchy, and ${c.components.slice(0, 3).join(', ')} patterns.`,
      outcome: 'Ready to harden into components, tokens, and production screens.',
    },
    gallery: gallery.length > 1 ? gallery : undefined,
    projectGroupId: r.projectGroupId,
  }
})
