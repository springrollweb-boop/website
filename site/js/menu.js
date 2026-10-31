/* Menu page: renders the menu from MENU, keeps a basket and sends the order over WhatsApp */
(function () {
  'use strict';
  const MENU = window.MENU, OUTLETS = window.OUTLETS;
  const root = document.getElementById('menu-root');
  const navWrap = document.getElementById('menu-nav');
  if (!root || !MENU) return;

  const money = (n) => '$' + n.toFixed(2);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
  const ICON_BOWL = '<svg viewBox="0 0 24 24"><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 11c0-3 1-5 3-7M13 11c0-3 1-5 3-7"/></svg>';
  const LEAF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';

  /* ----- index of every orderable thing ----- */
  const INDEX = {};
  MENU.forEach((cat) => {
    (cat.items || []).forEach((it) => { INDEX[it.id] = { ...it, cat: cat.title }; });
    [cat.addons, cat.addons2].forEach((g) => g && g.items.forEach((it) => { INDEX[it.id] = { ...it, cat: cat.title }; }));
  });

  /* ----- basket ----- */
  const KEY = 'srs-basket';
  let basket = {};
  try { basket = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { basket = {}; }
  Object.keys(basket).forEach((k) => { if (!INDEX[k]) delete basket[k]; });
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch (e) { /* private mode */ } };
  const count = () => Object.values(basket).reduce((a, b) => a + b, 0);
  const total = () => Object.entries(basket).reduce((a, [id, q]) => a + INDEX[id].price * q, 0);

  function setQty(id, q) {
    q = Math.max(0, Math.min(20, q));
    if (q === 0) delete basket[id]; else basket[id] = q;
    save();
    document.querySelectorAll(`[data-item="${id}"] .item__foot`).forEach((f) => { f.innerHTML = footHTML(id); });
    renderCart();
  }

  function footHTML(id) {
    const q = basket[id] || 0;
    if (!q) return `<button class="add" type="button" data-add="${id}">${ICON_PLUS} Add</button>`;
    return `<div class="stepper"><button type="button" data-dec="${id}" aria-label="Remove one">&minus;</button><output>${q}</output><button type="button" data-inc="${id}" aria-label="Add one">+</button></div>`;
  }

  /* ----- render menu ----- */
  function badge(b) {
    const cls = /new/i.test(b) ? 'badge--new' : /signature|best/i.test(b) ? 'badge--star' : /limited/i.test(b) ? 'badge--limited' : '';
    return `<span class="badge ${cls}">${esc(b)}</span>`;
  }
  function itemCard(it) {
    return `<article class="item" data-item="${it.id}" id="${it.id}">
      <div class="item__img">
        <img src="assets/menu/${esc(it.img)}" alt="${esc(it.name)}" loading="lazy" onerror="this.parentElement.classList.add('is-placeholder')">
        <div class="item__ph">${ICON_BOWL}<span>Photo coming soon</span></div>
        ${it.badges ? `<div class="item__badges">${it.badges.map(badge).join('')}</div>` : ''}
      </div>
      <div class="item__body">
        <div class="item__title"><h3>${esc(it.name)}</h3><span class="item__price">${money(it.price)}</span></div>
        ${it.desc ? `<p class="item__desc">${esc(it.desc)}</p>` : ''}
        <div class="item__foot">${footHTML(it.id)}</div>
      </div>
    </article>`;
  }
  function rowCard(it) {
    return `<article class="item item--row" data-item="${it.id}" id="${it.id}">
      <div class="item__body"><div class="item__title"><h3>${esc(it.name)}</h3><span class="item__price">${money(it.price)}</span></div></div>
      <div class="item__foot">${footHTML(it.id)}</div>
    </article>`;
  }
  function group(g) {
    if (!g) return '';
    return `<h3 class="display" style="margin:34px 0 14px;font-size:1.5rem">${esc(g.title)}</h3><div class="items items--rows">${g.items.map(rowCard).join('')}</div>`;
  }

  root.innerHTML = MENU.map((cat) => `
    <section class="menu-section" id="${cat.id}">
      <div class="wrap">
        <div class="menu-section__head">
          <div><h2>${esc(cat.title)}</h2>${cat.blurb ? `<p>${esc(cat.blurb)}</p>` : ''}</div>
          ${cat.note ? `<span class="menu-note">${LEAF}${esc(cat.note)}</span>` : ''}
        </div>
        ${cat.sauces ? `<p class="eyebrow" style="margin-bottom:8px">Choice of sauce</p><div class="sauces" style="margin-bottom:24px">${cat.sauces.map((s) => `<span class="pill">${esc(s)}</span>`).join('')}</div>` : ''}
        ${cat.items && cat.items.length ? `<div class="items">${cat.items.map(itemCard).join('')}</div>` : ''}
        ${group(cat.addons)}${group(cat.addons2)}
      </div>
    </section>`).join('');

  navWrap.innerHTML = MENU.map((c) => `<a href="#${c.id}" data-cat="${c.id}">${esc(c.title)}</a>`).join('');

  root.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]'), inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
    if (add) setQty(add.dataset.add, 1);
    if (inc) setQty(inc.dataset.inc, (basket[inc.dataset.inc] || 0) + 1);
    if (dec) setQty(dec.dataset.dec, (basket[dec.dataset.dec] || 0) - 1);
  });

  // active category in sticky nav
  const links = [...navWrap.querySelectorAll('a')];
  const secs = [...root.querySelectorAll('.menu-section')];
  const spy = new IntersectionObserver((en) => {
    en.forEach((x) => { if (x.isIntersecting) { links.forEach((l) => l.classList.toggle('is-active', l.dataset.cat === x.target.id)); const a = navWrap.querySelector('.is-active'); if (a) a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' }); } });
  }, { rootMargin: '-140px 0px -60% 0px', threshold: 0.01 });
  secs.forEach((s) => spy.observe(s));

  // deep link from the home page wheel (menu.html#pho-beef)
  if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView({ block: 'center' }), 80); }

  /* ----- cart UI ----- */
  const fab = document.getElementById('cart-fab');
  const drawer = document.getElementById('cart');
  const overlay = document.getElementById('cart-overlay');
  const body = drawer.querySelector('.cart__body');
  const totalEl = drawer.querySelector('.cart__total b');
  const orderBtn = drawer.querySelector('#order-wa');
  const open = () => { drawer.classList.add('is-open'); overlay.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
  const close = () => { drawer.classList.remove('is-open'); overlay.classList.remove('is-open'); document.body.style.overflow = ''; };
  fab.addEventListener('click', open);
  overlay.addEventListener('click', close);
  drawer.querySelector('.cart__close').addEventListener('click', close);
  drawer.querySelector('.cart__clear').addEventListener('click', () => { basket = {}; save(); document.querySelectorAll('[data-item] .item__foot').forEach((f) => { f.innerHTML = footHTML(f.closest('[data-item]').dataset.item); }); renderCart(); });
  body.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
    if (inc) setQty(inc.dataset.inc, (basket[inc.dataset.inc] || 0) + 1);
    if (dec) setQty(dec.dataset.dec, (basket[dec.dataset.dec] || 0) - 1);
  });

  function renderCart() {
    const n = count(), t = total();
    fab.classList.toggle('is-visible', n > 0);
    document.body.classList.toggle('has-cart', n > 0);
    fab.querySelector('b').textContent = n;
    fab.querySelector('span').textContent = 'View order ' + money(t);
    totalEl.textContent = money(t);
    if (!n) {
      body.innerHTML = `<div class="cart__empty"><svg viewBox="0 0 24 24"><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 11c0-3 1-5 3-7M13 11c0-3 1-5 3-7"/></svg><p>Your order is empty.<br>Add a few favourites from the menu.</p></div>`;
    } else {
      body.innerHTML = Object.entries(basket).map(([id, q]) => {
        const it = INDEX[id];
        return `<div class="cart-line"><div class="cart-line__name">${esc(it.name)}<small>${money(it.price)} each</small></div>
          <div class="stepper"><button type="button" data-dec="${id}" aria-label="Remove one">&minus;</button><output>${q}</output><button type="button" data-inc="${id}" aria-label="Add one">+</button></div>
          <div class="cart-line__total">${money(it.price * q)}</div></div>`;
      }).join('');
    }
    orderBtn.classList.toggle('is-disabled', !n);
    orderBtn.style.opacity = n ? '' : '.5';
    orderBtn.style.pointerEvents = n ? '' : 'none';
  }

  orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const outletKey = drawer.querySelector('input[name="outlet"]:checked').value;
    const o = OUTLETS[outletKey];
    const name = drawer.querySelector('#cust-name').value.trim();
    const when = drawer.querySelector('#cust-time').value.trim();
    const notes = drawer.querySelector('#cust-notes').value.trim();
    const lines = Object.entries(basket).map(([id, q]) => `${q} x ${INDEX[id].name} (${money(INDEX[id].price * q)})`);
    let msg = `Hi ${o.full}, I would like to place an order for self collection:\n\n${lines.join('\n')}\n\nTotal: ${money(total())} (no GST, no service charge)`;
    if (name) msg += `\nName: ${name}`;
    if (when) msg += `\nCollection time: ${when}`;
    if (notes) msg += `\nNotes: ${notes}`;
    msg += '\n\nSent from springrollstation.com.sg';
    window.open(`https://wa.me/${o.phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  renderCart();
})();
