export interface SellerProfile {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  bio: string;
  location: string;
  distance: number; // in miles
  rating: number;
  reviewsCount: number;
  avatar: string;
  banner: string;
  establishedYear: number;
  isVerified: boolean;
  specialties: string[];
  productSlugs: string[];
}

export const MOCK_SELLERS: SellerProfile[] = [
  // ==================== MULTI-PRODUCT SELLERS ====================
  {
    id: "seller-1",
    name: "Ferme Maraîchère St-Laurent",
    slug: "ferme-maraichere-st-laurent",
    tagline: "Certified Organic Heirloom Vegetables & Field Crops",
    bio: "Family-owned regenerative farm located along the fertile Saint-Laurent river basin. We cultivate over 30 varieties of heritage produce, harvested at first dawn and delivered directly to local food lovers.",
    location: "Saint-Hyacinthe, QC",
    distance: 2.4,
    rating: 4.9,
    reviewsCount: 84,
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 1984,
    isVerified: true,
    specialties: ["Heirloom Tomatoes", "Sweet Corn", "Root Vegetables", "Leafy Greens"],
    productSlugs: [
      "organic-heirloom-tomatoes",
      "sweet-rainbow-baby-carrots",
      "crisp-farmhouse-romaine",
      "sweet-bi-color-corn",
      "crisp-cauliflower",
      "rainbow-sweet-bell-peppers",
      "yellow-red-creamer-potatoes",
      "fresh-sweet-leeks",
    ],
  },
  {
    id: "seller-2",
    name: "Vergers de Rougemont",
    slug: "vergers-de-rougemont",
    tagline: "Highland Fruit Orchards & Sun-Ripened Berries",
    bio: "Perched on the sunny mountain slopes of Rougemont, our fourth-generation fruit orchards produce Quebec's finest crisp eating apples, stone fruits, and seasonal summer berries.",
    location: "Rougemont, QC",
    distance: 5.1,
    rating: 4.9,
    reviewsCount: 112,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 1952,
    isVerified: true,
    specialties: ["Quebec Apples", "Field Strawberries", "Stone Fruits", "Wild Berries"],
    productSlugs: [
      "crisp-red-apples",
      "sun-ripened-farm-strawberries",
      "plump-mountain-blueberries",
      "juicy-yellow-freestone-peaches",
      "sweet-seedless-watermelon",
      "bartlett-pears",
    ],
  },
  {
    id: "seller-3",
    name: "Boucherie du Terroir des Cantons",
    slug: "boucherie-du-terroir-des-cantons",
    tagline: "100% Grass-Fed Beef, Pasture Pork & Free-Range Poultry",
    bio: "Passionate artisanal butchery working exclusively with local livestock farms practicing rotational pasture grazing. Never given growth hormones, synthetic feeds, or preventative antibiotics.",
    location: "Bromont, QC",
    distance: 7.8,
    rating: 5.0,
    reviewsCount: 96,
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 2004,
    isVerified: true,
    specialties: ["Dry-Aged Ribeye", "Ground Beef", "Applewood Bacon", "Heritage Pork"],
    productSlugs: [
      "grass-fed-ground-beef",
      "pasture-raised-chicken-breast",
      "applewood-smoked-bacon",
      "grass-fed-ribeye-steak",
      "pork-loin-chops",
      "grass-fed-beef-stew-cubes",
    ],
  },
  {
    id: "seller-4",
    name: "Laiterie & Fromagerie Belle-Vallée",
    slug: "laiterie-fromagerie-belle-vallee",
    tagline: "Pasture Dairy, Fresh Curds & Cave-Aged Farmstead Cheeses",
    bio: "Our Jersey herd grazes green clover pastures to produce rich, creamy whole milk. From our famous squeaky fresh curds to cave-aged raw milk wheels, everything is made on the farm.",
    location: "Saint-Jean-sur-Richelieu, QC",
    distance: 4.2,
    rating: 4.8,
    reviewsCount: 73,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 1991,
    isVerified: true,
    specialties: ["Fresh Curd Cheese", "Pasture Eggs", "Raw-Milk Cheddar", "Farm Churned Butter"],
    productSlugs: [
      "farm-fresh-eggs",
      "fresh-cheese-curds",
      "grass-fed-whole-milk",
      "aged-raw-milk-sharp-cheddar",
      "cultured-sea-salt-farm-butter",
    ],
  },

  // ==================== SINGLE-PRODUCT / BOUTIQUE SPECIALTY SELLERS ====================
  {
    id: "seller-5",
    name: "Érablière & Rucher du Mont-Royal",
    slug: "erabliere-rucher-du-mont-royal",
    tagline: "100% Pure Quebec Amber Maple Syrup",
    bio: "Historic sugar shack harvesting pure sugar maple sap each spring. Boiled slowly over natural wood fire in our small-batch evaporator for unmatched caramel depths.",
    location: "Mont-Saint-Hilaire, QC",
    distance: 6.3,
    rating: 5.0,
    reviewsCount: 135,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 1968,
    isVerified: true,
    specialties: ["Pure Maple Syrup", "Wood-Fired Boil", "Grade A Amber"],
    productSlugs: ["pure-quebec-amber-maple-syrup"],
  },
  {
    id: "seller-6",
    name: "Apiculture Sauvageon",
    slug: "apiculture-sauvageon",
    tagline: "Pure Raw Wild Cut Honeycomb",
    bio: "Dedicated solely to natural, chemical-free bee stewardship. We offer raw, uncut honeycomb squares just as the worker bees built them in the hive.",
    location: "Frelighsburg, QC",
    distance: 8.9,
    rating: 5.0,
    reviewsCount: 52,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 2011,
    isVerified: true,
    specialties: ["Edible Honeycomb", "Raw Apiary", "Treatment-Free"],
    productSlugs: ["pure-raw-cut-honeycomb"],
  },
  {
    id: "seller-7",
    name: "Champs Floraux de l'Estrie",
    slug: "champs-floraux-de-lestrie",
    tagline: "Mammoth Sunflowers & Fresh Field Blooms",
    bio: "A multi-acre flower farm cultivating vibrant cut flowers for kitchen tables. Cut fresh every morning at dawn with water buckets waiting in the field.",
    location: "Magog, QC",
    distance: 9.4,
    rating: 4.9,
    reviewsCount: 46,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 2017,
    isVerified: true,
    specialties: ["Sunflowers", "Fresh Bouquets", "Pollinator Sanctuaries"],
    productSlugs: ["fresh-sunflower-bouquet", "wild-seasonal-garden-mix"],
  },
  {
    id: "seller-8",
    name: "La Chèvrerie Alpine",
    slug: "la-chevrerie-alpine",
    tagline: "Single-Herd Artisan Goat Milk Chevre",
    bio: "Small herd of 24 Alpine goats grazing wild thyme and meadow grass on mountain pastures. Hand-ladled small-batch goat chevre rolled in fleur de sel.",
    location: "Sutton, QC",
    distance: 10.2,
    rating: 4.9,
    reviewsCount: 63,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&auto=format&fit=crop&q=80",
    establishedYear: 2015,
    isVerified: true,
    specialties: ["Farmstead Chevre", "Alpine Herd", "Raw Pasture Milk"],
    productSlugs: ["artisan-goat-cheese"],
  },
];

export function getSellerBySlug(slug: string): SellerProfile | undefined {
  const clean = slug.toLowerCase();
  return MOCK_SELLERS.find(
    (s) => s.slug.toLowerCase() === clean || s.id.toLowerCase() === clean
  );
}

export function getSellerById(id: string): SellerProfile | undefined {
  return MOCK_SELLERS.find((s) => s.id === id);
}

export function getSellerForProductSlug(productSlug: string): SellerProfile | undefined {
  const clean = productSlug.toLowerCase();
  return MOCK_SELLERS.find((s) =>
    s.productSlugs.some((ps) => ps.toLowerCase() === clean)
  );
}
