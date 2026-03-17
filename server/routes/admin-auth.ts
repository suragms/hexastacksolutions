import express from 'express';
import { generateToken } from '../utils/auth';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const body = req.body && typeof req.body === 'object' ? req.body : {};
        const rawPassword = body && typeof body.password !== 'undefined' ? body.password : undefined;
        const password = typeof rawPassword === 'string' ? rawPassword.trim() : '';
        if (!password) {
            res.status(400).json({ error: 'Password is required' });
            return;
        }
        const isProduction = !!(process.env.VERCEL || process.env.NETLIFY);
        const envPassword = process.env.ADMIN_PASSWORD;
        const envJwtSecret = process.env.JWT_SECRET;

        if (isProduction && (envPassword === undefined || String(envPassword).trim() === '')) {
            res.status(503).json({
                error: 'Admin login not configured. Set ADMIN_PASSWORD (and JWT_SECRET) in Vercel Environment Variables, then redeploy.',
            });
            return;
        }
        if (isProduction && (!envJwtSecret || String(envJwtSecret).trim() === '')) {
            res.status(503).json({
                error: 'JWT_SECRET is not set. Add JWT_SECRET in Vercel Environment Variables and redeploy.',
            });
            return;
        }
        const adminPassword = (envPassword && String(envPassword).trim()) || 'hexastack@2024';
        if (password !== adminPassword) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }
        let token: string;
        try {
            token = generateToken('admin', 'admin');
        } catch (jwtErr: unknown) {
            const msg = (jwtErr as { message?: string })?.message ?? jwtErr;
            console.error('Admin JWT error:', msg);
            res.status(503).json({ error: 'JWT_SECRET invalid or missing. Set JWT_SECRET in Vercel Environment Variables and redeploy.' });
            return;
        }
        res.json({ token });
    } catch (err: unknown) {
        const msg = (err as { message?: string })?.message ?? err;
        console.error('Admin login error:', msg);
        res.status(503).json({ error: 'Login failed. Set ADMIN_PASSWORD and JWT_SECRET in Vercel Environment Variables and redeploy.' });
    }
});

export default router;
