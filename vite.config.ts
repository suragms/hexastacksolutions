import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  /** Prisma Express — includes /api/sync stubs; see package.json `dev` */
  const apiTarget = env.VITE_DEV_API_PROXY || 'http://localhost:3001'

  return {
    build: {
      chunkSizeWarningLimit: 700,
    },
    plugins: [
      react(),
      tailwindcss(),
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
