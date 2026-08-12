export const SITE = {
  name: "Sibert Residence",
  tagline: "La Digue · Seychelles",
  phone: "+248 423 4142",
  phoneHref: "tel:+2484234142",
  email: "sibertresidence@seychelles.net",
  address: "La Passe, La Digue, Seychelles",
  logoWhite:
    "https://sibert.sc/wp-content/uploads/2020/11/Sibert-logo-white-A3--scaled.png",
  logoMark:
    "https://sibert.sc/wp-content/uploads/2020/11/cropped-Sibert-logo-scaled-1-270x270.png",
  social: {
    facebook: "https://www.facebook.com/",
    twitter: "https://www.twitter.com/",
    vimeo: "https://www.vimeo.com/",
  },
};

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
  { label: "Contact", href: "/contact" },
];

export type Room = {
  slug: "superior" | "deluxe";
  name: string;
  tagline: string;
  description: string;
  bedding: string;
  highlights: string[];
  image: string;
};

export const ROOMS: Room[] = [
  {
    slug: "superior",
    name: "Superior Room",
    tagline: "Bright, breezy, and effortlessly comfortable.",
    description:
      "A sunlit retreat featuring a king size bed, coastal teal decor, and a private balcony with lush tropical views. Designed with cosy armchair seating and warm wooden finishes, it's the ideal space for couples or solo travellers to unwind after a day on the island.",
    bedding: "1 King Size Bed",
    highlights: ["Private balcony", "Plush seating area", "Airy tile flooring"],
    image:
      "https://sibert.sc/wp-content/uploads/2020/11/IMG-20250911-WA0090-363x363.jpg",
  },
  {
    slug: "deluxe",
    name: "Deluxe Room",
    tagline: "Expansive comfort with extra room to relax.",
    description:
      "Generously spaced to host couples or small families, the Deluxe Room features a main plush bed plus an extra single daybed. Comes fully appointed with a private ensuite bathroom, a full wooden wardrobe, and a dedicated vanity desk.",
    bedding: "1 King Bed + 1 Single Bed",
    highlights: ["Extra spacious layout", "Private ensuite bathroom", "Generous storage space"],
    image:
      "https://sibert.sc/wp-content/uploads/2020/11/IMG-20250911-WA0105-363x363.jpg",
  },
];

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

export const GALLERY_IMAGES = [
  "https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-b-8896.jpg",
  "https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-b-8899.jpg",
  "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0023-scaled.jpg",
  "https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-a-19.jpg",
  "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0165-scaled.jpg",
  "https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-c-8877.jpg",
];

export const MENU_HIGHLIGHTS = [
  { name: "Grilled Reef Fish", note: "Line-caught fish, lime and island herbs", price: "Market Price" },
  { name: "Coconut Fish Curry", note: "Slow-simmered in coconut milk and spice", price: "SCR 220" },
  { name: "Octopus Salad", note: "Chilled, tossed with lime and chilli", price: "SCR 190" },
  { name: "Seafood Stew", note: "Prawn, fish and calamari in Creole sauce", price: "SCR 240" },
  { name: "Tropical Rum Cocktail", note: "Local rum, passionfruit, lime", price: "SCR 130" },
  { name: "Fresh Fruit Platter", note: "Whatever's ripe on the island that day", price: "SCR 90" },
];

export const SHOP_CATEGORIES = [
  {
    name: "Woven & Hand-Made Crafts",
    description: "Palm-leaf weaving, baskets and coconut-shell pieces made by local artisans.",
    image: "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0084-scaled.jpg",
  },
  {
    name: "Island Keepsakes",
    description: "Postcards, carved wood pieces and small Creole artwork to remember La Digue by.",
    image: "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0074-1024x768.jpg",
  },
  {
    name: "Spices & Local Goods",
    description: "Vanilla, cinnamon and island spice blends, along with locally made preserves.",
    image: "https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-c-8877.jpg",
  },
];
