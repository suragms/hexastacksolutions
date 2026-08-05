import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

/**
 * Static SPA build.
 *
 * Per-route prerendering (real static HTML for SEO) is done AFTER `vite build` by
 * `scripts/prerender.cjs`, which loads each public route in headless Chrome, waits for
 * the content to render, and saves the full HTML (with per-route title/meta/JSON-LD).
 *
 * Note: vite-prerender-plugin was removed because React 19's `renderToString` aborts on
 * Suspense — every lazy-loaded route rendered as an empty skeleton and the build hung.
 * The puppeteer approach (scripts/prerender.cjs) renders the real client app, so it
 * produces full content for every route.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  /** Prisma Express — includes /api/sync stubs; see package.json `dev` */
  const apiTarget = env.VITE_DEV_API_PROXY || 'http://localhost:3001'

  return {
    build: {
      // Main app bundle is large (React + charts + admin); expected for this SPA
      chunkSizeWarningLimit: 1200,
    },
    plugins: [react(), tailwindcss()],
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
