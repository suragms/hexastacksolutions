import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db';

export type AuthUser = {
    userId: string;
    role: string;
};

declare global {
    namespace Express {
        interface Request {
            auth?: AuthUser;
        }
    }
}

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET && String(process.env.JWT_SECRET).trim();
    const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL || !!process.env.NETLIFY;
    if (secret) return secret;
    if (isProd) throw new Error('JWT_SECRET is not set');
    return 'dev-secret';
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string, role: string): string {
    return jwt.sign({ userId, role }, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthUser | null {
    try {
        const payload = jwt.verify(token, getJwtSecret()) as { userId: string; role: string };
        return { userId: payload.userId, role: payload.role };
    } catch {
        return null;
    }
}

export function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No token' });
        return;
    }
    const payload = verifyToken(header.slice(7));
    if (!payload) {
        res.status(401).json({ error: 'Token invalid or expired' });
        return;
    }
    req.auth = payload;
    next();
}

export function requireRole(roles: string[]) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        requireAuth(req, res, () => {
            if (!req.auth || !roles.includes(req.auth.role)) {
                res.status(403).json({ error: 'Forbidden' });
                return;
            }
            next();
        });
    };
}

/** Any staff role (SUPER_ADMIN, ADMIN, STAFF). */
export const requireStaff = requireRole(['SUPER_ADMIN', 'ADMIN', 'STAFF']);

/** Settings / elevated ops — not STAFF. */
export const requireAdminOrAbove = requireRole(['SUPER_ADMIN', 'ADMIN']);

export async function createUser(
    email: string,
    password: string,
    name: string,
    role: string = 'STAFF',
    opts?: { mustChangePassword?: boolean; active?: boolean },
) {
    const hashedPassword = await hashPassword(password);
    return db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: role as any,
            mustChangePassword: opts?.mustChangePassword ?? false,
            active: opts?.active ?? true,
        },
    });
}

export async function authenticateUser(email: string, password: string) {
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) return null;
    if (user.active === false) return null;

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return null;

    return user;
}

export function generateTempPassword(length = 12): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$';
    let out = '';
    for (let i = 0; i < length; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
}
