import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

router.get('/', requireStaff, async (req, res) => {
    try {
        const assignedToId = req.query.assignedToId ? String(req.query.assignedToId) : undefined;
        const status = req.query.status ? String(req.query.status) : undefined;
        const projectId = req.query.projectId ? String(req.query.projectId) : undefined;
        const tasks = await db.task.findMany({
            where: {
                ...(assignedToId ? { assignedToId } : {}),
                ...(status ? { status: status as any } : {}),
                ...(projectId ? { projectId } : {}),
            },
            orderBy: [{ deadline: 'asc' }, { createdAt: 'desc' }],
            include: {
                assignedTo: { select: { id: true, name: true, email: true } },
                project: { select: { id: true, name: true } },
            },
        });
        res.json(tasks);
    } catch (error) {
        console.error('[TASKS_GET]', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.post('/', requireStaff, async (req, res) => {
    try {
        const { title, description, status, deadline, notes, projectId, assignedToId } = req.body || {};
        if (!title || !projectId) {
            res.status(400).json({ error: 'title and projectId are required' });
            return;
        }
        const task = await db.task.create({
            data: {
                title: String(title).trim(),
                description: description ? String(description) : null,
                status: status || 'PENDING',
                deadline: deadline ? new Date(deadline) : null,
                notes: notes ? String(notes) : null,
                projectId: String(projectId),
                assignedToId: assignedToId || null,
            },
            include: {
                assignedTo: { select: { id: true, name: true, email: true } },
                project: { select: { id: true, name: true } },
            },
        });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'created_task',
            targetId: task.id,
        });
        res.status(201).json(task);
    } catch (error) {
        console.error('[TASKS_POST]', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

router.patch('/:id', requireStaff, async (req, res) => {
    try {
        const { title, description, status, deadline, notes, assignedToId, projectId } = req.body || {};
        const data: Record<string, unknown> = {};
        if (title != null) data.title = String(title).trim();
        if (description !== undefined) data.description = description ? String(description) : null;
        if (status != null) data.status = status;
        if (deadline !== undefined) data.deadline = deadline ? new Date(deadline) : null;
        if (notes !== undefined) data.notes = notes ? String(notes) : null;
        if (assignedToId !== undefined) data.assignedToId = assignedToId || null;
        if (projectId != null) data.projectId = String(projectId);

        const task = await db.task.update({
            where: { id: req.params.id },
            data: data as any,
            include: {
                assignedTo: { select: { id: true, name: true, email: true } },
                project: { select: { id: true, name: true } },
            },
        });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'updated_task',
            targetId: task.id,
            meta: { fields: Object.keys(data) },
        });
        res.json(task);
    } catch (error) {
        console.error('[TASKS_PATCH]', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

router.delete('/:id', requireStaff, async (req, res) => {
    try {
        await db.task.delete({ where: { id: req.params.id } });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'deleted_task',
            targetId: req.params.id,
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

export default router;
