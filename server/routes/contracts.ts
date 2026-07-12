import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

router.get('/', requireStaff, async (req, res) => {
  try {
    const clientId = req.query.clientId ? String(req.query.clientId) : undefined;
    const items = await db.contract.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { name: true, company: true } } },
    });
    res.json(items);
  } catch (err) {
    console.error('[CONTRACTS_LIST]', err);
    res.status(500).json({ error: 'Failed to list contracts' });
  }
});

router.post('/', requireStaff, async (req, res) => {
  try {
    const { clientId, scope, amount, currency, signedAt, fileUrl } = req.body || {};
    if (!clientId || !scope || amount == null) {
      res.status(400).json({ error: 'clientId, scope, amount required' });
      return;
    }
    const item = await db.contract.create({
      data: {
        clientId: String(clientId),
        scope: String(scope).slice(0, 5000),
        amount: Number(amount),
        currency: currency ? String(currency) : 'INR',
        signedAt: signedAt ? new Date(signedAt) : null,
        fileUrl: fileUrl ? String(fileUrl) : null,
      },
    });
    await writeAuditLog({
      userId: req.auth!.userId,
      action: 'created_contract',
      targetId: item.id,
      meta: { clientId },
    });
    res.status(201).json(item);
  } catch (err) {
    console.error('[CONTRACTS_CREATE]', err);
    res.status(500).json({ error: 'Failed to create contract' });
  }
});

router.patch('/:id', requireStaff, async (req, res) => {
  try {
    const { scope, amount, currency, signedAt, fileUrl } = req.body || {};
    const data: Record<string, unknown> = {};
    if (scope != null) data.scope = String(scope).slice(0, 5000);
    if (amount != null) data.amount = Number(amount);
    if (currency != null) data.currency = String(currency);
    if (signedAt !== undefined) data.signedAt = signedAt ? new Date(signedAt) : null;
    if (fileUrl !== undefined) data.fileUrl = fileUrl ? String(fileUrl) : null;
    const item = await db.contract.update({ where: { id: req.params.id }, data: data as any });
    res.json(item);
  } catch (err) {
    console.error('[CONTRACTS_PATCH]', err);
    res.status(500).json({ error: 'Failed to update contract' });
  }
});

router.delete('/:id', requireStaff, async (req, res) => {
  try {
    await db.contract.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    console.error('[CONTRACTS_DELETE]', err);
    res.status(500).json({ error: 'Failed to delete contract' });
  }
});

/** Retainers */
router.get('/retainers/list', requireStaff, async (_req, res) => {
  try {
    const items = await db.retainerContract.findMany({
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { name: true, company: true } } },
    });
    res.json(items);
  } catch (err) {
    console.error('[RETAINERS_LIST]', err);
    res.status(500).json({ error: 'Failed to list retainers' });
  }
});

router.post('/retainers', requireStaff, async (req, res) => {
  try {
    const { clientId, monthlyAmount, currency, startDate, nextInvoiceDate, status } = req.body || {};
    if (!clientId || monthlyAmount == null) {
      res.status(400).json({ error: 'clientId and monthlyAmount required' });
      return;
    }
    const item = await db.retainerContract.create({
      data: {
        clientId: String(clientId),
        monthlyAmount: Number(monthlyAmount),
        currency: currency ? String(currency) : 'INR',
        startDate: startDate ? new Date(startDate) : null,
        nextInvoiceDate: nextInvoiceDate ? new Date(nextInvoiceDate) : null,
        status: status || 'active',
      },
    });
    res.status(201).json(item);
  } catch (err) {
    console.error('[RETAINERS_CREATE]', err);
    res.status(500).json({ error: 'Failed to create retainer' });
  }
});

router.patch('/retainers/:id', requireStaff, async (req, res) => {
  try {
    const { monthlyAmount, currency, startDate, nextInvoiceDate, status } = req.body || {};
    const data: Record<string, unknown> = {};
    if (monthlyAmount != null) data.monthlyAmount = Number(monthlyAmount);
    if (currency != null) data.currency = String(currency);
    if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
    if (nextInvoiceDate !== undefined) data.nextInvoiceDate = nextInvoiceDate ? new Date(nextInvoiceDate) : null;
    if (status != null) data.status = String(status);
    const item = await db.retainerContract.update({ where: { id: req.params.id }, data: data as any });
    res.json(item);
  } catch (err) {
    console.error('[RETAINERS_PATCH]', err);
    res.status(500).json({ error: 'Failed to update retainer' });
  }
});

export default router;
