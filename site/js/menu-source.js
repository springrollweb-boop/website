/* Loads the menu for the website: from Supabase when configured, otherwise from menu-data.js. */
(function () {
  'use strict';
  const cfg = window.SRS_CONFIG || {};
  const fallback = () => window.MENU || [];

  const imgSrc = (img) => !img ? '' : /^https?:\/\//.test(img) ? img : 'assets/menu/' + img;
  window.menuImageSrc = imgSrc;

  async function fromSupabase() {
    const base = cfg.supabaseUrl.replace(/\/$/, '');
    const headers = { apikey: cfg.supabaseAnonKey, Authorization: 'Bearer ' + cfg.supabaseAnonKey };
    const [catsRes, groupsRes] = await Promise.all([
      fetch(base + '/rest/v1/menu_categories?select=*,menu_items(*)&order=sort.asc&menu_items.order=sort.asc', { headers }),
      fetch(base + '/rest/v1/menu_option_groups?select=*&order=sort.asc', { headers })
    ]);
    if (!catsRes.ok || !groupsRes.ok) throw new Error('menu request failed');
    const cats = await catsRes.json();
    const groups = await groupsRes.json();
    const byKey = {};
    groups.forEach((g) => { byKey[g.key] = { id: g.key, title: g.title, hint: g.hint || '', type: g.type, required: !!g.required, choices: (g.choices || []).map((c) => ({ id: c.id, name: c.name, price: Number(c.price) || 0 })) }; });
    const menu = cats.filter((c) => c.visible).map((c) => ({
      id: c.slug, title: c.title, vn: c.vn || '', blurb: c.blurb || '', note: c.note || '',
      items: (c.menu_items || []).filter((it) => it.visible).map((it) => ({
        id: it.slug, name: it.name, vn: it.vn || '', price: Number(it.price) || 0, img: it.image_url || '',
        badges: it.badges && it.badges.length ? it.badges : undefined, desc: it.description || '',
        available: it.available !== false,
        options: (it.option_group_keys || []).map((k) => byKey[k]).filter(Boolean)
      }))
    })).filter((c) => c.items.length);
    if (!menu.length) throw new Error('menu is empty');
    return menu;
  }

  window.loadMenu = async function () {
    if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
      try { return await fromSupabase(); } catch (e) { console.warn('Menu: using the built in menu because Supabase did not answer.', e); }
    }
    return fallback();
  };
})();
