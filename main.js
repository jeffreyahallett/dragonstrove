/* =============================================================
   Dragon's Trove Press — the interactive bits

   Jeff — you should never need to open this file. It's here so you know
   what it does and, more usefully, what it does NOT require of you.

   It powers four things:
     1. The trailer — swaps the still image for the YouTube player when a
        visitor clicks play (so the video never loads for people who don't
        watch it, which keeps the page quick).
     2. The character-art strips — sideways scrolling, drag-to-slide, and
        the click-to-enlarge viewer with arrow keys, swipe and Esc.
     3. The "Read more" toggles on the book blurbs.
     4. The mobile menu.

   ★ THE IMPORTANT PART ★
   None of this is hard-wired to particular images, books or counts. The
   code looks for whatever it finds in the page and wires it up on the
   spot. So when you add character art, remove a picture, switch on the
   Convergence strip, add a book card, or write a longer blurb — this file
   stays exactly as it is. Edit index.html and you're done.

   Everything also degrades gracefully: if a section isn't on the page, the
   matching code simply does nothing rather than erroring.
   ============================================================= */
(function () {
  'use strict';

  /* ---- Trailer: swap the poster for the YouTube iframe on demand ---- */
  var trailerBtn = document.getElementById('trailer-play');
  if (trailerBtn) {
    trailerBtn.addEventListener('click', function () {
      var id = trailerBtn.getAttribute('data-video-id');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'Beacon of Hope — official series trailer';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      trailerBtn.replaceWith(iframe);
    });
  }

  /* ---- Character-art lightbox ----
     Thumbs stay plain <img> tags (easy for Jeff to edit); the overlay is
     built here once and reused. Arrow keys / swipe navigate, Esc closes. */
  var strips = document.querySelectorAll('.tome__art');
  if (strips.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Character art viewer');
    lb.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close viewer"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>' +
      '<figure class="lightbox__stage"><img class="lightbox__img" alt="" /><figcaption class="lightbox__caption"></figcaption></figure>' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('.lightbox__img');
    var lbCap = lb.querySelector('.lightbox__caption');
    var gallery = [];
    var index = 0;
    var lastFocus = null;

    function show(i) {
      index = (i + gallery.length) % gallery.length;
      var img = gallery[index];
      /* full-size art lives next to the thumb with the same name */
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
    }
    function openLb(imgs, i) {
      gallery = imgs;
      lastFocus = document.activeElement;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      show(i);
      lb.querySelector('.lightbox__close').focus();
    }
    function closeLb() {
      lb.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus) { lastFocus.focus(); }
    }

    strips.forEach(function (strip) {
      var imgs = Array.prototype.slice.call(strip.querySelectorAll('img'));

      /* Desktop drag-to-scroll: press + move >6px grabs the strip and scrolls
         it; press + release without moving is a click (opens the lightbox).
         Touch input keeps the browser's native swipe scrolling. */
      var drag = { down: false, moved: false, startX: 0, startScroll: 0 };
      strip.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') { return; }
        drag.down = true;
        drag.moved = false;
        drag.startX = e.clientX;
        drag.startScroll = strip.scrollLeft;
      });
      strip.addEventListener('pointermove', function (e) {
        if (!drag.down) { return; }
        var dx = e.clientX - drag.startX;
        if (!drag.moved && Math.abs(dx) > 6) {
          drag.moved = true;
          strip.classList.add('is-dragging');   /* also disables snap mid-drag */
          strip.setPointerCapture(e.pointerId);
        }
        if (drag.moved) { strip.scrollLeft = drag.startScroll - dx; }
      });
      ['pointerup', 'pointercancel'].forEach(function (ev) {
        strip.addEventListener(ev, function () {
          drag.down = false;
          strip.classList.remove('is-dragging'); /* snap re-engages on release */
        });
      });

      imgs.forEach(function (img, i) {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('draggable', 'false'); /* no ghost-image drag */
        img.addEventListener('click', function () {
          if (drag.moved) { return; }           /* a drag isn't a click */
          openLb(imgs, i);
        });
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(imgs, i); }
        });
      });
    });

    lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(index - 1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(index + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) { closeLb(); } });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) { return; }
      if (e.key === 'Escape') { closeLb(); }
      if (e.key === 'ArrowLeft') { show(index - 1); }
      if (e.key === 'ArrowRight') { show(index + 1); }
    });

    /* touch swipe */
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) { return; }
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { show(index + (dx < 0 ? 1 : -1)); }
      touchX = null;
    }, { passive: true });
  }

  /* ---- "Read more" expanders on the tome blurbs ---- */
  document.querySelectorAll('.tome__desc-wrap[data-expand]').forEach(function (wrap) {
    var btn = wrap.querySelector('.tome__more');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      var open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Read less' : 'Read more';
    });
  });

  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('primary-nav');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      var icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
      }
    });

    // Close the mobile menu after tapping any link inside it.
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        var icon = toggle.querySelector('i');
        if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-xmark'); }
      }
    });
  }
})();
