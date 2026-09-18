/* Image pipeline: assets/img/src/**  ->  assets/img/<name>-<w>.{webp,jpg}
   Writes assets/img/manifest.json with intrinsic dimensions and emitted widths.
   Run: node scripts/images.js            (skips files that are already up to date)
        node scripts/images.js --force    (rebuild everything) */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets', 'img', 'src');
const OUT = path.join(ROOT, 'assets', 'img');
const WIDTHS = [800, 1200, 1600];
const FORCE = process.argv.includes('--force');

const manifestPath = path.join(OUT, 'manifest.json');
const manifest = fs.existsSync(manifestPath) && !FORCE ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

function outName(file) {
  // Flatten sub-folders into the file name: ephemera/eph-01.png -> eph-01
  return path.basename(file).replace(/\.[^.]+$/, '');
}

async function processRaster(file) {
  const name = outName(file);
  const stat = fs.statSync(file);
  const prev = manifest[name];
  if (prev && prev.mtime === stat.mtimeMs && !FORCE) return { name, skipped: true };

  const img = sharp(file, { failOn: 'none' }).rotate();
  const meta = await img.metadata();
  const w = meta.width, h = meta.height;
  const widths = WIDTHS.filter((x) => x <= w);
  if (!widths.length) widths.push(Math.min(w, WIDTHS[0]));
  // If the source is only a little wider than the largest step, still emit it.
  if (w > widths[widths.length - 1] && w <= WIDTHS[WIDTHS.length - 1]) widths.push(w);

  const hasAlpha = !!meta.hasAlpha;
  for (const tw of widths) {
    const base = path.join(OUT, `${name}-${tw}`);
    const resized = sharp(file, { failOn: 'none' }).rotate().resize({ width: tw, withoutEnlargement: true });
    await resized.clone().webp({ quality: 78, effort: 4 }).toFile(`${base}.webp`);
    await resized.clone().flatten(hasAlpha ? { background: '#ffffff' } : false).jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`);
  }
  manifest[name] = { width: w, height: h, widths, mtime: stat.mtimeMs, type: 'raster' };
  return { name, widths };
}

function copyStatic(file) {
  const name = path.basename(file);
  const dest = path.join(OUT, name);
  fs.copyFileSync(file, dest);
  const key = outName(file);
  manifest[key] = { type: 'static', file: name, mtime: fs.statSync(file).mtimeMs };
  return { name, copied: true };
}

(async () => {
  const files = walk(SRC);
  let done = 0, skipped = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.gif', '.svg'].includes(ext)) { copyStatic(file); done++; continue; }
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
    try {
      const r = await processRaster(file);
      if (r.skipped) skipped++; else { done++; process.stdout.write(`${r.name} -> ${r.widths.join('/')}\n`); }
    } catch (e) {
      console.error(`FAILED ${file}: ${e.message}`);
    }
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  console.log(`\n${done} processed, ${skipped} up to date. Manifest: ${path.relative(ROOT, manifestPath)}`);
})();
