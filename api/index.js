/**
 * Vercel catch-all API route (CommonJS). Handles /api, /api/admin/login, etc.
 * Uses require() so Vercel runs this as CJS (avoids "Cannot use import statement outside a module").
 * Set ADMIN_PASSWORD and JWT_SECRET in Vercel env.
 */
const path = require('path');
// Use compiled server (dist) when present (Vercel build); fallback to server for local dev
let app;
try {
    app = require(path.join(__dirname, '..', 'dist-server', 'index')).app;
} catch (_) {
    app = require(path.join(__dirname, '..', 'server', 'index')).app;
}

function handler(req, res) {
    // Restore original path when Vercel rewrites /api/foo to /api?path=foo
    const rawUrl = req.url || '';
    const qIndex = rawUrl.indexOf('?');
    const query = qIndex >= 0 ? rawUrl.slice(qIndex + 1) : '';
    const pathParam = query.split('&').find(function (p) { return p.startsWith('path='); });
    if (pathParam) {
        const pathValue = decodeURIComponent(pathParam.replace('path=', '').replace(/\+/g, ' ')).replace(/^\/+/, '');
        const rest = query.replace(/path=[^&]+&?|&?path=[^&]+/, '').trim();
        req.url = '/api/' + pathValue + (rest ? '?' + rest : '');
    }
    return app(req, res);
}

module.exports = handler;
