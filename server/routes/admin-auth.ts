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
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) {
            console.error('ADMIN_PASSWORD env not set');
            res.status(500).json({ error: 'Server configuration error' });
            return;
        }
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
