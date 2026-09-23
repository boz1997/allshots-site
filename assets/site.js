/* AllShots home: the menu niceties, the shot-counter demo and the hand of cards. The page reads fully without it.
   The demo takes no picture and makes no request: it only counts. */
(function () {
  var d = document, motion = function () { return d.documentElement.classList.contains('motion'); };

  /* menu: <details> works without JS; this adds aria-expanded, Escape, outside click and close-on-link */
  var menu = d.querySelector('.menu');
  if (menu) {
    var sum = menu.querySelector('summary');
    var sync = function () { sum.setAttribute('aria-expanded', menu.open ? 'true' : 'false'); };
    sync();
    menu.addEventListener('toggle', sync);
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.open = false; });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.open) { menu.open = false; sum.focus(); } });
    d.addEventListener('click', function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  }

  /* the shot counter (camera.tsx): shutter → flash → count − 1 → pill bounce → one tick fills; at most one shot a second */
  var demo = d.querySelector('[data-demo]');
  if (demo) {
    var q = function (s) { return demo.querySelector(s); };
    var num = q('[data-num]'), lbl = q('[data-lbl]'), ticks = q('[data-ticks]'), live = q('[data-live]'),
        shutter = q('[data-shutter]'), flash = q('[data-flash]'), counter = q('[data-counter]'),
        done = q('[data-done]'), infNote = q('[data-inf-note]');
    var str = function (k) { var el = q('[data-s="' + k + '"]'); return el ? el.textContent : ''; };
    var total = 24, left = 24, inf = false, lastShot = 0;
    var say = function (t) { live.textContent = t; };
    var status = function () {
      if (inf) return str('srInf');
      if (left === 1) return str('last');
      return str('srLeft').replace('{n}', left);
    };
    var buildTicks = function () {
      var h = '';
      for (var i = 0; i < total; i++) h += '<i></i>';
      ticks.innerHTML = h;
    };
    var render = function () {
      var isLast = !inf && left === 1;
      demo.classList.toggle('is-inf', inf);
      demo.classList.toggle('is-last', isLast);
      num.textContent = left;
      lbl.textContent = isLast ? str('last') : str('left');
      ticks.hidden = inf; infNote.hidden = !inf;
      var ts = ticks.children;
      for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('used', i < total - left);
      var out = !inf && left === 0;
      shutter.disabled = out;
      done.hidden = !out;
    };
    var set = function (n) {
      inf = n === 0; total = inf ? 0 : n; left = total;
      [].forEach.call(demo.querySelectorAll('.chip'), function (c) { c.setAttribute('aria-pressed', +c.getAttribute('data-n') === n ? 'true' : 'false'); });
      buildTicks(); render(); say(status());
    };
    var play = function (el, frames, ms) { if (motion() && el.animate) el.animate(frames, { duration: ms, easing: 'ease-out' }); };
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
    demo.addEventListener('click', function (e) {
      var c = e.target.closest('.chip');
      if (c) set(+c.getAttribute('data-n'));
      if (e.target.closest('[data-reset]')) { left = total; render(); say(status()); shutter.focus(); }
    });
    /* i18n.js rewrites the pill label on a language change; put the current state back */
    d.addEventListener('i18n:applied', function () { render(); });
    render();
  }

  /* hand of cards: prev/next brings a design to the front. Without JS the fan is static. */
  var fan = d.querySelector('[data-fan]'), ctl = d.querySelector('[data-fan-controls]');
  if (fan && ctl) {
    var cards = [].slice.call(fan.querySelectorAll('.fan-card')), n = cards.length, front = 0;
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
  /* occasions: the headline word and the photo rotate through the seven occasions (Berk 23 Sep).
     Pauses on hover/focus and with the button; no auto-rotation under reduced motion (the list still switches it).
     Frames live here, per language, because the word sits inside a sentence; the list below is the accessible version. */
  var occ = d.querySelector('[data-occ-root]');
  if (occ) {
    var OCC = {
      en: ['Made for ', '.', 'Ready for every milestone.', ['weddings', 'birthdays', 'graduations', 'proms', 'homecoming', 'baby showers', 'parties']],
      tr: ['', ' için yapıldı.', 'Her özel güne hazır.', ['Düğünler', 'Doğum günleri', 'Mezuniyet partileri', 'Mezuniyet baloları', 'Homecoming partileri', 'Baby shower partileri', 'Partiler']],
      de: ['Für ', ' gemacht.', 'Bereit für jeden großen Anlass.', ['Hochzeiten', 'Geburtstage', 'Abschlussfeiern', 'Abschlussbälle', 'Homecoming', 'Babypartys', 'Partys']],
      es: ['Hecho para ', '.', 'Listo para cada gran momento.', ['bodas', 'cumpleaños', 'graduaciones', 'bailes de graduación', 'homecoming', 'baby showers', 'fiestas']],
      fr: ['Pensé pour les ', '.', 'Prêt pour chaque grand moment.', ['mariages', 'anniversaires', 'remises de diplômes', 'bals de promo', 'fêtes de homecoming', 'baby showers', 'fêtes']]
    };
    var live = occ.querySelector('.occ-live'), stat = occ.querySelector('.occ-static');
    var word = occ.querySelector('[data-occ-word]'), before = occ.querySelector('[data-occ-before]');
    var after = occ.querySelector('[data-occ-after]'), line2 = occ.querySelector('[data-occ-line2]');
    var links = [].slice.call(occ.querySelectorAll('.occ-list a')), photos = [].slice.call(occ.querySelectorAll('.occ-photo'));
    var pause = occ.querySelector('[data-occ-pause]'), i = 0, timer = null, held = false, stopped = false, inView = false;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var frame = function () { return OCC[d.documentElement.lang] || OCC.en; };
    var paint = function () {
      var f = frame();
      before.textContent = f[0]; after.textContent = f[1]; line2.textContent = f[2];
      word.textContent = f[3][i]; word.href = links[i].getAttribute('href');
      links.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      photos.forEach(function (p, k) { p.classList.toggle('is-on', k === i); p.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    };
    var go = function (k) {
      if (k === i) return;
      if (!motion()) { i = k; paint(); return; }
      word.classList.add('is-out');
      setTimeout(function () { i = k; paint(); word.classList.remove('is-out'); }, 260);
    };
    var tick = function () { if (!held && !stopped && inView) go((i + 1) % links.length); };
    live.hidden = false; stat.classList.add('sr-only'); paint();
    if (!reduce) {
      pause.hidden = false;
      timer = setInterval(tick, 2600);
      pause.addEventListener('click', function () {
        stopped = !stopped;
        pause.setAttribute('aria-pressed', stopped ? 'true' : 'false');
        occ.querySelector('[data-occ-pause-label]').textContent = stopped ? 'Play' : 'Pause';
      });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { inView = e[0].isIntersecting; }, { threshold: .35 }).observe(occ);
      else inView = true;
    }
    occ.addEventListener('mouseenter', function () { held = true; });
    occ.addEventListener('mouseleave', function () { held = false; });
    occ.addEventListener('focusin', function () { held = true; });
    occ.addEventListener('focusout', function () { held = false; });
    links.forEach(function (a, k) {
      a.addEventListener('mouseenter', function () { go(k); });
      a.addEventListener('focus', function () { go(k); });
    });
    d.addEventListener('i18n:applied', paint);
  }

})();
