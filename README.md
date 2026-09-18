# yalemiller.com

Static portfolio site for Yale Miller, rebuilt from the Webflow original so it can be hosted anywhere (GitHub Pages, Netlify, Vercel). Plain HTML + CSS + a small amount of vanilla JavaScript. No runtime dependencies.

The design spec lives in [`docs/handoff/HANDOFF.md`](docs/handoff/HANDOFF.md); the reference prototype is `docs/handoff/Yale Miller Portfolio.dc.html` (open it in a browser with `support.js` beside it).

## Layout

```
index.html                  Home (hero + typewriter + project grid)
projects/<slug>/index.html  Nine case studies (generated)
ephemera/index.html         Ephemera gallery (generated)
<old-webflow-path>/         Redirect stubs so old links keep working (generated)
404.html                    Not-found page (generated)
css/site.css                All styles (design tokens at the top)
js/site.js                  Typewriter, mobile menu, lightbox, click-to-load video/embeds
assets/img/src/             Original images pulled from the Webflow CDN (keep these)
assets/img/                 Generated 800/1200/1600px WebP + JPEG sets + manifest.json
assets/logo/logo.svg        Logo
data/projects.js            All case-study content, in home-grid order
data/ephemera.js            Ephemera image list
build.js                    Page generator
scripts/images.js           Image pipeline (sharp)
```

## Editing content

1. Edit `data/projects.js` (or `data/ephemera.js`). Each project has its title, tags, colour, cover, hero image, the "How might we…" question, the meta list and a `body(H)` function that returns the case-study sections using the helpers `H.pic`, `H.figure`, `H.gallery`, `H.video` and `H.embed`.
2. Drop any new images into `assets/img/src/` and run the image pipeline.
3. Rebuild.

```bash
npm install          # once — installs sharp for the image pipeline
npm run images       # resize new/changed images into assets/img/
npm run build        # regenerate every page
npm run serve        # preview at http://127.0.0.1:8765
```

Committed output (`index.html`, `projects/`, `ephemera/`, the redirect folders and `assets/img/*.{webp,jpg}`) is what gets deployed, so commit after building.

## Deploying

Everything in the repository root is servable as-is. For GitHub Pages: Settings → Pages → deploy from the `main` branch, root folder. Point the `yalemiller.com` DNS at GitHub Pages and add a `CNAME` file containing `yalemiller.com` when the domain moves over.

## Notes

- Fonts load from Google Fonts (Poppins 400–700, Open Sans 400/600) with `display=swap`.
- The Vimeo video, Figma prototypes and Issuu reports only load their iframes on click.
- The P&G and BTS pages are NDA placeholders; the Webflow originals were password-protected.
- The resume link points at the Google Drive file used in the current site header.
