export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'poultry', name: 'Fresh Broilers & Poultry', icon: '🐔' },
  { id: 'frozen', name: 'Frozen & Chilled Meats', icon: '❄️' },
  { id: 'livestock', name: 'Live Farm Livestock', icon: '🐑' },
  { id: 'eggs', name: 'Farm Eggs & Feeds', icon: '🥚' }
];

export const WEIGHT_TIERS = [
  {
    id: 'tier-1',
    name: 'Standard Broiler',
    weightRange: '1.8kg – 2.0kg',
    minWeight: 1.8,
    maxWeight: 2.0,
    avgWeight: 1.9,
    basePrice: 6500,
    description: 'Perfect for small family meals, soups, and roasting. Succulent and tender.',
    popular: false,
    tag: 'Quick Meals'
  },
  {
    id: 'tier-2',
    name: 'Medium Premium Broiler',
    weightRange: '2.1kg – 2.4kg',
    minWeight: 2.1,
    maxWeight: 2.4,
    avgWeight: 2.25,
    basePrice: 7800,
    description: 'Our top seller! Thick breast meat and juicy drumsticks.',
    popular: true,
    tag: 'Best Seller'
  },
  {
    id: 'tier-3',
    name: 'Large Family Broiler',
    weightRange: '2.5kg – 2.8kg',
    minWeight: 2.5,
    maxWeight: 2.8,
    avgWeight: 2.65,
    basePrice: 9200,
    description: 'Generous portions for Sunday stew, pepper soup, and gatherings.',
    popular: false,
    tag: 'Family Value'
  },
  {
    id: 'tier-4',
    name: 'Super Jumbo Broiler',
    weightRange: '3.0kg – 3.4kg',
    minWeight: 3.0,
    maxWeight: 3.4,
    avgWeight: 3.2,
    basePrice: 10800,
    description: 'Massive, heavy bird reared to peak maturity. Hearty cuts.',
    popular: false,
    tag: 'Heavyweight'
  }
];

export const PREPARATION_OPTIONS = [
  {
    id: 'live',
    name: 'Live Bird (Delivered Alive)',
    shortName: 'Live Bird',
    price: 0,
    description: 'Bird is weighed, crated in sanitized ventilated boxes, and delivered active.',
    icon: 'Feather',
    badge: 'No extra charge',
    requiresCutting: false
  },
  {
    id: 'dressed',
    name: 'Kill & Defeather (Whole Cleaned)',
    shortName: 'Dressed Whole',
    price: 500,
    description: 'Halal slaughtered, scalded, plucked spotless, singed, gutted, and rinsed with clean treated water.',
    icon: 'Flame',
    badge: '+₦500 processing',
    requiresCutting: false
  },
  {
    id: 'portioned',
    name: 'Kill, Defeather & Cut into Pieces',
    shortName: 'Dressed & Cut',
    price: 800,
    description: 'Complete slaughter, clean defeathering, and expert butcher cut into portions of your choice.',
    icon: 'Scissors',
    badge: '+₦800 butcher fee',
    requiresCutting: true
  }
];

export const PIECE_CUT_OPTIONS = [
  { id: '4', label: '4 Large Pieces', detail: 'Quarters (2 Breasts/Wings + 2 Thighs/Legs)' },
  { id: '8', label: '8 Standard Pieces', detail: 'Ideal for standard stew and frying' },
  { id: '12', label: '12 Medium Pieces', detail: 'Best for party cooking & pepper soup' },
  { id: '16', label: '16 Bite Pieces', detail: 'Small party bites, easy serving for kids' }
];

export const ALL_PRODUCTS = [
  // 1. POULTRY & BROILERS (FRESH BROILER IS THE ONLY ACTIVE ITEM!)
  {
    id: 'prod-broiler-custom',
    name: 'Fresh Farm Broiler (Priced by Weight)',
    category: 'poultry',
    categoryName: 'Fresh Broilers & Poultry',
    price: 7800,
    originalPrice: 8500,
    rating: 4.9,
    reviewsCount: 142,
    isAvailableNow: true, // ACTIVE ORDERABLE ITEM
    isCustomizable: true,
    isBroiler: true,
    badge: 'Active • Order Now',
    badgeColor: 'bg-red-600',
    unit: 'per bird (weight chosen: 1.8kg – 3.4kg+)',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Reared to peak maturity on organic feeds. Order live in crates or have us halal-slaughter, defeather, and cut into 4, 8, 12, or 16 pieces for your pot.',
    features: ['In Stock & Ready for Dispatch', 'Weight-based pricing', 'Live or Halal butchered', 'Same-day van delivery']
  },
  {
    id: 'prod-chicken-wings',
    name: 'Premium Chicken Wings Pack (1kg)',
    category: 'poultry',
    categoryName: 'Fresh Broilers & Poultry',
    price: 4500,
    originalPrice: 5000,
    rating: 4.8,
    reviewsCount: 88,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '1kg vacuum pack',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Plump, meaty broiler wings trimmed and cleaned. Perfect for grilling, peppered wings, or barbecuing.',
    features: ['Trimmed tips', 'Vacuum sealed', 'Coming in next batch']
  },
  {
    id: 'prod-chicken-gizzards',
    name: 'Cleaned Farm Gizzards & Liver Pack (1kg)',
    category: 'poultry',
    categoryName: 'Fresh Broilers & Poultry',
    price: 3800,
    originalPrice: 4200,
    rating: 4.7,
    reviewsCount: 64,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '1kg pack',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Degreased, scraped spotless and packed fresh. High-protein gizzards ready for spicy gizdodo and stew.',
    features: ['Spotless clean', 'Odor-free', 'Deep chilled']
  },

  // 2. FROZEN & CHILLED MEATS (COMING SOON)
  {
    id: 'prod-frozen-turkey-wings',
    name: 'Prime Farm Turkey Wings (2kg Pack)',
    category: 'frozen',
    categoryName: 'Frozen & Chilled Meats',
    price: 11500,
    originalPrice: 12800,
    rating: 4.9,
    reviewsCount: 95,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '2kg vacuum pack',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Thick, fleshy farm-raised turkey wings. Blast-frozen at -18°C to seal in natural poultry juices and texture.',
    features: ['Blast frozen at -18°C', 'Fleshy cuts', 'Chilled van delivery']
  },
  {
    id: 'prod-pork-chops',
    name: 'Grain-Fed Pork Chops & Ribs (1.5kg)',
    category: 'frozen',
    categoryName: 'Frozen & Chilled Meats',
    price: 8500,
    originalPrice: 9500,
    rating: 4.8,
    reviewsCount: 52,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '1.5kg pack',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Tender, lean farm pork chops and ribs. Reared with bio-secure feed and processed under strict hygiene conditions.',
    features: ['Grain-fed pork', 'Lean marbled cuts', 'Chilled packing']
  },
  {
    id: 'prod-frozen-chicken-whole',
    name: 'Blast-Frozen Dressed Whole Chicken',
    category: 'frozen',
    categoryName: 'Frozen & Chilled Meats',
    price: 7200,
    originalPrice: 7900,
    rating: 4.8,
    reviewsCount: 76,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '~2.0kg whole bird',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Halal slaughtered, plucked, gutted, and blast-frozen whole for easy freezer storage and long shelf-life.',
    features: ['Zero ice glaze deception', '100% net meat weight', 'Sealed pouch']
  },

  // 3. LIVE FARM LIVESTOCK (COMING SOON / PRE-ORDER)
  {
    id: 'prod-live-ram-balami',
    name: 'Mature Balami Ram (Heavyweight)',
    category: 'livestock',
    categoryName: 'Live Farm Livestock',
    price: 185000,
    originalPrice: 200000,
    rating: 5.0,
    reviewsCount: 39,
    isAvailableNow: false, // COMING SOON / PRE-ORDER
    isCustomizable: true,
    isLivestock: true,
    badge: 'Coming Soon • Pre-Book',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '45kg – 55kg Live Weight',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Massive white Balami ram with impressive horns and heavy muscle build. Pre-inspected by veterinary officers.',
    features: ['Live delivery or abattoir dressed', 'Health certificate', 'Available for festive bookings']
  },
  {
    id: 'prod-live-cow-fulani',
    name: 'Full Grown White Fulani Bull / Cow',
    category: 'livestock',
    categoryName: 'Live Farm Livestock',
    price: 480000,
    originalPrice: 520000,
    rating: 4.9,
    reviewsCount: 28,
    isAvailableNow: false, // COMING SOON / PRE-ORDER
    isCustomizable: true,
    isLivestock: true,
    badge: 'Coming Soon • Pre-Book',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '250kg+ Live Weight',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Healthy, grass-fed White Fulani cattle. Ideal for weddings, burials, corporate events, and butchers.',
    features: ['Vet inspected', 'Weight certified', 'Direct vehicle transit']
  },
  {
    id: 'prod-live-goat-boer',
    name: 'Meaty Sahel / Boer He-Goat (Asun Grade)',
    category: 'livestock',
    categoryName: 'Live Farm Livestock',
    price: 45000,
    originalPrice: 50000,
    rating: 4.8,
    reviewsCount: 67,
    isAvailableNow: false, // COMING SOON
    isCustomizable: true,
    isLivestock: true,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '20kg – 25kg Live Weight',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Active, disease-free adult goat with thick tender meat. Perfect for spicy party asun and pepper soup.',
    features: ['Live crated or dressed', 'Vet approved', 'Tender meat texture']
  },
  {
    id: 'prod-meat-rabbits',
    name: 'Flemish Giant Meat Rabbits (Pair)',
    category: 'livestock',
    categoryName: 'Live Farm Livestock',
    price: 22000,
    originalPrice: 25000,
    rating: 4.7,
    reviewsCount: 31,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: 'Pair (2 live rabbits)',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Heart-healthy, low-cholesterol white meat rabbits. Delivered live in secure ventilated crates for rearing or meat.',
    features: ['High protein white meat', 'Healthy breeding stock', 'Ventilated carrier']
  },

  // 4. FARM EGGS & POULTRY FEEDS (COMING SOON)
  {
    id: 'prod-crate-eggs-jumbo',
    name: 'Farm-Fresh Jumbo Table Eggs (Crate of 30)',
    category: 'eggs',
    categoryName: 'Farm Eggs & Feeds',
    price: 4200,
    originalPrice: 4600,
    rating: 4.9,
    reviewsCount: 180,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: 'Crate (30 eggs)',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'Harvested from healthy layer hens. Thick golden yolks, high calcium shells, and rich in natural vitamins.',
    features: ['Same-day collected', 'No cracked eggs guarantee', 'Coming in next harvest']
  },
  {
    id: 'prod-poultry-feed-finisher',
    name: 'SAJ Premium Broiler Finisher Pellet (25kg)',
    category: 'eggs',
    categoryName: 'Farm Eggs & Feeds',
    price: 16500,
    originalPrice: 18000,
    rating: 4.8,
    reviewsCount: 43,
    isAvailableNow: false, // COMING SOON
    isCustomizable: false,
    badge: 'Coming Soon',
    badgeColor: 'bg-blue-950 text-blue-400 border border-blue-800',
    unit: '25kg bag',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    shortDesc: 'High-energy organic poultry finisher pellets fortified with amino acids, calcium, and probiotics for rapid broiler weight gain.',
    features: ['20% Crude Protein', 'Optimal feed conversion ratio', 'Dust-free pellets']
  }
];

export const DELIVERY_ZONES = [
  {
    state: 'Lagos State',
    deliveryFee: 2500,
    estimatedTime: 'Same Day / Next Morning (2 - 4 hours from dispatch)',
    areas: [
      'Ikeja (GRA, Allen, Alausa, Opebi)',
      'Lekki (Phase 1, Agungi, Chevron, Ikate)',
      'Victoria Island & Ikoyi',
      'Surulere & Yaba',
      'Maryland & Gbagada',
      'Magodo & Ogudu',
      'Ajah & Sangotedo',
      'Ikorodu (Benson, Agric, Ogolonto)',
      'Agege & Ogba',
      'Festac & Amuwo Odofin'
    ]
  },
  {
    state: 'Ogun State',
    deliveryFee: 2200,
    estimatedTime: 'Same Day Delivery (Direct Farm Van)',
    areas: [
      'Abeokuta Central & Obantoko',
      'Sagamu & Remo Axis',
      'Mowe & Ibafo (Lagos-Ibadan Corridor)',
      'Sango-Ota & Toll Gate',
      'Ijebu-Ode'
    ]
  },
  {
    state: 'Ibadan (Oyo State)',
    deliveryFee: 2800,
    estimatedTime: 'Daily Scheduled Chilled Van (Morning & Midday)',
    areas: [
      'Bodija (Old & New Bodija)',
      'Ring Road & Challenge',
      'Oluyole Estate',
      'Jericho & Iyaganku GRA',
      'Akobo & General Gas',
      'UI & Samonda Axis',
      'Dugbe & Mokola'
    ]
  }
];
