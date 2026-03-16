import express from 'express';
import { db } from '../db';

const router = express.Router();

// Track page view (best-effort: do not break the app if DB is down)
router.post('/track', async (req, res) => {
    try {
        const body = req.body && typeof req.body === 'object' ? req.body : {};
        const page = body.page;
        const userAgent = req.headers['user-agent'] || null;
        const ip = req.headers['x-forwarded-for'] || (req.socket && req.socket.remoteAddress) || null;
        const referrer = req.headers['referer'] || null;

        if (!process.env.DATABASE_URL?.trim()) {
            res.status(503).json({ error: 'Analytics not configured', success: false });
            return;
        }

        await db.pageView.create({
            data: {
                page: typeof page === 'string' ? page.slice(0, 500) : 'unknown',
                userAgent: userAgent?.slice(0, 500),
                ip: typeof ip === 'string' ? ip.split(',')[0].trim().slice(0, 100) : null,
                referrer: referrer?.slice(0, 500) || null,
            }
        });

        const today = new Date().toISOString().split('T')[0];
        const pageField = page === '/' ? 'homeViews' : 
                         page === '/work' ? 'workViews' :
                         page === '/contact' ? 'contactViews' : 'totalViews';

        await db.analytics.upsert({
            where: { date: today },
            create: {
                date: today,
                totalViews: 1,
                [pageField]: 1,
            },
            update: {
                totalViews: { increment: 1 },
                [pageField]: { increment: 1 },
            }
        });

        res.json({ success: true });
    } catch (error: any) {
        console.error('[ANALYTICS_TRACK]', error?.message || error);
        const isDb = error?.message?.includes('DATABASE') || error?.message?.includes('connect') || error?.code === 'P1001';
        if (isDb) {
            res.status(503).json({ error: 'Database not configured. Set DATABASE_URL in Environment Variables.', success: false });
        } else {
            res.status(500).json({ error: 'Failed to track', success: false });
        }
    }
});

// Increment form submission count
router.post('/form-submit', async (_req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        await db.analytics.upsert({
            where: { date: today },
            create: {
                date: today,
                totalViews: 0,
                formSubmissions: 1,
            },
            update: {
                formSubmissions: { increment: 1 },
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('[ANALYTICS_FORM]', error);
        res.status(500).json({ error: 'Failed to track form' });
    }
});

// Get analytics stats
router.get('/stats', async (_req, res) => {
    try {
        // Get last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const dailyStats = await db.analytics.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo }
            },
            orderBy: { date: 'desc' },
            take: 30
        });

        // Calculate totals
        const totals = dailyStats.reduce((acc, day) => ({
            totalViews: acc.totalViews + day.totalViews,
            homeViews: acc.homeViews + day.homeViews,
            workViews: acc.workViews + day.workViews,
            contactViews: acc.contactViews + day.contactViews,
            formSubmissions: acc.formSubmissions + day.formSubmissions,
        }), { totalViews: 0, homeViews: 0, workViews: 0, contactViews: 0, formSubmissions: 0 });

        // Get total enquiries count
        const totalEnquiries = await db.contactMessage.count();
        const unreadEnquiries = await db.contactMessage.count({ where: { isRead: false } });

        // Get recent page views (last 100)
        const recentViews = await db.pageView.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
            select: {
                page: true,
                referrer: true,
                createdAt: true,
            }
        });

        // Today's stats
        const today = new Date().toISOString().split('T')[0];
        const todayStats = dailyStats.find(d => d.date === today) || {
            totalViews: 0,
            homeViews: 0,
            workViews: 0,
            contactViews: 0,
            formSubmissions: 0,
        };

        res.json({
            today: todayStats,
            last30Days: totals,
            dailyBreakdown: dailyStats,
            totalEnquiries,
            unreadEnquiries,
            recentViews: recentViews.slice(0, 20),
        });
    } catch (error) {
        console.error('[ANALYTICS_STATS]', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

export default router;
