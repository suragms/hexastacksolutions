import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { istDateKey } from '../utils/ist';

const router = express.Router();

const ORGANIC_SOURCES = ['organic', 'google', 'google_maps'];

async function getTracked() {
    const seoKeywords = await db.seoKeyword.findMany({ orderBy: { keyword: 'asc' } });
    const ranks = await db.keywordRank.findMany({ orderBy: [{ keyword: 'asc' }, { snapshotDate: 'desc' }] });

    const byKeyword = new Map<string, { latest?: (typeof ranks)[number]; previous?: (typeof ranks)[number]; count: number }>();
    for (const r of ranks) {
        const entry = byKeyword.get(r.keyword) ?? { latest: undefined, previous: undefined, count: 0 };
        entry.count += 1;
        if (!entry.latest) entry.latest = r;
        else if (!entry.previous) entry.previous = r;
        byKeyword.set(r.keyword, entry);
    }

    const seoByKeyword = new Map(seoKeywords.map((k) => [k.keyword, k]));
    const rankOnly = [...byKeyword.keys()].filter((k) => !seoByKeyword.has(k));

    const merge = (k: { keyword: string } & Record<string, unknown>) => {
        const track = byKeyword.get(k.keyword);
        return {
            ...k,
            latestPosition: track?.latest?.position ?? null,
            prevPosition: track?.previous?.position ?? null,
            delta:
                track?.latest && track?.previous
                    ? track.previous.position - track.latest.position
                    : null,
            historyCount: track?.count ?? 0,
        };
    };

    return [...seoKeywords.map(merge), ...rankOnly.map((keyword) => merge({ keyword }))];
}

/** GET /api/seo-tracking/overview — keywords + weekly metrics + organic views + backlinks. */
router.get('/overview', requireStaff, async (_req, res) => {
    try {
        const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        const [keywords, weeklyMetrics, pageViews, backlinks] = await Promise.all([
            getTracked(),
            db.weeklyMetricManual.findMany({ orderBy: { weekStart: 'desc' }, take: 12 }),
            db.pageView.findMany({
                where: { source: { in: ORGANIC_SOURCES }, createdAt: { gte: since } },
                select: { createdAt: true },
            }),
            db.backlink.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
        ]);

        const byDay = new Map<string, number>();
        for (const v of pageViews) {
            const key = istDateKey(v.createdAt);
            byDay.set(key, (byDay.get(key) || 0) + 1);
        }
        const organicViews = [...byDay.entries()]
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));

        res.json({ keywords, weeklyMetrics, organicViews, backlinks });
    } catch (err) {
        console.error('[SEO_OVERVIEW]', err);
        res.status(500).json({ error: 'Failed to load SEO overview' });
    }
});

/** SeoKeyword CRUD (static snapshot fields). */
router.get('/keywords', requireStaff, async (_req, res) => {
    try {
        res.json(await getTracked());
    } catch (err) {
        console.error('[SEO_KEYWORDS_GET]', err);
        res.status(500).json({ error: 'Failed to load keywords' });
    }
});

router.post('/keywords', requireStaff, async (req, res) => {
    try {
        const { keyword, pagePath, market, intent, painPoint, businessFit, pageBucket, mappedUrl, position, volume, kd, traffic, priorityScore } = req.body || {};
        const name = String(keyword ?? '').trim();
        if (!name) {
            res.status(400).json({ error: 'keyword is required' });
            return;
        }
        const item = await db.seoKeyword.upsert({
            where: { keyword: name },
            create: {
                keyword: name,
                pagePath: pagePath ? String(pagePath) : null,
                market: market ? String(market) : null,
                intent: intent ? String(intent) : null,
                painPoint: painPoint ? String(painPoint) : null,
                businessFit: businessFit ? String(businessFit) : null,
                pageBucket: pageBucket ? String(pageBucket) : null,
                mappedUrl: mappedUrl ? String(mappedUrl) : null,
                position: position != null ? Number(position) : null,
                volume: volume != null ? Number(volume) : null,
                kd: kd != null ? Number(kd) : null,
                traffic: traffic != null ? Number(traffic) : null,
                priorityScore: priorityScore != null ? Number(priorityScore) : null,
            },
            update: {
                pagePath: pagePath != null ? String(pagePath) : undefined,
                market: market != null ? String(market) : undefined,
                intent: intent != null ? String(intent) : undefined,
                painPoint: painPoint != null ? String(painPoint) : undefined,
                businessFit: businessFit != null ? String(businessFit) : undefined,
                pageBucket: pageBucket != null ? String(pageBucket) : undefined,
                mappedUrl: mappedUrl != null ? String(mappedUrl) : undefined,
                position: position != null ? Number(position) : undefined,
                volume: volume != null ? Number(volume) : undefined,
                kd: kd != null ? Number(kd) : undefined,
                traffic: traffic != null ? Number(traffic) : undefined,
                priorityScore: priorityScore != null ? Number(priorityScore) : undefined,
            },
        });
        res.json(item);
    } catch (err) {
        console.error('[SEO_KEYWORDS_POST]', err);
        res.status(500).json({ error: 'Failed to save keyword' });
    }
});

router.patch('/keywords/:id', requireStaff, async (req, res) => {
    try {
        const existing = await db.seoKeyword.findUnique({ where: { id: req.params.id } });
        if (!existing) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        const data: Record<string, unknown> = {};
        for (const key of ['pagePath', 'market', 'intent', 'painPoint', 'businessFit', 'pageBucket', 'mappedUrl', 'position', 'volume', 'kd', 'traffic', 'priorityScore']) {
            if (req.body[key] !== undefined) data[key] = req.body[key];
        }
        const updated = await db.seoKeyword.update({ where: { id: req.params.id }, data: data as any });
        res.json(updated);
    } catch (err) {
        console.error('[SEO_KEYWORDS_PATCH]', err);
        res.status(500).json({ error: 'Failed to update keyword' });
    }
});

router.delete('/keywords/:id', requireStaff, async (req, res) => {
    try {
        await db.seoKeyword.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (err) {
        console.error('[SEO_KEYWORDS_DELETE]', err);
        res.status(500).json({ error: 'Failed to delete keyword' });
    }
});

/** KeywordRank positions (time series). */
router.post('/positions', requireStaff, async (req, res) => {
    try {
        const { keyword, position, volume, kd, traffic, snapshotDate, notes } = req.body || {};
        const name = String(keyword ?? '').trim();
        const pos = Number(position);
        if (!name || !Number.isFinite(pos)) {
            res.status(400).json({ error: 'keyword and position are required' });
            return;
        }
        const date = snapshotDate ? String(snapshotDate) : istDateKey();
        // Ensure it also appears in the tracker list.
        await db.seoKeyword.upsert({
            where: { keyword: name },
            create: { keyword: name, position: pos },
            update: { position: pos },
        });
        const item = await db.keywordRank.upsert({
            where: { keyword_snapshotDate: { keyword: name, snapshotDate: date } },
            create: {
                keyword: name,
                position: pos,
                volume: volume != null ? Number(volume) : null,
                kd: kd != null ? Number(kd) : null,
                traffic: traffic != null ? Number(traffic) : null,
                snapshotDate: date,
                notes: notes ? String(notes).slice(0, 500) : null,
            },
            update: {
                position: pos,
                volume: volume != null ? Number(volume) : undefined,
                kd: kd != null ? Number(kd) : undefined,
                traffic: traffic != null ? Number(traffic) : undefined,
                notes: notes != null ? String(notes).slice(0, 500) : undefined,
            },
        });
        res.status(201).json(item);
    } catch (err) {
        console.error('[SEO_POSITIONS_POST]', err);
        res.status(500).json({ error: 'Failed to log position' });
    }
});

router.patch('/positions/:id', requireStaff, async (req, res) => {
    try {
        const existing = await db.keywordRank.findUnique({ where: { id: req.params.id } });
        if (!existing) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        const data: Record<string, unknown> = {};
        if (req.body.position !== undefined) data.position = Number(req.body.position);
        if (req.body.volume !== undefined) data.volume = req.body.volume != null ? Number(req.body.volume) : null;
        if (req.body.kd !== undefined) data.kd = req.body.kd != null ? Number(req.body.kd) : null;
        if (req.body.traffic !== undefined) data.traffic = req.body.traffic != null ? Number(req.body.traffic) : null;
        if (req.body.notes !== undefined) data.notes = req.body.notes ? String(req.body.notes).slice(0, 500) : null;
        const updated = await db.keywordRank.update({ where: { id: req.params.id }, data: data as any });
        res.json(updated);
    } catch (err) {
        console.error('[SEO_POSITIONS_PATCH]', err);
        res.status(500).json({ error: 'Failed to update position' });
    }
});

router.delete('/positions/:id', requireStaff, async (req, res) => {
    try {
        await db.keywordRank.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (err) {
        console.error('[SEO_POSITIONS_DELETE]', err);
        res.status(500).json({ error: 'Failed to delete position' });
    }
});

/** GET /api/seo-tracking/history?keyword= — position history for one keyword (asc). */
router.get('/history', requireStaff, async (req, res) => {
    try {
        const keyword = String(req.query.keyword ?? '').trim();
        if (!keyword) {
            res.status(400).json({ error: 'keyword is required' });
            return;
        }
        const items = await db.keywordRank.findMany({
            where: { keyword },
            orderBy: { snapshotDate: 'asc' },
        });
        res.json(items);
    } catch (err) {
        console.error('[SEO_HISTORY]', err);
        res.status(500).json({ error: 'Failed to load keyword history' });
    }
});

export default router;
