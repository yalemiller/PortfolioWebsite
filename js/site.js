/* yalemiller.com — vanilla JS
   Typewriter, mobile menu, lightbox, click-to-load video. No dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Typewriter ---------------- */
  var tw = document.querySelector('[data-typewriter]');
  if (tw) {
    var phrases;
    try { phrases = JSON.parse(tw.getAttribute('data-typewriter')); } catch (e) { phrases = []; }
    var typed = tw.querySelector('.typewriter__typed');
    var ghost = tw.querySelector('.typewriter__ghost');

    if (phrases.length && typed && ghost) {
      if (reduceMotion) {
        // Static: show the first phrase in full.
        typed.textContent = phrases[0];
        ghost.textContent = '';
      } else {
        var p = 0, i = 0, deleting = false, timer;
        var render = function () {
          var full = phrases[p];
          typed.textContent = full.slice(0, i);
          // The whole phrase is always in the DOM so line breaks are fixed
          // from the first keystroke; untyped characters are transparent.
          ghost.textContent = full.slice(i);
        };
        var tick = function () {
          var full = phrases[p];
          if (!deleting) {
            i++;
            render();
            if (i >= full.length) {
              deleting = true;
              timer = setTimeout(tick, 1800);
              return;
            }
            timer = setTimeout(tick, 70);
          } else {
            i--;
            render();
            if (i <= 0) {
              deleting = false;
              p = (p + 1) % phrases.length;
              render();
              timer = setTimeout(tick, 400);
              return;
            }
            timer = setTimeout(tick, 35);
          }
        };
        render();
        timer = setTimeout(tick, 600);
        // Pause when the tab is hidden so the loop doesn't drift.
        document.addEventListener('visibilitychange', function () {
          if (document.hidden) { clearTimeout(timer); }
          else { timer = setTimeout(tick, 300); }
        });
      }
    }
  }

  /* ---------------- Scroll lock helper ---------------- */
  var lockCount = 0;
  function lockBody(on) {
    lockCount += on ? 1 : -1;
    if (lockCount < 0) lockCount = 0;
    document.body.classList.toggle('is-locked', lockCount > 0);
  }

  /* ---------------- Focus trap helper ---------------- */
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

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.querySelector('[data-menu-open]');
  var menu = document.querySelector('[data-menu]');
  if (menuBtn && menu) {
    var closeBtn = menu.querySelector('[data-menu-close]');
    var lastFocus = null;
    var openMenu = function () {
      lastFocus = document.activeElement;
      menu.setAttribute('data-open', 'true');
      menuBtn.setAttribute('aria-expanded', 'true');
      lockBody(true);
      (closeBtn || menu.querySelector('a')).focus();
    };
    var closeMenu = function () {
      if (menu.getAttribute('data-open') !== 'true') return;
      menu.setAttribute('data-open', 'false');
      menuBtn.setAttribute('aria-expanded', 'false');
      lockBody(false);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
      else if (e.key === 'Tab') { trapFocus(menu, e); }
    });
    // Close if the viewport grows past the mobile breakpoint.
    window.matchMedia('(min-width: 640px)').addEventListener('change', function (m) {
      if (m.matches) closeMenu();
    });
  }

  /* ---------------- Lightbox ---------------- */
  var lb = document.querySelector('[data-lightbox]');
  if (lb) {
    var lbImg = lb.querySelector('.lightbox__img');
    var lbCap = lb.querySelector('.lightbox__cap');
    var lbClose = lb.querySelector('.lightbox__close');
    var lbPrev = lb.querySelector('.lightbox__prev');
    var lbNext = lb.querySelector('.lightbox__next');
    var group = [], index = 0, lbLastFocus = null;

    var show = function () {
      var btn = group[index];
      var full = btn.getAttribute('data-full') || (btn.querySelector('img') || {}).currentSrc || '';
      var cap = btn.getAttribute('data-caption') || (btn.querySelector('img') || {}).alt || '';
      lbImg.src = full;
      lbImg.alt = cap;
      lbCap.textContent = cap;
      var multi = group.length > 1;
      lbPrev.hidden = !multi;
      lbNext.hidden = !multi;
    };
    var openLb = function (btn) {
      var name = btn.getAttribute('data-gallery') || '';
      group = name
        ? Array.prototype.slice.call(document.querySelectorAll('[data-gallery="' + name + '"]'))
        : [btn];
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
      // Backdrop click closes; clicks on the image/controls do not.
      if (e.target === lb || e.target === lbCap) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (lb.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') { e.preventDefault(); closeLb(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'Tab') { trapFocus(lb, e); }
    });
    // Basic swipe support inside the lightbox.
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------------- Click-to-load video ---------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-video]'), function (box) {
    var btn = box.querySelector('.cs-video__btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (box.getAttribute('data-loaded') === 'true') return;
      box.setAttribute('data-loaded', 'true');
      var provider = box.getAttribute('data-video');
      var id = box.getAttribute('data-video-id');
      var src = provider === 'youtube'
        ? 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0'
        : 'https://player.vimeo.com/video/' + id + '?autoplay=1&dnt=1';
      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = box.getAttribute('data-video-title') || 'Video';
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      box.innerHTML = '';
      box.appendChild(iframe);
    });
  });

  /* ---------------- Click-to-load embeds (Figma, Issuu) ---------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-embed]'), function (box) {
    var btn = box.querySelector('.cs-video__btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (box.getAttribute('data-loaded') === 'true') return;
      box.setAttribute('data-loaded', 'true');
      var iframe = document.createElement('iframe');
      iframe.src = box.getAttribute('data-embed');
      iframe.title = box.getAttribute('data-embed-title') || 'Embedded content';
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'lazy');
      box.innerHTML = '';
      box.appendChild(iframe);
    });
  });
})();
