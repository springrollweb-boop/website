# Spring Roll Station website

A static site: plain HTML, CSS and JavaScript, no build step and no framework.

## Run it locally

From the `Springrollstation` folder:

```bash
python3 -m http.server 8765 --directory site
```

Then open http://localhost:8765 in a browser. Any static host (Netlify, Vercel, GitHub Pages, cPanel) can serve the `site` folder as is.

## Pages

- `index.html`: home page with the spinning phở wheel, signature favourites, story teaser and both outlets
- `about.html`: the story, what makes Spring Roll Station different
- `menu.html`: full menu with prices and the WhatsApp ordering basket
- `contact.html`: outlets, maps, hours, contact form

## Edit the menu and prices

Everything on the menu page comes from `js/menu-data.js`. Each item has a name, price, description, badges and a photo filename. Change a price there and it updates everywhere, including the basket. Outlet names, numbers and hours used by the basket are in `window.OUTLETS` at the bottom of the same file.

## Menu photos

Every item has a photo in `assets/menu/`, taken from the restaurant's GrabFood listing (300 px square). To replace one, save a square JPG with the same filename (the `img` value in `js/menu-data.js`) over the existing file. The Signature Prawn Phở uses the poster bowl image `pho-prawn.jpg`.

## Item options

Items can carry option groups (`options` in `js/menu-data.js`), shown in a popup when the customer taps the item: `single` groups are pick one, `multi` groups are pick any, and a choice with a `price` adds that amount. Phở add-ons, spring roll sauces and the grilled meat choice are already defined at the top of the file.

## Hero wheel images

- Bowls: `assets/bowls/*.webp` (transparent PNG exports converted to WebP)
- Backgrounds: `assets/bg/<bowl>-desktop.jpg` and `assets/bg/<bowl>-mobile.jpg`

The wheel order and the text shown for each bowl live at the top of `js/main.js` in the `BOWLS` array.

## Contact details

Phone numbers, addresses, hours and the email address are set in the pages themselves and in `js/menu-data.js`. The WhatsApp links use the international format (65 followed by the number).

## Regenerating the pages

The header, footer and WhatsApp button are shared by all four pages. They are assembled by `build-pages.py` in the folder above `site`. Edit the page content there and run:

```bash
python3 build-pages.py
```

You can also edit the HTML files directly if you prefer; just keep the four headers and footers in step.

## Menu Manager (CMS)

The restaurant updates the menu at `/admin` (for example https://www.springrollstation.com/admin). It is a static page that talks to a Supabase project: sign in with email and password, then add or edit sections, items, prices, photos, badges, sold out flags and add-on groups. Changes show on the website immediately.

Setting it up for a new Supabase project:

1. Create the project at supabase.com, then open SQL Editor, paste the contents of `../supabase/schema.sql` and run it. This creates the tables, the access rules and the `menu` photo bucket. Then run `../supabase/admins.sql`, which limits every change to the emails on the admin list (the director's email is already on it).
2. In Authentication, turn off public sign ups (Providers > Email > disable "Allow new users to sign up") and add the restaurant's login under Users > Add user (email and password, confirm the email).
3. In Project Settings > API, copy the Project URL and the anon public key into `site/js/config.js`, then push.
4. Load the menu into the database once: either run `../supabase/seed-menu.sql` in the SQL Editor (no login needed), or open `/admin`, sign in, and click "Import current menu". Both copy the menu from `js/menu-data.js`. The SQL file is safe to run twice.

To give someone else edit access, run `insert into public.cms_admins (email) values ('their@email');` in the SQL editor and add them under Authentication > Users.

Until the keys are filled in, the website keeps showing the menu from `js/menu-data.js`, and `/admin` shows a setup notice. If Supabase is ever unreachable, the website falls back to that file as well.
