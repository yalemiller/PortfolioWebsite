/* Case-study content blocks -> HTML.
   Every project in data/projects.js lists `blocks`; each has a `type` matching a renderer below.
   renderBlocks(blocks, ctx) with ctx = { H, slug } where H is the image helper set from build.js
   (H.pic for a responsive <picture>, H.full for the largest file's URL).

   Spacing options shared by every block:
     space: 'sm' | 'md' | 'lg' | 'brk'   top spacing other than the default section gap
     rule:  true                         a major break: extra space plus a full-width rule above */
'use strict';

const { esc, rich, vars, fr } = require('./html');

const SIZES = {
  full: '(max-width: 820px) calc(100vw - 40px), calc(100vw - 96px)',
  half: '(max-width: 820px) calc(100vw - 40px), 55vw',
};
const gridSizes = (cols, mcols) => `(max-width: 820px) calc((100vw - 40px) / ${mcols}), calc((100vw - 96px) / ${cols})`;

/* Images can be listed as 'key' or { img: 'key', alt: '…' }. */
const item = (x) => (typeof x === 'string' ? { img: x, alt: '' } : { alt: '', ...x });

/* ---------------- shared pieces ---------------- */
function section(b, inner, cls = '') {
  const space = b.rule ? 'brk' : b.space;
  const classes = ['cs-sec', space && `cs-sec--${space}`, cls].filter(Boolean).join(' ');
  return `<section class="${classes}">${b.rule ? `<div class="cs-ruled">${inner}</div>` : inner}</section>`;
}

const eyebrow = (text) => (text ? `<p class="eyebrow">${esc(text)}</p>` : '');
const h2 = (text, cls = '') => (text ? `<h2 class="cs-h2${cls}">${esc(text)}</h2>` : '');
const paras = (ps = []) => ps.map((p) => `<p class="cs-body">${rich(p)}</p>`).join('');
const rules = (list, cls = '') => (list && list.length
  ? `<ul class="cs-rules${cls}">${list.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>`
  : '');
const caption = (text) => (text ? `<p class="cs-cap">${esc(text)}</p>` : '');

/* Heading row above a gallery or card grid: eyebrow + H2 left, paragraphs right. */
function headRow(b) {
  if (!b.h) return '';
  return `<div class="cs-head"><div>${eyebrow(b.eyebrow)}${h2(b.h)}</div><div class="cs-stack">${paras(b.p)}</div></div>`;
}

/* Ruled label row ("THE ENHANCED GAMES"). */
const labelRow = (text) => (text ? `<div class="cs-label"><span>${esc(text)}</span></div>` : '');

/* Image grid; each image opens in the lightbox. */
function imageGrid(b, ctx, group) {
  const cols = b.cols || 3, mcols = b.mcols || 2;
  const cropped = b.ratio && b.ratio !== 'auto';
  const style = vars({
    '--g-cols': cols, '--g-mcols': mcols,
    '--g-ratio': cropped ? b.ratio : undefined, '--g-mratio': b.mratio,
    '--g-fit': b.fit, '--g-gap': b.gap && `${b.gap}px`, '--g-mgap': b.mgap && `${b.mgap}px`,
  });
  const items = b.imgs.map(item).map((it) => `<button type="button" class="cs-gallery__item" data-gallery="${group}" data-full="${ctx.H.full(it.img)}" data-caption="${esc(it.alt)}" aria-label="${esc(it.alt ? `Open image: ${it.alt}` : 'Open image')}">${ctx.H.pic(it.img, { alt: it.alt, sizes: gridSizes(cols, mcols) })}</button>`).join('');
  return `<div class="cs-gallery${cropped ? ' is-cropped' : ''}"${style}>${items}</div>`;
}

/* Crossfading slideshow with pill dots. js/site.js advances it every 4.5s. */
function carousel(imgs, ctx, { ratio = '16/9', fit = 'cover', label = 'Slideshow' } = {}) {
  const n = imgs.length;
  const slides = imgs.map(item).map((it, i) => `<div class="carousel__slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}"${i ? ' aria-hidden="true"' : ''}>${ctx.H.pic(it.img, { alt: it.alt, sizes: SIZES.half })}</div>`).join('');
  const dots = imgs.map((_, i) => `<button type="button" class="carousel__dot" aria-label="Show slide ${i + 1} of ${n}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('');
  return `<div class="carousel${fit === 'contain' ? ' carousel--contain' : ''}" data-carousel role="group" aria-roledescription="carousel" aria-label="${esc(label)}">
  <div class="carousel__frame" style="aspect-ratio:${esc(ratio)}">${slides}</div>
  <div class="carousel__dots">${dots}</div>
</div>`;
}

/* Click-to-load iframe: nothing is fetched from the embed host until the button is pressed. */
function embedFrame(e) {
  return `<div class="embed" data-embed="${esc(e.url)}" data-embed-title="${esc(e.label || e.title || 'Embedded content')}" style="aspect-ratio:${esc(e.ratio || '16/9')}">
  <button type="button" class="embed__idle"><span class="embed__play" aria-hidden="true"></span><span class="embed__cta">${esc(e.cta)}</span></button>
</div>`;
}

function reportFrame(r) {
  const inner = `<span class="embed__title">${esc(r.title)}</span>`;
  if (!r.url) {
    return `<div class="cs-embed"><div class="embed" style="aspect-ratio:17/11"><div class="embed__idle embed__idle--report">${inner}<span class="embed__btn is-soon">COMING SOON</span></div></div></div>`;
  }
  return `<div class="cs-embed"><div class="embed" data-embed="${esc(r.url)}" data-embed-title="${esc(r.title)}" style="aspect-ratio:17/11"><button type="button" class="embed__idle embed__idle--report">${inner}<span class="embed__btn">${esc(r.cta || 'READ THE REPORT')}</span></button></div>${caption(r.label || 'Loads on click.')}</div>`;
}

/* ---------------- block renderers ---------------- */
const R = {
  /* Heading left; paragraphs and an optional ruled list right. */
  text(b) {
    return section(b, `<div class="cs-split"><div>${eyebrow(b.eyebrow)}${h2(b.h)}</div><div class="cs-stack">${paras(b.p)}${rules(b.bullets, ' cs-rules--top')}</div></div>`);
  },

  /* Text beside an image. flip puts the image first; cols/gap/align/imgMax/ratio fine-tune the layout. */
  textImage(b, ctx) {
    if (!b.img) return R.text(b, ctx); // e.g. an illustration that hasn't been supplied yet
    const style = vars({ '--ti-cols': fr(b.cols), '--ti-gap': b.gap && `${b.gap}px`, '--ti-align': b.align, '--img-max': b.imgMax, '--ratio': b.ratio });
    const fig = `<figure class="cs-ti__fig${b.ratio ? ' is-cropped' : ''}">${ctx.H.pic(b.img, { alt: b.alt || '', sizes: SIZES.half })}${b.caption ? `<figcaption class="cs-cap">${esc(b.caption)}</figcaption>` : ''}</figure>`;
    return section(b, `<div class="cs-ti${b.flip ? ' cs-ti--flip' : ''}"${style}><div class="cs-stack">${h2(b.h, ' cs-h2--tight')}${paras(b.p)}${rules(b.bullets)}</div>${fig}</div>`);
  },

  /* Pull quote: the lead-in in the project tint, the rest in ink. */
  quote(b) {
    return section(b, `<div class="cs-quote${b.size === 'md' ? ' cs-quote--md' : ''}"><p class="cs-quote__text">${rich(b.q)}${b.em ? ` <span>${rich(b.em)}</span>` : ''}</p>${b.foot ? `<p class="cs-cap cs-quote__foot">${esc(b.foot)}</p>` : ''}</div>`);
  },

  gallery(b, ctx) {
    return section(b, `${labelRow(b.label)}${headRow(b)}${imageGrid(b, ctx, `${ctx.slug}-${ctx.index}`)}${caption(b.caption)}`);
  },

  /* Ruled cards: optional tinted icon, label, big stat, H3, paragraph and label/text rows. */
  cards(b, ctx) {
    const cols = b.cols || 3;
    const mcols = b.items[0].big && cols >= 3 ? 2 : 1;
    const cards = b.items.map((c) => {
      const icon = c.icon ? `<span class="cs-card__icon" aria-hidden="true" style="-webkit-mask-image:url('${ctx.H.full(c.icon)}');mask-image:url('${ctx.H.full(c.icon)}')"></span>` : '';
      const stat = c.big ? `<p class="cs-stat">${esc(c.big)}${c.sub ? `<span>${esc(c.sub)}</span>` : ''}</p>` : '';
      const rows = (c.rows || []).map((r) => `<div><p class="eyebrow cs-card__row-label">${esc(r.l)}</p><p class="cs-body">${rich(r.t)}</p></div>`).join('');
      return `<div class="cs-card">${icon}${eyebrow(c.label)}${stat}${c.h ? `<h3 class="cs-h3">${esc(c.h)}</h3>` : ''}${c.p ? `<p class="cs-body">${rich(c.p)}</p>` : ''}${rows}</div>`;
    }).join('');
    return section(b, `${headRow(b)}<div class="cs-cards"${vars({ '--c-cols': cols, '--c-mcols': mcols })}>${cards}</div>`);
  },

  embed(b) {
    const items = b.items.map((e) => `<div class="cs-embed">${embedFrame(e)}${caption(e.label)}</div>`).join('');
    return section(b, `<div class="cs-embeds"${vars({ '--e-cols': b.items.length })}>${items}</div>`);
  },

  /* Text and a ruled meta list beside an auto-advancing slideshow. */
  carousel(b, ctx) {
    return section(b, `<div class="cs-ti"><div class="cs-stack">${h2(b.h, ' cs-h2--tight')}${rules(b.bullets, ' cs-rules--top cs-rules--small')}${paras(b.p)}</div>${carousel(b.imgs, ctx, { ratio: b.ratio, label: b.h })}</div>`);
  },

  /* Text beside a short fiction piece that expands in place. */
  story(b, ctx) {
    const shown = b.story.slice(0, 3), more = b.story.slice(3);
    const id = `${ctx.slug}-story-${ctx.index}`;
    const p = (x) => `<p class="story__p">${rich(x)}</p>`;
    const rest = more.length
      ? `<div class="story__more" id="${id}">${more.map(p).join('')}</div><button type="button" class="story__toggle" aria-expanded="false" aria-controls="${id}" data-label-open="COLLAPSE STORY ↑" data-label-closed="READ THE FULL STORY ↓">READ THE FULL STORY ↓</button>`
      : '';
    return section(b, `<div class="cs-split"><div class="cs-stack">${h2(b.h, ' cs-h2--tight')}${paras(b.p)}</div><div class="story" data-story><p class="eyebrow">ARTIFACT FROM THE FUTURE</p><p class="story__title">${esc(b.storyTitle)}</p>${shown.map(p).join('')}${rest}</div></div>`);
  },

  /* Poster video that swaps in the player on click. */
  video(b, ctx) {
    return section({ space: 'lg', ...b }, `<div class="cs-video" data-video="${esc(b.provider)}" data-video-id="${esc(b.id)}" data-video-title="${esc(b.title)}">
  ${ctx.H.pic(b.poster, { alt: '', cls: 'cs-video__poster', sizes: SIZES.full })}
  <button type="button" class="cs-video__btn" aria-label="${esc(`Play video: ${b.title}`)}"><span class="cs-video__play"></span>${b.label ? `<span class="cs-video__label">${esc(b.label)}</span>` : ''}</button>
</div>`);
  },

  /* Year tabs over either poster slideshows (kind: 'carousel') or report embeds (kind: 'report'). */
  tabs(b, ctx) {
    const id = `${ctx.slug}-tabs-${ctx.index}`;
    const tabs = b.panels.map((p, i) => `<button type="button" role="tab" class="tabs__tab" id="${id}-tab-${i}" aria-controls="${id}-panel-${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${esc(p.tab)}</button>`).join('');
    const panel = (p) => {
      if (b.kind === 'report') return reportFrame(p);
      if (!p.imgs || !p.imgs.length) return `<div class="placeholder" style="aspect-ratio:${esc(p.ratio || '16/9')}">${esc(p.empty || 'COMING SOON')}</div>`;
      return carousel(p.imgs, ctx, { ratio: p.ratio, fit: p.fit, label: `${b.label} ${p.tab}` });
    };
    const panels = b.panels.map((p, i) => `<div role="tabpanel" class="tabs__panel" id="${id}-panel-${i}" aria-labelledby="${id}-tab-${i}"${i ? ' hidden' : ''}>${panel(p)}</div>`).join('');
    return section(b, `<div data-tabs><div class="cs-label cs-label--tabs"><span>${esc(b.label)}</span><div role="tablist" class="tabs" aria-label="${esc(b.label)}">${tabs}</div></div>${panels}</div>`);
  },

  /* Heading and text beside an image grid, with an optional full-width image after. */
  textGrid(b, ctx) {
    const after = b.after ? `<figure class="cs-tg__after">${ctx.H.pic(b.after.img, { alt: b.after.alt || '', sizes: SIZES.full })}</figure>` : '';
    return section(b, `<div class="cs-tg"${vars({ '--tg-cols': fr(b.split) })}><div>${h2(b.h)}${paras(b.p)}</div>${imageGrid(b, ctx, `${ctx.slug}-${ctx.index}`)}</div>${after}`);
  },

  /* Lead-in line, then a ruled two-column grid of image and text cells. */
  pairs(b, ctx) {
    const cells = b.cells.map((c) => (c.img
      ? `<figure>${ctx.H.pic(c.img, { alt: c.alt || '', sizes: SIZES.half })}</figure>`
      : `<div class="cs-stack">${h2(c.h, ' cs-h2--tight')}${paras(c.p)}</div>`)).join('');
    return section(b, `${b.lead ? `<p class="cs-lead">${rich(b.lead)}</p>` : ''}<div class="cs-pairs cs-ruled">${cells}</div>`);
  },
};

function renderBlocks(blocks, ctx) {
  return (blocks || []).map((b, index) => {
    const render = R[b.type];
    if (!render) throw new Error(`${ctx.slug}: unknown block type "${b.type}"`);
    return render(b, { ...ctx, index });
  }).join('\n');
}

module.exports = renderBlocks;
module.exports.types = Object.keys(R);
