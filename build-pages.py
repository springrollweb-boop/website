import os,time
VER=str(int(time.time()))
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")

IC = {
 'wa': '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
 'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/></svg>',
 'pin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
 'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
 'arrow': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 'chevL': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
 'chevR': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
 'down': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
 'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
 'ig': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
}

GRAB_URL = 'https://food.grab.com/sg/en/restaurant/spring-roll-station-novena-regency-delivery/4-C62XRJ5GNT2KHA'
FOODPANDA_URL = 'https://www.foodpanda.sg/restaurant/uqc0/spring-roll-station-novena-uqc0'
FOODPANDA_REVIEWS = 'https://www.foodpanda.sg/restaurant/uqc0/spring-roll-station-novena-uqc0/reviews'

NOVENA = dict(key='novena', name='Novena', full='Spring Roll Station (Novena)', addr1='275 Thomson Road #01-26', addr2='Novena Regency, Singapore 307645', hours='Open daily, 10:00am to 12:00 midnight', phone='6588019189', disp='8801 9189', q='275+Thomson+Road+%2301-26+Novena+Regency+Singapore+307645', reviews='https://maps.app.goo.gl/sTt1KpUs1vbNK59u8', tag='Original recipes, new neighbourhood', photo='novena-1.jpg')
SKY = dict(key='skysuites', name='Skysuites at Anson', full='Spring Roll Station (Skysuites at Anson)', addr1='8 Enggor Street #01-01/02', addr2='Skysuites at Anson, Singapore 079718', hours='Open daily, 10:00am to 10:00pm', phone='6580170610', disp='8017 0610', q='8+Enggor+Street+%2301-01+Skysuites+at+Anson+Singapore+079718', reviews='https://maps.app.goo.gl/LiJCAaeC4BiWTcBX6', tag='Casual cafe style dining in Tanjong Pagar', photo='skysuites-1.jpg')

def head(title, desc, extra=''):
    return f'''<!DOCTYPE html>
<html lang="en-SG">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#FDDE80">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="192x192" href="assets/favicon.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..700,0..100&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
<script>document.documentElement.classList.add('js');setTimeout(function(){{document.documentElement.classList.add('rv-ready')}},4000)</script>
<link rel="stylesheet" href="css/style.css?v=VER">
{extra}
</head>
<body>'''

def nav(active, solid=False):
    def li(href, label, key):
        cls = ' class="is-active"' if key == active else ''
        return f'<a href="{href}"{cls}>{label}</a>'
    return f'''<header class="nav{' nav--solid' if solid else ''}">
  <div class="wrap">
    <a class="brand" href="index.html"><img src="assets/logo.webp" alt="Spring Roll Station logo" width="46" height="46"><span>Spring Roll Station</span></a>
    <nav class="nav-links" aria-label="Main">
      {li('index.html','Home','home')}
      {li('about.html','About Us','about')}
      {li('menu.html','Menu','menu')}
      {li('contact.html','Contact Us','contact')}
      <a class="btn" href="menu.html">View Our Menu</a>
    </nav>
    <div class="nav-cta">
      <a class="btn btn--primary btn--sm" href="menu.html">View Our Menu</a>
      <button class="nav-toggle" type="button" aria-label="Open menu"><span></span></button>
    </div>
  </div>
</header>'''

def wa_float():
    return f'''<div class="wa-float">
  <div class="wa-float__menu" role="menu">
    <p>Chat with an outlet</p>
    <a href="https://wa.me/{NOVENA['phone']}" target="_blank" rel="noopener">Novena<small>{NOVENA['disp']} · till midnight</small></a>
    <a href="https://wa.me/{SKY['phone']}" target="_blank" rel="noopener">Skysuites at Anson<small>{SKY['disp']} · till 10pm</small></a>
  </div>
  <button class="wa-float__btn" type="button" aria-label="WhatsApp us">{IC['wa']}</button>
</div>'''

def footer():
    return f'''<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <a class="brand" href="index.html"><img src="assets/logo.webp" alt="" width="46" height="46"><span>Spring Roll Station</span></a>
        <p>Authentic Vietnamese favourites, made fresh and served with heart. Phở, bánh mì, fresh spring rolls, Vietnamese coffee and more.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul><li><a href="index.html">Home</a></li><li><a href="about.html">About Us</a></li><li><a href="menu.html">Menu</a></li><li><a href="contact.html">Contact Us</a></li></ul>
      </div>
      <div>
        <h4>Novena</h4>
        <ul><li>{NOVENA['addr1']}<br>{NOVENA['addr2']}</li><li>Daily 10:00am to 12:00 midnight</li><li><a href="https://wa.me/{NOVENA['phone']}" target="_blank" rel="noopener">WhatsApp {NOVENA['disp']}</a></li></ul>
      </div>
      <div>
        <h4>Skysuites at Anson</h4>
        <ul><li>{SKY['addr1']}<br>{SKY['addr2']}</li><li>Daily 10:00am to 10:00pm</li><li><a href="https://wa.me/{SKY['phone']}" target="_blank" rel="noopener">WhatsApp {SKY['disp']}</a></li></ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; <span id="year">2026</span> Spring Roll Station. All rights reserved.</span>
      <span><a href="https://www.instagram.com/spring_roll_station/" target="_blank" rel="noopener">Instagram @spring_roll_station</a> · <a href="mailto:director@springrollstation.com.sg">director@springrollstation.com.sg</a></span>
    </div>
  </div>
</footer>
{wa_float()}
<script src="js/main.js?v=VER"></script>
<script>document.getElementById('year').textContent=new Date().getFullYear()</script>'''

def outlet_card(o, with_map=False):
    m = f'''<div class="map"><iframe title="Map of {o['full']}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q={o['q']}&output=embed"></iframe></div>''' if with_map else ''
    return f'''<article class="outlet reveal">
  <div class="outlet__photo"><img src="assets/outlet/{o['photo']}" alt="{o['full']} storefront" loading="lazy"></div>
  <h3>{o['full']}</h3>
  <address>{o['addr1']}<br>{o['addr2']}</address>
  <div class="hours">{IC['clock']}<span>{o['hours']}</span></div>
  {m}
  <div class="outlet__actions">
    <a class="btn btn--wa btn--sm" href="https://wa.me/{o['phone']}" target="_blank" rel="noopener">{IC['wa']} WhatsApp {o['disp']}</a>
    <a class="btn btn--ghost btn--sm" href="tel:+{o['phone']}">{IC['phone']} Call</a>
    <a class="btn btn--ghost btn--sm" href="https://www.google.com/maps/dir/?api=1&destination={o['q']}" target="_blank" rel="noopener">{IC['pin']} Directions</a>
  </div>
</article>'''



HERO_PHOTOS = ['novena-1.jpg', 'skysuites-1.jpg', 'novena-2.jpg', 'skysuites-3.jpg', 'novena-3.jpg', 'skysuites-2.jpg', 'skysuites-4.jpg']
def hero_photos():
    return '<div class="page-hero__photos" aria-hidden="true">' + ''.join(f'<img src="assets/outlet/{p}" alt="" class="{"is-active" if i == 0 else ""}" loading="{"eager" if i < 2 else "lazy"}">' for i, p in enumerate(HERO_PHOTOS)) + '</div>'

def cta():
    return f'''<section class="cta section--tight">
  <div class="wrap">
    <div>
      <p class="eyebrow">Hungry yet?</p>
      <h2>Order for collection on WhatsApp, or come say hi.</h2>
    </div>
    <div class="cta__actions">
      <a class="btn btn--primary" href="menu.html">View Our Menu {IC['arrow']}</a>
      <a class="btn btn--dark" href="contact.html">Find an outlet</a>
    </div>
  </div>
</section>'''


# ---------------- GOOGLE REVIEWS (genuine, from Google Maps, Spring Roll Station Novena) ----------------
REVIEWS = [
  ("D.", 5, "I've tried the beef pho and chicken pho, both are good but the beef is my favourite. Soup is incredibly tasty, noodles are springy and the meat is tender."),
  ("Nhung Lương Hồng", 5, "I think these are the best shrimp and pork spring rolls I've ever eaten in Singapore. The filling is fresh, delicious, and generous. The flavor is very authentically Vietnamese. I will definitely buy them again."),
  ("Gigi L", 5, "The chicken and pork pho here is very flavourful without being salty. The portion size is very satisfying for the price. Dare I say it might be one of the best noodles I've had around in Singapore."),
  ("Antonio Oliveiro", 5, "The pork banh mi was delicious! Very soft yet crispy texture to the baguette and the fillings were very generous! I could not hold myself back from finishing half before taking a picture. Value for money!"),
  ("Rachel Low", 5, "AMAZING FOOD!!!! Never had such good pho before. Ordered the pork pho and omg the pork is sooooo tender and they are so generous!!"),
  ("Heidi Kwon", 5, "I found this place randomly on Google Maps when I looked up banh mi and it is safe to say that this place has the best banh mi. I've had my fair share of banh mi in the states but this one was off the charts."),
  ("C Tan", 4, "The Bun Cha is one of the best I've tried in Singapore. The meat is well grilled and the portion is rather substantial. I'll be back to try their banh mi."),
  ("Chrissy Andrews", 4, "Food was fantastic! Made to order, very fresh and tasty. And the service was great, very friendly and helpful."),
  ("Felicia Liu", 4, "Delicious bowl of chicken pho!"),
]
GOOGLE_G = '<svg class="g-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.7 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.5z"/><path fill="#FBBC05" d="M10.5 28.6A14.5 14.5 0 0 1 9.7 24c0-1.6.3-3.1.8-4.6l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.2-13.5-10l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>'
STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 6.1 6.7.8-4.9 4.6 1.3 6.7L12 17.5 6 20.8l1.3-6.7-4.9-4.6 6.7-.8z"/></svg>'
def stars(n):
    return '<span class="stars" aria-label="' + str(n) + ' out of 5 stars">' + ''.join(f'<i class="{"on" if i < n else ""}">{STAR}</i>' for i in range(5)) + '</span>'
def rcard(name, n, text):
    return f'<article class="rcard"><div class="rcard__top">{stars(n)}{GOOGLE_G}</div><p>{text}</p><footer><b>{name}</b><span>Google review</span></footer></article>'
def lane(items, direction):
    cards = ''.join(rcard(*r) for r in items)
    return f'<div class="marquee" data-dir="{direction}"><div class="marquee__track">{cards}{cards}</div></div>'
def reviews_section():
    a, bb = REVIEWS[:5], REVIEWS[5:]
    return f"""<section class="section reviews" id="reviews">
  <div class="wrap">
    <div class="reviews__head reveal">
      <p class="eyebrow">Customer reviews</p>
      <h2>What our customers say</h2>
      <p class="lead">Genuine Google reviews from the people who eat with us, in their own words.</p>
      <div class="gscore">
        {GOOGLE_G}
        <div>
          <div class="gscore__row"><b>4.7</b><span class="stars stars--lg" aria-label="4.7 out of 5 stars"><i class="on">{STAR}</i><i class="on">{STAR}</i><i class="on">{STAR}</i><i class="on">{STAR}</i><i class="on part">{STAR}</i></span></div>
          <small>40 Google reviews</small>
        </div>
      </div>
      <div class="reviews__actions">
        <a class="btn btn--ghost btn--sm" href="{NOVENA['reviews']}" target="_blank" rel="noopener">Write a review</a>
      </div>
    </div>
  </div>
  <div class="reviews__lanes">
    {lane(a, 'left')}
    {lane(bb + a[:2], 'right')}
  </div>
</section>"""

# ---------------- HOME ----------------
bowls = [('chicken','Chicken phở'),('beef','Beef phở'),('ribeye','Ribeye phở'),('prawn','Signature prawn phở')]
bg_layers = ''.join(f'<div class="hero-bg__layer" data-bowl="{k}"></div>' for k,_ in bowls)
bowl_els = ''.join(f'<div class="bowl" data-bowl="{k}"><div class="bowl__roll"><div class="bowl__spin"><img src="assets/bowls/{k}.webp" alt="{a}" draggable="false"></div></div></div>' for k,a in bowls)

PRELOADER = '''<div class="preloader" id="preloader" aria-hidden="true">
  <div class="preloader__stage">
    <div class="preloader__logo"><img src="assets/logo.webp" alt="" width="160" height="160" draggable="false"></div>
    <div class="preloader__word"><small>Vietnamese</small>Spring Roll Station</div>
  </div>
</div>
'''
home = head('Spring Roll Station | Vietnamese Restaurant in Singapore', 'Authentic Vietnamese favourites in Singapore: phở, bánh mì, fresh spring rolls and Vietnamese coffee. Two outlets at Novena and Skysuites at Anson. No GST, no service charge.') + PRELOADER + nav('home') + f'''
<main>
<section class="hero" id="hero" aria-label="Our phở">
  <div class="hero-bg" aria-hidden="true">{bg_layers}</div>
  <div class="hero-copy">
    <p class="eyebrow">A taste of Vietnam</p>
    <h1>Fresh flavours.<br>A little comfort.</h1>
    <p class="hero-sub">Find your favourite bowl.</p>
  </div>
  <div class="wheel" id="wheel">
    <svg class="wheel-arc" aria-hidden="true"><path d=""/></svg>
    <div class="wheel-dots" role="tablist" aria-label="Choose a phở"></div>
    <div class="wheel-ring" aria-hidden="true">{bowl_els}</div>
    <button class="wheel-btn wheel-btn--prev" type="button" aria-label="Previous bowl">{IC['chevL']}</button>
    <button class="wheel-btn wheel-btn--next" type="button" aria-label="Next bowl">{IC['chevR']}</button>
    <div class="wheel-meta" aria-live="polite">
      <h2 class="wheel-meta__name">Beef Phở</h2>
      <p class="wheel-meta__price">S$16.90</p>
      <p class="wheel-meta__desc">Three beef cuts in one bowl: premium lean, rich marbled and slow cooked shank.</p>
      <a class="btn btn--primary btn--sm" href="menu.html#pho-beef">Order this bowl</a>
    </div>
  </div>
</section>


<section class="section" id="favourites">
  <div class="wrap">
    <div class="section-head center reveal">
      <p class="eyebrow">Signature favourites</p>
      <h2>Food at the heart of everything</h2>
      <p>Quality ingredients, generous portions and honest value. From a quick bánh mì and coffee to a comforting bowl of phở.</p>
    </div>
    <div class="cards">
      <a class="card reveal" href="menu.html#pho">
        <div class="card__img"><img src="assets/menu/beef-pho.jpg" alt="Beef phở" loading="lazy"></div>
        <div class="card__body"><h3>Phở</h3><p>Slow simmered broth, silky noodles and six bowls to choose from, including beef, chicken, ribeye and our signature prawn.</p><span class="link">From $13.90 {IC['arrow']}</span></div>
      </a>
      <a class="card reveal" href="menu.html#banh-mi">
        <div class="card__img"><img src="assets/menu/bm-deluxe-signature.jpg" alt="Deluxe signature bánh mì" loading="lazy"></div>
        <div class="card__body"><h3>Bánh Mì</h3><p>Crispy artisan baguettes, toasted to order. Thirteen fillings from egg to Iberico char siew and our deluxe five ham signature.</p><span class="link">From $6.90 {IC['arrow']}</span></div>
      </a>
      <a class="card reveal" href="menu.html#spring-rolls">
        <div class="card__img"><img src="assets/menu/roll-prawn.jpg" alt="Fresh spring rolls" loading="lazy"></div>
        <div class="card__body"><h3>Fresh Spring Rolls</h3><p>Light, fresh and full of flavour. Two rolls per serving with your choice of five house sauces.</p><span class="link">From $9.90 {IC['arrow']}</span></div>
      </a>
      <a class="card reveal" href="menu.html#coffee">
        <div class="card__img"><img src="assets/menu/coffee-iced-milk.jpg" alt="Vietnamese iced milk coffee" loading="lazy"></div>
        <div class="card__body"><h3>Vietnamese Coffee</h3><p>Gourmet single estate Đắk Lắk beans: iced milk coffee, bạc xỉu, egg coffee and our coco spiced signature.</p><span class="link">From $6.90 {IC['arrow']}</span></div>
      </a>
    </div>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap split">
    <div class="split__img split__img--tall reveal"><img src="assets/outlet/skysuites-1.jpg" alt="Spring Roll Station at Skysuites at Anson" loading="lazy"></div>
    <div class="reveal">
      <p class="eyebrow">Our story</p>
      <h2>Vietnamese at heart, made for Singapore</h2>
      <p>Spring Roll Station was created with a simple idea: to make well loved Vietnamese food easy and enjoyable for everyone in Singapore, with a strong focus on quality ingredients, generous portions and honest value.</p>
      <p>What started at our original Upper Cross Street outlet has grown with the support of our regulars. Today you will find us at Novena Regency and at Skysuites at Anson in Tanjong Pagar.</p>
      <a class="btn btn--dark" href="about.html">Read our story {IC['arrow']}</a>
    </div>
  </div>
</section>

{reviews_section()}

<section class="section" id="outlets">
  <div class="wrap">
    <div class="section-head center reveal">
      <p class="eyebrow">Two outlets</p>
      <h2>Find us at Novena or Tanjong Pagar</h2>
      <p>Same recipes, same generous portions. Dine in, take away or order ahead on WhatsApp for collection.</p>
    </div>
    <div class="outlets">
      {outlet_card(NOVENA)}
      {outlet_card(SKY)}
    </div>
  </div>
</section>

{cta()}
</main>
''' + footer() + '\n</body>\n</html>\n'

# ---------------- ABOUT ----------------
about = head('About Us | Spring Roll Station', 'The story of Spring Roll Station: Vietnamese at heart, made for Singapore. Quality food, generous portions and honest value with no GST and no service charge.') + nav('about', solid=True) + f'''
<main>
<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow">About us</p>
    <h1>Vietnamese at heart,<br>made for Singapore</h1>
    <p>Authentic Vietnamese favourites, made fresh and served with heart. Since 2024.</p>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="split__img split__img--tall reveal"><img src="assets/outlet/novena-1.jpg" alt="Spring Roll Station at Novena Regency" loading="lazy"></div>
    <div class="reveal">
      <p class="eyebrow">Our story</p>
      <h2>A simple idea, served generously</h2>
      <p>Spring Roll Station was created with a simple idea: to make well loved Vietnamese food easy and enjoyable for everyone in Singapore, with a strong focus on quality ingredients, generous portions and honest value.</p>
      <p>From fresh spring rolls and crispy bánh mì to comforting bowls of phở and other Vietnamese favourites, we take pride in serving satisfying portions without compromising on the quality of our ingredients or the flavours that go into every dish.</p>
      <p>What started at our original Upper Cross Street outlet has grown together with the support of our regular customers. In 2026, we relocated this much loved outlet to Novena Regency, bringing our food to a new neighbourhood while continuing to welcome the customers who have supported us over the years.</p>
      <p>At Skysuites at Anson in Tanjong Pagar, we have also introduced a more modern and comfortable casual cafe style dining experience. It is a relaxed place to enjoy Vietnamese food, coffee and drinks throughout the day.</p>
    </div>
  </div>
</section>

<section class="section" id="ratings">
  <div class="wrap">
    <div class="section-head center reveal">
      <p class="eyebrow">Loved on every platform</p>
      <h2>Rated by the people who eat with us</h2>
      <p>How our Novena outlet is rated on Google, foodpanda and GrabFood.</p>
    </div>
    <div class="platforms">
      <div class="platform reveal">
        <span class="platform__logo"><img src="assets/logos/google.svg" alt="Google" class="platform__logo--google"></span>
        <b class="counter" data-count="4.7">0.0</b><span class="platform__stars">{''.join('<i class="on">' + STAR + '</i>' for _ in range(4))}<i class="on part">{STAR}</i></span>
        <span class="platform__name">Google</span><small>40 reviews</small>
      </div>
      <div class="platform reveal">
        <span class="platform__logo"><img src="assets/logos/foodpanda.svg" alt="foodpanda" class="platform__logo--panda"></span>
        <b class="counter" data-count="4.9">0.0</b><span class="platform__stars">{''.join('<i class="on">' + STAR + '</i>' for _ in range(5))}</span>
        <span class="platform__name">foodpanda</span><small>154 ratings</small>
      </div>
      <div class="platform reveal">
        <span class="platform__logo"><img src="assets/logos/grab.svg" alt="Grab" class="platform__logo--grab"></span>
        <b class="counter" data-count="4.7">0.0</b><span class="platform__stars">{''.join('<i class="on">' + STAR + '</i>' for _ in range(4))}<i class="on part">{STAR}</i></span>
        <span class="platform__name">GrabFood</span><small>Delivery rating</small>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow">What makes us different</p>
      <h2>Quality food, ample portions, warm hospitality</h2>
      <p>As Spring Roll Station continues to grow, our philosophy stays the same: approachable Vietnamese flavours at prices that offer genuine value.</p>
    </div>
    <div class="features">
      <div class="feature reveal"><div class="feature__num">01</div><h3>Vietnamese at heart, made for Singapore</h3><p>We stay true to the flavours and spirit of Vietnamese food while understanding the local palate. Our menu balances authenticity with dishes that are approachable and enjoyable for customers in Singapore.</p></div>
      <div class="feature reveal"><div class="feature__num">02</div><h3>Quality food and generous portions</h3><p>A satisfying meal should be both good and generous. From our signature phở and bánh mì to fresh spring rolls, we focus on quality ingredients, ample portions and great value.</p></div>
      <div class="feature reveal"><div class="feature__num">03</div><h3>Traditional favourites, modern ideas</h3><p>We respect the classics, but we are not afraid to have fun and evolve. Alongside familiar favourites, we explore new ingredients, combinations and modern dishes, always with a Vietnamese touch.</p></div>
      <div class="feature reveal"><div class="feature__num">04</div><h3>A broad menu with something for everyone</h3><p>Signature phở, bánh mì, fresh spring rolls, rice and noodle dishes, Vietnamese coffee, drinks and more. We keep introducing new choices while keeping our most loved favourites.</p></div>
      <div class="feature reveal"><div class="feature__num">05</div><h3>Straightforward, honest value</h3><p>No GST. No service charge. The price you see is the price you pay. We keep pricing simple while focusing on quality, generous portions and an enjoyable dining experience.</p></div>
      <div class="feature reveal"><div class="feature__num">06</div><h3>Fun, casual and always evolving</h3><p>Spring Roll Station is warm, casual and a little playful. We keep up with changing tastes, listen to our customers and look for fresh ways to make Vietnamese food exciting while staying connected to its roots.</p></div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--cream)">
  <div class="wrap split split--rev">
    <div class="reveal">
      <p class="eyebrow">Our promise</p>
      <h2>Leave satisfied, come back soon</h2>
      <p>Whether it is a quick bánh mì and coffee, a comforting bowl of phở, or a relaxed meal with family and friends, we want our customers to leave feeling satisfied and wanting to come back.</p>
      <p>We also believe in straightforward pricing. At Spring Roll Station there is no GST and no service charge. The price you see is the price you pay.</p>
      <a class="btn btn--primary" href="menu.html">View Our Menu {IC['arrow']}</a>
    </div>
    <div class="split__img reveal"><img src="assets/posters/beef-pho.jpg" alt="Beef phở, our best seller, with the recipe from our original Upper Cross Street outlet" loading="lazy"></div>
  </div>
</section>

{cta()}
</main>
''' + footer() + '\n</body>\n</html>\n'

# ---------------- MENU ----------------
menu = head('Menu | Spring Roll Station', 'Full menu with prices: phở, bánh mì, fresh spring rolls, mains, Vietnamese coffee, teas and drinks. No GST, no service charge. Order for collection on WhatsApp.') + nav('menu', solid=True) + f'''
<main>
<section class="page-hero page-hero--menu">
  <div class="page-hero__bowl" aria-hidden="true"><span class="is-active"><img src="assets/bowls/beef.webp" alt="" draggable="false"></span><span class=""><img src="assets/bowls/chicken.webp" alt="" draggable="false"></span><span class=""><img src="assets/bowls/ribeye.webp" alt="" draggable="false"></span><span class=""><img src="assets/bowls/prawn.webp" alt="" draggable="false"></span></div>
  <div class="wrap">
    <p class="eyebrow">Our menu</p>
    <h1>The price you see is<br>the price you pay</h1>
    <p>No GST. No service charge. Pick your favourites, then send your order to the outlet of your choice on WhatsApp for self collection. Dine in and take away are always welcome.</p>
  </div>
</section>
<div class="menu-nav"><div class="wrap" id="menu-nav"></div></div>
<div id="menu-root"></div>
{cta()}
</main>

<div class="imodal" id="item-modal" aria-modal="true" role="dialog">
  <div class="imodal__overlay"></div>
  <div class="imodal__panel">
    <button class="imodal__close" type="button" aria-label="Close">&times;</button>
    <div class="imodal__body"></div>
    <div class="imodal__foot">
      <div class="imodal__qty"><button type="button" data-dec aria-label="Fewer">&minus;</button><output>1</output><button type="button" data-inc aria-label="More">+</button></div>
      <button class="btn btn--primary" id="modal-add" type="button"><span>Add to order</span></button>
    </div>
  </div>
</div>
<button class="cart-fab" id="cart-fab" type="button" aria-label="View your order"><b>0</b><span>View order $0.00</span></button>
<div class="cart-overlay" id="cart-overlay"></div>
<aside class="cart" id="cart" aria-label="Your order">
  <div class="cart__head"><h2>Your order</h2><button class="cart__close" type="button" aria-label="Close">&times;</button></div>
  <div class="cart__body"></div>
  <div class="cart__foot">
    <div class="cart__outlet">
      <p>Collect from</p>
      <div class="choice">
        <label><input type="radio" name="outlet" value="novena" checked><b>Novena</b><span>Till midnight</span></label>
        <label><input type="radio" name="outlet" value="skysuites"><b>Skysuites at Anson</b><span>Till 10pm</span></label>
      </div>
    </div>
    <div class="form__row">
      <div class="cart__field"><label for="cust-name">Your name</label><input id="cust-name" type="text" autocomplete="name" placeholder="Name"></div>
      <div class="cart__field"><label for="cust-time">Collection time</label><input id="cust-time" type="text" placeholder="e.g. 12:30pm"></div>
    </div>
    <div class="cart__field"><label for="cust-notes">Notes</label><input id="cust-notes" type="text" placeholder="Sauce choice, less spicy, allergies"></div>
    <div class="cart__total" style="margin-top:16px"><span>Total</span><b>$0.00</b></div>
    <p class="cart__fine">No GST, no service charge. Pay at collection. The outlet will confirm your order on WhatsApp.</p>
    <a class="btn btn--wa" id="order-wa" href="#">{IC['wa']} Send order on WhatsApp</a>
    <button class="cart__clear" type="button">Clear order</button>
  </div>
</aside>
''' + footer() + '''
<script src="js/config.js?v=VER"></script>
<script src="js/menu-data.js?v=VER"></script>
<script src="js/menu-source.js?v=VER"></script>
<script src="js/menu.js?v=VER"></script>
</body>
</html>
'''

# ---------------- CONTACT ----------------
contact = head('Contact Us | Spring Roll Station', 'Visit Spring Roll Station at Novena Regency or Skysuites at Anson. Opening hours, maps, WhatsApp and phone numbers.') + nav('contact', solid=True) + f'''
<main>
<section class="page-hero page-hero--photos">
  {hero_photos()}
  <div class="wrap">
    <p class="eyebrow">Contact us</p>
    <h1>Two outlets.<br>Equally loved.</h1>
    <p>Message either outlet on WhatsApp for orders and enquiries, or drop by. We are open every day.</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="outlets">
      {outlet_card(NOVENA, True)}
      {outlet_card(SKY, True)}
    </div>
  </div>
</section>

<section class="section" style="background:var(--cream)" id="enquiry">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Send a message</p>
      <h2>Catering, feedback or just saying hello</h2>
      <form class="form" id="contact-form" style="margin-top:24px">
        <div class="form__row">
          <div><label for="f-name">Name</label><input id="f-name" name="name" type="text" required autocomplete="name"></div>
          <div><label for="f-phone">Phone or email</label><input id="f-phone" name="contact" type="text" required></div>
        </div>
        <div><label for="f-topic">Topic</label>
          <select id="f-topic" name="topic"><option>General enquiry</option><option>Catering and bulk orders</option><option>Feedback</option><option>Partnership</option></select></div>
        <div><label for="f-msg">Message</label><textarea id="f-msg" name="message" required></textarea></div>
        <div class="form__actions">
          <button class="btn btn--wa" type="submit" id="form-wa" aria-expanded="false" aria-controls="wa-pick">{IC['wa']} Send on WhatsApp</button>
        </div>
        <div class="wa-pick" id="wa-pick" hidden>
          <p class="wa-pick__label">Which outlet would you like to message?</p>
          <div class="wa-pick__options">
            <button type="button" class="wa-pick__btn" data-phone="{NOVENA['phone']}" data-outlet="{NOVENA['full']}"><b>Novena</b><span>{NOVENA['disp']}</span></button>
            <button type="button" class="wa-pick__btn" data-phone="{SKY['phone']}" data-outlet="{SKY['full']}"><b>Skysuites at Anson</b><span>{SKY['disp']}</span></button>
          </div>
        </div>
      </form>
    </div>
    <div class="contact-aside reveal">
      <div class="contact-card">{IC['mail']}<div><h3>Email</h3><a href="mailto:director@springrollstation.com.sg">director@springrollstation.com.sg</a></div></div>
      <div class="contact-card">{IC['wa']}<div><h3>WhatsApp</h3><p><a href="https://wa.me/{NOVENA['phone']}" target="_blank" rel="noopener">Novena: {NOVENA['disp']}</a><br><a href="https://wa.me/{SKY['phone']}" target="_blank" rel="noopener">Skysuites at Anson: {SKY['disp']}</a></p></div></div>
      <div class="contact-card">{IC['clock']}<div><h3>Opening hours</h3><p>Novena: daily 10:00am to 12:00 midnight<br>Skysuites at Anson: daily 10:00am to 10:00pm</p></div></div>
      <div class="contact-card">{IC['ig']}<div><h3>Follow along</h3><a href="https://www.instagram.com/spring_roll_station/" target="_blank" rel="noopener">@spring_roll_station on Instagram</a></div></div>
      <div class="contact-card">{IC['pin']}<div><h3>Reviews</h3><p><a href="{NOVENA['reviews']}" target="_blank" rel="noopener">Novena on Google</a><br><a href="{SKY['reviews']}" target="_blank" rel="noopener">Skysuites at Anson on Google</a></p></div></div>
    </div>
  </div>
</section>

</main>
''' + footer() + f'''
<script>
(function(){{
  var f=document.getElementById('contact-form'); if(!f) return;
  function body(){{ return 'Name: '+f.name.value+'\\nContact: '+f.contact.value+'\\nTopic: '+f.topic.value+'\\n\\n'+f.message.value; }}
  var waBtn=document.getElementById('form-wa'), pick=document.getElementById('wa-pick');
  f.addEventListener('submit',function(e){{ e.preventDefault(); if(!f.reportValidity()) return;
    pick.hidden=!pick.hidden; waBtn.setAttribute('aria-expanded', String(!pick.hidden)); if(!pick.hidden) pick.querySelector('button').focus(); }});
  pick.addEventListener('click',function(e){{ var b=e.target.closest('[data-phone]'); if(!b) return;
    window.open('https://wa.me/'+b.dataset.phone+'?text='+encodeURIComponent('Hi '+b.dataset.outlet+',\\n'+body()),'_blank','noopener');
    pick.hidden=true; waBtn.setAttribute('aria-expanded','false'); }});
}})();
</script>
</body>
</html>
'''

for name, html in [('index.html', home), ('about.html', about), ('menu.html', menu), ('contact.html', contact)]:
    with open(os.path.join(OUT, name), 'w') as fh: fh.write(html.replace('v=VER','v='+VER))
    print(name, len(html))
