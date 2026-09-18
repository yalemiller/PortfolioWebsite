/* Project content. Order here = order on the home grid and the 01/09 counters.
   Copy comes from the design handoff (Futures Forum) and the current yalemiller.com pages.
   Each project's `body(H)` returns the case-study sections; H has pic/gallery/figure/video/embed. */
'use strict';

const SIZES = {
  wide: '(max-width: 639px) 100vw, (max-width: 1023px) 55vw, 56vw',
  half: '(max-width: 639px) 100vw, 48vw',
  third: '(max-width: 639px) 33vw, 30vw',
  quarter: '(max-width: 639px) 72vw, (max-width: 1023px) 48vw, 23vw',
  fifth: '(max-width: 639px) 48vw, 18vw',
  full: '(max-width: 639px) 100vw, calc(100vw - 96px)',
};

module.exports = [
  /* 01 ---------------------------------------------------------------- */
  {
    slug: 'futures-forum',
    oldPath: 'futures-forum',
    title: 'Designing The Experience of The 2026 Futures Forum',
    shortTitle: 'Futures Forum 2026',
    tags: ['Graphic Design', 'Experiential Design'],
    color: '#e4211f',
    cover: 'Thumbnails-07',
    coverAlt: 'Futures Forum 2026 poster series',
    hero: 'BestOne',
    question: 'How might we let you step into the worlds of the future?',
    summary: 'Posters, artifacts and an experiential showcase for the University of Cincinnati Foresight Lab’s 2026 Futures Forum.',
    meta: { Type: ['Graphic Design', 'Experiential Design'], Date: 'Spring 2026', 'Team Credit': 'Kat Burke', Role: 'Lead designer' },
    overview: `<p>Nobody can predict the future. Not an analyst, not a big tech developer, not even a futurist. But what we can do is imagine the many possible ways that tomorrow can take shape in an effort to thrive in <em>any</em> possible future. This is the purpose of the University of Cincinnati's strategic foresight research lab, one of only three undergraduate labs across the country doing this type of work. Each year the team conducts a year's worth of research then shares that work at the Futures Forum. Last year, I designed the posters for the first ever forum, and this year I got to do it again — bigger and badder.</p>`,
    body: (H) => `
  ${H.video({ provider: 'vimeo', id: '1193631683', poster: 'FuturesPoster_Images-01', title: 'Futures Forum 2026' })}

  <section class="section">
    <div class="row">
      <div>
        <h2 class="h2">What is the Futures Forum</h2>
        <div class="prose"><p>During the Futures Forum, attendees sit in on industry panels and keynote speakers (hey, there's me!). Then they step into our curated experience where they don't just learn about our research — they step into the worlds of tomorrow.</p></div>
      </div>
      ${H.figure('BestOne', { alt: 'Yale Miller speaking on stage in front of the red Futures Forum posters', caption: 'Attendees inside the 2026 experience, Cincinnati.', sizes: SIZES.wide, ratio: 'r-32' })}
    </div>
  </section>

  ${H.gallery('posters', [
    { img: 'FuturesPoster_Images-01', alt: 'Futures Forum poster, driver one' },
    { img: 'FuturesPoster_Images-08', alt: 'Futures Forum poster, driver two' },
    { img: 'FuturesPoster_Images-07', alt: 'Futures Forum poster, driver three' },
    { img: 'FuturesPoster_Images-06', alt: 'Futures Forum poster, driver four' },
  ], { cols: 'posters', ratio: 'r-23', sizes: SIZES.quarter })}
  <p class="caption caption--gallery"><span class="only-mobile">Swipe — </span>The four-poster series — one per driver of change.<span class="only-desktop"> Click any poster to open it full-screen.</span></p>

  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">Early Digital Sketches</h2>
      <div class="prose"><p>Early sketches explored different ways to literally represent diverging time moving between the present and many futures. Over time this was refined into the four-poster series.</p></div>
    </div>
    ${H.gallery('sketches', ['Forum-28', 'Forum-27', 'Forum-29', 'Forum-26', 'Forum-23', 'Forum-22', 'Forum-18', 'Forum-17', 'Forum-20'].map((img, i) => ({ img, alt: `Early digital sketch ${i + 1}` })), { cols: 'three', ratio: 'r-43', cls: 'sketches', sizes: SIZES.third })}
  </section>

  <section class="tinted">
    <p class="tinted__intro">But before the Futures Forum could happen, other projects had to take shape…</p>
    <div class="row row--equal row--center">
      ${H.figure('ForesightLab-09', { alt: 'The Foresight Lab logo, a three-horizons mark with the third horizon highlighted in red', sizes: SIZES.half })}
      <div>
        <h2 class="h2">The Foresight Lab Logo</h2>
        <div class="prose">
          <p>As the scope of our research grew beyond UC's NEXT Innovation Scholars Program, it became necessary to create a new identity — a visual shorthand for thought leadership that had extended to US Bank, Forum for the Future, and Substack.</p>
          <p>The mark comes from the three-horizons model, a staple of any foresight curriculum. The highlighted red is the third horizon: the emerging far future.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="row row--equal">
      <div>
        <h2 class="h2">SXSW 2026</h2>
        <div class="prose" style="margin-bottom:28px"><p>Before hosting the Forum, the team traveled to SXSW to present our work. We built an experiential showcase where participants completed an innovation passport to enter a drawing — plus twelve kitschy stickers and a madlib activity.</p></div>
        ${H.gallery('sxsw', [
          { img: 'SXSW-1', alt: 'The team at the SXSW showcase' },
          { img: 'SXSW-2', alt: 'Innovation passport and stickers at SXSW' },
          { img: 'SXSW-3', alt: 'Participants at the SXSW booth' },
        ], { cols: 'thumbs', ratio: 'r-11', sizes: SIZES.third })}
      </div>
      <div>
        <h2 class="h2">Undisciplined by Design</h2>
        <div class="prose" style="margin-bottom:28px"><p>In-person engagement is crucial, but online platforms keep the Foresight Lab's stream of content continuous. Key to that is the Undisciplined by Design podcast, which launched on YouTube this year.</p></div>
        ${H.figure('Podcast', { alt: 'Undisciplined by Design podcast video still', sizes: SIZES.half, ratio: 'r-1610' })}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">What are we showcasing?</h2>
      <div class="prose"><p>Two things sit at the core: the driver descriptions on the main posters, and the artifacts — imagined pieces of design someone might encounter in daily life in the future, like this poster series for an "enhanced" Olympic games.</p></div>
    </div>
    ${H.gallery('showcase', [
      { img: 'EnhancedGames-01', alt: 'Enhanced Games poster one' },
      { img: 'EnhancedGames-02', alt: 'Enhanced Games poster two' },
      { img: 'EnhancedGames-03', alt: 'Enhanced Games poster three' },
    ], { cols: 'three', ratio: 'r-23', sizes: SIZES.third })}
    ${H.gallery('showcase', [
      { img: 'image645', alt: 'Artifact from the future' },
      { img: 'Imag1111', alt: 'Artifact from the future' },
      { img: 'image24543', alt: 'Artifact from the future' },
      { img: 'image64345', alt: 'Artifact from the future' },
    ], { cols: 'four', ratio: 'r-11', sizes: SIZES.quarter })}
  </section>`,
  },

  /* 02 ---------------------------------------------------------------- */
  {
    slug: 'kroger-genai',
    oldPath: 'kroger',
    title: "Integrating GenAI into Kroger's Internal Tools",
    shortTitle: 'Joint Price &amp; Promotion GenAI Explainer',
    tags: ['UX/UI Design', 'User Research'],
    color: '#1a8fd6',
    cover: 'Thumbnails-06',
    coverAlt: 'Kroger GenAI explainer interface',
    hero: 'kroger-2',
    question: 'How can we use GenAI to ensure users are as confident in the data science as they are in their own decisions?',
    summary: 'Research and UX for a GenAI explainer inside Kroger’s Joint Price & Promotion optimization tool.',
    meta: { Type: 'UX/UI Design', Date: 'Fall 2025', 'Team Credit': ['Sam Allison', 'Pierce Gohlke', 'Jared Price'], Role: 'Designer &amp; research lead' },
    overview: `<p>Generative AI: a solution looking for a problem. That is not to say that AI is useless, just that much of what has been asked of designers in the past years is how to integrate AI into existing systems. For this project I was tasked with doing just that for Kroger's upcoming Joint Price &amp; Promotion tool. JP&amp;P has a number of features, but for this project the focus was on the promotion calendar optimizer. Essentially, the tool would optimize the best time to have different promotions (ex: buy one, get one). However, user trust and understanding of the tool was low. This might just be a problem that GenAI can solve.</p>`,
    body: (H) => `
  <section class="section">
    <p class="pull">You have been managing Kroger's cereal promotion strategy for over 15 years. You have your own methods, your own team, and at the end of the day it's your neck on the line. Now some new software tool wants to tell you how to do your job. Would you listen?</p>
  </section>

  <section class="section">
    <div class="row">
      <div>
        <h2 class="h2">Can we use GenAI to turn the black box transparent?</h2>
        <div class="prose">
          <p>Every month data optimization science makes Kroger millions of dollars. It's not going anywhere, but is there a way that we can make the process more transparent?</p>
          <p>Traditionally, the data science is a black box. Inputs go in, recommendations come out. However, by using GenAI and AI agents three key metrics can be surfaced to the user.</p>
          <ul>
            <li><strong>WHAT</strong> changes the optimization is suggesting</li>
            <li><strong>WHY</strong> it wants to make those changes</li>
            <li><strong>IMPACT</strong> of those changes</li>
          </ul>
        </div>
      </div>
      ${H.figure('kroger-2', { alt: 'GenAI explainer panel showing what, why and impact for a promotion recommendation', caption: 'The explainer surfaces what, why and impact next to the optimizer’s recommendation.', sizes: SIZES.wide })}
    </div>
  </section>

  <section class="section">
    <p class="pull">"I'm managing a billion dollar business in Excel. It's about time we had something more modern."<small>Real quotes from user research</small></p>
  </section>

  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">Research Objective</h2>
      <div class="prose">
        <p>While this project was beginning, Kroger as an organization was turning away from third-party AI tools to in-house solutions. Therefore, a central requirement of this research was not just how it would aid the JP&amp;P tool, but how it could be applied to all tools.</p>
        <p>Given the enormity of the ask and the limited timeframe, I decided to create three options to test. Option A is a familiar chatbot interface, while options B &amp; C explore presenting pre-generated information to the user.</p>
      </div>
    </div>
    ${H.gallery('kroger-options', [
      { img: 'kroger-1', alt: 'Prototype option: chatbot interface', cap: 'Option A — a familiar chatbot interface.' },
      { img: 'kroger-3', alt: 'Prototype option: pre-generated explanation panel', cap: 'Options B & C — pre-generated information presented to the user.' },
    ], { cols: 'two', ratio: 'r-1610', sizes: SIZES.half })}
    ${H.embed({ src: 'https://embed.figma.com/proto/djqhWYtnHHMjCQgmmA4jKT/AIExplainer?page-id=2001%3A25779&node-id=2139-68943&p=f&viewport=709%2C-615%2C0.15&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2139%3A68943&embed-host=share', title: 'the AI Explainer prototype', label: 'Load the Figma prototype', inSection: true })}
  </section>

  <section class="section">
    <div class="row">
      <h2 class="h2">Research Methods</h2>
      <div class="prose">
        <p>Tests were done 1:1 between the facilitator (myself) and the participant. A notetaker also attended, however they were camera off and silent. All tests were done remotely.</p>
        <p>Users were instructed to click through the prototype while being asked questions about which they preferred, what information was most important to them, and what kinds of questions they would like to ask the chatbot.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="h2">Research Insights</h2>
    <div class="stats stats--4">
      <div class="stat"><p class="stat__n">5<small>of 6</small></p><p class="stat__t">users showed excitement or neutrality towards using an AI tool.</p></div>
      <div class="stat"><p class="stat__n">6<small>of 6</small></p><p class="stat__t">users preferred prototypes that show a pre-generated response without needing to be prompted.</p></div>
      <div class="stat"><p class="stat__n">3<small>of 6</small></p><p class="stat__t">users asked for the ability to compare optimized plans to plans from last year.</p></div>
      <div class="stat"><p class="stat__n">5<small>of 6</small></p><p class="stat__t">preferred highly detailed responses that directly cited metrics.</p></div>
    </div>
  </section>`,
  },

  /* 03 ---------------------------------------------------------------- */
  {
    slug: 'polaris-api-designer',
    oldPath: 'futures',
    title: 'Designing an API Creator for Developers with 84.51°',
    shortTitle: 'Polaris API Designer',
    tags: ['UX/UI Design', 'User Research'],
    color: '#6a3ff0',
    cover: 'Thumbnails-05',
    coverAlt: 'Polaris API Designer interface',
    hero: 'polaris-hero',
    question: "How do we help developers build better APIs faster?",
    summary: 'UX and research for Polaris, an API design tool for developers and non-developers at 84.51°.',
    meta: { Type: 'UX/UI Design', Date: 'Fall 2024', 'Team Credit': 'Joshua Smith', Role: 'UX designer &amp; researcher' },
    overview: `<p>As a data analytics company, 84.51° profits off the development of APIs. However there's a problem. API developers at the company each have their own process to build an API, which results in a lack of standards, which in turn results in a subpar product. Polaris is an API creator tool designed to make it easier for developers and non-developers alike to build APIs. The Polaris API Designer is just one part of the tool that lets developers mock up and share API designs before they have to write a single line of code.</p>`,
    body: (H) => `
  <section class="section">
    <p class="pull">Going from "I'm in Hell" to "That would be dope as Hell."<small>Real quotes from user research</small></p>
  </section>

  <section class="section">
    <div class="row">
      <h2 class="h2">So what even is an API…?</h2>
      <div class="prose">
        <p>An API is an Application Programming Interface. Does that clear things up? Probably not — it took me a while to get a handle on what APIs are and how they drive revenue.</p>
        <p>To help understand what an API is in the context of this project, I've developed the soda fountain metaphor. 84.51° employees are masters of working with data, just as Coca-Cola employees are masters of making soda. The customer, however, doesn't care about what's going on behind the scenes. They just want to get their nice filtered Kroger shopping data, or cup of Diet Coke, when they ask for it.</p>
        <p>That's when the API comes in. It's a contract of code between us and the customer. You pay and put your cup under Minute Maid and you'll get lemonade. You send us this message and you'll get this array of data.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="h2">The Problem: At 84.51° API development is…</h2>
    <div class="stats">
      <div class="stat stat--wordy"><p class="stat__n">Fractured</p><p class="stat__t">Each developer has their own process and standard of API development, which makes collaboration difficult.</p></div>
      <div class="stat stat--wordy"><p class="stat__n">Slow</p><p class="stat__t">The time to build APIs for customers is much slower than the competition, which is leaving revenue on the table.</p></div>
      <div class="stat stat--wordy"><p class="stat__n">Repetitive</p><p class="stat__t">Each time a new API is built it requires timely, boilerplate steps — such as creating a GitHub repo — that could be easily automated.</p></div>
    </div>
  </section>

  <section class="section">
    <div class="row row--end mb">
      <div>
        <p class="label">Initial research question</p>
        <h2 class="h2" style="margin-bottom:0">What steps do 84.51° developers take to build an API?</h2>
      </div>
      <div class="prose"><p>Before designing anything, I mapped how developers actually build an API today — every step, hand-off and workaround — then synthesized the interviews into themes.</p></div>
    </div>
    ${H.figure('polaris-workflow', { alt: 'Workflow map of the steps developers take to build an API at 84.51°', caption: 'The current-state API development workflow.', sizes: SIZES.full })}
    <div style="height:12px"></div>
    ${H.gallery('stickies', Array.from({ length: 10 }, (_, i) => ({ img: `polaris-sticky-${i + 1}`, alt: `Research synthesis sticky note ${i + 1}` })), { cols: 'five', ratio: 'r-11', sizes: SIZES.fifth })}
  </section>

  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">The Polaris API Designer</h2>
      <div class="prose"><p>A tool for developers and non-developers alike to design, mock, and share APIs.</p></div>
    </div>
    <div class="gallery gallery--three contain">
      <div>${H.pic('polaris-logo-1', { alt: 'Polaris logo exploration one' })}</div>
      <div>${H.pic('polaris-logo-2', { alt: 'Polaris logo exploration two' })}</div>
      <div>${H.pic('polaris-logo-3', { alt: 'Polaris logo exploration three' })}</div>
    </div>
    ${H.embed({ src: 'https://embed.figma.com/proto/Gf25iZhtqCYasXtYxz4QNj/Emergency-Local-Prototype?page-id=0%3A1&node-id=1-8460&viewport=1663%2C923%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A8460&embed-host=share', title: 'the Polaris API Designer prototype', label: 'Load the Figma prototype', inSection: true })}
  </section>

  <section class="section">
    <div class="row row--equal">
      <div>
        <h2 class="h2">Usability Testing</h2>
        <div class="prose">
          <h3>Research question</h3>
          <p>Are users of the Polaris API Designer able to discover and use all the features that the platform provides?</p>
          <h3>Research methods</h3>
          <p>At the beginning of the engagement, participants are told that after they have time to explore the prototype the researcher will ask them to explain what the Polaris API Designer does to help a user build better APIs faster. They have as much time as they would like to explore the prototype. The researcher has their camera on but is watching, and can answer questions. Afterwards the participant is asked, "Explain to me what the Polaris API Designer is capable of." Their responses are graded against a rubric.</p>
        </div>
      </div>
      <div>
        <h2 class="h2">Value Testing</h2>
        <div class="prose">
          <h3>Research question</h3>
          <p>Are the features of the Polaris API Designer the features that our developers need to create better APIs faster?</p>
          <h3>Research methods</h3>
          <p>After the usability testing, the participant is asked if they would be willing to join the beta program for early access. In exchange, we ask them to participate in further opportunities to give feedback. Finally, participants are asked if they could give the names of three people the research could send additional meeting invites to.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="h2">Testing Highlights</h2>
    <div class="stats">
      <div class="stat"><p class="stat__n">100%</p><p class="stat__t">of the 1-on-1 participants were able to identify and understand the scorecard, reusable library, and publishing features.</p></div>
      <div class="stat"><p class="stat__n">100%</p><p class="stat__t">of the 1-on-1 participants were not just interested but excited about joining a beta program.</p></div>
      <div class="stat"><p class="stat__n">88%<small>± 10.69%</small></p><p class="stat__t">of asynchronous participants in technical roles were open to joining a beta program.</p></div>
    </div>
  </section>`,
  },

  /* 04 ---------------------------------------------------------------- */
  {
    slug: 'future-creators-report',
    oldPath: 'old-home',
    title: '2026 Future Creators Report',
    shortTitle: '2026 Future Creators Report<br>and Beyond',
    tags: ['Strategic Foresight'],
    color: '#3c3a36',
    heroColor: '#1c1c1c',
    cover: 'Thumbnails-09',
    coverAlt: 'Future Creators Report cover',
    hero: 'fcr-hero',
    question: 'How do we prepare for the future when tomorrow is impossible to predict?',
    summary: 'The Foresight Lab’s annual strategic foresight publication, designed by Yale Miller.',
    meta: { Type: 'Strategic Foresight', Date: '2023 – 2026', 'Team Credit': 'NEXT Innovation Scholars', Role: 'Designer &amp; researcher' },
    overview: `<p>The Future Creators Report is an annual publication put out by the University of Cincinnati's Foresight Lab. It encompasses a full year of strategic foresight research done by the student team, including "artifacts from the future." These artifacts capture what it would feel like to live in any of these theorized possible futures. The Spring 2026 edition was designed by Yale Miller.</p>`,
    body: (H) => `
  ${H.embed({ src: 'https://e.issuu.com/embed.html?d=horizon_shift_volume_003_future_creators_report&u=uc_next_innovation_scholars', title: 'Horizon Shift, Volume 003 — the Future Creators Report', label: 'Read the report', poster: 'fcr-futures-page', link: 'https://issuu.com/uc_next_innovation_scholars/docs/horizon_shift_volume_003_future_creators_report' })}

  <section class="section">
    <p class="pull">The goal of our work is not to predict the future. It is to imagine day-to-day life in any number of possible futures that current trends could produce.</p>
  </section>

  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">The Foresight Lab</h2>
      <div class="prose">
        <p>The University of Cincinnati is one of three institutions in the United States that has a strategic foresight program at the undergraduate level. It's also the newest. The Foresight Lab is an evolving and rapidly growing program that has continually redefined itself over the five years it has existed. Besides the Future Creators Report, the Lab puts on an annual forum to present its findings live.</p>
        <p>This year the posters for the event were designed by Yale Miller alongside the project lead Yasmine Shaban.</p>
      </div>
    </div>
    ${H.gallery('lab', [
      { img: 'fcr-1', alt: 'Futures Forum poster and event material' },
      { img: 'fcr-2', alt: 'Futures Forum poster and event material' },
      { img: 'fcr-3', alt: 'Futures Forum poster and event material' },
      { img: 'fcr-4', alt: 'Futures Forum poster and event material' },
    ], { cols: 'four', ratio: 'r-43', sizes: SIZES.quarter })}
  </section>

  <section class="section">
    <div class="row row--center">
      <div>
        <h2 class="h2">Undisciplined by Design</h2>
        <div class="prose">
          <p>The Undisciplined by Design podcast is another arm of the Foresight Lab. Host Aaron Bradley and editor Max Kemats interview some of the biggest names in design and innovation. All the branding elements of the podcast were designed by Yale Miller.</p>
          <p>Check it out on Apple Podcasts, Spotify, and — new with season 3 — full-length video interviews on YouTube.</p>
        </div>
      </div>
      ${H.figure('fcr-undisciplined', { alt: 'Undisciplined by Design podcast branding', sizes: SIZES.wide })}
    </div>
  </section>

  <section class="tinted">
    <div class="row row--center">
      <div>
        <h2 class="h2">So what exactly is strategic foresight?</h2>
        <div class="prose"><p>Predicting the future is impossible, but that is not the goal of strategic foresight. Rather, strategic foresight is the practice of analyzing budding trends and fringe markets in order to imagine not the future, but possible futures. By imagining what the worst and best tomorrow would look like, we can then make actionable recommendations to achieve that best future.</p></div>
      </div>
      ${H.figure('fcr-three-horizons', { alt: 'The three-horizons model diagram', caption: 'The three-horizons model.', sizes: SIZES.wide, contain: true })}
    </div>
  </section>

  <section class="section">
    <div class="row">
      <h2 class="h2">Step 1: Landscape Analysis</h2>
      <div class="prose"><p>Every strategic foresight project begins with a research deep dive. What the team is searching for are leading indicators, the budding trends that could lead to real impact. In order to get to that point, the team has to sort through hundreds of surface-level articles in order to get an accurate picture of the now, then find those small pockets of the future. In the words of science fiction author William Gibson: "The future is already here. It's just not evenly distributed."</p></div>
    </div>
  </section>

  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">Step 2: Developing Drivers</h2>
      <div class="prose"><p>The real deliverable of a strategic foresight report are the drivers. Drivers are cumulative forces that will drive change in the coming years, hence the name. When a common thread can be drawn between enough leading indicators, that's when a driver gets created.</p></div>
    </div>
    <div class="gallery gallery--three r-43 contain">
      <figure>${H.pic('fcr-driver-headline', { alt: 'A driver headline from the report', sizes: SIZES.third })}<figcaption><strong>The Headline.</strong> Helping the reader envision a possible future starts with the first word. That's why driver names are always written like catchy headlines.</figcaption></figure>
      <figure>${H.pic('fcr-driver-impact', { alt: 'Societal impact section of a driver', sizes: SIZES.third })}<figcaption><strong>Societal Impact.</strong> Here the team imagines the possible impacts that a chosen driver could have on different industries.</figcaption></figure>
      <figure>${H.pic('fcr-driver-indicators', { alt: 'Leading indicators section of a driver', sizes: SIZES.third })}<figcaption><strong>Leading Indicators.</strong> Drivers are not just a collection of anecdotal evidence. They are the result of intensive landscape research — the specific sources that act as proof that a driver is having or will have significant impact.</figcaption></figure>
    </div>
  </section>

  <section class="section">
    <div class="row">
      <h2 class="h2">Step 3: Artifact Creation</h2>
      <div class="prose"><p>The goal of a strategic foresight report is to help the reader imagine the world of the future. Not just the sweeping changes, but what day-to-day life would be like for the individual. We build these worlds through the creation of "artifacts from the future." These artifacts range anywhere from podcasts to posters to art to a writing piece like the one shown here.</p></div>
    </div>
  </section>

  <section class="tinted">
    <p class="tinted__intro">You-logy</p>
    <div class="row row--equal">
      <div class="prose">
        <p>"She's the one," said Mark, pacing around the couch. The ring in his hand had grown warm from his fidgeting. "It feels insane to say that out loud."</p>
        <p>"I remember when you first met her," his Dad said. The profile picture on the TV was programmed to bob up and down with the cadence of his voice, but John Davis knew only one way to speak: loud and confident. That meant the static image mostly just hung at the top of the screen, falling when his Dad finally took a breath. "You called me up and heck, I could hardly get a word in. That must've been what? Three years ago?"</p>
        <p>"Yeah, three years. Hard to believe," said Mark. "Even then I knew I was going to marry her. I just thought I wouldn't be this nervous."</p>
        <p>"You think I wasn't nervous when I asked your mother? I changed my shirt halfway through dinner!" his Dad said. "But when it came time to ask if she would spend the rest of her life with me, I don't think I felt anything but certain."</p>
        <p>Mark sank into the couch while his father continued to tell the story of the engagement. How Mark was part of the picture before there was a ring. The hasty wedding planning and the even hastier wedding. Mark had heard the same story every year on his parents' anniversary. His Dad had it memorized to the beat. He knew when to pause for effect, what jokes to tell when, and at what point Mark's mother would get teary. This time, however, he told it just plain. Mark took a deep breath.</p>
      </div>
      <div class="prose">
        <p>"I love you, Dad," he said, placing the ring back in its case.</p>
        <p>"I lov—"</p>
        <p>"You've reached your monthly limit of conversations with John Davis. Would you like to purchase another 20 minutes?"</p>
        <p>"No, it's ok. Go ahead and shut off," Mark said. The screen flashed a logo, <em>You-logy: A world beyond goodbye</em>, then dimmed to black.</p>
        <p>Years ago, when the death of his father still hung over his life with a thick gloom, these conversations always left Mark with a chill. A primeval warning echoed through him that the man, the thing, on the other end was not his real Dad. The man was dead, but the data lived on. In life this digital revenant had been sold to advertisers eager to know what kind of lawn mower a man like John Davis buys. In death, it continued to turn a profit as a monthly subscription service for grieving families.</p>
        <p>Mark now scarcely paid a second thought to the details. And why would he? Seven years of postmortem conversations had given the model ample data to turn John Davis into the father he never quite was in life.</p>
      </div>
    </div>
  </section>`,
  },

  /* 05 ---------------------------------------------------------------- */
  {
    slug: 'ej-gallo',
    oldPath: 'ej-gallo',
    title: 'The Future of Wine with EJ Gallo',
    tags: ['Consumer Insights'],
    color: '#2e7d3a',
    cover: 'Thumbnails-08',
    coverAlt: 'EJ Gallo consumer insights presentation',
    hero: 'gallo-hero',
    question: 'What is the future of wine for LDA consumers?',
    summary: 'Fifty interviews in two weeks: consumer insights on legal-drinking-age wine drinkers for EJ Gallo Winery.',
    meta: { Type: 'Consumer Insights', Date: 'Summer 2023', 'Team Credit': ['Akash Khanikor', 'Himanshu Kaushik', 'Maxwell Kemats', 'Cara Baah-Binney', 'Caroline Berger'], Role: 'Researcher &amp; presenter' },
    overview: `<p>In summer of 2023 EJ Gallo Winery approached the NEXT Innovation Scholars with a simple ask: we want you to find the future of wine for LDA consumers. The catch? They need it in two weeks. What followed was 50 user interviews, hours of digging through insights, and a very late night putting together a final presentation. The team presented to EJ Gallo at their headquarters in Modesto, California, then ran a workshop with their team.</p>`,
    body: (H) => `
  <section class="section">
    ${H.figure('gallo-hero', { alt: 'EJ Gallo brand portfolio', caption: 'Alongside wine brands like Barefoot, EJ Gallo also owns a number of other popular brands in the alcohol category.', sizes: SIZES.full, ratio: 'r-169' })}
  </section>

  <section class="section">
    <div class="row">
      <h2 class="h2">The Brief</h2>
      <div class="prose">
        <p>In two weeks:</p>
        <ul>
          <li>…collect relevant data and extract valuable insights around wine consumption amongst the Legal Drinking Age (LDA) [21–25] consumer</li>
          <li>…explore motivations, barriers/tensions, preferences, and decision-making factors that influence LDA consumers</li>
          <li>…interview at least 50 LDA consumers of a diverse background</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">The Presentation</h2>
      <div class="prose">
        <p>The team had the opportunity to present our work at EJ Gallo's headquarters in Modesto, California. We then ran a workshop with EJ Gallo employees to create ideas from our insights.</p>
        <p>Our insights were divided into four main groups: the current state of LDA drinking, LDA consumption &amp; perception of wine, barriers to the wine category, and LDA consumer desires.</p>
      </div>
    </div>
    ${H.figure('gallo-presentation', { alt: 'The team presenting at EJ Gallo headquarters in Modesto', caption: 'Left to right: Caroline Berger, Akash Khanikor, Yale Miller, Max Kemats, Himanshu Kaushik.', sizes: SIZES.full })}
  </section>

  ${[
    ['The Current State of LDA Drinking', 'gallo-current-1', 'gallo-current-2'],
    ['LDA Consumption &amp; Perception of Wine', 'gallo-perception-1', 'gallo-perception-2'],
    ['Barriers to the Wine Category', 'gallo-barriers-1', 'gallo-barriers-2'],
    ['LDA Consumer Desires', 'gallo-desires-1', 'gallo-desires-2'],
  ].map(([h, a, b]) => `
  <section class="section">
    <h2 class="h2">${h}</h2>
    ${H.gallery('gallo-' + a.split('-')[1], [
      { img: a, alt: h.replace(/&amp;/g, '&') + ' — insight slide one', cap: h.replace(/&amp;/g, '&') },
      { img: b, alt: h.replace(/&amp;/g, '&') + ' — insight slide two', cap: h.replace(/&amp;/g, '&') },
    ], { cols: 'two', ratio: 'r-169', sizes: SIZES.half })}
  </section>`).join('')}`,
  },

  /* 06 ---------------------------------------------------------------- */
  {
    slug: 'next-new-deal',
    oldPath: 'the-next-new-deal',
    title: 'Building a Strategic Plan for the NEXT Innovation Scholars',
    shortTitle: 'The NEXT New Deal',
    tags: ['Strategy'],
    color: '#1c1c1c',
    cover: 'Thumbnails-04',
    coverAlt: 'NEXT Innovation Scholars annual report',
    hero: 'nis-group',
    question: 'How can the NEXT Innovation Scholars grow while keeping our identity?',
    summary: 'A strategic plan for the NEXT Innovation Scholars, developed as a Stanford University Innovation Fellows project.',
    meta: { Type: 'Strategy', Date: '2023 – 2026', 'Team Credit': ['Caroline Berger', 'Max Kemats'], Role: 'Strategist &amp; designer' },
    overview: `<p>The NEXT Innovation Scholars Program (NIS) started with a cohort of just 10 students back in 2021. Now, the program is on track to have 100 students. This growth is a significant mark of the program's success, but it also presents a challenge. How does NIS preserve its culture and continue to deliver excellence in the face of such change? As their project for Stanford's University Innovation Fellows Program, students Caroline Berger, Max Kemats, and Yale Miller developed and implemented a new strategic plan for NIS. The plan's name? The NEXT New Deal.</p>`,
    body: (H) => `
  <section class="section">
    <div class="row row--end mb">
      <h2 class="h2">Who are the NEXT Innovation Scholars?</h2>
      <div class="prose">
        <p>NIS is the University of Cincinnati's premiere design thinking and innovation scholarship program. Each year the program accepts a cohort of 10 to 15 new students from any college or major. Multidisciplinary teams are at the core of everything NIS does.</p>
        <p>Students in the program participate in at least one project each semester. Many of these projects are with outside commercial partners such as P&amp;G, KAO Brands, King Records, and more. Others are insights projects or strategic foresight reports that exist solely within the University ecosystem.</p>
        <p>Want to know all about the NEXT Innovation Scholars? Check out the two annual reports I designed below to see a detailed account of all that we do.</p>
      </div>
    </div>
    <div class="row row--equal">
      <div>${H.embed({ src: 'https://e.issuu.com/embed.html?d=2024-2025_next_innovation_scholars_annual_report&u=uc_next_innovation_scholars', title: 'the 2024–2025 Annual Report', label: 'Read the 2024–2025 Annual Report', inSection: true, link: 'https://issuu.com/uc_next_innovation_scholars/docs/2024-2025_next_innovation_scholars_annual_report' })}</div>
      <div>${H.embed({ src: 'https://e.issuu.com/embed.html?d=next_innovation_scholars_annual_report&u=uc_next_innovation_scholars', title: 'the 2023–2024 Annual Report', label: 'Read the 2023–2024 Annual Report', inSection: true, link: 'https://issuu.com/uc_next_innovation_scholars/docs/next_innovation_scholars_annual_report' })}</div>
    </div>
  </section>

  <section class="section">
    <div class="row row--center">
      <div>
        <h2 class="h2">And who are the University Innovation Fellows?</h2>
        <div class="prose"><p>Lots of innovation and acronyms, but I assure you these are two different programs! While the NEXT Innovation Scholars is a program within the University of Cincinnati, the University Innovation Fellows is a global fellowship created and run by Stanford's d.school. I was accepted into the 2024 cohort alongside my fellow UC students Max Kemats and Caroline Berger. Each UIF team completes a year-long project then travels to the Netherlands to share their work at a conference.</p></div>
      </div>
      ${H.figure('uif-launch', { alt: 'University Innovation Fellows launch, 2023', sizes: SIZES.wide })}
    </div>
  </section>`,
  },

  /* 07 ---------------------------------------------------------------- */
  {
    slug: 'pg',
    oldPath: 'pg',
    title: 'Redesigning Iconic Brands for the Modern Consumer with P&amp;G (NDA)',
    shortTitle: 'Redesigning Iconic Brands for the Modern Consumer',
    tags: ['User Research', 'Graphic Design'],
    color: '#0a4a9e',
    cover: 'Untitled-2-01',
    coverAlt: 'P&G project cover',
    hero: null,
    question: 'How might iconic brands earn their place with the modern consumer?',
    summary: 'User research and graphic design for Procter & Gamble. Details are under NDA.',
    meta: { Type: ['User Research', 'Graphic Design'], Partner: 'Procter &amp; Gamble', Status: 'Under NDA' },
    overview: `<p>This project was completed under a non-disclosure agreement with Procter &amp; Gamble, so the work itself can't be shown here. It combined user research with graphic design to rethink how a set of iconic brands present themselves to today's consumer.</p>`,
    body: () => `
  <section class="section">
    <div class="nda__box">
      <h2 class="h2">Under NDA</h2>
      <div class="prose">
        <p>I'm happy to walk through the process, my role, and what I learned in a conversation. Reach out on <a href="https://www.linkedin.com/in/yale-miller/" target="_blank" rel="noopener" style="text-decoration:underline">LinkedIn</a> and I'll set something up.</p>
      </div>
    </div>
  </section>`,
  },

  /* 08 ---------------------------------------------------------------- */
  {
    slug: 'bts',
    oldPath: 'bts',
    title: 'Preparing for the Future of Consulting in the Age of AI with BTS (NDA)',
    shortTitle: 'Preparing for the Future of Consulting in the Age of AI',
    tags: ['Strategy'],
    color: '#7a5a2a',
    cover: 'Untitled-2-02',
    coverAlt: 'BTS project cover',
    hero: null,
    question: 'How does a consultancy prepare for a future where AI does the analysis?',
    summary: 'Strategy work with BTS on the future of consulting in the age of AI. Details are under NDA.',
    meta: { Type: 'Strategy', Partner: 'BTS', Status: 'Under NDA' },
    overview: `<p>This project was completed under a non-disclosure agreement with BTS, so the work itself can't be shown here. It was a strategy engagement exploring how consulting practice, talent, and offerings need to change as AI takes on more of the analytical work.</p>`,
    body: () => `
  <section class="section">
    <div class="nda__box">
      <h2 class="h2">Under NDA</h2>
      <div class="prose">
        <p>I'm happy to walk through the process, my role, and what I learned in a conversation. Reach out on <a href="https://www.linkedin.com/in/yale-miller/" target="_blank" rel="noopener" style="text-decoration:underline">LinkedIn</a> and I'll set something up.</p>
      </div>
    </div>
  </section>`,
  },

  /* 09 ---------------------------------------------------------------- */
  {
    slug: 'workshops',
    oldPath: 'workshops',
    title: 'Building and Facilitating Design Thinking Workshops',
    shortTitle: 'Workshop Design &amp; Facilitation',
    tags: ['Design Thinking', 'Workshop Facilitation'],
    color: '#d98a1a',
    cover: 'Thumbnails-03',
    coverAlt: 'Design thinking workshop in progress',
    hero: 'SXSW-1',
    question: 'How do we teach design thinking in a way that makes it valuable?',
    summary: 'Workshops designed and facilitated for Fordham University, UC Honors, the GraphUC Hackathon and more.',
    meta: { Type: ['Facilitation', 'Design Thinking'], Date: '2022 to present', 'Team Credit': 'NEXT Innovation Scholars', Role: 'Designer &amp; facilitator' },
    overview: `<p>Design thinking is at best a vague concept and at worst intentionally confusing. However, when an audience can be taught in a way that is specific to them, design thinking can become a major unlock without a major cost of resources. The number one question that must be asked when designing any workshop is: how does this lesson help the audience do what they do better? Below are just a few of the workshops I have helped design and facilitate.</p>`,
    body: () => `
  <section class="section">
    ${[
      ['Fordham University', 'How to Conduct a User Interview', 'Fordham Masters of Business students', 'Fordham University in New York City',
        `<p>NEXT Innovation Scholars Sophia Lammi, Charlie Harker, and myself traveled to New York with our Program Director Aaron Bradley and our Program Manager Sydney Myers to teach a workshop to Fordham business students. This was just one part of our continuous partnership with Fordham professors Bozena Mierzejewska and Axel Roepnack.</p>`],
      ['University Honors Design Thinking Modules', 'An Introduction to Design Thinking', 'University Honors freshmen', 'The University of Cincinnati',
        `<p>A team of students and I were asked to design a workshop to introduce design thinking and then facilitate it with twelve sections of the Honors Gateway class. Teaching the honors classes can be difficult, notably because the class is all first-semester freshmen and only an hour long. These were both key constraints we had to design around when we were developing the workshop.</p>`],
      ['GraphUC Hackathon', 'Becoming Problem-Obsessed with Design Thinking', 'Hackathon participants', 'The University of Cincinnati',
        `<p>The GraphUC Hackathon is a blockchain-focused hackathon held in the fall at the University of Cincinnati. During the day they hold numerous different workshops that students can attend. I was asked by the organizers to design and facilitate a design thinking workshop with the goal of helping students come up with an idea for their hackathon project.</p>`],
      ['DASHIE Landscape Analysis', 'Landscape Analysis in a University Setting', 'University students', 'The University of Cincinnati',
        `<p>As part of my work with Stanford's University Innovation Fellows, my team was looking to do a STEEP analysis with current students. A STEEP analysis — Social, Technology, Economic, Environmental, and Political — is meant to help rapidly generate trends, insights, and observations. However, our group found that when analyzing the landscape of higher education, STEEP does not apply as well. So instead we developed DASHIE — Diversity &amp; Inclusion, Academics, Social, Health, Innovation, and Entrepreneurship — to act as a new set of categories. We then led an ideation workshop with thirty students.</p>`],
    ].map(([name, topic, audience, location, body], i) => `
    <div class="ws"${i === 0 ? ' style="border-top:0;padding-top:0;margin-top:0"' : ''}>
      <div>
        <h2 class="h2" style="margin-bottom:0">${name}</h2>
        <div class="ws__facts">
          <span><b>Topic</b> — ${topic}</span>
          <span><b>Audience</b> — ${audience}</span>
          <span><b>Location</b> — ${location}</span>
        </div>
      </div>
      <div class="prose">${body}</div>
    </div>`).join('')}
  </section>`,
  },
];
