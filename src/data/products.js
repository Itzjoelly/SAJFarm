export const WEIGHT_TIERS = [
  {
    id: 'tier-1',
    name: 'Standard Broiler',
    weightRange: '1.8kg – 2.0kg',
    minWeight: 1.8,
    maxWeight: 2.0,
    avgWeight: 1.9,
    basePrice: 6500,
    description: 'Perfect for small family meals, soups, and roasting. Young, tender, and succulent.',
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
    description: 'Our most popular size! High meat-to-bone ratio with firm, juicy breast meat.',
    popular: true,
    tag: 'Most Popular'
  },
  {
    id: 'tier-3',
    name: 'Large Family Broiler',
    weightRange: '2.5kg – 2.8kg',
    minWeight: 2.5,
    maxWeight: 2.8,
    avgWeight: 2.65,
    basePrice: 9200,
    description: 'Generous portion size ideal for Sunday stew, pepper soup, and family gatherings.',
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
    description: 'Massive, heavy broiler reared to peak maturity. Thick drumsticks and hearty breast cuts.',
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
    description: 'Bird is weighed, crated in sanitized ventilated boxes, and delivered active to your address.',
    icon: 'Feather',
    badge: 'No extra charge',
    requiresCutting: false
  },
  {
    id: 'dressed',
    name: 'Kill & Defeather (Whole Cleaned)',
    shortName: 'Dressed Whole',
    price: 500,
    description: 'Halal slaughtered, hot-water scalded, plucked spotless, singed, gutted, and rinsed with clean treated water.',
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
  { id: '12', label: '12 Medium Pieces', detail: 'Best for party cooking, jollof rice & pepper soup' },
  { id: '16', label: '16 Bite Pieces', detail: 'Small party bites, easy serving for kids' }
];

export const DELIVERY_ZONES = [
  {
    state: 'Lagos State',
    deliveryFee: 2500,
    estimatedTime: 'Same Day / Next Morning (2 - 4 hours from slaughter)',
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

export const UPCOMING_SERVICES = [
  {
    id: 'frozen-chicken',
    category: 'Frozen Meats',
    name: 'Blast-Frozen Whole Chicken & Cuts',
    description: 'Hygienically slaughtered, vacuum-sealed and blast-frozen at -18°C for extended freezer storage.',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80',
    status: 'Coming Soon',
    launchDate: 'Next Month'
  },
  {
    id: 'frozen-turkey',
    category: 'Frozen Meats',
    name: 'Prime Farm Turkey (Wings & Drumsticks)',
    description: 'Plump, meaty farm turkey portions with deep rich poultry flavor, thoroughly cleaned and blast-frozen.',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80',
    status: 'Coming Soon',
    launchDate: 'Coming Soon'
  },
  {
    id: 'pork-cuts',
    category: 'Frozen Meats',
    name: 'Fresh Farm Pork Chops & Ribs',
    description: 'Grain-fed, lean and tender pork ribs, belly strips, and chops, processed under strict hygiene conditions.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    status: 'Coming Soon',
    launchDate: 'Coming Soon'
  },
  {
    id: 'live-ram',
    category: 'Farm Livestock',
    name: 'Mature Balami & Uda Rams',
    description: 'Healthy, massive rams for celebrations, Ileya festivities, weddings, and family events. Direct farm weight.',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
    status: 'Pre-Order / Booking Open',
    launchDate: 'Available for Bookings'
  },
  {
    id: 'live-cow',
    category: 'Farm Livestock',
    name: 'Full Grown Cattle (White Fulani & Sokoto Gudali)',
    description: 'Premium organic grass-fed cows. Pre-inspected by veterinary officers with live weight guarantee.',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
    status: 'Pre-Order Open',
    launchDate: 'Available for Bookings'
  },
  {
    id: 'farm-goats',
    category: 'Farm Livestock',
    name: 'Healthy She-Goats & He-Goats (Boer & Sahel)',
    description: 'Meaty, disease-free goats for asun, pepper soup, parties, and breeding purposes.',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80',
    status: 'Coming Soon',
    launchDate: 'Coming Soon'
  },
  {
    id: 'meat-rabbits',
    category: 'Farm Livestock',
    name: 'Flemish Giant & New Zealand Meat Rabbits',
    description: 'Lean, heart-healthy white meat rabbits reared under strict bio-security controls.',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
    status: 'Coming Soon',
    launchDate: 'Coming Soon'
  },
  {
    id: 'piggery',
    category: 'Farm Livestock',
    name: 'Market Pigs & Growers (Large White)',
    description: 'Fast-growing, well-nourished healthy market pigs for meat processors and commercial butchers.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
    status: 'Coming Soon',
    launchDate: 'Coming Soon'
  }
];
