import { db } from '../db';

export async function writeAuditLog(opts: {
    userId: string;
    action: string;
    targetId?: string | null;
    meta?: Record<string, unknown> | string | null;
}) {
    try {
        await db.auditLog.create({
            data: {
                userId: opts.userId,
                action: opts.action,
                targetId: opts.targetId ?? null,
                meta: opts.meta == null ? null : typeof opts.meta === 'string' ? opts.meta : JSON.stringify(opts.meta),
            },
        });
    } catch (err) {
        console.error('[AUDIT_LOG]', err);
    }
}
