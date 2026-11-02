/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/app/api/product/dto/create-product.dto";

export interface EnhancedProduct extends Product {
  farmName?: string;
  distance?: number; // miles
  rating?: number;
  reviewsCount?: number;
  pickupAvailable?: boolean;
  deliveryAvailable?: boolean;
  harvestDate?: string;
  tags?: string[];
  unit?: string;
  is_available?: boolean;
}

export const MOCK_PRODUCTS: EnhancedProduct[] = [
  // ===================== VEGETABLES =====================
  {
    id: String(101),
    name: "Organic Heirloom Tomatoes",
    slug: "organic-heirloom-tomatoes",
    category: "Vegetables",
    price: 4.99,
    quantity: 65,
    unit: "lb",
    description: "Juicy, colorful vine-ripened organic heirloom tomatoes grown in living soil without synthetic pesticides. Rich, complex flavor perfect for caprese salads or fresh sandwiches.",
    image: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546470427-0d4db154ceb7?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Green Valley Organics",
    distance: 2.3,
    rating: 4.9,
    reviewsCount: 38,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Yesterday",
    tags: ["Organic", "Heirloom", "Non-GMO"],
    is_available: true,
  },
  {
    id: String(102),
    name: "Sweet Rainbow Baby Carrots",
    slug: "sweet-rainbow-baby-carrots",
    category: "Vegetables",
    price: 3.49,
    quantity: 80,
    unit: "bunch",
    description: "Crisp, naturally sweet bunch of purple, yellow, and orange baby carrots freshly pulled with tops intact. Packed with beta-carotene and crunch.",
    image: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Sunny Ridge Farmstead",
    distance: 4.1,
    rating: 4.8,
    reviewsCount: 29,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Today",
    tags: ["Organic", "Crisp", "Sweet"],
    is_available: true,
  },
  {
    id: String(103),
    name: "Crisp Farmhouse Romaine",
    slug: "crisp-farmhouse-romaine",
    category: "Vegetables",
    price: 2.99,
    quantity: 45,
    unit: "head",
    description: "Tightly packed, ultra-crispy romaine lettuce heads grown hydro-organically in natural spring water. Washed, prepped, and ready for your artisan caesar salad.",
    image: [
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Spring Brook Hydroponics",
    distance: 3.5,
    rating: 4.7,
    reviewsCount: 19,
    pickupAvailable: true,
    deliveryAvailable: false,
    harvestDate: "This Morning",
    tags: ["Hydroponic", "Pesticide-Free", "Zero-Residue"],
    is_available: true,
  },
  {
    id: String(104),
    name: "Sweet Bi-Color Corn",
    slug: "sweet-bi-color-corn",
    category: "Vegetables",
    price: 0.85,
    quantity: 120,
    unit: "ear",
    description: "Tender, super-sweet yellow and white corn on the cob. Picked at dawn for peak sugar content. Sublime boiled, grilled, or roasted over hot coals.",
    image: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Oak Creek Acres",
    distance: 6.8,
    rating: 4.9,
    reviewsCount: 44,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Dawn Today",
    tags: ["Sweet", "Non-GMO", "Field-Fresh"],
    is_available: true,
  },
  {
    id: String(105),
    name: "Tuscan Lacinato Kale",
    slug: "tuscan-lacinato-kale",
    category: "Vegetables",
    price: 3.25,
    quantity: 50,
    unit: "bunch",
    description: "Deep blue-green dinosaur kale leaves packed with nutrients, iron, and deep earthy flavor. Perfect for sautéing with garlic and olive oil or massaged raw salads.",
    image: [
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6fa57?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Green Valley Organics",
    distance: 2.3,
    rating: 4.6,
    reviewsCount: 15,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Yesterday",
    tags: ["Superfood", "Organic", "Rich in Iron"],
    is_available: true,
  },
  {
    id: String(106),
    name: "Fresh Purple Eggplant",
    slug: "fresh-purple-eggplant",
    category: "Vegetables",
    price: 3.89,
    quantity: 35,
    unit: "lb",
    description: "Glossy, deep purple Italian eggplants with velvety, tender flesh and minimal seeds. Heavenly grilled with herbs or baked in traditional ratatouille.",
    image: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Sunny Ridge Farmstead",
    distance: 4.1,
    rating: 4.8,
    reviewsCount: 22,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "2 days ago",
    tags: ["Heirloom", "Tender"],
    is_available: true,
  },

  // ===================== FRUITS =====================
  {
    id: String(201),
    name: "Crisp Red Honeycrisp Apples",
    slug: "crisp-red-apples",
    category: "Fruits",
    price: 3.49,
    quantity: 95,
    unit: "lb",
    description: "Explosively crisp, perfectly balanced sweet-tart Honeycrisp apples harvested straight from century-old mountain orchards. Ideal for snacking and fresh baking.",
    image: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Blue Ridge Orchards",
    distance: 5.4,
    rating: 4.9,
    reviewsCount: 52,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "3 days ago",
    tags: ["Orchard Picked", "Honeycrisp", "Juicy"],
    is_available: true,
  },
  {
    id: String(202),
    name: "Sun-Ripened Farm Strawberries",
    slug: "sun-ripened-farm-strawberries",
    category: "Fruits",
    price: 5.99,
    quantity: 70,
    unit: "pint",
    description: "Intensely sweet, fragrant red strawberries picked at peak ripeness right under the morning sun. A world apart from grocery store varieties.",
    image: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Berry Hill Heritage Farm",
    distance: 3.2,
    rating: 5.0,
    reviewsCount: 67,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "This Morning",
    tags: ["Sweet", "Sun-Ripened", "Fragrant"],
    is_available: true,
  },
  {
    id: String(203),
    name: "Plump Mountain Blueberries",
    slug: "plump-mountain-blueberries",
    category: "Fruits",
    price: 6.49,
    quantity: 55,
    unit: "half-pint",
    description: "Dark, powdery-blue wild blueberries packed with antioxidants and rich berry flavor. Hand-gathered in sustainable mountain bush plots.",
    image: [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Blue Ridge Orchards",
    distance: 5.4,
    rating: 4.9,
    reviewsCount: 31,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Yesterday",
    tags: ["Antioxidant-Rich", "Wild", "Hand-Picked"],
    is_available: true,
  },
  {
    id: String(204),
    name: "Juicy Yellow Freestone Peaches",
    slug: "juicy-yellow-freestone-peaches",
    category: "Fruits",
    price: 4.29,
    quantity: 60,
    unit: "lb",
    description: "Velvety yellow peaches that drip with sweet golden juice when bitten into. The pit pulls away cleanly, making them effortless to slice and savor.",
    image: [
      "https://images.unsplash.com/photo-1595759852703-9041a67459d4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1629828874514-c1e5103f2150?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Sunny Ridge Farmstead",
    distance: 4.1,
    rating: 4.8,
    reviewsCount: 26,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "2 days ago",
    tags: ["Tree-Ripened", "Freestone", "Juicy"],
    is_available: true,
  },
  {
    id: String(205),
    name: "Organic Meyer Lemons",
    slug: "organic-meyer-lemons",
    category: "Fruits",
    price: 4.99,
    quantity: 40,
    unit: "lb",
    description: "Thin-skinned hybrid lemons with sweet, floral citrus aroma and lower acidity than Eureka lemons. Cherished by chefs for marinades and baking.",
    image: [
      "https://images.unsplash.com/photo-1587496679742-bad502958fbe?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Citrus Grove Sanctuary",
    distance: 7.2,
    rating: 4.7,
    reviewsCount: 18,
    pickupAvailable: false,
    deliveryAvailable: true,
    harvestDate: "3 days ago",
    tags: ["Aromatic", "Meyer", "Organic"],
    is_available: true,
  },

  // ===================== DAIRY =====================
  {
    id: String(301),
    name: "Artisan Goat Cheese Chevre",
    slug: "artisan-goat-cheese",
    category: "Dairy",
    price: 7.99,
    quantity: 30,
    unit: "log",
    description: "Creamy, mild, small-batch farmstead chevre made from 100% pasture-raised goat milk. Rolled in sea salt and crushed Provence herbs.",
    image: [
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Willow Creek Goat Farm",
    distance: 4.7,
    rating: 4.9,
    reviewsCount: 41,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "3 days aged",
    tags: ["Pasture-Raised", "Artisan", "Handmade"],
    is_available: true,
  },
  {
    id: String(302),
    name: "Pasture-Raised Brown Eggs",
    slug: "farm-fresh-eggs",
    category: "Dairy",
    price: 5.99,
    quantity: 65,
    unit: "dozen",
    description: "Vibrant golden yolks with rich flavor from heirloom hens roaming free on clover pasture. Collected and inspected by hand daily.",
    image: [
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Clover Meadow Hen Sanctuary",
    distance: 2.9,
    rating: 5.0,
    reviewsCount: 78,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Gathered Today",
    tags: ["Pasture-Raised", "Golden Yolks", "Free-Range"],
    is_available: true,
  },
  {
    id: String(303),
    name: "Grass-Fed Whole Milk (Glass Bottle)",
    slug: "grass-fed-whole-milk",
    category: "Dairy",
    price: 6.25,
    quantity: 40,
    unit: "half-gallon",
    description: "Non-homogenized creamline whole milk from A2 Jersey cows feeding exclusively on mountain pasture grasses. Cream rises naturally to the top.",
    image: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Green Meadow Dairy",
    distance: 6.1,
    rating: 4.9,
    reviewsCount: 36,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Bottled Today",
    tags: ["Grass-Fed", "A2 Protein", "Cream-Top"],
    is_available: true,
  },
  {
    id: String(304),
    name: "Aged Raw-Milk Sharp Cheddar",
    slug: "aged-raw-milk-sharp-cheddar",
    category: "Dairy",
    price: 8.99,
    quantity: 25,
    unit: "wedge (8 oz)",
    description: "Cave-aged for 18 months, developing crunchy calcium lactate crystals and an unforgettable savory, crumbly sharpness.",
    image: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Green Meadow Dairy",
    distance: 6.1,
    rating: 4.9,
    reviewsCount: 28,
    pickupAvailable: true,
    deliveryAvailable: false,
    harvestDate: "18 Mo. Aged",
    tags: ["Cave-Aged", "Award-Winning", "Sharp"],
    is_available: true,
  },
  {
    id: String(305),
    name: "Cultured Sea Salt Farm Butter",
    slug: "cultured-sea-salt-farm-butter",
    category: "Dairy",
    price: 5.75,
    quantity: 35,
    unit: "block (8 oz)",
    description: "Slow-churned European-style cultured butter with 84% butterfat, kneaded by hand with flakes of Celtic sea salt for deep hazelnut richness.",
    image: [
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Willow Creek Goat Farm",
    distance: 4.7,
    rating: 4.8,
    reviewsCount: 24,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Churned Yesterday",
    tags: ["84% Butterfat", "Cultured", "Artisan"],
    is_available: true,
  },

  // ===================== MEAT =====================
  {
    id: String(401),
    name: "100% Grass-Fed Ground Beef (85/15)",
    slug: "grass-fed-ground-beef",
    category: "Meat",
    price: 8.99,
    quantity: 50,
    unit: "1 lb pack",
    description: "Regeneratively raised on open prairie pastures with zero antibiotics, hormones, or grain feed. Deep beefy flavor with ideal lean-to-fat balance.",
    image: [
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Prairie Wind Cattle Co.",
    distance: 8.4,
    rating: 4.9,
    reviewsCount: 47,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Flash Frozen",
    tags: ["100% Grass-Fed", "Regenerative", "No Antibiotics"],
    is_available: true,
  },
  {
    id: String(402),
    name: "Pasture-Raised Boneless Chicken Breast",
    slug: "pasture-raised-chicken-breast",
    category: "Meat",
    price: 9.49,
    quantity: 40,
    unit: "pack (~1.2 lb)",
    description: "Air-chilled, tender chicken breasts from birds raised in mobile prairie coops moved daily to fresh forage. Juicy, clean, and nutritious.",
    image: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Clover Meadow Hen Sanctuary",
    distance: 2.9,
    rating: 4.8,
    reviewsCount: 33,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Fresh Chilled",
    tags: ["Pasture-Raised", "Air-Chilled", "Non-GMO Feed"],
    is_available: true,
  },
  {
    id: String(403),
    name: "Thick-Cut Applewood Smoked Bacon",
    slug: "applewood-smoked-bacon",
    category: "Meat",
    price: 10.99,
    quantity: 35,
    unit: "1 lb pack",
    description: "Heritage Berkshire pork belly cured with brown sugar, sea salt, and smoked slowly for 14 hours over real applewood embers. Melts in your mouth.",
    image: [
      "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Heritage Oak Pastures",
    distance: 7.6,
    rating: 5.0,
    reviewsCount: 61,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Smoked Fresh",
    tags: ["Berkshire Heritage", "Wood Smoked", "Nitrate-Free"],
    is_available: true,
  },
  {
    id: String(404),
    name: "Grass-Fed Bone-In Ribeye Steak",
    slug: "grass-fed-ribeye-steak",
    category: "Meat",
    price: 18.5,
    quantity: 20,
    unit: "steak (~14 oz)",
    description: "Prime-grade marbling, dry-aged for 21 days for tender texture and rich, nutty umami. The crown jewel of your home cast-iron skillet.",
    image: [
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Prairie Wind Cattle Co.",
    distance: 8.4,
    rating: 4.9,
    reviewsCount: 39,
    pickupAvailable: true,
    deliveryAvailable: false,
    harvestDate: "21 Day Dry-Aged",
    tags: ["Dry-Aged", "Ribeye", "Gourmet Cut"],
    is_available: true,
  },

  // ===================== HONEY =====================
  {
    id: String(501),
    name: "Raw Wildflower Honey",
    slug: "raw-wildflower-honey",
    category: "Honey",
    price: 11.5,
    quantity: 45,
    unit: "16 oz jar",
    description: "Unfiltered, unheated raw golden honey loaded with natural pollens, enzymes, and the nectar of over 50 regional wildflowers. Never processed.",
    image: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Honeybee Hollow Apiaries",
    distance: 3.8,
    rating: 4.9,
    reviewsCount: 56,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Autumn Harvest",
    tags: ["Raw", "Unpasteurized", "Wildflower"],
    is_available: true,
  },
  {
    id: String(502),
    name: "Pure Raw Cut Honeycomb",
    slug: "pure-raw-cut-honeycomb",
    category: "Honey",
    price: 14.99,
    quantity: 25,
    unit: "12 oz square",
    description: "Hexagonal comb straight from the hive, dripping with sweet wildflower honey. Completely edible pure beeswax comb pairs exquisitely with cheeses and charcuterie.",
    image: [
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Honeybee Hollow Apiaries",
    distance: 3.8,
    rating: 5.0,
    reviewsCount: 42,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Fresh Hive Cut",
    tags: ["Edible Comb", "Pure Honey", "Showstopper"],
    is_available: true,
  },
  {
    id: String(503),
    name: "Infused French Lavender Honey",
    slug: "infused-lavender-honey",
    category: "Honey",
    price: 13.25,
    quantity: 30,
    unit: "12 oz jar",
    description: "Light clover honey slow-steeped with culinary organic lavender blossoms. Heavenly stirred into hot tea, drizzled over yogurt, or baked in scones.",
    image: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Lavender Hills Estate",
    distance: 5.9,
    rating: 4.8,
    reviewsCount: 27,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Seasonal Blend",
    tags: ["Infused", "Lavender", "Floral"],
    is_available: true,
  },

  // ===================== FLOWERS =====================
  {
    id: String(601),
    name: "Fresh Radiant Sunflower Bouquet",
    slug: "fresh-sunflower-bouquet",
    category: "Flowers",
    price: 9.0,
    quantity: 30,
    unit: "bouquet (5 stems)",
    description: "Cheerful, golden-faced mammoth sunflowers freshly cut from open summer fields. Long vase life and guaranteed to bring sunshine indoors.",
    image: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Meadowland Flower Fields",
    distance: 4.5,
    rating: 4.8,
    reviewsCount: 35,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Cut This Morning",
    tags: ["Fresh Cut", "Long-Lasting", "Pollinator-Friendly"],
    is_available: true,
  },
  {
    id: String(602),
    name: "Dried English Lavender Bundle",
    slug: "dried-english-lavender-bundle",
    category: "Flowers",
    price: 7.5,
    quantity: 45,
    unit: "bundle",
    description: "Aromatic deep purple English lavender stems harvested at peak bloom and naturally air-dried in darkened barns to preserve their soothing fragrance.",
    image: [
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Lavender Hills Estate",
    distance: 5.9,
    rating: 4.9,
    reviewsCount: 29,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Air-Dried",
    tags: ["Aromatic", "Dried Floral", "Calming"],
    is_available: true,
  },
  {
    id: String(603),
    name: "Wild Seasonal Country Garden Mix",
    slug: "wild-seasonal-garden-mix",
    category: "Flowers",
    price: 15.0,
    quantity: 20,
    unit: "large bouquet",
    description: "Hand-tied designer bouquet composed of zinnias, cosmos, snapdragons, eucalyptus, and wild grasses gathered fresh daily by our florists.",
    image: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80",
    ],
    farmName: "Meadowland Flower Fields",
    distance: 4.5,
    rating: 5.0,
    reviewsCount: 41,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Arranged Today",
    tags: ["Artisan Arrangement", "Seasonal", "Fragrant"],
    is_available: true,
  },
];

/**
 * Filter mock products in memory without hitting the database.
 */
export function filterMockProducts(params: {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  distance?: number;
  pickupAvailable?: boolean;
  deliveryAvailable?: boolean;
}): EnhancedProduct[] {
  const {
    query,
    category,
    minPrice = 0,
    maxPrice = 1000000,
    distance,
    pickupAvailable,
    deliveryAvailable,
  } = params;

  return MOCK_PRODUCTS.filter((product) => {
    if (category && category.trim()) {
      const targetCategory = category.trim().toLowerCase();
      if ((product.category ?? "").toLowerCase() !== targetCategory) {
        return false;
      }
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      const matchName = (product.name ?? "").toLowerCase().includes(q);
      const matchDesc = (product.description ?? "").toLowerCase().includes(q);
      const matchCategory = (product.category ?? "").toLowerCase().includes(q);
      const matchFarm = (product.farmName ?? "").toLowerCase().includes(q);
      const matchTags = (product.tags ?? []).some((t) => t.toLowerCase().includes(q));

      if (!matchName && !matchDesc && !matchCategory && !matchFarm && !matchTags) {
        return false;
      }
    }

    const price = Number(product.price) || 0;
    if (price < minPrice || price > maxPrice) {
      return false;
    }

    if (distance !== undefined && distance > 0 && product.distance !== undefined) {
      if (product.distance > distance) {
        return false;
      }
    }

    if (pickupAvailable && !product.pickupAvailable) {
      return false;
    }

    if (deliveryAvailable && !product.deliveryAvailable) {
      return false;
    }

    return true;
  });
}

/**
 * Merge live database products with mock catalog (database products take precedence).
 */
export function mergeWithMockCatalog(
  dbProducts: Product[] | undefined | null
): EnhancedProduct[] {
  const list = Array.isArray(dbProducts) ? [...dbProducts] : [];
  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();

  const result: EnhancedProduct[] = [];

  // Add DB products first
  for (const item of list) {
    if (item.slug) seenSlugs.add(item.slug.toLowerCase());
    if (item.name) seenNames.add(item.name.toLowerCase());
    result.push({
      ...item,
      distance: 2.5,
      farmName: "Local Verified Farm",
      rating: 4.9,
      reviewsCount: 12,
      pickupAvailable: true,
      deliveryAvailable: true,
      tags: ["Locally Grown", "Farm Fresh"],
    });
  }

  // Add mock products that aren't already represented in DB
  for (const mock of MOCK_PRODUCTS) {
    const slugKey = (mock.slug ?? "").toLowerCase();
    const nameKey = (mock.name ?? "").toLowerCase();

    if (!seenSlugs.has(slugKey) && !seenNames.has(nameKey)) {
      result.push(mock);
      seenSlugs.add(slugKey);
      seenNames.add(nameKey);
    }
  }

  return result;
}
