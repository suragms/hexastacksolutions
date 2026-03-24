/**
 * Takes full-page screenshots of each main section/menu and saves to images/ss/
 * Run while dev server is up: npm run dev (then in another terminal: npm run screenshots)
 * Or: npm run screenshots (script will try default base URL)
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const OUT_DIR = path.join(__dirname, '..', 'images', 'ss');

const ROUTES = [
  { path: '/', name: '01-home' },
  { path: '/services', name: '02-services' },
  { path: '/products', name: '03-products' },
  { path: '/work', name: '04-work' },
  { path: '/contact', name: '05-contact' },
  { path: '/blog', name: '06-blog' },
  { path: '/about', name: '07-about' },
  { path: '/pricing', name: '08-pricing' },
  { path: '/solutions', name: '09-solutions' },
  { path: '/kerala', name: '10-kerala-hub' },
  { path: '/gulf-vat', name: '11-gulf-vat' },
  { path: '/products/hexabill', name: '12-products-hexabill' },
  { path: '/seo/thrissur/web-development', name: '13-seo-thrissur-web' },
  { path: '/privacy', name: '14-privacy' },
  { path: '/terms', name: '15-terms' },
];

function slug(name) {
  return name.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  console.log('Screenshots will be saved to:', OUT_DIR);
  console.log('Using base URL:', BASE_URL);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setDefaultNavigationTimeout(15000);

  for (const route of ROUTES) {
    const url = BASE_URL + route.path;
    const filename = `${route.name}.png`;
    const filepath = path.join(OUT_DIR, filename);
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.screenshot({ path: filepath, fullPage: true });
      console.log('Saved:', filename);
    } catch (err) {
      console.error('Failed', route.path, err.message);
    }
  }

  await browser.close();
  console.log('Done. Check', OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
