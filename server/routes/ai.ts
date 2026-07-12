import express from 'express';
import { requireStaff } from '../utils/auth';
import { writeAuditLog } from '../utils/audit';

const router = express.Router();

router.post('/generate-post', requireStaff, async (req, res) => {
    try {
        const { title, description, techStack, platform } = req.body || {};
        if (!title) {
            res.status(400).json({ error: 'title is required' });
            return;
        }

        const prompt = `Write an Instagram caption + 5 hashtags + a 1-line hook for this project.
Title: ${title}
Description: ${description || 'n/a'}
Tech stack: ${techStack || 'n/a'}
Platform focus: ${platform || 'instagram'}

Rules: Plain language, no buzzwords (no seamless/robust/cutting-edge/game-changing). One concrete result or number if available. No em-dashes. No emoji as bullet decoration.

Respond as JSON only:
{"hook":"...","caption":"...","hashtags":["#a","#b","#c","#d","#e"]}`;

        const openRouterKey = process.env.OPENROUTER_API_KEY;
        const ollamaBase = process.env.OLLAMA_BASE_URL;

        let text = '';

        if (openRouterKey) {
            const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';
            const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${openRouterKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': process.env.SITE_URL || 'https://hexastacksolutions.com',
                    'X-Title': 'HexaStack Admin',
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        { role: 'system', content: 'You write short social posts. Output valid JSON only.' },
                        { role: 'user', content: prompt },
                    ],
                    temperature: 0.7,
                }),
            });
            if (!r.ok) {
                const errText = await r.text();
                console.error('[AI_OPENROUTER]', errText);
                res.status(502).json({ error: 'LLM provider error' });
                return;
            }
            const data = (await r.json()) as any;
            text = data?.choices?.[0]?.message?.content || '';
        } else if (ollamaBase) {
            const model = process.env.OLLAMA_MODEL || 'llama3.1';
            const r = await fetch(`${ollamaBase.replace(/\/$/, '')}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    stream: false,
                    messages: [
                        { role: 'system', content: 'You write short social posts. Output valid JSON only.' },
                        { role: 'user', content: prompt },
                    ],
                }),
            });
            if (!r.ok) {
                res.status(502).json({ error: 'Ollama error' });
                return;
            }
            const data = (await r.json()) as any;
            text = data?.message?.content || '';
        } else {
            // Deterministic fallback when no LLM configured
            const hook = `${title}: built for real operators, not slide decks.`;
            const caption = `${description || title}\n\nTech: ${techStack || 'custom stack'}.\n\nBuilt by HexaStack Solutions (Thrissur). Reply in 2 hours on WhatsApp.`;
            const hashtags = ['#HexaStack', '#Thrissur', '#WebDev', '#KeralaStartups', '#GulfBusiness'];
            await writeAuditLog({
                userId: req.auth!.userId,
                action: 'generated_social_post',
                meta: { title, fallback: true },
            });
            res.json({ hook, caption, hashtags, provider: 'fallback' });
            return;
        }

        let parsed: { hook?: string; caption?: string; hashtags?: string[] } = {};
        try {
            const match = text.match(/\{[\s\S]*\}/);
            parsed = JSON.parse(match ? match[0] : text);
        } catch {
            parsed = { hook: text.slice(0, 120), caption: text, hashtags: [] };
        }

        await writeAuditLog({
            userId: req.auth!.userId,
            action: 'generated_social_post',
            meta: { title },
        });

        res.json({
            hook: parsed.hook || '',
            caption: parsed.caption || text,
            hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.slice(0, 8) : [],
            provider: openRouterKey ? 'openrouter' : 'ollama',
        });
    } catch (error) {
        console.error('[AI_GENERATE]', error);
        res.status(500).json({ error: 'Generation failed' });
    }
});

export default router;
