/* Static site generator for yalemiller.com.
   node build.js  ->  writes index.html, projects/<slug>/index.html, ephemera/index.html,
   scroll-like-me/index.html, 404.html and redirect stubs for the old Webflow paths. No dependencies.

   NDA pages: put the protected blocks in private/<slug>.js (gitignored, same block format as
   data/projects.js) and build with NDA_PASSWORD set. Without a private file the page shows the
   request-access gate only. */
'use strict';
const fs = require('fs');
const path = require('path');
const { esc, rich } = require('./lib/html');
const renderBlocks = require('./lib/blocks');
const nda = require('./lib/nda');

const ROOT = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'img', 'manifest.json'), 'utf8'));

const SITE = {
  name: 'YALE MILLER',
  title: 'Yale Miller — Designer',
  description: 'Yale Miller is a designer with a focus on UX/UI, Graphic Design, and Design Research.',
  resume: 'https://drive.google.com/file/d/1oDhroNbx-kLqou2zMB6A4Ui5tlxEzJxb/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/yale-miller/',
  year: new Date().getFullYear(),
  phrases: ['an API Builder for 84.51°', 'the 2026 Futures Forum', 'GenAI tools for Kroger', 'the future of wine with EJ Gallo', 'workshops for design thinkers'],
};

/* ---------------- image helpers ---------------- */
function makeHelpers(base) {
  const asset = (p) => `${base}assets/${p}`;

  /* <picture> with WebP + JPEG srcsets from the manifest. */
  function pic(name, o = {}) {
    const m = manifest[name];
    if (!m) throw new Error(`No image in manifest: ${name}`);
    if (m.type === 'static') {
      return `<img src="${asset('img/' + m.file)}" alt="${esc(o.alt || '')}"${o.cls ? ` class="${o.cls}"` : ''}${o.eager ? '' : ' loading="lazy"'}>`;
    }
    const src = (w, ext) => asset(`img/${name}-${w}.${ext}`);
    const set = (ext) => m.widths.map((w) => `${src(w, ext)} ${w}w`).join(', ');
    const largest = m.widths[m.widths.length - 1];
    const sizes = o.sizes || '100vw';
    const attrs = [
      `src="${src(largest, 'jpg')}"`,
      `srcset="${set('jpg')}"`,
      `sizes="${sizes}"`,
      `width="${m.width}"`,
      `height="${m.height}"`,
      `alt="${esc(o.alt || '')}"`,
      o.cls ? `class="${o.cls}"` : '',
      o.eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"',
    ].filter(Boolean).join(' ');
    return `<picture><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img ${attrs}></picture>`;
  }

  /* Full-size URL for the lightbox. */
  const full = (name) => {
    const m = manifest[name];
    if (!m) throw new Error(`No image in manifest: ${name}`);
    if (m.type === 'static') return asset('img/' + m.file);
    return asset(`img/${name}-${m.widths[m.widths.length - 1]}.jpg`);
  };

  /* Single zoomable figure (used by the Scroll Like Me feed). */
  function figure(img, o = {}) {
    const inner = pic(img, { alt: o.alt || '', sizes: o.sizes });
    const wrapped = o.zoom === false ? inner
      : `<button type="button" class="zoom" data-zoom data-full="${full(img)}" data-caption="${esc(o.caption || o.alt || '')}" aria-label="${esc('Open: ' + (o.caption || o.alt || 'image'))}">${inner}</button>`;
    return `<figure${o.cls ? ` class="${o.cls}"` : ''}>${wrapped}${o.caption ? `<figcaption>${o.caption}</figcaption>` : ''}</figure>`;
  }

  return { asset, pic, full, figure, esc };
}

/* ---------------- chrome ---------------- */
function head(base, { title, description, themeColor, accent }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="${themeColor || '#ffffff'}">
<link rel="icon" href="${base}assets/favicon.ico" sizes="any">
<link rel="icon" href="${base}assets/logo/logo.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}assets/webclip.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}css/site.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body${accent ? ` style="--accent:${accent}"` : ''}>
<a class="skip-link" href="#main">Skip to content</a>`;
}

function links(base, current, titleCase) {
  return [
    ['PROJECTS', 'Projects', `${base}#projects`, false],
    ['RESUME', 'Resume', SITE.resume, false, true],
    ['LINKEDIN', 'LinkedIn', SITE.linkedin, false, true],
    ['EPHEMERA', 'Ephemera', `${base}ephemera/`, current === 'ephemera'],
    ['SCROLL LIKE ME', 'Scroll Like Me', `${base}scroll-like-me/`, current === 'scroll'],
  ].map(([upper, title, href, cur, ext]) =>
    `<a href="${href}"${cur ? ' aria-current="page"' : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${titleCase ? title : upper}</a>`
  ).join('');
}

function brand(base) {
  return `<a class="brand" href="${base}" aria-label="Yale Miller — home"><img class="brand__logo" src="${base}assets/logo/logo.svg" alt="" width="93" height="49">${SITE.name}</a>`;
}

/* Header plus the phone menu that drops below it. onHero: white text over a case-study hero;
   rule: false drops the divider under the header. */
function header(base, { onHero = false, rule = true, current = '' } = {}) {
  const cls = ['site-header', onHero && 'site-header--hero', !rule && 'site-header--bare'].filter(Boolean).join(' ');
  return `<header class="${cls}">
  ${brand(base)}
  <nav class="nav" aria-label="Primary">${links(base, current)}</nav>
  <button type="button" class="menu-btn" data-menu-toggle aria-label="Menu" aria-expanded="false" aria-controls="site-menu"><span></span><span></span></button>
</header>
<nav class="menu" id="site-menu" aria-label="Menu">${links(base, current, true)}</nav>`;
}

function footer(base, { current = '' } = {}) {
  const swap = current === 'ephemera'
    ? `<a href="${base}#projects">PROJECTS</a>`
    : `<a href="${base}ephemera/">EPHEMERA</a>`;
  return `<footer class="site-footer">
  <span class="site-footer__name">${SITE.name}</span>
  <div class="site-footer__links">
    <a href="${SITE.resume}" target="_blank" rel="noopener">RESUME</a>
    <a href="${SITE.linkedin}" target="_blank" rel="noopener">LINKEDIN</a>
    ${swap}
    <a href="${base}scroll-like-me/">SCROLL LIKE ME</a>
    <span class="site-footer__copy">© ${SITE.year}</span>
  </div>
</footer>`;
}

function lightbox() {
  return `<div class="lightbox" data-lightbox data-open="false" role="dialog" aria-modal="true" aria-label="Image viewer">
  <div class="lightbox__bar"><span class="lightbox__count" aria-live="polite"></span><button type="button" class="lightbox__close">CLOSE <span aria-hidden="true">✕</span></button></div>
  <div class="lightbox__stage">
    <img class="lightbox__img" alt="">
    <button type="button" class="lightbox__nav lightbox__prev" aria-label="Previous image">←</button>
    <button type="button" class="lightbox__nav lightbox__next" aria-label="Next image">→</button>
  </div>
  <p class="lightbox__cap"></p>
</div>`;
}

const scripts = (base, extra = []) => [`${base}js/site.js`, ...extra]
  .map((src) => `<script src="${src}" defer></script>`).join('\n') + '\n</body>\n</html>\n';

/* ---------------- data ---------------- */
const projects = require('./data/projects.js');
const ephemera = require('./data/ephemera.js');
const pad = (n) => String(n).padStart(2, '0');
const projectHref = (base, p) => `${base}projects/${p.slug}/`;

/* ---------------- home ---------------- */
function card(base, H, p) {
  return `
    <a class="card" href="${projectHref(base, p)}" style="--card-color:${p.tint}">
      <span class="card__media">${H.pic(p.cover, { alt: p.coverAlt || '', cls: 'card__img', sizes: '(max-width: 820px) 45vw, 31vw' })}${p.nda ? '<span class="card__badge"><span class="hide-sm">PASSWORD PROTECTED</span><span class="show-sm">LOCKED</span></span>' : ''}<span class="card__bar"></span></span>
      <span class="card__title"><span class="card__title-text">${esc(p.title)}</span><span class="card__arrow" aria-hidden="true">→</span></span>
      <span class="card__tags">${esc(p.tags.join(' · '))}</span>
    </a>`;
}

function buildHome() {
  const base = '';
  const H = makeHelpers(base);
  const selected = projects.filter((p) => !p.nda && p.home !== false);
  const ndaProjects = projects.filter((p) => p.nda);
  const phrases = SITE.phrases;

  const html = `${head(base, { title: SITE.title, description: SITE.description })}
${header(base, { current: 'home' })}
<main id="main">
  <section class="hero">
    <h1 class="hero__h1">I designed…</h1>
    <p class="typewriter" data-typewriter='${JSON.stringify(phrases).replace(/'/g, '&#39;')}'><span class="visually-hidden">${esc(phrases.join(', '))}</span><span class="typewriter__typed" aria-hidden="true"></span><span class="typewriter__ghost" aria-hidden="true">${esc(phrases[0])}</span></p>
    <p class="bio">${SITE.description}</p>
  </section>
  <div class="section-rule" id="projects"><h2 class="section-rule__label">SELECTED PROJECTS</h2></div>
  <div class="grid">${selected.map((p) => card(base, H, p)).join('')}
  </div>
  <div class="section-rule" id="nda"><h2 class="section-rule__label">NDA PROJECTS</h2><span class="section-rule__note">Password protected<span class="hide-sm"> · request access</span></span></div>
  <div class="grid grid--nda">${ndaProjects.map((p) => card(base, H, p)).join('')}
  </div>
</main>
${footer(base)}
${scripts(base)}`;
  write('index.html', html);
}

/* ---------------- case study ---------------- */
/* Protected NDA content by slug, from private/<slug>.js. Checked before any page is written so a
   missing password can't leave a half-built site. */
function loadProtected() {
  const found = {};
  for (const p of projects.filter((x) => x.nda)) {
    const file = path.join(ROOT, 'private', `${p.slug}.js`);
    if (fs.existsSync(file)) found[p.slug] = require(file);
  }
  const files = Object.keys(found).map((slug) => `private/${slug}.js`);
  if (files.length && !process.env.NDA_PASSWORD) {
    throw new Error(`${files.join(', ')} found but NDA_PASSWORD is not set; refusing to build without it.`);
  }
  return found;
}
const protectedContent = loadProtected();

/* The NDA gate. With protected content it carries the encrypted blocks and a password form. */
function ndaGate(p, H) {
  const priv = protectedContent[p.slug];
  const payload = priv ? nda.encrypt(renderBlocks(priv.blocks, { H, slug: p.slug }), process.env.NDA_PASSWORD) : null;
  const form = payload ? `
    <form class="nda__form">
      <label class="eyebrow" for="nda-password">PASSWORD</label>
      <div class="nda__row"><input class="nda__input" id="nda-password" type="password" autocomplete="current-password" required><button type="submit" class="nda__submit">UNLOCK</button></div>
      <p class="nda__error" role="alert"></p>
    </form>` : '';
  return `<section class="cs-sec">
  <div class="nda" data-nda>
    <p class="eyebrow">PASSWORD PROTECTED</p>
    <h2 class="cs-h2">This case study is under NDA.</h2>
    <p class="cs-body">The work was completed under a non-disclosure agreement with ${esc(p.partner)}, so it's shared by request. ${payload ? 'Enter the password to read it, or request access below.' : "Request access and I'll walk you through it."}</p>${form}
    <a class="nda__request" href="${SITE.linkedin}" target="_blank" rel="noopener">REQUEST ACCESS <span aria-hidden="true">↗</span></a>
  </div>${payload ? `\n  <script type="application/json" data-nda-payload>${JSON.stringify(payload)}</script>` : ''}
</section>
<div data-nda-content></div>`;
}

function buildProject(p, i) {
  const base = '../../';
  const H = makeHelpers(base);
  const n = projects.length;
  const next = projects[(i + 1) % n];
  const facts = p.facts.map(([l, v]) => `<div><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const body = p.nda ? ndaGate(p, H) : renderBlocks(p.blocks, { H, slug: p.slug });
  const protectedPage = body.includes('data-nda-payload');

  const html = `${head(base, { title: `${p.title} — Yale Miller`, description: p.summary || p.question, themeColor: p.tint, accent: p.tint })}
<div class="cs-hero">
  ${p.hero ? H.pic(p.hero, { alt: '', cls: 'cs-hero__bg', eager: true, sizes: '100vw' }) : ''}<span class="cs-hero__tint"></span><span class="cs-hero__shade"></span>
  ${header(base, { onHero: true, rule: p.heroRule !== false })}
  <div class="cs-hero__body">
    <div>
      <p class="cs-hero__eyebrow">${esc(p.tags.join(' · ').toUpperCase())}</p>
      <h1 class="cs-hero__h1">${esc(p.question)}</h1>${p.sub ? `\n      <p class="cs-hero__sub">${esc(p.sub)}</p>` : ''}
    </div>${p.heroCount ? `\n    <span class="cs-hero__count">${pad(i + 1)} / ${pad(n)}</span>` : ''}
  </div>
</div>
<div class="cs-page">
<main id="main">
  <dl class="cs-facts" style="--n:${p.facts.length}">${facts}</dl>
  <section class="cs-intro">
    <h2 class="cs-intro__title">${esc(p.title)}</h2>
    <div><p class="eyebrow">OVERVIEW</p><p class="cs-intro__lead">${rich(p.overview)}</p></div>
  </section>
${body}
  <a class="next-project" href="${projectHref(base, next)}">
    <span><span class="next-project__eyebrow">NEXT PROJECT — ${pad(((i + 1) % n) + 1)} / ${pad(n)}</span><span class="next-project__title">${esc(next.title)}${next.nda ? ' (NDA)' : ''}</span></span>
    <span class="next-project__arrow" aria-hidden="true">→</span>
  </a>
</main>
${footer(base)}
</div>
${lightbox()}
${scripts(base, protectedPage ? [`${base}js/nda.js`] : [])}`;
  write(`projects/${p.slug}/index.html`, html);

  // Redirect stub for the old Webflow path.
  if (p.oldPath) {
    write(`${p.oldPath}/index.html`, redirect(`/projects/${p.slug}/`, `../projects/${p.slug}/`, p.title));
  }
}

/* ---------------- ephemera ---------------- */
function buildEphemera() {
  const base = '../';
  const H = makeHelpers(base);
  const items = ephemera.items.map((it) =>
    `<button type="button" data-gallery="eph" data-full="${H.full(it.img)}" data-caption="" aria-label="${esc('Open: ' + (it.alt || 'image'))}">${H.pic(it.img, { alt: it.alt || '', sizes: '(max-width: 820px) 45vw, 31vw' })}</button>`
  ).join('\n');
  const html = `${head(base, { title: 'Ephemera — Yale Miller', description: ephemera.intro })}
${header(base, { current: 'ephemera' })}
<main id="main">
  <section class="eph-intro"><h1 class="eph-intro__h1">Ephemera</h1><p class="bio">${esc(ephemera.intro)}</p></section>
  <div class="section-rule"><h2 class="section-rule__label">ARCHIVE</h2></div>
  <div class="eph-grid">
${items}
  </div>
</main>
${footer(base, { current: 'ephemera' })}
${lightbox()}
${scripts(base)}`;
  write('ephemera/index.html', html);
}

function redirect(absTarget, relTarget, title) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<meta http-equiv="refresh" content="0; url=${relTarget}"><link rel="canonical" href="${absTarget}"><meta name="robots" content="noindex">
</head><body><p>This page has moved to <a href="${relTarget}">${esc(title)}</a>.</p></body></html>\n`;
}

function write(rel, content) {
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  console.log('wrote', rel);
}

buildHome();
projects.forEach(buildProject);
buildEphemera();
require('./scripts/render-scroll-feed.js')({
  feed: require('./data/scroll-feed.js'), H: makeHelpers('../'),
  head, header, footer, lightbox, scripts, write,
});
write('404.html', `${head('/', { title: 'Not found — Yale Miller', description: SITE.description })}
${header('/')}
<main id="main"><section class="hero"><h1 class="hero__h1">Not found.</h1><p class="bio">That page doesn't exist. <a href="/" style="text-decoration:underline">Back to the projects →</a></p></section></main>
${footer('/')}
${scripts('/')}`);
