'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const renderBlocks = require('../lib/blocks');
const { esc, rich, vars, fr } = require('../lib/html');

/* Stand-in for build.js's image helpers: records which image was asked for. */
const H = {
  pic: (img, o = {}) => `<img data-img="${img}" alt="${esc(o.alt || '')}"${o.cls ? ` class="${o.cls}"` : ''}>`,
  full: (img) => `full/${img}`,
};
const render = (block) => renderBlocks([block], { H, slug: 'demo' });

test('html helpers escape text and keep *emphasis*', () => {
  assert.equal(esc('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
  assert.equal(rich('thrive in *any* future <b>'), 'thrive in <em>any</em> future &lt;b&gt;');
  assert.equal(rich('*Real quote from user research'), '*Real quote from user research');
  assert.equal(vars({ '--a': 1, '--b': undefined, '--c': '' }), ' style="--a:1"');
  assert.equal(fr('1fr 1.6fr'), 'minmax(0,1fr) minmax(0,1.6fr)');
});

test('every block type renders', () => {
  const samples = {
    text: { h: 'Heading', p: ['One'], bullets: ['A'] },
    textImage: { h: 'Heading', p: ['One'], img: 'x' },
    quote: { q: 'Lead.', em: 'Rest.' },
    gallery: { imgs: ['a', 'b'] },
    cards: { items: [{ h: 'Card' }] },
    embed: { items: [{ url: 'https://example.com/e', label: 'Label' }] },
    carousel: { h: 'Heading', imgs: ['a', 'b'] },
    story: { h: 'Heading', storyTitle: 'Title', story: ['1', '2', '3', '4'] },
    video: { provider: 'vimeo', id: '1', poster: 'p', title: 'Video' },
    tabs: { kind: 'carousel', label: 'L', panels: [{ tab: '2026', imgs: ['a'] }] },
    textGrid: { h: 'Heading', imgs: ['a'] },
    pairs: { cells: [{ img: 'a' }, { h: 'Heading', p: ['One'] }] },
  };
  assert.deepEqual(Object.keys(samples).sort(), [...renderBlocks.types].sort(), 'a sample for every renderer');
  for (const [type, b] of Object.entries(samples)) {
    assert.match(render({ type, ...b }), /^<section class="cs-sec/, type);
  }
});

test('unknown block types fail the build', () => {
  assert.throws(() => render({ type: 'nope' }), /demo: unknown block type "nope"/);
});

test('text is escaped', () => {
  const html = render({ type: 'text', h: '<script>', p: ['P&G <b>'] });
  assert.ok(!html.includes('<script>'));
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /P&amp;G &lt;b&gt;/);
});

test('textImage without an image falls back to the text layout', () => {
  const html = render({ type: 'textImage', h: 'So what even is an API…?', p: ['One'] });
  assert.match(html, /cs-split/);
  assert.doesNotMatch(html, /cs-ti/);
});

test('textImage layout options become custom properties', () => {
  const html = render({ type: 'textImage', h: 'H', img: 'x', flip: true, cols: '1fr 1.4fr', gap: 56, imgMax: '400px', ratio: '3/2', caption: 'Cap' });
  assert.match(html, /cs-ti cs-ti--flip/);
  assert.match(html, /--ti-cols:minmax\(0,1fr\) minmax\(0,1.4fr\);--ti-gap:56px;--img-max:400px;--ratio:3\/2/);
  assert.match(html, /cs-ti__fig is-cropped/);
  assert.match(html, /<figcaption class="cs-cap">Cap<\/figcaption>/);
});

test('rule and space options set the section spacing', () => {
  assert.match(render({ type: 'text', h: 'H', rule: true }), /^<section class="cs-sec cs-sec--brk"><div class="cs-ruled">/);
  assert.match(render({ type: 'text', h: 'H', space: 'sm' }), /^<section class="cs-sec cs-sec--sm">/);
  assert.match(render({ type: 'video', provider: 'vimeo', id: '1', poster: 'p', title: 'V' }), /cs-sec--lg/);
});

test('gallery items open in one lightbox group per block', () => {
  const html = renderBlocks([{ type: 'quote', q: 'Q' }, { type: 'gallery', imgs: ['a', { img: 'b', alt: 'B' }], ratio: '4/3' }], { H, slug: 'demo' });
  assert.equal((html.match(/data-gallery="demo-1"/g) || []).length, 2);
  assert.match(html, /data-full="full\/b" data-caption="B"/);
  assert.match(html, /cs-gallery is-cropped/);
  assert.doesNotMatch(render({ type: 'gallery', imgs: ['a'], ratio: 'auto' }), /is-cropped/);
});

test('stat cards keep two columns on phones; text cards stack', () => {
  assert.match(render({ type: 'cards', cols: 4, items: [{ big: '5/6' }] }), /--c-cols:4;--c-mcols:2/);
  assert.match(render({ type: 'cards', cols: 3, items: [{ h: 'Fractured' }] }), /--c-cols:3;--c-mcols:1/);
  assert.match(render({ type: 'cards', cols: 2, items: [{ big: '100%' }] }), /--c-mcols:1/);
});

test('card icons are tinted masks', () => {
  const html = render({ type: 'cards', items: [{ icon: 'logo', h: 'H' }] });
  assert.match(html, /mask-image:url\('full\/logo'\)/);
});

test('embeds are lazy iframes sized like the host embed code', () => {
  const html = render({ type: 'embed', items: [
    { url: 'https://embed.figma.com/proto/x?a=1&b=2', label: 'Kroger', ratio: '3/2', maxWidth: '1200px', border: true },
    { url: 'https://embed.figma.com/proto/y', label: 'Polaris', height: 650 },
    { url: 'https://e.issuu.com/embed.html?d=r', label: 'Report', ratio: '1/1', minHeight: 326, link: 'https://issuu.com/r' },
  ] });
  assert.equal((html.match(/<iframe [^>]*loading="lazy"/g) || []).length, 3);
  assert.match(html, /class="embed embed--border" style="aspect-ratio:3\/2;max-width:1200px"><iframe src="https:\/\/embed.figma.com\/proto\/x\?a=1&amp;b=2" title="Kroger"/);
  assert.match(html, /class="embed embed--fixed" style="--e-h:650px">/);
  assert.match(html, /style="aspect-ratio:1\/1;min-height:326px"/);
  assert.match(html, /--e-cols:3/);
  // Issuu's own embed code sandboxes the frame; Figma's doesn't.
  assert.equal((html.match(/sandbox="allow-top-navigation /g) || []).length, 1);
  assert.match(html, /Report <a href="https:\/\/issuu.com\/r" target="_blank" rel="noopener">Open in a new tab/);
});

test('image cards lead with a linked square image and end with the link', () => {
  const html = render({ type: 'cards', items: [{ img: 'pantene', alt: 'Pantene', h: 'Pantene', p: 'Text', link: { href: 'https://example.com/deck', text: 'VIEW' } }] });
  assert.match(html, /class="cs-card cs-card--media"><a class="cs-card__media" href="https:\/\/example.com\/deck"[^>]*tabindex="-1" aria-hidden="true"><img data-img="pantene"/);
  assert.match(html, /<a class="cs-card__link" href="https:\/\/example.com\/deck" target="_blank" rel="noopener">VIEW <span aria-hidden="true">↗<\/span><\/a><\/div>/);
  assert.match(render({ type: 'cards', items: [{ img: 'a', h: 'No link' }] }), /<div class="cs-card__media">/);
});

test('carousel starts on the first slide', () => {
  const html = render({ type: 'carousel', h: 'H', imgs: ['a', 'b', 'c'] });
  assert.equal((html.match(/carousel__slide is-active/g) || []).length, 1);
  assert.equal((html.match(/class="carousel__dot"/g) || []).length, 3);
  assert.match(html, /aria-label="Show slide 1 of 3" aria-current="true"/);
});

test('story shows three paragraphs and folds the rest', () => {
  const html = render({ type: 'story', h: 'H', storyTitle: 'You-logy', story: ['1', '2', '3', '4', '5'] });
  const [shown, folded] = html.split('story__more');
  assert.equal((shown.match(/story__p/g) || []).length, 3);
  assert.equal((folded.match(/story__p/g) || []).length, 2);
  assert.match(html, /aria-expanded="false"/);
  assert.doesNotMatch(render({ type: 'story', h: 'H', storyTitle: 'T', story: ['1', '2'] }), /story__toggle/);
});

test('tabs: first panel visible, empty poster sets and missing report URLs get placeholders', () => {
  const posters = render({ type: 'tabs', kind: 'carousel', label: 'THE POSTER SERIES', panels: [{ tab: '2026', imgs: ['a'] }, { tab: '2025', imgs: [], empty: '2025 POSTERS — COMING SOON' }] });
  assert.match(posters, /aria-selected="true">2026/);
  assert.match(posters, /id="demo-tabs-0-panel-1" aria-labelledby="demo-tabs-0-tab-1" hidden/);
  assert.match(posters, /class="placeholder"[^>]*>2025 POSTERS — COMING SOON/);

  const reports = render({ type: 'tabs', kind: 'report', label: 'THE REPORTS', panels: [{ tab: '2026', title: '2026 Report', url: 'https://example.com/r' }, { tab: '2025', title: '2025 Report', url: '' }] });
  assert.equal((reports.match(/data-embed=/g) || []).length, 1);
  assert.match(reports, /COMING SOON/);
});
