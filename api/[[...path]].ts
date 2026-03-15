/**
 * Vercel catch-all API route: handles /api, /api/admin/login, /api/contact, etc.
 * Forwards request to Express. Ensure Vercel env has ADMIN_PASSWORD and JWT_SECRET set.
 */
import { app } from '../server/index';

export default function handler(req: any, res: any): void {
  app(req, res);
}
