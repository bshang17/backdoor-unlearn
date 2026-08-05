(function () {
  'use strict';

  // ── Left-TOC scroll-spy ──────────────────────────────────────────────
  // Highlight the CONTENTS entry for the section currently at the top of the
  // viewport. Only the list links are spied — NOT the .side-toc-home link
  // (its href="#top" points at <main>, which spans the whole page and would
  // always win, stealing the active state from every real section).
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.side-toc ul a[href^="#"]')
  );
  var byId = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (id) byId[id] = a;
  });
  var sections = Object.keys(byId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (links.length && sections.length) {
    var ACTIVE_OFFSET = 120;   // px from viewport top that counts as "here"
    var ticking = false;
    var update = function () {
      ticking = false;
      var currentId = sections[0].id;   // default to first until one is passed
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= ACTIVE_OFFSET) {
          currentId = sections[i].id;
        }
      }
      links.forEach(function (a) { a.classList.remove('is-active'); });
      if (byId[currentId]) byId[currentId].classList.add('is-active');
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  // ── scroll-to-top ────────────────────────────────────────────────────
  var btn = document.querySelector('.scroll-to-top');
  if (btn) {
    var onTop = function () {
      btn.classList.toggle('visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onTop, { passive: true });
    onTop();
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
