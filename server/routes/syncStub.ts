/**
 * Legacy “sync bucket” endpoints used by src/lib/remoteSync.ts (Mongo sync service).
 * Implemented on the main API so local dev only needs one process (no second server on :4000).
 * Optional: run `npm run api:dev` with Mongo if you need real cross-device sync buckets.
 */
import express from 'express';

const router = express.Router();

router.get('/contact', (_req, res) => {
  res.json({ items: [] });
});

router.put('/contact', (_req, res) => {
  res.json({ ok: true, count: 0 });
});

router.get('/testimonials', (_req, res) => {
  res.json({ items: [] });
});

router.put('/testimonials', (_req, res) => {
  res.json({ ok: true, count: 0 });
});

router.get('/content', (_req, res) => {
  res.json({ categories: [], products: [] });
});

router.put('/content', (_req, res) => {
  res.json({ ok: true, categories: 0, products: 0 });
});

export default router;
