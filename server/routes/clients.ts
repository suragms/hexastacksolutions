import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

const ONBOARDING_TASKS = [
  'Send welcome email',
  'Collect assets/logo',
  'Set up project repo',
  'Schedule kickoff call',
];

router.get('/', requireStaff, async (req, res) => {
  try {
    const status = req.query.status ? String(req.query.status) : undefined;
    const clients = await db.client.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { contracts: true, invoices: true, projects: true } },
      },
    });
    res.json(clients);
  } catch (err) {
    console.error('[CLIENTS_LIST]', err);
    res.status(500).json({ error: 'Failed to list clients' });
  }
});

router.post('/', requireStaff, async (req, res) => {
  try {
    const { name, company, email, whatsapp, phone, country, status } = req.body || {};
    if (!name || !email) {
      res.status(400).json({ error: 'name and email required' });
      return;
    }
    const client = await db.client.create({
      data: {
        name: String(name).trim(),
        company: company ? String(company).trim() : null,
        email: String(email).trim().toLowerCase(),
        whatsapp: whatsapp ? String(whatsapp).trim() : null,
        phone: phone ? String(phone).trim() : null,
        country: country ? String(country).trim() : null,
        status: status || 'active',
        password: null,
      },
    });
    await writeAuditLog({
      userId: req.auth!.userId,
      action: 'created_client',
      targetId: client.id,
    });
    res.status(201).json(client);
  } catch (err: any) {
    if (err?.code === 'P2002') {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }
    console.error('[CLIENTS_CREATE]', err);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

/** Convert won lead → Client + Project + onboarding Tasks */
router.post('/from-lead/:leadId', requireStaff, async (req, res) => {
  try {
    const lead = await db.contactMessage.findUnique({ where: { id: req.params.leadId } });
    if (!lead) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    if (lead.stage !== 'won') {
      res.status(400).json({ error: 'Lead must be in won stage' });
      return;
    }

    const existing = await db.client.findFirst({
      where: {
        OR: [
          { leadId: lead.id },
          ...(lead.email ? [{ email: lead.email.toLowerCase() }] : []),
        ],
      },
    });
    if (existing) {
      res.status(400).json({ error: 'Client already exists for this lead', clientId: existing.id });
      return;
    }

    const email =
      lead.email?.trim().toLowerCase() ||
      `lead-${lead.id}@crm.hexastack.local`;

    const client = await db.client.create({
      data: {
        name: lead.name,
        company: lead.companyName || null,
        email,
        whatsapp: lead.phone || null,
        phone: lead.phone || null,
        country: lead.country || null,
        status: 'active',
        password: null,
        leadId: lead.id,
      },
    });

    const projectName =
      lead.companyName ||
      `${lead.name} — ${lead.serviceOrProduct || 'Project'}`.slice(0, 120);

    const project = await db.project.create({
      data: {
        name: projectName,
        overview: lead.requirement.slice(0, 2000),
        createdById: req.auth!.userId,
        clientId: client.id,
        status: 'IN_PROGRESS',
      },
    });

    await db.task.createMany({
      data: ONBOARDING_TASKS.map((title) => ({
        title,
        description: 'Auto-seeded onboarding task',
        status: 'PENDING',
        projectId: project.id,
        assignedToId: req.auth!.userId,
      })),
    });

    if (!lead.wonAt) {
      await db.contactMessage.update({
        where: { id: lead.id },
        data: { wonAt: new Date() },
      });
    }

    await writeAuditLog({
      userId: req.auth!.userId,
      action: 'converted_lead_to_client',
      targetId: client.id,
      meta: { leadId: lead.id, projectId: project.id },
    });

    const full = await db.client.findUnique({
      where: { id: client.id },
      include: { projects: { include: { tasks: true } }, contracts: true, invoices: true },
    });

    res.status(201).json(full);
  } catch (err: any) {
    if (err?.code === 'P2002') {
      res.status(400).json({ error: 'A client with this email already exists' });
      return;
    }
    console.error('[CLIENTS_FROM_LEAD]', err);
    res.status(500).json({ error: 'Failed to convert lead' });
  }
});

router.get('/:id', requireStaff, async (req, res) => {
  try {
    const client = await db.client.findUnique({
      where: { id: req.params.id },
      include: {
        contracts: { orderBy: { createdAt: 'desc' } },
        invoices: { orderBy: { createdAt: 'desc' } },
        projects: { include: { tasks: true } },
        retainers: true,
      },
    });
    if (!client) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    let lead = null;
    if (client.leadId) {
      lead = await db.contactMessage.findUnique({ where: { id: client.leadId } });
    }
    res.json({ ...client, lead });
  } catch (err) {
    console.error('[CLIENTS_GET]', err);
    res.status(500).json({ error: 'Failed to load client' });
  }
});

router.patch('/:id', requireStaff, async (req, res) => {
  try {
    const { name, company, email, whatsapp, phone, country, status } = req.body || {};
    const data: Record<string, unknown> = {};
    if (name != null) data.name = String(name).trim();
    if (company !== undefined) data.company = company ? String(company).trim() : null;
    if (email != null) data.email = String(email).trim().toLowerCase();
    if (whatsapp !== undefined) data.whatsapp = whatsapp ? String(whatsapp).trim() : null;
    if (phone !== undefined) data.phone = phone ? String(phone).trim() : null;
    if (country !== undefined) data.country = country ? String(country).trim() : null;
    if (status != null) data.status = String(status);
    const client = await db.client.update({ where: { id: req.params.id }, data: data as any });
    res.json(client);
  } catch (err) {
    console.error('[CLIENTS_PATCH]', err);
    res.status(500).json({ error: 'Failed to update client' });
  }
});

export default router;
