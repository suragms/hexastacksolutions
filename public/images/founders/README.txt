About page defaults use headshot JPEGs (see src/data/founderAssets.ts):
  anandu.jpg
  surag.jpg

Bundled SVG fallbacks (unused when JPGs exist): anandu.svg, surag.svg.
Replace the JPG files and redeploy to refresh photos; avoid hotlinking LinkedIn URLs in code (they expire).

Optional: Admin uploads still override these in the browser (localStorage).
