import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { bucketSource } from '../utils/source';

const router = express.Router();

function linearProject(values: number[], daysAhead: number): number[] {
    const n = values.length;
    if (n < 2) return Array(daysAhead).fill(values[n - 1] || 0);
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += values[i];
        sumXY += i * values[i];
        sumXX += i * i;
    }
    const denom = n * sumXX - sumX * sumX || 1;
    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;
    const out: number[] = [];
    for (let d = 1; d <= daysAhead; d++) {
        out.push(Math.max(0, Math.round(intercept + slope * (n - 1 + d))));
    }
    return out;
}

router.post('/track', async (req, res) => {
    try {
        const body = req.body && typeof req.body === 'object' ? req.body : {};
        const page = body && typeof body.page !== 'undefined' ? body.page : undefined;
        const userAgent = req.headers['user-agent'] || null;
        const ip = req.headers['x-forwarded-for'] || (req.socket && (req.socket as any).remoteAddress) || null;
        const referrerHeader = req.headers['referer'] || null;
        const referrer = (body.referrer as string) || (referrerHeader ? String(referrerHeader) : null);
        const utmSource = (body.utmSource || body.utm_source || null) as string | null;
        const source = bucketSource(utmSource, referrer);

        if (!process.env.DATABASE_URL || !String(process.env.DATABASE_URL).trim()) {
            res.status(503).json({ error: 'Analytics not configured', success: false });
            return;
        }

        const pageStr = typeof page === 'string' ? page.slice(0, 500) : 'unknown';
        await db.pageView.create({
            data: {
                page: pageStr,
                userAgent: userAgent ? String(userAgent).slice(0, 500) : null,
                ip: typeof ip === 'string' ? ip.split(',')[0].trim().slice(0, 100) : null,
                referrer: referrer ? String(referrer).slice(0, 500) : null,
                source,
            },
        });

        const today = new Date().toISOString().split('T')[0];
        const pageField =
            page === '/'
                ? 'homeViews'
                : page === '/work'
                  ? 'workViews'
                  : page === '/contact'
                    ? 'contactViews'
                    : 'totalViews';

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
            },
        });

        res.json({ success: true });
    } catch (error: unknown) {
        const err = error as { code?: string; message?: string };
        console.error('[ANALYTICS_TRACK]', err?.message ?? error);
        res.status(503).json({ error: 'Analytics temporarily unavailable.', success: false });
    }
});

router.post('/form-submit', async (_req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        await db.analytics.upsert({
            where: { date: today },
            create: { date: today, totalViews: 0, formSubmissions: 1 },
            update: { formSubmissions: { increment: 1 } },
        });
        res.json({ success: true });
    } catch (error) {
        console.error('[ANALYTICS_FORM]', error);
        res.status(500).json({ error: 'Failed to track form' });
    }
});

router.get('/stats', requireStaff, async (req, res) => {
    try {
        const days = Math.min(90, Math.max(7, parseInt(String(req.query.days || '30'), 10) || 30));
        const since = new Date();
        since.setDate(since.getDate() - days);

        const dailyStats = await db.analytics.findMany({
            where: { createdAt: { gte: since } },
            orderBy: { date: 'asc' },
            take: days,
        });

        const totals = dailyStats.reduce(
            (acc, day) => ({
                totalViews: acc.totalViews + day.totalViews,
                homeViews: acc.homeViews + day.homeViews,
                workViews: acc.workViews + day.workViews,
                contactViews: acc.contactViews + day.contactViews,
                formSubmissions: acc.formSubmissions + day.formSubmissions,
            }),
            { totalViews: 0, homeViews: 0, workViews: 0, contactViews: 0, formSubmissions: 0 },
        );

        const totalEnquiries = await db.contactMessage.count();
        const unreadEnquiries = await db.contactMessage.count({ where: { isRead: false } });

        const recentViews = await db.pageView.findMany({
            where: { createdAt: { gte: since } },
            orderBy: { createdAt: 'desc' },
            take: 100,
            select: { page: true, referrer: true, source: true, createdAt: true },
        });

        const bySource: Record<string, number> = {};
        for (const v of recentViews) {
            const s = v.source || 'direct';
            bySource[s] = (bySource[s] || 0) + 1;
        }
        // fuller count from all views in window
        const sourceAgg = await db.pageView.groupBy({
            by: ['source'],
            where: { createdAt: { gte: since } },
            _count: { _all: true },
        }).catch(() => null);

        const viewsBySource = sourceAgg
            ? sourceAgg.map((row) => ({
                  source: row.source || 'direct',
                  count: row._count._all,
              }))
            : Object.entries(bySource).map(([source, count]) => ({ source, count }));

        const viewsSeries = dailyStats.map((d) => d.totalViews);
        const projected = linearProject(viewsSeries.length ? viewsSeries : [0], 7);
        const lastDate = dailyStats.length
            ? new Date(dailyStats[dailyStats.length - 1].date)
            : new Date();
        const projectedTrend = projected.map((views, i) => {
            const d = new Date(lastDate);
            d.setDate(d.getDate() + i + 1);
            return { date: d.toISOString().split('T')[0], views };
        });

        const today = new Date().toISOString().split('T')[0];
        const todayStats = dailyStats.find((d) => d.date === today) || {
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
            viewsBySource,
            projectedTrend,
            days,
        });
    } catch (error) {
        console.error('[ANALYTICS_STATS]', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

router.get('/audit', requireStaff, async (req, res) => {
    try {
        const take = Math.min(100, parseInt(String(req.query.limit || '50'), 10) || 50);
        const userId = req.query.userId ? String(req.query.userId) : undefined;
        const action = req.query.action ? String(req.query.action) : undefined;
        const logs = await db.auditLog.findMany({
            where: {
                ...(userId ? { userId } : {}),
                ...(action ? { action } : {}),
            },
            orderBy: { createdAt: 'desc' },
            take,
        });
        const userIds = [...new Set(logs.map((l) => l.userId))];
        const users = await db.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, name: true, email: true },
        });
        const byId = Object.fromEntries(users.map((u) => [u.id, u]));
        res.json(
            logs.map((l) => ({
                ...l,
                user: byId[l.userId] || null,
            })),
        );
    } catch (error) {
        console.error('[AUDIT_LIST]', error);
        res.status(500).json({ error: 'Failed to load audit log' });
    }
});

export default router;
