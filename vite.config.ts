import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

/**
 * Prerender runs SSR for each route during `vite build`. On Vercel, builds have
 * been observed to hit the 45-minute limit (hang), so prerender is **off** on
 * Vercel unless `ENABLE_PRERENDER=1` (or `true`). Locally, prerender stays on.
 * Force off anywhere: `SKIP_PRERENDER=1`.
 */
function shouldUsePrerender(): boolean {
  if (process.env.SKIP_PRERENDER === '1') return false
  if (process.env.VERCEL === '1') {
    return process.env.ENABLE_PRERENDER === '1' || process.env.ENABLE_PRERENDER === 'true'
  }
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
          '[vite] Prerender plugin skipped (set ENABLE_PRERENDER=1 on Vercel to enable).',
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
