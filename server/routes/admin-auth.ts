import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// ── GET /api/admin/status — public; returns whether admin login is configured (for debugging deploy)
router.get('/status', (_req, res) => {
    const hasPassword = !!process.env.ADMIN_PASSWORD?.trim();
    const hasSecret = !!process.env.JWT_SECRET?.trim();
    res.json({ configured: hasPassword && hasSecret });
});

// ── POST /api/admin/login
router.post('/login', async (req, res) => {
    try {
        const body = req.body && typeof req.body === 'object' ? req.body : {};
        const email = body.email;
        const password = body.password;
        if (!password || !String(password).trim()) return res.status(400).json({ error: 'Password is required' });

        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'hexastacksolutions@gmail.com').trim();
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!ADMIN_PASSWORD?.trim() || !JWT_SECRET?.trim()) {
            console.error('MISSING ENV: ADMIN_PASSWORD or JWT_SECRET not set');
            return res.status(500).json({
                error: 'ADMIN_PASSWORD and JWT_SECRET must be set in Vercel → Settings → Environment Variables (Production), then redeploy. Open /api/admin/status to verify.',
                code: 'ENV_MISSING'
            });
        }

        if (email && String(email).trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordTrimmed = String(password).trim();
        const envPasswordTrimmed = String(ADMIN_PASSWORD).trim();
        if (passwordTrimmed !== envPasswordTrimmed) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ role: 'admin', email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ success: true, token, admin: { email: ADMIN_EMAIL, role: 'admin' } });
    } catch (err: any) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Login failed', detail: err?.message });
    }
});

// ── Auth middleware — use this in any protected admin route
export const requireAdmin: express.RequestHandler = (req: any, res, next) => {
    const header = req.headers.authorization as string | undefined;
    if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    try {
        req.admin = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET as string);
        return next();
    } catch {
        return res.status(401).json({ error: 'Token invalid or expired' });
    }
};

// Example protected route — GET /api/admin/dashboard
router.get('/dashboard', requireAdmin, (req: any, res) => {
    res.json({ success: true, message: 'Admin dashboard', admin: req.admin });
});

export default router;
