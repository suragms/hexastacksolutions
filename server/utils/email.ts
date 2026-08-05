import { db } from '../db';

/** Resend sends to a single address or an array of addresses. */
export async function sendResend(opts: {
    to: string | string[];
    subject: string;
    html: string;
}): Promise<boolean> {
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Default notification recipients (used when DB settings are empty). */
const DEFAULT_NOTIFY_EMAILS = [
    'hexastacksolutions@gmail.com',
    'officialsurag@gmail.com',
    'anandukrishna2999@gmail.com',
];

/**
 * Deduped (case-insensitive), validated list of addresses that receive enquiry alerts
 * and daily reports. Editable in Admin → Settings via CompanySettings.leadEmail1/2/3,
 * with optional env overrides (SUPPORT_EMAIL / ADMIN_EMAIL).
 */
export async function getNotificationEmails(): Promise<string[]> {
    let fromSettings: string[] = [];
    try {
        const settings = await db.companySettings.findFirst({
            select: { leadEmail1: true, leadEmail2: true, leadEmail3: true },
        });
        fromSettings = [settings?.leadEmail1, settings?.leadEmail2, settings?.leadEmail3].filter(
            (e): e is string => Boolean(e && e.trim())
        );
    } catch {
        fromSettings = [];
    }

    const fromEnv = [process.env.SUPPORT_EMAIL, process.env.ADMIN_EMAIL].filter(
        (e): e is string => Boolean(e && e.trim())
    );

    const seen = new Set<string>();
    const result: string[] = [];
    const push = (email: string) => {
        const normalized = email.trim();
        const lower = normalized.toLowerCase();
        if (!normalized || !EMAIL_REGEX.test(normalized) || seen.has(lower)) return;
        seen.add(lower);
        result.push(normalized);
    };

    for (const email of [...fromSettings, ...fromEnv, ...DEFAULT_NOTIFY_EMAILS]) push(email);
    return result;
}
