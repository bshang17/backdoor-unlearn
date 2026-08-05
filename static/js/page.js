(function () {
  'use strict';

  // ── Left-TOC scroll-spy ──────────────────────────────────────────────
  // Highlight the TOC entry whose section is currently in view. Uses
  // IntersectionObserver so it costs nothing per scroll frame.
  var links = Array.prototype.slice.call(document.querySelectorAll('.side-toc a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (id) byId[id] = a;
  });
  var sections = Object.keys(byId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = {};
    var setActive = function (id) {
      links.forEach(function (a) { a.classList.remove('is-active'); });
      if (byId[id]) byId[id].classList.add('is-active');
    };
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible[e.target.id] = e.isIntersecting ? e.boundingClientRect.top : null;
      });
      // pick the topmost currently-intersecting section
      var current = null, best = Infinity;
      sections.forEach(function (s) {
        var r = s.getBoundingClientRect();
        if (r.bottom > 80 && r.top < window.innerHeight * 0.5 && r.top < best) {
          best = r.top; current = s.id;
        }
      });
      if (current) setActive(current);
    }, { rootMargin: '-70px 0px -55% 0px', threshold: [0, 1] });
    sections.forEach(function (s) { obs.observe(s); });
  }

  // ── scroll-to-top ────────────────────────────────────────────────────
  var btn = document.querySelector('.scroll-to-top');
  if (btn) {
    var onScroll = function () {
      btn.classList.toggle('visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  // ── BibTeX copy ──────────────────────────────────────────────────────
  var copyBtn = document.getElementById('copy');
  var bib = document.getElementById('bib');
  if (copyBtn && bib) {
    var done = function () {
      copyBtn.textContent = 'Copied';
      copyBtn.classList.add('done');
      setTimeout(function () {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('done');
      }, 1600);
    };
    copyBtn.addEventListener('click', function () {
      var text = bib.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        if (ok) done();
      }
    });
  }
})();
