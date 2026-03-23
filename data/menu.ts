export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
}

export const menuCategories = [
  { id: 'tap-beer',       label: 'Tap Beer',              group: 'DRINKS' },
  { id: 'beer-local',     label: 'Beer Local',             group: 'DRINKS' },
  { id: 'beer-imported',  label: 'Beer Imported',          group: 'DRINKS' },
  { id: 'cider',          label: 'Cider',                  group: 'DRINKS' },
  { id: 'rtds',           label: 'RTDs',                   group: 'DRINKS' },
  { id: 'rum',            label: 'Rum',                    group: 'DRINKS' },
  { id: 'scotch-whisky',  label: 'Scotch / Single Malt',   group: 'DRINKS' },
  { id: 'bourbon',        label: 'Bourbon',                group: 'DRINKS' },
  { id: 'brandy-cognac',  label: 'Brandy & Cognac',        group: 'DRINKS' },
  { id: 'vodka',          label: 'Vodka',                  group: 'DRINKS' },
  { id: 'tequila',        label: 'Tequila',                group: 'DRINKS' },
  { id: 'gin',            label: 'Gin',                    group: 'DRINKS' },
  { id: 'aperitifs',      label: 'Aperitifs',              group: 'DRINKS' },
  { id: 'liqueur',        label: 'Liqueur',                group: 'DRINKS' },
  { id: 'cocktail-list',  label: 'Cocktail List',          group: 'COCKTAILS' },
  { id: 'classic-cocktails', label: 'Classic Cocktails',   group: 'COCKTAILS' },
  { id: 'shooters',       label: 'Shooters',               group: 'COCKTAILS' },
  { id: 'mocktails',      label: 'Mocktails',              group: 'COCKTAILS' },
  { id: 'wine-tap',       label: 'Wine On Tap',            group: 'WINE' },
  { id: 'piccolos',       label: 'Piccolos',               group: 'WINE' },
  { id: 'sparkling',      label: 'Sparkling Wines',        group: 'WINE' },
  { id: 'white-wine',     label: 'White Wines',            group: 'WINE' },
  { id: 'red-wine',       label: 'Red Wine',               group: 'WINE' },
  { id: 'rose',           label: 'Rose',                   group: 'WINE' },
  { id: 'soft-drink',     label: 'Soft Drink',             group: 'BEVERAGES' },
  { id: 'juices',         label: 'Juices',                 group: 'BEVERAGES' },
  { id: 'fountain',       label: 'Soft Drink Fountain',    group: 'BEVERAGES' },
  { id: 'water',          label: 'Mineral Waters',         group: 'BEVERAGES' },
  { id: 'milkshakes',     label: 'Milk Shakes',            group: 'BEVERAGES' },
  { id: 'coffee-tea',     label: 'Coffee and Tea',         group: 'BEVERAGES' },
  { id: 'to-share',       label: 'To Share',               group: 'FOOD' },
  { id: 'pizza',          label: 'Pizza',                  group: 'FOOD' },
  { id: 'pasta',          label: 'Pasta',                  group: 'FOOD' },
  { id: 'substantial',    label: 'Something Substantial',  group: 'FOOD' },
  { id: 'steak',          label: 'Chargrill Steak',        group: 'FOOD' },
  { id: 'salads',         label: 'Salads',                 group: 'FOOD' },
  { id: 'sides',          label: 'Sides',                  group: 'FOOD' },
  { id: 'kids',           label: "Little People's Menu",   group: 'FOOD' },
  { id: 'sweet',          label: 'Something Sweet',        group: 'FOOD' },
]

export const menuItems: MenuItem[] = [
  // TAP BEER
  { id: 1,  name: 'Coopers Pale Ale',       category: 'tap-beer',      description: 'Crisp and refreshing, Adelaide\'s favourite.',              price: 9.50 },
  { id: 2,  name: 'Hahn Super Dry',         category: 'tap-beer',      description: 'Light and clean lager on tap.',                              price: 8.50 },
  { id: 3,  name: 'Guinness',               category: 'tap-beer',      description: 'Iconic Irish stout, perfectly poured.',                      price: 11.00 },
  { id: 4,  name: 'Carlton Draught',        category: 'tap-beer',      description: 'Classic Australian session lager.',                          price: 8.00 },
  { id: 5,  name: 'Coopers Stout',          category: 'tap-beer',      description: 'Rich, dark and deeply satisfying.',                          price: 9.50 },
  { id: 6,  name: 'Stone & Wood Pacific',   category: 'tap-beer',      description: 'Tropical pale ale from Byron Bay.',                          price: 10.50 },

  // BEER LOCAL
  { id: 7,  name: 'Coopers Sparkling Ale',  category: 'beer-local',    description: 'The original cloudy craft, brewed in SA since 1862.',        price: 8.00 },
  { id: 8,  name: 'Pirate Life Pale Ale',   category: 'beer-local',    description: 'Bold hop-forward pale from Adelaide.',                       price: 9.00 },
  { id: 9,  name: 'Big Shed Golden Stout',  category: 'beer-local',    description: 'A smooth, unexpected stout with golden colour.',              price: 10.00 },

  // BEER IMPORTED
  { id: 10, name: 'Heineken',               category: 'beer-imported', description: 'Dutch lager with a clean, refreshing finish.',               price: 9.00 },
  { id: 11, name: 'Corona Extra',           category: 'beer-imported', description: 'Light Mexican lager, best with lime.',                       price: 9.00 },
  { id: 12, name: 'Peroni Nastro Azzurro',  category: 'beer-imported', description: 'Premium Italian lager, smooth and crisp.',                   price: 9.50 },

  // CIDER
  { id: 13, name: 'Somersby Apple',         category: 'cider',         description: 'Refreshing apple cider, perfectly chilled.',                 price: 9.00 },
  { id: 14, name: 'Rekorderlig Wild Berry', category: 'cider',         description: 'Swedish cider bursting with berry flavour.',                 price: 11.00 },
  { id: 15, name: 'Willie Smith\'s Organic',category: 'cider',         description: 'Tasmanian heritage apple cider, naturally cloudy.',          price: 10.50 },

  // RTDS
  { id: 16, name: 'Hard Rated Lemon',       category: 'rtds',          description: 'Crisp lemon squash with vodka base.',                        price: 10.00 },
  { id: 17, name: 'Smirnoff Ice',           category: 'rtds',          description: 'Classic vodka premix, always refreshing.',                   price: 10.00 },
  { id: 18, name: 'Brookvale Union Ginger', category: 'rtds',          description: 'Craft ginger beer with natural bite.',                       price: 11.00 },

  // RUM
  { id: 19, name: 'Bundaberg Rum',          category: 'rum',           description: 'Queensland\'s favourite dark rum.',                          price: 8.50 },
  { id: 20, name: 'Sailor Jerry Spiced',    category: 'rum',           description: 'Smooth spiced rum with hints of vanilla and cinnamon.',      price: 10.00 },
  { id: 21, name: 'Havana Club 7 Year',     category: 'rum',           description: 'Cuban aged rum with rich oak and dried fruit notes.',        price: 12.00 },

  // SCOTCH / WHISKY
  { id: 22, name: 'Johnnie Walker Black',   category: 'scotch-whisky', description: '12-year blended Scotch, smooth with smoky finish.',          price: 11.00 },
  { id: 23, name: 'Glenfiddich 12',         category: 'scotch-whisky', description: 'Classic single malt, fruity and mellow.',                   price: 14.00 },
  { id: 24, name: 'Glenlivet 12',           category: 'scotch-whisky', description: 'Speyside single malt, floral and light.',                   price: 13.00 },

  // BOURBON
  { id: 25, name: 'Jim Beam White',         category: 'bourbon',       description: 'The world\'s best-selling bourbon.',                         price: 8.50 },
  { id: 26, name: 'Jack Daniel\'s No.7',    category: 'bourbon',       description: 'Tennessee whiskey, charcoal mellowed and smooth.',          price: 10.00 },
  { id: 27, name: 'Woodford Reserve',       category: 'bourbon',       description: 'Premium small batch, rich with dried fruit and spice.',     price: 14.00 },

  // BRANDY & COGNAC
  { id: 28, name: 'St Remy VSOP',           category: 'brandy-cognac', description: 'French brandy, smooth with hints of oak and vanilla.',      price: 10.00 },
  { id: 29, name: 'Hennessy VS',            category: 'brandy-cognac', description: 'The world\'s most iconic cognac.',                           price: 14.00 },

  // VODKA
  { id: 30, name: 'Absolut Original',       category: 'vodka',         description: 'Clean Swedish vodka, the bartender\'s standard.',            price: 9.00 },
  { id: 31, name: 'Grey Goose',             category: 'vodka',         description: 'French luxury vodka, exceptionally smooth.',                 price: 14.00 },
  { id: 32, name: 'Belvedere',              category: 'vodka',         description: 'Polish rye vodka with a velvety texture.',                   price: 14.00 },

  // TEQUILA
  { id: 33, name: 'Jose Cuervo Silver',     category: 'tequila',       description: 'Classic silver tequila, smooth and versatile.',              price: 9.00 },
  { id: 34, name: 'Patron Silver',          category: 'tequila',       description: 'Ultra-premium small batch, crisp and clean.',                price: 15.00 },
  { id: 35, name: 'Olmeca Altos Reposado',  category: 'tequila',       description: 'Aged in American oak, fruity with subtle spice.',            price: 12.00 },

  // GIN
  { id: 36, name: 'Tanqueray London Dry',   category: 'gin',           description: 'The bartender\'s go-to, balanced and juniper-forward.',      price: 10.00 },
  { id: 37, name: 'Hendricks',              category: 'gin',           description: 'Scottish gin infused with rose and cucumber.',               price: 13.00 },
  { id: 38, name: 'Four Pillars Rare Dry',  category: 'gin',           description: 'Australian craft gin, citrus-forward and vibrant.',          price: 13.00 },

  // APERITIFS
  { id: 39, name: 'Aperol Spritz',          category: 'aperitifs',     description: 'Prosecco, Aperol and a splash of soda. The Italian classic.', price: 14.00 },
  { id: 40, name: 'Campari & Soda',         category: 'aperitifs',     description: 'Bitter and refreshing Italian aperitivo.',                   price: 13.00 },
  { id: 41, name: 'Pimm\'s No.1',           category: 'aperitifs',     description: 'British fruit cup served with lemonade and fruit.',          price: 12.00 },

  // LIQUEUR
  { id: 42, name: 'Baileys Irish Cream',    category: 'liqueur',       description: 'Smooth Irish whiskey and cream liqueur.',                    price: 10.00 },
  { id: 43, name: 'Kahlua',                 category: 'liqueur',       description: 'Coffee liqueur from Mexico, rich and deep.',                 price: 10.00 },
  { id: 44, name: 'Frangelico',             category: 'liqueur',       description: 'Italian hazelnut liqueur, wonderfully aromatic.',            price: 10.00 },

  // COCKTAIL LIST
  { id: 45, name: 'Rezz Signature Sour',    category: 'cocktail-list', description: 'Whiskey, lemon, egg white, Angostura. A house classic.',    price: 18.00 },
  { id: 46, name: 'Brown Sugar Old Fashioned', category: 'cocktail-list', description: 'Bourbon, brown sugar syrup, aromatic bitters, orange.',  price: 20.00 },
  { id: 47, name: 'Midnight Negroni',       category: 'cocktail-list', description: 'Gin, sweet vermouth, Campari. Stirred, not shaken.',        price: 18.00 },

  // CLASSIC COCKTAILS
  { id: 48, name: 'Espresso Martini',       category: 'classic-cocktails', description: 'Vodka, Kahlua, fresh espresso. The after-dinner essential.', price: 19.00 },
  { id: 49, name: 'Cosmopolitan',           category: 'classic-cocktails', description: 'Vodka, triple sec, cranberry, fresh lime.',              price: 17.00 },
  { id: 50, name: 'Mojito',                 category: 'classic-cocktails', description: 'White rum, fresh mint, lime, sugar, soda.',              price: 17.00 },
  { id: 51, name: 'Margarita',              category: 'classic-cocktails', description: 'Tequila, triple sec, fresh lime. Salted rim on request.', price: 18.00 },

  // SHOOTERS
  { id: 52, name: 'B52',                    category: 'shooters',      description: 'Kahlua, Baileys and Grand Marnier, layered.',               price: 10.00 },
  { id: 53, name: 'Tequila Sunrise Shot',   category: 'shooters',      description: 'Tequila, OJ and grenadine in a shot.',                      price: 10.00 },
  { id: 54, name: 'Jager Bomb',             category: 'shooters',      description: 'Jagermeister dropped into Red Bull.',                       price: 12.00 },

  // MOCKTAILS
  { id: 55, name: 'Virgin Mojito',          category: 'mocktails',     description: 'Fresh mint, lime, sugar, soda. Zero alcohol, all the fun.', price: 10.00 },
  { id: 56, name: 'Sunset Cooler',          category: 'mocktails',     description: 'Passionfruit, mango, lime, ginger ale.',                    price: 10.00 },
  { id: 57, name: 'Sparkling Elderflower',  category: 'mocktails',     description: 'Elderflower cordial, cucumber, mint, sparkling water.',     price: 9.50 },

  // WINE ON TAP
  { id: 58, name: 'House White On Tap',     category: 'wine-tap',      description: 'Crisp Sauvignon Blanc poured fresh from the tap.',          price: 9.00 },
  { id: 59, name: 'House Red On Tap',       category: 'wine-tap',      description: 'Smooth Shiraz, South Australian grown.',                    price: 9.00 },
  { id: 60, name: 'House Rose On Tap',      category: 'wine-tap',      description: 'Light and dry rose, always perfectly chilled.',             price: 9.00 },

  // PICCOLOS
  { id: 61, name: 'Prosecco Piccolo',       category: 'piccolos',      description: 'Single serve sparkling, ideal for celebrating anything.',   price: 11.00 },
  { id: 62, name: 'Chandon Brut Piccolo',   category: 'piccolos',      description: 'Australian sparkling wine from the Yarra Valley.',          price: 12.00 },

  // SPARKLING
  { id: 63, name: 'Chandon Brut NV',        category: 'sparkling',     description: 'Elegant Australian sparkling, persistent mousse.',          price: 48.00 },
  { id: 64, name: 'Moet & Chandon Imperial',category: 'sparkling',     description: 'Champagne. The benchmark for celebrations.',                price: 95.00 },

  // WHITE WINE
  { id: 65, name: 'Shaw & Smith Sauvignon Blanc', category: 'white-wine', description: 'Adelaide Hills. Zesty, herbaceous, crisp finish.',      price: 55.00 },
  { id: 66, name: 'Yalumba Y Series Pinot Gris', category: 'white-wine', description: 'Peachy, soft and easy drinking.',                       price: 42.00 },
  { id: 67, name: 'Pewsey Vale Riesling',   category: 'white-wine',    description: 'Eden Valley. Floral and lime-driven with steely acidity.', price: 50.00 },

  // RED WINE
  { id: 68, name: 'Penfolds Bin 389',       category: 'red-wine',      description: 'The cabernet-shiraz blend. Powerful and structured.',      price: 85.00 },
  { id: 69, name: 'D\'Arenberg Footbolt Shiraz', category: 'red-wine', description: 'McLaren Vale Shiraz. Dark berries, spice and oak.',        price: 50.00 },
  { id: 70, name: 'Tuck\'s Ridge Pinot Noir', category: 'red-wine',    description: 'Mornington Peninsula. Elegant, silky and fragrant.',      price: 58.00 },

  // ROSE
  { id: 71, name: 'Miraval Provence Rose',  category: 'rose',          description: 'The classic Provence rose. Pale, dry and refined.',        price: 65.00 },
  { id: 72, name: 'Squealing Pig Rose',     category: 'rose',          description: 'NZ rose, watermelon and strawberry, crisp and fresh.',     price: 45.00 },

  // SOFT DRINK
  { id: 73, name: 'Coke',                   category: 'soft-drink',    description: '330ml can.',                                                price: 4.50 },
  { id: 74, name: 'Diet Coke',              category: 'soft-drink',    description: '330ml can.',                                                price: 4.50 },
  { id: 75, name: 'Lemon Lime & Bitters',   category: 'soft-drink',    description: 'Lemonade, lime cordial, Angostura bitters.',               price: 5.50 },

  // JUICES
  { id: 76, name: 'Orange Juice',           category: 'juices',        description: 'Freshly squeezed, seasonal.',                               price: 6.00 },
  { id: 77, name: 'Apple Juice',            category: 'juices',        description: 'Pressed apple, served chilled.',                            price: 5.50 },

  // FOUNTAIN
  { id: 78, name: 'Fountain Soft Drink',    category: 'fountain',      description: 'Coke, Diet Coke, Fanta, Sprite. Unlimited refills.',        price: 4.00 },

  // WATER
  { id: 79, name: 'Still Water 500ml',      category: 'water',         description: 'Mount Franklin still water.',                               price: 4.00 },
  { id: 80, name: 'Sparkling Water 500ml',  category: 'water',         description: 'San Pellegrino sparkling.',                                 price: 5.00 },

  // MILKSHAKES
  { id: 81, name: 'Chocolate Milkshake',    category: 'milkshakes',    description: 'Thick, creamy, loaded with real chocolate.',                price: 8.00 },
  { id: 82, name: 'Strawberry Milkshake',   category: 'milkshakes',    description: 'Fresh strawberry, whipped cream on top.',                   price: 8.00 },
  { id: 83, name: 'Vanilla Milkshake',      category: 'milkshakes',    description: 'Classic vanilla bean, silky smooth.',                       price: 8.00 },

  // COFFEE & TEA
  { id: 84, name: 'Flat White',             category: 'coffee-tea',    description: 'Double ristretto, velvety steamed milk.',                   price: 5.50 },
  { id: 85, name: 'Long Black',             category: 'coffee-tea',    description: 'Double espresso over hot water.',                           price: 5.00 },
  { id: 86, name: 'Chai Latte',             category: 'coffee-tea',    description: 'Spiced chai concentrate with steamed milk.',                price: 6.00 },
  { id: 87, name: 'Loose Leaf Tea',         category: 'coffee-tea',    description: 'English Breakfast, Earl Grey or Green. Pot for one.',       price: 5.50 },

  // TO SHARE
  { id: 88, name: 'Garlic Bread',           category: 'to-share',      description: 'House-made sourdough, garlic butter, parsley.',             price: 10.00 },
  { id: 89, name: 'Cheese & Charcuterie',   category: 'to-share',      description: 'SA cheeses, cured meats, lavosh, quince.',                 price: 28.00 },
  { id: 90, name: 'Calamari Fritti',        category: 'to-share',      description: 'Crispy squid, aioli, lemon. Hard to stop at one serve.',   price: 18.00 },
  { id: 91, name: 'Arancini (4 pcs)',       category: 'to-share',      description: 'Wild mushroom and truffle, fried golden.',                  price: 16.00 },

  // PIZZA
  { id: 92, name: 'Margherita',             category: 'pizza',         description: 'San Marzano tomato, buffalo mozzarella, fresh basil.',      price: 22.00 },
  { id: 93, name: 'Prosciutto & Rocket',    category: 'pizza',         description: 'Prosciutto, wild rocket, shaved parmesan, EVOO.',           price: 26.00 },
  { id: 94, name: 'BBQ Chicken',            category: 'pizza',         description: 'Smoky BBQ base, grilled chicken, caramelised onion, cheddar.', price: 24.00 },
  { id: 95, name: 'Diavola',               category: 'pizza',         description: 'Spicy salami, nduja, chilli, fior di latte.',               price: 25.00 },
  { id: 96, name: 'Truffle Mushroom',       category: 'pizza',         description: 'Wild mushroom, truffle oil, taleggio, thyme.',              price: 27.00 },

  // PASTA
  { id: 97, name: 'Spaghetti Bolognese',    category: 'pasta',         description: 'Slow-cooked beef ragu, parmesan, fresh pasta.',             price: 26.00 },
  { id: 98, name: 'Gnocchi al Forno',       category: 'pasta',         description: 'House gnocchi, napoli sauce, buffalo mozzarella, baked.',   price: 28.00 },
  { id: 99, name: 'Linguine Vongole',       category: 'pasta',         description: 'Pippies, white wine, garlic, chilli, parsley.',             price: 32.00 },
  { id: 100, name: 'Penne Arrabbiata',      category: 'pasta',         description: 'Tomato, chilli, garlic. Simple and perfect.',               price: 22.00 },

  // SOMETHING SUBSTANTIAL
  { id: 101, name: 'Chicken Schnitzel',     category: 'substantial',   description: 'Crumbed free-range chicken, chips, salad, choice of sauce.', price: 28.00 },
  { id: 102, name: 'Barramundi',            category: 'substantial',   description: 'Pan-seared SA barramundi, green beans, beurre blanc.',       price: 38.00 },
  { id: 103, name: 'Lamb Rack',             category: 'substantial',   description: 'Two-point rack, roasted cauliflower puree, jus.',           price: 42.00 },
  { id: 104, name: 'Cauliflower Steak (V)', category: 'substantial',   description: 'Roasted whole with tahini, pomegranate, pistachio dukkah.', price: 28.00 },

  // STEAK
  { id: 105, name: '250g Scotch Fillet',    category: 'steak',         description: 'SA grain-fed beef, served with chips and salad.',           price: 48.00 },
  { id: 106, name: '300g Rump Steak',       category: 'steak',         description: 'Free range, with your choice of sauce.',                    price: 38.00 },
  { id: 107, name: '400g Rib Eye',          category: 'steak',         description: 'Marble score 4+. Bone-in, for the purists.',                price: 65.00 },
  { id: 108, name: 'Sauces',                category: 'steak',         description: 'Mushroom, pepper, red wine jus, garlic butter or aioli.',   price: 3.00 },

  // SALADS
  { id: 109, name: 'Caesar Salad',          category: 'salads',        description: 'Cos, bacon, parmesan, croutons, house Caesar dressing.',    price: 22.00 },
  { id: 110, name: 'Greek Salad',           category: 'salads',        description: 'Tomato, cucumber, olives, feta, red onion, oregano.',       price: 20.00 },
  { id: 111, name: 'Roasted Pumpkin Salad', category: 'salads',        description: 'Pumpkin, spinach, pepitas, goat cheese, balsamic glaze.',   price: 21.00 },

  // SIDES
  { id: 112, name: 'Chips',                 category: 'sides',         description: 'House-cut fries, sea salt, aioli.',                         price: 10.00 },
  { id: 113, name: 'Sweet Potato Fries',    category: 'sides',         description: 'Crispy sweet potato, sriracha mayo.',                       price: 12.00 },
  { id: 114, name: 'Seasonal Vegetables',   category: 'sides',         description: 'Steamed and buttered, whatever\'s fresh today.',            price: 10.00 },
  { id: 115, name: 'Garden Salad',          category: 'sides',         description: 'Mixed leaves, cherry tomato, cucumber, vinaigrette.',       price: 9.00 },

  // KIDS
  { id: 116, name: 'Kids Chicken Nuggets',  category: 'kids',          description: '5 golden nuggets with chips and tomato sauce.',             price: 12.00 },
  { id: 117, name: 'Kids Pasta Bolognese',  category: 'kids',          description: 'Small serve with parmesan.',                                price: 12.00 },
  { id: 118, name: 'Kids Pizza',            category: 'kids',          description: 'Ham and cheese on a classic base.',                         price: 14.00 },
  { id: 119, name: 'Kids Fish & Chips',     category: 'kids',          description: 'Crumbed fish, chips, lemon.',                               price: 12.00 },

  // SWEET
  { id: 120, name: 'Churros',               category: 'sweet',         description: 'Crispy cinnamon churros with chocolate dipping sauce.',     price: 14.00 },
  { id: 121, name: 'Creme Brulee',          category: 'sweet',         description: 'Classic vanilla custard with caramelised sugar crust.',    price: 13.00 },
  { id: 122, name: 'Tiramisu',              category: 'sweet',         description: 'House-made with Savoiardi, mascarpone, espresso.',          price: 14.00 },
  { id: 123, name: 'Gelato (3 scoops)',     category: 'sweet',         description: 'Ask your server for today\'s flavours.',                    price: 10.00 },
  { id: 124, name: 'Affogato',              category: 'sweet',         description: 'Vanilla gelato drowned in fresh espresso. Optional Baileys.', price: 11.00 },
]
