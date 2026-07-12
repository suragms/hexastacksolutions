import express from 'express';
import { authenticateUser, createUser, generateToken, hashPassword, requireAuth } from '../utils/auth';
import { db } from '../db';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const user = await authenticateUser(String(email).trim().toLowerCase(), password);

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        await db.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        const token = generateToken(user.id, user.role);
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                mustChangePassword: user.mustChangePassword,
            },
        });
    } catch (error) {
        console.error('[AUTH_LOGIN]', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

/** Bootstrap only when no users exist; otherwise SUPER_ADMIN-only via /api/users. */
router.post('/register', async (req, res) => {
    try {
        const count = await db.user.count();
        if (count > 0) {
            res.status(403).json({ error: 'Registration closed. Ask a SUPER_ADMIN to create your account.' });
            return;
        }
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ error: 'name, email, and password are required' });
            return;
        }
        const user = await createUser(String(email).trim().toLowerCase(), password, String(name).trim(), 'SUPER_ADMIN');
        const token = generateToken(user.id, user.role);
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                mustChangePassword: false,
            },
        });
    } catch (error) {
        console.error('[AUTH_REGISTER]', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/change-password', requireAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body || {};
        if (!newPassword || String(newPassword).length < 8) {
            res.status(400).json({ error: 'New password must be at least 8 characters' });
            return;
        }
        const user = await db.user.findUnique({ where: { id: req.auth!.userId } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (user.mustChangePassword) {
            // First login: current password optional if they have the temp
            if (currentPassword) {
                const { verifyPassword } = await import('../utils/auth');
                const ok = await verifyPassword(currentPassword, user.password);
                if (!ok) {
                    res.status(401).json({ error: 'Current password incorrect' });
                    return;
                }
            }
        } else {
            if (!currentPassword) {
                res.status(400).json({ error: 'Current password required' });
                return;
            }
            const { verifyPassword } = await import('../utils/auth');
            const ok = await verifyPassword(currentPassword, user.password);
            if (!ok) {
                res.status(401).json({ error: 'Current password incorrect' });
                return;
            }
        }
        const hashed = await hashPassword(String(newPassword));
        await db.user.update({
            where: { id: user.id },
            data: { password: hashed, mustChangePassword: false },
        });
        res.json({ success: true });
    } catch (error) {
        console.error('[AUTH_CHANGE_PASSWORD]', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await db.user.findUnique({
            where: { id: req.auth!.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                active: true,
                mustChangePassword: true,
                lastLoginAt: true,
            },
        });
        if (!user || !user.active) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load user' });
    }
});

export default router;
