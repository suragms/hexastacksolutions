import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

/**
 * Prerender runs SSR for each route during `vite build`.
 * Default is ON everywhere (including Vercel) for SEO-friendly HTML output.
 * Escape hatch: `SKIP_PRERENDER=1`.
 */
function shouldUsePrerender(): boolean {
  if (process.env.SKIP_PRERENDER === '1') return false
  return true
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  /** Prisma Express — includes /api/sync stubs; see package.json `dev` */
  const apiTarget = env.VITE_DEV_API_PROXY || 'http://localhost:3001'
  const usePrerender = shouldUsePrerender()

  const prerenderLogPlugin = {
    name: 'hexastack-prerender-log',
    buildStart() {
      if (!usePrerender) {
        console.log(
          '[vite] Prerender plugin skipped (set SKIP_PRERENDER=1 only when needed).',
        )
      }
    },
  }

  return {
    build: {
      // Prerender bundle (prerender-*.js) is ~900kB+; expected for SSR-like script
      chunkSizeWarningLimit: 1200,
    },
    plugins: [
      prerenderLogPlugin,
      react(),
      tailwindcss(),
      ...(usePrerender
        ? [
            vitePrerenderPlugin({
              renderTarget: '#root',
              prerenderScript: path.resolve(__dirname, './src/prerender.tsx'),
              additionalPrerenderRoutes: [
                '/',
                '/work',
                '/services',
                '/services/web-design',
                '/services/web-applications',
                '/services/seo',
                '/products/hexabill',
                '/about',
                '/blog',
                '/blog/vat-einvoice-2026',
                '/blog/cwv-gulf-leads',
                '/blog/pos-erp-narrative',
                '/blog/seo-keywords-2026',
                '/blog/restaurant-pos-case-study',
                '/blog/medical-lab-software-kerala',
                '/blog/ai-integration-small-business-kerala',
                '/blog/website-cost-kerala',
                '/blog/vat-billing-uae',
                '/blog/web-development-company-thrissur',
                '/blog/whatsapp-business-kerala',
                '/blog/mobile-app-developer-kerala',
                '/blog/pos-software-restaurants-kerala',
                '/blog/nutriscan-ai-food-recognition',
                '/contact',
                '/terms',
                '/privacy',
                '/security',
                '/rules',
                '/refund-policy',
              ],
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true },
      },
    },
  }
})
