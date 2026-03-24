const fs = require('fs');
const path = require('path');
const http = require('http');
const { URL } = require('url');
const { ALL_PUBLIC_PATHS } = require('./public-routes.cjs');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const routes = ALL_PUBLIC_PATHS;
const RENDER_TIMEOUT_MS = 15000;

const MIME_TYPES = {
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml; charset=utf-8',
};

function ensureOutputPath(route) {
    const cleanRoute = route === '/' ? '' : route.replace(/^\//, '');
    const routeDir = path.join(DIST_DIR, cleanRoute);
    const outputPath = path.join(routeDir, 'index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    return outputPath;
}

function resolveStaticPath(requestUrl) {
    const parsed = new URL(requestUrl, 'http://localhost');
    const pathname = decodeURIComponent(parsed.pathname);
    const requestedPath = pathname === '/' ? '/index.html' : pathname;
    const directPath = path.join(DIST_DIR, requestedPath);

    if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
        return directPath;
    }

    const nestedIndexPath = path.join(DIST_DIR, pathname, 'index.html');
    if (fs.existsSync(nestedIndexPath) && fs.statSync(nestedIndexPath).isFile()) {
        return nestedIndexPath;
    }

    if (path.extname(pathname)) {
        return null;
    }

    return path.join(DIST_DIR, 'index.html');
}

function createStaticServer() {
    return http.createServer((req, res) => {
        const filePath = resolveStaticPath(req.url || '/');

        if (!filePath) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Server error');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
}

async function getBrowserRuntime() {
    const puppeteer = require('puppeteer-core');
    const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

    if (isVercel) {
        const chromium = require('@sparticuz/chromium');
        const executablePath = await chromium.executablePath();

        return {
            puppeteer,
            launchOptions: {
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath,
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            },
        };
    }

    const localCandidates = [
        process.env.PUPPETEER_EXECUTABLE_PATH,
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ].filter(Boolean);

    const executablePath = localCandidates.find((candidate) => fs.existsSync(candidate));

    if (!executablePath) {
        throw new Error(
            'No local Chrome/Edge executable found for prerendering. Set PUPPETEER_EXECUTABLE_PATH or install Chrome.'
        );
    }

    const launchOptions = {
        headless: true,
        executablePath,
        ignoreHTTPSErrors: true,
    };

    if (process.platform === 'linux') {
        launchOptions.args = ['--no-sandbox', '--disable-setuid-sandbox'];
    }

    return { puppeteer, launchOptions };
}

async function waitForRender(page) {
    await page.waitForFunction(
        () => {
            const root = document.getElementById('root');
            const text = document.body && document.body.innerText ? document.body.innerText.trim() : '';
            return Boolean(root && root.children.length > 0 && text.length > 80);
        },
        { timeout: RENDER_TIMEOUT_MS, polling: 100 }
    );

    await new Promise((resolve) => setTimeout(resolve, 250));
}

async function renderRoute(browser, baseUrl, route) {
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
        const url = request.url();
        const allowedLocal = url.startsWith(baseUrl);
        const isDataRequest = url.startsWith('data:');
        const isBlobRequest = url.startsWith('blob:');

        if (allowedLocal || isDataRequest || isBlobRequest) {
            request.continue();
            return;
        }

        request.abort();
    });

    await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });

    await waitForRender(page);

    const html = (await page.content()).trim();
    const outputPath = ensureOutputPath(route);
    fs.writeFileSync(outputPath, html, 'utf8');
    await page.close();
}

async function run() {
    const server = createStaticServer();
    let browser;

    try {
        await new Promise((resolve, reject) => {
            server.listen(0, '127.0.0.1', (error) => {
                if (error) reject(error);
                else resolve();
            });
        });

        const address = server.address();
        const port = typeof address === 'object' && address ? address.port : 4173;
        const baseUrl = `http://127.0.0.1:${port}`;
        const { puppeteer, launchOptions } = await getBrowserRuntime();

        console.log(`[prerender] Rendering ${routes.length} public routes...`);
        browser = await puppeteer.launch(launchOptions);

        for (const route of routes) {
            console.log(`[prerender] ${route}`);
            await renderRoute(browser, baseUrl, route);
        }

        console.log('[prerender] Static HTML written successfully.');
    } catch (error) {
        console.error('[prerender] Failed to generate static HTML.');
        console.error(error);
        process.exitCode = 1;
    } finally {
        if (browser) {
            await browser.close().catch(() => {});
        }

        await new Promise((resolve) => {
            server.close(() => resolve());
        }).catch(() => {});
    }

    if (process.exitCode && process.exitCode !== 0) {
        process.exit(process.exitCode);
    }
}

run();
