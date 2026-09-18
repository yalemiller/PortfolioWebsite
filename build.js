/* Static site generator for yalemiller.com.
   node build.js  ->  writes index.html, projects/<slug>/index.html, ephemera/index.html
   and redirect stubs for the old Webflow paths. No dependencies. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'img', 'manifest.json'), 'utf8'));

const SITE = {
  name: 'YALE MILLER',
  title: 'Yale Miller — Designer',
  description: 'Yale Miller is a designer with a focus on UX/UI, Graphic Design, and Design Research.',
  resume: 'https://drive.google.com/file/d/1q6sAfwxFcwk1NBoerzAJZkJnyHLh6ytB/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/yale-miller/',
  year: new Date().getFullYear(),
};

/* ---------------- helpers ---------------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function hexToRgba(hex, a) {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

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
    if (m.type === 'static') return asset('img/' + m.file);
    return asset(`img/${name}-${m.widths[m.widths.length - 1]}.jpg`);
  };

  /* Lightbox-enabled gallery. items: [{img, alt, cap}] */
  function gallery(group, items, o = {}) {
    const cls = ['gallery', o.cols ? `gallery--${o.cols}` : '', o.ratio || '', o.cls || ''].filter(Boolean).join(' ');
    const btns = items.map((it) =>
      `<button type="button" data-gallery="${group}" data-full="${full(it.img)}" data-caption="${esc(it.cap || it.alt || '')}" aria-label="${esc('Open: ' + (it.cap || it.alt || 'image'))}">${pic(it.img, { alt: it.alt || '', sizes: o.sizes })}</button>`
    ).join('\n');
    return `<div class="${cls}">\n${btns}\n</div>`;
  }

  /* Single zoomable figure. */
  function figure(img, o = {}) {
    const inner = pic(img, { alt: o.alt || '', sizes: o.sizes });
    const wrapped = o.zoom === false ? inner
      : `<button type="button" class="zoom${o.ratio ? ' ' + o.ratio : ''}${o.contain ? ' contain' : ''}" data-zoom data-full="${full(img)}" data-caption="${esc(o.caption || o.alt || '')}" aria-label="${esc('Open: ' + (o.caption || o.alt || 'image'))}">${inner}</button>`;
    return `<figure${o.cls ? ` class="${o.cls}"` : ''}>${wrapped}${o.caption ? `<figcaption>${o.caption}</figcaption>` : ''}</figure>`;
  }

  function video(o) {
    return `<div class="cs-video" data-video="${o.provider}" data-video-id="${o.id}" data-video-title="${esc(o.title)}">
  ${pic(o.poster, { alt: '', cls: 'cs-video__poster', sizes: '(max-width: 639px) 100vw, calc(100vw - 96px)' })}
  <button type="button" class="cs-video__btn" aria-label="${esc('Play video: ' + o.title)}"><span class="cs-video__play"></span></button>
</div>`;
  }

  /* Click-to-load iframe (Figma, Issuu). */
  function embed(o) {
    return `<div class="cs-video cs-embed${o.inSection ? ' cs-embed--in-section' : ''}" data-embed="${esc(o.src)}" data-embed-title="${esc(o.title)}">
  ${o.poster ? pic(o.poster, { alt: '', cls: 'cs-video__poster', sizes: o.sizes || '(max-width: 639px) 100vw, calc(100vw - 96px)' }) : ''}
  <button type="button" class="cs-video__btn"><span class="cs-embed__label">${esc(o.label || 'Load ' + o.title)} <span aria-hidden="true">↗</span></span></button>
</div>${o.link ? `<p class="caption">Prefer a new tab? <a href="${esc(o.link)}" target="_blank" rel="noopener">Open ${esc(o.title)} ↗</a></p>` : ''}`;
  }

  return { asset, pic, full, gallery, figure, video, embed, esc };
}

/* ---------------- chrome ---------------- */
function head(base, { title, description, ogImage, themeColor }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">${ogImage ? `\n<meta property="og:image" content="${ogImage}">` : ''}
<meta name="theme-color" content="${themeColor || '#ffffff'}">
<link rel="icon" href="${base}assets/logo/logo.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}css/site.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>`;
}

function navLinks(base, current) {
  const links = [
    ['PROJECTS', `${base}#projects`, current === 'home'],
    ['RESUME', SITE.resume, false, true],
    ['LINKEDIN', SITE.linkedin, false, true],
    ['EPHEMERA', `${base}ephemera/`, current === 'ephemera'],
  ];
  return links.map(([label, href, cur, ext]) =>
    `<a href="${href}"${cur ? ' aria-current="page"' : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`
  ).join('');
}

function brand(base, cls = '') {
  return `<a class="brand${cls}" href="${base}" aria-label="Yale Miller — home"><img class="brand__logo" src="${base}assets/logo/logo.svg" alt="" width="93" height="49">${SITE.name}</a>`;
}

function header(base, { onHero = false, current = '' } = {}) {
  return `<header class="site-header${onHero ? ' on-hero' : ''}">
  ${brand(base)}
  <nav class="nav" aria-label="Primary">${navLinks(base, current)}</nav>
  <button type="button" class="menu-btn" data-menu-open aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
</header>`;
}

function mobileMenu(base, current) {
  return `<div class="mobile-menu" id="mobile-menu" data-menu data-open="false" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="mobile-menu__bar">${brand(base)}<button type="button" class="menu-btn" data-menu-close aria-label="Close menu" aria-expanded="true"><span></span><span></span></button></div>
  <nav class="mobile-menu__list" aria-label="Primary (mobile)">${navLinks(base, current)}</nav>
  <p class="mobile-menu__foot">© ${SITE.year} Yale Miller</p>
</div>`;
}

function footer(base, { onWhite = false } = {}) {
  return `<footer class="site-footer${onWhite ? ' on-white' : ''}">
  <span class="site-footer__name">${SITE.name}</span>
  <div class="site-footer__links">
    <a href="${SITE.resume}" target="_blank" rel="noopener">RESUME</a>
    <a href="${SITE.linkedin}" target="_blank" rel="noopener">LINKEDIN</a>
    <a href="${base}ephemera/">EPHEMERA</a>
    <span class="site-footer__copy">© ${SITE.year}${onWhite ? ' YALE MILLER' : ''}</span>
  </div>
</footer>`;
}

function lightbox() {
  return `<div class="lightbox" data-lightbox data-open="false" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button type="button" class="lightbox__close" aria-label="Close">×</button>
  <button type="button" class="lightbox__prev" aria-label="Previous image">←</button>
  <img class="lightbox__img" alt="">
  <p class="lightbox__cap"></p>
  <button type="button" class="lightbox__next" aria-label="Next image">→</button>
</div>`;
}

const scripts = (base) => `<script src="${base}js/site.js" defer></script>\n</body>\n</html>\n`;

/* ---------------- data ---------------- */
const projects = require('./data/projects.js');
const ephemera = require('./data/ephemera.js');
const pad = (n) => String(n).padStart(2, '0');
const projectHref = (base, p) => `${base}projects/${p.slug}/`;

/* ---------------- home ---------------- */
function buildHome() {
  const base = '';
  const H = makeHelpers(base);
  const phrases = ['an API Builder for 84.51°', 'the 2026 Futures Forum', 'GenAI tools for Kroger', 'the Future Creators Report', 'the future of wine with EJ Gallo', 'workshops for design thinkers'];

  const cards = projects.map((p) => `
    <a class="card" href="${projectHref(base, p)}" style="--card-color:${p.color}">
      <span class="card__media">${H.pic(p.cover, { alt: p.coverAlt || '', cls: 'card__img', sizes: '(max-width: 639px) 45vw, (max-width: 1023px) 46vw, 30vw' })}<span class="card__bar"></span></span>
      <span class="card__title"><span class="card__title-text">${p.title}</span><span class="card__arrow" aria-hidden="true">→</span></span>
      <span class="card__tags">${p.tags.join(' · ')}</span>
    </a>`).join('');

  const html = `${head(base, { title: SITE.title, description: SITE.description })}
${header(base, { current: 'home' })}
<main id="main">
  <section class="hero">
    <h1 class="hero__h1">I designed…</h1>
    <p class="typewriter" data-typewriter='${JSON.stringify(phrases).replace(/'/g, '&#39;')}' aria-label="${esc(phrases.join('; '))}"><span class="typewriter__typed" aria-hidden="true"></span><span class="typewriter__ghost" aria-hidden="true">${esc(phrases[0])}</span></p>
    <p class="bio">${SITE.description}</p>
  </section>
  <div class="section-rule" id="projects"><span class="section-rule__label">SELECTED PROJECTS</span></div>
  <div class="grid">${cards}
  </div>
</main>
${footer(base)}
${mobileMenu(base, 'home')}
${scripts(base)}`;
  write('index.html', html);
}

/* ---------------- case study ---------------- */
function buildProject(p, i) {
  const base = '../../';
  const H = makeHelpers(base);
  const num = pad(i + 1), total = pad(projects.length);
  const next = projects[(i + 1) % projects.length];
  const nextNum = pad(((i + 1) % projects.length) + 1);
  const color = p.heroColor || p.color;

  const meta = Object.entries(p.meta).map(([k, v]) => `<div><dt>${k}</dt><dd>${Array.isArray(v) ? v.join('<br>') : v}</dd></div>`).join('\n      ');

  const html = `${head(base, { title: `${p.title} — Yale Miller`, description: p.summary || p.question, themeColor: color })}
<div class="cs-hero" style="--project-color:${color};--project-color-88:${hexToRgba(color, .88)};--project-color-55:${hexToRgba(color, .55)}">
  ${p.hero ? H.pic(p.hero, { alt: '', cls: 'cs-hero__bg', eager: true, sizes: '100vw' }) : ''}
  <div class="cs-hero__ov1"></div><div class="cs-hero__ov2"></div>
  ${header(base, { onHero: true })}
  <div class="cs-hero__body">
    <h1 class="cs-hero__h1">${p.question}</h1>
    <span class="cs-hero__count" aria-label="Project ${num} of ${total}">${num} / ${total}</span>
  </div>
</div>
<main id="main">
  <section class="cs-intro">
    <h2 class="cs-intro__title">${p.shortTitle || p.title}</h2>
    <div class="cs-intro__text">
      <p class="label">Overview</p>
      <div class="prose">${p.overview}</div>
    </div>
    <dl class="cs-meta">
      ${meta}
    </dl>
  </section>
${p.body(H)}
  <a class="next-project" href="${projectHref(base, next)}" style="--next-color:${next.color}">
    <span><span class="next-project__eyebrow">NEXT PROJECT — ${nextNum} / ${total}</span><span class="next-project__title">${next.title}</span></span>
    <span class="next-project__arrow" aria-hidden="true">→</span>
  </a>
</main>
${footer(base, { onWhite: true })}
${mobileMenu(base)}
${lightbox()}
${scripts(base)}`;
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
    `<button type="button" data-gallery="eph" data-full="${H.full(it.img)}" data-caption="${esc(it.cap || '')}" aria-label="${esc('Open: ' + (it.cap || 'image'))}">${H.pic(it.img, { alt: it.alt || '', sizes: '(max-width: 639px) 100vw, (max-width: 1023px) 48vw, 31vw' })}</button>`
  ).join('\n');
  const html = `${head(base, { title: 'Ephemera — Yale Miller', description: ephemera.intro })}
${header(base, { current: 'ephemera' })}
<main id="main">
  <section class="eph-intro"><h1>${ephemera.intro}</h1></section>
  <div class="eph-grid">
${items}
  </div>
</main>
${footer(base)}
${mobileMenu(base, 'ephemera')}
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
write('404.html', `${head('/', { title: 'Not found — Yale Miller', description: SITE.description })}
${header('/')}
<main id="main"><section class="hero"><h1 class="hero__h1">Not found.</h1><p class="bio">That page doesn't exist. <a href="/" style="text-decoration:underline">Back to the projects →</a></p></section></main>
${footer('/')}
${mobileMenu('/')}
${scripts('/')}`);
