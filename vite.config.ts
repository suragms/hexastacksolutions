import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// https://vite.dev/config/
export default defineConfig({
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
})
