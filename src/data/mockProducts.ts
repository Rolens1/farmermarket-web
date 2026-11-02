/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/app/api/product/dto/create-product.dto";
import { MOCK_SELLERS, SellerProfile, getSellerForProductSlug } from "./mockSellers";

export interface EnhancedProduct extends Product {
  farmName?: string;
  sellerId?: string;
  sellerName?: string;
  sellerSlug?: string;
  sellerAvatar?: string;
  sellerBanner?: string;
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
  // ==========================================
  // PRODUCE & VEGETABLES (Ferme Maraîchère St-Laurent)
  // ==========================================
  {
    id: "prod-101",
    name: "Heirloom Field Tomatoes",
    slug: "organic-heirloom-tomatoes",
    category: "Vegetables",
    price: 4.49,
    quantity: 75,
    unit: "lb",
    description: "Sun-drenched, vine-ripened Quebec field tomatoes grown in fertile river soil. Rich, fragrant, juicy, and perfect for fresh slicing or caprese salads.",
    image: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546470427-0d4db154ceb7?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 4.9,
    reviewsCount: 58,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Yesterday",
    tags: ["Heirloom", "Field Grown", "Pesticide-Free"],
    is_available: true,
  },
  {
    id: "prod-102",
    name: "Sweet Rainbow Baby Carrots with Tops",
    slug: "sweet-rainbow-baby-carrots",
    category: "Vegetables",
    price: 2.99,
    quantity: 90,
    unit: "bunch",
    description: "Crisp, naturally sweet tricolor carrots pulled fresh with green feathery tops intact. Superb raw with dip or roasted with thyme.",
    image: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 4.8,
    reviewsCount: 42,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "This Morning",
    tags: ["Tricolor", "Crisp", "Sweet"],
    is_available: true,
  },
  {
    id: "prod-103",
    name: "Crisp Romaine Lettuce Head",
    slug: "crisp-farmhouse-romaine",
    category: "Vegetables",
    price: 1.99,
    quantity: 60,
    unit: "head",
    description: "Tightly packed, refreshing green romaine heads grown in rich mineral compost. Sweet, crisp ribs ready for the quintessential caesar salad.",
    image: [
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 4.7,
    reviewsCount: 31,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Today",
    tags: ["Crisp", "Washed", "Farm Fresh"],
    is_available: true,
  },
  {
    id: "prod-104",
    name: "Quebec Bi-Color Sweet Corn",
    slug: "sweet-bi-color-corn",
    category: "Vegetables",
    price: 0.85,
    quantity: 150,
    unit: "ear",
    description: "Juicy, tender yellow and white kernels bursting with sweet milk. Harvested at the break of dawn before summer temperatures rise.",
    image: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 5.0,
    reviewsCount: 88,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Dawn Today",
    tags: ["Super Sweet", "Local Quebec", "Field Fresh"],
    is_available: true,
  },
  {
    id: "prod-105",
    name: "Quebec Snow-White Cauliflower",
    slug: "crisp-cauliflower",
    category: "Vegetables",
    price: 2.49,
    quantity: 45,
    unit: "head",
    description: "Dense, creamy-white curds protected by lush green wrapper leaves. Perfect steamed with sea salt, mashed, or roasted whole with garlic butter.",
    image: [
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 4.8,
    reviewsCount: 26,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Yesterday",
    tags: ["Locally Grown", "Crisp Curds"],
    is_available: true,
  },
  {
    id: "prod-106",
    name: "Tricolor Sweet Bell Peppers",
    slug: "rainbow-sweet-bell-peppers",
    category: "Vegetables",
    price: 3.89,
    quantity: 65,
    unit: "pack of 3",
    description: "Vibrant red, orange, and yellow sweet blocky bell peppers. Juicy, thick-walled, and naturally high in Vitamin C.",
    image: [
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 4.9,
    reviewsCount: 34,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "2 days ago",
    tags: ["Tricolor", "Vitamin C", "Sweet"],
    is_available: true,
  },
  {
    id: "prod-107",
    name: "Creamer Yellow & Red Potatoes",
    slug: "yellow-red-creamer-potatoes",
    category: "Vegetables",
    price: 2.99,
    quantity: 80,
    unit: "3 lb bag",
    description: "Velvety baby potatoes with delicate paper-thin skins. Boiled, roasted with fresh rosemary, or pan-smashed with garlic.",
    image: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 4.9,
    reviewsCount: 47,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Field Stored",
    tags: ["Baby Potatoes", "Thin Skin", "Quebec Crop"],
    is_available: true,
  },
  {
    id: "prod-108",
    name: "Fresh Sweet Field Leeks",
    slug: "fresh-sweet-leeks",
    category: "Vegetables",
    price: 3.25,
    quantity: 50,
    unit: "bunch of 3",
    description: "Long, sweet white stalks with tender green fan tops. An essential culinary staple for autumn soups, pot-au-feu, and braised gratins.",
    image: [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-1",
    sellerName: "Ferme Maraîchère St-Laurent",
    sellerSlug: "ferme-maraichere-st-laurent",
    farmName: "Ferme Maraîchère St-Laurent",
    sellerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    distance: 2.4,
    rating: 4.8,
    reviewsCount: 19,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Yesterday",
    tags: ["Aromatic", "Sweet Stalks", "Quebec Leeks"],
    is_available: true,
  },

  // ==========================================
  // FRUITS (Vergers de Rougemont)
  // ==========================================
  {
    id: "prod-201",
    name: "McIntosh & Cortland Orchard Apples",
    slug: "crisp-red-apples",
    category: "Fruits",
    price: 3.49,
    quantity: 110,
    unit: "4 lb bag",
    description: "Famous Quebec mountain apples freshly hand-picked on Mount Rougemont slopes. Crisp, juicy, with a lively sweet-tart tang.",
    image: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-2",
    sellerName: "Vergers de Rougemont",
    sellerSlug: "vergers-de-rougemont",
    farmName: "Vergers de Rougemont",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&auto=format&fit=crop&q=80",
    distance: 5.1,
    rating: 4.9,
    reviewsCount: 92,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Orchard Fresh",
    tags: ["McIntosh", "Cortland", "Mountain Orchard"],
    is_available: true,
  },
  {
    id: "prod-202",
    name: "Sun-Ripened Field Strawberries",
    slug: "sun-ripened-farm-strawberries",
    category: "Fruits",
    price: 4.99,
    quantity: 85,
    unit: "pint",
    description: "Bright crimson, intensely fragrant strawberries harvested daily. Naturally sweet with none of the hollow white cores of imported berries.",
    image: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-2",
    sellerName: "Vergers de Rougemont",
    sellerSlug: "vergers-de-rougemont",
    farmName: "Vergers de Rougemont",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&auto=format&fit=crop&q=80",
    distance: 5.1,
    rating: 5.0,
    reviewsCount: 104,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "This Morning",
    tags: ["Sweet", "Sun-Ripened", "Fragrant"],
    is_available: true,
  },
  {
    id: "prod-203",
    name: "Wild Blueberries from Lac-Saint-Jean",
    slug: "plump-mountain-blueberries",
    category: "Fruits",
    price: 5.99,
    quantity: 70,
    unit: "half-pint",
    description: "Legendary small wild northern blueberries packed with extraordinary concentration of flavor and anthocyanins. Hand-gathered in boreal bush clearings.",
    image: [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-2",
    sellerName: "Vergers de Rougemont",
    sellerSlug: "vergers-de-rougemont",
    farmName: "Vergers de Rougemont",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&auto=format&fit=crop&q=80",
    distance: 5.1,
    rating: 5.0,
    reviewsCount: 68,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Yesterday",
    tags: ["Wild Boreal", "Lac-St-Jean", "Super Antioxidant"],
    is_available: true,
  },
  {
    id: "prod-204",
    name: "Juicy Yellow Freestone Peaches",
    slug: "juicy-yellow-freestone-peaches",
    category: "Fruits",
    price: 3.99,
    quantity: 55,
    unit: "lb",
    description: "Tree-ripened yellow peaches with velvety blush skin and luscious golden pulp. Free-stone variety pulls cleanly off the pit.",
    image: [
      "https://images.unsplash.com/photo-1595759852703-9041a67459d4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1629828874514-c1e5103f2150?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-2",
    sellerName: "Vergers de Rougemont",
    sellerSlug: "vergers-de-rougemont",
    farmName: "Vergers de Rougemont",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&auto=format&fit=crop&q=80",
    distance: 5.1,
    rating: 4.8,
    reviewsCount: 49,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "3 days ago",
    tags: ["Tree-Ripened", "Freestone", "Juicy"],
    is_available: true,
  },
  {
    id: "prod-205",
    name: "Sweet Seedless Crimson Watermelon",
    slug: "sweet-seedless-watermelon",
    category: "Fruits",
    price: 5.49,
    quantity: 35,
    unit: "whole melon (~10 lb)",
    description: "Crisp, thirst-quenching crimson flesh with refreshing sugar sweetness and no black seeds. Chilled and sliced for summer gatherings.",
    image: [
      "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-2",
    sellerName: "Vergers de Rougemont",
    sellerSlug: "vergers-de-rougemont",
    farmName: "Vergers de Rougemont",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&auto=format&fit=crop&q=80",
    distance: 5.1,
    rating: 4.9,
    reviewsCount: 37,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Field Picked",
    tags: ["Seedless", "Refreshing", "Sweet"],
    is_available: true,
  },
  {
    id: "prod-206",
    name: "Honey-Sweet Bartlett Pears",
    slug: "bartlett-pears",
    category: "Fruits",
    price: 2.89,
    quantity: 60,
    unit: "lb",
    description: "Smooth golden-green skins that turn yellow as they ripen to buttery, dripping perfection. Wonderful eaten out of hand or poached in cider.",
    image: [
      "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-2",
    sellerName: "Vergers de Rougemont",
    sellerSlug: "vergers-de-rougemont",
    farmName: "Vergers de Rougemont",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&auto=format&fit=crop&q=80",
    distance: 5.1,
    rating: 4.8,
    reviewsCount: 28,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Orchard Fresh",
    tags: ["Bartlett", "Aromatic", "Juicy"],
    is_available: true,
  },

  // ==========================================
  // MEAT & POULTRY (Boucherie du Terroir des Cantons)
  // ==========================================
  {
    id: "prod-301",
    name: "Extra-Lean Grass-Fed Ground Beef (90/10)",
    slug: "grass-fed-ground-beef",
    category: "Meat",
    price: 7.99,
    quantity: 65,
    unit: "1 lb pack",
    description: "100% pasture-raised steer beef ground fresh daily. Rich clean beef flavor, zero filler, no antibiotics, and exceptional for smash burgers or bolognese.",
    image: [
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-3",
    sellerName: "Boucherie du Terroir des Cantons",
    sellerSlug: "boucherie-du-terroir-des-cantons",
    farmName: "Boucherie du Terroir des Cantons",
    sellerAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    distance: 7.8,
    rating: 5.0,
    reviewsCount: 71,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Fresh Ground Today",
    tags: ["100% Grass-Fed", "Extra-Lean", "No Antibiotics"],
    is_available: true,
  },
  {
    id: "prod-302",
    name: "Grain-Fed Boneless Chicken Breasts",
    slug: "pasture-raised-chicken-breast",
    category: "Meat",
    price: 8.99,
    quantity: 50,
    unit: "pack (~1.2 lb)",
    description: "Air-chilled boneless, skinless chicken breasts from free-roaming birds raised on grain and natural forage. Never water-injected.",
    image: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-3",
    sellerName: "Boucherie du Terroir des Cantons",
    sellerSlug: "boucherie-du-terroir-des-cantons",
    farmName: "Boucherie du Terroir des Cantons",
    sellerAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    distance: 7.8,
    rating: 4.9,
    reviewsCount: 53,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Air-Chilled Fresh",
    tags: ["Air-Chilled", "Grain-Fed", "Tender"],
    is_available: true,
  },
  {
    id: "prod-303",
    name: "Maplewood Smoked Thick-Cut Bacon",
    slug: "applewood-smoked-bacon",
    category: "Meat",
    price: 9.99,
    quantity: 40,
    unit: "1 lb pack",
    description: "Dry-cured with Quebec maple sugar, cracked peppercorns, and slow-smoked over aromatic maplewood embers for 12 hours. Slices fry up crispy and unforgettable.",
    image: [
      "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-3",
    sellerName: "Boucherie du Terroir des Cantons",
    sellerSlug: "boucherie-du-terroir-des-cantons",
    farmName: "Boucherie du Terroir des Cantons",
    sellerAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    distance: 7.8,
    rating: 5.0,
    reviewsCount: 89,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Smoked Fresh",
    tags: ["Maple Smoked", "Thick-Cut", "Artisan Cured"],
    is_available: true,
  },
  {
    id: "prod-304",
    name: "Prime Dry-Aged Bone-In Ribeye",
    slug: "grass-fed-ribeye-steak",
    category: "Meat",
    price: 17.5,
    quantity: 25,
    unit: "steak (~14 oz)",
    description: "Beautiful intramuscular marbling aged for 28 days in humidity-controlled lockers. Tender buttery texture with deep roasted-nut aroma.",
    image: [
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-3",
    sellerName: "Boucherie du Terroir des Cantons",
    sellerSlug: "boucherie-du-terroir-des-cantons",
    farmName: "Boucherie du Terroir des Cantons",
    sellerAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    distance: 7.8,
    rating: 5.0,
    reviewsCount: 64,
    pickupAvailable: true,
    deliveryAvailable: false,
    harvestDate: "28 Days Dry-Aged",
    tags: ["Prime Cut", "28-Day Aged", "Ribeye"],
    is_available: true,
  },
  {
    id: "prod-305",
    name: "Thick-Cut Heritage Pork Loin Chops",
    slug: "pork-loin-chops",
    category: "Meat",
    price: 6.99,
    quantity: 45,
    unit: "2-pack (~1.1 lb)",
    description: "Generously cut bone-in chops from pasture-grazed heritage hogs. Succulent with a protective rim of flavorful golden fat.",
    image: [
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-3",
    sellerName: "Boucherie du Terroir des Cantons",
    sellerSlug: "boucherie-du-terroir-des-cantons",
    farmName: "Boucherie du Terroir des Cantons",
    sellerAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    distance: 7.8,
    rating: 4.8,
    reviewsCount: 38,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Butcher Fresh",
    tags: ["Heritage Breed", "Thick Cut", "Juicy"],
    is_available: true,
  },
  {
    id: "prod-306",
    name: "Grass-Fed Beef Stew Cubes",
    slug: "grass-fed-beef-stew-cubes",
    category: "Meat",
    price: 8.49,
    quantity: 35,
    unit: "1 lb pack",
    description: "Lean, hand-diced chuck cubes trimmed of excess gristle. Slow-simmers to fall-apart tenderness in red wine, broth, and root vegetables.",
    image: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-3",
    sellerName: "Boucherie du Terroir des Cantons",
    sellerSlug: "boucherie-du-terroir-des-cantons",
    farmName: "Boucherie du Terroir des Cantons",
    sellerAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    distance: 7.8,
    rating: 4.9,
    reviewsCount: 33,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Hand Trimmed",
    tags: ["Stew Cubes", "Slow Cooker", "Lean"],
    is_available: true,
  },

  // ==========================================
  // DAIRY & CHEESE (Laiterie & Fromagerie Belle-Vallée)
  // ==========================================
  {
    id: "prod-401",
    name: "Pasture-Raised Brown Eggs",
    slug: "farm-fresh-eggs",
    category: "Dairy",
    price: 5.49,
    quantity: 90,
    unit: "dozen",
    description: "Deep orange-yellow yolks with firm whites from hens roaming free on clover pasture. Gathered, cleaned, and packed each morning.",
    image: [
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-4",
    sellerName: "Laiterie & Fromagerie Belle-Vallée",
    sellerSlug: "laiterie-fromagerie-belle-vallee",
    farmName: "Laiterie & Fromagerie Belle-Vallée",
    sellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=1200&auto=format&fit=crop&q=80",
    distance: 4.2,
    rating: 5.0,
    reviewsCount: 118,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Gathered Today",
    tags: ["Free-Range", "Orange Yolks", "Pasture Laid"],
    is_available: true,
  },
  {
    id: "prod-402",
    name: "Fresh Squeaky Cheese Curds (Fromage en grains)",
    slug: "fresh-cheese-curds",
    category: "Dairy",
    price: 4.99,
    quantity: 80,
    unit: "bag (250g)",
    description: "Famous Quebec day-fresh cheddar cheese curds made every morning. Irresistibly warm, salty, and guaranteed to squeak between your teeth.",
    image: [
      "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-4",
    sellerName: "Laiterie & Fromagerie Belle-Vallée",
    sellerSlug: "laiterie-fromagerie-belle-vallee",
    farmName: "Laiterie & Fromagerie Belle-Vallée",
    sellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=1200&auto=format&fit=crop&q=80",
    distance: 4.2,
    rating: 5.0,
    reviewsCount: 142,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Fresh This Morning",
    tags: ["Squeaky Curds", "Cheddar", "Poutine Essential"],
    is_available: true,
  },
  {
    id: "prod-403",
    name: "Pasture Whole Milk (Returnable Glass Bottle)",
    slug: "grass-fed-whole-milk",
    category: "Dairy",
    price: 5.99,
    quantity: 50,
    unit: "half-gallon (glass)",
    description: "Creamline whole milk from grass-grazed Jersey cows. Non-homogenized with golden thick cream that rises naturally to the neck.",
    image: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-4",
    sellerName: "Laiterie & Fromagerie Belle-Vallée",
    sellerSlug: "laiterie-fromagerie-belle-vallee",
    farmName: "Laiterie & Fromagerie Belle-Vallée",
    sellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=1200&auto=format&fit=crop&q=80",
    distance: 4.2,
    rating: 4.9,
    reviewsCount: 65,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Bottled Today",
    tags: ["Creamline", "Jersey Cows", "Glass Bottle"],
    is_available: true,
  },
  {
    id: "prod-404",
    name: "Farmstead Cheddar Aged 2 Years",
    slug: "aged-raw-milk-sharp-cheddar",
    category: "Dairy",
    price: 8.5,
    quantity: 30,
    unit: "wedge (8 oz)",
    description: "Made in copper vats from raw summer milk and aged 24 months in subterranean caves. Crunchy tyrosine crystals with sharp hazelnut finish.",
    image: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-4",
    sellerName: "Laiterie & Fromagerie Belle-Vallée",
    sellerSlug: "laiterie-fromagerie-belle-vallee",
    farmName: "Laiterie & Fromagerie Belle-Vallée",
    sellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=1200&auto=format&fit=crop&q=80",
    distance: 4.2,
    rating: 5.0,
    reviewsCount: 54,
    pickupAvailable: true,
    deliveryAvailable: false,
    harvestDate: "24 Months Aged",
    tags: ["Cave-Aged", "Raw Milk", "Crunchy Crystals"],
    is_available: true,
  },
  {
    id: "prod-405",
    name: "Cultured Sea Salt Country Butter",
    slug: "cultured-sea-salt-farm-butter",
    category: "Dairy",
    price: 5.25,
    quantity: 40,
    unit: "roll (8 oz)",
    description: "Slow-churned European-style butter with 85% butterfat, kneaded with crunchy crystals of grey sea salt. Outstanding on warm sourdough.",
    image: [
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-4",
    sellerName: "Laiterie & Fromagerie Belle-Vallée",
    sellerSlug: "laiterie-fromagerie-belle-vallee",
    farmName: "Laiterie & Fromagerie Belle-Vallée",
    sellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=1200&auto=format&fit=crop&q=80",
    distance: 4.2,
    rating: 4.9,
    reviewsCount: 43,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Churned Yesterday",
    tags: ["85% Butterfat", "Cultured", "Sea Salt"],
    is_available: true,
  },

  // ====================================================
  // BOUTIQUE / SINGLE-SPECIALTY SELLERS
  // ====================================================

  // SELLER 5: Érablière & Rucher du Mont-Royal (Single Product)
  {
    id: "prod-501",
    name: "100% Pure Quebec Amber Maple Syrup",
    slug: "pure-quebec-amber-maple-syrup",
    category: "Honey",
    price: 12.99,
    quantity: 80,
    unit: "540 ml can",
    description: "Single-source wood-fired maple syrup tapped from century-old sugar maples in Mont-Saint-Hilaire. Rich, rounded caramel flavor that elevates pancakes, marinades, and yogurt.",
    image: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-5",
    sellerName: "Érablière & Rucher du Mont-Royal",
    sellerSlug: "erabliere-rucher-du-mont-royal",
    farmName: "Érablière & Rucher du Mont-Royal",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=80",
    distance: 6.3,
    rating: 5.0,
    reviewsCount: 135,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Spring Tap",
    tags: ["100% Pure", "Wood-Fired", "Grade A Amber"],
    is_available: true,
  },

  // SELLER 6: Apiculture Sauvageon (Single Product)
  {
    id: "prod-601",
    name: "Pure Raw Cut Honeycomb Square",
    slug: "pure-raw-cut-honeycomb",
    category: "Honey",
    price: 14.5,
    quantity: 35,
    unit: "12 oz square",
    description: "Pristine edible beeswax honeycomb straight from the frames, bursting with raw floral nectar. An extraordinary centerpiece for artisan cheese platters.",
    image: [
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-6",
    sellerName: "Apiculture Sauvageon",
    sellerSlug: "apiculture-sauvageon",
    farmName: "Apiculture Sauvageon",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80",
    distance: 8.9,
    rating: 5.0,
    reviewsCount: 52,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Hive Cut Fresh",
    tags: ["Edible Comb", "100% Raw", "Unprocessed"],
    is_available: true,
  },

  // Raw Honey supplement
  {
    id: "prod-602",
    name: "Raw Unfiltered Wildflower Honey",
    slug: "raw-wildflower-honey",
    category: "Honey",
    price: 10.99,
    quantity: 60,
    unit: "16 oz jar",
    description: "Liquid golden nectar containing all natural enzymes and wildflower pollens. Unheated and gently hand-poured into glass jars.",
    image: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-6",
    sellerName: "Apiculture Sauvageon",
    sellerSlug: "apiculture-sauvageon",
    farmName: "Apiculture Sauvageon",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80",
    distance: 8.9,
    rating: 4.9,
    reviewsCount: 48,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Autumn Extract",
    tags: ["Raw", "Wildflower", "Unheated"],
    is_available: true,
  },

  // SELLER 7: Champs Floraux de l'Estrie (Flowers)
  {
    id: "prod-701",
    name: "Mammoth Radiant Sunflower Bouquet",
    slug: "fresh-sunflower-bouquet",
    category: "Flowers",
    price: 8.5,
    quantity: 40,
    unit: "bouquet (5 stems)",
    description: "Thick-stemmed giant golden sunflowers harvested fresh each morning with deep velvety brown centers. Guaranteed 10+ days vase life.",
    image: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-7",
    sellerName: "Champs Floraux de l'Estrie",
    sellerSlug: "champs-floraux-de-lestrie",
    farmName: "Champs Floraux de l'Estrie",
    sellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1200&auto=format&fit=crop&q=80",
    distance: 9.4,
    rating: 4.9,
    reviewsCount: 46,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Cut at Dawn",
    tags: ["Giant Sunflowers", "Long Vase Life", "Field Cut"],
    is_available: true,
  },
  {
    id: "prod-702",
    name: "Wild Country Seasonal Garden Bouquet",
    slug: "wild-seasonal-garden-mix",
    category: "Flowers",
    price: 14.0,
    quantity: 30,
    unit: "large hand-tied bouquet",
    description: "An artisan grower's bouquet composed of zinnias, snapdragons, cosmos, sea lavender, and fragrant eucalyptus greens wrapped in natural brown paper.",
    image: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-7",
    sellerName: "Champs Floraux de l'Estrie",
    sellerSlug: "champs-floraux-de-lestrie",
    farmName: "Champs Floraux de l'Estrie",
    sellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1200&auto=format&fit=crop&q=80",
    distance: 9.4,
    rating: 5.0,
    reviewsCount: 39,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Today",
    tags: ["Hand-Tied", "Fragrant", "Field Blooms"],
    is_available: true,
  },

  // SELLER 8: La Chèvrerie Alpine (Single Product Specialty)
  {
    id: "prod-801",
    name: "Artisan Herb & Fleur de Sel Goat Chevre",
    slug: "artisan-goat-cheese",
    category: "Dairy",
    price: 7.49,
    quantity: 40,
    unit: "log (150g)",
    description: "Silky, delicate goat chevre hand-ladled from raw morning milk of our 24 Alpine goats grazing mountain herbs. Finished with fleur de sel.",
    image: [
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800&auto=format&fit=crop&q=80",
    ],
    sellerId: "seller-8",
    sellerName: "La Chèvrerie Alpine",
    sellerSlug: "la-chevrerie-alpine",
    farmName: "La Chèvrerie Alpine",
    sellerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    sellerBanner: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&auto=format&fit=crop&q=80",
    distance: 10.2,
    rating: 4.9,
    reviewsCount: 63,
    pickupAvailable: true,
    deliveryAvailable: true,
    harvestDate: "Small Batch",
    tags: ["Alpine Goats", "Hand-Ladled", "Fleur de Sel"],
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
      const matchSeller = (product.sellerName ?? "").toLowerCase().includes(q);
      const matchTags = (product.tags ?? []).some((t) => t.toLowerCase().includes(q));

      if (
        !matchName &&
        !matchDesc &&
        !matchCategory &&
        !matchFarm &&
        !matchSeller &&
        !matchTags
      ) {
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
    const matchedSeller = item.slug ? getSellerForProductSlug(item.slug) : undefined;
    result.push({
      ...item,
      distance: matchedSeller?.distance ?? 2.5,
      farmName: matchedSeller?.name ?? "Local Verified Farm",
      sellerName: matchedSeller?.name ?? "Local Verified Farm",
      sellerSlug: matchedSeller?.slug ?? "local-verified-farm",
      sellerAvatar: matchedSeller?.avatar,
      sellerBanner: matchedSeller?.banner,
      rating: matchedSeller?.rating ?? 4.9,
      reviewsCount: matchedSeller?.reviewsCount ?? 12,
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
