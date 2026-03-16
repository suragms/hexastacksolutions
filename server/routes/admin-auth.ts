import express from 'express';
import { generateToken } from '../utils/auth';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const body = req.body && typeof req.body === 'object' ? req.body : {};
        const password = body.password;
        if (!password || typeof password !== 'string') {
            res.status(400).json({ error: 'Password is required' });
            return;
        }
        // Production (Vercel/Netlify): ADMIN_PASSWORD must be set in Environment Variables
        const envPassword = process.env.ADMIN_PASSWORD;
        if ((process.env.VERCEL || process.env.NETLIFY) && (envPassword === undefined || envPassword === '')) {
            res.status(503).json({
                error: 'Admin login not configured. Set ADMIN_PASSWORD (and JWT_SECRET) in Vercel/Netlify Environment Variables, then redeploy.',
            });
            return;
        }
        const adminPassword = envPassword || 'hexastack@2024';
        if (password !== adminPassword) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }
        const token = generateToken('admin', 'admin');
        res.json({ token });
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;
