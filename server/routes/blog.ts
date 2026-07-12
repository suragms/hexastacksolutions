import express from 'express';
import { db } from '../db';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

function slugify(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

router.get('/post/:slug', async (req, res) => {
    try {
        const post = await db.blogPost.findFirst({
            where: { slug: req.params.slug, published: true },
        });
        if (!post) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json({
            ...post,
            dateIso: (post.publishedAt || post.createdAt).toISOString().slice(0, 10),
        });
    } catch (error) {
        console.error('[BLOG_GET_SLUG]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

router.get('/', async (_req, res) => {
    try {
        const posts = await db.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                category: true,
                featuredImageUrl: true,
                publishedAt: true,
                createdAt: true,
            },
        });
        res.json(posts);
    } catch (error: any) {
        console.error('[BLOG_GET]', error?.message || error);
        const isDb =
            error?.message?.includes('DATABASE') ||
            error?.code === 'P2021' ||
            error?.message?.includes('BlogPost');
        res.status(isDb ? 503 : 500).json({ error: isDb ? 'Blog not available' : 'Internal Error' });
    }
});

router.get('/manage', requireStaff, async (_req, res) => {
    try {
        const posts = await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(posts);
    } catch (error) {
        console.error('[BLOG_MANAGE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

router.post('/', requireStaff, async (req, res) => {
    try {
        const {
            title,
            slug: rawSlug,
            excerpt,
            category,
            body,
            featuredImageUrl,
            videoUrl,
            published,
        } = req.body || {};
        if (!title || !excerpt || !category || !body) {
            res.status(400).json({ error: 'title, excerpt, category, and body are required' });
            return;
        }
        const slug = rawSlug && String(rawSlug).trim() ? slugify(String(rawSlug)) : slugify(String(title));
        if (!slug) {
            res.status(400).json({ error: 'Could not derive slug from title' });
            return;
        }
        const isPublished = Boolean(published);
        const post = await db.blogPost.create({
            data: {
                title: String(title).trim(),
                slug,
                excerpt: String(excerpt).trim(),
                category: String(category).trim(),
                body: String(body),
                featuredImageUrl: featuredImageUrl ? String(featuredImageUrl) : null,
                videoUrl: videoUrl ? String(videoUrl) : null,
                published: isPublished,
                publishedAt: isPublished ? new Date() : null,
                authorId: req.auth!.userId,
            },
        });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'created_blog',
            targetId: post.id,
        });
        res.json(post);
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(409).json({ error: 'Slug already exists' });
            return;
        }
        console.error('[BLOG_POST]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

router.patch('/:id', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            slug: rawSlug,
            excerpt,
            category,
            body,
            featuredImageUrl,
            videoUrl,
            published,
        } = req.body || {};
        const data: Record<string, unknown> = {};
        if (title != null) data.title = String(title).trim();
        if (excerpt != null) data.excerpt = String(excerpt).trim();
        if (category != null) data.category = String(category).trim();
        if (body != null) data.body = String(body);
        if (featuredImageUrl !== undefined)
            data.featuredImageUrl = featuredImageUrl ? String(featuredImageUrl) : null;
        if (videoUrl !== undefined) data.videoUrl = videoUrl ? String(videoUrl) : null;
        if (published !== undefined) {
            data.published = Boolean(published);
            if (published) data.publishedAt = new Date();
        }
        if (rawSlug != null && String(rawSlug).trim()) data.slug = slugify(String(rawSlug));

        const post = await db.blogPost.update({
            where: { id },
            data: data as any,
        });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'edited_blog',
            targetId: id,
        });
        res.json(post);
    } catch (error: any) {
        if (error?.code === 'P2002') {
            res.status(409).json({ error: 'Slug already exists' });
            return;
        }
        console.error('[BLOG_PATCH]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

router.delete('/:id', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        await db.blogPost.delete({ where: { id } });
        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'deleted_blog',
            targetId: id,
        });
        res.json({ success: true });
    } catch (error) {
        console.error('[BLOG_DELETE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

export default router;
