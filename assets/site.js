/* AllShots home: the menu niceties, the shot-counter demo, the hand of cards and the occasions rotator.
   The page reads fully without it. The demo takes no picture and makes no request: it only counts.
   Each block has its own scope; strings come from hidden [data-i18n] spans (data-s), so i18n.js translates them. */
(function (d) {
  'use strict';
  var root = d.documentElement, on = function (ev, fn) { d.addEventListener(ev, fn); };
  var motion = function () { return root.classList.contains('motion'); };
  var str = function (scope, k) { var el = scope.querySelector('[data-s="' + k + '"]'); return el ? el.textContent : ''; };
  var each = function (list, fn) { [].forEach.call(list, fn); };

  /* host links carry the language in the hash query (#/?plan=medium&lang=tr), as the dashboard reads it; without i18n.js
     (pricing.html) it is picked as i18n.js picks it. Local review: the dashboard's local stack (web-host `npm run local`) */
  var LANGS = ['en', 'tr', 'es', 'fr', 'de'], ok = function (l) { return LANGS.indexOf(l) >= 0; };
  function siteLang() {
    if (window.ALLSHOTS_I18N) return ok(root.lang) ? root.lang : 'en';
    var l = new URLSearchParams(location.search).get('lang');
    if (!ok(l)) try { l = localStorage.getItem('gc_lang'); } catch (e) { l = null; }
    if (!ok(l)) l = (navigator.language || '').slice(0, 2).toLowerCase();
    return ok(l) ? l : 'en';
  }
  function hostLinks() {
    var lang = siteLang(), home = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? 'http://127.0.0.1:5191' : 'https://host.allshots.app';
    each(d.querySelectorAll('a[href^="https://host.allshots.app"], a[data-host-href]'), function (a) {
      var base = a.getAttribute('data-host-href') || a.getAttribute('href'), h = (base.split('#')[1] || '/').split('?'),
          q = new URLSearchParams(h[1] || '');
      q.set('lang', lang);
      a.setAttribute('data-host-href', base);
      a.href = home + '/#' + h[0] + '?' + q;
    });
  }

  /* menu: <details> works without JS; this adds aria-expanded, Escape, outside click and close-on-link */
  function menu() {
    var m = d.querySelector('.menu'); if (!m) return;
    var sum = m.querySelector('summary');
    var sync = function () { sum.setAttribute('aria-expanded', m.open ? 'true' : 'false'); };
    sync();
    m.addEventListener('toggle', sync);
    m.addEventListener('click', function (e) { if (e.target.closest('a')) m.open = false; });
    on('keydown', function (e) { if (e.key === 'Escape' && m.open) { m.open = false; sum.focus(); } });
    on('click', function (e) { if (m.open && !m.contains(e.target)) m.open = false; });
  }

  /* the shot counter (camera.tsx): shutter → flash → count − 1 → pill bounce → one tick fills; at most one shot a second */
  function demo() {
    var el = d.querySelector('[data-demo]'); if (!el) return;
    var q = function (s) { return el.querySelector(s); };
    var num = q('[data-num]'), lbl = q('[data-lbl]'), ticks = q('[data-ticks]'), live = q('[data-live]'),
        shutter = q('[data-shutter]'), flash = q('[data-flash]'), counter = q('[data-counter]'),
        done = q('[data-done]'), infNote = q('[data-inf-note]');
    var total = 24, left = 24, inf = false, lastShot = 0;
    var say = function (t) { live.textContent = t; };
    var status = function () {
      if (inf) return str(el, 'srInf');
      if (left === 1) return str(el, 'last');
      return str(el, 'srLeft').replace('{n}', left);
    };
    var render = function () {
      var isLast = !inf && left === 1, out = !inf && left === 0, ts = ticks.children;
      el.classList.toggle('is-inf', inf);
      el.classList.toggle('is-last', isLast);
      num.textContent = left;
      lbl.textContent = isLast ? str(el, 'last') : str(el, 'left');
      ticks.hidden = inf; infNote.hidden = !inf;
      for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('used', i < total - left);
      shutter.disabled = out;
      done.hidden = !out;
    };
    var set = function (n) {
      inf = n === 0; total = inf ? 0 : n; left = total;
      each(el.querySelectorAll('.chip'), function (c) { c.setAttribute('aria-pressed', +c.getAttribute('data-n') === n ? 'true' : 'false'); });
      ticks.innerHTML = new Array(total + 1).join('<i></i>');
      render(); say(status());
    };
    var play = function (node, frames, ms) { if (motion() && node.animate) node.animate(frames, { duration: ms, easing: 'ease-out' }); };
    shutter.addEventListener('click', function () {
      var now = Date.now();
      if (now - lastShot < 1000 || (!inf && left <= 0)) return;
      lastShot = now;
      play(shutter.firstChild, [{ transform: 'scale(1)' }, { transform: 'scale(.85)', offset: .2 }, { transform: 'scale(1)' }], 350);
      play(flash, [{ opacity: 0 }, { opacity: .9, offset: .22 }, { opacity: 0 }], 230);
      if (!inf) left--;
      play(counter, [{ scale: 1 }, { scale: 1.3, offset: .35 }, { scale: 1 }], 310);
      render();
      if (!inf && left === 0) { say(q('.done-t').textContent + '. ' + q('.done-b').textContent); q('[data-reset]').focus(); }
      else say(status());
    });
    el.addEventListener('click', function (e) {
      var c = e.target.closest('.chip');
      if (c) set(+c.getAttribute('data-n'));
      if (e.target.closest('[data-reset]')) { left = total; render(); say(status()); shutter.focus(); }
    });
    on('i18n:applied', render);   /* i18n.js rewrites the pill label; put the current state back */
    render();
  }

  /* hand of cards: prev/next brings a design to the front. Without JS the fan is static. */
  function fan() {
    var f = d.querySelector('[data-fan]'), ctl = d.querySelector('[data-fan-controls]'); if (!f || !ctl) return;
    var cards = [].slice.call(f.querySelectorAll('.fan-card')), n = cards.length, front = 0;
    var nameEl = ctl.querySelector('[data-fan-name]'), idxEl = ctl.querySelector('[data-fan-index]');
    var show = function () {
      cards.forEach(function (c, i) {
        var k = (i - front + n) % n; if (k > 2) k -= n;
        c.style.setProperty('--k', k);
        c.style.setProperty('--a', Math.abs(k));
      });
      nameEl.textContent = cards[front].getAttribute('data-name');
      idxEl.textContent = front + 1;
    };
    ctl.querySelector('[data-fan-next]').addEventListener('click', function () { front = (front + 1) % n; show(); });
    ctl.querySelector('[data-fan-prev]').addEventListener('click', function () { front = (front + n - 1) % n; show(); });
    show();
  }

  /* occasions (Berk 23 Sep): the headline, the photo and its caption rotate through the seven occasions.
     All seven headlines are built once and stacked in one grid cell (only one visible), so the heading is always as tall
     as its tallest version and nothing on the page moves. Pauses on hover/focus and with the button; no auto-rotation
     under reduced motion (the list still switches it). Photos load just before they are shown. The list is the accessible version. */
  function occasions() {
    var occ = d.querySelector('[data-occ-root]'); if (!occ) return;
    var q = function (s) { return occ.querySelector(s); }, all = function (s) { return [].slice.call(occ.querySelectorAll(s)); };
    var live = q('.occ-live'), pause = q('[data-occ-pause]'), plabel = q('[data-occ-pause-label]');
    var links = all('.occ-list a'), photos = all('.occ-photo'), caps = all('.occ-cap'), n = links.length, states = [];
    var i = 0, held = false, stopped = false, inView = false;
    var el = function (tag, cls, text) { var e = d.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
    var build = function () {
      var f = str(occ, 'frame').split('{w}'), l2 = str(occ, 'line2');
      live.textContent = ''; states = [];
      for (var k = 0; k < n; k++) {
        var st = el('span', 'occ-state'), l1 = el('span', 'occ-l1');
        l1.appendChild(d.createTextNode(f[0])); l1.appendChild(el('span', 'occ-word', str(occ, 'w' + k))); l1.appendChild(d.createTextNode(f[1] || ''));
        st.appendChild(l1); st.appendChild(el('span', 'occ-line2', l2));
        live.appendChild(st); states.push(st);
      }
    };
    var show = function () {
      states.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
      links.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      photos.forEach(function (p, k) {
        if (k === i || k === (i + 1) % n) p.classList.add('seen');
        p.classList.toggle('is-on', k === i); p.setAttribute('aria-hidden', k === i ? 'false' : 'true');
      });
      caps.forEach(function (c, k) { c.classList.toggle('is-on', k === i); });
    };
    var go = function (k) { if (k !== i) { i = k; show(); } };
    var label = function () { plabel.textContent = str(occ, stopped ? 'play' : 'pause'); };
    build(); live.hidden = false; q('.occ-static').classList.add('sr-only'); show();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(function () { if (!held && !stopped && inView) go((i + 1) % n); }, 2600);
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { inView = e[0].isIntersecting; }, { threshold: .35 }).observe(occ);
      else inView = true;
      label(); pause.hidden = false;
      pause.addEventListener('click', function () { stopped = !stopped; pause.setAttribute('aria-pressed', stopped ? 'true' : 'false'); label(); });
    }
    occ.addEventListener('mouseenter', function () { held = true; });
    occ.addEventListener('mouseleave', function () { held = false; });
    occ.addEventListener('focusin', function () { held = true; });
    occ.addEventListener('focusout', function () { held = false; });
    links.forEach(function (a, k) { a.addEventListener('mouseenter', function () { go(k); }); a.addEventListener('focus', function () { go(k); }); });
    on('i18n:applied', function () { build(); show(); label(); });
  }

  hostLinks(); menu(); demo(); fan(); occasions();
  on('i18n:applied', hostLinks);
})(document);
