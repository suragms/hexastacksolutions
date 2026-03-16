import express from 'express';
import { db } from '../db';

const router = express.Router();

// GET all SEO location pages
router.get('/', async (_req, res) => {
    try {
        const pages = await db.seoLocationPage.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(pages);
    } catch (error: any) {
        console.error('[SEO_PAGES_GET]', error?.message || error);
        const isDb = error?.message?.includes('DATABASE') || error?.message?.includes('connect') || error?.code === 'P1001';
        res.status(isDb ? 503 : 500).json({ error: isDb ? 'Database not configured.' : 'Failed to fetch SEO pages' });
    }
});

// POST new SEO page
router.post('/', async (req, res) => {
    try {
        const { location, locationSlug, service, serviceSlug, title, description, h1, region } = req.body;
        const page = await db.seoLocationPage.create({
            data: {
                location: location || '',
                locationSlug: locationSlug || '',
                service: service || '',
                serviceSlug: serviceSlug || '',
                title: title || '',
                description: description || '',
                h1: h1 || '',
                region: region || null,
            },
        });
        res.status(201).json(page);
    } catch (error) {
        console.error('[SEO_PAGES_POST]', error);
        res.status(500).json({ error: 'Failed to create SEO page' });
    }
});

// PATCH update SEO page
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { location, locationSlug, service, serviceSlug, title, description, h1, region } = req.body;
        const page = await db.seoLocationPage.update({
            where: { id },
            data: {
                ...(location !== undefined && { location }),
                ...(locationSlug !== undefined && { locationSlug }),
                ...(service !== undefined && { service }),
                ...(serviceSlug !== undefined && { serviceSlug }),
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(h1 !== undefined && { h1 }),
                ...(region !== undefined && { region }),
            },
        });
        res.json(page);
    } catch (error) {
        console.error('[SEO_PAGES_PATCH]', error);
        res.status(500).json({ error: 'Failed to update SEO page' });
    }
});

// DELETE SEO page
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.seoLocationPage.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error('[SEO_PAGES_DELETE]', error);
        res.status(500).json({ error: 'Failed to delete SEO page' });
    }
});

export default router;
