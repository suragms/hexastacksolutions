import express from 'express';
import { db } from '../db';
import { requireAdminOrAbove } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const settings = await db.companySettings.findFirst();
        res.json(settings || {});
    } catch (error: any) {
        console.error('[SETTINGS_GET]', error?.message || error);
        const isDb = error?.message?.includes('DATABASE') || error?.message?.includes('connect') || error?.code === 'P1001';
        res.status(isDb ? 503 : 500).json({
            error: isDb
                ? 'Database not configured. Set DATABASE_URL in Vercel/Netlify.'
                : 'Failed to fetch settings',
        });
    }
});

router.patch('/', requireAdminOrAbove, async (req, res) => {
    try {
        const allowed = [
            'companyName',
            'logoUrl',
            'primaryEmail',
            'supportEmail',
            'primaryWhatsApp',
            'secondaryWhatsApp',
            'leadName1',
            'leadEmail1',
            'leadWhatsApp1',
            'leadName2',
            'leadEmail2',
            'leadWhatsApp2',
            'address',
            'tagline',
            'description',
            'heroDesktopImageUrl',
            'heroMobileImageUrl',
        ];
        const data: Record<string, unknown> = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined) data[key] = req.body[key];
        }
        const existing = await db.companySettings.findFirst();
        let settings;
        if (existing) {
            settings = await db.companySettings.update({
                where: { id: existing.id },
                data: data as any,
            });
        } else {
            settings = await db.companySettings.create({
                data: data as any,
            });
        }
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'updated_settings',
            targetId: settings.id,
        });
        res.json(settings);
    } catch (error) {
        console.error('[SETTINGS_PATCH]', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

export default router;
