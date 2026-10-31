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

## Photos still needed

Cards without a photo show a "Photo coming soon" tile. To add one, save a 4:3 photo (about 900 x 675 px, JPG) with the filename below into `assets/menu/` and reload. No code changes needed.

- `assets/menu/banh-mi-chicken-cutlet.jpg` for Crispy Chicken Cutlet Bánh Mì
- `assets/menu/banh-mi-egg-omelet.jpg` for Egg Omelet Bánh Mì
- `assets/menu/banh-mi-fish-fillet.jpg` for Crispy Fish Fillet Bánh Mì
- `assets/menu/banh-mi-iberico-char-siew.jpg` for Iberico Char Siew Bánh Mì
- `assets/menu/banh-mi-iberico-roast-pork.jpg` for Iberico Roast Pork Bánh Mì
- `assets/menu/banh-mi-prawn-sriracha.jpg` for Prawn Sriracha Mayo Bánh Mì
- `assets/menu/banh-mi-roast-pork.jpg` for Roast Pork Bánh Mì
- `assets/menu/banh-mi-smoked-salmon.jpg` for Smoked Salmon Wasabi Mayo Bánh Mì
- `assets/menu/banh-mi-vegetable.jpg` for Vegetable Bánh Mì
- `assets/menu/skewers-mutton.jpg` for Giant Mutton Skewers
- `assets/menu/spring-roll-egg.jpg` for Egg Omelet Roll
- `assets/menu/spring-roll-pork-prawn.jpg` for Pork and Prawn Roll
- `assets/menu/spring-roll-pork.jpg` for Pork Slice Roll
- `assets/menu/spring-roll-salmon.jpg` for Smoked Salmon and Wasabi Roll
- `assets/menu/spring-roll-vegetable.jpg` for Garden Vegetable Roll

The four corn items currently share one photo (`corn-all.jpg`). Replace any of them by changing the `img` value for that item in `js/menu-data.js`.

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
