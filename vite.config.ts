import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePrerender from 'vite-plugin-prerender';

const prerenderRoutes = [
    '/',
    '/services',
    '/products',
    '/work',
    '/contact',
    '/solutions',
    '/pricing',
    '/blog',
    '/blog/website-cost-kerala-2026',
    '/blog/restaurant-pos-uae-case-study',
    '/blog/pos-software-restaurants-kerala-2026',
    '/blog/vat-compliant-billing-software-uae',
    '/blog/web-development-company-thrissur',
    '/blog/medical-lab-software-kerala',
    '/blog/whatsapp-business-setup-kerala-2026',
    '/blog/ai-integration-small-business-kerala',
    '/blog/choose-mobile-app-developer-kerala',
    '/blog/nutriscan-ai-food-recognition-app',
    '/about',
    '/products/hexabill',
    '/privacy',
    '/terms',
    '/admin',
];

// Skip prerender on Vercel/CI: Puppeteer is not available and causes build failures
const isVercel = process.env.VERCEL === '1';
const isCI = process.env.CI === 'true';

export default defineConfig({
    plugins: [
        react(),
        ...(isVercel || isCI
            ? []
            : [
                vitePrerender({
                    staticDir: path.join(__dirname, 'dist'),
                    routes: prerenderRoutes,
                    renderer: {
                        renderAfterDocumentEvent: 'render-event',
                    },
                }),
            ]),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        strictPort: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
