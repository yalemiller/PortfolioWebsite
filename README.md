# yalemiller.com

Static portfolio site for Yale Miller, rebuilt from the Webflow original so it can be hosted anywhere (GitHub Pages, Netlify, Vercel). Plain HTML + CSS + a small amount of vanilla JavaScript. No runtime dependencies.

The current design spec is [`docs/handoff-v2/README.md`](docs/handoff-v2/README.md) (tokens, type scale, every screen and interaction). The reference prototypes are in `docs/handoff-v2/design/`; they need the handoff's `assets/` folder beside them to show images, which isn't duplicated here. The original spec is in `docs/handoff/`.

## Layout

```
index.html                  Home (hero + typewriter + project grid)
projects/<slug>/index.html  Nine case studies (generated)
ephemera/index.html         Ephemera gallery (generated)
scroll-like-me/index.html   Curated flowing feed (generated)
<old-webflow-path>/         Redirect stubs so old links keep working (generated)
404.html                    Not-found page (generated)
css/site.css                All styles (design tokens at the top)
js/site.js                  Typewriter, phone menu, lightbox, embeds, carousels, tabs, story toggle
assets/img/src/             Original images (keep these)
assets/img/                 Generated 800/1200/1600px WebP + JPEG sets + manifest.json
assets/logo/logo.svg        Logo
data/projects.js            All case-study content, in "NN / 09" order
data/ephemera.js            Ephemera image list
data/scroll-feed.js         Scroll Like Me selections, newest first
build.js                    Page generator: page chrome, home, case studies, ephemera
lib/blocks.js               Case-study content blocks -> HTML
lib/html.js                 Escaping and small HTML helpers
scripts/images.js           Image pipeline (sharp)
test/                       node --test suites
```

## Editing content

1. Edit `data/projects.js` (or `data/ephemera.js`). Each project has its title, tags, tint, card cover, hero image, the hero question, the key facts, an overview and a list of `blocks`. The comment at the top of `data/projects.js` lists the fields; the block types (`text`, `textImage`, `quote`, `gallery`, `cards`, `embed`, `carousel`, `story`, `video`, `tabs`, `textGrid`, `pairs`) and their options are documented in `lib/blocks.js`. Text is plain; wrap a phrase in `*asterisks*` for italics.
2. Drop any new images into `assets/img/src/` and run the image pipeline. Refer to images by file name without the extension.
3. Rebuild, then run the tests.

```bash
npm install          # once — installs sharp for the image pipeline
npm run images       # resize new/changed images into assets/img/
npm run build        # regenerate every page
npm test             # block rendering and content/manifest checks
npm run serve        # preview at http://127.0.0.1:8765
```

Still to supply (each has a placeholder): the 2025 Futures Forum posters and the 2026/2025 report embed URLs (the `tabs` blocks in the Futures Forum entry).

Embeds (`embed` blocks) are ordinary iframes with `loading="lazy"`, sized like each host's own embed code: `ratio`, or a fixed desktop `height`, plus optional `minHeight`, `maxWidth` and `border`. Extra attributes a host needs (Issuu's `sandbox`/`allow`) are set by hostname in `lib/blocks.js`. A Google Drive file embeds with its `/preview` URL.

Committed output (`index.html`, `projects/`, `ephemera/`, the redirect folders and `assets/img/*.{webp,jpg}`) is what gets deployed, so commit after building.

## Updating Scroll Like Me

Edit `data/scroll-feed.js`, then run `npm run build`. Put new items at the top of
the `items` array; the feed preserves your order. Each post can include `note`
(your commentary), `credit` (creator/source), `url` (original source), and `date`
(`YYYY-MM-DD`). Remove `demo: true` when replacing a starter example with a real
selection. The preview notice disappears when there are no example posts left.

Supported posts:

```js
// Image: a manifest key from assets/img/manifest.json, or a local/HTTPS src.
{ type: 'image', title: 'A detail I noticed', src: 'assets/feed/photo.jpg',
  alt: 'Describe the image', credit: 'Creator name',
  url: 'https://example.com/original', note: 'Why I saved it.' },

{ type: 'quote', text: 'Your selected quote.', credit: 'Author name',
  url: 'https://example.com/source', note: 'What stuck with me.' },

// YouTube: the 11-character video ID; Vimeo: the numeric ID.
// Optional poster: a key from assets/img/manifest.json.
{ type: 'video', title: 'Video title', provider: 'youtube', id: 'VIDEO_ID_11',
  credit: 'Creator name', url: 'https://www.youtube.com/watch?v=VIDEO_ID_11' },

// A local video file also works, with native player controls.
{ type: 'video', title: 'My clip', src: 'assets/feed/clip.mp4' },

{ type: 'link', title: 'Something worth reading', url: 'https://example.com',
  text: 'A brief description.', note: 'Why I recommend it.' },

{ type: 'text', title: 'A thought', text: 'Your short observation.' },
```

Use HTTPS for external URLs. Local paths are relative to the site root. For
local images or video, create `assets/feed/` and add the files there. The `img`
and `poster` options reuse the existing optimized-image pipeline. Videos load
when clicked, with no autoplay on page load. You can link to songs or social
posts using the link format. Feed text is plain text, not HTML.

## Deploying

Everything in the repository root is servable as-is. The site is served by GitHub Pages from the `main` branch, root folder, at `www.yalemiller.com` (set by the `CNAME` file; `.nojekyll` makes Pages serve the files as committed). DNS is at Namecheap: four A records on `@` for `185.199.108.153`–`185.199.111.153` and a CNAME `www` → `yalemiller.github.io`. Pushing to `main` redeploys within a minute or two.

## Notes

- Fonts load from Google Fonts (Poppins 400–700, Open Sans 400/600) with `display=swap`.
- The Futures Forum video and report frames load their iframes on click; the Figma, Issuu and Drive embeds load lazily as they scroll into view.
- Sizes interpolate between the 390px and 1200px designs; multi-column layouts collapse at 820px. Content stops widening at 1440px.
- Carousels advance every 4.5s and the home typewriter animates, except under `prefers-reduced-motion`.
- The resume link is the Google Drive file from the design handoff (`YaleMiller_Resume.pdf`).
