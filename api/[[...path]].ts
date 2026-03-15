/**
 * Vercel catch-all API route: handles /api, /api/contact, /api/portfolio, etc.
 * Forwards every request to the Express app (server/index.ts).
 */
import { app } from '../server/index';

export default function handler(req: any, res: any): void {
  app(req, res);
}
