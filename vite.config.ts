import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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

// Skip prerender on Vercel/CI and in dev (plugin uses require(), breaks with "type": "module")
const isVercel = process.env.VERCEL === '1';
const isCI = process.env.CI === 'true';
const isBuild = process.argv.includes('build');

export default defineConfig(async () => {
    let prerenderPlugin = null;
    if (isBuild && !isVercel && !isCI) {
        try {
            const { default: vitePrerender } = await import('vite-plugin-prerender');
            prerenderPlugin = vitePrerender({
                staticDir: path.join(__dirname, 'dist'),
                routes: prerenderRoutes,
                renderer: {
                    renderAfterDocumentEvent: 'render-event',
                },
            });
        } catch (e) {
            console.warn('Prerender plugin skipped:', (e as Error).message);
        }
    }

    return {
        plugins: [react(), ...(prerenderPlugin ? [prerenderPlugin] : [])],
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
    };
});
