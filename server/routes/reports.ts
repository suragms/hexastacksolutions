import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';
import { addIstDays, istDateKey } from '../utils/ist';
import { getNotificationEmails, sendResend } from '../utils/email';

const router = express.Router();

const ORGANIC_SOURCES = ['organic', 'google', 'google_maps'];

/** Absolute IST day range for a YYYY-MM-DD key (start midnight IST, end midnight next day). */
function istRange(dateKey: string): { start: Date; end: Date } {
    const start = new Date(`${dateKey}T00:00:00+05:30`);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    return { start, end };
}

async function buildDailyReport(dateKey: string) {
    const D = dateKey || istDateKey();
    const { start, end } = istRange(D);
    const monthStart = new Date(`${D.slice(0, 7)}-01T00:00:00+05:30`);

    const [
        enquiries,
        pageViews,
        organicViews,
        formSubmissions,
        tasksCreated,
        tasksCompleted,
        outreachAgg,
        outreachEvents,
        wonMtd,
        quoted,
        slaBreaches,
        newClients,
    ] = await Promise.all([
        db.contactMessage.groupBy({
            by: ['stage'],
            where: { createdAt: { gte: start, lt: end } },
            _count: { _all: true },
        }),
        db.pageView.count({ where: { createdAt: { gte: start, lt: end } } }),
        db.pageView.count({ where: { createdAt: { gte: start, lt: end }, source: { in: ORGANIC_SOURCES } } }),
        db.analytics.aggregate({
            where: { createdAt: { gte: start, lt: end } },
            _sum: { formSubmissions: true },
        }),
        db.task.count({ where: { createdAt: { gte: start, lt: end } } }),
        db.task.count({ where: { status: 'COMPLETED', updatedAt: { gte: start, lt: end } } }),
        db.dailyLog.aggregate({ where: { date: D }, _sum: { outreachCount: true } }),
        db.outreachLog.count({ where: { createdAt: { gte: start, lt: end } } }),
        db.contactMessage.findMany({
            where: { stage: 'won', wonAt: { gte: monthStart, lt: end } },
            select: { dealValue: true, currency: true, name: true, wonAt: true },
        }),
        db.contactMessage.aggregate({
            where: { stage: 'quoted', dealValue: { not: null } },
            _sum: { dealValue: true },
            _count: true,
        }),
        db.contactMessage.count({
            where: {
                firstRepliedAt: null,
                stage: { in: ['new', 'contacted'] },
                createdAt: { lt: new Date(end.getTime() - 2 * 60 * 60 * 1000) },
            },
        }),
        db.client.count({ where: { createdAt: { gte: start, lt: end } } }),
    ]);

    const stageCounts: Record<string, number> = { new: 0, contacted: 0, quoted: 0, won: 0, lost: 0 };
    for (const row of enquiries) stageCounts[row.stage] = row._count._all;
    const totalNew = stageCounts.new + stageCounts.contacted + stageCounts.quoted + stageCounts.won + stageCounts.lost;
    const wonMtdValue = wonMtd.reduce((s, w) => s + (w.dealValue || 0), 0);

    return {
        date: D,
        enquiriesByStage: stageCounts,
        totalEnquiries: totalNew,
        pageViews,
        organicViews,
        formSubmissions: formSubmissions._sum.formSubmissions || 0,
        tasksCreated,
        tasksCompleted,
        outreachCount: outreachAgg._sum.outreachCount || 0,
        outreachEvents,
        revenue: {
            wonMtd: wonMtdValue,
            wonDeals: wonMtd.length,
            quotedPipeline: quoted._sum.dealValue || 0,
            quotedDeals: quoted._count,
        },
        slaBreaches,
        newClients,
    };
}

function summaryOf(report: Awaited<ReturnType<typeof buildDailyReport>>): string {
    return [
        `Enquiries ${report.totalEnquiries}`,
        `views ${report.pageViews}`,
        `tasks ${report.tasksCreated}/${report.tasksCompleted}`,
        `won ₹${report.revenue.wonMtd.toLocaleString('en-IN')}`,
        `SLA ${report.slaBreaches}`,
    ].join(' · ');
}

function reportHtml(report: Awaited<ReturnType<typeof buildDailyReport>>): string {
    const s = report.enquiriesByStage;
    return `
        <h2>HexaStack daily report — ${report.date}</h2>
        <h3>Enquiries (${report.totalEnquiries})</h3>
        <ul>
            <li>New: ${s.new}</li>
            <li>Contacted: ${s.contacted}</li>
            <li>Quoted: ${s.quoted}</li>
            <li>Won: ${s.won}</li>
            <li>Lost: ${s.lost}</li>
        </ul>
        <h3>Traffic</h3>
        <ul>
            <li>Page views: ${report.pageViews} (organic ${report.organicViews})</li>
            <li>Form submissions: ${report.formSubmissions}</li>
        </ul>
        <h3>Operations</h3>
        <ul>
            <li>Tasks created: ${report.tasksCreated} / completed: ${report.tasksCompleted}</li>
            <li>Outreach: ${report.outreachCount} (events ${report.outreachEvents})</li>
            <li>SLA breaches: ${report.slaBreaches}</li>
            <li>New clients: ${report.newClients}</li>
        </ul>
        <h3>Revenue</h3>
        <ul>
            <li>Won MTD: ₹${report.revenue.wonMtd.toLocaleString('en-IN')} (${report.revenue.wonDeals} deals)</li>
            <li>Quoted pipeline: ₹${report.revenue.quotedPipeline.toLocaleString('en-IN')} (${report.revenue.quotedDeals} deals)</li>
        </ul>
    `;
}

async function sendAndSaveReport(opts: { date: string; createdBy: string }): Promise<{ report: Awaited<ReturnType<typeof buildDailyReport>>; sent: boolean }> {
    const report = await buildDailyReport(opts.date);
    const recipients = await getNotificationEmails();
    let sent = false;
    if (recipients.length) {
        sent = await sendResend({
            to: recipients,
            subject: `HexaStack daily report — ${report.date}`,
            html: reportHtml(report),
        });
    }
    await db.dailyReport.upsert({
        where: { date: report.date },
        create: {
            date: report.date,
            summary: summaryOf(report),
            json: JSON.stringify(report),
            emailedTo: recipients,
            sentAt: new Date(),
            createdBy: opts.createdBy,
        },
        update: {
            summary: summaryOf(report),
            json: JSON.stringify(report),
            emailedTo: recipients,
            sentAt: new Date(),
            createdBy: opts.createdBy,
        },
    });
    return { report, sent };
}

/** GET /api/reports/daily?date= — aggregate for a date (default today IST). */
router.get('/daily', requireStaff, async (req, res) => {
    try {
        const date = req.query.date ? String(req.query.date) : istDateKey();
        const report = await buildDailyReport(date);
        res.json(report);
    } catch (err) {
        console.error('[REPORTS_DAILY]', err);
        res.status(500).json({ error: 'Failed to build daily report' });
    }
});

/** POST /api/reports/daily/send — build, email to notification list, save history. */
router.post('/daily/send', requireStaff, async (req, res) => {
    try {
        const date = req.body?.date ? String(req.body.date) : istDateKey();
        const { report, sent } = await sendAndSaveReport({ date, createdBy: req.auth!.userId });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'daily_report_sent',
            targetId: report.date,
            meta: { sent, date: report.date },
        });
        res.json({ success: true, sent, date: report.date, summary: summaryOf(report) });
    } catch (err) {
        console.error('[REPORTS_DAILY_SEND]', err);
        res.status(500).json({ error: 'Failed to send daily report' });
    }
});

/**
 * GET /api/reports/daily/send?date=&secret= — public, for external cron.
 * Guarded by OPS_DIGEST_SECRET (header x-ops-digest-secret or ?secret=), or a staff JWT.
 */
router.get('/daily/send', async (req, res) => {
    try {
        const cronSecret = process.env.OPS_DIGEST_SECRET;
        const headerSecret = req.headers['x-ops-digest-secret'];
        const querySecret = req.query.secret;
        const vercelCron = req.headers['x-vercel-cron'];
        const isCron =
            vercelCron === '1' || Boolean(cronSecret && (headerSecret === cronSecret || querySecret === cronSecret));

        if (!isCron) {
            const header = req.headers.authorization;
            if (!header?.startsWith('Bearer ')) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const { verifyToken } = await import('../utils/auth');
            const payload = verifyToken(header.slice(7));
            if (!payload || (payload.role !== 'SUPER_ADMIN' && payload.role !== 'ADMIN')) {
                res.status(403).json({ error: 'Admin required' });
                return;
            }
            req.auth = payload;
        }

        const date = req.query.date ? String(req.query.date) : istDateKey();
        const { report, sent } = await sendAndSaveReport({ date, createdBy: 'cron' });
        res.json({ success: true, sent, date: report.date, summary: summaryOf(report) });
    } catch (err) {
        console.error('[REPORTS_CRON_SEND]', err);
        res.status(500).json({ error: 'Failed to send daily report' });
    }
});

/** GET /api/reports/history — saved report history (latest 30). */
router.get('/history', requireStaff, async (_req, res) => {
    try {
        const items = await db.dailyReport.findMany({
            orderBy: { createdAt: 'desc' },
            take: 30,
        });
        res.json(items);
    } catch (err) {
        console.error('[REPORTS_HISTORY]', err);
        res.status(500).json({ error: 'Failed to load report history' });
    }
});

/** GET /api/reports/dates?days=30 — available recent IST dates (backfill helper). */
router.get('/dates', requireStaff, async (_req, res) => {
    try {
        const days = Math.min(90, Math.max(7, Number(_req.query.days) || 30));
        const today = istDateKey();
        const dates: string[] = [];
        for (let i = 0; i < days; i++) dates.push(addIstDays(today, -i));
        res.json(dates);
    } catch (err) {
        console.error('[REPORTS_DATES]', err);
        res.status(500).json({ error: 'Failed to list dates' });
    }
});

export default router;
