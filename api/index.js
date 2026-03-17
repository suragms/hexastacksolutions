/**
 * ESM entry for Vercel. Loads the Express app from the CJS server bundle (Prisma/TS backend).
 * With "type": "module", this file must use import/export; the bundle stays CommonJS.
 */
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// So the bundle does not call app.listen(); only this file does in dev
if (process.env.NODE_ENV !== 'production') process.env.VERCEL = '1';

const require = createRequire(import.meta.url);

let app;
try {
  app = require(path.join(__dirname, 'server-bundle.cjs')).app;
} catch (e) {
  console.error('[API] Failed to load server-bundle.cjs. Run: node scripts/build-api-bundle.cjs', e?.message);
  app = null;
}

// If bundle failed to load, export a stub that returns 503
const apiHandler = app || function (req, res) {
  res.statusCode = 503;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: 'Server bundle not loaded. Ensure build runs: node scripts/build-api-bundle.cjs',
    success: false
  }));
};

// In dev, wrap so non-API requests serve SPA from dist (avoids 404 for / and /admin)
const distPath = path.join(__dirname, '..', 'dist');
const distExists = process.env.NODE_ENV !== 'production' && app && fs.existsSync(distPath);

const devApp = distExists
  ? (() => {
      const wrap = express();
      wrap.use((req, res, next) => {
        const pathname = (req.url || '').split('?')[0];
        if (pathname.startsWith('/api')) return apiHandler(req, res, next);
        const file = path.join(distPath, pathname === '/' ? 'index.html' : pathname);
        if (fs.existsSync(file) && !fs.statSync(file).isDirectory()) {
          return res.sendFile(file);
        }
        res.sendFile(path.join(distPath, 'index.html'));
      });
      return wrap;
    })()
  : null;

// Local dev only — Vercel does NOT call app.listen()
if (process.env.NODE_ENV !== 'production' && (devApp || app)?.listen) {
  const PORT = process.env.PORT || 5000;
  const server = devApp || app;
  server.listen(PORT, () => {
    console.log(`Dev server: http://localhost:${PORT}`);
    if (distExists) console.log('Serving SPA from dist/');
    else console.log('Run "npm run build" to serve the app at / and /admin');
  });
}

export default devApp || app || apiHandler;
