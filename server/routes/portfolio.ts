import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

// Get all portfolio projects
router.get('/', async (_req, res) => {
    try {
        const projects = await db.portfolio.findMany({
            orderBy: { displayOrder: 'asc' },
            include: { media: true }
        });
        res.json(projects);
    } catch (error: any) {
        console.error('[PORTFOLIO_GET]', error?.message || error);
        const isDb = error?.message?.includes('DATABASE') || error?.message?.includes('connect') || error?.code === 'P1001';
        res.status(isDb ? 503 : 500).json({ error: isDb ? 'Database not configured. Set DATABASE_URL in Vercel/Netlify.' : 'Internal Error' });
    }
});

router.post('/', requireStaff, async (req, res) => {
    try {
        const { title, description, techStack, projectUrl, featured, imageUrl, location, clientType, displayOrder } = req.body;
        
        const project = await db.portfolio.create({
            data: {
                title,
                description,
                techStack,
                projectUrl,
                featured: featured || false,
                displayOrder: displayOrder ?? 0,
                location,
                clientType,
                media: imageUrl ? {
                    create: { type: 'IMAGE', url: imageUrl }
                } : undefined
            },
            include: { media: true }
        });
        
        res.json(project);
    } catch (error) {
        console.error('[PORTFOLIO_POST]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Update project
router.patch('/:id', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, techStack, projectUrl, featured, imageUrl, location, clientType, displayOrder } = req.body;
        
        // Delete old media if new image provided
        if (imageUrl) {
            await db.portfolioMedia.deleteMany({ where: { portfolioId: id } });
        }
        
        const project = await db.portfolio.update({
            where: { id },
            data: {
                title,
                description,
                techStack,
                projectUrl,
                featured,
                location,
                clientType,
                displayOrder,
                media: imageUrl ? {
                    create: { type: 'IMAGE', url: imageUrl }
                } : undefined
            },
            include: { media: true }
        });
        
        res.json(project);
    } catch (error) {
        console.error('[PORTFOLIO_PATCH]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Delete project
router.delete('/:id', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete media first
        await db.portfolioMedia.deleteMany({ where: { portfolioId: id } });
        
        // Delete project
        await db.portfolio.delete({ where: { id } });
        
        res.json({ success: true });
    } catch (error) {
        console.error('[PORTFOLIO_DELETE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

router.patch('/reorder', requireStaff, async (req, res) => {
    try {
        const { orderedIds } = req.body || {};
        if (!Array.isArray(orderedIds)) {
            res.status(400).json({ error: 'orderedIds array required' });
            return;
        }
        await Promise.all(
            orderedIds.map((id: string, index: number) =>
                db.portfolio.update({ where: { id }, data: { displayOrder: index } }),
            ),
        );
        res.json({ success: true });
    } catch (error) {
        console.error('[PORTFOLIO_REORDER]', error);
        res.status(500).json({ error: 'Failed to reorder' });
    }
});

export default router;
