import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import projectsRouter from './routes/projects';
import feedbackRouter from './routes/feedback';
import contactRouter from './routes/contact';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import settingsRouter from './routes/settings';
import uploadRouter from './routes/upload';
import portfolioRouter from './routes/portfolio';
import analyticsRouter from './routes/analytics';
import servicesRouter from './routes/services';
import productsRouter from './routes/products';
import seoPagesRouter from './routes/seo-pages';
import backlinksRouter from './routes/backlinks';
import adminAuthRouter from './routes/admin-auth';
import clientAuthRouter from './routes/client-auth';
import syncStubRouter from './routes/syncStub';

// Triggering server restart for new routes...
dotenv.config();

export const app = express();
app.set('trust proxy', 1); // Trust Vercel proxy for rate-limiters
const PORT = process.env.PORT || 3001;

// Log initialization (Netlify or Vercel serverless)
if (process.env.NETLIFY || process.env.VERCEL) {
    console.log(`=== Express (${process.env.VERCEL ? 'Vercel' : 'Netlify'}) ===`);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('DATABASE_URL configured:', process.env.DATABASE_URL ? 'Yes' : 'No');
    console.log('JWT_SECRET configured:', process.env.JWT_SECRET ? 'Yes' : 'No');
}

app.use(cors());
// On Vercel, req.body can be {} before express.json runs; empty object must not skip the parser (see api/index.js ensureBody).
app.use((req, res, next) => {
    const preBody = req.body;
    const preBodyPopulated =
        preBody != null &&
        typeof preBody === 'object' &&
        !Array.isArray(preBody) &&
        Object.keys(preBody as object).length > 0;
    if (process.env.VERCEL && preBodyPopulated) {
        return next();
    }
    express.json({ limit: '50mb' })(req, res, next);
});
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, _res, next) => {
    if (req.url.startsWith('/.netlify/functions/api')) {
        const trimmed = req.url.replace('/.netlify/functions/api', '') || '/';
        if (trimmed.startsWith('/api/') || trimmed === '/api') {
            req.url = trimmed;
        } else {
            req.url = trimmed.startsWith('/') ? `/api${trimmed}` : `/api/${trimmed}`;
        }
    }
    next();
});

import { db } from './db';

app.get('/api/ping', (_req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

app.get('/api/health', async (_req, res) => {
    try {
        await db.$connect();
        const userCount = await db.user.count();
        res.json({
            status: 'ok',
            db: 'connected',
            userCount,
            env: process.env.NODE_ENV,
            mongoDbUrl: process.env.DATABASE_URL ? 'Set' : 'Missing'
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'error',
            db: 'disconnected',
            error: (error as Error).message,
            stack: (error as Error).stack
        });
    }
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 30,
    message: {
        error: 'Too many enquiries',
        message: 'Too many submissions from this network. Please try again in an hour or email us directly.',
    },
    standardHeaders: true,
    skip: (req) => req.method !== 'POST',
});

const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many login attempts. Try again in 15 minutes.' },
    standardHeaders: true,
});

app.use('/api/projects', projectsRouter as any);
app.use('/api/feedback', feedbackRouter as any);
app.use('/api/contact', contactLimiter, contactRouter as any);
app.use('/api/auth', authRouter as any);
app.use('/api/users', usersRouter as any);
app.use('/api/settings', settingsRouter as any);
app.use('/api/upload', uploadRouter as any);
app.use('/api/portfolio', portfolioRouter as any);
app.use('/api/analytics', analyticsRouter as any);
app.use('/api/services', servicesRouter as any);
app.use('/api/products', productsRouter as any);
app.use('/api/seo-pages', seoPagesRouter as any);
app.use('/api/backlinks', backlinksRouter as any);
app.use('/api/admin', adminLoginLimiter, adminAuthRouter as any);
app.use('/api/client', clientAuthRouter as any);
app.use('/api/sync', syncStubRouter as any);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', path: req.path, originalUrl: req.originalUrl });
});

// Global error handler — return 503 for API routes so frontend shows env/redeploy message
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled Error:', err);
    const isBodyParse = err.type === 'entity.parse.failed' || err instanceof SyntaxError;
    const url = req.url && String(req.url);
    const isAnalytics = url && url.includes('/api/analytics');
    const isAdmin = url && url.includes('/api/admin');
    const use503 = isBodyParse || isAnalytics || isAdmin;
    const status = use503 ? 503 : 500;
    const errorMessage = isAdmin
        ? (err?.message ? `Login failed: ${err.message}` : 'Login failed. Set ADMIN_PASSWORD and JWT_SECRET in Vercel → Settings → Environment Variables, then redeploy. Check /api/admin/status to verify.')
        : (use503 ? 'Service temporarily unavailable' : 'Internal Server Error');
    res.status(status).json({
        error: errorMessage,
        message: err?.message,
        success: false,
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    });
});

// Only start the server if we're not in a serverless environment
if (!process.env.NETLIFY && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
