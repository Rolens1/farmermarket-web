export interface MockActivity {
  id: string;
  type: "order" | "review" | "listing" | "stock";
  title: string;
  description: string;
  time: string;
  amount?: string;
  customer?: string;
}

export const MOCK_ACTIVITIES: MockActivity[] = [
  {
    id: "act-1",
    type: "order",
    title: "New order received",
    description: "3 lbs Organic Strawberries, 2 bunches Rainbow Baby Carrots",
    time: "15 minutes ago",
    amount: "+$24.95",
    customer: "Elena Rostova",
  },
  {
    id: "act-2",
    type: "order",
    title: "Pickup order completed",
    description: "1 half-gallon Grass-Fed Whole Milk, 1 dozen Farm Eggs",
    time: "1 hour ago",
    amount: "+$12.24",
    customer: "Marcus Vance",
  },
  {
    id: "act-3",
    type: "review",
    title: "5-Star Review received",
    description: '"The heirloom tomatoes are the sweetest I\'ve ever tasted!"',
    time: "3 hours ago",
    customer: "Chloe Bennett",
  },
  {
    id: "act-4",
    type: "order",
    title: "Delivery confirmed",
    description: "16 oz Raw Wildflower Honey, Fresh Sunflower Bouquet",
    time: "5 hours ago",
    amount: "+$20.50",
    customer: "Daniel Kim",
  },
  {
    id: "act-5",
    type: "stock",
    title: "Low stock alert",
    description: "Aged Raw-Milk Sharp Cheddar is down to 3 wedges remaining",
    time: "Yesterday",
  },
];

export const MOCK_REVENUE_CHART = [
  { name: "Mon", revenue: 420, orders: 18 },
  { name: "Tue", revenue: 580, orders: 24 },
  { name: "Wed", revenue: 510, orders: 21 },
  { name: "Thu", revenue: 690, orders: 31 },
  { name: "Fri", revenue: 840, orders: 38 },
  { name: "Sat", revenue: 1250, orders: 54 },
  { name: "Sun", revenue: 980, orders: 42 },
];

export const MOCK_CATEGORY_BREAKDOWN = [
  { name: "Vegetables", sales: 1680, share: "35%" },
  { name: "Fruits", sales: 1240, share: "26%" },
  { name: "Dairy & Eggs", sales: 920, share: "19%" },
  { name: "Meat", sales: 640, share: "13%" },
  { name: "Honey & Flowers", sales: 340, share: "7%" },
];

export const MOCK_STARTER_LISTINGS = [
  {
    id: 1001,
    name: "Organic Heirloom Tomatoes",
    category: "Vegetables",
    description: "Vine-ripened organic heirloom tomatoes.",
    status: "active",
    price: 4.99,
    unit: "lb",
    stock: 65,
    views: 312,
    sales: 48,
    revenue: "$239.52",
    updated_at: "Today, 10:30 AM",
    slug: "organic-heirloom-tomatoes",
  },
  {
    id: 1002,
    name: "Sweet Rainbow Baby Carrots",
    category: "Vegetables",
    description: "Crisp multi-colored baby carrots with green tops.",
    status: "active",
    price: 3.49,
    unit: "bunch",
    stock: 80,
    views: 245,
    sales: 39,
    revenue: "$136.11",
    updated_at: "Yesterday",
    slug: "sweet-rainbow-baby-carrots",
  },
  {
    id: 1003,
    name: "Pasture-Raised Brown Eggs",
    category: "Dairy",
    description: "Free-range brown eggs collected daily.",
    status: "active",
    price: 5.99,
    unit: "dozen",
    stock: 22,
    views: 489,
    sales: 74,
    revenue: "$443.26",
    updated_at: "Today, 8:15 AM",
    slug: "farm-fresh-eggs",
  },
  {
    id: 1004,
    name: "Sun-Ripened Farm Strawberries",
    category: "Fruits",
    description: "Sweet, sun-drenched local strawberries.",
    status: "active",
    price: 5.99,
    unit: "pint",
    stock: 14,
    views: 520,
    sales: 68,
    revenue: "$407.32",
    updated_at: "Yesterday",
    slug: "sun-ripened-farm-strawberries",
  },
  {
    id: 1005,
    name: "Raw Wildflower Honey",
    category: "Honey",
    description: "100% pure raw unpasteurized comb honey.",
    status: "active",
    price: 11.5,
    unit: "jar",
    stock: 8,
    views: 198,
    sales: 21,
    revenue: "$241.50",
    updated_at: "3 days ago",
    slug: "raw-wildflower-honey",
  },
];

