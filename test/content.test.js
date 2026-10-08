/* Checks data/projects.js and data/ephemera.js against the image manifest and the page rules. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const projects = require('../data/projects');
const ephemera = require('../data/ephemera');
const manifest = require('../assets/img/manifest.json');

/* Every image key referenced anywhere in a data object. */
function imageKeys(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => imageKeys(n, out));
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (['img', 'poster', 'icon', 'cover', 'hero'].includes(k) && typeof v === 'string') out.push(v);
      else if (k === 'imgs') v.forEach((x) => (typeof x === 'string' ? out.push(x) : imageKeys(x, out)));
      else imageKeys(v, out);
    }
  }
  return out;
}

test('every referenced image is in the manifest', () => {
  const missing = [...imageKeys(projects), ...imageKeys(ephemera)].filter((k) => !manifest[k]);
  assert.deepEqual(missing, []);
});

test('nine projects with unique slugs and the fields the templates need', () => {
  assert.equal(projects.length, 9);
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const p of projects) {
    for (const f of ['slug', 'title', 'tags', 'tint', 'cover', 'question', 'facts', 'overview']) assert.ok(p[f], `${p.slug}: ${f}`);
    assert.match(p.tint, /^#[0-9a-f]{6}$/i, `${p.slug}: tint`);
    assert.ok(Array.isArray(p.blocks) && p.blocks.length, `${p.slug}: blocks`);
  }
});

test('home grid lists every project except the Future Creators Report', () => {
  const selected = projects.filter((p) => p.home !== false).map((p) => p.slug);
  assert.deepEqual(selected, ['futures-forum', 'kroger-genai', 'polaris-api-designer', 'ej-gallo', 'next-new-deal', 'pg', 'bts', 'workshops']);
});

test('embed URLs are valid HTTPS URLs', () => {
  for (const p of projects) {
    for (const b of p.blocks.filter((x) => x.type === 'embed')) {
      for (const e of b.items) assert.equal(new URL(e.url).protocol, 'https:', `${p.slug}: ${e.url}`);
    }
  }
});
