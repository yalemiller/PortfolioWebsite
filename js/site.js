/* yalemiller.com — vanilla JS, no dependencies.
   Typewriter, phone menu, lightbox, click-to-load video, carousels, year tabs and the expanding
   story. Components inside an element can be (re)initialised with window.YM.init(el). */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  /* ---------------- Typewriter ---------------- */
  var tw = document.querySelector('[data-typewriter]');
  if (tw) {
    var phrases;
    try { phrases = JSON.parse(tw.getAttribute('data-typewriter')); } catch (e) { phrases = []; }
    var typed = tw.querySelector('.typewriter__typed');
    var ghost = tw.querySelector('.typewriter__ghost');

    if (phrases.length && typed && ghost) {
      if (reduceMotion) {
        typed.textContent = phrases[0];
        ghost.textContent = '';
      } else {
        var p = 0, i = 0, deleting = false, timer;
        var render = function () {
          var full = phrases[p];
          typed.textContent = full.slice(0, i);
          // The whole phrase stays in the DOM so its line breaks are fixed from the first
          // keystroke; the untyped characters are transparent.
          ghost.textContent = full.slice(i);
        };
        var tick = function () {
          var full = phrases[p];
          if (!deleting) {
            i++;
            render();
            if (i >= full.length) { deleting = true; timer = setTimeout(tick, 1800); return; }
            timer = setTimeout(tick, 70);
          } else {
            i--;
            render();
            if (i <= 0) { deleting = false; p = (p + 1) % phrases.length; render(); timer = setTimeout(tick, 400); return; }
            timer = setTimeout(tick, 35);
          }
        };
        render();
        timer = setTimeout(tick, 600);
        document.addEventListener('visibilitychange', function () {
          clearTimeout(timer);
          if (!document.hidden) timer = setTimeout(tick, 300);
        });
      }
    }
  }

  /* ---------------- Scroll lock + focus trap ---------------- */
  var lockCount = 0;
  function lockBody(on) {
    lockCount = Math.max(0, lockCount + (on ? 1 : -1));
    document.body.classList.toggle('is-locked', lockCount > 0);
  }
  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  function trapFocus(container, e) {
    var items = Array.prototype.filter.call(container.querySelectorAll(FOCUSABLE), function (el) {
      return !el.hidden && el.offsetParent !== null;
    });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------- Phone menu ---------------- */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('site-menu');
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') !== 'true';
      setMenu(open);
      if (open) menu.querySelector('a').focus();
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 821px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---------------- Lightbox ---------------- */
  var lb = document.querySelector('[data-lightbox]');
  if (lb) {
    var lbImg = lb.querySelector('.lightbox__img');
    var lbCap = lb.querySelector('.lightbox__cap');
    var lbCount = lb.querySelector('.lightbox__count');
    var lbClose = lb.querySelector('.lightbox__close');
    var lbPrev = lb.querySelector('.lightbox__prev');
    var lbNext = lb.querySelector('.lightbox__next');
    var group = [], index = 0, lbLastFocus = null;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };

    var show = function () {
      var btn = group[index];
      var img = btn.querySelector('img') || {};
      var cap = btn.getAttribute('data-caption') || '';
      lbImg.src = btn.getAttribute('data-full') || img.currentSrc || '';
      lbImg.alt = cap || img.alt || '';
      lbCap.textContent = cap;
      var multi = group.length > 1;
      lbCount.textContent = multi ? pad(index + 1) + ' / ' + pad(group.length) : '';
      lbPrev.hidden = !multi;
      lbNext.hidden = !multi;
    };
    var openLb = function (btn) {
      var name = btn.getAttribute('data-gallery') || '';
      group = name ? Array.prototype.slice.call(document.querySelectorAll('[data-gallery="' + name + '"]')) : [btn];
      index = Math.max(0, group.indexOf(btn));
      lbLastFocus = btn;
      lb.setAttribute('data-open', 'true');
      lockBody(true);
      show();
      lbClose.focus();
    };
    var closeLb = function () {
      if (lb.getAttribute('data-open') !== 'true') return;
      lb.setAttribute('data-open', 'false');
      lbImg.removeAttribute('src');
      lockBody(false);
      if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
    };
    var step = function (d) {
      if (group.length < 2) return;
      index = (index + d + group.length) % group.length;
      show();
    };

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-gallery], [data-zoom]');
      if (btn) { e.preventDefault(); openLb(btn); }
    });
    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', function () { step(-1); });
    lbNext.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) {
      // Clicking the backdrop closes; clicks on the image and controls don't.
      if (e.target === lb || e.target.classList.contains('lightbox__stage') || e.target === lbCap) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (lb.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') { e.preventDefault(); closeLb(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'Tab') { trapFocus(lb, e); }
    });
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------------- Click-to-load video ----------------
     The player iframe isn't created until the visitor presses play. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-video] .cs-video__btn');
    if (!btn) return;
    var box = btn.closest('[data-video]');
    var id = box.getAttribute('data-video-id');
    var iframe = document.createElement('iframe');
    iframe.src = box.getAttribute('data-video') === 'youtube'
      ? 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0'
      : 'https://player.vimeo.com/video/' + id + '?autoplay=1&dnt=1';
    iframe.title = box.getAttribute('data-video-title') || 'Video';
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    box.setAttribute('data-loaded', 'true');
    box.innerHTML = '';
    box.appendChild(iframe);
  });

  /* ---------------- Carousels ----------------
     Crossfade every 4.5s; a dot jumps to its slide and restarts the timer. Hidden carousels
     (inactive tabs) stay paused, and nothing auto-advances under prefers-reduced-motion. */
  function initCarousel(el) {
    if (el._carousel) return;
    var slides = el.querySelectorAll('.carousel__slide');
    var dots = el.querySelectorAll('.carousel__dot');
    var current = 0, timer = null;
    var go = function (n) {
      current = (n + slides.length) % slides.length;
      each(slides, function (s, k) {
        s.classList.toggle('is-active', k === current);
        s.setAttribute('aria-hidden', k === current ? 'false' : 'true');
      });
      each(dots, function (d, k) { d.setAttribute('aria-current', k === current ? 'true' : 'false'); });
    };
    var stop = function () { clearInterval(timer); timer = null; };
    var start = function () {
      stop();
      if (reduceMotion || slides.length < 2 || el.closest('[hidden]')) return;
      timer = setInterval(function () { go(current + 1); }, 4500);
    };
    each(dots, function (d, k) { d.addEventListener('click', function () { go(k); start(); }); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    el._carousel = { go: go, start: start, stop: stop, reset: function () { go(0); start(); } };
    start();
  }

  /* ---------------- Year tabs ----------------
     Switching a tab shows its panel and restarts that panel's carousel at the first slide. */
  function initTabs(root) {
    if (root._tabs) return;
    root._tabs = true;
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !on;
        var c = panel.querySelector('[data-carousel]');
        if (c && c._carousel) { if (on) c._carousel.reset(); else c._carousel.stop(); }
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select(tabs[(k + d + tabs.length) % tabs.length], true); }
      });
    });
  }

  /* ---------------- Expanding story ---------------- */
  function initStory(story) {
    var btn = story.querySelector('.story__toggle');
    if (!btn || story._story) return;
    story._story = true;
    btn.addEventListener('click', function () {
      var open = story.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = btn.getAttribute(open ? 'data-label-open' : 'data-label-closed');
      if (!open) btn.scrollIntoView({ block: 'nearest' });
    });
  }

  function init(root) {
    each(root.querySelectorAll('[data-carousel]'), initCarousel);
    each(root.querySelectorAll('[data-tabs]'), initTabs);
    each(root.querySelectorAll('[data-story]'), initStory);
  }
  init(document);
  window.YM = { init: init };
})();
