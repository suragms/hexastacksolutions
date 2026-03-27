const fs = require('fs');
const path = require('path');
const { ALL_PUBLIC_PATHS } = require('./public-routes.cjs');

const ROOT = path.resolve(__dirname, '..');
const INPUT_DIR = path.join(ROOT, 'docs', 'seo-ahrefs-inputs');
const OUTPUT_DIR = path.join(ROOT, 'docs', 'seo-ahrefs-outputs');

const REQUIRED_INPUTS = [
    'organic_keywords.csv',
    'top_pages.csv',
    'competitor_keywords.csv',
    'keyword_gap.csv',
];

const PAGE_BUCKETS = {
    home: ['/'],
    services: ['/services'],
    work: ['/work'],
    pricing: ['/pricing'],
    contact: ['/contact'],
    product_hexabill: ['/products/hexabill'],
    blog: ['/blog/'],
    location_services: ['/services/'],
    seo_locations: ['/seo/'],
};

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function normalizeHeader(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function parseCsv(content) {
    const rows = [];
    let current = '';
    let row = [];
    let inQuotes = false;

    for (let i = 0; i < content.length; i += 1) {
        const ch = content[i];
        const next = content[i + 1];

        if (ch === '"' && inQuotes && next === '"') {
            current += '"';
            i += 1;
            continue;
        }

        if (ch === '"') {
            inQuotes = !inQuotes;
            continue;
        }

        if (ch === ',' && !inQuotes) {
            row.push(current);
            current = '';
            continue;
        }

        if ((ch === '\n' || ch === '\r') && !inQuotes) {
            if (ch === '\r' && next === '\n') i += 1;
            row.push(current);
            if (row.some((cell) => cell !== '')) rows.push(row);
            row = [];
            current = '';
            continue;
        }

        current += ch;
    }

    if (current.length > 0 || row.length > 0) {
        row.push(current);
        if (row.some((cell) => cell !== '')) rows.push(row);
    }

    if (rows.length === 0) return [];

    const headers = rows[0].map(normalizeHeader);
    return rows.slice(1).map((cells) => {
        const item = {};
        headers.forEach((header, index) => {
            item[header || `col_${index + 1}`] = String(cells[index] || '').trim();
        });
        return item;
    });
}

function parseNumber(value) {
    const n = Number(String(value || '').replace(/,/g, '').trim());
    return Number.isFinite(n) ? n : 0;
}

function parseUrlPath(rawUrl) {
    const value = String(rawUrl || '').trim();
    if (!value) return '';
    try {
        if (value.startsWith('http')) {
            return new URL(value).pathname || '/';
        }
        return value.startsWith('/') ? value : `/${value}`;
    } catch {
        return value.startsWith('/') ? value : `/${value}`;
    }
}

function inferMarket(keyword, pagePath) {
    const text = `${keyword} ${pagePath}`.toLowerCase();
    if (text.includes('thrissur')) return 'thrissur';
    if (text.includes('kerala') || text.includes('kochi') || text.includes('ernakulam') || text.includes('kozhikode')) return 'kerala';
    if (text.includes('uae') || text.includes('dubai') || text.includes('kuwait') || text.includes('bahrain') || text.includes('qatar') || text.includes('saudi') || text.includes('gulf')) return 'gulf';
    return 'generic';
}

function inferIntent(keyword) {
    const k = String(keyword || '').toLowerCase();
    if (/(cost|price|pricing|quote|charges|agency|company|developer|software for|best)/.test(k)) return 'commercial';
    if (/(buy|demo|hire|book|contact|near me)/.test(k)) return 'transactional';
    if (/(how|what|guide|vs|difference|checklist|tips)/.test(k)) return 'support_problem';
    return 'service';
}

function inferPainPoint(keyword) {
    const k = String(keyword || '').toLowerCase();
    if (/(vat|gst|invoice|billing|compliance|tax)/.test(k)) return 'compliance';
    if (/(pos|stock|inventory|reconciliation|manual|errors|reports|workflow)/.test(k)) return 'operations';
    if (/(website|seo|lead|rank|traffic|enquiry|whatsapp)/.test(k)) return 'growth';
    return 'other';
}

function inferBusinessFit(keyword, pagePath) {
    const text = `${keyword} ${pagePath}`.toLowerCase();
    if (/(pos|billing|vat|website|custom software|web development|whatsapp automation|lab software|thrissur|kerala|uae|gulf|hexabill)/.test(text)) {
        return 'high';
    }
    if (/(app development|software company|automation)/.test(text)) return 'medium';
    return 'low';
}

function findPageBucket(pagePath) {
    const pathValue = pagePath || '';
    const bucketKey = Object.keys(PAGE_BUCKETS).find((key) => PAGE_BUCKETS[key].some((prefix) => pathValue.startsWith(prefix)));
    return bucketKey || 'other';
}

function scoreKeyword(row) {
    const position = parseNumber(row.position || row.current_position || row.rank || row.organic_position);
    const volume = parseNumber(row.volume || row.search_volume || row.keyword_volume);
    const kd = parseNumber(row.kd || row.keyword_difficulty || row.difficulty);
    const market = row.market;
    const intent = row.intent;
    const businessFit = row.business_fit;

    const positionScore = position >= 11 && position <= 40 ? 40 : position > 0 && position <= 10 ? 25 : 15;
    const volumeScore = volume >= 20 && volume <= 300 ? 20 : volume > 300 && volume <= 1500 ? 15 : 10;
    const kdScore = kd <= 20 ? 20 : kd <= 35 ? 15 : 10;
    const marketScore = market === 'thrissur' || market === 'kerala' || market === 'gulf' ? 10 : 4;
    const intentScore = intent === 'commercial' || intent === 'transactional' ? 8 : 5;
    const fitScore = businessFit === 'high' ? 12 : businessFit === 'medium' ? 7 : 3;

    return positionScore + volumeScore + kdScore + marketScore + intentScore + fitScore;
}

function toCsv(rows, headers) {
    const escape = (value) => {
        const s = String(value ?? '');
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [];
    lines.push(headers.join(','));
    rows.forEach((row) => {
        lines.push(headers.map((h) => escape(row[h])).join(','));
    });
    return `${lines.join('\n')}\n`;
}

function normalizeKeywordRows(rawRows) {
    return rawRows.map((row) => {
        const keyword = row.keyword || row.query || row.search_term || '';
        const pagePath = parseUrlPath(row.url || row.page || row.landing_page || row.target_url || '');
        const market = inferMarket(keyword, pagePath);
        const intent = inferIntent(keyword);
        const painPoint = inferPainPoint(keyword);
        const businessFit = inferBusinessFit(keyword, pagePath);
        const bucket = findPageBucket(pagePath);
        const mappedUrl = ALL_PUBLIC_PATHS.includes(pagePath) ? pagePath : '';

        const normalized = {
            keyword,
            page_path: pagePath,
            market,
            intent,
            pain_point: painPoint,
            business_fit: businessFit,
            page_bucket: bucket,
            mapped_url: mappedUrl,
            position: parseNumber(row.position || row.current_position || row.rank || row.organic_position),
            volume: parseNumber(row.volume || row.search_volume || row.keyword_volume),
            kd: parseNumber(row.kd || row.keyword_difficulty || row.difficulty),
            traffic: parseNumber(row.traffic || row.organic_traffic || row.estimated_traffic),
        };

        normalized.priority_score = scoreKeyword(normalized);
        return normalized;
    });
}

function buildPainPointMatrix(rows) {
    const groups = {
        compliance: new Set(),
        operations: new Set(),
        growth: new Set(),
        other: new Set(),
    };
    rows.forEach((row) => {
        const bucket = groups[row.pain_point] ? row.pain_point : 'other';
        if (row.keyword) groups[bucket].add(row.keyword);
    });

    return Object.entries(groups).map(([key, set]) => ({
        pain_point: key,
        sample_keywords: Array.from(set).slice(0, 12).join(' | '),
    }));
}

function writeReadmeIfMissingInputs(missing) {
    const message = [
        '# Ahrefs Inputs Missing',
        '',
        'The pipeline could not run because some required CSV files are missing in `docs/seo-ahrefs-inputs`.',
        '',
        'Missing files:',
        ...missing.map((file) => `- ${file}`),
        '',
        'Expected filenames:',
        ...REQUIRED_INPUTS.map((file) => `- ${file}`),
        '',
        'After adding the files, run:',
        '',
        '```bash',
        'npm run seo:ahrefs',
        '```',
        '',
    ].join('\n');

    fs.writeFileSync(path.join(OUTPUT_DIR, 'README_MISSING_INPUTS.md'), message, 'utf8');
}

function main() {
    ensureDir(INPUT_DIR);
    ensureDir(OUTPUT_DIR);

    const missing = REQUIRED_INPUTS.filter((file) => !fs.existsSync(path.join(INPUT_DIR, file)));
    if (missing.length > 0) {
        writeReadmeIfMissingInputs(missing);
        console.log('[seo:ahrefs] Missing input files. See docs/seo-ahrefs-outputs/README_MISSING_INPUTS.md');
        process.exitCode = 1;
        return;
    }

    const organicRows = parseCsv(fs.readFileSync(path.join(INPUT_DIR, 'organic_keywords.csv'), 'utf8'));
    const normalized = normalizeKeywordRows(organicRows).filter((row) => row.keyword);

    const sorted = [...normalized].sort((a, b) => b.priority_score - a.priority_score);
    const top30 = sorted.slice(0, 30);
    const quickWins = sorted
        .filter((row) => row.position >= 11 && row.position <= 40 && row.business_fit !== 'low')
        .slice(0, 50);
    const painPointMatrix = buildPainPointMatrix(sorted);

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'keyword_master.csv'),
        toCsv(sorted, ['keyword', 'page_path', 'market', 'intent', 'pain_point', 'business_fit', 'page_bucket', 'mapped_url', 'position', 'volume', 'kd', 'traffic', 'priority_score']),
        'utf8'
    );
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'top30_priority_keywords.csv'),
        toCsv(top30, ['keyword', 'market', 'intent', 'pain_point', 'business_fit', 'mapped_url', 'position', 'volume', 'kd', 'priority_score']),
        'utf8'
    );
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'quick_wins_positions_11_40.csv'),
        toCsv(quickWins, ['keyword', 'mapped_url', 'position', 'volume', 'kd', 'business_fit', 'priority_score']),
        'utf8'
    );
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'pain_point_matrix.csv'),
        toCsv(painPointMatrix, ['pain_point', 'sample_keywords']),
        'utf8'
    );

    console.log(`[seo:ahrefs] Generated outputs in docs/seo-ahrefs-outputs from ${sorted.length} keyword rows.`);
}

main();
