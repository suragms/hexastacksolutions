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
    try {
        // Restore original path when Vercel rewrites /api/foo to /api?path=foo
        var rawUrl = req.url || '';
        var pathRestored = false;
        var qIndex = rawUrl.indexOf('?');
        var query = qIndex >= 0 ? rawUrl.slice(qIndex + 1) : '';
        var pathParam = query.split('&').find(function (p) { return p.startsWith('path='); });
        if (pathParam) {
            var pathValue = decodeURIComponent(pathParam.replace('path=', '').replace(/\+/g, ' ')).replace(/^\/+/, '');
            var rest = query.replace(/path=[^&]+&?|&?path=[^&]+/, '').trim();
            req.url = '/api/' + pathValue + (rest ? '?' + rest : '');
            pathRestored = true;
        }
        // Fallback: use x-invoke-path or x-url if path wasn't in query (e.g. some proxies)
        if (!pathRestored && req.headers) {
            var invokePath = req.headers['x-invoke-path'] || req.headers['x-url'];
            if (invokePath && typeof invokePath === 'string') {
                var p = invokePath.indexOf('?') >= 0 ? invokePath.split('?')[0] : invokePath;
                if (p.startsWith('/api')) req.url = p + (invokePath.indexOf('?') >= 0 ? '?' + invokePath.split('?')[1] : '');
            }
        }
        app(req, res);
    } catch (err) {
        console.error('[API_HANDLER]', err && err.message ? err.message : err);
        res.statusCode = 503;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Service temporarily unavailable', success: false }));
    }
}

module.exports = handler;
