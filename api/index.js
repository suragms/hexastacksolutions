/**
 * ESM entry for Vercel. Loads the Express app from the CJS server bundle (Prisma/TS backend).
 * With "type": "module", this file must use import/export; the bundle stays CommonJS.
 */
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

let app;
try {
  app = require(path.join(__dirname, 'server-bundle.cjs')).app;
} catch (e) {
  console.error('[API] Failed to load server-bundle.cjs. Run: node scripts/build-api-bundle.cjs', e?.message);
  app = null;
}

// If bundle failed to load, export a stub that returns 503
const handler = app || function (req, res) {
  res.statusCode = 503;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: 'Server bundle not loaded. Ensure build runs: node scripts/build-api-bundle.cjs',
    success: false
  }));
};

// Local dev only — Vercel does NOT call app.listen()
if (process.env.NODE_ENV !== 'production' && app?.listen) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Dev server: http://localhost:${PORT}`));
}

export default app || handler;
