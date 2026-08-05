import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';
import { bucketSource } from '../utils/source';
import { getNotificationEmails, sendResend } from '../utils/email';

const router = express.Router();

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const sanitize = (str: string | undefined | null): string => {
    if (str == null || typeof str !== 'string') return '';
    return str.trim().slice(0, 1000);
};

const sanitizeLong = (str: string, max: number): string => {
    if (str == null || typeof str !== 'string') return '';
    return str.trim().slice(0, max);
};

async function sendAdminNotification(payload: {
    name: string;
    email: string;
    phone: string | null;
    requirement: string;
    source?: string | null;
    extra?: Record<string, string | undefined>;
}) {
    try {
        const recipients = await getNotificationEmails();
        const extra = payload.extra || {};
        await sendResend({
            to: recipients,
            subject: `New Website Enquiry from ${payload.name}`,
            html: `
                <h2>New Enquiry Received</h2>
                <p><strong>Name:</strong> ${payload.name}</p>
                <p><strong>Email:</strong> ${payload.email}</p>
                <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
                ${payload.source ? `<p><strong>Source:</strong> ${payload.source}</p>` : ''}
                ${extra.companyName ? `<p><strong>Company:</strong> ${extra.companyName}</p>` : ''}
                ${extra.country ? `<p><strong>Country:</strong> ${extra.country}</p>` : ''}
                ${extra.industry ? `<p><strong>Industry:</strong> ${extra.industry}</p>` : ''}
                ${extra.serviceOrProduct ? `<p><strong>Service/Product:</strong> ${extra.serviceOrProduct}</p>` : ''}
                ${extra.budget ? `<p><strong>Budget:</strong> ${extra.budget}</p>` : ''}
                <p><strong>Requirement:</strong></p>
                <p>${payload.requirement}</p>
            `,
        });
    } catch (error) {
        console.error('[EMAIL_ADMIN]', error);
    }
}

async function sendConfirmationEmail(to: string, name: string) {
    try {
        if (!to || !isValidEmail(to)) return;
        await sendResend({
            to,
            subject: 'We got your message — HexaStack Solutions',
            html: `
                <p>Hi ${name},</p>
                <p>Thanks for reaching out to HexaStack Solutions. We got your message and will reply within <strong>2 hours</strong> during business hours.</p>
                <p>Prefer WhatsApp? Message us at <a href="https://wa.me/917591999365">+91 75919 99365</a>.</p>
                <p>— HexaStack Solutions (Thrissur)</p>
            `,
        });
    } catch (error) {
        console.error('[EMAIL_CONFIRM]', error);
    }
}

async function sendQuotedEmail(
    to: string,
    name: string,
    deal?: { dealValue?: number | null; currency?: string | null }
) {
    try {
        if (!to || !isValidEmail(to)) return;
        const valueLine =
            deal?.dealValue != null
                ? `<p><strong>Proposed investment:</strong> ${deal.currency || 'INR'} ${Number(deal.dealValue).toLocaleString('en-IN')}</p>`
                : '';
        await sendResend({
            to,
            subject: 'Your HexaStack proposal is ready',
            html: `
                <p>Hi ${name},</p>
                <p>We've prepared a proposal based on your enquiry. Reply to this email or WhatsApp us if you have questions — we typically respond within 2 hours.</p>
                ${valueLine}
                <p>— HexaStack Solutions</p>
            `,
        });
    } catch (error) {
        console.error('[EMAIL_QUOTED]', error);
    }
}

async function maybeSendSlaAlert(enquiry: {
    id: string;
    name: string;
    createdAt: Date;
    firstRepliedAt: Date | null;
}) {
    if (enquiry.firstRepliedAt) return;
    const ageMs = Date.now() - new Date(enquiry.createdAt).getTime();
    if (ageMs < 2 * 60 * 60 * 1000) return;
    if (!process.env.RESEND_API_KEY) return;

    const already = await db.auditLog.findFirst({
        where: { action: 'sla_alert_sent', targetId: enquiry.id },
    });
    if (already) return;

    const recipients = await getNotificationEmails();
    const ok = await sendResend({
        to: recipients,
        subject: `SLA breach: unreplied enquiry from ${enquiry.name}`,
        html: `<p>Enquiry <strong>${enquiry.name}</strong> (${enquiry.id}) has no human reply after 2 hours.</p>`,
    });
    if (ok) {
        // Use a system-ish user id if we don't have auth — skip if no staff context
        const superAdmin = await db.user.findFirst({
            where: { role: 'SUPER_ADMIN', active: true },
            select: { id: true },
        });
        if (superAdmin) {
            await writeAuditLog({
                userId: superAdmin.id,
                action: 'sla_alert_sent',
                targetId: enquiry.id,
            });
        }
    }
}

async function sendWhatsAppTemplate(phone: string | null | undefined, name: string) {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const template = process.env.WHATSAPP_TEMPLATE || 'enquiry_thanks';
    if (!token || !phoneId || !phone) return;
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) return;
    try {
        await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: digits,
                type: 'template',
                template: {
                    name: template,
                    language: { code: process.env.WHATSAPP_TEMPLATE_LANG || 'en' },
                    components: [
                        {
                            type: 'body',
                            parameters: [{ type: 'text', text: name.slice(0, 60) }],
                        },
                    ],
                },
            }),
        });
    } catch (error) {
        console.error('[WHATSAPP]', error);
    }
}

router.post('/', async (req, res) => {
    try {
        const body = req.body || {};
        const name = sanitize(body.name);
        const emailRaw = sanitize(body.email);
        const phone = sanitize(body.phone || body.whatsapp) || null;
        const requirement = sanitizeLong(body.requirement || body.message || '', 5000);
        const companyName = sanitize(body.companyName) || null;
        const country = sanitize(body.country) || null;
        const industry = sanitize(body.industry) || null;
        const serviceOrProduct = sanitize(body.serviceOrProduct || body.service) || null;
        const budget = sanitize(body.budget) || null;
        const timeline = sanitize(body.timeline) || null;
        const numberOfBranches = sanitize(body.numberOfBranches) || null;
        const currentSystem = sanitize(body.currentSystem) || null;
        const utmSource = sanitize(body.utmSource || body.utm_source) || null;
        const utmCampaign = sanitize(body.utmCampaign || body.utm_campaign) || null;
        const sourceRaw = sanitize(body.source) || null;
        const source = sourceRaw || bucketSource(utmSource, req.headers.referer as string);

        if (!name || name.length < 2) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }
        if (!requirement || requirement.length < 5) {
            res.status(400).json({ error: 'Requirement is required' });
            return;
        }
        const email = emailRaw && isValidEmail(emailRaw) ? emailRaw : null;

        const message = await db.contactMessage.create({
            data: {
                name,
                email,
                phone,
                requirement,
                companyName,
                country,
                industry,
                serviceOrProduct,
                budget,
                timeline,
                numberOfBranches,
                currentSystem,
                source,
                utmSource,
                utmCampaign,
                stage: 'new',
            },
        });

        void sendAdminNotification({
            name,
            email: email || 'not provided',
            phone,
            requirement,
            source,
            extra: {
                companyName: companyName || undefined,
                country: country || undefined,
                industry: industry || undefined,
                serviceOrProduct: serviceOrProduct || undefined,
                budget: budget || undefined,
            },
        });
        if (email) void sendConfirmationEmail(email, name);
        void sendWhatsAppTemplate(phone, name);

        res.status(201).json({ success: true, id: message.id });
    } catch (error) {
        console.error('[CONTACT_POST]', error);
        res.status(500).json({ error: 'Failed to submit enquiry' });
    }
});

router.get('/', requireStaff, async (_req, res) => {
    try {
        const messages = await db.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
        void Promise.all(
            messages
                .filter((m) => !m.firstRepliedAt && m.stage === 'new')
                .map((m) => maybeSendSlaAlert(m))
        );
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
});

router.patch('/:id', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            isRead,
            isStarred,
            stage,
            dealValue,
            currency,
            invoiceStatus,
            referredBy,
            wonAt,
        } = req.body || {};
        const data: Record<string, unknown> = {};
        if (isRead !== undefined) data.isRead = Boolean(isRead);
        if (isStarred !== undefined) data.isStarred = Boolean(isStarred);
        const allowedStages = ['new', 'contacted', 'quoted', 'won', 'lost'];
        if (stage != null) {
            if (!allowedStages.includes(String(stage))) {
                res.status(400).json({ error: 'Invalid stage' });
                return;
            }
            data.stage = String(stage);
        }
        if (dealValue !== undefined) {
            data.dealValue = dealValue === null || dealValue === '' ? null : Number(dealValue);
        }
        if (currency !== undefined) data.currency = currency ? String(currency) : 'INR';
        if (invoiceStatus !== undefined) {
            data.invoiceStatus = invoiceStatus ? String(invoiceStatus) : null;
        }
        if (referredBy !== undefined) {
            data.referredBy = referredBy ? String(referredBy).slice(0, 200) : null;
        }
        if (wonAt !== undefined) data.wonAt = wonAt ? new Date(wonAt) : null;

        const existing = await db.contactMessage.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Not found' });
            return;
        }

        if (stage != null && String(stage) !== existing.stage) {
            data.lastStageChangeAt = new Date();
            if (String(stage) === 'won' && !existing.wonAt) {
                data.wonAt = new Date();
            }
            if (existing.stage === 'new' && String(stage) !== 'new' && !existing.firstRepliedAt) {
                data.firstRepliedAt = new Date();
            }
        }

        const updated = await db.contactMessage.update({ where: { id }, data: data as any });

        if (stage === 'quoted' && existing.stage !== 'quoted' && existing.email) {
            void sendQuotedEmail(existing.email, existing.name, {
                dealValue: updated.dealValue ?? existing.dealValue,
                currency: updated.currency ?? existing.currency,
            });
        }

        void maybeSendSlaAlert(updated);

        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'updated_enquiry',
            targetId: id,
            meta: data,
        });

        res.json(updated);
    } catch (error) {
        console.error('[CONTACT_PATCH]', error);
        res.status(500).json({ error: 'Failed to update enquiry' });
    }
});

router.delete('/:id', requireStaff, async (req, res) => {
    try {
        await db.contactMessage.delete({ where: { id: req.params.id } });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'deleted_enquiry',
            targetId: req.params.id,
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete enquiry' });
    }
});

router.post('/:id/reply', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body || {};
        if (!message || !String(message).trim()) {
            res.status(400).json({ error: 'message is required' });
            return;
        }
        const enquiry = await db.contactMessage.findUnique({ where: { id } });
        if (!enquiry) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        if (!enquiry.email || !isValidEmail(enquiry.email)) {
            res.status(400).json({ error: 'Enquiry has no valid email' });
            return;
        }
        const ok = await sendResend({
            to: enquiry.email,
            subject: `Re: Your enquiry — HexaStack Solutions`,
            html: `<p>Hi ${enquiry.name},</p><p>${String(message).replace(/\n/g, '<br>')}</p><p>— HexaStack Solutions</p>`,
        });
        if (!ok && !process.env.RESEND_API_KEY) {
            res.status(503).json({ error: 'Email not configured (RESEND_API_KEY)' });
            return;
        }
        const stage = enquiry.stage === 'new' ? 'contacted' : enquiry.stage;
        await db.contactMessage.update({
            where: { id },
            data: {
                isRead: true,
                stage,
                firstRepliedAt: enquiry.firstRepliedAt || new Date(),
                ...(enquiry.stage === 'new' ? { lastStageChangeAt: new Date() } : {}),
            },
        });
        res.json({ success: true });
    } catch (error) {
        console.error('[CONTACT_REPLY]', error);
        res.status(500).json({ error: 'Failed to send reply' });
    }
});

export default router;
