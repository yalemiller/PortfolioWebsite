# Handoff: yalemiller.com rebuild (replacing Webflow)

## Overview
A static personal portfolio for designer Yale Miller, replacing the current Webflow site so it can be self-hosted (GitHub Pages / Netlify / Vercel — any static host). Two page types: **Home** (hero + project grid) and **Project case study** (Futures Forum 2026 as the reference). Must work well on mobile.

## About the Design Files
`Yale Miller Portfolio.dc.html` (with `support.js`) is a **design reference built in HTML** — a prototype showing intended look and behavior. It is NOT production code to copy. Recreate it as a real static site. Recommended stack: plain HTML + CSS + a few lines of vanilla JS (typewriter), or Astro/Eleventy if a template layer helps for 9 project pages. No frameworks required; keep pages fast and dependency-free.

The reference file contains three mockups. **Build option `1b` (Home) and `1c` (Case study).** Ignore `1a` (a rejected variant). Each option shows a 1200px desktop card and a 390px mobile card side by side.

## Fidelity
**High-fidelity.** Colors, type, spacing, and motion are final. Match them closely; the responsive breakpoint in between desktop and mobile is up to the developer (suggest a 3→2→1 column shift at ~1024px / ~640px).

## Design Tokens
- Ink: `#111111` (text, rules, footer bg). Secondary text: `rgba(0,0,0,.55)`. Hairlines: `rgba(0,0,0,.10–.12)`. Page bg: `#ffffff`.
- No accent color on Home. Case-study hero uses project red `#e4211f` (photo behind, two overlays: `rgba(228,33,31,.88)` multiply + `rgba(228,33,31,.55)` normal). Other projects use their own brand color there (Kroger `#1a8fd6`, 84.51° `#6a3ff0`, Gallo `#2e7d3a`, P&G `#0a4a9e`, BTS `#7a5a2a`, workshops `#d98a1a`, foresight/dark `#1c1c1c`).
- Headings: **Poppins** 700 (600 for card titles), letter-spacing −0.02em. Body/UI: **Open Sans** 400/600. Load from Google Fonts with `display=swap`; self-host if preferred.
- Page gutter: 48px desktop, 20px mobile. Section spacing: 96px between case-study sections (48 mobile).
- Radius: 0 everywhere (square images, square tiles). No shadows.
- Easing for all motion: `cubic-bezier(.2,.7,.2,1)`.

## Screens

### Home (option 1b)
**Header** — flex, space-between, padding 26px 48px, 1px bottom hairline. Left: logo SVG (26px tall) + "YALE MILLER" Poppins 700 20px. Right: nav "PROJECTS · RESUME · LINKEDIN · EPHEMERA", Open Sans 400 15px, gap 30px. Links: inherit color, no underline, hover opacity .6. Mobile: logo 20px, name 16px, nav collapses to a 2-line hamburger (24×2px bars, 6px gap) opening a full-screen menu with the same links stacked in Poppins 600 ~28px.

**Hero** — padding 88px 48px 72px (mobile 44px 20px 40px).
- H1 "I designed…" Poppins 700 72px / 1.05 (mobile 40px).
- Typewriter line: same style as H1, line-height 1.12, max-width 1000px, **fixed height 2.4em with overflow hidden** (mobile 40px, line-height 1.15, height 3.6em) so layout never shifts.
- Bio: Open Sans 600 28px / 1.4, max-width 760px, margin-top 56px (mobile 20px / 1.4, margin-top 36px). Text: "Yale Miller is a designer with a focus on UX/UI, Graphic Design, and Design Research."

**Section rule** — "SELECTED PROJECTS" Poppins 600 14px letter-spacing .08em (mobile 12px), padding-bottom 14px, 1px solid #111 bottom border, inside the gutter.

**Project grid** — 3 columns desktop (`repeat(3, minmax(0,1fr))`), gap 36px row / 24px col, padding 32px 48px 72px. Mobile: 2 columns, gap 24/14, padding 20px 20px 40px. Each card is one `<a>` to the project page:
- Image: aspect 4/3, overflow hidden, background = project color (placeholder until real cover exists). Add `loading="lazy"` and `srcset`.
- Title: Poppins 600 18px / 1.3 (mobile 14px).
- Tagline: Open Sans 13px, rgba(0,0,0,.55) (mobile 11px); tags joined with " · ".
- Bottom rule: 3px #111 bar at the image's bottom edge, `transform: scaleX(0)`, origin left.

**Footer** — background #111, color #fff, padding 40px 48px, flex space-between: "YALE MILLER" Poppins 700 16px left; RESUME · LINKEDIN · EPHEMERA · "© 2026" (rgba(255,255,255,.5)) right, 14px, gap 26px. Mobile: grid, gap 18px, padding 32px 20px.

Projects (order, title, tags):
1. Designing The Experience of The 2026 Futures Forum — Graphic Design, Experiential Design
2. Integrating GenAI into Kroger's Internal Tools — UX/UI Design, User Research
3. Designing an API Creator for Developers with 84.51° — UX/UI Design, User Research
4. 2026 Future Creators Report — Strategic Foresight
5. The Future of Wine with EJ Gallo — Consumer Insights
6. Building a Strategic Plan for the NEXT Innovation Scholars — Strategy
7. Redesigning Iconic Brands for the Modern Consumer with P&G (NDA) — User Research, Graphic Design
8. Preparing for the Future of Consulting in the Age of AI with BTS (NDA) — Strategy
9. Building and Facilitating Design Thinking Workshops — Design Thinking, Workshop Facilitation

### Project case study (option 1c — Futures Forum 2026)
Template for all 9 projects; content per project comes from the existing Webflow pages.
- **Hero**: full-bleed cover photo with the two red overlays above; header sits inside it in white (logo inverted). H1 = the "How might we…" question, Poppins 700 78px / 1.05, max-width 900px (mobile 38px / 1.1). Padding 80px 48px 120px (mobile 56px 20px 64px). Small "01 / 09" counter bottom-right, 13px, letter-spacing .1em, opacity .85 (desktop only).
- **Intro**: 2-col grid `1.4fr 1fr`, gap 64px, padding-top 80px. Left: project title Poppins 700 56px color #2b2b2b, "Overview" label Open Sans 600 14px, body 16px / 1.65. Right: definition list (Type / Date / Team Credit / Role), 2×2 grid, labels 600 14px, values 15px / 1.5, aligned to the overview text (padding-top 84px). Mobile: single column; title 34px; dl becomes a bordered 2×2 block (1px hairlines top/bottom, 20px padding) above the overview.
- **Video**: 16/9 block, margin-top 72px, dark poster image at 60% opacity, white 88px play circle. Load Vimeo iframe (id 1193631683) only on click — never on page load.
- **Text + image rows**: grid `1fr 1.4fr`, gap 64px. H2 Poppins 700 38px / 1.1 (mobile 26px), body 16px / 1.65 (mobile 15px / 1.6). Figure captions 13px rgba(0,0,0,.55), margin-top 10px.
- **Poster row**: 4 columns, gap 16px, aspect 2/3, hover `translateY(-6px)` .3s. Opens a lightbox. Mobile: horizontal scroll-snap carousel, each slide 72% wide, gap 10px, caption "Swipe — …".
- **Sketch gallery**: 3 columns, gap 12px, aspect 4/3 (mobile 3 cols, aspect 1, gap 6px).
- **Tinted section** ("But before the Futures Forum…"): background #f4f3f0, padding 80px 48px, intro Poppins 700 30px / 1.2 max-width 760px, then 2-col image + text.
- **Two-column pair** (SXSW / Undisciplined by Design): 2 equal columns, gap 64px; SXSW has a 3-up square thumbnail grid (gap 10px), podcast a 16/10 image.
- **Showcase**: 3-up 2/3 posters then 4-up squares, gap 12px.
- **Next project**: full-width `<a>`, margin-top 96px, padding 40px 0, 1px #111 top/bottom borders. Eyebrow "NEXT PROJECT — 02 / 09" 13px letter-spacing .1em rgba(0,0,0,.5); title Poppins 700 40px (mobile 24px); "→" Poppins 48px right-aligned. Links to the next project in the list (wraps 09 → 01).
- **Footer**: same as Home but on white with the gutter: 40px 0 padding, flex space-between, 14px.

## Interactions & Behavior
- **Typewriter** (Home): phrases cycle — "an API Builder for 84.51°", "the 2026 Futures Forum", "GenAI tools for Kroger", "the Future Creators Report", "the future of wine with EJ Gallo", "workshops for design thinkers". Type 70ms/char, pause 1800ms at full phrase, delete 35ms/char, 600ms initial delay. **Critical:** render the *entire* phrase at all times with untyped characters `color: transparent`, so line-wrapping is fixed from the first keystroke (no words jumping lines). The container has a fixed height (above). Respect `prefers-reduced-motion`: show the first phrase static.
- **Card hover** (Home, all simultaneously): image `scale(1.05)` .7s; bottom bar `scaleX(1)` .5s; title `translateX(6px)` .4s; arrow "→" after the title fades from opacity 0 → 1 and `translateX(-8px → 0)` .4s; tagline `translateY(-2px)` .4s with .05s delay. All with the shared easing. Apply the same on `:focus-visible` for keyboard users; on touch there is no hover — cards are simply tappable.
- **Nav links** hover: opacity .6, .2s.
- **Poster/gallery lightbox**: click any gallery image → full-screen overlay (rgba(0,0,0,.92)), image `object-fit: contain`, caption below, close on Esc / backdrop click, ←/→ to move within the gallery. Lock body scroll while open.
- **Mobile menu**: hamburger toggles a fixed full-screen white panel; focus trapped; Esc closes.
- **Video**: click poster → replace with Vimeo iframe (autoplay).
- **Images**: `loading="lazy"` below the fold, explicit width/height or `aspect-ratio` to prevent layout shift, WebP/AVIF with JPEG fallback.

## State Management
Minimal, vanilla JS: typewriter index/char position; mobile-menu open; lightbox open + current index; video loaded flag. No data fetching — content is static HTML (or Markdown/JSON if using Astro/Eleventy).

## Responsive Summary
- ≥1200: as specified. 1024–1199: same layout, gutter 40px, hero type ~64px.
- 640–1023: grid 2 columns; case-study 2-col rows stay 2-col; hero 52px.
- <640: mobile spec above (390px card). Hit targets ≥44px. Poster row becomes carousel.

## Assets
- Logo: `logos.svg` from the Webflow CDN (`…/69816bc7b7440a395a6a8802_logos.svg`); invert via CSS on red hero.
- All project imagery currently lives on `cdn.prod.website-files.com/671a9e040208811e722fde7d/…` (URLs are in the reference HTML). **Download everything before the Webflow subscription ends** and serve locally, resized (e.g. 800/1200/1600 widths).
- Missing cover images: Kroger, 84.51°, EJ Gallo, P&G, BTS — placeholders in the reference; source from the existing project pages.
- Fonts: Google Fonts Poppins 400/500/600/700, Open Sans 400/600.
- Resume PDF, LinkedIn URL, Ephemera page: reuse from the current site.

## Screenshots
`screenshots/home-desktop.png`, `home-mobile.png`, `case-study-desktop.png`, `case-study-mobile.png` — captured from the reference file (typewriter shown mid-phrase).

## Files
- `Yale Miller Portfolio.dc.html` — the design reference (options 1b + 1c are the spec; 1a is superseded). Open directly in a browser; `support.js` must sit beside it.
