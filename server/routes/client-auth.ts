import express from 'express';
import { db } from '../db';
import { hashPassword, verifyPassword, generateToken } from '../utils/auth';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, company, email, whatsapp, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Name, email and password are required' });
            return;
        }
        const existing = await db.client.findUnique({ where: { email: email.trim().toLowerCase() } });
        if (existing) {
            res.status(400).json({ error: 'An account with this email already exists' });
            return;
        }
        const hashed = await hashPassword(password);
        const client = await db.client.create({
            data: {
                name: name.trim(),
                company: company ? String(company).trim().slice(0, 200) : null,
                email: email.trim().toLowerCase(),
                whatsapp: whatsapp ? String(whatsapp).trim().slice(0, 30) : null,
                password: hashed,
                status: 'pending',
            },
        });
        res.status(201).json({
            success: true,
            message: 'Account created. Pending approval.',
            clientId: client.id,
        });
    } catch (err) {
        console.error('Client register error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const client = await db.client.findUnique({
            where: { email: email.trim().toLowerCase() },
        });
        if (!client) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const valid = await verifyPassword(password, client.password);
        if (!valid) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const token = generateToken(client.id, 'client');
        res.json({
            token,
            client: {
                id: client.id,
                name: client.name,
                email: client.email,
                company: client.company,
                whatsapp: client.whatsapp,
                status: client.status,
            },
        });
    } catch (err) {
        console.error('Client login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;
