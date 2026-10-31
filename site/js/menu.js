/* Menu page: renders the menu from MENU, opens an item popup for options, keeps a basket
   and sends the order over WhatsApp. */
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

  /* ----- index of every item ----- */
  const INDEX = {};
  MENU.forEach((cat) => (cat.items || []).forEach((it) => { INDEX[it.id] = { ...it, cat: cat.title }; }));
  const choiceById = (item, gid, cid) => {
    const g = (item.options || []).find((x) => x.id === gid); if (!g) return null;
    return g.choices.find((c) => c.id === cid) || null;
  };

  /* ----- basket: lines keyed by item + chosen options + note ----- */
  const KEY = 'srs-basket-v2';
  let basket = [];
  try { basket = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { basket = []; }
  basket = basket.filter((l) => INDEX[l.id]);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch (e) { /* private mode */ } };
  const lineKey = (id, opts, note) => id + '|' + opts.map((o) => o.g + ':' + o.c).sort().join(',') + '|' + (note || '');
  const unitPrice = (l) => { const it = INDEX[l.id]; return it.price + l.opts.reduce((a, o) => { const c = choiceById(it, o.g, o.c); return a + (c ? c.price : 0); }, 0); };
  const optLabels = (l) => l.opts.map((o) => { const c = choiceById(INDEX[l.id], o.g, o.c); return c ? c.name : ''; }).filter(Boolean);
  const count = () => basket.reduce((a, l) => a + l.qty, 0);
  const total = () => basket.reduce((a, l) => a + unitPrice(l) * l.qty, 0);
  const itemQty = (id) => basket.filter((l) => l.id === id).reduce((a, l) => a + l.qty, 0);

  function addLine(id, qty, opts, note) {
    const key = lineKey(id, opts, note);
    const found = basket.find((l) => l.key === key);
    if (found) found.qty = Math.min(20, found.qty + qty); else basket.push({ key, id, qty, opts, note: note || '' });
    save(); refreshCard(id); renderCart();
  }
  function setLineQty(key, qty) {
    const l = basket.find((x) => x.key === key); if (!l) return;
    const id = l.id;
    if (qty <= 0) basket = basket.filter((x) => x.key !== key); else l.qty = Math.min(20, qty);
    save(); refreshCard(id); renderCart();
  }
  function refreshCard(id) {
    document.querySelectorAll(`[data-item="${id}"] .item__foot`).forEach((f) => { f.innerHTML = footHTML(id); });
  }
  function footHTML(id) {
    const q = itemQty(id);
    const it = INDEX[id];
    const label = it.options && it.options.length ? 'Choose' : 'Add';
    return (q ? `<span class="in-order">${q} in order</span>` : '') + `<button class="add" type="button" data-open="${id}">${ICON_PLUS} ${label}</button>`;
  }

  /* ----- render menu ----- */
  function badge(b) {
    const cls = /new/i.test(b) ? 'badge--new' : /signature|best|premium|classic/i.test(b) ? 'badge--star' : /limited|exclusive/i.test(b) ? 'badge--limited' : '';
    return `<span class="badge ${cls}">${esc(b)}</span>`;
  }
  function itemCard(it) {
    return `<article class="item" data-item="${it.id}" id="${it.id}">
      <button class="item__img" type="button" data-open="${it.id}" aria-label="View ${esc(it.name)}">
        <img src="assets/menu/${esc(it.img)}" alt="${esc(it.name)}" loading="lazy" onerror="this.parentElement.classList.add('is-placeholder')">
        <div class="item__ph">${ICON_BOWL}<span>Photo coming soon</span></div>
        ${it.badges ? `<div class="item__badges">${it.badges.map(badge).join('')}</div>` : ''}
      </button>
      <div class="item__body">
        <div class="item__title"><h3>${esc(it.name)}${it.vn ? `<small>${esc(it.vn)}</small>` : ''}</h3><span class="item__price">${money(it.price)}</span></div>
        ${it.desc ? `<p class="item__desc">${esc(it.desc)}</p>` : ''}
        <div class="item__foot">${footHTML(it.id)}</div>
      </div>
    </article>`;
  }
  function rowCard(it) {
    return `<article class="item item--row" data-item="${it.id}" id="${it.id}">
      <button class="item__thumb" type="button" data-open="${it.id}" aria-label="View ${esc(it.name)}"><img src="assets/menu/${esc(it.img)}" alt="" loading="lazy" onerror="this.style.display='none'"></button>
      <div class="item__body"><div class="item__title"><h3>${esc(it.name)}</h3><span class="item__price">${money(it.price)}</span></div></div>
      <div class="item__foot">${footHTML(it.id)}</div>
    </article>`;
  }

  root.innerHTML = MENU.map((cat) => `
    <section class="menu-section" id="${cat.id}">
      <div class="wrap">
        <div class="menu-section__head">
          <div><p class="eyebrow">${esc(cat.vn || '')}</p><h2>${esc(cat.title)}</h2>${cat.blurb ? `<p>${esc(cat.blurb)}</p>` : ''}</div>
          ${cat.note ? `<span class="menu-note">${LEAF}${esc(cat.note)}</span>` : ''}
        </div>
        <div class="items${cat.compact ? ' items--rows' : ''}">${cat.items.map(cat.compact ? rowCard : itemCard).join('')}</div>
      </div>
    </section>`).join('');

  navWrap.innerHTML = MENU.map((c) => `<a href="#${c.id}" data-cat="${c.id}">${esc(c.title)}</a>`).join('');

  root.addEventListener('click', (e) => {
    const open = e.target.closest('[data-open]');
    if (open) openItem(open.dataset.open);
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

  /* ----- item popup ----- */
  const modal = document.getElementById('item-modal');
  const modalBody = modal.querySelector('.imodal__body');
  const modalOverlay = modal.querySelector('.imodal__overlay');
  let current = null;

  function openItem(id) {
    const it = INDEX[id]; if (!it) return;
    current = { id, qty: 1 };
    const groups = (it.options || []).map((g) => `
      <fieldset class="ogroup" data-group="${g.id}" data-type="${g.type}" ${g.required ? 'data-required="1"' : ''}>
        <legend><span>${esc(g.title)}</span><small>${g.required ? 'Required' : 'Optional'}${g.hint ? ' · ' + esc(g.hint) : ''}</small></legend>
        ${g.choices.map((c, i) => `
          <label class="ochoice">
            <input type="${g.type === 'single' ? 'radio' : 'checkbox'}" name="${g.id}" value="${c.id}" ${g.type === 'single' && g.required && i === 0 ? 'checked' : ''}>
            <span class="ochoice__box"></span>
            <span class="ochoice__name">${esc(c.name)}</span>
            <span class="ochoice__price">${c.price ? '+' + money(c.price) : ''}</span>
          </label>`).join('')}
      </fieldset>`).join('');
    modalBody.innerHTML = `
      <div class="imodal__img"><img src="assets/menu/${esc(it.img)}" alt="" onerror="this.parentElement.style.display='none'"></div>
      <div class="imodal__info">
        <p class="eyebrow">${esc(it.cat)}${it.vn ? ' · ' + esc(it.vn) : ''}</p>
        <h2>${esc(it.name)}</h2>
        <p class="imodal__price">${money(it.price)}</p>
        ${it.desc ? `<p class="imodal__desc">${esc(it.desc)}</p>` : ''}
        ${groups}
        <div class="ogroup ogroup--note"><label for="item-note"><span>Special requests</span><small>Optional</small></label><textarea id="item-note" rows="2" placeholder="Less spicy, no coriander, allergies"></textarea></div>
      </div>`;
    updateModalTotal();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.imodal__panel').scrollTop = 0;
  }
  function closeItem() { modal.classList.remove('is-open'); document.body.style.overflow = ''; current = null; }
  function selectedOpts() {
    const opts = [];
    modalBody.querySelectorAll('.ogroup[data-group]').forEach((g) => {
      g.querySelectorAll('input:checked').forEach((i) => opts.push({ g: g.dataset.group, c: i.value }));
    });
    return opts;
  }
  function updateModalTotal() {
    if (!current) return;
    const it = INDEX[current.id];
    const extra = selectedOpts().reduce((a, o) => { const c = choiceById(it, o.g, o.c); return a + (c ? c.price : 0); }, 0);
    modal.querySelector('.imodal__qty output').textContent = current.qty;
    modal.querySelector('#modal-add span').textContent = 'Add to order · ' + money((it.price + extra) * current.qty);
  }
  modalBody.addEventListener('change', updateModalTotal);
  modal.querySelector('.imodal__qty [data-dec]').addEventListener('click', () => { if (current && current.qty > 1) { current.qty--; updateModalTotal(); } });
  modal.querySelector('.imodal__qty [data-inc]').addEventListener('click', () => { if (current && current.qty < 20) { current.qty++; updateModalTotal(); } });
  modal.querySelector('#modal-add').addEventListener('click', () => {
    if (!current) return;
    const missing = [...modalBody.querySelectorAll('.ogroup[data-required]')].find((g) => !g.querySelector('input:checked'));
    if (missing) { missing.classList.add('is-missing'); missing.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const note = (modalBody.querySelector('#item-note').value || '').trim();
    addLine(current.id, current.qty, selectedOpts(), note);
    closeItem();
    fab.classList.add('is-bump'); setTimeout(() => fab.classList.remove('is-bump'), 500);
  });
  modal.querySelector('.imodal__close').addEventListener('click', closeItem);
  modalOverlay.addEventListener('click', closeItem);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeItem(); });

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
  drawer.querySelector('.cart__clear').addEventListener('click', () => { const ids = [...new Set(basket.map((l) => l.id))]; basket = []; save(); ids.forEach(refreshCard); renderCart(); });
  body.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
    if (inc) { const l = basket.find((x) => x.key === inc.dataset.inc); if (l) setLineQty(l.key, l.qty + 1); }
    if (dec) { const l = basket.find((x) => x.key === dec.dataset.dec); if (l) setLineQty(l.key, l.qty - 1); }
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
      body.innerHTML = basket.map((l) => {
        const it = INDEX[l.id]; const labels = optLabels(l);
        return `<div class="cart-line"><div class="cart-line__name">${esc(it.name)}<small>${money(unitPrice(l))} each</small>${labels.length ? `<em>${esc(labels.join(', '))}</em>` : ''}${l.note ? `<em>Note: ${esc(l.note)}</em>` : ''}</div>
          <div class="stepper"><button type="button" data-dec="${esc(l.key)}" aria-label="Remove one">&minus;</button><output>${l.qty}</output><button type="button" data-inc="${esc(l.key)}" aria-label="Add one">+</button></div>
          <div class="cart-line__total">${money(unitPrice(l) * l.qty)}</div></div>`;
      }).join('');
    }
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
    const lines = basket.map((l) => {
      const it = INDEX[l.id]; const labels = optLabels(l);
      let s = `${l.qty} x ${it.name}`;
      if (labels.length) s += ` (${labels.join(', ')})`;
      s += ` ${money(unitPrice(l) * l.qty)}`;
      if (l.note) s += `\n   Note: ${l.note}`;
      return s;
    });
    let msg = `Hi ${o.full}, I would like to place an order for self collection:\n\n${lines.join('\n')}\n\nTotal: ${money(total())} (no GST, no service charge)`;
    if (name) msg += `\nName: ${name}`;
    if (when) msg += `\nCollection time: ${when}`;
    if (notes) msg += `\nNotes: ${notes}`;
    msg += '\n\nSent from springrollstation.com';
    window.open(`https://wa.me/${o.phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  renderCart();
})();
