/* Spring Roll Station Menu Manager */
(function () {
  'use strict';
  const cfg = window.SRS_CONFIG || {};
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => [...(el || document).querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const money = (n) => '$' + Number(n || 0).toFixed(2);
  const slugify = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'item';
  const imgSrc = (u) => !u ? '' : /^https?:\/\//.test(u) ? u : '../assets/menu/' + u;

  const screens = { setup: $('#screen-setup'), login: $('#screen-login'), app: $('#screen-app') };
  const show = (k) => Object.entries(screens).forEach(([n, el]) => { el.hidden = n !== k; });
  let toastT;
  const toast = (msg, isErr) => { const t = $('#toast'); t.textContent = msg; t.classList.toggle('is-error', !!isErr); t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2800); };
  const fail = (e) => { console.error(e); toast((e && e.message) || 'Something went wrong', true); };

  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase) { show('setup'); return; }
  const sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);

  /* ---------- auth ---------- */
  $('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target; const err = $('#login-error'); err.hidden = true;
    const { error } = await sb.auth.signInWithPassword({ email: f.email.value.trim(), password: f.password.value });
    if (error) { err.textContent = 'Could not sign in. Check the email and password.'; err.hidden = false; return; }
  });
  $('#logout').addEventListener('click', () => sb.auth.signOut());

  // only accounts on the admin list (public.cms_admins) get into the manager
  let entered = false;
  async function enter(session) {
    if (!session) { entered = false; show('login'); return; }
    if (entered) return;
    const { data: ok, error } = await sb.rpc('is_cms_admin');
    if (error && !/is_cms_admin|function/i.test(error.message || '')) { fail(error); }
    if (!error && ok !== true) {
      await sb.auth.signOut();
      const err = $('#login-error'); err.textContent = 'This account is not allowed to edit the menu.'; err.hidden = false;
      show('login'); return;
    }
    entered = true; show('app'); loadAll();
  }
  sb.auth.onAuthStateChange((_ev, session) => { setTimeout(() => enter(session), 0); });

  /* ---------- state ---------- */
  let cats = [], items = [], groups = [], activeCat = null;

  async function loadAll() {
    try {
      const [c, i, g] = await Promise.all([
        sb.from('menu_categories').select('*').order('sort'),
        sb.from('menu_items').select('*').order('sort'),
        sb.from('menu_option_groups').select('*').order('sort')
      ]);
      if (c.error) throw c.error; if (i.error) throw i.error; if (g.error) throw g.error;
      cats = c.data; items = i.data; groups = g.data;
      if (!activeCat || !cats.find((x) => x.id === activeCat)) activeCat = cats[0] ? cats[0].id : null;
      $('#import-box').hidden = cats.length > 0;
      renderCats(); renderItems(); renderGroups();
    } catch (e) { fail(e); }
  }

  /* ---------- tabs ---------- */
  $$('.tab').forEach((t) => t.addEventListener('click', () => {
    $$('.tab').forEach((x) => x.classList.toggle('is-active', x === t));
    ['menu', 'groups', 'help'].forEach((k) => { $('#tab-' + k).hidden = t.dataset.tab !== k; });
  }));

  /* ---------- sections ---------- */
  function renderCats() {
    $('#cat-list').innerHTML = cats.map((c, idx) => `<li data-id="${c.id}" class="${c.id === activeCat ? 'is-active' : ''} ${c.visible ? '' : 'is-hidden'}">
      <span class="name">${esc(c.title)}</span><span class="count">${items.filter((i) => i.category_id === c.id).length}</span>
      <button type="button" class="mini" data-move="-1" title="Move up" ${idx === 0 ? 'disabled' : ''}>&uarr;</button>
      <button type="button" class="mini" data-move="1" title="Move down" ${idx === cats.length - 1 ? 'disabled' : ''}>&darr;</button>
      <button type="button" class="mini" data-edit title="Edit section">&#9998;</button></li>`).join('') || '<li class="muted" style="cursor:default">No sections yet</li>';
  }
  $('#cat-list').addEventListener('click', async (e) => {
    const li = e.target.closest('li[data-id]'); if (!li) return;
    const id = li.dataset.id;
    const mv = e.target.closest('[data-move]');
    if (mv) { await moveRow(cats, id, +mv.dataset.move, 'menu_categories'); return; }
    if (e.target.closest('[data-edit]')) { openCatForm(cats.find((c) => c.id === id)); return; }
    activeCat = id; renderCats(); renderItems();
  });
  $('#add-category').addEventListener('click', () => openCatForm(null));

  const catDrawer = $('#cat-drawer'), catForm = $('#cat-form');
  function openCatForm(c) {
    catForm.reset();
    $('#cat-form-title').textContent = c ? 'Edit section' : 'New section';
    $('#cat-delete').hidden = !c;
    if (c) { catForm.id.value = c.id; catForm.slug.value = c.slug; catForm.title.value = c.title; catForm.vn.value = c.vn || ''; catForm.blurb.value = c.blurb || ''; catForm.note.value = c.note || ''; catForm.visible.checked = !!c.visible; }
    catDrawer.hidden = false;
  }
  catForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = catForm;
    const row = { title: f.title.value.trim(), vn: f.vn.value.trim(), blurb: f.blurb.value.trim(), note: f.note.value.trim(), visible: f.visible.checked };
    try {
      if (f.id.value) {
        const { error } = await sb.from('menu_categories').update(row).eq('id', f.id.value); if (error) throw error;
      } else {
        row.slug = uniqueSlug(slugify(row.title), cats); row.sort = cats.length ? Math.max(...cats.map((c) => c.sort)) + 1 : 0;
        const { data, error } = await sb.from('menu_categories').insert(row).select().single(); if (error) throw error; activeCat = data.id;
      }
      catDrawer.hidden = true; toast('Section saved'); loadAll();
    } catch (err) { fail(err); }
  });
  $('#cat-delete').addEventListener('click', async () => {
    const c = cats.find((x) => x.id === catForm.id.value); if (!c) return;
    const n = items.filter((i) => i.category_id === c.id).length;
    if (!confirm(`Delete "${c.title}"${n ? ` and its ${n} item${n > 1 ? 's' : ''}` : ''}? This cannot be undone.`)) return;
    try { const { error } = await sb.from('menu_categories').delete().eq('id', c.id); if (error) throw error; catDrawer.hidden = true; toast('Section deleted'); loadAll(); } catch (err) { fail(err); }
  });

  /* ---------- items ---------- */
  function renderItems() {
    const c = cats.find((x) => x.id === activeCat);
    const head = $('#cat-head');
    if (!c) { head.innerHTML = '<div><h2>Menu</h2><p class="muted">Add a section to get started.</p></div>'; $('#item-list').innerHTML = ''; return; }
    head.innerHTML = `<div><h2>${esc(c.title)} ${c.vn ? `<span class="muted" style="font-size:1rem;font-family:var(--font-body)">${esc(c.vn)}</span>` : ''}</h2>${c.blurb ? `<p class="muted">${esc(c.blurb)}</p>` : ''}${c.visible ? '' : '<p class="chip chip--off" style="display:inline-block;margin-top:6px">Hidden from website</p>'}</div>
      <div class="actions"><button type="button" class="btn btn--sm" id="edit-cat">Edit section</button><button type="button" class="btn btn--primary btn--sm" id="add-item">+ Item</button></div>`;
    $('#edit-cat').addEventListener('click', () => openCatForm(c));
    $('#add-item').addEventListener('click', () => openItemForm(null));
    const list = items.filter((i) => i.category_id === c.id);
    $('#item-list').innerHTML = list.map((it, idx) => `<div class="item ${it.visible ? '' : 'is-hidden'}" data-id="${it.id}">
      ${it.image_url ? `<img class="item__img" src="${esc(imgSrc(it.image_url))}" alt="">` : '<div class="item__img"></div>'}
      <div class="item__main"><b>${esc(it.name)}</b>${it.vn ? `<small>${esc(it.vn)}</small>` : ''}
        <div class="item__meta">${(it.badges || []).map((b) => `<span class="chip">${esc(b)}</span>`).join('')}${(it.option_group_keys || []).length ? `<span class="chip">${it.option_group_keys.length} add-on group${it.option_group_keys.length > 1 ? 's' : ''}</span>` : ''}${it.visible ? '' : '<span class="chip chip--off">Hidden</span>'}${it.available ? '' : '<span class="chip chip--sold">Sold out</span>'}</div></div>
      <div class="item__right"><span class="item__price">${money(it.price)}</span>
        <button type="button" class="mini" data-move="-1" title="Move up" ${idx === 0 ? 'disabled' : ''}>&uarr;</button>
        <button type="button" class="mini" data-move="1" title="Move down" ${idx === list.length - 1 ? 'disabled' : ''}>&darr;</button>
        <button type="button" class="mini" data-sold title="${it.available ? 'Mark sold out' : 'Mark available'}">${it.available ? '&#9711;' : '&#10003;'}</button>
        <button type="button" class="btn btn--sm" data-edit>Edit</button></div></div>`).join('') || '<div class="empty">No items in this section yet. Click + Item to add one.</div>';
  }
  $('#item-list').addEventListener('click', async (e) => {
    const row = e.target.closest('.item[data-id]'); if (!row) return;
    const it = items.find((x) => x.id === row.dataset.id); if (!it) return;
    const mv = e.target.closest('[data-move]');
    if (mv) { await moveRow(items.filter((x) => x.category_id === it.category_id), it.id, +mv.dataset.move, 'menu_items'); return; }
    if (e.target.closest('[data-sold]')) { try { const { error } = await sb.from('menu_items').update({ available: !it.available }).eq('id', it.id); if (error) throw error; toast(it.available ? 'Marked sold out' : 'Marked available'); loadAll(); } catch (err) { fail(err); } return; }
    if (e.target.closest('[data-edit]')) openItemForm(it);
  });

  const itemDrawer = $('#item-drawer'), itemForm = $('#item-form');
  function openItemForm(it) {
    itemForm.reset();
    $('#item-form-title').textContent = it ? 'Edit item' : 'New item';
    $('#item-delete').hidden = !it;
    $('#item-category').innerHTML = cats.map((c) => `<option value="${c.id}">${esc(c.title)}</option>`).join('');
    $('#item-groups').innerHTML = groups.map((g) => `<label><input type="checkbox" name="groups" value="${esc(g.key)}"><span>${esc(g.title)}</span><small>${g.type === 'single' ? 'pick one' : 'pick any'} · ${(g.choices || []).length} choices</small></label>`).join('') || '<p class="muted small">No add-on groups yet. Create them in the Add-on groups tab.</p>';
    itemForm.category_id.value = it ? it.category_id : activeCat;
    if (it) {
      itemForm.id.value = it.id; itemForm.slug.value = it.slug; itemForm.name.value = it.name; itemForm.vn.value = it.vn || ''; itemForm.price.value = Number(it.price).toFixed(2);
      itemForm.description.value = it.description || ''; itemForm.badges.value = (it.badges || []).join(', '); itemForm.image_url.value = it.image_url || '';
      itemForm.visible.checked = !!it.visible; itemForm.available.checked = !!it.available;
      (it.option_group_keys || []).forEach((k) => { const cb = itemForm.querySelector(`input[name=groups][value="${k}"]`); if (cb) cb.checked = true; });
    }
    setPhotoPreview(itemForm.image_url.value); $('#item-photo-status').textContent = '';
    itemDrawer.hidden = false;
  }
  function setPhotoPreview(url) { $('#item-photo-preview').innerHTML = url ? `<img src="${esc(imgSrc(url))}" alt="">` : '<span>No photo</span>'; }
  $('#item-photo').addEventListener('change', async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const status = $('#item-photo-status'); status.textContent = 'Uploading...';
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
      const path = `${slugify(itemForm.name.value || 'item')}-${Date.now()}.${ext}`;
      const { error } = await sb.storage.from('menu').upload(path, file, { upsert: true, contentType: file.type || undefined }); if (error) throw error;
      const { data } = sb.storage.from('menu').getPublicUrl(path);
      itemForm.image_url.value = data.publicUrl; setPhotoPreview(data.publicUrl); status.textContent = 'Photo uploaded. Save the item to keep it.';
    } catch (err) { status.textContent = ''; fail(err); }
    e.target.value = '';
  });
  $('#item-photo-clear').addEventListener('click', () => { itemForm.image_url.value = ''; setPhotoPreview(''); });
  itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = itemForm;
    const row = {
      category_id: f.category_id.value, name: f.name.value.trim(), vn: f.vn.value.trim(), price: Number(f.price.value) || 0,
      description: f.description.value.trim(), badges: f.badges.value.split(',').map((s) => s.trim()).filter(Boolean),
      image_url: f.image_url.value, option_group_keys: $$('input[name=groups]:checked', f).map((c) => c.value),
      visible: f.visible.checked, available: f.available.checked
    };
    try {
      if (f.id.value) {
        const { error } = await sb.from('menu_items').update(row).eq('id', f.id.value); if (error) throw error;
      } else {
        row.slug = uniqueSlug(slugify(row.name), items);
        const inCat = items.filter((i) => i.category_id === row.category_id);
        row.sort = inCat.length ? Math.max(...inCat.map((i) => i.sort)) + 1 : 0;
        const { error } = await sb.from('menu_items').insert(row); if (error) throw error;
      }
      activeCat = row.category_id; itemDrawer.hidden = true; toast('Item saved'); loadAll();
    } catch (err) { fail(err); }
  });
  $('#item-delete').addEventListener('click', async () => {
    const it = items.find((x) => x.id === itemForm.id.value); if (!it) return;
    if (!confirm(`Delete "${it.name}"? This cannot be undone.`)) return;
    try { const { error } = await sb.from('menu_items').delete().eq('id', it.id); if (error) throw error; itemDrawer.hidden = true; toast('Item deleted'); loadAll(); } catch (err) { fail(err); }
  });

  /* ---------- option groups ---------- */
  function renderGroups() {
    $('#group-list').innerHTML = groups.map((g) => `<div class="group" data-id="${g.id}"><div><b>${esc(g.title)} <span class="chip">${g.type === 'single' ? 'pick one' : 'pick any'}${g.required ? ' · required' : ''}</span></b>
      <p>${(g.choices || []).map((c) => esc(c.name) + (c.price ? ' +' + money(c.price) : '')).join(', ') || 'No choices yet'}</p>
      <p class="small muted">Used by ${items.filter((i) => (i.option_group_keys || []).includes(g.key)).length} item(s)</p></div><button type="button" class="btn btn--sm">Edit</button></div>`).join('') || '<div class="empty">No add-on groups yet.</div>';
  }
  $('#group-list').addEventListener('click', (e) => { const g = e.target.closest('.group[data-id]'); if (g) openGroupForm(groups.find((x) => x.id === g.dataset.id)); });
  $('#add-group').addEventListener('click', () => openGroupForm(null));
  const groupDrawer = $('#group-drawer'), groupForm = $('#group-form');
  function choiceRow(c) {
    return `<div class="choice-row"><input placeholder="Choice name" value="${esc(c ? c.name : '')}" data-name><input type="number" step="0.10" min="0" placeholder="0.00" value="${c && c.price ? Number(c.price).toFixed(2) : ''}" data-price><button type="button" class="icon-btn" data-remove aria-label="Remove">&times;</button></div>`;
  }
  function openGroupForm(g) {
    groupForm.reset();
    $('#group-form-title').textContent = g ? 'Edit add-on group' : 'New add-on group';
    $('#group-delete').hidden = !g;
    if (g) { groupForm.id.value = g.id; groupForm.key.value = g.key; groupForm.title.value = g.title; groupForm.hint.value = g.hint || ''; groupForm.type.value = g.type; groupForm.required.checked = !!g.required; }
    $('#choice-rows').innerHTML = (g && g.choices && g.choices.length ? g.choices : [null, null]).map(choiceRow).join('');
    groupDrawer.hidden = false;
  }
  $('#add-choice').addEventListener('click', () => $('#choice-rows').insertAdjacentHTML('beforeend', choiceRow(null)));
  $('#choice-rows').addEventListener('click', (e) => { const r = e.target.closest('[data-remove]'); if (r) r.closest('.choice-row').remove(); });
  groupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = groupForm;
    const choices = $$('.choice-row', f).map((r) => ({ name: $('[data-name]', r).value.trim(), price: Number($('[data-price]', r).value) || 0 })).filter((c) => c.name).map((c, i) => ({ id: slugify(c.name) + '-' + i, name: c.name, price: c.price }));
    const row = { title: f.title.value.trim(), hint: f.hint.value.trim(), type: f.type.value, required: f.required.checked, choices };
    try {
      if (f.id.value) {
        const { error } = await sb.from('menu_option_groups').update(row).eq('id', f.id.value); if (error) throw error;
      } else {
        row.key = uniqueSlug(slugify(row.title), groups, 'key'); row.sort = groups.length;
        const { error } = await sb.from('menu_option_groups').insert(row); if (error) throw error;
      }
      groupDrawer.hidden = true; toast('Group saved'); loadAll();
    } catch (err) { fail(err); }
  });
  $('#group-delete').addEventListener('click', async () => {
    const g = groups.find((x) => x.id === groupForm.id.value); if (!g) return;
    const used = items.filter((i) => (i.option_group_keys || []).includes(g.key)).length;
    if (!confirm(`Delete "${g.title}"?${used ? ` It is used by ${used} item(s); they will lose these choices.` : ''}`)) return;
    try {
      const { error } = await sb.from('menu_option_groups').delete().eq('id', g.id); if (error) throw error;
      for (const it of items.filter((i) => (i.option_group_keys || []).includes(g.key))) {
        await sb.from('menu_items').update({ option_group_keys: it.option_group_keys.filter((k) => k !== g.key) }).eq('id', it.id);
      }
      groupDrawer.hidden = true; toast('Group deleted'); loadAll();
    } catch (err) { fail(err); }
  });

  /* ---------- helpers ---------- */
  function uniqueSlug(base, rows, field) {
    const f = field || 'slug'; let s = base, n = 2;
    while (rows.some((r) => r[f] === s)) s = base + '-' + n++;
    return s;
  }
  async function moveRow(list, id, dir, table) {
    const idx = list.findIndex((r) => r.id === id); const j = idx + dir;
    if (idx < 0 || j < 0 || j >= list.length) return;
    const a = list[idx], b = list[j];
    const sa = a.sort, sbv = b.sort;
    const newA = sa === sbv ? (dir > 0 ? sbv + 1 : sbv - 1) : sbv, newB = sa === sbv ? sbv : sa;
    try {
      const r1 = await sb.from(table).update({ sort: newA }).eq('id', a.id); if (r1.error) throw r1.error;
      const r2 = await sb.from(table).update({ sort: newB }).eq('id', b.id); if (r2.error) throw r2.error;
      loadAll();
    } catch (err) { fail(err); }
  }
  $$('[data-close]').forEach((el) => el.addEventListener('click', () => { el.closest('.drawer').hidden = true; }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.drawer').forEach((d) => { d.hidden = true; }); });

  /* ---------- import the built in menu (first run) ---------- */
  $('#import-menu').addEventListener('click', async () => {
    const MENU = window.MENU || [];
    if (!MENU.length) { toast('No built in menu found', true); return; }
    if (!confirm('Load the current website menu into the database? Do this once, on an empty database.')) return;
    const btn = $('#import-menu'); btn.disabled = true; btn.textContent = 'Importing...';
    try {
      const groupMap = {}; const groupRows = [];
      MENU.forEach((c) => c.items.forEach((it) => (it.options || []).forEach((g) => {
        if (groupMap[g.id]) return;
        groupMap[g.id] = true;
        groupRows.push({ key: g.id, title: g.title, hint: g.hint || '', type: g.type, required: !!g.required, choices: g.choices.map((ch) => ({ id: ch.id, name: ch.name, price: ch.price || 0 })), sort: groupRows.length });
      })));
      if (groupRows.length) { const { error } = await sb.from('menu_option_groups').upsert(groupRows, { onConflict: 'key' }); if (error) throw error; }
      for (let ci = 0; ci < MENU.length; ci++) {
        const c = MENU[ci];
        const { data: cat, error } = await sb.from('menu_categories').insert({ slug: c.id, title: c.title, vn: c.vn || '', blurb: c.blurb || '', note: c.note || '', sort: ci, visible: true }).select().single();
        if (error) throw error;
        const rows = c.items.map((it, ii) => ({ category_id: cat.id, slug: it.id, name: it.name, vn: it.vn || '', description: it.desc || '', price: it.price, image_url: it.img || '', badges: it.badges || [], option_group_keys: (it.options || []).map((g) => g.id), sort: ii, visible: true, available: true }));
        if (rows.length) { const { error: e2 } = await sb.from('menu_items').insert(rows); if (e2) throw e2; }
      }
      toast('Menu imported'); loadAll();
    } catch (err) { fail(err); }
    btn.disabled = false; btn.textContent = 'Import current menu';
  });

  /* ---------- start ---------- */
  sb.auth.getSession().then(({ data }) => enter(data.session));
})();
