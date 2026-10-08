# Handoff: yalemiller.com Portfolio Rebuild

## Overview
A full rebuild of Yale Miller's design portfolio (currently on Webflow at yalemiller.com). It covers the home page, a reusable case-study template that drives seven project pages, a custom Futures Forum page, and an Ephemera page. Every image is a local asset; nothing loads from the Webflow CDN.

## About the Design Files
The `.dc.html` files in `design/` are **design references built in HTML**. They are prototypes that show the intended look and behaviour. They are **not production code to copy directly**. Each one opens in a browser with `support.js` alongside it, and shows a desktop (1200px) and a mobile (390px) render side by side on a grey canvas. The canvas chrome (`.dv-turn`, `.dv-opt`, `.dv-card`, the grey background) is presentation scaffolding only. Do not ship it.

**Task:** recreate these pages in a real web stack. No codebase exists yet, so pick a fitting one. **Recommended: Astro or Next.js (static export)** with plain CSS or CSS Modules. The site is static content with light interactivity, and should deploy to Netlify, Vercel, or GitHub Pages. Port the template HTML and inline styles into components with real stylesheets and responsive breakpoints, not two fixed widths.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy, and interactions are final. Recreate them pixel-accurately at 1200px and 390px, and interpolate fluidly between them. A good breakpoint is roughly 820px, where 2- and 3-column grids collapse to 1 or 2 columns.

---

## Design Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| ink | `#111111` | Text, rules, buttons, footer bg |
| paper | `#FFFFFF` | Page bg |
| muted text | `rgba(0,0,0,.55)` | Eyebrows, captions, fact labels |
| hairline | `rgba(0,0,0,.12)` | List dividers |
| panel | `#F4F3F0` | Image placeholder bg |
| embed bg | `#1C1C1C` | Click-to-load embed frames |

**Per-project accent ("tint").** It's used for the hero overlay (86% opacity over a grayscale photo), quote lead-ins, stat numbers, and card icons.
| Project | Key | Hex |
|---|---|---|
| Futures Forum | futures-forum | `#E4211F` |
| Kroger | kroger | `#2861C2` |
| Polaris / 84.51° | polaris | `#6A3FF0` |
| Future Creators Report | fcr | `#E8641E` |
| EJ Gallo | gallo | `#2E7D3A` |
| NEXT New Deal | next | `#E4211F` |
| P&G (NDA) | pg | `#0A4A9E` |
| BTS (NDA) | bts | `#7A5A2A` |
| Workshops | workshops | `#D98A1A` |

### Typography
- **Poppins** (Google Fonts, weights 400/500/600/700): all headlines, titles, eyebrow section labels, logo wordmark.
- **Open Sans** (400/600): body copy, facts, nav, captions.
- Headline letter-spacing is `-.02em`. Eyebrow labels are UPPERCASE, `letter-spacing:.08em`, weight 600.

| Role | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| Hero H1 (question) | 72px | 34px | 700 | 1.06 |
| Home "I designed…" | 72px | 40px | 700 | 1.05 / 1.12 |
| Project title (H2 under hero) | 44px | 28px | 700 | 1.2 |
| Section H2 | 36px | 26px | 700 | 1.1 |
| Pull quote | 60px (48px on Futures Forum) | 32px (28px) | 700 | 1.15 |
| Stat number | 88px | 56px | 700 | 1 |
| Card H3 | 22px | 19px | 600 | 1.25 |
| Body | 17px | 16px | 400 | 1.65 |
| Lead / overview | 18px | 16px | 400 | 1.65 |
| Eyebrow / fact label | 12–14px | 11–12px | 600 | — |
| Caption | 13px | 12px | 400 | — |
| Nav | 15px | — (hamburger) | 400 | — |

### Spacing
- Page gutter: **48px** desktop / **20px** mobile.
- Section top padding: **64px** desktop / **40px** mobile. Major breaks with a rule: 72px margin + 56px padding (mobile 48 + 36).
- Two-column text grid: `minmax(0,1fr) minmax(0,1.6fr)`, gap 64px. Text plus image: `1fr 1.2fr` (flipped: `1.2fr 1fr`), gap 64px.
- Gallery gaps: 12–16px desktop, 6–8px mobile. Card gap: 40px / 28px.
- No border-radius anywhere except carousel dots (4px pill). No shadows.

### Rules
Section headers and section breaks use a `1px solid #111` rule. Key facts row has a bottom rule. Next-project link has top and bottom rules.

---

## Screens

### 1. Home — `Portfolio Home.dc.html`
- **Header:** logo (`assets/logo/logo.svg`, 26px tall) + "YALE MILLER" (Poppins 700, 20px) on the left. Nav on the right: PROJECTS / RESUME (Google Drive PDF) / LINKEDIN / EPHEMERA. Bottom rule `rgba(0,0,0,.1)`. Mobile uses a two-bar hamburger.
- **Hero:** padding 56px 48px 48px (mobile 32/20/28).
  - "I designed…" on line 1.
  - Line 2 is a **typewriter**. It cycles through: "an API Builder for 84.51°", "the 2026 Futures Forum", "GenAI tools for Kroger", "the future of wine with EJ Gallo", "workshops for design thinkers".
  - Typing runs at 70ms per character and deleting at 35ms. It holds 1.8s on each full phrase.
  - The line box has a fixed height (2.4em desktop, 3.6em mobile) so the layout never jumps.
  - Tagline (28px / 20px, weight 600, top margin 28px / 20px): "Yale Miller is a designer with a focus on UX/UI, Graphic Design, and Design Research."
- **Selected Projects:** eyebrow + rule, then a 3-column grid (mobile 2), gap 36px 24px. Each card has:
  - a thumbnail at aspect-ratio 2054/1210
  - the title (Poppins 600, 18px)
  - tags joined by " · " (13px, muted)
  - Six cards in order: Futures Forum, Kroger, 84.51° API, EJ Gallo, NEXT Scholars, Workshops.
- **Card hover:**
  - Image scales to 1.05 over .7s, easing `cubic-bezier(.2,.7,.2,1)`.
  - A 3px ink bar wipes in from the left along the bottom of the image (.5s).
  - The title nudges 6px right, and a "→" fades in and slides from -8px to 0.
- **NDA Projects:** a second section with the same grid style. Header "NDA PROJECTS" with "Password protected · request access" on the right. It holds P&G and BTS. Each card has a black "PASSWORD PROTECTED" badge (11px, `.1em`) at the image's top-left. **Real password protection needs implementing** (e.g. Netlify/Vercel password, or a simple gate page).
- **Footer:** `#111` bg, wordmark left, RESUME / LINKEDIN / EPHEMERA / © 2026 right.

### 2. Case-study template — `Case Study.dc.html`
One template, data-driven by a `project` key. All project content lives in the `P` object in the script block. Port it to Markdown, MDX, or JSON content collections. The thin wrappers are `Kroger.dc.html`, `Polaris API Designer.dc.html`, `NEXT New Deal.dc.html`, `EJ Gallo.dc.html`, `Workshops.dc.html`, and `Future Creators Report.dc.html`.

**Hero (sticky, overlap effect):**
- The hero is `position:sticky; top:0; z-index:0`. Its background is a grayscale cover photo, the project tint at 86% opacity on top, then a subtle vertical dark gradient.
- The content below is `position:relative; z-index:1; background:#fff`, so it **scrolls up over the hero**. Keep this effect.
- Header inside the hero has white text and an inverted logo, with no divider line on Futures Forum.
- Hero body (padding 96px 48px 64px): an eyebrow of tags, then the H1 = the project's core **question**, then an optional subline at 85% opacity.

**Below the hero:**
1. **Key facts row:** 3–4 columns (mobile 2). Each has a label (12px, muted, uppercase) and a value. Bottom rule.
2. **Intro:** project title (H2, with a 20px top offset on desktop so it lines up with the overview paragraph) on the left. "OVERVIEW" label plus paragraph on the right.
3. **Content blocks**, rendered in order from data:
   - `embed` — a click-to-load iframe (Figma prototype, Issuu report). It shows a dark frame with a white play circle and a CTA label until clicked; the iframe only mounts on click.
   - `quote` — top rule. The first sentence is in the project tint and the rest in ink. Optional footnote.
   - `text` — two columns: heading left; paragraphs and an optional ruled bullet list right.
   - `textImage` — text and image side by side. `flip` swaps sides (and column ratio). `imgMax` caps the image width (Gallo bottles: 400px). Optional caption.
   - `gallery` — optional heading row, then an N-column image grid. Images lift by 4px on hover.
   - `cards` — a grid of ruled cards. Each can have a tinted mask icon (SVG via CSS mask), label, big stat in tint, H3, paragraph, and label/text rows.
   - `carousel` — heading, a ruled meta list (Topic / Audience / Location) and paragraphs on the left. Right side is an auto-advancing slide crossfade: every 4.5s, 1s opacity transition. Pill dots underneath: the active dot is 28px wide, inactive 8px at 25% opacity, and clicking a dot jumps to that slide. Used on Workshops.
   - `story` — text left. The right is a grey panel holding a short fiction piece that shows 3 paragraphs and has a "READ THE FULL STORY ↓ / COLLAPSE STORY ↑" toggle (FCR).
4. **Next project:** a full-width link with top and bottom rules. It reads "NEXT PROJECT — 0N / 09" plus the title. The arrow slides 10px right on hover.
5. Footer.

### 3. Futures Forum — `Futures Forum.dc.html` (custom page)
Same hero and sticky-overlap system, in red `#E4211F`. Sections in order:
1. Facts (Type / Date / Team Credit / Role), then the title and overview.
2. **Video:** a 16:9 poster with "WATCH THE FORUM RECAP". Clicking it swaps in Vimeo `1193631683` with autoplay.
3. **What is the Futures Forum:** text plus a photo.
4. **The Poster Series:**
   - The header has **2026 / 2025 year tabs**. The active tab is full opacity with a 2px ink underline; the inactive one is 40% opacity.
   - Below is a crossfade carousel at aspect-ratio 2626/1324, auto-advancing every 4.5s, with dots.
   - The 2025 set is empty: show a dashed placeholder until the images arrive.
5. **The Reports:**
   - Header with its own **2026 / 2025 tabs**, showing one report per year.
   - The click-to-load embed frame is a two-page spread at **17:11**.
   - The URLs are configurable (currently empty placeholders).
6. **Early Digital Sketches:** heading and text in the left column; a 3×3 sketch grid (4:3) on the right. Below sits the full-width "The Present / The Future" image, with 96px above and 32px below.
7. "But before the Futures Forum could happen…" (Poppins 30px), then a rule.
8. **The Foresight Lab Logo:** a 2-column grid.
   - Row 1: the logo image, then the heading plus the first paragraph.
   - Row 2: the "three-horizons" paragraph, then the three-horizons graph.
9. **SXSW 2026:** preceded by a rule. Text plus the sticker image, then a row of 3 photos (gap 28px).
10. **The Undisciplined by Design Podcast:** preceded by a rule. Text plus the YouTube channel screenshot.
11. **Pull quote section break:** "The goal of our work is not to predict the future." in red, then the rest in ink.
12. **What are we showcasing?:** text plus the "What if…" image. Then two labelled image groups: "ENHANCED GAMES" (3 posters) and "BEHIND THE SCENES" (4 photos).
13. Next project (Kroger), then the footer.

### 4. Ephemera — `Ephemera.dc.html`
A gallery page of miscellaneous work. See the file.

---

## Interactions summary
- **Sticky hero overlap:** the hero sticks, and white content scrolls over it.
- **Typewriter:** home page, timings above.
- **Carousels:** 4.5s auto-advance, 1s opacity crossfade. Clicking a dot resets or jumps.
- **Year tabs:** switching a tab resets its carousel to slide 0.
- **Click-to-load embeds:** never mount iframes on page load.
- **Hover:** card zoom, bar wipe and arrow on home; 4px lift on gallery images; 10px arrow slide on next-project; `a:hover {opacity:.6}` globally.
- **Mobile nav:** the hamburger toggles a full-width dark menu (Poppins 28px links).
- **Easing everywhere:** `cubic-bezier(.2,.7,.2,1)`.
- Respect `prefers-reduced-motion`: disable auto-advance and the typewriter.

## State
- Home: `typed`, `phraseIndex`, `hoverIndex`.
- Case study: `openEmbeds{}`, `storyExpanded`, `menuOpen`, `carouselTick` plus per-carousel offsets.
- Futures Forum: `videoPlaying`, `posterYear`, `posterSlide`, `reportYear`, `reportLoaded{}`.
- No data fetching: all content is static.

## Assets
- `assets/img/` holds about 120 WebP images, mostly 1600px wide. They were converted from the original Webflow uploads. Naming is `<project>-<desc>-<width>.webp`, plus `gallo-*`, `ws-*` (workshops), `fcr-*`, `polaris-*`, `kroger-*`, `FuturesPoster_Images-*`, `Forum-*`, `SXSW-*`, `EnhancedGames-*`, and `Thumbnails-0N-1600.webp` (home cards).
- `assets/logo/logo.svg` is the YM mark. Invert it for dark backgrounds.
- `assets/img/polaris-logo-{1,2,3}.svg` are icons used as CSS masks, tinted purple.
- **Missing, to be supplied by Yale:** the 2025 poster set, the 2026 and 2025 report embed URLs, the Polaris "soda fountain" illustration (for "So what even is an API…?"), and the Futures Forum `horizons.jpg`.

## External links
- Resume: https://drive.google.com/file/d/1oDhroNbx-kLqou2zMB6A4Ui5tlxEzJxb/view?usp=sharing
- LinkedIn: https://www.linkedin.com/in/yale-miller/
- Figma prototype embeds (Kroger, Polaris), Issuu embeds (FCR, NEXT), and Vimeo (Futures Forum): URLs are in the data.

## Open items
- P&G, BTS, and Future Creators Report pages are not built. P&G and BTS are NDA, so build them behind a password. FCR has been removed from the home grid, but its page still exists.
- The "NN / 09" numbering and next-project order assume 9 projects. Update this once the final list is set.
- Choose hosting and set up the password gate.

## Files (in `design/`)
- `Portfolio Home.dc.html` — home
- `Case Study.dc.html` — shared template plus all project content data
- `Kroger.dc.html`, `Polaris API Designer.dc.html`, `NEXT New Deal.dc.html`, `EJ Gallo.dc.html`, `Workshops.dc.html`, `Future Creators Report.dc.html` — wrappers that set `project=`
- `Futures Forum.dc.html` — custom page
- `Ephemera.dc.html`
- `support.js` — the runtime needed to open the prototypes in a browser (reference only)
- `assets/` — all images and logos
