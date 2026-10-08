'use strict';

module.exports = function buildScrollFeed({ feed, H, head, header, footer, lightbox, scripts, write }) {
  const base = '../';
  const esc = H.esc;
  const required = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) throw new Error('Scroll feed: missing ' + label);
    return value;
  };
  const href = (value) => {
    required(value, 'URL');
    if (/^https:\/\//i.test(value)) { new URL(value); return value; }
    if (/^(?:\/\/|[a-z][a-z0-9+.-]*:)/i.test(value) || /[\\\s]/.test(value)) {
      throw new Error('Scroll feed: use an HTTPS URL or local path: ' + value);
    }
    return base + value.replace(/^\//, '');
  };
  const link = (url, label) => `<a href="${esc(href(url))}"${/^https:\/\//i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(label)} <span aria-hidden="true">↗</span></a>`;
  const text = (value) => esc(value).replace(/\n/g, '<br>');
  const cards = feed.items.map((p, i) => {
    let media;
    switch (p.type) {
      case 'image':
        required(p.alt, 'image alt text');
        media = p.img ? H.figure(p.img, { alt: p.alt, sizes: '(max-width: 639px) calc(100vw - 40px), 760px' })
          : `<figure><img src="${esc(href(required(p.src, 'image src')))}" alt="${esc(p.alt)}" loading="lazy" decoding="async"></figure>`;
        break;
      case 'quote':
        media = `<blockquote><p>${text(required(p.text, 'quote text'))}</p></blockquote>`;
        break;
      case 'video':
        required(p.title, 'video title');
        if (p.src) {
          media = `<video controls playsinline preload="none" aria-label="${esc(p.title)}"${p.poster ? ` poster="${H.full(p.poster)}"` : ''}><source src="${esc(href(p.src))}">Your browser cannot play this video. ${link(p.src, 'Open video')}</video>`;
        } else {
          if (!['youtube', 'vimeo'].includes(p.provider) || !(p.provider === 'vimeo' ? /^\d+$/ : /^[\w-]{11}$/).test(p.id)) {
            throw new Error('Scroll feed: invalid video provider or ID');
          }
          media = `<div class="cs-video" data-video="${p.provider}" data-video-id="${esc(p.id)}" data-video-title="${esc(p.title)}">
            ${p.poster ? H.pic(p.poster, { alt: '', cls: 'cs-video__poster', sizes: '(max-width: 639px) calc(100vw - 40px), 760px' }) : ''}
            <button type="button" class="cs-video__btn" aria-label="${esc('Play video: ' + p.title)}"><span class="cs-video__play"></span></button>
          </div><noscript><p>${link(p.url || (p.provider === 'youtube' ? 'https://www.youtube.com/watch?v=' + p.id : 'https://vimeo.com/' + p.id), 'Watch video')}</p></noscript>`;
        }
        break;
      case 'text': media = `<p class="scroll-post__text">${text(required(p.text, 'post text'))}</p>`; break;
      case 'link':
        media = `<div class="scroll-post__link"><h2>${link(p.url, required(p.title, 'link title'))}</h2>${p.text ? `<p>${text(p.text)}</p>` : ''}</div>`;
        break;
      default: throw new Error('Scroll feed: unknown post type ' + p.type);
    }
    if (p.date && (!/^\d{4}-\d{2}-\d{2}$/.test(p.date) || isNaN(Date.parse(p.date)) || new Date(p.date).toISOString().slice(0, 10) !== p.date)) {
      throw new Error('Scroll feed: use a valid YYYY-MM-DD date');
    }
    const date = p.date ? `<time datetime="${p.date}">${new Date(p.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>` : '';
    return `<li class="scroll-post scroll-post--${p.type}"><article aria-labelledby="scroll-post-${i}">
      <div class="scroll-post__meta"><span>${esc(p.type)}</span>${date}${p.demo ? '<span class="scroll-post__demo">Example post</span>' : ''}</div>
      <div class="scroll-post__body">${p.type !== 'link' ? `<h2 id="scroll-post-${i}" class="${['image', 'quote'].includes(p.type) ? 'visually-hidden' : 'scroll-post__title'}">${esc(p.title || 'A saved ' + p.type)}</h2>` : `<span id="scroll-post-${i}" class="visually-hidden">${esc(p.title)}</span>`}
        ${media}
        ${p.credit || p.url && p.type !== 'link' ? `<p class="scroll-post__credit">${p.url && p.type !== 'link' ? link(p.url, p.credit || 'Original source') : esc(p.credit)}</p>` : ''}
        ${p.note ? `<p class="scroll-post__note">${text(p.note)}</p>` : ''}
      </div>
    </article></li>`;
  }).join('\n');
  write('scroll-like-me/index.html', `${head(base, { title: 'Scroll Like Me — Yale Miller', description: feed.intro })}
${header(base, { current: 'scroll' })}
<main id="main" class="scroll-page">
  <section class="scroll-intro"><p class="scroll-eyebrow">A PERSONAL FEED</p><h1>Scroll<br>like me<span aria-hidden="true">.</span></h1><p class="scroll-intro__description">${esc(feed.intro)}</p><a class="scroll-intro__start" href="#feed">Take a scroll <span aria-hidden="true">↓</span></a></section>
  ${feed.items.some(p => p.demo) ? '<p class="scroll-preview-note">A first look. Posts marked “Example post” demonstrate the layout; personal selections are still to come.</p>' : ''}
  <div class="section-rule" id="feed"><span class="section-rule__label">THE FEED</span><span class="scroll-count">${feed.items.length} ${feed.items.length === 1 ? 'post' : 'posts'}</span></div>
  ${feed.items.length ? `<ol class="scroll-feed">${cards}</ol><p class="scroll-end">You’re all caught up.<br><a href="#main">Back to the top ↑</a></p>` : '<p class="scroll-end">The first selections are on their way.</p>'}
</main>
${footer(base)}
${lightbox()}
${scripts(base)}`);
};
