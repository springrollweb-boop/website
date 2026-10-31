/* Spring Roll Station: shared behaviour + the phở wheel */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- home page intro ---------- */
  const pre = document.getElementById('preloader');
  if (pre) {
    const skip = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (skip) { pre.remove(); }
    else {
      document.body.classList.add('is-preloading');
      window.scrollTo(0, 0);
      setTimeout(() => { pre.remove(); document.body.classList.remove('is-preloading'); }, 3000);
    }
  }

  /* ---------- nav ---------- */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- floating WhatsApp chooser ---------- */
  const wa = document.querySelector('.wa-float');
  if (wa) {
    wa.querySelector('.wa-float__btn').addEventListener('click', () => wa.classList.toggle('is-open'));
    document.addEventListener('click', (e) => { if (!wa.contains(e.target)) wa.classList.remove('is-open'); });
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = [...document.querySelectorAll('.reveal')];
  // cards in the same grid fade in one after another
  revealEls.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    if (siblings.length > 1) { el.classList.add('reveal--x'); el.style.setProperty('--rd', (Math.min(siblings.indexOf(el), 8) * 0.14) + 's'); }
  });
  const showNear = () => {            // fail safe: anything near the viewport is shown
    const limit = window.innerHeight * 1.6;
    revealEls.forEach((el) => { if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < limit) el.classList.add('is-in'); });
  };
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px 10% 0px' });
    revealEls.forEach((el) => io.observe(el));
    window.addEventListener('scroll', showNear, { passive: true });
    setTimeout(showNear, 900);
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- menu header bowl: swaps to the next bowl every 6 seconds ---------- */
  const heroBowl = document.querySelector('.page-hero__bowl');
  if (heroBowl && heroBowl.children.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let bi = 0; const imgs = [...heroBowl.children];
    setInterval(() => { bi = (bi + 1) % imgs.length; imgs.forEach((im, k) => im.classList.toggle('is-active', k === bi)); }, 6000);
  }

  /* ---------- photo sliders ---------- */
  document.querySelectorAll('.slider').forEach((sl) => {
    const track = sl.querySelector('.slider__track');
    const slides = [...track.children];
    const dots = [...sl.querySelectorAll('.slider__dots button')];
    let i = 0, timer;
    const go = (n) => { i = (n + slides.length) % slides.length; track.style.transform = `translateX(-${i * 100}%)`; dots.forEach((d, k) => d.classList.toggle('is-active', k === i)); };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 5000); };
    sl.querySelector('.slider__btn--prev').addEventListener('click', () => { go(i - 1); restart(); });
    sl.querySelector('.slider__btn--next').addEventListener('click', () => { go(i + 1); restart(); });
    dots.forEach((d) => d.addEventListener('click', () => { go(+d.dataset.go); restart(); }));
    let sx = 0, sy = 0;
    sl.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    sl.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? i + 1 : i - 1); restart(); } }, { passive: true });
    sl.addEventListener('mouseenter', () => clearInterval(timer));
    sl.addEventListener('mouseleave', restart);
    go(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) restart();
  });

  /* ---------- the phở wheel ---------- */
  const hero = document.getElementById('hero');
  const wheel = document.getElementById('wheel');
  if (!hero || !wheel) return;

  const BOWLS = [
    { id: 'chicken', label: 'Chicken', name: 'Chicken Phở', price: 'S$14.90', desc: 'Tender, juicy cuts of chicken thigh in a light, clear broth.' },
    { id: 'beef', label: 'Beef', name: 'Beef Phở', price: 'S$16.90', desc: 'Three beef cuts in one bowl: premium lean, rich marbled and slow cooked shank.' },
    { id: 'ribeye', label: 'Ribeye', name: 'Ribeye Phở', price: 'S$21.80', desc: 'A whole sous vide medium rare ribeye on top of our three cut beef phở.' },
    { id: 'prawn', label: 'Prawn', name: 'Signature Prawn Phở', price: 'S$14.90', desc: 'Fresh prawns and premium prawn mousse. Limited quantities daily.' }
  ];
  const N = BOWLS.length;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ring = wheel.querySelector('.wheel-ring');
  const bowlEls = BOWLS.map((b) => ring.querySelector(`.bowl[data-bowl="${b.id}"]`));
  const bgEls = BOWLS.map((b) => hero.querySelector(`.hero-bg__layer[data-bowl="${b.id}"]`));
  const arcPath = wheel.querySelector('.wheel-arc path');
  const dotsWrap = wheel.querySelector('.wheel-dots');
  const meta = wheel.querySelector('.wheel-meta');
  const metaName = meta.querySelector('.wheel-meta__name');
  const metaPrice = meta.querySelector('.wheel-meta__price');
  const metaDesc = meta.querySelector('.wheel-meta__desc');
  const metaLink = meta.querySelector('a');
  const countEl = wheel.querySelector('.wheel-count span');
  const prevBtn = wheel.querySelector('.wheel-btn--prev');
  const nextBtn = wheel.querySelector('.wheel-btn--next');

  // build dots
  const dotEls = BOWLS.map((b, i) => {
    const d = document.createElement('button');
    d.className = 'dot';
    d.type = 'button';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `Show ${b.name}`);
    d.innerHTML = `<span class="dot__pin"></span><span class="dot__label">${b.label}</span>`;
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    return d;
  });

  let active = 1;                       // start on Beef, the best seller
  const pos = [-1, 0, 1, 2];            // physical ring offsets, in units of theta
  const visited = new Set([active]);
  let locked = false;
  let geo = {};

  const canon = (i) => { let d = (i - active) % N; if (d < 0) d += N; return d === N - 1 ? -1 : d; }; // -1,0,1,2

  function layout() {
    const W = wheel.clientWidth, H = wheel.clientHeight;
    const mobile = W < 900;
    const copy = hero.querySelector('.hero-copy');
    const copyBottom = copy ? copy.offsetTop + copy.offsetHeight : 240;
    let D, cy, Ra;
    if (mobile) {
      // phone: name and price sit under the headline, then the arc, then a bowl that fills the width
      const arcTop = copyBottom + 134, pad = 34;
      D = Math.min(W * 0.96, 560, Math.max(W * 0.8, H - arcTop - pad - 96));
      Ra = D / 2 + pad;
      cy = arcTop + Ra;
    } else {
      // desktop: a big bowl, cropped by the bottom of the screen like a plate pushed toward you
      D = Math.min(W * 0.56, (H - copyBottom - 110) / 0.62, 860);
      D = Math.max(D, 300);
      cy = H - D * 0.12;
      Ra = D / 2 + 54;
    }
    const R = 2.6 * W;
    const theta = Math.asin(Math.min(0.95, (0.5 * W + 0.3 * D) / R));
    const phi = (mobile ? 19 : 22) * Math.PI / 180;
    geo = { W, H, D, cy, R, theta, Ra, phi, mobile };

    hero.style.setProperty('--D', D + 'px');
    hero.style.setProperty('--cy', cy + 'px');
    hero.style.setProperty('--arcTop', (cy - Ra) + 'px');
    hero.style.setProperty('--metaLeft', Math.max(D / 2 + 34, Ra * Math.sin(2 * phi) + 104) + 'px');

    bowlEls.forEach((el) => {
      el.style.width = el.style.height = D + 'px';
      el.style.left = (W / 2 - D / 2) + 'px';
      el.style.top = (cy - D / 2) + 'px';
      el.style.transformOrigin = `${D / 2}px ${D / 2 + R}px`;
    });

    // arc: part of a circle centred on the active bowl
    const span = (mobile ? 62 : 68) * Math.PI / 180;
    const p = (a) => `${W / 2 + Ra * Math.sin(a)} ${cy - Ra * Math.cos(a)}`;
    arcPath.setAttribute('d', `M ${p(-span)} A ${Ra} ${Ra} 0 0 1 ${p(span)}`);

    applyTransforms(false);
    placeDots(false);
  }

  function applyTransforms(animate) {
    bowlEls.forEach((el, i) => {
      if (!animate) el.classList.add('no-anim');
      const a = pos[i] * geo.theta;
      el.style.transform = `rotate(${a}rad)`;
      el.querySelector('.bowl__roll').style.transform = `rotate(${a * 1.6}rad)`;
      if (!animate) { void el.offsetWidth; el.classList.remove('no-anim'); }
    });
  }

  function placeDots(animate) {
    dotEls.forEach((d, i) => {
      const c = canon(i);
      const a = c * geo.phi;
      const x = geo.W / 2 + geo.Ra * Math.sin(a);
      const y = geo.cy - geo.Ra * Math.cos(a);
      const prevC = d._c;
      const jump = prevC !== undefined && Math.abs(prevC - c) > 1;
      if (!animate || jump) {
        d.style.transition = 'none';
        if (jump) d.classList.add('is-far');
      }
      d.style.transform = `translate(${x}px, ${y}px)`;
      d.dataset.side = (geo.mobile && Math.abs(c) === 2) ? 'bottom' : c < 0 ? 'left' : c > 0 ? 'right' : 'top';
      d.classList.toggle('is-active', c === 0);
      d.setAttribute('aria-selected', c === 0 ? 'true' : 'false');
      if (!animate || jump) { void d.offsetWidth; d.style.transition = ''; if (jump) setTimeout(() => d.classList.remove('is-far'), 60); }
      d._c = c;
    });
  }

  function updateMeta() {
    const b = BOWLS[active];
    // the bowl rolls first, then the table dresses itself for it
    const who = active;
    setTimeout(() => bgEls.forEach((bg, i) => bg.classList.toggle('is-active', i === who)), reduceMotion ? 0 : 520);
    if (countEl) countEl.textContent = String(active + 1).padStart(2, '0');
    meta.classList.add('is-swapping');
    setTimeout(() => {
      metaName.textContent = b.name;
      metaPrice.textContent = b.price;
      metaDesc.textContent = b.desc;
      if (metaLink) metaLink.href = `menu.html#pho-${b.id}`;
      meta.classList.remove('is-swapping');
    }, reduceMotion ? 0 : 320);
  }

  function step(dir) {               // dir = +1 next, -1 prev
    if (locked) return;
    locked = true;
    // the opposite bowl waits off screen on the far side; move it to the side it will enter from
    bowlEls.forEach((el, i) => {
      if ((dir > 0 && pos[i] <= -2) || (dir < 0 && pos[i] >= 2)) {
        pos[i] = dir > 0 ? 2 : -2;
        el.classList.add('no-anim');
        el.style.transform = `rotate(${pos[i] * geo.theta}rad)`;
        el.querySelector('.bowl__roll').style.transform = `rotate(${pos[i] * geo.theta * 1.6}rad)`;
        void el.offsetWidth;
        el.classList.remove('no-anim');
      }
    });
    for (let i = 0; i < N; i++) pos[i] -= dir;
    active = (active + dir + N) % N;
    visited.add(active);
    applyTransforms(!reduceMotion);
    placeDots(!reduceMotion);
    updateMeta();
    setTimeout(() => { locked = false; }, reduceMotion ? 50 : 1080);
  }

  function goTo(i) {
    if (i === active || locked) return;
    let d = (i - active + N) % N;          // steps forward
    const dir = d <= N / 2 ? 1 : -1;
    const steps = dir > 0 ? d : N - d;
    if (steps === 1) { step(dir); return; }
    // two steps away: turn the ring twice quickly
    step(dir);
    setTimeout(() => { locked = false; step(dir); }, reduceMotion ? 60 : 560);
  }

  prevBtn.addEventListener('click', () => { userTouched(); step(-1); });
  nextBtn.addEventListener('click', () => { userTouched(); step(1); });
  dotEls.forEach((d) => d.addEventListener('click', userTouched));

  // keyboard
  window.addEventListener('keydown', (e) => {
    if (window.scrollY > geo.H * 0.6) return;
    if (e.key === 'ArrowRight') { userTouched(); step(1); }
    if (e.key === 'ArrowLeft') { userTouched(); step(-1); }
  });

  // stepped wheel scrolling while the hero is at the top of the page
  let lastWheelT = 0, gestureHandled = false;
  window.addEventListener('wheel', (e) => {
    const now = performance.now();
    const fresh = now - lastWheelT > 280;
    lastWheelT = now;
    if (window.scrollY > 2 || Math.abs(e.deltaY) < 4) return;
    if (fresh) gestureHandled = false;
    if (gestureHandled) { e.preventDefault(); return; }
    if (locked) { e.preventDefault(); gestureHandled = true; return; }
    if (e.deltaY > 0) {
      if (visited.size < N) { e.preventDefault(); gestureHandled = true; userTouched(); step(1); }
    } else if (active > 0) {
      e.preventDefault(); gestureHandled = true; userTouched(); step(-1);
    }
  }, { passive: false });

  // swipe on touch
  let tx = 0, ty = 0, tracking = false;
  wheel.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; tracking = true; }, { passive: true });
  wheel.addEventListener('touchend', (e) => {
    if (!tracking) return; tracking = false;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { userTouched(); step(dx < 0 ? 1 : -1); }
  }, { passive: true });

  // gentle auto turn while nobody is interacting
  let idleSince = performance.now();
  function userTouched() { idleSince = performance.now(); }
  if (!reduceMotion) {
    setInterval(() => {
      if (document.hidden || window.scrollY > geo.H * 0.5) return;
      if (performance.now() - idleSince < 7000) return;
      if (hero.matches(':hover') && geo.mobile === false && wheel.querySelector('.wheel-btn:hover, .dot:hover')) return;
      step(1);
    }, 5200);
  }

  // init
  bgEls[active].classList.add('is-active');
  layout();
  dotEls.forEach((d) => { d._c = canon(dotEls.indexOf(d)); });
  updateMeta();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();
