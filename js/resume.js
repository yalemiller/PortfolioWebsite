/* Resume page: draws the PDF onto the page with pdf.js so it shows inline everywhere, including
   phones whose browsers won't display a PDF in a frame. Re-draws when the column width changes and
   keeps a plain-text copy for screen readers. If pdf.js can't load, falls back to the browser's
   own PDF viewer in a frame. */
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.624/';

const box = document.querySelector('[data-resume]');
if (box) show(box).catch(() => fallback(box));

async function show(box) {
  const pdfjs = await import(`${PDFJS}pdf.min.mjs`);
  pdfjs.GlobalWorkerOptions.workerSrc = `${PDFJS}pdf.worker.min.mjs`;
  const doc = await pdfjs.getDocument(box.dataset.src).promise;
  const pages = [];
  for (let n = 1; n <= doc.numPages; n++) pages.push(await doc.getPage(n));

  const holder = box.querySelector('.resume__pages');
  const canvases = pages.map((page) => {
    const { width, height } = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    canvas.className = 'resume__page';
    canvas.style.aspectRatio = `${width} / ${height}`;
    canvas.setAttribute('aria-hidden', 'true');
    return canvas;
  });
  holder.replaceChildren(...canvases);

  // Draw at least 2x the on-screen size so pinch-zooming on a phone stays sharp.
  let drawnWidth = 0, tasks = [];
  const draw = async () => {
    const cssWidth = holder.clientWidth;
    if (!cssWidth || cssWidth === drawnWidth) return;
    drawnWidth = cssWidth;
    tasks.forEach((t) => t.cancel());
    const density = Math.max(2, window.devicePixelRatio || 1);
    tasks = pages.map((page, i) => {
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: Math.min(cssWidth * density, 2600) / base.width });
      const canvas = canvases[i];
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      return page.render({ canvas, canvasContext: canvas.getContext('2d'), viewport });
    });
    await Promise.all(tasks.map((t) => t.promise.catch(() => {})));
  };
  await draw();
  let timer;
  new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(draw, 150); }).observe(holder);

  // The page is already showing; a failure here shouldn't swap it for the fallback frame.
  Promise.all(pages.map((page) => page.getTextContent()))
    .then((contents) => {
      box.querySelector('.resume__text').textContent = contents
        .map((c) => c.items.map((item) => item.str + (item.hasEOL ? '\n' : ' ')).join(''))
        .join('\n\n');
    })
    .catch(() => {});
}

function fallback(box) {
  const frame = document.createElement('iframe');
  frame.className = 'resume__frame';
  frame.src = box.dataset.src;
  frame.title = "Yale Miller's resume (PDF)";
  box.querySelector('.resume__pages').replaceChildren(frame);
}
