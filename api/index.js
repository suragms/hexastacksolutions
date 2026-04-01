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
let apiHandler;
try {
  app = require('./server-bundle.cjs').app;
  apiHandler = app;
} catch (err) {
  console.error('Failed to load server-bundle.cjs:', err?.message || err);
  apiHandler = (_req, res) => {
    res.status(503).setHeader('Content-Type', 'application/json').end(JSON.stringify({
      error: 'API bundle not loaded. Run "npm run build" and ensure api/server-bundle.cjs is deployed.',
      detail: process.env.NODE_ENV === 'development' ? (err?.message || String(err)) : undefined
    }));
  };
}

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

const handlerTarget = devApp || app || apiHandler;

/** True when body is missing or Vercel pre-set an empty object (stream not yet parsed). */
function needsJsonBodyParse(req) {
  const b = req.body;
  if (b == null) return true;
  if (typeof b === 'object' && !Array.isArray(b) && Object.keys(b).length === 0) return true;
  return false;
}

/** On Vercel, req.body is often `{}` or unset while JSON waits on the stream — must read or POST handlers see empty fields. */
function ensureBody(req) {
  return new Promise((resolve) => {
    if (!process.env.VERCEL || !needsJsonBodyParse(req)) return resolve();
    const method = (req.method || '').toUpperCase();
    if (method !== 'POST' && method !== 'PUT' && method !== 'PATCH') return resolve();
    const ct = (req.headers['content-type'] || '').toLowerCase();
    if (!ct.includes('application/json')) return resolve();
    if (req.readableEnded) return resolve();
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (raw.trim()) req.body = JSON.parse(raw);
      } catch (_) {
        /* leave as-is; route validation will respond */
      }
      resolve();
    });
    req.on('error', () => resolve());
  });
}

// Vercel (@vercel/node) expects a request handler function export.
export default async function handler(req, res) {
  try {
    await ensureBody(req);
    handlerTarget(req, res);
  } catch (err) {
    console.error('API handler error:', err?.message || err);
    if (!res.headersSent) {
      res.status(500).setHeader('Content-Type', 'application/json').end(JSON.stringify({
        error: 'Server error',
        message: process.env.NODE_ENV === 'development' ? (err?.message || String(err)) : undefined
      }));
    }
  }
}
