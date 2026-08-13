export const SITE = {
  name: "Sibert Residence",
  tagline: "La Digue · Seychelles",
  phone: "+248 423 4142",
  phoneHref: "tel:+2484234142",
  whatsapp: "+248 423 4142",
  whatsappHref: "https://wa.me/2484234142?text=Hi%20Sibert%20Residence%2C%20I%27d%20like%20to%20know%20more%20about%20a%20stay.",
  email: "sibertresidence@seychelles.net",
  address: "La Passe, La Digue, Seychelles",
  logoWhite:
    "https://sibert.sc/wp-content/uploads/2020/11/Sibert-logo-white-A3--scaled.png",
  logoMark:
    "https://sibert.sc/wp-content/uploads/2020/11/cropped-Sibert-logo-scaled-1-270x270.png",
  social: {
    facebook: "https://www.facebook.com/share/1KKimtbTF",
    instagram: "https://www.instagram.com/sibertresidence/",
  },
};

export type SiteInfo = typeof SITE;

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Restaurant & Bar", href: "/restaurant" },
  { label: "Souvenir Shop", href: "/shop" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Boat Excursion", href: "/services#boat" },
      { label: "Buggy Island Tour", href: "/services#buggy" },
      { label: "Bicycle Rental", href: "/services#bike" },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/* ============================================================
   Exterior / homepage imagery
   ============================================================ */
export const EXTERIOR_IMAGES = {
  hero: "/images/exterior/building-2.jpg",
  about: "/images/exterior/building-1.jpg",
};

export type ExteriorImages = typeof EXTERIOR_IMAGES;

/* ============================================================
   Rooms + 2026/2027 rate card
   (source: Sibert Residence 2026-2027 Rates, valid 01 Nov 2026 – 31 Oct 2027)
   ============================================================ */
export type Room = {
  slug: "superior" | "deluxe";
  name: string;
  tagline: string;
  description: string;
  bedding: string;
  occupancy: string;
  highlights: string[];
  image: string;
  priceFrom: number;
};

export const ROOMS: Room[] = [
  {
    slug: "superior",
    name: "Superior Room",
    tagline: "Bright, breezy, and effortlessly comfortable.",
    description:
      "A sunlit retreat featuring a king size bed, coastal teal decor, and a private balcony with lush tropical views. Designed with cosy armchair seating and warm wooden finishes, it's the ideal space for couples or solo travellers to unwind after a day on the island.",
    bedding: "1 King Size Bed",
    occupancy: "Max 2 Adults",
    highlights: ["Private balcony", "Plush seating area", "Airy tile flooring"],
    image: "/images/rooms/superior.png",
    priceFrom: 186,
  },
  {
    slug: "deluxe",
    name: "Deluxe Room",
    tagline: "Expansive comfort with extra room to relax.",
    description:
      "Generously spaced to host couples or small families, the Deluxe Room features a main plush bed plus an extra single daybed. Comes fully appointed with a private ensuite bathroom, a full wooden wardrobe, and a dedicated vanity desk.",
    bedding: "1 King Bed + 1 Single Bed",
    occupancy: "Max 2 Adults + 1 Child (6–11 yrs)",
    highlights: ["Extra spacious layout", "Private ensuite bathroom", "Generous storage space"],
    image: "/images/rooms/deluxe.png",
    priceFrom: 201,
  },
];

export const PRICING = {
  currency: "€",
  validity: "1 November 2026 – 31 October 2027",
  note: "Rates are per room, per night, inclusive of breakfast, taxes and service charge — based on 2 adults sharing.",
  seasons: [
    {
      name: "Low Season",
      dates: "1–30 Sep 2026 · 1–20 Dec 2026 · 1 May – 30 Jun 2027",
    },
    {
      name: "High Season",
      dates:
        "1 Jul – 31 Aug 2026 · 1 Oct – 30 Nov 2026 · 10 Jan – 20 Mar 2027 · 5–30 Apr 2027 · 1 Jul – 31 Aug 2027 · 1–31 Oct 2027",
    },
    {
      name: "Peak Season",
      dates: "21 Dec 2026 – 9 Jan 2027 · 21 Mar – 4 Apr 2027",
    },
  ],
  rates: [
    { room: "Superior Room", low: 186, high: 205, peak: 240 },
    { room: "Deluxe Room", low: 201, high: 220, peak: 255 },
  ],
  extras: [
    "Half Board Supplement: €30 / night per adult, €15 / night per child (6–11 yrs)",
    "Extra Bed Supplement: €50 / night (child 6–11 yrs only)",
    "Early Bird Offer: 10% off in Low Season or 5% off in High Season — book 60+ days ahead, B&B basis, minimum 3-night stay",
    "Long Stay Offer: 15% off for stays of 7+ nights — High Season only, B&B basis",
    "Honeymooners receive a bottle of sparkling wine and a fruit platter (valid 6 months from wedding date)",
  ],
  occupancy:
    "Superior Room: max 2 adults. Deluxe Room: max 2 adults + 1 child (6–11 yrs). Children under 6 stay free.",
  prepayment: [
    "Low & High Seasons: 50% deposit due 7 days prior to arrival — remaining 50% balance due on check-in.",
    "Peak Season: 100% deposit due 21 days prior to arrival.",
  ],
  cancellation: [
    "High & Low Seasons: free cancellation 8+ days before arrival · 0–7 days: 50% charge · no-show/early departure: 100% charge",
    "Peak Season: free cancellation 22+ days before arrival · 0–21 days: 100% charge · no-show/early departure: 100% charge",
  ],
};

export type Pricing = typeof PRICING;

/* ============================================================
   FAQ — check-in/out, opening hours, policies
   ============================================================ */
export const FAQ = {
  checkIn: "14:00hrs",
  checkOut: "12:00hrs",
  checkInOutNote:
    "Early check-in and late check-out can be guaranteed upon request, subject to availability. Contact the hotel reservations team for details.",
  restaurantHours: [
    { label: "Breakfast", time: "07:00hrs – 10:00hrs" },
    { label: "Lunch / Dinner", time: "11:00hrs – 21:00hrs (last order)" },
  ],
  items: [
    {
      question: "What time is check-in and check-out?",
      answer:
        "Check-in is from 14:00hrs and check-out is by 12:00hrs. Early check-in and late check-out can be guaranteed upon request, subject to availability — contact the hotel reservations team for details.",
    },
    {
      question: "What are the restaurant's opening hours?",
      answer: "Breakfast: 07:00hrs – 10:00hrs. Lunch & Dinner: 11:00hrs – 21:00hrs (last order).",
    },
    {
      question: "How much deposit do I need to pay to book?",
      answer:
        "For Low and High Season stays, a 50% deposit is due 7 days before arrival, with the remaining 50% balance paid on check-in. For Peak Season stays, a 100% deposit is due 21 days before arrival.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "In High and Low Seasons, cancellations are free 8 or more days before arrival; 0–7 days before arrival incurs a 50% charge, and no-shows or early departures are charged in full. In Peak Season, cancellations are free 22 or more days before arrival; inside that window, or for no-shows and early departures, the full amount is charged.",
    },
    {
      question: "Do you offer half board?",
      answer: "Yes — a Half Board Supplement of €30 per night per adult and €15 per night per child (6–11 yrs) can be added to a B&B booking.",
    },
    {
      question: "Is there a discount for early bookings or long stays?",
      answer:
        "Yes — book 60 or more days ahead on a B&B basis (minimum 3 nights) for 10% off in Low Season or 5% off in High Season. Stays of 7 or more nights in High Season get 15% off on a B&B basis.",
    },
  ],
};

export type Faq = typeof FAQ;

/* ============================================================
   Services
   ============================================================ */
export type ServiceItem = {
  id: "boat" | "buggy" | "bike";
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "boat",
    name: "Boat Excursion",
    tagline: "Sail, snorkel and explore the coastline",
    description:
      "Head out onto the Indian Ocean in comfort and style — sailing past granite headlands, stopping to snorkel over reef and coral, and taking in La Digue's coastline from the water. A relaxed way to see the neighbouring islands and hidden coves that are hard to reach on foot.",
    highlights: ["Half-day & full-day options", "Snorkelling gear included", "Small group or private charter"],
    image:
      "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0023-scaled.jpg",
  },
  {
    id: "buggy",
    name: "Buggy Island Tour",
    tagline: "Explore La Digue in style",
    description:
      "An exciting buggy ride through scenic trails, past white-sand beaches and hidden island gems, for an unforgettable adventure. A great option for anyone who wants to see more of the island without pedalling every mile themselves.",
    highlights: ["Guided island route", "Stops at key viewpoints", "Great for groups & families"],
    image: "https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-a-19.jpg",
  },
  {
    id: "bike",
    name: "Bicycle Rental",
    tagline: "Two wheels, island pace",
    description:
      "La Digue is famously best explored by bike. Rent one directly from Sibert Residence and enjoy an eco-friendly ride to beaches, Creole villages, and coastal viewpoints — at your own pace, with no engine noise to interrupt the island quiet.",
    highlights: ["Daily & multi-day rental", "Well-maintained bikes", "Free route suggestions"],
    image: "https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-c-8877.jpg",
  },
];

/* ============================================================
   Homepage gallery
   ============================================================ */
export const GALLERY_IMAGES = [
  "/images/exterior/building-1.jpg",
  "/images/restaurant/cocktail-bar-terrace.jpg",
  "/images/restaurant/dining-terrace.jpg",
  "/images/shop/shop-crafts-2.jpg",
  "/images/restaurant/entrance-barrels-2.jpg",
  "/images/restaurant/bar-counter.jpg",
];

/* ============================================================
   Restaurant & Bar — real photos with short captions
   ============================================================ */
export type RestaurantPhoto = {
  title: string;
  description: string;
  image: string;
};

export const RESTAURANT_PHOTOS: RestaurantPhoto[] = [
  {
    title: "The Dining Terrace",
    description:
      "An open-air, thatched-roof terrace with a sea breeze running through it — the natural spot for a long, unhurried dinner.",
    image: "/images/restaurant/dining-terrace.jpg",
  },
  {
    title: "Ocean-Mural Dining Room",
    description:
      "A hand-painted sunset mural wraps the ceiling of the indoor dining room, giving every table an island backdrop, rain or shine.",
    image: "/images/restaurant/dining-mural.jpg",
  },
  {
    title: "The Bar",
    description:
      "A granite-top bar stocked with Seychellois rum, Takamaka spirits and the makings of a proper tropical cocktail.",
    image: "/images/restaurant/bar-counter.jpg",
  },
  {
    title: "Behind the Bar",
    description:
      "Local liqueurs and spirits lined up and ready — Tia Maria, Takamaka rum, Grand Marnier and more for the evening's cocktail list.",
    image: "/images/restaurant/bar-bottles.jpg",
  },
  {
    title: "Cocktail Bar Nook",
    description:
      "Tucked among the palms, our casual grill and juice bar serves fresh fruit juices, smoothies and cocktails through the day.",
    image: "/images/restaurant/cocktail-bar-terrace.jpg",
  },
  {
    title: "Welcome In",
    description:
      "Rum barrels dressed with fresh coconuts and hibiscus mark the entrance — a small taste of what's inside.",
    image: "/images/restaurant/entrance-barrels-1.jpg",
  },
];

/* ============================================================
   Souvenir Shop — Moonlight Craft Curios
   ============================================================ */
export const SHOP_CATEGORIES = [
  {
    name: "Woven & Hand-Made Crafts",
    description: "Palm-leaf weaving, baskets and coconut-shell pieces made by local artisans.",
    image: "/images/shop/shop-crafts-1.jpg",
  },
  {
    name: "Island Keepsakes",
    description: "Carved wood pieces, shell displays and small Creole artwork to remember La Digue by.",
    image: "/images/shop/shop-crafts-2.jpg",
  },
  {
    name: "Jewellery & Accessories",
    description: "Shell and bead jewellery, sun hats and bracelets handmade by local craftspeople.",
    image: "/images/shop/shop-crafts-3.jpg",
  },
];

export type ShopCategory = (typeof SHOP_CATEGORIES)[number];

/* ============================================================
   Availability — dates blocked per room, managed from the admin
   calendar. Empty by default (everything open) until an admin
   marks dates as unavailable.
   ============================================================ */
export const AVAILABILITY: { blockedDates: Record<string, string[]> } = {
  blockedDates: {
    superior: [],
    deluxe: [],
  },
};

export type Availability = typeof AVAILABILITY;
