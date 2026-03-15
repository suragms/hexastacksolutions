/**
 * Single Vercel API handler for all /api/* routes.
 * vercel.json rewrites /api/(.*) -> /api?path=/$1 so this is invoked; server restores path for Express.
 */
import { app } from '../server/index';

export default function handler(req: any, res: any): void {
  app(req, res);
}
