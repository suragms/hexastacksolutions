import express from 'express';
import { db } from '../db';

const router = express.Router();

// Email validation helper
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Sanitize input (accepts string or undefined)
const sanitize = (str: string | undefined | null): string => {
    if (str == null || typeof str !== 'string') return '';
    return str.trim().slice(0, 1000); // Limit length
};

// Send email notification to admin (using Web3Forms - free service)
const sendEmailNotification = async (
    name: string,
    email: string,
    phone: string | null,
    requirement: string,
    extra?: { companyName?: string; country?: string; industry?: string; serviceOrProduct?: string; budget?: string; timeline?: string; numberOfBranches?: string; currentSystem?: string }
) => {
    try {
        // Web3Forms is a free email API - no signup needed for basic usage
        // Alternative: User can replace with their own SMTP or email service
        const adminEmail = process.env.ADMIN_EMAIL || 'supporthexastack@hexastacksolutions.com';
        
        // Log the notification (email can be configured later)
        console.log(`\n========================================`);
        console.log(`NEW ENQUIRY NOTIFICATION`);
        console.log(`========================================`);
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Phone: ${phone || 'Not provided'}`);
        if (extra?.companyName) console.log(`Company: ${extra.companyName}`);
        if (extra?.country) console.log(`Country: ${extra.country}`);
        if (extra?.industry) console.log(`Industry: ${extra.industry}`);
        if (extra?.serviceOrProduct) console.log(`Service/Product: ${extra.serviceOrProduct}`);
        if (extra?.budget) console.log(`Budget: ${extra.budget}`);
        if (extra?.timeline) console.log(`Timeline: ${extra.timeline}`);
        if (extra?.numberOfBranches) console.log(`Number of branches: ${extra.numberOfBranches}`);
        if (extra?.currentSystem) console.log(`Current system: ${extra.currentSystem}`);
        console.log(`Requirement: ${requirement}`);
        console.log(`========================================`);
        console.log(`To enable email notifications, add SMTP settings to .env`);
        console.log(`========================================\n`);

        // If RESEND_API_KEY is configured, send email via Resend
        if (process.env.RESEND_API_KEY) {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: 'HexaStack <onboarding@resend.dev>',
                    to: adminEmail,
                    subject: `New Website Enquiry from ${name}`,
                    html: `
                        <h2>New Enquiry Received</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        ${extra?.companyName ? `<p><strong>Company:</strong> ${extra.companyName}</p>` : ''}
                        ${extra?.country ? `<p><strong>Country:</strong> ${extra.country}</p>` : ''}
                        ${extra?.industry ? `<p><strong>Industry:</strong> ${extra.industry}</p>` : ''}
                        ${extra?.serviceOrProduct ? `<p><strong>Service/Product:</strong> ${extra.serviceOrProduct}</p>` : ''}
                        ${extra?.budget ? `<p><strong>Budget:</strong> ${extra.budget}</p>` : ''}
                        ${extra?.timeline ? `<p><strong>Timeline:</strong> ${extra.timeline}</p>` : ''}
                        ${extra?.numberOfBranches ? `<p><strong>Number of branches:</strong> ${extra.numberOfBranches}</p>` : ''}
                        ${extra?.currentSystem ? `<p><strong>Current system:</strong> ${extra.currentSystem}</p>` : ''}
                        <p><strong>Requirement:</strong></p>
                        <p>${requirement}</p>
                        <hr>
                        <p><small>Sent from HexaStack Solutions website</small></p>
                    `,
                }),
            });
            
            if (response.ok) {
                console.log('[EMAIL] Notification sent to admin');
            }
        }
    } catch (error) {
        console.error('[EMAIL_ERROR]', error);
        // Don't throw - email failure shouldn't block enquiry submission
    }
};

// Create new enquiry — accepts: name, email, whatsapp (phone), service, budget, requirement
router.post('/', async (req, res) => {
    try {
        const body = req.body || {};
        const name = body.name != null ? String(body.name) : '';
        const requirement = body.requirement != null ? String(body.requirement) : '';
        const email = body.email != null ? String(body.email).trim() : '';
        const phone = body.phone != null ? String(body.phone) : '';
        const whatsapp = body.whatsapp != null ? String(body.whatsapp) : '';
        const contactPhone = (phone || whatsapp).trim() || null;
        const contactEmail = email && isValidEmail(email) ? sanitize(email).toLowerCase() : null;
        const serviceValue = body.service || body.serviceOrProduct;
        const companyName = body.companyName;
        const country = body.country;
        const industry = body.industry;
        const budget = body.budget;
        const timeline = body.timeline;
        const numberOfBranches = body.numberOfBranches;
        const currentSystem = body.currentSystem;

        // Validate required fields (name + requirement)
        if (!name.trim()) {
            return res.status(400).json({ error: 'Missing required fields', message: 'Please enter your name.' });
        }
        if (name.trim().length < 2) {
            return res.status(400).json({ error: 'Name too short', message: 'Please enter your full name.' });
        }
        if (!requirement.trim()) {
            return res.status(400).json({ error: 'Missing required fields', message: 'Please describe what you need.' });
        }

        const createData = {
            name: sanitize(name).slice(0, 200),
            email: contactEmail ? contactEmail.slice(0, 255) : null,
            phone: contactPhone ? sanitize(contactPhone).slice(0, 50) : null,
            requirement: sanitize(requirement).slice(0, 5000),
            companyName: companyName ? sanitize(String(companyName)).slice(0, 200) : null,
            country: country ? sanitize(String(country)).slice(0, 100) : null,
            industry: industry ? sanitize(String(industry)).slice(0, 100) : null,
            serviceOrProduct: serviceValue ? sanitize(String(serviceValue)).slice(0, 100) : null,
            budget: budget ? sanitize(String(budget)).slice(0, 100) : null,
            timeline: timeline ? sanitize(String(timeline)).slice(0, 100) : null,
            numberOfBranches: numberOfBranches ? sanitize(String(numberOfBranches)).slice(0, 50) : null,
            currentSystem: currentSystem ? sanitize(String(currentSystem)).slice(0, 200) : null,
        };

        const message = await db.contactMessage.create({ data: createData });

        console.log(`[NEW_ENQUIRY] ${name} ${contactPhone || contactEmail || ''}`);

        // Email notification (fire-and-forget)
        sendEmailNotification(name, contactEmail || 'no-email@hexastacksolutions.com', contactPhone, requirement, {
            companyName: companyName ? sanitize(String(companyName)) : undefined,
            country: country ? sanitize(String(country)) : undefined,
            industry: industry ? sanitize(String(industry)) : undefined,
            serviceOrProduct: serviceValue ? sanitize(String(serviceValue)) : undefined,
            budget: budget ? sanitize(String(budget)) : undefined,
            timeline: timeline ? sanitize(String(timeline)) : undefined,
            numberOfBranches: numberOfBranches ? sanitize(String(numberOfBranches)) : undefined,
            currentSystem: currentSystem ? sanitize(String(currentSystem)) : undefined,
        });

        // Analytics (don't block or fail the response)
        const today = new Date().toISOString().split('T')[0];
        db.analytics.upsert({
            where: { date: today },
            create: { date: today, totalViews: 0, formSubmissions: 1 },
            update: { formSubmissions: { increment: 1 } },
        }).catch(() => {});

        res.json({ success: true, message: 'Enquiry received successfully', id: message.id });
    } catch (error: unknown) {
        const err = error as Error;
        console.error('[CONTACT_POST]', err);
        const isDev = process.env.NODE_ENV !== 'production';
        res.status(500).json({
            error: 'Internal Error',
            message: isDev && err?.message ? err.message : 'Something went wrong. Please try again.',
        });
    }
});

// Get all enquiries
router.get('/', async (_req, res) => {
    try {
        const messages = await db.contactMessage.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(messages);
    } catch (error) {
        console.error('[CONTACT_GET]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Update enquiry (mark as read)
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isRead, isStarred } = req.body;

        const updateData: any = {};
        if (typeof isRead === 'boolean') updateData.isRead = isRead;
        if (typeof isStarred === 'boolean') updateData.isStarred = isStarred;

        const message = await db.contactMessage.update({
            where: { id },
            data: updateData,
        });

        res.json(message);
    } catch (error) {
        console.error('[CONTACT_PATCH]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Delete enquiry
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.contactMessage.delete({
            where: { id },
        });

        res.json({ success: true });
    } catch (error) {
        console.error('[CONTACT_DELETE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Reply to enquiry - send email to user
router.post('/:id/reply', async (req, res) => {
    try {
        const { id } = req.params;
        const { replyMessage } = req.body;

        if (!replyMessage || replyMessage.trim().length < 10) {
            return res.status(400).json({ 
                error: 'Reply too short',
                message: 'Please write a proper reply message.' 
            });
        }

        // Get the original enquiry
        const enquiry = await db.contactMessage.findUnique({
            where: { id },
        });

        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }

        // Log the reply
        console.log(`\n========================================`);
        console.log(`REPLY SENT TO: ${enquiry.name} <${enquiry.email}>`);
        console.log(`========================================`);
        console.log(`Reply: ${replyMessage}`);
        console.log(`========================================\n`);

        // Send email via Resend if configured
        if (process.env.RESEND_API_KEY) {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: 'HexaStack <onboarding@resend.dev>',
                    to: enquiry.email,
                    subject: `Re: Your enquiry to HexaStack`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #1e293b;">Hello ${enquiry.name},</h2>
                            <p style="color: #475569; line-height: 1.6;">Thank you for reaching out to us. Here is our response to your enquiry:</p>
                            <div style="background: #f8fafc; border-left: 4px solid #0f172a; padding: 16px; margin: 20px 0;">
                                <p style="color: #1e293b; margin: 0; white-space: pre-wrap;">${replyMessage}</p>
                            </div>
                            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">Your original message:</p>
                            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px;">
                                <p style="color: #64748b; margin: 0; font-size: 14px;">${enquiry.requirement}</p>
                            </div>
                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                            <p style="color: #64748b; font-size: 12px;">Best regards,<br>HexaStack Solutions<br>supporthexastack@hexastacksolutions.com</p>
                        </div>
                    `,
                }),
            });
            
            if (response.ok) {
                console.log('[EMAIL] Reply sent successfully to', enquiry.email);
                
                // Mark as read after reply
                await db.contactMessage.update({
                    where: { id },
                    data: { isRead: true },
                });
                
                return res.json({ 
                    success: true, 
                    message: `Reply sent to ${enquiry.email}` 
                });
            } else {
                const errorData = await response.text();
                console.error('[EMAIL_ERROR]', errorData);
                return res.status(500).json({ 
                    error: 'Email failed',
                    message: 'Could not send email. Check RESEND_API_KEY configuration.' 
                });
            }
        } else {
            // No email configured - just mark as read
            await db.contactMessage.update({
                where: { id },
                data: { isRead: true },
            });
            
            return res.json({ 
                success: true, 
                message: 'Reply logged (email not configured - add RESEND_API_KEY to enable)' 
            });
        }
    } catch (error) {
        console.error('[CONTACT_REPLY]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

export default router;
