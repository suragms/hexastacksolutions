import express from 'express';
import { db } from '../db';

const router = express.Router();

// GET all backlinks
router.get('/', async (_req, res) => {
    try {
        const backlinks = await db.backlink.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(backlinks);
    } catch (error: any) {
        console.error('[BACKLINKS_GET]', error?.message || error);
        const isDb = error?.message?.includes('DATABASE') || error?.message?.includes('connect') || error?.code === 'P1001';
        res.status(isDb ? 503 : 500).json({ error: isDb ? 'Database not configured.' : 'Failed to fetch backlinks' });
    }
});

// POST new backlink
router.post('/', async (req, res) => {
    try {
        const { sourceUrl, targetUrl, sourceSite, linkType, daDr, notes, status } = req.body;
        const backlink = await db.backlink.create({
            data: {
                sourceUrl: sourceUrl || '',
                targetUrl: targetUrl || null,
                sourceSite: sourceSite || null,
                linkType: linkType || null,
                daDr: daDr || null,
                notes: notes || null,
                status: status || null,
            },
        });
        res.status(201).json(backlink);
    } catch (error) {
        console.error('[BACKLINKS_POST]', error);
        res.status(500).json({ error: 'Failed to create backlink' });
    }
});

// PATCH update backlink
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sourceUrl, targetUrl, sourceSite, linkType, daDr, notes, status } = req.body;
        const allowed: Record<string, unknown> = {};
        if (sourceUrl !== undefined) allowed.sourceUrl = sourceUrl;
        if (targetUrl !== undefined) allowed.targetUrl = targetUrl || null;
        if (sourceSite !== undefined) allowed.sourceSite = sourceSite || null;
        if (linkType !== undefined) allowed.linkType = linkType || null;
        if (daDr !== undefined) allowed.daDr = daDr || null;
        if (notes !== undefined) allowed.notes = notes || null;
        if (status !== undefined) allowed.status = status || null;
        const backlink = await db.backlink.update({
            where: { id },
            data: allowed,
        });
        res.json(backlink);
    } catch (error) {
        console.error('[BACKLINKS_PATCH]', error);
        res.status(500).json({ error: 'Failed to update backlink' });
    }
});

// DELETE backlink
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.backlink.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error('[BACKLINKS_DELETE]', error);
        res.status(500).json({ error: 'Failed to delete backlink' });
    }
});

export default router;
