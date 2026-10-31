/* Spring Roll Station menu. Prices in Singapore dollars. No GST, no service charge.
   img: file inside assets/menu/. If the file is missing the card shows a placeholder,
   so to add a photo just drop a file with that name into assets/menu/. */
window.MENU = [
  {
    id: 'pho', title: 'Phở', blurb: 'Slow simmered broth, silky rice noodles and generous toppings. All phở comes with fresh herbs, bean sprouts, cut chilli and calamansi on the side.',
    note: 'Served with fresh herbs, bean sprouts, chilli and calamansi',
    items: [
      { id: 'pho-beef', name: 'Beef Phở', price: 14.90, img: 'pho-beef.jpg', badges: ['Best seller'], desc: 'A hearty combination of three beef cuts: premium lean, rich marbled and slow cooked shank. Recipe from our original Upper Cross Street outlet.' },
      { id: 'pho-prawn', name: 'Signature Prawn Phở', price: 14.90, img: 'pho-prawn.jpg', badges: ['Signature', 'Limited daily'], desc: 'Topped with fresh prawns and premium prawn mousse for a naturally sweet, savoury finish. Limited quantities available daily.' },
      { id: 'pho-ribeye', name: 'Ribeye Phở', price: 19.90, img: 'pho-ribeye.jpg', badges: ['Special'], desc: 'Our premium phở with a whole sous vide medium rare ribeye steak, complemented by three cuts of beef.' },
      { id: 'pho-chicken', name: 'Chicken Phở', price: 13.90, img: 'pho-chicken.jpg', desc: 'Served with tender, juicy cuts of chicken thigh in a light, fragrant broth.' }
    ],
    addons: { title: 'Phở add-ons', items: [
      { id: 'add-lean', name: 'Premium Lean Beef', price: 2.90 },
      { id: 'add-marbled', name: 'Rich Marbled Beef', price: 3.90 },
      { id: 'add-shank', name: 'Slow Cooked Beef Shank', price: 2.90 },
      { id: 'add-egg', name: 'Whole Egg', price: 1.60 },
      { id: 'add-chicken', name: 'Chicken Slices', price: 2.90 },
      { id: 'add-prawns', name: 'Fresh Prawns', price: 3.90 },
      { id: 'add-mousse', name: 'Premium Prawn Mousse', price: 3.90 },
      { id: 'add-broth', name: 'Extra Phở Broth', price: 1.90 }
    ] }
  },
  {
    id: 'banh-mi', title: 'Bánh Mì', blurb: 'Crispy Vietnamese baguettes, freshly made and generously filled.',
    note: 'Freshly made, made for you',
    items: [
      { id: 'bm-signature', name: 'Signature Bánh Mì', price: 10.90, img: 'banh-mi-signature.jpg', badges: ['Best seller', 'Signature'], desc: 'Five varieties of Vietnamese ham with our creamy egg sauce.' },
      { id: 'bm-chicken', name: 'Crispy Chicken Cutlet Bánh Mì', price: 8.90, img: 'banh-mi-chicken-cutlet.jpg', badges: ['Best seller'], desc: 'Golden crispy chicken cutlet with pickles, cucumber and coriander.' },
      { id: 'bm-roast-pork', name: 'Roast Pork Bánh Mì', price: 10.90, img: 'banh-mi-roast-pork.jpg', badges: ['Best seller'], desc: 'Crackling roast pork, pickled carrot and daikon, fresh herbs.' },
      { id: 'bm-iberico-char-siew', name: 'Iberico Char Siew Bánh Mì', price: 12.90, img: 'banh-mi-iberico-char-siew.jpg', badges: ['New'], desc: 'Sweet and smoky Iberico char siew in a crispy baguette.' },
      { id: 'bm-iberico-roast', name: 'Iberico Roast Pork Bánh Mì', price: 11.90, img: 'banh-mi-iberico-roast-pork.jpg', badges: ['New'], desc: 'Premium Iberico roast pork with pickles and fresh herbs.' },
      { id: 'bm-prawn', name: 'Prawn Sriracha Mayo Bánh Mì', price: 9.90, img: 'banh-mi-prawn-sriracha.jpg', desc: 'Juicy prawns with a sriracha mayo kick.' },
      { id: 'bm-salmon', name: 'Smoked Salmon Wasabi Mayo Bánh Mì', price: 9.90, img: 'banh-mi-smoked-salmon.jpg', desc: 'Smoked salmon with a gentle wasabi mayo.' },
      { id: 'bm-fish', name: 'Crispy Fish Fillet Bánh Mì', price: 7.90, img: 'banh-mi-fish-fillet.jpg', desc: 'Crispy fish fillet with pickles, cucumber and coriander.' },
      { id: 'bm-egg', name: 'Egg Omelet Bánh Mì', price: 6.90, img: 'banh-mi-egg-omelet.jpg', desc: 'Fluffy egg omelet with pickles and fresh herbs.' },
      { id: 'bm-veg', name: 'Vegetable Bánh Mì', price: 5.90, img: 'banh-mi-vegetable.jpg', badges: ['No pâté'], desc: 'Fresh vegetables, pickles and herbs. Made without pâté.' }
    ]
  },
  {
    id: 'spring-rolls', title: 'Fresh Spring Rolls', blurb: 'Light. Fresh. Full of flavour. Every roll comes with your choice of one sauce.',
    note: 'One sauce included. Additional sauce $1.50',
    sauces: ['Traditional Vietnamese Dipping Sauce', 'Sweet and Tangy Tamarind', 'Thai Sweet Chilli', 'Wasabi Mayo', 'Sriracha Mayo'],
    items: [
      { id: 'sr-prawn', name: 'Signature Prawn Roll', price: 6.80, img: 'spring-roll-prawn.jpg', badges: ['Signature'], desc: 'Fresh prawns, rice vermicelli, lettuce and herbs in soft rice paper.' },
      { id: 'sr-veg', name: 'Garden Vegetable Roll', price: 5.80, img: 'spring-roll-vegetable.jpg', badges: ['Vegetarian'], desc: 'Crunchy garden vegetables, vermicelli and herbs.' },
      { id: 'sr-pork', name: 'Pork Slice Roll', price: 6.80, img: 'spring-roll-pork.jpg', desc: 'Tender pork slices with vermicelli, lettuce and herbs.' },
      { id: 'sr-egg', name: 'Egg Omelet Roll', price: 6.80, img: 'spring-roll-egg.jpg', desc: 'Soft egg omelet with vermicelli and fresh vegetables.' },
      { id: 'sr-pork-prawn', name: 'Pork and Prawn Roll', price: 6.80, img: 'spring-roll-pork-prawn.jpg', desc: 'The classic pairing of pork and prawn.' },
      { id: 'sr-salmon', name: 'Smoked Salmon and Wasabi Roll', price: 8.80, img: 'spring-roll-salmon.jpg', desc: 'Smoked salmon with a touch of wasabi mayo.' }
    ],
    addons: { title: 'Extras', items: [
      { id: 'sr-sauce', name: 'Additional Sauce', price: 1.50 }
    ] }
  },
  {
    id: 'mains', title: 'Mains and Skewers', blurb: 'Sous vide steak, giant skewers and more. Traditional favourites, modern ideas.',
    items: [
      { id: 'main-steak', name: 'Ribeye Steak and Fries', price: 17.90, img: 'steak-fries.jpg', badges: ['Sous vide'], desc: 'Tender ribeye steak cooked sous vide, seasoned with salt and pepper and served medium rare with crispy fries and fresh garden vegetables.' },
      { id: 'main-pork-skewer', name: 'Giant Pork Collar Skewers', price: 9.90, img: 'skewers.jpg', badges: ['High protein'], desc: 'Giant char grilled pork collar skewers. Low carb, high protein.' },
      { id: 'main-mutton-skewer', name: 'Giant Mutton Skewers', price: 10.90, img: 'skewers-mutton.jpg', badges: ['High protein'], desc: 'Giant char grilled mutton skewers with our house spice. Low carb, high protein.' }
    ]
  },
  {
    id: 'sides', title: 'Vietnamese Street Sides', blurb: 'Chewy corn selection, a Vietnamese street favourite.',
    items: [
      { id: 'corn-yellow', name: 'Original Yellow Corn', price: 3.90, img: 'corn-all.jpg', desc: 'Sweet and chewy original yellow corn.' },
      { id: 'corn-black', name: 'Black Glutinous Corn', price: 3.90, img: 'corn-all.jpg', desc: 'Nutty, chewy black glutinous corn.' },
      { id: 'corn-white', name: 'White Glutinous Corn', price: 3.90, img: 'corn-all.jpg', desc: 'Soft and chewy white glutinous corn.' },
      { id: 'corn-flower', name: 'Flower Corn', price: 3.90, img: 'corn-all.jpg', desc: 'Colourful flower corn with a mix of chewy kernels.' }
    ]
  },
  {
    id: 'coffee', title: 'Vietnamese Coffee', blurb: 'Traditional phin brewed coffee. Rich, bold and made with care.',
    items: [
      { id: 'cf-iced-milk', name: 'Traditional Vietnamese Iced Milk Coffee', price: 4.80, img: 'coffee-iced-milk.jpg', desc: 'Slow drip coffee with condensed milk over ice.' },
      { id: 'cf-spiced', name: 'Signature Spiced Coffee', price: 5.90, img: 'coffee-spiced.jpg', badges: ['Signature'], desc: 'Our house coffee with warm spices and cinnamon.' },
      { id: 'cf-coconut', name: 'Coconut Coffee', price: 5.90, img: 'coffee-coconut.jpg', desc: 'Creamy coconut blended with bold Vietnamese coffee.' },
      { id: 'cf-salted', name: 'Salted Coffee', price: 5.90, img: 'coffee-salted.jpg', desc: 'Silky salted cream over strong drip coffee.' },
      { id: 'cf-hot-drip', name: 'Hot Drip Coffee', price: 3.80, img: 'coffee-hot-drip.jpg', badges: ['Traditional'], desc: 'Traditional phin brew, sweetened just right with condensed milk.' }
    ]
  },
  {
    id: 'teas', title: 'Teas and Refreshers', blurb: 'Simple. Natural. Refreshing.',
    items: [
      { id: 'tea-lemongrass', name: 'Lemongrass Iced Tea', price: 2.00, img: 'tea-lemongrass.jpg', desc: 'Fragrant lemongrass over ice.' },
      { id: 'tea-honey-cal', name: 'Honey Calamansi Tea', price: 2.50, img: 'tea-honey-calamansi.jpg', desc: 'Sweet honey and zesty calamansi.' },
      { id: 'tea-lemongrass-cal', name: 'Lemongrass Calamansi Tea', price: 2.50, img: 'tea-lemongrass-calamansi.jpg', desc: 'Lemongrass with a calamansi twist.' },
      { id: 'tea-iced', name: 'Iced Tea', price: 1.80, img: 'tea-iced.jpg', desc: 'Classic iced tea.' },
      { id: 'tea-hot', name: 'Hot Tea', price: 1.50, img: 'tea-hot.jpg', desc: 'A warm cup of tea.' }
    ]
  },
  {
    id: 'drinks', title: 'Soft Drinks', blurb: 'Refreshing choices. Perfect for every moment.',
    compact: true,
    items: [
      { id: 'dr-coke', name: 'Coca-Cola Classic', price: 2.50, img: 'drink-coke.jpg' },
      { id: 'dr-coke-zero', name: 'Coca-Cola Zero Sugar', price: 2.50, img: 'drink-coke-zero.jpg' },
      { id: 'dr-sprite', name: 'Sprite', price: 2.50, img: 'drink-sprite.jpg' },
      { id: 'dr-sprite-zero', name: 'Sprite Zero Sugar', price: 2.50, img: 'drink-sprite-zero.jpg' },
      { id: 'dr-fanta-orange', name: 'Fanta Orange', price: 2.50, img: 'drink-fanta-orange.jpg' },
      { id: 'dr-fanta-grape', name: 'Fanta Grape', price: 2.50, img: 'drink-fanta-grape.jpg' },
      { id: 'dr-fuze', name: 'Fuze Tea Jasmine Green Tea', price: 2.50, img: 'drink-fuze.jpg' },
      { id: 'dr-ayataka', name: 'Ayataka Green Tea', price: 2.50, img: 'drink-ayataka.jpg' },
      { id: 'dr-schweppes-soda', name: 'Schweppes Soda Water', price: 3.20, img: 'drink-schweppes-soda.jpg' },
      { id: 'dr-schweppes-lemon', name: 'Schweppes Lemon Lime', price: 3.20, img: 'drink-schweppes-lemon.jpg' },
      { id: 'dr-redbull', name: 'Red Bull', price: 3.80, img: 'drink-red-bull.jpg' },
      { id: 'dr-sting', name: 'Sting', price: 3.80, img: 'drink-sting.jpg' },
      { id: 'dr-c2', name: 'C2 Lemon Tea', price: 3.80, img: 'drink-c2.jpg' },
      { id: 'dr-dasani', name: 'Dasani Water', price: 1.60, img: 'drink-dasani.jpg' }
    ]
  },
  {
    id: 'meal-deal', title: 'Meal Deals', blurb: 'Upgrade your Bánh Mì or Phở. Add a spring roll for $3 and a drink at meal deal prices.',
    note: 'Valid with any Bánh Mì or Phở in the same order',
    addons: { title: 'Add a spring roll for $3', items: [
      { id: 'md-roll-prawn', name: 'Meal deal: Prawn Roll', price: 3.00 },
      { id: 'md-roll-salmon', name: 'Meal deal: Smoked Salmon Wasabi Mayo Roll', price: 3.00 },
      { id: 'md-roll-pork', name: 'Meal deal: Pork Slice Roll', price: 3.00 },
      { id: 'md-roll-pork-prawn', name: 'Meal deal: Pork and Prawn Roll', price: 3.00 },
      { id: 'md-roll-veg', name: 'Meal deal: Garden Vegetable Roll', price: 3.00 }
    ] },
    addons2: { title: 'Add a meal deal drink', items: [
      { id: 'md-hot-drip', name: 'Meal deal: Hot Drip Coffee', price: 2.00 },
      { id: 'md-iced-milk', name: 'Meal deal: Vietnamese Iced Milk Coffee', price: 3.00 },
      { id: 'md-egg-coffee', name: 'Meal deal: Vietnamese Hot Egg Coffee', price: 4.00 },
      { id: 'md-ice-coffee', name: 'Meal deal: Vietnamese Ice Coffee', price: 4.00 },
      { id: 'md-ice-tea', name: 'Meal deal: Ice Tea', price: 1.80 },
      { id: 'md-hot-tea', name: 'Meal deal: Hot Tea', price: 1.50 },
      { id: 'md-water', name: 'Meal deal: Dasani Water', price: 1.60 },
      { id: 'md-soft', name: 'Meal deal: Soft Drink (Coke, Sprite, Fanta, Fuze, Ayataka or Qoo)', price: 2.00 }
    ] }
  }
];
window.OUTLETS = {
  novena: { name: 'Novena', full: 'Spring Roll Station (Novena)', phone: '6588019189', display: '8801 9189', address: '275 Thomson Road #01-26, Novena Regency, Singapore 307645', hours: 'Daily 10:00am to 12:00 midnight' },
  skysuites: { name: 'Skysuites at Anson', full: 'Spring Roll Station (Skysuites at Anson)', phone: '6580170610', display: '8017 0610', address: '8 Enggor Street #01-01/02, Skysuites at Anson, Singapore 079718', hours: 'Daily 10:00am to 10:00pm' }
};
