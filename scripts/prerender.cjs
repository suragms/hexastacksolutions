const fs = require('fs');
const path = require('path');
const Prerenderer = require('@prerenderer/prerenderer');
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer');
const { ALL_PUBLIC_PATHS } = require('./public-routes.cjs');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const routes = ALL_PUBLIC_PATHS;

function ensureOutputPath(route) {
    const cleanRoute = route === '/' ? '' : route.replace(/^\//, '');
    const routeDir = path.join(DIST_DIR, cleanRoute);
    const outputPath = path.join(routeDir, 'index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    return outputPath;
}

async function run() {
    const renderer = new PuppeteerRenderer({
        headless: true,
        renderAfterDocumentEvent: 'render-event',
        maxConcurrentRoutes: 4,
        skipThirdPartyRequests: false,
    });

    const prerenderer = new Prerenderer({
        staticDir: DIST_DIR,
        renderer,
    });

    try {
        console.log(`[prerender] Rendering ${routes.length} public routes...`);
        await prerenderer.initialize();
        const renderedRoutes = await prerenderer.renderRoutes(routes);

        renderedRoutes.forEach((renderedRoute) => {
            const outputPath = ensureOutputPath(renderedRoute.route);
            fs.writeFileSync(outputPath, renderedRoute.html.trim(), 'utf8');
        });

        console.log('[prerender] Static HTML written successfully.');
    } finally {
        const browser = renderer && renderer._puppeteer;
        const server = prerenderer && prerenderer.getServer && prerenderer.getServer();

        if (browser && typeof browser.close === 'function') {
            await browser.close().catch(() => {});
        }

        if (server && typeof server.destroy === 'function') {
            server.destroy();
        }
    }
}

run().catch((error) => {
    console.error('[prerender] Failed to generate static HTML.');
    console.error(error);
    process.exit(1);
});
