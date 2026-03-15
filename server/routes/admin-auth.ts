import express from 'express';
import { generateToken } from '../utils/auth';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { password } = req.body;
        if (!password || typeof password !== 'string') {
            res.status(400).json({ error: 'Password is required' });
            return;
        }
        // Use ADMIN_PASSWORD from env if set; otherwise fallback so admin works without .env.
        // For production, set ADMIN_PASSWORD in your host's environment to a strong password.
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
