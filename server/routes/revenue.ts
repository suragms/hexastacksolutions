import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';

const router = express.Router();

router.get('/summary', requireStaff, async (_req, res) => {
  try {
    const target = Number(process.env.MONTHLY_REVENUE_TARGET) || 50000;
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    const [all, quotedAgg, wonMtd, retainers, invoices] = await Promise.all([
      db.contactMessage.groupBy({
        by: ['stage'],
        _count: { _all: true },
      }),
      db.contactMessage.aggregate({
        where: { stage: 'quoted', dealValue: { not: null } },
        _sum: { dealValue: true },
        _count: true,
      }),
      db.contactMessage.findMany({
        where: {
          stage: 'won',
          OR: [{ wonAt: { gte: monthStart } }, { wonAt: null, updatedAt: { gte: monthStart } }],
        },
        select: { dealValue: true, currency: true, name: true, wonAt: true },
      }),
      db.retainerContract.findMany({
        where: { status: 'active' },
        include: { client: { select: { name: true, company: true } } },
      }),
      db.invoice.findMany({
        where: { status: { in: ['sent', 'overdue', 'draft'] } },
        include: { client: { select: { name: true, company: true } } },
      }),
    ]);

    const counts: Record<string, number> = {
      new: 0,
      contacted: 0,
      quoted: 0,
      won: 0,
      lost: 0,
    };
    for (const row of all) {
      counts[row.stage] = row._count._all;
    }

    const rate = (from: number, to: number) => (from > 0 ? Math.round((to / from) * 1000) / 10 : 0);

    const mtdWon = wonMtd.reduce((s, w) => s + (w.dealValue || 0), 0);
    const mrr = retainers.reduce((s, r) => s + r.monthlyAmount, 0);

    const unpaid = invoices.filter((inv) => inv.status !== 'paid');
    const overdue = unpaid.filter(
      (inv) =>
        inv.status === 'overdue' ||
        (inv.dueDate && inv.dueDate < now && inv.status !== 'paid')
    );
    const unpaidAmount = unpaid.reduce((s, i) => s + i.amount, 0);
    const overdueAmount = overdue.reduce((s, i) => s + i.amount, 0);

    res.json({
      pipeline: {
        value: quotedAgg._sum.dealValue || 0,
        count: quotedAgg._count,
        currency: 'INR',
      },
      funnel: {
        counts,
        rates: {
          newToContacted: rate(counts.new + counts.contacted + counts.quoted + counts.won + counts.lost, counts.contacted + counts.quoted + counts.won + counts.lost),
          contactedToQuoted: rate(counts.contacted + counts.quoted + counts.won, counts.quoted + counts.won),
          quotedToWon: rate(counts.quoted + counts.won, counts.won),
        },
      },
      mtd: {
        wonRevenue: mtdWon,
        target,
        progressPct: target > 0 ? Math.min(100, Math.round((mtdWon / target) * 1000) / 10) : 0,
        deals: wonMtd,
      },
      retainers: {
        mrr,
        count: retainers.length,
        items: retainers,
      },
      unpaid: {
        count: unpaid.length,
        amount: unpaidAmount,
        overdueCount: overdue.length,
        overdueAmount,
        items: unpaid,
      },
    });
  } catch (err) {
    console.error('[REVENUE_SUMMARY]', err);
    res.status(500).json({ error: 'Failed to load revenue summary' });
  }
});

export default router;
