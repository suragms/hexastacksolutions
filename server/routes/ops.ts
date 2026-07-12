import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';
import { addIstDays, istDateKey, istHour, istWeekStart } from '../utils/ist';

const router = express.Router();
const OUTREACH_TARGET = 5;

async function sendResend(opts: { to: string; subject: string; html: string }) {
  if (!process.env.RESEND_API_KEY) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'HexaStack <onboarding@resend.dev>',
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    }),
  });
  return response.ok;
}

async function computeStreak(userId: string): Promise<number> {
  let streak = 0;
  let cursor = istDateKey();
  // If today is incomplete, start from yesterday for display streak of completed days,
  // but count today if already >= target.
  for (let i = 0; i < 365; i++) {
    const log = await db.dailyLog.findUnique({
      where: { userId_date: { userId, date: cursor } },
    });
    if (!log || log.outreachCount < OUTREACH_TARGET) {
      if (i === 0 && istHour() < 24) {
        // today not done yet — continue from yesterday without breaking streak display of prior days
        cursor = addIstDays(cursor, -1);
        continue;
      }
      break;
    }
    streak += 1;
    cursor = addIstDays(cursor, -1);
  }
  return streak;
}

/** GET/POST today's outreach DailyLog */
router.get('/daily', requireStaff, async (req, res) => {
  try {
    const isSuper = req.auth!.role === 'SUPER_ADMIN';
    const userId = isSuper && req.query.userId ? String(req.query.userId) : req.auth!.userId;
    const date = istDateKey();
    const log = await db.dailyLog.findUnique({
      where: { userId_date: { userId, date } },
    });
    const streak = await computeStreak(userId);
    const afterHours = istHour() >= 18;
    const count = log?.outreachCount ?? 0;

    let allUsers: Array<{ userId: string; name: string; email: string; outreachCount: number; streak: number }> = [];
    if (isSuper) {
      const users = await db.user.findMany({
        where: { active: true },
        select: { id: true, name: true, email: true },
      });
      const logs = await db.dailyLog.findMany({ where: { date } });
      const byUser = Object.fromEntries(logs.map((l) => [l.userId, l.outreachCount]));
      allUsers = await Promise.all(
        users.map(async (u) => ({
          userId: u.id,
          name: u.name,
          email: u.email,
          outreachCount: byUser[u.id] ?? 0,
          streak: await computeStreak(u.id),
        }))
      );
    }

    res.json({
      date,
      userId,
      outreachCount: count,
      target: OUTREACH_TARGET,
      streak,
      redFlag: afterHours && count === 0,
      afterHours,
      allUsers: isSuper ? allUsers : undefined,
    });
  } catch (err) {
    console.error('[OPS_DAILY_GET]', err);
    res.status(500).json({ error: 'Failed to load daily log' });
  }
});

router.post('/daily', requireStaff, async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const date = istDateKey();
    const increment = Math.max(1, Number(req.body?.increment) || 1);
    const log = await db.dailyLog.upsert({
      where: { userId_date: { userId, date } },
      create: { userId, date, outreachCount: increment },
      update: { outreachCount: { increment } },
    });
    const streak = await computeStreak(userId);
    res.json({
      date,
      outreachCount: log.outreachCount,
      target: OUTREACH_TARGET,
      streak,
      redFlag: istHour() >= 18 && log.outreachCount === 0,
    });
  } catch (err) {
    console.error('[OPS_DAILY_POST]', err);
    res.status(500).json({ error: 'Failed to update daily log' });
  }
});

/** OutreachLog CRUD */
router.get('/outreach', requireStaff, async (req, res) => {
  try {
    const isSuper = req.auth!.role === 'SUPER_ADMIN';
    const where = isSuper && !req.query.mine ? {} : { userId: req.auth!.userId };
    const items = await db.outreachLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json(items);
  } catch (err) {
    console.error('[OPS_OUTREACH_GET]', err);
    res.status(500).json({ error: 'Failed to list outreach' });
  }
});

router.post('/outreach', requireStaff, async (req, res) => {
  try {
    const { channel, targetName, targetInfo, repliedAt, convertedToLeadId, bumpDaily } = req.body || {};
    const allowed = ['whatsapp', 'linkedin', 'email', 'instagram_dm'];
    if (!channel || !allowed.includes(String(channel))) {
      res.status(400).json({ error: 'Invalid channel' });
      return;
    }
    const item = await db.outreachLog.create({
      data: {
        userId: req.auth!.userId,
        channel: String(channel),
        targetName: targetName ? String(targetName).slice(0, 200) : null,
        targetInfo: targetInfo ? String(targetInfo).slice(0, 500) : null,
        repliedAt: repliedAt ? new Date(repliedAt) : null,
        convertedToLeadId: convertedToLeadId || null,
      },
    });
    if (bumpDaily !== false) {
      const date = istDateKey();
      await db.dailyLog.upsert({
        where: { userId_date: { userId: req.auth!.userId, date } },
        create: { userId: req.auth!.userId, date, outreachCount: 1 },
        update: { outreachCount: { increment: 1 } },
      });
    }
    res.status(201).json(item);
  } catch (err) {
    console.error('[OPS_OUTREACH_POST]', err);
    res.status(500).json({ error: 'Failed to create outreach log' });
  }
});

router.patch('/outreach/:id', requireStaff, async (req, res) => {
  try {
    const existing = await db.outreachLog.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    if (existing.userId !== req.auth!.userId && req.auth!.role !== 'SUPER_ADMIN') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    const { channel, targetName, targetInfo, repliedAt, convertedToLeadId } = req.body || {};
    const data: Record<string, unknown> = {};
    if (channel != null) data.channel = String(channel);
    if (targetName !== undefined) data.targetName = targetName ? String(targetName).slice(0, 200) : null;
    if (targetInfo !== undefined) data.targetInfo = targetInfo ? String(targetInfo).slice(0, 500) : null;
    if (repliedAt !== undefined) data.repliedAt = repliedAt ? new Date(repliedAt) : null;
    if (convertedToLeadId !== undefined) data.convertedToLeadId = convertedToLeadId || null;
    const updated = await db.outreachLog.update({ where: { id: req.params.id }, data: data as any });
    res.json(updated);
  } catch (err) {
    console.error('[OPS_OUTREACH_PATCH]', err);
    res.status(500).json({ error: 'Failed to update outreach' });
  }
});

router.delete('/outreach/:id', requireStaff, async (req, res) => {
  try {
    const existing = await db.outreachLog.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    if (existing.userId !== req.auth!.userId && req.auth!.role !== 'SUPER_ADMIN') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    await db.outreachLog.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    console.error('[OPS_OUTREACH_DELETE]', err);
    res.status(500).json({ error: 'Failed to delete outreach' });
  }
});

/** SLA: unreplied enquiries older than 2h */
router.get('/sla', requireStaff, async (_req, res) => {
  try {
    const cutoff = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const items = await db.contactMessage.findMany({
      where: {
        firstRepliedAt: null,
        stage: { in: ['new', 'contacted'] },
        createdAt: { lt: cutoff },
      },
      orderBy: { createdAt: 'asc' },
      take: 100,
    });
    res.json(
      items.map((m) => ({
        ...m,
        ageHours: Math.round((Date.now() - new Date(m.createdAt).getTime()) / 3600000),
      }))
    );
  } catch (err) {
    console.error('[OPS_SLA]', err);
    res.status(500).json({ error: 'Failed to load SLA list' });
  }
});

/** Weekly manual metrics */
router.get('/weekly-metrics', requireStaff, async (_req, res) => {
  try {
    const weekStart = istWeekStart();
    const item = await db.weeklyMetricManual.findUnique({ where: { weekStart } });
    res.json(item || { weekStart, gscClicks: null, gbpViews: null, linkedInReach: null, notes: null });
  } catch (err) {
    console.error('[OPS_WEEKLY_GET]', err);
    res.status(500).json({ error: 'Failed to load weekly metrics' });
  }
});

router.put('/weekly-metrics', requireStaff, async (req, res) => {
  try {
    const weekStart = req.body?.weekStart ? String(req.body.weekStart) : istWeekStart();
    const data = {
      gscClicks: req.body?.gscClicks != null ? Number(req.body.gscClicks) : null,
      gbpViews: req.body?.gbpViews != null ? Number(req.body.gbpViews) : null,
      linkedInReach: req.body?.linkedInReach != null ? Number(req.body.linkedInReach) : null,
      notes: req.body?.notes != null ? String(req.body.notes).slice(0, 2000) : null,
    };
    const item = await db.weeklyMetricManual.upsert({
      where: { weekStart },
      create: { weekStart, ...data },
      update: data,
    });
    res.json(item);
  } catch (err) {
    console.error('[OPS_WEEKLY_PUT]', err);
    res.status(500).json({ error: 'Failed to save weekly metrics' });
  }
});

/** Digest — SUPER_ADMIN or cron with OPS_DIGEST_SECRET */
router.post('/digest', async (req, res) => {
  try {
    const cronSecret = process.env.OPS_DIGEST_SECRET;
    const headerSecret = req.headers['x-ops-digest-secret'];
    const isCron = Boolean(cronSecret && headerSecret && headerSecret === cronSecret);

    if (!isCron) {
      // staff gate
      const header = req.headers.authorization;
      if (!header?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const { verifyToken } = await import('../utils/auth');
      const payload = verifyToken(header.slice(7));
      if (!payload || payload.role !== 'SUPER_ADMIN') {
        res.status(403).json({ error: 'SUPER_ADMIN only' });
        return;
      }
      req.auth = payload;
    }

    const date = istDateKey();
    const target = Number(process.env.MONTHLY_REVENUE_TARGET) || 50000;
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    const [wonMtd, quoted, sla, dailyLogs, settings] = await Promise.all([
      db.contactMessage.findMany({
        where: { stage: 'won', wonAt: { gte: monthStart } },
        select: { dealValue: true, currency: true, name: true },
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
          createdAt: { lt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        },
      }),
      db.dailyLog.findMany({ where: { date } }),
      db.companySettings.findFirst({ select: { supportEmail: true, primaryEmail: true } }),
    ]);

    const mtd = wonMtd.reduce((s, w) => s + (w.dealValue || 0), 0);
    const outreachSummary = dailyLogs
      .map((l) => `<li>User ${l.userId}: ${l.outreachCount}/${OUTREACH_TARGET}</li>`)
      .join('');

    const html = `
      <h2>Ops digest — ${date}</h2>
      <p><strong>MTD won:</strong> ₹${mtd.toLocaleString('en-IN')} / target ₹${target.toLocaleString('en-IN')}</p>
      <p><strong>Pipeline (quoted):</strong> ₹${(quoted._sum.dealValue || 0).toLocaleString('en-IN')} (${quoted._count} deals)</p>
      <p><strong>SLA breaches:</strong> ${sla}</p>
      <h3>Today outreach</h3>
      <ul>${outreachSummary || '<li>No logs yet</li>'}</ul>
    `;

    const to =
      settings?.supportEmail?.trim() ||
      settings?.primaryEmail?.trim() ||
      process.env.SUPPORT_EMAIL ||
      process.env.ADMIN_EMAIL;

    let sent = false;
    if (to) {
      sent = await sendResend({
        to,
        subject: `HexaStack ops digest — ${date}`,
        html,
      });
    }

    if (req.auth) {
      await writeAuditLog({
        userId: req.auth.userId,
        action: 'ops_digest_sent',
        meta: { date, sent, mtd, sla },
      });
    }

    res.json({ success: true, sent, html, preview: { mtd, target, sla, pipeline: quoted._sum.dealValue || 0 } });
  } catch (err) {
    console.error('[OPS_DIGEST]', err);
    res.status(500).json({ error: 'Failed to send digest' });
  }
});

export default router;
