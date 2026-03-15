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
        // Production: set ADMIN_PASSWORD in Vercel/Netlify env. Dev fallback: hexastack@2024
        const adminPassword = process.env.ADMIN_PASSWORD || 'hexastack@2024';
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
