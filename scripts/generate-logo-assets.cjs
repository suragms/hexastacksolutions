const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');

const markSvg = ({ size = 160, transparent = false } = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="${size}" height="${size}" fill="none">
  <defs>
    <linearGradient id="panel" x1="18" y1="18" x2="142" y2="142" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0F172A" />
      <stop offset="1" stop-color="#162A52" />
    </linearGradient>
    <linearGradient id="accent" x1="44" y1="36" x2="116" y2="124" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#38BDF8" />
      <stop offset="0.5" stop-color="#2563EB" />
      <stop offset="1" stop-color="#0EA5E9" />
    </linearGradient>
    <linearGradient id="stroke" x1="30" y1="24" x2="130" y2="136" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#93C5FD" stop-opacity="0.95" />
      <stop offset="1" stop-color="#22D3EE" stop-opacity="0.85" />
    </linearGradient>
  </defs>
  ${transparent ? '' : '<rect x="10" y="10" width="140" height="140" rx="34" fill="url(#panel)" />'}
  <path d="M80 24L122 48V96L80 120L38 96V48L80 24Z" stroke="url(#stroke)" stroke-width="8" stroke-linejoin="round" />
  <path d="M46 40H64V70H96V40H114V120H96V88H64V120H46V40Z" fill="url(#accent)" />
  <path d="M35 118L54 99" stroke="#22D3EE" stroke-width="6" stroke-linecap="round" opacity="0.72" />
  <path d="M106 61L125 42" stroke="#93C5FD" stroke-width="6" stroke-linecap="round" opacity="0.78" />
</svg>`;

const wordmarkSvg = ({ dark = true, banner = false } = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 220" width="900" height="220" fill="none">
  ${banner ? '<rect width="900" height="220" rx="44" fill="#0F172A" />' : ''}
  <g transform="translate(30 30)">
    ${markSvg({ size: 160, transparent: !banner })}
  </g>
  <text
    x="230"
    y="102"
    font-family="Segoe UI, Arial, sans-serif"
    font-size="62"
    font-weight="800"
    letter-spacing="4"
    fill="${dark ? '#0F172A' : '#F8FAFC'}"
  >
    HEXASTACK
  </text>
  <text
    x="234"
    y="152"
    font-family="Segoe UI, Arial, sans-serif"
    font-size="23"
    font-weight="700"
    letter-spacing="11"
    fill="${dark ? '#475569' : '#93C5FD'}"
  >
    SOLUTIONS
  </text>
</svg>`;

async function writePng(filename, svg, width, height) {
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, filename));
}

async function main() {
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), wordmarkSvg({ dark: true }), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'logo-dark.svg'), wordmarkSvg({ dark: true }), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), markSvg({ size: 32 }), 'utf8');

  await writePng('logo-dark-new.png', wordmarkSvg({ dark: true }), 900, 220);
  await writePng('logo-full-white.png', wordmarkSvg({ dark: false, banner: true }), 1200, 630);
  await writePng('logo-icon-white.png', markSvg({ size: 512 }), 512, 512);
  await writePng('favicon-new.png', markSvg({ size: 256 }), 256, 256);
  await writePng('hexastackbrand.png', wordmarkSvg({ dark: false, banner: true }), 1400, 420);

  console.log('Logo assets regenerated.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
