/* Project content. Order here = the "NN / 09" numbering and the next-project chain.
   Copy comes from the design handoff (docs/handoff-v2). Text is plain; *phrase* renders as <em>.

   Fields:
     slug, oldPath    page at /projects/<slug>/, plus a redirect from the old Webflow /<oldPath>/
     title, tags      card title and tags; the title also heads the case study
     home             false hides the card from the home grid (the page still exists)
     nda              true lists it under NDA PROJECTS and puts the case study behind a password
     tint             accent for the hero overlay, quote lead-ins, stats and icons
     cover            home card image; hero is the case-study background (grayscale + tint)
     question, sub    hero H1 and optional subline
     facts            [label, value] pairs in the key-facts row
     overview         intro paragraph
     blocks           case-study sections, rendered by lib/blocks.js (see the types there)

   Image names are keys of assets/img/manifest.json (add files to assets/img/src/, run npm run images). */
'use strict';

module.exports = [
  /* 01 ---------------------------------------------------------------- */
  {
    slug: 'futures-forum',
    oldPath: 'futures-forum',
    title: 'Designing the Experience of the 2026 Futures Forum',
    tags: ['Graphic Design', 'Experiential Design'],
    tint: '#e4211f',
    cover: 'Thumbnails-07',
    coverAlt: 'Futures Forum 2026 poster series',
    hero: 'forum-hero',
    heroRule: false,
    heroCount: true,
    question: 'How might we let you step into the worlds of the future?',
    summary: 'Posters, artifacts and an experiential showcase for the University of Cincinnati Foresight Lab’s 2026 Futures Forum.',
    facts: [['TYPE', 'Graphic Design, Experiential Design'], ['DATE', 'Spring 2026'], ['TEAM CREDIT', 'Kat Burke'], ['ROLE', 'Lead designer']],
    overview: "Nobody can predict the future. Not an analyst, not a big tech developer, not even a futurist. But what we can do is imagine the many possible ways that tomorrow can take shape in an effort to thrive in *any* possible future. This is the purpose of the University of Cincinnati's strategic foresight research lab, one of only three undergraduate labs across the country doing this type of work. Each year the team conducts a year's worth of research then shares that work at the Futures Forum. Last year, I designed the posters for the first ever forum, and this year I got to do it again — bigger and badder.",
    blocks: [
      { type: 'video', provider: 'vimeo', id: '1193631683', poster: 'forum-video-thumb', title: 'Futures Forum 2026 recap', label: 'WATCH THE FORUM RECAP' },
      { type: 'textImage', h: 'What is the Futures Forum', p: ["During the Futures Forum, attendees sit in on industry panels and keynote speakers (hey, there's me!). Then they step into our curated experience where they don't just learn about our research — they step into the worlds of tomorrow."], img: 'BestOne', alt: 'Yale Miller speaking on stage in front of the red Futures Forum posters', ratio: '3/2', caption: 'Attendees inside the 2026 experience, Cincinnati.', cols: '1fr 1.6fr', align: 'start' },
      {
        type: 'tabs', kind: 'carousel', label: 'THE POSTER SERIES', panels: [
          { tab: '2026', ratio: '2626/1324', fit: 'contain', imgs: [
            { img: 'FuturesPoster_Images-01', alt: 'Futures Forum 2026 poster series, set one' },
            { img: 'FuturesPoster_Images-08', alt: 'Futures Forum 2026 poster series, set two' },
            { img: 'FuturesPoster_Images-07', alt: 'Futures Forum 2026 poster series, set three' },
            { img: 'FuturesPoster_Images-06', alt: 'Futures Forum 2026 poster series, set four' },
          ] },
          { tab: '2025', ratio: '2626/1324', imgs: [], empty: '2025 POSTERS — COMING SOON' },
        ],
      },
      {
        // Report embed URLs to come: paste an Issuu embed URL into `url` and it loads on click.
        type: 'tabs', kind: 'report', label: 'THE REPORTS', panels: [
          { tab: '2026', title: '2026 Report', url: '' },
          { tab: '2025', title: '2025 Report', url: '' },
        ],
      },
      {
        type: 'textGrid', h: 'Early Digital Sketches', p: ['Early sketches explored different ways to literally represent diverging time moving between the present and many futures. Over time this was refined into the four-poster series.'],
        imgs: ['Forum-28', 'Forum-27', 'Forum-29', 'Forum-26', 'Forum-23', 'Forum-22', 'Forum-18', 'Forum-17', 'Forum-20'].map((img, i) => ({ img, alt: `Early digital sketch ${i + 1}` })),
        cols: 3, mcols: 3, ratio: '4/3', mratio: '1', gap: 12, mgap: 6,
        after: { img: 'FuturesPoster_Images-05', alt: 'The Present vs. The Future: black for the certainty of now, gradients for the uncertainty of the future' },
      },
      {
        type: 'pairs', space: 'brk', lead: 'But before the Futures Forum could happen, other projects had to take shape…', cells: [
          { img: 'ForesightLab-09', alt: 'The Foresight Lab logo, a three-horizons mark with the third horizon highlighted' },
          { h: 'The Foresight Lab Logo', p: ["As the scope of our research grew beyond UC's NEXT Innovation Scholars Program, it became necessary to create a new identity — a visual shorthand for thought leadership that had extended to US Bank, Forum for the Future, and Substack."] },
          { p: ['The mark comes from the three-horizons model, a staple of any foresight curriculum. The highlighted horizon is the third: the emerging far future.'] },
          { img: 'fcr-three-horizons', alt: 'The three-horizons model' },
        ],
      },
      { type: 'textImage', rule: true, h: 'SXSW 2026', p: ['Before hosting the Futures Forum, the team traveled to SXSW 2026 to present some of our work. Together, we developed an experiential showcase where participants completed an innovation passport to be entered into a drawing. Twelve kitschy stickers were made to hand out, along with a madlib activity.'], img: 'FuturesPoster_Images-04', alt: 'SXSW stickers and madlib activity', cols: '1fr 1.4fr', gap: 56 },
      {
        type: 'gallery', space: 'sm', cols: 3, mcols: 3, ratio: '4/3', mratio: '1', gap: 28, mgap: 6, imgs: [
          { img: 'SXSW-1', alt: 'The team at the SXSW showcase' },
          { img: 'SXSW-2', alt: 'Innovation passport and stickers at SXSW' },
          { img: 'SXSW-3', alt: 'Participants at the SXSW booth' },
        ],
      },
      { type: 'textImage', rule: true, h: 'The Undisciplined by Design Podcast', p: ['While our in-person engagement is crucial, it is through online platforms that the Foresight Lab keeps a continuous stream of content. Key to that is the Undisciplined by Design podcast, which launched on YouTube this year.'], img: 'sxsw-screenshot', alt: 'The Foresight Lab YouTube channel', cols: '1fr 1.4fr', gap: 56 },
      { type: 'quote', size: 'md', space: 'brk', q: 'The goal of our work is not to predict the future.', em: 'It is to imagine day-to-day life in any number of possible futures that current trends could produce.' },
      { type: 'textImage', h: 'What are we showcasing?', p: ['Two things sit at the core: the driver descriptions on the main posters, and the artifacts — imagined pieces of design someone might encounter in daily life in the future, like this poster series for an "enhanced" Olympic games.'], img: 'Podcast', alt: 'What if… social cards', gap: 56 },
      {
        type: 'gallery', space: 'md', label: 'THE ENHANCED GAMES', cols: 3, mcols: 3, ratio: '2/3', gap: 12, mgap: 6, imgs: [
          { img: 'EnhancedGames-01', alt: 'Enhanced Games poster one' },
          { img: 'EnhancedGames-02', alt: 'Enhanced Games poster two' },
          { img: 'EnhancedGames-03', alt: 'Enhanced Games poster three' },
        ],
      },
      {
        type: 'gallery', space: 'md', label: 'BEHIND THE SCENES', cols: 4, mcols: 2, ratio: '3/4', gap: 12, mgap: 6, imgs: [
          { img: 'image645', alt: 'Behind the scenes at the Futures Forum' },
          { img: 'Imag1111', alt: 'Behind the scenes at the Futures Forum' },
          { img: 'image24543', alt: 'Behind the scenes at the Futures Forum' },
          { img: 'image64345', alt: 'Behind the scenes at the Futures Forum' },
        ],
      },
    ],
  },

  /* 02 ---------------------------------------------------------------- */
  {
    slug: 'kroger-genai',
    oldPath: 'kroger',
    title: "Integrating GenAI into Kroger's Internal Tools",
    tags: ['UX/UI Design', 'User Research'],
    tint: '#2861c2',
    cover: 'Thumbnails-06',
    coverAlt: 'Kroger GenAI explainer interface',
    hero: 'kroger-hero',
    sub: 'Joint Price & Promotion GenAI Explainer',
    question: 'How can we use GenAI to ensure users are as confident in the data science as they are in their own decisions?',
    summary: 'Research and UX for a GenAI explainer inside Kroger’s Joint Price & Promotion optimization tool.',
    facts: [['TYPE', 'UX/UI Design'], ['TEAM CREDIT', 'Sam Allison, Pierce Gohlke, Jared Price'], ['DATE', 'Fall 2025']],
    overview: "Generative AI: a solution looking for a problem. That is not to say that AI is useless, just that much of what has been asked of designers in the past years is how to integrate AI into existing systems. For this project I was tasked with doing just that for Kroger's upcoming Joint Price & Promotion tool. JP&P has a number of features, but for this project the focus was on the promotion calendar optimizer. Essentially, the tool would optimize the best time to have different promotions (ex: buy one, get one). However, user trust and understanding of the tool was low. This might just be a problem that GenAI can solve.",
    blocks: [
      { type: 'embed', items: [{ url: 'https://embed.figma.com/proto/djqhWYtnHHMjCQgmmA4jKT/AIExplainer?page-id=2001%3A25779&node-id=2139-68943&p=f&viewport=709%2C-615%2C0.15&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2139%3A68943&embed-host=share', cta: 'LOAD INTERACTIVE PROTOTYPE', label: 'Figma prototype — the GenAI explainer inside the promotion calendar optimizer.' }] },
      { type: 'quote', q: "You have been managing Kroger's cereal promotion strategy for over 15 years. You have your own methods, your own team, and at the end of the day it's your neck on the line. Now some new software tool wants to tell you how to do your job.", em: 'Would you listen?' },
      { type: 'textImage', h: 'Can we use GenAI to turn the black box transparent?', p: ["Every month data optimization science makes Kroger millions of dollars. It's not going anywhere, but is there a way that we can make the process more transparent?", 'Traditionally, the data science is a black box. Inputs go in, recommendations come out. However, by using GenAI and AI agents three key metrics can be surfaced to the user.'], bullets: ['WHAT changes the optimization is suggesting', 'WHY it wants to make those changes', 'IMPACT of those changes'], img: 'kroger-1', alt: 'GenAI explainer panel showing what, why and impact for a promotion recommendation' },
      { type: 'quote', q: "“I'm managing a billion dollar business in Excel.", em: "It's about time we had something more modern.”", foot: '*Real quote from user research' },
      { type: 'textImage', h: 'Research Objective', p: ['While this project was beginning, Kroger as an organization was turning away from 3rd party AI tools to in-house solutions. Therefore, a central requirement of this research was not just how it would aid the JP&P tool, but how it could be applied to all tools.', 'Given the enormity of the ask and the limited timeframe, I decided to create three options to test. Option A is a familiar chatbot interface, while options B & C explore presenting pre-generated information to the user.'], img: 'kroger-2', alt: 'The three prototype options tested with users' },
      { type: 'textImage', h: 'Research Methods', p: ['Tests were done 1:1 between the facilitator (myself) and the participant. A notetaker also attended, camera off and silent. All tests were done remotely.', 'Users were instructed to click through the prototype while being asked which they preferred, what information was most important to them, and what kinds of questions they would like to ask the chatbot.'], img: 'kroger-3', alt: 'Prototype option presenting pre-generated information' },
      { type: 'cards', h: 'Research Insights', cols: 4, items: [
        { label: 'INSIGHT 1', big: '5/6', h: 'users showed excitement or neutrality towards using an AI tool' },
        { label: 'INSIGHT 2', big: '6/6', h: 'users preferred prototypes that show pre-generated responses without needing to be prompted' },
        { label: 'INSIGHT 3', big: '3/6', h: 'users asked to compare optimized plans to plans from last year' },
        { label: 'INSIGHT 4', big: '5/6', h: 'users preferred highly detailed responses that directly cited metrics' },
      ] },
    ],
  },

  /* 03 ---------------------------------------------------------------- */
  {
    slug: 'polaris-api-designer',
    oldPath: 'futures',
    title: 'Designing an API Creator for Developers with 84.51°',
    tags: ['UX/UI Design', 'User Research'],
    tint: '#6a3ff0',
    cover: 'Thumbnails-05',
    coverAlt: 'Polaris API Designer interface',
    hero: 'polaris-cover',
    sub: 'Polaris API Designer',
    question: 'How do we help developers build better APIs faster?',
    summary: 'UX and research for Polaris, an API design tool for developers and non-developers at 84.51°.',
    facts: [['TYPE', 'UX/UI Design'], ['TEAM CREDIT', 'Joshua Smith'], ['DATE', 'Fall 2024']],
    overview: "As a data analytics company, 84.51° profits off the development of APIs. However there's a problem. API developers at the company each have their own process to build an API, which results in a lack of standards, which in turn results in a subpar product. Polaris is an API creator tool designed to make it easier for developers and non-developers alike to build APIs. The Polaris API Designer is just one part of the tool that lets developers mock up and share API designs before they have to write a single line of code.",
    blocks: [
      { type: 'embed', items: [{ url: 'https://embed.figma.com/proto/Gf25iZhtqCYasXtYxz4QNj/Emergency-Local-Prototype?page-id=0%3A1&node-id=1-8460&viewport=1663%2C923%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A8460&embed-host=share', cta: 'LOAD INTERACTIVE PROTOTYPE', label: 'Figma prototype — the Polaris API Designer.' }] },
      { type: 'quote', q: 'Going from “I\'m in hell” to', em: '“That would be dope as hell.”', foot: '*Real quotes from user research' },
      // The soda-fountain illustration is still to come; add `img` and this becomes text + image.
      { type: 'textImage', h: 'So what even is an API…?', p: ['An API is an Application Programming Interface. Does that clear things up? Probably not — it took me a while to get a handle on what APIs are and how they drive revenue.', "To help, I developed the soda fountain metaphor. 84.51° employees are masters of working with data, just as Coca-Cola employees are masters of making soda. The customer doesn't care what's going on behind the scenes. They just want their nice filtered Kroger shopping data, or cup of Diet Coke, when they ask for it.", "That's where the API comes in. It's a contract of code between us and the customer. You pay and put your cup under Minute Maid and you'll get lemonade. You send us this message and you'll get this array of data."] },
      { type: 'cards', eyebrow: 'THE PROBLEM', h: 'At 84.51°, API development is…', cols: 3, items: [
        { icon: 'polaris-logo-1', h: 'Fractured', p: 'Each developer has their own process and standard of API development, which makes collaboration difficult.' },
        { icon: 'polaris-logo-2', h: 'Slow', p: 'The time to build APIs for customers is much slower than the competition, which is leaving revenue on the table.' },
        { icon: 'polaris-logo-3', h: 'Repetitive', p: 'Each new API requires timely boilerplate steps, such as creating a GitHub repo, that could be easily automated.' },
      ] },
      { type: 'gallery', imgs: [{ img: 'polaris-workflow', alt: 'Workflow map of the steps developers take to build an API at 84.51°' }], cols: 1, mcols: 1, ratio: 'auto' },
      { type: 'gallery', eyebrow: 'INITIAL RESEARCH QUESTION', h: 'What steps do 84.51° developers take to build an API?', imgs: [9, 10, 4, 8, 7, 6, 5, 2, 3, 1].map((n, i) => ({ img: `polaris-sticky-${n}`, alt: `Research synthesis sticky note ${i + 1}` })), cols: 5, mcols: 3, ratio: '1', fit: 'contain' },
      { type: 'quote', q: 'The Polaris API Designer:', em: 'a tool for developers and non-developers alike to design, mock, and share APIs.' },
      { type: 'cards', cols: 2, items: [
        { h: 'Usability Testing', rows: [
          { l: 'RESEARCH QUESTION', t: 'Are users of the Polaris API Designer able to discover and use all the features the platform provides?' },
          { l: 'RESEARCH METHODS', t: 'Participants were told that after exploring the prototype, they would be asked to explain how the Polaris API Designer helps a user build better APIs faster. They had as much time as they liked to explore while the researcher watched and answered questions. Afterwards they were asked, “Explain to me what the Polaris API Designer is capable of,” and their responses were graded against a rubric.' },
        ] },
        { h: 'Value Testing', rows: [
          { l: 'RESEARCH QUESTION', t: 'Are the features of the Polaris API Designer the features our developers need to create better APIs faster?' },
          { l: 'RESEARCH METHODS', t: 'After usability testing, participants were asked if they would join the beta program for early access, in exchange for further feedback opportunities. Finally, they were asked for the names of three people the researcher could send additional invites to.' },
        ] },
      ] },
      { type: 'cards', h: 'Testing Highlights', cols: 3, items: [
        { big: '100%', p: 'of 1-on-1 participants were able to identify and understand the scorecard, reusable library, and publishing features.' },
        { big: '100%', p: 'of 1-on-1 participants were not just interested but excited about joining a beta program.' },
        { big: '88%', sub: '± 10.69%', p: 'of asynchronous participants in technical roles were open to joining a beta program.' },
      ] },
    ],
  },

  /* 04 ---------------------------------------------------------------- */
  {
    slug: 'future-creators-report',
    oldPath: 'old-home',
    title: '2026 Future Creators Report',
    tags: ['Strategic Foresight'],
    home: false,
    tint: '#e8641e',
    cover: 'Thumbnails-09',
    coverAlt: 'Future Creators Report cover',
    hero: 'fcr-hero',
    sub: '2026 Future Creators Report and Beyond',
    question: 'How do we prepare for the future when tomorrow is impossible to predict?',
    summary: 'The Foresight Lab’s annual strategic foresight publication, designed by Yale Miller.',
    facts: [['TYPE', 'Strategic Foresight'], ['TEAM CREDIT', 'NEXT Innovation Scholars'], ['DATE', '2023 – 2026']],
    overview: "The Future Creators Report is an annual publication put out by the University of Cincinnati's Foresight Lab. It encompasses a full year of strategic foresight research done by the student team, including “artifacts from the future.” These artifacts capture what it would feel like to live in any of these theorized possible futures. The Spring 2026 edition was designed by Yale Miller.",
    blocks: [
      { type: 'embed', items: [{ url: 'https://e.issuu.com/embed.html?d=horizon_shift_volume_003_future_creators_report&u=uc_next_innovation_scholars', cta: 'READ THE REPORT', label: 'Horizon Shift, Vol. 3 — 2026 Future Creators Report (Issuu).', ratio: '16/10' }] },
      { type: 'gallery', h: 'The Foresight Lab', p: ['The University of Cincinnati is one of three institutions in the United States with a strategic foresight program at the undergraduate level — and the newest. The Foresight Lab is an evolving, rapidly growing program that has continually redefined itself over its five years. Besides the Future Creators Report, the Lab puts on an annual forum to present its findings live.', 'This year the posters for the event were designed by Yale Miller alongside project lead Yasmine Shaban.'], imgs: [1, 2, 3, 4].map((n) => ({ img: `fcr-${n}`, alt: 'Futures Forum poster and event material' })), cols: 4, mcols: 2, ratio: '3/4' },
      { type: 'textImage', h: 'Undisciplined by Design', p: ['The Undisciplined by Design podcast is another arm of the Foresight Lab. Host Aaron Bradley and editor Max Kemats interview some of the biggest names in design and innovation. All branding elements of the podcast were designed by Yale Miller.', 'Listen on Apple Podcasts and Spotify — and new with season 3, full-length video interviews on YouTube.'], img: 'fcr-undisciplined', alt: 'Undisciplined by Design podcast branding' },
      { type: 'textImage', flip: true, h: 'So what exactly is strategic foresight?', p: ['Predicting the future is impossible, but that is not the goal of strategic foresight. Rather, it is the practice of analyzing budding trends and fringe markets in order to imagine not the future, but possible futures.', 'By imagining what the worst and best tomorrow would look like, we can make actionable recommendations to achieve that best future.'], img: 'fcr-three-horizons', alt: 'The three-horizons model diagram', caption: 'The three-horizons model.' },
      { type: 'gallery', eyebrow: 'STEP 1', h: 'Landscape Analysis', p: ['Every strategic foresight project begins with a research deep dive for leading indicators — the budding trends that could lead to real impact. The team sorts through hundreds of surface-level articles to get an accurate picture of the now, then finds those small pockets of the future. In the words of William Gibson: “The future is already here. It\'s just not evenly distributed.”'], imgs: [
        { img: 'fcr-driver-headline', alt: 'A driver headline from the report' },
        { img: 'fcr-driver-impact', alt: 'The societal impact section of a driver' },
        { img: 'fcr-driver-indicators', alt: 'The leading indicators section of a driver' },
      ], cols: 3, mcols: 1, ratio: '16/10', fit: 'cover' },
      { type: 'cards', eyebrow: 'STEP 2', h: 'Developing Drivers', p: ['The real deliverables of a strategic foresight report are the drivers: cumulative forces that will drive change in the coming years. When a common thread can be drawn between enough leading indicators, a driver is created.'], cols: 3, items: [
        { label: '01', h: 'The Headline', p: "Helping the reader envision a possible future starts with the first word. That's why driver names are always written like catchy headlines." },
        { label: '02', h: 'Societal Impact', p: 'Here the team imagines the possible impacts a chosen driver could have on different industries.' },
        { label: '03', h: 'Leading Indicators', p: 'Drivers are not anecdotal. Leading indicators are the specific sources that prove a driver is having, or will have, significant impact.' },
      ] },
      { type: 'gallery', imgs: [{ img: 'fcr-futures-page', alt: 'A driver spread from the Future Creators Report' }], cols: 1, mcols: 1, ratio: 'auto', caption: 'Anatomy of a driver spread.' },
      {
        type: 'story', h: 'Step 3: Artifact Creation', p: ['The goal of a strategic foresight report is to help the reader imagine the world of the future — not just the sweeping changes, but what day-to-day life would be like for the individual. We build these worlds through “artifacts from the future,” ranging from podcasts to posters to art to writing like the piece shown here.'],
        storyTitle: 'You-logy',
        story: [
          '“She\'s the one,” said Mark, pacing around the couch. The ring in his hand had grown warm from his fidgeting. “It feels insane to say that out loud.”',
          '“I remember when you first met her,” his Dad said. The profile picture on the TV was programmed to bob up and down with the cadence of his voice, but John Davis knew only one way to speak: loud and confident. That meant the static image mostly just hung at the top of the screen, falling when his Dad finally took a breath. “You called me up and heck, I could hardly get a word in. That must\'ve been what, three years ago?”',
          '“Yeah, three years. Hard to believe,” said Mark. “Even then I knew I was going to marry her. I just thought I wouldn\'t be this nervous.”',
          '“You think I wasn\'t nervous when I asked your mother? I changed my shirt halfway through dinner!” his Dad said. “But when it came time to ask if she would spend the rest of her life with me, I don\'t think I felt anything but certain.”',
          "Mark sank into the couch while his father continued to tell the story of the engagement. How Mark was part of the picture before there was a ring. The hasty wedding planning and the even hastier wedding. Mark had heard the same story every year on his parents' anniversary. His Dad had it memorized to the beat. He knew when to pause for effect, what jokes to tell when, and at what point Mark's mother would get teary. This time, however, he just told it plain. Mark took a deep breath.",
          '“I love you, Dad,” he said, placing the ring back in its case.',
          '“I lov—”',
          '“You\'ve reached your monthly limit of conversations with John Davis. Would you like to purchase another 20 minutes?”',
          '“No, it\'s ok. Go ahead and shut off,” Mark said. The screen flashed a logo, *You-logy: A world beyond goodbye*, then dimmed to black.',
          'Years ago, when the death of his father still hung over his life with a thick gloom, these conversations always left Mark with a chill. A primeval warning echoed through him that the man, the thing, on the other end was not his real Dad. The man was dead, but the data lived on. In life this digital revenant had been sold to advertisers eager to know what kind of lawn mower a man like John Davis buys. In death, it continued to turn a profit as a monthly subscription service for grieving families.',
          'Mark now scarcely paid a second thought to the details. And why would he? Seven years of postmortem conversations had given the model ample data to turn John Davis into the father he never quite was in life.',
        ],
      },
    ],
  },

  /* 05 ---------------------------------------------------------------- */
  {
    slug: 'ej-gallo',
    oldPath: 'ej-gallo',
    title: 'The Future of Wine with EJ Gallo',
    tags: ['Consumer Insights'],
    tint: '#2e7d3a',
    cover: 'Thumbnails-08',
    coverAlt: 'EJ Gallo consumer insights presentation',
    hero: 'gallo-presentation',
    sub: 'EJ Gallo Winery · NEXT Innovation Scholars',
    question: 'What is the future of wine for LDA consumers?',
    summary: 'Fifty interviews in two weeks: consumer insights on legal-drinking-age wine drinkers for EJ Gallo Winery.',
    facts: [['TYPE', 'Consumer Insights'], ['TEAM CREDIT', 'Akash Khanikor, Himanshu Kaushik, Maxwell Kemats, Cara Baah-Binney, Caroline Berger'], ['DATE', 'Summer 2023']],
    overview: 'In summer of 2023 EJ Gallo Winery approached the NEXT Innovation Scholars with a simple ask: we want you to find the future of wine for LDA consumers. The catch? They need it in two weeks. What followed was 50 user interviews, hours of digging through insights, and a very late night putting together a final presentation. The team presented to EJ Gallo at their headquarters in Modesto, California, then ran a workshop with their team.',
    blocks: [
      { type: 'textImage', h: 'The Brief', p: ['In two weeks:'], bullets: ['Collect relevant data and extract valuable insights around wine consumption amongst the Legal Drinking Age (LDA) [21–25] consumer', 'Explore motivations, barriers/tensions, preferences, and decision-making factors that influence LDA', 'Interview at least 50 LDA consumers of a diverse background'], img: 'gallo-hero', alt: 'EJ Gallo brand portfolio', imgMax: '400px', caption: 'Alongside wine brands like Barefoot, EJ Gallo also owns a number of other popular brands in the alcohol category.' },
      { type: 'textImage', flip: true, h: 'The Presentation', p: ["The team had the opportunity to present our work at EJ Gallo's headquarters in Modesto, California. We then ran a workshop with EJ Gallo employees to create ideas from our insights.", 'Our insights were divided into four main groups:'], bullets: ['The Current State of LDA Drinking', 'LDA Consumption & Perception of Wine', 'Barriers to the Wine Category', 'LDA Consumer Desires'], img: 'gallo-presentation', alt: 'The team presenting at EJ Gallo headquarters in Modesto', caption: 'Left to right: Caroline Berger, Akash Khanikor, Yale Miller, Max Kemats, Himanshu Kaushik.' },
      ...[
        ['INSIGHT 01', 'The Current State of LDA Drinking', 'current', [2, 1]],
        ['INSIGHT 02', 'LDA Consumption & Perception of Wine', 'perception', [1, 2]],
        ['INSIGHT 03', 'Barriers to the Wine Category', 'barriers', [1, 2]],
        ['INSIGHT 04', 'LDA Consumer Desires', 'desires', [1, 2]],
      ].map(([eyebrow, h, key, order]) => ({
        type: 'gallery', eyebrow, h, cols: 2, mcols: 1, ratio: '1600/922', fit: 'cover',
        imgs: order.map((n, i) => ({ img: `gallo-${key}-${n}`, alt: `${h}, insight slide ${i + 1}` })),
      })),
    ],
  },

  /* 06 ---------------------------------------------------------------- */
  {
    slug: 'next-new-deal',
    oldPath: 'the-next-new-deal',
    title: 'Building a Strategic Plan for the NEXT Innovation Scholars',
    tags: ['Strategy'],
    tint: '#e4211f',
    cover: 'Thumbnails-04',
    coverAlt: 'NEXT Innovation Scholars annual report',
    hero: 'nis-group',
    sub: 'The NEXT New Deal',
    question: 'How can the NEXT Innovation Scholars grow while keeping our identity?',
    summary: 'A strategic plan for the NEXT Innovation Scholars, developed as a Stanford University Innovation Fellows project.',
    facts: [['TYPE', 'Strategy'], ['TEAM CREDIT', 'Caroline Berger, Max Kemats'], ['DATE', '2023 – 2026']],
    overview: "The NEXT Innovation Scholars Program (NIS) started with a cohort of just 10 students back in 2021. Now, the program is on track to have 100 students. This growth is a significant mark of the program's success, but it also presents a challenge: how does NIS preserve its culture and continue to deliver excellence in the face of such change? As their project for Stanford's University Innovation Fellows Program, students Caroline Berger, Max Kemats, and Yale Miller developed and implemented a new strategic plan for NIS. The plan's name? The NEXT New Deal.",
    blocks: [
      { type: 'embed', items: [
        { url: 'https://e.issuu.com/embed.html?d=2024-2025_next_innovation_scholars_annual_report&u=uc_next_innovation_scholars', cta: 'READ 2024–25 REPORT', label: '2024–25 NIS Annual Report', ratio: '4/3' },
        { url: 'https://e.issuu.com/embed.html?d=next_innovation_scholars_annual_report&u=uc_next_innovation_scholars', cta: 'READ 2023–24 REPORT', label: '2023–24 NIS Annual Report', ratio: '4/3' },
      ] },
      { type: 'text', h: 'Who are the NEXT Innovation Scholars?', p: ['Want to know all about the NEXT Innovation Scholars? Check out the two annual reports I designed above for a detailed account of all that we do.', "NIS is the University of Cincinnati's premier design thinking and innovation scholarship program. Each year the program accepts a cohort of 10 to 15 new students from any college or major. Multidisciplinary teams are at the core of everything NIS does.", 'Students participate in at least one project each semester. Many are with outside commercial partners such as P&G, KAO Brands, King Records, and more. Others are insights projects or strategic foresight reports that exist solely within the university ecosystem.'] },
      { type: 'textImage', h: 'And who are the University Innovation Fellows?', p: ["Lots of innovation and acronyms, but I assure you these are two different programs! While the NEXT Innovation Scholars is a program within the University of Cincinnati, the University Innovation Fellows is a global fellowship created and run by Stanford's d.school.", 'I was accepted into the 2024 cohort alongside fellow UC students Max Kemats and Caroline Berger. Each UIF team completes a year-long project, then travels to the Netherlands to share their work at a conference.'], img: 'uif-launch', alt: 'University Innovation Fellows launch' },
    ],
  },

  /* 07 ---------------------------------------------------------------- */
  {
    slug: 'pg',
    oldPath: 'pg',
    title: 'Redesigning Iconic Brands for the Modern Consumer with P&G',
    tags: ['User Research', 'Graphic Design'],
    nda: true,
    partner: 'Procter & Gamble',
    tint: '#0a4a9e',
    cover: 'Untitled-2-01',
    coverAlt: 'P&G project cover',
    hero: 'Untitled-2-01',
    question: 'How might iconic brands earn their place with the modern consumer?',
    summary: 'User research and graphic design for Procter & Gamble. Details are under NDA.',
    facts: [['TYPE', 'User Research, Graphic Design'], ['PARTNER', 'Procter & Gamble'], ['STATUS', 'Under NDA']],
    overview: "This project was completed under a non-disclosure agreement with Procter & Gamble. It combined user research with graphic design to rethink how a set of iconic brands present themselves to today's consumer.",
  },

  /* 08 ---------------------------------------------------------------- */
  {
    slug: 'bts',
    oldPath: 'bts',
    title: 'Preparing for the Future of Consulting in the Age of AI with BTS',
    tags: ['Strategy'],
    nda: true,
    partner: 'BTS',
    tint: '#7a5a2a',
    cover: 'Untitled-2-02',
    coverAlt: 'BTS project cover',
    hero: 'Untitled-2-02',
    question: 'How does a consultancy prepare for a future where AI does the analysis?',
    summary: 'Strategy work with BTS on the future of consulting in the age of AI. Details are under NDA.',
    facts: [['TYPE', 'Strategy'], ['PARTNER', 'BTS'], ['STATUS', 'Under NDA']],
    overview: 'This project was completed under a non-disclosure agreement with BTS. It was a strategy engagement exploring how consulting practice, talent, and offerings need to change as AI takes on more of the analytical work.',
  },

  /* 09 ---------------------------------------------------------------- */
  {
    slug: 'workshops',
    oldPath: 'workshops',
    title: 'Building and Facilitating Design Thinking Workshops',
    tags: ['Design Thinking', 'Workshop Facilitation'],
    tint: '#d98a1a',
    cover: 'Thumbnails-03',
    coverAlt: 'Design thinking workshop in progress',
    hero: 'ws-fordham-2',
    sub: 'Workshop Design & Facilitation',
    question: 'How do we teach design thinking in a way that makes it valuable?',
    summary: 'Workshops designed and facilitated for Fordham University, UC Honors, the GraphUC Hackathon and more.',
    facts: [['TYPE', 'Facilitation, Design Thinking'], ['TEAM CREDIT', 'NEXT Innovation Scholars'], ['DATE', '2022 – Present']],
    overview: 'Design thinking is at best a vague concept and at worst intentionally confusing. However, when an audience can be taught in a way that is specific to them, design thinking can become a major unlock without a major cost of resources. The number one question that must be asked when designing any workshop is: how does this lesson help the audience do what they do better? Below are just a few of the workshops I have helped design and facilitate.',
    blocks: [
      { type: 'textImage', h: 'Fordham University', p: ['NEXT Innovation Scholars Sophia Lammi, Charlie Harker, and I traveled to New York with our Program Director Aaron Bradley and Program Manager Sydney Myers to teach a workshop to Fordham business students. This was just one part of our continuous partnership with Fordham Professors Bozena Mierzejewska and Axel Roepnack.'], bullets: ['Topic — How to Conduct a User Interview', 'Audience — Fordham Masters of Business Students', 'Location — Fordham University, New York City'], img: 'ws-fordham-1', alt: 'Teaching a user-interview workshop at Fordham University' },
      { type: 'gallery', cols: 2, mcols: 2, ratio: '1', fit: 'cover', imgs: [
        { img: 'ws-fordham-2', alt: 'Fordham business students during the workshop' },
        { img: 'ws-fordham-3', alt: 'Fordham business students during the workshop' },
      ] },
      { type: 'carousel', h: 'University Honors Design Thinking Modules', bullets: ['Topic — An Introduction to Design Thinking', 'Audience — University Honors Freshmen', 'Location — University of Cincinnati'], p: ['A team of students and I were asked to design a workshop to introduce design thinking, then facilitate it with twelve sections of the Honors Gateway class. Teaching the honors classes can be difficult, notably because the class is all first-semester freshmen and only an hour long. Both were key constraints we had to design around.'], imgs: [1, 2, 3].map((n) => ({ img: `ws-uhp-${n}`, alt: 'University Honors design thinking workshop' })), ratio: '1600/924' },
      { type: 'carousel', h: 'GraphUC Hackathon', bullets: ['Topic — Becoming Problem-Obsessed with Design Thinking', 'Audience — Hackathon Participants', 'Location — University of Cincinnati'], p: ['The GraphUC Hackathon is a blockchain-focused hackathon held each fall at the University of Cincinnati, with workshops running throughout the day. The organizers asked me to design and facilitate a design thinking workshop to help students come up with an idea for their hackathon project.'], imgs: [1, 2, 3].map((n) => ({ img: `ws-graph-${n}`, alt: 'GraphUC Hackathon design thinking workshop' })), ratio: '1600/924' },
      { type: 'carousel', h: 'DASHIE Landscape Analysis', bullets: ['Topic — Landscape Analysis in a University Setting', 'Audience — University Students', 'Location — University of Cincinnati'], p: ["As part of my work with Stanford's University Innovation Fellows, my team wanted to run a STEEP analysis (Social, Technology, Economic, Environmental, Political) with current students to rapidly generate trends, insights, and observations. But STEEP doesn't map well onto higher education, so we developed DASHIE — Diversity & Inclusion, Academics, Social, Health, Innovation, and Entrepreneurship — as a new set of categories, then led an ideation workshop with thirty students."], imgs: [1, 2, 3].map((n) => ({ img: `ws-dash-${n}`, alt: 'DASHIE landscape analysis workshop' })), ratio: '1600/924' },
    ],
  },
];
