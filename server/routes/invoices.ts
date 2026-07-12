import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

function nextInvoiceNo(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `HS-${y}${m}-${rand}`;
}

async function refreshOverdueStatuses() {
  const now = new Date();
  await db.invoice.updateMany({
    where: {
      status: { in: ['sent', 'draft'] },
      dueDate: { lt: now },
      paidAt: null,
    },
    data: { status: 'overdue' },
  });
}

router.get('/', requireStaff, async (req, res) => {
  try {
    await refreshOverdueStatuses();
    const clientId = req.query.clientId ? String(req.query.clientId) : undefined;
    const items = await db.invoice.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { name: true, company: true } } },
    });
    res.json(items);
  } catch (err) {
    console.error('[INVOICES_LIST]', err);
    res.status(500).json({ error: 'Failed to list invoices' });
  }
});

router.post('/', requireStaff, async (req, res) => {
  try {
    const { clientId, amount, currency, status, dueDate, invoiceNo } = req.body || {};
    if (!clientId || amount == null) {
      res.status(400).json({ error: 'clientId and amount required' });
      return;
    }
    let no = invoiceNo ? String(invoiceNo) : nextInvoiceNo();
    for (let i = 0; i < 5; i++) {
      const clash = await db.invoice.findUnique({ where: { invoiceNo: no } });
      if (!clash) break;
      no = nextInvoiceNo();
    }
    const item = await db.invoice.create({
      data: {
        clientId: String(clientId),
        amount: Number(amount),
        currency: currency ? String(currency) : 'INR',
        status: status || 'draft',
        dueDate: dueDate ? new Date(dueDate) : null,
        invoiceNo: no,
      },
    });
    await writeAuditLog({
      userId: req.auth!.userId,
      action: 'created_invoice',
      targetId: item.id,
    });
    res.status(201).json(item);
  } catch (err) {
    console.error('[INVOICES_CREATE]', err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

router.patch('/:id', requireStaff, async (req, res) => {
  try {
    const { amount, currency, status, dueDate, markPaid } = req.body || {};
    const data: Record<string, unknown> = {};
    if (amount != null) data.amount = Number(amount);
    if (currency != null) data.currency = String(currency);
    if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;
    if (markPaid === true || status === 'paid') {
      data.status = 'paid';
      data.paidAt = new Date();
    } else if (status != null) {
      data.status = String(status);
      if (status !== 'paid') data.paidAt = null;
    }
    const item = await db.invoice.update({ where: { id: req.params.id }, data: data as any });
    if (markPaid === true || status === 'paid') {
      await writeAuditLog({
        userId: req.auth!.userId,
        action: 'marked_invoice_paid',
        targetId: item.id,
      });
    }
    res.json(item);
  } catch (err) {
    console.error('[INVOICES_PATCH]', err);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

router.delete('/:id', requireStaff, async (req, res) => {
  try {
    await db.invoice.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    console.error('[INVOICES_DELETE]', err);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

export default router;
