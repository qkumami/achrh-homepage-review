/* ACHRH-WIX-BUILD-001 · WAVE 1 — attention choreography & digital-exhibition behaviour.
   Portable vanilla JS. Honours prefers-reduced-motion and the One-Moving-Object rule. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- editorial reveal (ARRIVE→SETTLE→HOLD) -------- */
  if (reduce) {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  } else {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
    }, { threshold: 0.16 });
    document.querySelectorAll('.rv').forEach(function (el) { rio.observe(el); });
  }

  /* -------- header: condense on scroll -------- */
  var nav = document.getElementById('nav');
  if (nav) addEventListener('scroll', function () { nav.classList.toggle('solid', scrollY > 40); }, { passive: true });

  /* -------- dropdowns (click/keyboard, never hover-only) -------- */
  document.querySelectorAll('.has-menu').forEach(function (item) {
    var btn = item.querySelector('.nav-top');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var open = item.classList.contains('open');
      document.querySelectorAll('.has-menu.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('.nav-top').setAttribute('aria-expanded', 'false'); });
      if (!open) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-menu')) document.querySelectorAll('.has-menu.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('.nav-top').setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.querySelectorAll('.has-menu.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('.nav-top').setAttribute('aria-expanded', 'false'); }); });

  /* -------- mobile menu -------- */
  var mt = document.querySelector('.navtoggle'), mob = document.getElementById('mobile-nav');
  if (mt && mob) {
    var close = mob.querySelector('.mclose');
    mt.addEventListener('click', function () { mob.classList.add('open'); mob.setAttribute('aria-hidden', 'false'); mt.setAttribute('aria-expanded', 'true'); });
    if (close) close.addEventListener('click', function () { mob.classList.remove('open'); mob.setAttribute('aria-hidden', 'true'); mt.setAttribute('aria-expanded', 'false'); });
    mob.addEventListener('click', function (e) { if (e.target.tagName === 'A') { mob.classList.remove('open'); mt.setAttribute('aria-expanded', 'false'); } });
  }

  /* -------- metric count-up (reduced-motion → final value immediately) -------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')), suffix = el.getAttribute('data-suffix') || '';
    if (reduce || isNaN(target)) { el.textContent = (el.getAttribute('data-display') || target) + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts; var p = Math.min((ts - start) / dur, 1);
      var val = Math.floor(target * (0.15 + 0.85 * (1 - Math.pow(1 - p, 3))));
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step); else el.textContent = (el.getAttribute('data-display') || target.toLocaleString()) + suffix;
    }
    requestAnimationFrame(step);
  }
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  /* -------- Revolving Exhibition ("sushi train"): diffuse → yield → emerge → hold.
     One object relinquishes attention before the next claims it. Viewport-aware; pauses on hover/interaction. -------- */
  document.querySelectorAll('[data-exhibit]').forEach(function (wall) {
    var frames = [].slice.call(wall.querySelectorAll('.frame'));
    var timer = null, paused = false, onScreen = false;
    frames.forEach(function (f) {
      var slides = [].slice.call(f.querySelectorAll('.slide'));
      f._i = 0; slides.forEach(function (s, i) { s.classList.toggle('on', i === 0); });
      f._advance = function () {
        if (slides.length < 2) return;
        var cur = slides[f._i]; f._i = (f._i + 1) % slides.length; var nxt = slides[f._i];
        cur.classList.remove('on');            // yield first
        setTimeout(function () { nxt.classList.add('on'); }, 180);  // then emerge
      };
    });
    function tick() {
      if (reduce) return;
      // stagger frames so they never all move together (calm geometry)
      frames.forEach(function (f, idx) { setTimeout(function () { if (!paused && onScreen) f._advance(); }, idx * 900); });
    }
    function play() { if (timer || reduce) return; timer = setInterval(tick, 7500); }
    function stop() { clearInterval(timer); timer = null; }
    // viewport awareness: off-screen rotation does not continue
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { onScreen = e.isIntersecting; if (onScreen) play(); else stop(); });
    }, { threshold: 0.25 });
    vio.observe(wall);
    // pause on meaningful interaction
    wall.addEventListener('mouseenter', function () { paused = true; setState(); });
    wall.addEventListener('mouseleave', function () { paused = false; setState(); });
    wall.addEventListener('focusin', function () { paused = true; setState(); });
    wall.addEventListener('focusout', function () { paused = false; setState(); });
    var pbtn = wall.parentNode.querySelector('[data-exhibit-toggle]');
    var state = wall.parentNode.querySelector('[data-exhibit-state]');
    function setState() { if (state) state.textContent = reduce ? 'Static (reduced motion)' : (paused ? 'Paused' : 'Rotating'); }
    if (pbtn) pbtn.addEventListener('click', function () { paused = !paused; setState(); });
    var nbtn = wall.parentNode.querySelector('[data-exhibit-next]');
    if (nbtn) nbtn.addEventListener('click', function () { frames.forEach(function (f) { f._advance(); }); });
    setState();
  });

  /* -------- Supreme Video: user-initiated; when a video plays, calm nearby motion (One-Moving-Object) -------- */
  document.querySelectorAll('[data-supreme]').forEach(function (sec) {
    var v = sec.querySelector('video'), btn = sec.querySelector('.playbtn');
    if (btn && v) btn.addEventListener('click', function () {
      if (v.paused) { v.play(); btn.textContent = 'Pause'; document.body.setAttribute('data-video-playing', '1'); }
      else { v.pause(); btn.textContent = '▶ Play'; document.body.removeAttribute('data-video-playing'); }
    });
    // pause offscreen video (performance + attention)
    if (v) new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting && !v.paused) { v.pause(); if (btn) btn.textContent = '▶ Play'; document.body.removeAttribute('data-video-playing'); } });
    }, { threshold: 0.4 }).observe(sec);
  });
})();
