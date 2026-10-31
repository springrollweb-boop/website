/* Spring Roll Station menu. Prices in Singapore dollars, no GST, no service charge.
   Items, descriptions and photos follow the Spring Roll Station (Novena Regency) listing on GrabFood.
   img: file inside assets/menu/. A missing file shows a "photo coming soon" tile.
   options: groups of choices shown in the item popup. type "single" = pick one, "multi" = pick any.
   An option with a price adds that amount to the item. */
(function () {
  const PHO_ADDONS = { id: 'pho-addons', title: 'Add-ons', type: 'multi', choices: [
    { id: 'lean-beef', name: 'Premium Lean Beef', price: 2.90 },
    { id: 'marbled-beef', name: 'Rich Marbled Beef', price: 3.90 },
    { id: 'beef-shank', name: 'Slow Cooked Beef Shank', price: 2.90 },
    { id: 'whole-egg', name: 'Whole Egg', price: 1.60 },
    { id: 'chicken-slices', name: 'Chicken Slices', price: 2.90 },
    { id: 'fresh-prawns', name: 'Fresh Prawns', price: 3.90 },
    { id: 'prawn-mousse', name: 'Premium Prawn Mousse', price: 3.90 },
    { id: 'extra-broth', name: 'Extra Phở Broth', price: 1.90 }
  ] };
  const PHO_ADDONS_VEG = { id: 'pho-addons-veg', title: 'Add-ons', type: 'multi', choices: [
    { id: 'whole-egg', name: 'Whole Egg', price: 1.60 },
    { id: 'extra-broth', name: 'Extra Phở Broth', price: 1.90 }
  ] };
  const SAUCE = { id: 'sauce', title: 'Choice of sauce', hint: 'One included', type: 'single', required: true, choices: [
    { id: 'nuoc-cham', name: 'Traditional Vietnamese Dipping Sauce (Nước Chấm)', price: 0 },
    { id: 'tamarind', name: 'Sweet and Tangy Tamarind (Nước Sốt Me)', price: 0 },
    { id: 'thai-chilli', name: 'Thai Sweet Chilli', price: 0 },
    { id: 'wasabi-mayo', name: 'Wasabi Mayo', price: 0 },
    { id: 'sriracha-mayo', name: 'Sriracha Mayo', price: 0 }
  ] };
  const EXTRA_SAUCE = { id: 'extra-sauce', title: 'Additional sauce', hint: '$1.50 each', type: 'multi', choices: [
    { id: 'x-nuoc-cham', name: 'Traditional Vietnamese Dipping Sauce', price: 1.50 },
    { id: 'x-tamarind', name: 'Sweet and Tangy Tamarind', price: 1.50 },
    { id: 'x-thai-chilli', name: 'Thai Sweet Chilli', price: 1.50 },
    { id: 'x-wasabi-mayo', name: 'Wasabi Mayo', price: 1.50 },
    { id: 'x-sriracha-mayo', name: 'Sriracha Mayo', price: 1.50 }
  ] };
  const MEAT = { id: 'meat', title: 'Choose your meat', type: 'single', required: true, choices: [
    { id: 'pork', name: 'Tender pork', price: 0 },
    { id: 'chicken', name: 'Juicy chicken', price: 0 },
    { id: 'beef', name: 'Savoury beef', price: 0 }
  ] };
  const ROLLS = [SAUCE, EXTRA_SAUCE];

  window.MENU = [
    {
      id: 'pho', title: 'Phở', vn: 'Phở', blurb: 'Slow simmered broth, silky rice noodles and generous toppings. Every bowl comes with fresh herbs, bean sprouts, cut chilli and lime on the side.',
      note: 'Tap a bowl to choose add-ons',
      items: [
        { id: 'pho-beef', name: 'Beef Phở', vn: 'Phở bò', price: 16.90, img: 'beef-pho.jpg', badges: ['Best seller'], desc: 'A hearty bowl of Vietnamese beef phở with tender, medium rare slices of marbled beef, smooth rice noodles and a rich, slow simmered broth infused with star anise, cinnamon and herbs.', options: [PHO_ADDONS] },
        { id: 'pho-chicken', name: 'Chicken Phở', vn: 'Phở gà', price: 14.90, img: 'chicken-pho.jpg', badges: ['No pork'], desc: 'Tender chicken with silky rice noodles in a rich, golden broth made from kampong chicken, garnished with fresh herbs, bean sprouts and lime. Light, comforting and full of flavour.', options: [PHO_ADDONS] },
        { id: 'pho-ribeye', name: 'Ribeye Phở', vn: 'Phở đặc biệt', price: 21.80, img: 'ribeye-pho.jpg', badges: ['Premium'], desc: 'Our phở crowned with a whole ribeye steak, simmered gently in fragrant broth and served medium rare. A luxurious take on the classic, rich in beefy flavour with a melt in your mouth texture.', options: [PHO_ADDONS] },
        { id: 'pho-prawn', name: 'Signature Prawn Phở', vn: 'Phở tôm', price: 14.90, img: 'pho-prawn.jpg', badges: ['Signature', 'Limited daily'], desc: 'Topped with fresh prawns and premium prawn mousse for a naturally sweet, savoury finish. Limited quantities available daily.', options: [PHO_ADDONS] },
        { id: 'pho-pork', name: 'Pork Phở', vn: 'Phở thịt lợn', price: 14.90, img: 'pork-pho.jpg', badges: ['House creation'], desc: 'Our own creation: a comforting bowl of pork phở with tender pork slices and silky rice noodles in a rich, fragrant pork broth slow simmered to perfection.', options: [PHO_ADDONS] },
        { id: 'pho-veg', name: 'Vegetarian Phở', vn: 'Phở chay', price: 13.90, img: 'vegetarian-pho.jpg', badges: ['Vegetarian'], desc: 'A wholesome noodle soup made with our secret recipe vegetable broth, topped with slices of king oyster mushroom, golden fried tofu and fresh vegetables.', options: [PHO_ADDONS_VEG] }
      ]
    },
    {
      id: 'banh-mi', title: 'Bánh Mì', vn: 'Bánh mì', blurb: 'Our artisan Vietnamese baguette is lighter and airier than a French baguette, with a crisp, thin crust and a soft, fluffy inside. Toasted and filled to order.',
      note: 'Freshly made, made for you',
      items: [
        { id: 'bm-deluxe', name: 'Deluxe Signature Bánh Mì', vn: 'Bánh mì đặc biệt', price: 16.90, img: 'bm-deluxe-signature.jpg', badges: ['Signature', 'Premium'], desc: 'Packed with pâté, our special house sauce, five kinds of Vietnamese ham, chicken floss, creamy egg yolk sauce, fresh vegetables and tangy pickles, all in a golden crispy Vietnamese baguette.' },
        { id: 'bm-grilled-meat', name: 'Grilled Meat Bánh Mì', vn: 'Bánh mì thịt nướng', price: 11.90, img: 'bm-grilled-meat.jpg', badges: ['Best seller'], desc: 'A toasted artisan baguette filled with fresh vegetables, homemade pâté and our special sauce. Choose tender pork, juicy chicken or savoury beef.', options: [MEAT] },
        { id: 'bm-iberico-char-siew', name: 'Iberico Char Siew Bánh Mì', vn: 'Bánh mì xá xíu', price: 14.90, img: 'bm-iberico-char-siew.jpg', badges: ['New'], desc: 'Tender, juicy Iberico pork char siew, naturally well marbled, layered with crisp fresh vegetables, tangy pickles, creamy mayo and Vietnamese chilli sauce in a crispy baguette.' },
        { id: 'bm-iberico-roast-pork', name: 'Iberico Roast Pork Bánh Mì', vn: 'Bánh mì heo quay', price: 13.90, img: 'bm-iberico-roast-pork.jpg', badges: ['New'], desc: 'Crispy Iberico roast pork with crackling skin, pickled carrot and radish, pâté, fresh herbs and vegetables, packed into a crusty Vietnamese baguette.' },
        { id: 'bm-prawn-cutlet', name: 'Crispy Prawn Cutlet Bánh Mì', vn: 'Bánh mì chả tôm', price: 11.90, img: 'bm-prawn-cutlet.jpg', desc: 'A crispy prawn cutlet tucked into a warm Vietnamese baguette with tangy pickles, fresh lettuce, crunchy cucumber and a spicy chilli mayo.' },
        { id: 'bm-smoked-salmon', name: 'Smoked Salmon Bánh Mì', vn: 'Bánh mì cá hồi xông khói', price: 13.90, img: 'bm-smoked-salmon.jpg', desc: 'A crispy Vietnamese baguette filled with delicate smoked salmon, fresh onions, pickles and creamy mayo. Savoury, smoky and tangy.' },
        { id: 'bm-fish-fillet', name: 'Fish Fillet Bánh Mì', vn: 'Bánh mì cá chiên', price: 11.90, img: 'bm-fish-fillet.jpg', desc: 'Crispy golden fish fillet in a freshly baked baguette, layered with creamy mayo, tangy pickles and fresh vegetables. Made in store for the perfect crunch.' },
        { id: 'bm-chicken-floss', name: 'Chicken Floss Bánh Mì with Egg Butter Sauce', vn: 'Bánh mì chà bông sốt bơ trứng', price: 11.90, img: 'bm-chicken-floss.jpg', desc: 'Fluffy Vietnamese bread topped with savoury chicken floss and drizzled with a rich, creamy egg butter sauce. Sweet, salty and full of umami.' },
        { id: 'bm-chilli-salt', name: 'Grilled Bánh Mì with Chilli Salt', vn: 'Bánh mì nướng muối ớt', price: 11.90, img: 'bm-chilli-salt.jpg', desc: 'A crispy grilled baguette coated with butter, chilli salt and savoury sauces, topped with cucumber, quail eggs, mayonnaise and pork floss. A Vietnamese street snack favourite.' },
        { id: 'bm-sardine', name: 'Sardine and Onion Bánh Mì', vn: 'Bánh mì cá mòi', price: 11.90, img: 'bm-sardine.jpg', desc: 'Sardines in tomato sauce with sweet onions, pickles and fresh herbs in our artisan baguette.' },
        { id: 'bm-egg', name: 'Egg Bánh Mì', vn: 'Bánh mì trứng', price: 10.90, img: 'bm-egg.jpg', desc: 'A toasted artisan baguette filled with fresh vegetables, basil and mint, a fluffy omelette and our special sauce.' },
        { id: 'bm-vegetarian', name: 'Vegetarian Bánh Mì', vn: 'Bánh mì rau thơm', price: 10.90, img: 'bm-vegetarian.jpg', badges: ['Vegetarian', 'No pâté'], desc: 'Crisp fresh vegetables, tangy pickled carrot and daikon, cucumber, fresh basil and mint with our signature vegetarian sauce.' },
        { id: 'bm-golden-toast', name: 'Golden Bánh Mì Toast', vn: 'Bánh mì sữa', price: 6.90, img: 'bm-golden-toast.jpg', desc: 'Crispy toasted Vietnamese baguette drizzled with rich, creamy condensed milk. A simple, irresistible treat for breakfast, dessert or any time.' }
      ]
    },
    {
      id: 'spring-rolls', title: 'Fresh Spring Rolls', vn: 'Gỏi cuốn', blurb: 'Light, fresh and full of flavour. Two rolls per serving, wrapped in delicate rice paper with rice vermicelli, crisp vegetables and herbs. Pick your sauce in the popup.',
      note: 'Two rolls per serving. One sauce included',
      items: [
        { id: 'sr-prawn', name: 'Prawn Spring Rolls', vn: 'Gỏi cuốn tôm', price: 10.90, img: 'roll-prawn.jpg', badges: ['Signature'], desc: 'Fresh rolls filled with succulent prawns, rice vermicelli, crisp vegetables and aromatic herbs.', options: ROLLS },
        { id: 'sr-prawn-pork', name: 'Prawn and Pork Spring Rolls', vn: 'Gỏi cuốn tôm thịt', price: 10.90, img: 'roll-prawn-pork.jpg', badges: ['Best seller'], desc: 'The classic pairing of succulent prawns and tender pork slices with vermicelli, vegetables and herbs.', options: ROLLS },
        { id: 'sr-pork', name: 'Pork Spring Rolls', vn: 'Gỏi cuốn thịt lợn', price: 10.90, img: 'roll-pork.jpg', desc: 'Tender sliced pork, crisp lettuce and vermicelli, delicately wrapped in soft rice paper.', options: ROLLS },
        { id: 'sr-egg', name: 'Egg Roll Fusion', vn: 'Gỏi cuốn trứng', price: 10.90, img: 'roll-egg.jpg', desc: 'Fresh rolls wrapped in rice paper and egg, filled with crisp vegetables and vermicelli. Served with creamy wasabi mayo for a bold, tangy twist.', options: ROLLS },
        { id: 'sr-salmon', name: 'Smoked Salmon Wasabi Mayo Rolls', vn: 'Gỏi cuốn cá hồi xông khói', price: 14.90, img: 'roll-smoked-salmon.jpg', badges: ['Premium'], desc: 'Delicate smoked salmon wrapped in fresh spring rolls, paired with a creamy wasabi mayo for a gentle kick.', options: ROLLS },
        { id: 'sr-veg', name: 'Vegetable Spring Rolls', vn: 'Gỏi cuốn rau thơm', price: 9.90, img: 'roll-vegetable.jpg', badges: ['Vegetarian'], desc: 'Rice vermicelli, crisp vegetables and aromatic herbs wrapped in delicate rice paper.', options: ROLLS },
        { id: 'sr-fried', name: 'Fried Prawn and Pork Spring Rolls', vn: 'Nem rán tôm thịt', price: 10.90, img: 'fried-roll-prawn-pork.jpg', badges: ['Crispy'], desc: 'Two golden, crispy Vietnamese fried spring rolls filled with minced pork, prawn, glass noodles and fragrant herbs.', options: ROLLS },
        { id: 'sr-extra-long', name: 'Extra Long Spring Roll', vn: 'Gỏi cuốn đặc biệt', price: 21.80, img: 'extra-long-spring-roll.jpg', badges: ['Premium'], desc: 'One extra long fresh spring roll packed with juicy prawns, vermicelli, crisp vegetables and herbs in soft rice paper.', options: ROLLS }
      ]
    },
    {
      id: 'premium', title: 'Premium and Exclusives', vn: 'Cao cấp', blurb: 'Limited portions made with the best of the day.',
      items: [
        { id: 'prem-prawn-broth', name: 'Premium Prawn Broth with Shrimp Chips', vn: 'Bánh canh phồng tôm đặc biệt', price: 21.80, img: 'premium-prawn-broth.jpg', badges: ['Limited daily'], desc: 'Slow simmered and crafted like a bisque, this extra premium prawn soup is rich, ultra thick and packed with bold flavour. Comes with two extra prawns, quail eggs and a trio of sweet corn, peas and carrots.' },
        { id: 'prem-eel-porridge', name: 'Vietnamese Eel Porridge', vn: 'Cháo lươn', price: 21.80, img: 'eel-porridge.jpg', badges: ['Singapore exclusive'], desc: 'One of Vietnam’s treasured comfort foods. Slow cooked rice porridge topped with tender eel, laksa leaf, fresh coriander and crispy shallots.' }
      ]
    },
    {
      id: 'mains', title: 'Mains', vn: 'Món chính', blurb: 'Grilled, stir fried and slow cooked Vietnamese favourites.',
      items: [
        { id: 'main-bun-cha', name: 'Bún Chả Grilled Pork Noodle Set', vn: 'Bún chả', price: 16.90, img: 'bun-cha.jpg', badges: ['Hanoi classic'], desc: 'Grilled pork patties and tender pork slices over vermicelli noodles, served with a tangy sweet fish sauce dip. Smoky, savoury and refreshing in every bite.' },
        { id: 'main-grilled-pork-vermicelli', name: 'Grilled Pork with Vermicelli', vn: 'Bún thịt nướng', price: 18.90, img: 'grilled-pork-vermicelli.jpg', desc: 'Succulent grilled pork slices on delicate vermicelli with fragrant herbs, crunchy pickled vegetables, roasted peanuts and a zesty Vietnamese dipping sauce. Mix thoroughly before enjoying.' },
        { id: 'main-beef-vermicelli', name: 'Stir Fried Beef Vermicelli Bowl', vn: 'Bún bò xào', price: 19.90, img: 'stir-fried-beef-vermicelli.jpg', badges: ['New'], desc: 'Tender wok tossed beef over silky rice vermicelli with fresh herbs, crisp lettuce, bean sprouts, pickled vegetables, roasted peanuts and crispy shallots, with our signature dressing.' },
        { id: 'main-beef-stew', name: 'Vietnamese Beef Stew', vn: 'Bò sốt vang', price: 16.90, img: 'beef-stew.jpg', desc: 'A hearty beef stew slow simmered in a rich red wine sauce with fragrant spices, tender beef, potatoes, carrots and fresh herbs. Perfect with a warm bánh mì (sold separately).' },
        { id: 'main-fish-sauce-chicken', name: 'Fried Chicken with Fish Sauce', vn: 'Gà chiên mắm', price: 15.90, img: 'fish-sauce-chicken.jpg', desc: 'Crispy fried chicken coated in a savoury, aromatic fish sauce glaze. Sweet, salty and full of umami with a satisfying crunch.' },
        { id: 'main-chicken-mushroom', name: 'Stir Fried Chicken with White Beech Mushrooms', vn: 'Gà xào nấm', price: 15.90, img: 'chicken-beech-mushroom.jpg', desc: 'Tender chicken stir fried with white beech mushrooms and our in house seasoning for rich, savoury depth. Pairs beautifully with steamed rice.' },
        { id: 'main-fish-chips', name: 'Fish and Chips', vn: 'Cá chiên và khoai tây chiên', price: 13.90, img: 'fish-and-chips.jpg', desc: 'Crispy, golden in house fish bites with hand cut, perfectly seasoned chips and tangy pickles.' },
        { id: 'main-broccoli', name: 'Broccoli with Sweet Chilli Sauce', vn: 'Súp lơ', price: 7.90, img: 'broccoli.jpg', badges: ['Vegetarian'], desc: 'Fresh broccoli florets, lightly boiled to keep their crunch, served with our house made sweet chilli sauce.' },
        { id: 'main-choy-sum', name: 'Choy Sum with Sweet Chilli Sauce', vn: 'Cải ngồng', price: 7.90, img: 'choy-sum.jpg', badges: ['Vegetarian'], desc: 'Tender choy sum, lightly boiled to preserve its natural sweetness, served with our signature sweet chilli sauce.' }
      ]
    },
    {
      id: 'rice', title: 'Rice', vn: 'Cơm', blurb: 'Fragrant jasmine rice plates.',
      items: [
        { id: 'rice-pork-chop', name: 'Signature Pork Chop Rice', vn: 'Cơm sườn', price: 12.90, img: 'pork-chop-rice.jpg', badges: ['Signature'], desc: 'Grilled, marinated pork chops served with fragrant jasmine rice and pickled vegetables.' },
        { id: 'rice-honey-chicken', name: 'Glazed Honey Chicken Rice', vn: 'Cơm gà sốt mật ong', price: 12.90, img: 'honey-chicken-rice.jpg', desc: 'Tender, juicy chicken glazed in a rich honey sauce over jasmine rice, with crisp pickled vegetables and fresh cucumber.' }
      ]
    },
    {
      id: 'soups', title: 'Soups', vn: 'Canh', blurb: 'Comforting Vietnamese style soups.',
      items: [
        { id: 'soup-shrimp-chips', name: 'Prawn Soup with Shrimp Chips', vn: 'Bánh canh phồng tôm', price: 14.90, img: 'shrimp-chip-soup.jpg', desc: 'A rich Vietnamese soup with chewy shrimp chips in a savoury broth, topped with fresh prawns.' },
        { id: 'soup-egg-beef', name: 'Poached Eggs in Beef Soup', vn: 'Trứng trần canh bò', price: 6.90, img: 'poached-egg-beef-soup.jpg', desc: 'Comforting Vietnamese style beef soup served with two perfectly poached eggs.' },
        { id: 'soup-egg-chicken', name: 'Poached Eggs in Chicken Soup', vn: 'Trứng trần canh gà', price: 5.90, img: 'poached-egg-chicken-soup.jpg', desc: 'Comforting Vietnamese style chicken soup served with two perfectly poached eggs.' }
      ]
    },
    {
      id: 'skewers', title: 'Skewers', vn: 'Xiên', blurb: 'Marinated and grilled to order.',
      items: [
        { id: 'sk-prawn', name: 'BBQ Prawn Skewers', vn: 'Tôm nướng', price: 9.90, img: 'skewer-prawn.jpg', desc: 'Three sticks. Juicy fresh prawns grilled with a smoky aroma and a hint of char, marinated in our blend of herbs and spices.' },
        { id: 'sk-pork', name: 'Pork Skewers', vn: 'Thịt lợn nướng', price: 7.90, img: 'skewer-pork.jpg', badges: ['Best seller'], desc: 'Four sticks of succulent grilled pork marinated with aromatic spices, garlic and lemongrass. Perfectly charred and juicy.' },
        { id: 'sk-frog', name: 'Grilled Frog Legs', vn: 'Đùi ếch nướng', price: 12.80, img: 'skewer-frog-legs.jpg', desc: 'Four sticks. Succulent frog legs marinated in aromatic spices and grilled for a smoky, charred finish. Served with a zesty dipping sauce.' },
        { id: 'sk-quail-egg', name: 'Quail Egg Skewers', vn: 'Trứng cút chiên', price: 5.90, img: 'skewer-quail-egg.jpg', desc: 'Three skewers of tender quail eggs marinated in our special spice blend.' },
        { id: 'sk-mushroom', name: 'King Oyster Mushroom Skewers', vn: 'Nấm chiên', price: 5.90, img: 'skewer-mushroom.jpg', badges: ['Vegetarian'], desc: 'Three skewers of juicy, meaty king oyster mushrooms marinated in our special BBQ spice.' }
      ]
    },
    {
      id: 'breakfast', title: 'Breakfast and Porridge', vn: 'Bữa sáng', blurb: 'Thick, sticky style congee cooked until smooth, and a wholesome Vietnamese start to the day.',
      items: [
        { id: 'bf-century-egg', name: 'Century Egg Porridge', vn: 'Cháo trứng bắc thảo', price: 12.90, img: 'century-egg-porridge.jpg', desc: 'Thick, sticky style congee cooked until smooth and comforting, topped with rich, savoury century egg.' },
        { id: 'bf-minced-pork', name: 'Minced Pork Porridge', vn: 'Cháo thịt bằm', price: 11.90, img: 'minced-pork-porridge.jpg', desc: 'Smooth, comforting congee served with savoury minced pork for a hearty bowl.' },
        { id: 'bf-healthy', name: 'Healthy Vietnamese Breakfast', vn: 'Bữa sáng healthy Việt Nam', price: 12.90, img: 'healthy-breakfast.jpg', desc: 'Boiled sweet potato, chewy corn, two eggs, cucumber and Vietnamese peanut salt. Simple, nutritious and satisfying.' }
      ]
    },
    {
      id: 'sides', title: 'Sides and Snacks', vn: 'Món kèm', blurb: 'Crispy bites, fried favourites and the basics to go with your meal.',
      items: [
        { id: 'side-crispy-corn', name: 'Hanoi Style Crispy Corn', vn: 'Ngô chiên', price: 9.90, img: 'crispy-corn.jpg', badges: ['New'], desc: 'Sweet corn kernels lightly coated and fried to golden perfection. Crispy outside, naturally sweet and juicy inside.' },
        { id: 'side-popcorn-chicken', name: 'Popcorn Chicken', price: 9.90, img: 'popcorn-chicken.jpg', desc: 'Bite sized golden fried chicken with a crispy seasoned coating and juicy, tender meat inside.' },
        { id: 'side-prawn-pancake', name: 'Prawn Pancake', vn: 'Chả tôm', price: 8.90, img: 'prawn-pancake.jpg', desc: 'Homemade prawn patties made from fresh minced prawn, lightly seasoned and fried to a golden crisp.' },
        { id: 'side-fish-bites', name: 'Crispy Fish Bites', vn: 'Cá chiên', price: 8.90, img: 'fish-bites.jpg', desc: 'Golden, crunchy bite sized fish fillets, seasoned and fried to perfection. Crispy outside, tender and flaky inside.' },
        { id: 'side-chicken-chop', name: 'Fried Chicken Chop', vn: 'Thịt gà chiên', price: 8.90, img: 'fried-chicken-chop.jpg', desc: 'Crispy, golden brown chicken chop, seasoned and fried to perfection. Juicy inside, crunchy outside.' },
        { id: 'side-pork-chop', name: 'Fried Pork Chop', vn: 'Thịt heo chiên', price: 8.90, img: 'fried-pork-chop.jpg', desc: 'Juicy, tender pork chop seasoned and fried to a crispy golden brown.' },
        { id: 'side-fried-tofu', name: 'Fried Tofu with Scallion Oil', vn: 'Đậu tẩm hành', price: 8.90, img: 'fried-tofu.jpg', badges: ['Vegetarian'], desc: 'Crispy tofu topped with fragrant scallion oil for a perfect balance of textures.' },
        { id: 'side-fries', name: 'Homemade French Fries', vn: 'Khoai tây chiên', price: 7.90, img: 'french-fries.jpg', desc: 'Golden and crispy outside, fluffy inside, freshly made in house and perfectly seasoned.' },
        { id: 'side-sweet-potato-wedges', name: 'Fried Sweet Potato Wedges', vn: 'Khoai lang chiên', price: 7.90, img: 'sweet-potato-wedges.jpg', desc: 'Golden fried sweet potato wedges, lightly seasoned for the perfect balance of natural sweetness and savoury crunch.' },
        { id: 'side-sweet-potato-fritters', name: 'Sweet Potato Fritters', vn: 'Khoai lang kén', price: 7.90, img: 'sweet-potato-fritters.jpg', desc: 'Golden bite sized sweet potato fritters, crispy outside and soft and sweet inside.' },
        { id: 'side-egg', name: 'Egg It Your Way', vn: 'Trứng chiên', price: 6.90, img: 'egg-your-way.jpg', desc: 'A fluffy golden omelette made to order. Tell us in the notes if you would like prawns, sausage, pork, chicken, quail eggs, smoked salmon, beef, cheese or fresh vegetables added.' },
        { id: 'side-sticky-rice', name: 'Sticky Rice', vn: 'Xôi', price: 7.90, img: 'sticky-rice.jpg', desc: 'Glutinous rice steamed for a chewy, satisfying texture, served savoury with mung beans and crispy fried shallots.' },
        { id: 'side-pickles', name: 'Vietnamese Pickles', vn: 'Rau chua', price: 3.90, img: 'pickles.jpg', desc: 'A refreshing 150g serving of pickled carrot and radish. Lightly tangy and crisp.' },
        { id: 'side-baguette', name: 'Plain Bánh Mì Baguette', vn: 'Bánh mì', price: 3.50, img: 'plain-baguette.jpg', desc: 'Our artisanal Vietnamese baguette, with a crisp, thin crust and a soft, fluffy inside.' },
        { id: 'side-rice-noodles', name: 'Thin Rice Noodles', vn: 'Bún', price: 2.60, img: 'rice-noodles.jpg', desc: 'Silky thin Vietnamese rice noodles.' },
        { id: 'side-pearl-rice', name: 'Pearl Rice', vn: 'Cơm', price: 1.68, img: 'pearl-rice.jpg', desc: 'Light and fluffy pearl rice.' }
      ]
    },
    {
      id: 'corn', title: 'Chewy Corn', vn: 'Ngô', blurb: 'Premium glutinous corn with a fuller, fleshier bite than regular corn. One cob per serving.',
      items: [
        { id: 'corn-colourful', name: 'Colourful Chewy Corn', vn: 'Ngô hoa', price: 4.90, img: 'corn-colourful.jpg', desc: 'Naturally colourful kernels with a delightful mix of chewy and crunchy textures. 260g.' },
        { id: 'corn-purple', name: 'Purple Chewy Corn', vn: 'Ngô dẻo tím', price: 4.90, img: 'corn-purple.jpg', desc: 'Firm, fleshy and rich in chew, packed with anthocyanins. 220g.' },
        { id: 'corn-white', name: 'White Chewy Corn', vn: 'Ngô dẻo trắng', price: 4.90, img: 'corn-white.jpg', desc: 'Sweet, rich flavour with a texture that is both chewy and slightly crunchy. 260g.' },
        { id: 'corn-yellow', name: 'Yellow Chewy Corn', vn: 'Ngô dẻo vàng', price: 4.90, img: 'corn-yellow.jpg', desc: 'A fuller, fleshier bite with natural sweetness and a hint of crunch. 220g.' }
      ]
    },
    {
      id: 'coffee', title: 'Vietnamese Coffee', vn: 'Cà phê', blurb: 'Gourmet single estate Vietnamese coffee from premium Đắk Lắk beans, brewed to order.',
      items: [
        { id: 'cf-iced-milk', name: 'Iced Milk Coffee', vn: 'Cà phê sữa đá', price: 6.90, img: 'coffee-iced-milk.jpg', badges: ['Classic'], desc: 'Rich, aromatic Vietnamese iced coffee brewed from single estate Đắk Lắk beans, served cold with sweetened condensed milk.' },
        { id: 'cf-bac-xiu', name: 'Bạc Xỉu Iced White Coffee', vn: 'Bạc xỉu', price: 7.90, img: 'coffee-bac-xiu.jpg', desc: 'Dripped coffee with sweetened condensed milk, topped with frothy steamed milk. Smooth, creamy and slightly sweet.' },
        { id: 'cf-fresh-milk', name: 'Iced Coffee with Fresh Milk', vn: 'Cà phê sữa tươi', price: 7.90, img: 'coffee-fresh-milk.jpg', desc: 'Bold Vietnamese coffee with smooth, creamy fresh milk. Served unsweetened for a pure coffee experience.' },
        { id: 'cf-coco-spiced', name: 'Coco Spiced Iced Coffee', vn: 'Cà phê đá dừa và gia vị', price: 7.90, img: 'coffee-coco-spiced.jpg', badges: ['Signature'], desc: 'A rich and creamy coffee infused with condensed milk, coconut milk and our unique spice blend. Smooth, aromatic and exotic.' },
        { id: 'cf-iced-egg', name: 'Iced Egg Coffee', vn: 'Cà phê trứng đá', price: 8.90, img: 'coffee-iced-egg.jpg', desc: 'Robust drip coffee topped with a silky whipped egg yolk foam, served over ice.' },
        { id: 'cf-egg-cream', name: 'Coffee with Egg Cream', vn: 'Cà phê kem trứng', price: 10.90, img: 'coffee-egg-cream.jpg', badges: ['New'], desc: 'Rich Vietnamese coffee topped with velvety whipped egg cream. Bold coffee balanced with custard like sweetness.' }
      ]
    },
    {
      id: 'drinks', title: 'Drinks', vn: 'Đồ uống', blurb: 'Cold drinks to go with your meal.',
      items: [
        { id: 'dr-coconut', name: 'Young Coconut Juice with Pulp', price: 3.20, img: 'drink-coconut.jpg' },
        { id: 'dr-coke', name: 'Coca-Cola', price: 2.90, img: 'drink-coke.jpg' },
        { id: 'dr-coke-less', name: 'Coca-Cola Less Sugar', price: 2.90, img: 'drink-coke-less-sugar.jpg' },
        { id: 'dr-coke-zero', name: 'Coke Zero', price: 3.20, img: 'drink-coke-zero.jpg' },
        { id: 'dr-sprite', name: 'Sprite', price: 2.90, img: 'drink-sprite.jpg' },
        { id: 'dr-sprite-zero', name: 'Sprite Zero Sugar', price: 3.20, img: 'drink-sprite-zero.jpg' },
        { id: 'dr-ayataka', name: 'Ayataka Green Tea', price: 2.90, img: 'drink-ayataka.jpg' },
        { id: 'dr-qoo', name: 'Qoo White Grape', price: 2.90, img: 'drink-qoo-grape.jpg' },
        { id: 'dr-100plus', name: '100 Plus Zero Sugar', price: 3.20, img: 'drink-100plus-zero.jpg' },
        { id: 'dr-soda', name: 'Soda Water', price: 3.20, img: 'drink-soda-water.jpg' },
        { id: 'dr-c2', name: 'C2 Lemon Tea', price: 3.80, img: 'drink-c2.jpg' },
        { id: 'dr-wakeup', name: 'Wake Up 247 Coffee Energy Drink', price: 3.80, img: 'drink-wakeup-247.jpg' },
        { id: 'dr-sting', name: 'Sting Energy Drink', price: 3.80, img: 'drink-sting.jpg' },
        { id: 'dr-redbull', name: 'Red Bull', price: 3.80, img: 'drink-red-bull.jpg' },
        { id: 'dr-redbull-plus', name: 'Red Bull Plus', price: 4.50, img: 'drink-red-bull-plus.jpg' },
        { id: 'dr-redbull-sf', name: 'Red Bull Sugar Free', price: 6.60, img: 'drink-red-bull-sugar-free.jpg' },
        { id: 'dr-dasani', name: 'Dasani Drinking Water 600ml', price: 2.50, img: 'drink-dasani.jpg' }
      ]
    },
    {
      id: 'desserts', title: 'Desserts', vn: 'Tráng miệng', blurb: 'Something sweet to finish.',
      items: [
        { id: 'ds-jelly-yogurt', name: 'Jelly Yogurt', vn: 'Sữa chua thạch', price: 8.90, img: 'jelly-yogurt.jpg', desc: 'Creamy, tangy yogurt flavoured with lime and paired with soft, bouncy jelly cubes.' },
        { id: 'ds-purple-sweet-potato', name: 'Purple Sweet Potato Rolls with Cinnamon Sugar', vn: 'Khoai lang tím chiên', price: 9.90, img: 'purple-sweet-potato-rolls.jpg', desc: 'Four pieces. Crispy outside, soft and slightly chewy inside, filled with rich purple sweet potato and served with cinnamon sugar.' }
      ]
    }
  ];

  window.OUTLETS = {
    novena: { name: 'Novena', full: 'Spring Roll Station (Novena)', phone: '6588019189', display: '8801 9189', address: '275 Thomson Road #01-26, Novena Regency, Singapore 307645', hours: 'Daily 10:00am to 12:00 midnight' },
    skysuites: { name: 'Skysuites at Anson', full: 'Spring Roll Station (Skysuites at Anson)', phone: '6580170610', display: '8017 0610', address: '8 Enggor Street #01-01/02, Skysuites at Anson, Singapore 079718', hours: 'Daily 10:00am to 10:00pm' }
  };
})();
