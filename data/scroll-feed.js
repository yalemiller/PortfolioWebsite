'use strict';

// Newest first. Replace the examples with your own selections.
// img/poster: key from assets/img/manifest.json; src: local path or HTTPS URL.
// Optional on every post: note, credit, url, date (YYYY-MM-DD), demo.
module.exports = {
  intro: 'A few things worth stopping the scroll for. Images, videos, words, and whatever else catches my attention.',
  items: [
    { type: 'image', title: 'An image worth a closer look', img: 'eph-20',
      alt: 'City shot illustration from the existing Ephemera collection',
      credit: 'From the existing Ephemera collection', url: '/ephemera/',
      note: 'Example image post. This is where you can add a sentence about why you saved something.', demo: true },
    { type: 'quote', text: 'A small collection of things that make you pause.',
      credit: 'Original placeholder text',
      note: 'Example quote post. Replace this with a quote and credit its author.', demo: true },
    { type: 'video', title: 'Something to watch', provider: 'vimeo', id: '1193631683',
      poster: 'Thumbnails-07', credit: 'Existing Futures Forum project video',
      url: '/projects/futures-forum/',
      note: 'Example video post, using the video already featured on this site.', demo: true },
    { type: 'text', title: 'A thought between the links',
      text: 'Not everything needs an image. A question, a short observation, or a thought you keep coming back to can live here too.', demo: true },
    { type: 'link', title: 'A rabbit hole to follow', url: '/ephemera/',
      text: 'A link can be a post of its own: an article, a song, a website, or something you want someone else to discover.',
      credit: 'Example link to the existing Ephemera page', demo: true },
    { type: 'image', title: 'One more thing before you go', img: 'eph-03',
      alt: 'Three-poster series from the existing Ephemera collection',
      credit: 'From the existing Ephemera collection', url: '/ephemera/', demo: true },
  ],
};
