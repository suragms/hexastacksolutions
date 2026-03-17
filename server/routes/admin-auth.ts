import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// ── POST /api/admin/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = (req.body && typeof req.body === 'object' ? req.body : {}) as {
            email?: string;
            password?: string;
        };
        if (!password || !String(password).trim()) return res.status(400).json({ error: 'Password is required' });

        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'supporthexastack@hexastacksolutions.com';
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!ADMIN_PASSWORD || !JWT_SECRET) {
            console.error('MISSING ENV: ADMIN_PASSWORD or JWT_SECRET not set');
            return res.status(500).json({ error: 'Server misconfiguration — env vars missing' });
        }

        if (email && email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (String(password) !== String(ADMIN_PASSWORD)) {
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
