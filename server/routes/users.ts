import express from 'express';
import { db } from '../db';
import {
    createUser,
    generateTempPassword,
    hashPassword,
    requireAuth,
    requireRole,
} from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

const userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    active: true,
    mustChangePassword: true,
    lastLoginAt: true,
    createdAt: true,
};

router.get('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'STAFF']), async (_req, res) => {
    try {
        const users = await db.user.findMany({
            select: userSelect,
            orderBy: { createdAt: 'desc' },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.post('/', requireRole(['SUPER_ADMIN']), async (req, res) => {
    try {
        const { name, email, role } = req.body || {};
        if (!name || !email) {
            res.status(400).json({ error: 'name and email are required' });
            return;
        }
        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'STAFF'];
        const roleVal = allowedRoles.includes(role) ? role : 'STAFF';
        const tempPassword = generateTempPassword();
        const user = await createUser(
            String(email).trim().toLowerCase(),
            tempPassword,
            String(name).trim(),
            roleVal,
            { mustChangePassword: true },
        );
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'created_staff',
            targetId: user.id,
            meta: { email: user.email, role: user.role },
        });
        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                active: user.active,
                mustChangePassword: true,
                lastLoginAt: null,
                createdAt: user.createdAt,
            },
            tempPassword,
        });
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(409).json({ error: 'Email already exists' });
            return;
        }
        console.error('[USERS_POST]', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

router.patch('/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, active, password } = req.body || {};
        const isSelf = req.auth!.userId === id;
        const isSuper = req.auth!.role === 'SUPER_ADMIN';

        if (!isSelf && !isSuper) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        const data: Record<string, unknown> = {};
        if (name != null && (isSelf || isSuper)) data.name = String(name).trim();
        if (password != null && isSelf) {
            if (String(password).length < 8) {
                res.status(400).json({ error: 'Password must be at least 8 characters' });
                return;
            }
            data.password = await hashPassword(String(password));
            data.mustChangePassword = false;
        }
        if (isSuper) {
            if (role != null) {
                if (!['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(role)) {
                    res.status(400).json({ error: 'Invalid role' });
                    return;
                }
                data.role = role;
            }
            if (active !== undefined) data.active = Boolean(active);
        }

        const user = await db.user.update({
            where: { id },
            data: data as any,
            select: userSelect,
        });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'updated_staff',
            targetId: id,
            meta: { fields: Object.keys(data) },
        });
        res.json(user);
    } catch (error) {
        console.error('[USERS_PATCH]', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

router.delete('/:id', requireRole(['SUPER_ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        if (id === req.auth!.userId) {
            res.status(400).json({ error: 'Cannot deactivate yourself' });
            return;
        }
        const target = await db.user.findUnique({ where: { id } });
        if (!target) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (target.role === 'SUPER_ADMIN') {
            const supers = await db.user.count({ where: { role: 'SUPER_ADMIN', active: true } });
            if (supers <= 1) {
                res.status(400).json({ error: 'Cannot deactivate the last SUPER_ADMIN' });
                return;
            }
        }
        const user = await db.user.update({
            where: { id },
            data: { active: false },
            select: userSelect,
        });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'deactivated_staff',
            targetId: id,
        });
        res.json(user);
    } catch (error) {
        console.error('[USERS_DELETE]', error);
        res.status(500).json({ error: 'Failed to deactivate user' });
    }
});

router.post('/:id/reset-password', requireRole(['SUPER_ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        const tempPassword = generateTempPassword();
        const hashed = await hashPassword(tempPassword);
        await db.user.update({
            where: { id },
            data: { password: hashed, mustChangePassword: true },
        });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'reset_staff_password',
            targetId: id,
        });
        res.json({ tempPassword });
    } catch (error) {
        console.error('[USERS_RESET]', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

export default router;
