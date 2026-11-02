"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Eye,
  Package,
  ShoppingBag,
  LogOut,
  User,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Clock,
  List,
  Link,
  Truck,
  Star,
  Sparkles,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  PieChart as PieChartIcon,
  RefreshCw,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
  Line,
  LineChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/StatsCard";
import { ActivityItem } from "@/components/ActivityItem";
import { ProductBar } from "@/components/ui/product-bar";
import { InsightRow } from "@/components/ui/insight-row";
import { MyListingDialog } from "@/components/MyListingModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { signOut } from "../api/auth/login";
import { deleteProduct, getUserProducts } from "../api/product/products";
import { MOCK_STARTER_LISTINGS } from "@/data/mockDashboard";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("listings");
  const [sidebarOpen, setSidebarOpen] = useState("dashboard");
  const [listingDialogOpen, setListingDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const handleNewListing = () => {
    // console.log removed
    setSelectedListing(null);
    setListingDialogOpen(true);
  };

  const handleEditListing = (listing: Listing) => {
    setSelectedListing(listing);
    setListingDialogOpen(true);
  };

  const [currentListings, setCurrentListings] = useState<Listing[]>([]);
  const safeListings = Array.isArray(currentListings) ? currentListings : [];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const accessToken =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;
        if (!accessToken) {
          router.push("/login");
          return;
        }

        const response = await getUserProducts();
        if (Array.isArray(response) && response.length > 0) {
          setCurrentListings(response);
        } else if (response && Array.isArray((response as any).products) && (response as any).products.length > 0) {
          setCurrentListings((response as any).products);
        } else {
          // Provide rich mock starter listings so dashboard feels alive
          setCurrentListings(MOCK_STARTER_LISTINGS as Listing[]);
        }
      } catch (error) {
        console.error("Failed to load user listings:", error);
        setCurrentListings([]);
      }
    };

    fetchListings();
  }, [router]);

  const handleSaveListing = (listingData: Partial<Listing>) => {
    if (listingData.id) {
      // Update existing listing
      setCurrentListings((prev) =>
        (Array.isArray(prev) ? prev : []).map((item) =>
          item.id === listingData.id
            ? {
                ...item,
                ...listingData,
                lastUpdated: "Just now",
              }
            : item
        )
      );
    } else {
      // Create new listing
      const newListing = {
        id:
          safeListings.length > 0
            ? Math.max(...safeListings.map((l) => Number(l.id) || 0)) + 1
            : Date.now(),
        name: listingData.name ?? "",
        category: listingData.category ?? "",
        description: listingData.description ?? "",
        status: listingData.status ?? "active",
        price: listingData.price ?? 0,
        unit: listingData.unit ?? "",
        stock: listingData.quantity ?? 0,
        views: 0,
        sales: 0,
        revenue: "$0.00",
        updated_at: listingData.updated_at ?? "",
      };
      setCurrentListings((prev) => [...(Array.isArray(prev) ? prev : []), newListing]);
    }
  };

  type Listing = {
    id: number;
    name: string;
    category: string;
    description: string;
    status: string;
    price: number;
    unit: string;
    stock: number; // always set from backend 'quantity'
    quantity?: number; // allow for backend field in Partial<Listing>
    slug?: string; // for product detail routing
    views: number;
    sales: number;
    revenue: string;
    updated_at: string;
  };

  const handleDeleteClick = (listing: Listing) => {
    setListingToDelete(listing);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (listingToDelete) {
      setCurrentListings((prev) =>
        (Array.isArray(prev) ? prev : []).filter((item) => item.id !== listingToDelete.id)
      );
      toast.success("Listing deleted successfully");
      await deleteProduct(String(listingToDelete.id));
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    }
  };

  //   const listings = [
  //     {
  //       id: 1,
  //       title: "Organic Tomatoes",
  //       status: "active",
  //       price: "$4.99/lb",
  //       stock: "50 lbs",
  //       views: 245,
  //       sales: 28,
  //       revenue: "$139.72",
  //       lastUpdated: "2 hours ago",
  //     },
  //     {
  //       id: 2,
  //       title: "Fresh Lettuce",
  //       status: "active",
  //       price: "$2.99/lb",
  //       stock: "30 lbs",
  //       views: 189,
  //       sales: 45,
  //       revenue: "$134.55",
  //       lastUpdated: "5 hours ago",
  //     },
  //     {
  //       id: 3,
  //       title: "Sweet Corn",
  //       status: "low_stock",
  //       price: "$3.49/lb",
  //       stock: "8 lbs",
  //       views: 98,
  //       sales: 12,
  //       revenue: "$41.88",
  //       lastUpdated: "1 day ago",
  //     },
  //     {
  //       id: 4,
  //       title: "Farm Eggs",
  //       status: "active",
  //       price: "$5.99/dozen",
  //       stock: "20 dozen",
  //       views: 312,
  //       sales: 67,
  //       revenue: "$401.33",
  //       lastUpdated: "3 hours ago",
  //     },
  //     {
  //       id: 5,
  //       title: "Organic Honey",
  //       status: "active",
  //       price: "$12.99/jar",
  //       stock: "15 jars",
  //       views: 156,
  //       sales: 34,
  //       revenue: "$441.66",
  //       lastUpdated: "6 hours ago",
  //     },
  //   ];

  const weeklyData = [
    { day: "Mon", revenue: 420, orders: 12, views: 145 },
    { day: "Tue", revenue: 680, orders: 19, views: 220 },
    { day: "Wed", revenue: 550, orders: 15, views: 189 },
    { day: "Thu", revenue: 780, orders: 23, views: 310 },
    { day: "Fri", revenue: 920, orders: 28, views: 380 },
    { day: "Sat", revenue: 1240, orders: 35, views: 450 },
    { day: "Sun", revenue: 890, orders: 24, views: 320 },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5100 },
    { month: "Mar", revenue: 6800 },
    { month: "Apr", revenue: 7200 },
    { month: "May", revenue: 8500 },
    { month: "Jun", revenue: 9200 },
  ];

  const revenueChartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6",
    },
  };

  const ordersChartConfig = {
    orders: {
      label: "Orders",
      color: "#8b5cf6",
    },
  };

  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<"7d" | "30d" | "90d" | "ytd">("7d");

  const categorySalesData = [
    { name: "Organic Vegetables", sales: 2180.4, percentage: 40, color: "bg-emerald-500", dotColor: "#10b981", items: "Heirloom Tomatoes, Sweet Corn, Crisp Romaine, Carrots" },
    { name: "Fresh Orchard Fruits", sales: 1520.15, percentage: 28, color: "bg-rose-500", dotColor: "#f43f5e", items: "Strawberries, Honeycrisp Apples, Blueberries" },
    { name: "Farm Dairy & Eggs", sales: 1050.6, percentage: 19, color: "bg-amber-500", dotColor: "#f59e0b", items: "Pasture Eggs, Unpasteurized Butter, Artisanal Cheese" },
    { name: "Artisanal Honey & Pantry", sales: 730.0, percentage: 13, color: "bg-purple-500", dotColor: "#a855f7", items: "Raw Wildflower Honey, Pure Maple Syrup, Berry Jam" },
  ];

  const inventoryVelocityData = [
    {
      name: "Sun-Ripened Strawberries",
      velocity: "38 lbs / day",
      stock: "24 lbs",
      status: "High Velocity",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      harvestAlert: "Picked this morning • Optimal freshness",
      daysSupply: "0.6 days",
    },
    {
      name: "Heirloom Field Tomatoes",
      velocity: "42 lbs / day",
      stock: "16 lbs",
      status: "Low Stock Alert",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      harvestAlert: "Harvest restock scheduled tomorrow 8:00 AM",
      daysSupply: "0.4 days",
    },
    {
      name: "Pasture-Raised Eggs",
      velocity: "25 dozen / day",
      stock: "12 dozen",
      status: "High Demand",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      harvestAlert: "Daily collection active",
      daysSupply: "0.5 days",
    },
    {
      name: "Sweet Bicolor Corn",
      velocity: "18 lbs / day",
      stock: "8 lbs",
      status: "Critically Low",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      harvestAlert: "Final ears of current crop batch",
      daysSupply: "0.4 days",
    },
    {
      name: "Raw Wildflower Honey",
      velocity: "6 jars / day",
      stock: "42 jars",
      status: "Optimal Stock",
      badgeClass: "bg-slate-50 text-slate-700 border-slate-200",
      harvestAlert: "Stable ambient shelf life (no spoilage risk)",
      daysSupply: "7.0 days",
    },
  ];

  const peakHoursData = [
    { time: "6:00 AM – 9:00 AM", percent: 34, label: "Market Early Birds & Pre-Orders", orders: "53 orders" },
    { time: "11:00 AM – 2:00 PM", percent: 45, label: "Lunchtime & Farm Stand Visitors", orders: "70 orders" },
    { time: "4:00 PM – 7:00 PM", percent: 21, label: "After-Work Groceries & Pickup", orders: "33 orders" },
  ];

  const fulfillmentData = [
    { method: "Farm Stand & Farmers' Market Pickup", percentage: 68, count: "106 orders", badge: "Primary Channel", speed: "Instant / Zero packing lag" },
    { method: "Local Farm Delivery (<15 mi radius)", percentage: 22, count: "34 orders", badge: "Direct Drop", speed: "Avg 45 mins transit" },
    { method: "Community Cooperative Hub Pickup", percentage: 10, count: "16 orders", badge: "Weekly Group", speed: "Saturday mornings" },
  ];

  const ratingsDistribution = [
    { stars: "5 Stars", percentage: 86, count: 136 },
    { stars: "4 Stars", percentage: 10, count: 16 },
    { stars: "3 Stars", percentage: 3, count: 4 },
    { stars: "2 Stars", percentage: 1, count: 2 },
    { stars: "1 Star", percentage: 0, count: 0 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 min-h-0 lg:min-h-screen sticky top-0 z-20">
          <div className="p-4 sm:p-6 border-b border-slate-200">
            {/* Name and Description */}
            <h2 className="text-slate-900 font-semibold text-lg sm:text-xl">
              Green Valley Farm
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Farmer Dashboard
            </p>
          </div>

          <nav className="p-2 sm:p-4 flex flex-row lg:flex-col overflow-x-auto gap-2 lg:gap-0">
            {/** Dashboard */}
            <button
              onClick={() => {
                setSidebarOpen("dashboard");
                setActiveTab("overview");
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                sidebarOpen === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium text-sm">Dashboard</span>
            </button>

            {/** Analytics */}
            <button
              onClick={() => {
                setSidebarOpen("analytics");
                setActiveTab("analytics");
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
                sidebarOpen === "analytics"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium text-sm">Analytics</span>
            </button>

            {/** Listings */}
            <button
              onClick={() => {
                setSidebarOpen("listings");
                setActiveTab("listings");
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
                sidebarOpen === "listings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <List className="w-5 h-5" />
              <span className="font-medium text-sm">My Listings</span>
              <Badge className="ml-auto bg-slate-100 text-slate-700 border-0">
                {safeListings.length}
              </Badge>
            </button>



            <div className="my-4 border-t border-slate-200"></div>

            {/** Profile Settings */}
            <button
              onClick={() => setSidebarOpen("profile")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                sidebarOpen === "profile"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium text-sm">Profile Settings</span>
            </button>

            {/** Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-slate-700 hover:bg-slate-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sm:py-6 sticky top-0 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <div>
                <h1 className="text-slate-900 font-semibold text-xl sm:text-2xl">
                  Dashboard
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Monitor your farm&rsquo;s performance and manage your listings
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-base"
                  disabled
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={handleNewListing}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-base"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Listing
                </Button>
              </div>
            </div>
          </header>

          <div className="p-2 sm:p-4 md:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100 border border-slate-200">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-white"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="listings"
                  className="data-[state=active]:bg-white"
                >
                  Listings
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6">
                  <StatsCard
                    icon={DollarSign}
                    title="Total Revenue"
                    value="$1,159.14"
                    change="+12.5%"
                    trend="up"
                    subtitle="Last 7 days"
                  />
                  <StatsCard
                    icon={ShoppingBag}
                    title="Total Orders"
                    value="156"
                    change="+8.2%"
                    trend="up"
                    subtitle="Last 7 days"
                  />
                  <StatsCard
                    icon={Eye}
                    title="Product Views"
                    value="2,014"
                    change="+23.1%"
                    trend="up"
                    subtitle="Last 7 days"
                  />
                  <StatsCard
                    icon={Package}
                    title="Active Listings"
                    value="12"
                    change="-2"
                    trend="down"
                    subtitle="3 low stock"
                  />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Revenue Chart */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-slate-900 font-semibold">
                          Revenue Overview
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                          Daily revenue for the past week
                        </p>
                      </div>
                    </div>
                    <ChartContainer
                      config={revenueChartConfig}
                      className="h-[280px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="day"
                            stroke="#94a3b8"
                            style={{ fontSize: "12px" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#94a3b8"
                            style={{ fontSize: "12px" }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar
                            dataKey="revenue"
                            fill="#3b82f6"
                            radius={[8, 8, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Monthly Growth */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-slate-900 font-semibold">
                          Monthly Growth
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                          Revenue trend over 6 months
                        </p>
                      </div>
                    </div>
                    <ChartContainer
                      config={revenueChartConfig}
                      className="h-[280px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#94a3b8"
                            style={{ fontSize: "12px" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#94a3b8"
                            style={{ fontSize: "12px" }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: "#3b82f6", r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-slate-900 font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <ActivityItem
                      icon={ShoppingBag}
                      title="New order received"
                      description="2 dozen Farm Eggs ordered by John Smith"
                      time="5 minutes ago"
                      iconColor="bg-green-100 text-green-600"
                    />
                    <ActivityItem
                      icon={Package}
                      title="Low stock alert"
                      description="Sweet Corn has only 8 lbs remaining"
                      time="2 hours ago"
                      iconColor="bg-amber-100 text-amber-600"
                    />
                    <ActivityItem
                      icon={MessageSquare}
                      title="New message"
                      description="Customer inquiry about Organic Tomatoes"
                      time="3 hours ago"
                      iconColor="bg-blue-100 text-blue-600"
                    />
                    <ActivityItem
                      icon={TrendingUp}
                      title="Product trending"
                      description="Farm Eggs views increased by 45% this week"
                      time="1 day ago"
                      iconColor="bg-purple-100 text-purple-600"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6 space-y-6">
                {/* Analytics Header & Timeframe Filter */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-slate-900 font-bold text-lg sm:text-xl">
                        Farm Analytics & Performance
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live Storefront Synced
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      Real-time sales velocity, produce distribution, customer retention, and harvest fulfillment
                    </p>
                  </div>

                  {/* Timeframe selector pills */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                    {(
                      [
                        { id: "7d", label: "Last 7 Days" },
                        { id: "30d", label: "Last 30 Days" },
                        { id: "90d", label: "Quarter" },
                        { id: "ytd", label: "Year to Date" },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setAnalyticsTimeframe(t.id)}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                          analyticsTimeframe === t.id
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Executive KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <StatsCard
                    icon={DollarSign}
                    title="Total Gross Revenue"
                    value="$5,480.20"
                    change="+18.4%"
                    trend="up"
                    subtitle="vs previous 7 days"
                  />
                  <StatsCard
                    icon={ShoppingBag}
                    title="Average Basket Size"
                    value="$45.20"
                    change="+5.2%"
                    trend="up"
                    subtitle="Avg items per order: 3.8"
                  />
                  <StatsCard
                    icon={Users}
                    title="Customer Repeat Rate"
                    value="48.6%"
                    change="+7.3%"
                    trend="up"
                    subtitle="89 repeat farm buyers"
                  />
                  <StatsCard
                    icon={CheckCircle2}
                    title="Harvest Sell-Through"
                    value="96.4%"
                    change="-1.2%"
                    trend="up"
                    subtitle="Minimal 3.6% waste rate"
                  />
                </div>

                {/* Conversion Funnel Banner */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 rounded-xl border border-blue-100/60 p-5">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-semibold text-sm">
                          Marketplace Sales Funnel
                        </h4>
                        <p className="text-slate-500 text-xs">
                          Product impressions converting directly to completed farm pickups
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-6 text-center w-full sm:w-auto justify-around">
                      <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500">Storefront Views</p>
                        <p className="text-base font-bold text-slate-900">2,014</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500">Baskets (23.9%)</p>
                        <p className="text-base font-bold text-blue-600">482</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500">Orders (32.4%)</p>
                        <p className="text-base font-bold text-emerald-600">156</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Visuals: Revenue & Views Chart + Category Sales Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue vs Views Trend */}
                  <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                      <div>
                        <h3 className="text-slate-900 font-semibold text-base sm:text-lg">
                          Revenue & Storefront Traffic Trends
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                          Daily revenue ($) aligned with consumer impressions
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          Revenue ($)
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-purple-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                          Views
                        </span>
                      </div>
                    </div>

                    <ChartContainer
                      config={{
                        revenue: { label: "Revenue ($)", color: "#10b981" },
                        views: { label: "Views", color: "#8b5cf6" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="day"
                            stroke="#94a3b8"
                            style={{ fontSize: "12px" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#94a3b8"
                            style={{ fontSize: "12px" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.15}
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="views"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.15}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Category Breakdown */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-slate-900 font-semibold text-base">
                          Sales by Category
                        </h4>
                        <Badge variant="outline" className="text-xs font-normal border-slate-200">
                          $5,480.20 Total
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-xs mb-5">
                        Proportion of sales across primary farm product types
                      </p>

                      <div className="space-y-4">
                        {categorySalesData.map((cat) => (
                          <div key={cat.name} className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-medium text-slate-700 flex items-center gap-1.5">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: cat.dotColor }}
                                ></span>
                                {cat.name}
                              </span>
                              <span className="font-semibold text-slate-900">
                                ${cat.sales.toFixed(2)} ({cat.percentage}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${cat.color} rounded-full`}
                                style={{ width: `${cat.percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate">
                              {cat.items}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Top Performer:</span>
                      <span className="font-semibold text-emerald-700">
                        Organic Field Vegetables (40%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product, Customer & Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-slate-900 text-sm font-semibold">
                        Top Products by Revenue
                      </h4>
                      <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">
                        This Week
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <ProductBar
                        title="Farm Eggs"
                        value={401.33}
                        max={500}
                        color="bg-blue-500"
                      />
                      <ProductBar
                        title="Organic Honey"
                        value={441.66}
                        max={500}
                        color="bg-purple-500"
                      />
                      <ProductBar
                        title="Organic Tomatoes"
                        value={139.72}
                        max={500}
                        color="bg-emerald-500"
                      />
                      <ProductBar
                        title="Fresh Romaine Lettuce"
                        value={134.55}
                        max={500}
                        color="bg-amber-500"
                      />
                      <ProductBar
                        title="Field Strawberries"
                        value={210.80}
                        max={500}
                        color="bg-rose-500"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-slate-900 text-sm font-semibold">
                        Customer Insights
                      </h4>
                      <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs">
                        +8.2% Growth
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <InsightRow label="Total Unique Customers" value="234" />
                      <InsightRow label="Repeat Loyal Buyers" value="89 (38.0%)" />
                      <InsightRow label="New Customers This Week" value="12" />
                      <InsightRow label="Average Order Value" value="$45.20" />
                      <InsightRow label="Avg Customer Lifetime Value" value="$148.60" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-slate-900 text-sm font-semibold">
                        Operational Metrics
                      </h4>
                      <Badge className="bg-purple-50 text-purple-700 border-0 text-xs">
                        High Reliability
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <InsightRow label="Storefront Conversion Rate" value="12.4%" />
                      <InsightRow label="Avg Inquiry Response Time" value="2.3 hrs" />
                      <InsightRow label="Customer Rating" value="4.8 / 5.0" />
                      <InsightRow label="Order Fulfillment Accuracy" value="98.5%" />
                      <InsightRow label="On-Time Harvest Prep" value="99.2%" />
                    </div>
                  </div>
                </div>

                {/* Operations & Logistics: Fulfillment Channels & Peak Hours */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Fulfillment Channels */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-slate-900 font-semibold text-base">
                          Fulfillment & Distribution Methods
                        </h4>
                        <p className="text-slate-500 text-xs mt-0.5">
                          How buyers receive fresh farm produce
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Truck className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-4 mt-5">
                      {fulfillmentData.map((f) => (
                        <div
                          key={f.method}
                          className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 space-y-2"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-800">
                              {f.method}
                            </span>
                            <span className="font-bold text-slate-900">
                              {f.percentage}% ({f.count})
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${f.percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center text-[11px] text-slate-500">
                            <span>{f.badge}</span>
                            <span className="font-medium text-emerald-700">
                              {f.speed}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Peak Ordering Hours */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-slate-900 font-semibold text-base">
                            Peak Order & Harvest Schedule
                          </h4>
                          <p className="text-slate-500 text-xs mt-0.5">
                            Customer order traffic distribution across time windows
                          </p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="space-y-3.5 mt-5">
                        {peakHoursData.map((p) => (
                          <div key={p.time} className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-medium text-slate-800">
                                {p.time}
                              </span>
                              <span className="font-semibold text-blue-600">
                                {p.percent}% • {p.orders}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${p.percent}%` }}
                              ></div>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              {p.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-blue-800 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Harvest Advisory:</strong> Friday afternoon packing covers 78% of Saturday morning farm stand and pre-order pickups.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inventory Health & Stock Velocity Monitor */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                    <div>
                      <h4 className="text-slate-900 font-semibold text-base">
                        Inventory Velocity & Perishability Monitor
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                        Daily consumption rate, remaining stock, and harvest replenishment guidance
                      </p>
                    </div>
                    <Badge variant="outline" className="border-slate-200 text-slate-600 text-xs">
                      Auto-Calculated Velocity
                    </Badge>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="pb-3 font-medium">Produce Item</th>
                          <th className="pb-3 font-medium">Daily Velocity</th>
                          <th className="pb-3 font-medium">Current Stock</th>
                          <th className="pb-3 font-medium">Days Supply</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium text-right">Harvest Guidance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {inventoryVelocityData.map((item) => (
                          <tr key={item.name} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3.5 font-medium text-slate-900">
                              {item.name}
                            </td>
                            <td className="py-3.5 text-slate-600">
                              {item.velocity}
                            </td>
                            <td className="py-3.5 font-semibold text-slate-900">
                              {item.stock}
                            </td>
                            <td className="py-3.5 text-slate-600">
                              {item.daysSupply}
                            </td>
                            <td className="py-3.5">
                              <span
                                className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${item.badgeClass}`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-slate-500 text-right text-xs">
                              {item.harvestAlert}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Customer Reviews & Feedback Intelligence */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Rating Breakdown */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-slate-900 font-semibold text-base">
                        Customer Rating
                      </h4>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-900 text-sm">4.8</span>
                        <span className="text-slate-400 text-xs">/ 5.0</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs mb-4">
                      Based on 158 verified customer purchases
                    </p>

                    <div className="space-y-2">
                      {ratingsDistribution.map((r) => (
                        <div key={r.stars} className="flex items-center gap-2 text-xs">
                          <span className="w-14 text-slate-600 shrink-0">
                            {r.stars}
                          </span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${r.percentage}%` }}
                            ></div>
                          </div>
                          <span className="w-10 text-right text-slate-500">
                            {r.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Sentiment Highlights */}
                  <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-slate-900 font-semibold text-base">
                          Customer Sentiment & Praise
                        </h4>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          98% Positive Sentiment
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mb-4">
                        Most common keywords and compliments left by local community buyers
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full cursor-default">
                          🌱 #UltraFreshProduce (94)
                        </span>
                        <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full cursor-default">
                          🍓 #SweetStrawberries (78)
                        </span>
                        <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full cursor-default">
                          📦 #EcoPackaging (62)
                        </span>
                        <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full cursor-default">
                          🤝 #FriendlyFarmer (51)
                        </span>
                        <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full cursor-default">
                          ⚡ #FastPickup (43)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <p className="text-xs text-slate-700 italic">
                        &ldquo;The farm eggs and wildflower honey are unmatched in quality. You can literally taste the freshness compared to supermarket items. Love supporting our local farm!&rdquo;
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-medium text-slate-700">— Local Customer (Montreal, QC)</span>
                        <span>Verified Farm Stand Buyer • 2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Listings Tab */}
              <TabsContent value="listings" className="mt-6">
                  <div className="bg-white rounded-xl border border-slate-200">
                    {/* Table Header */}
                    <div className="p-4 sm:p-6 border-b border-slate-200">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
                        <div>
                          <h3 className="text-slate-900 font-semibold text-base sm:text-lg">
                            Product Listings
                          </h3>
                          <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Manage all your products and inventory
                          </p>
                        </div>
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                              placeholder="Search products..."
                              className="pl-10 w-full sm:w-64 border-slate-200"
                            />
                          </div>
                          <Button
                            variant="outline"
                            className="border-slate-200 text-xs sm:text-base"
                          >
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Responsive Table Wrapper */}
                    <div className="overflow-x-auto">
                      <Table className="min-w-[700px]">
                        <TableHeader>
                          <TableRow className="border-slate-200 hover:bg-slate-50">
                            <TableHead className="text-slate-600">
                              Product
                            </TableHead>
                            <TableHead className="text-slate-600">
                              Status
                            </TableHead>
                            <TableHead className="text-slate-600">
                              Price
                            </TableHead>
                            <TableHead className="text-slate-600">
                              Stock
                            </TableHead>
                            <TableHead className="text-slate-600">
                              Views
                            </TableHead>
                            <TableHead className="text-slate-600">
                              Sales
                            </TableHead>
                            <TableHead className="text-slate-600">
                              Revenue
                            </TableHead>
                            <TableHead className="text-slate-600">
                              Last Updated
                            </TableHead>
                            <TableHead className="text-right text-slate-600">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {safeListings.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={9}
                                className="text-center py-8 text-slate-500"
                              >
                                No listings yet. Click &quot;New Listing&quot; to create one.
                              </TableCell>
                            </TableRow>
                          ) : (
                            safeListings.map((listing) => (
                              <TableRow
                                key={listing.id}
                                className="border-slate-200 hover:bg-slate-50 text-xs sm:text-sm"
                              >
                              <TableCell className="font-medium text-slate-900 whitespace-nowrap">
                                {listing.name}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    listing.status === "active"
                                      ? "bg-green-100 text-green-700 border-0 hover:bg-green-100"
                                      : "bg-amber-100 text-amber-700 border-0 hover:bg-amber-100"
                                  }
                                >
                                  {listing.status === "active"
                                    ? "Active"
                                    : "Low Stock"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-slate-700 whitespace-nowrap">
                                {listing.price}
                              </TableCell>
                              <TableCell className="text-slate-700 whitespace-nowrap">
                                {listing.stock}
                              </TableCell>
                              <TableCell className="text-slate-700 whitespace-nowrap">
                                {listing.views}
                              </TableCell>
                              <TableCell className="text-slate-700 whitespace-nowrap">
                                {listing.sales}
                              </TableCell>
                              <TableCell className="text-slate-900 font-medium whitespace-nowrap">
                                {listing.revenue}
                              </TableCell>
                              <TableCell className="text-slate-500 text-xs sm:text-sm whitespace-nowrap">
                                {listing.updated_at}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleEditListing(listing as Listing)
                                      }
                                    >
                                      <Edit className="w-4 h-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        if (listing.slug) {
                                          router.push(
                                            `/product/${listing.slug}`
                                          );
                                        }
                                      }}
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeleteClick(listing as Listing)
                                      }
                                      className="text-red-600"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden p-2 space-y-4">
                      {safeListings.length === 0 ? (
                        <div className="text-center py-6 text-slate-500 text-sm">
                          No listings yet. Click &quot;New Listing&quot; to create one.
                        </div>
                      ) : (
                        safeListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="border rounded-lg p-4 flex flex-col gap-2 bg-slate-50"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-900">
                              {listing.name}
                            </span>
                            <Badge
                              className={
                                listing.status === "active"
                                  ? "bg-green-100 text-green-700 border-0 hover:bg-green-100"
                                  : "bg-amber-100 text-amber-700 border-0 hover:bg-amber-100"
                              }
                            >
                              {listing.status === "active"
                                ? "Active"
                                : "Low Stock"}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700">
                            <span>
                              Price:{" "}
                              <span className="font-medium">
                                {listing.price}
                              </span>
                            </span>
                            <span>
                              Stock:{" "}
                              <span className="font-medium">
                                {listing.stock}
                              </span>
                            </span>
                            <span>
                              Views:{" "}
                              <span className="font-medium">
                                {listing.views}
                              </span>
                            </span>
                            <span>
                              Sales:{" "}
                              <span className="font-medium">
                                {listing.sales}
                              </span>
                            </span>
                            <span>
                              Revenue:{" "}
                              <span className="font-medium">
                                {listing.revenue}
                              </span>
                            </span>
                          </div>
                          <div className="text-slate-500 text-xs">
                            Last Updated: {listing.updated_at}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs px-2 py-1"
                              onClick={() =>
                                handleEditListing(listing as Listing)
                              }
                            >
                              <Edit className="w-4 h-4 mr-1" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs px-2 py-1"
                              onClick={() =>
                                listing.slug &&
                                router.push(`/product/${listing.slug}`)
                              }
                            >
                              <Eye className="w-4 h-4 mr-1" /> View
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="text-xs px-2 py-1"
                              onClick={() =>
                                handleDeleteClick(listing as Listing)
                              }
                            >
                              <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      )))}
                    </div>
                  </div>
                </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* My Listing Dialog */}
      <MyListingDialog
        open={listingDialogOpen}
        onOpenChange={setListingDialogOpen}
        listing={selectedListing}
        onSave={handleSaveListing}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">
              Delete Listing
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Are you sure you want to delete &quot;{listingToDelete?.name}
              &quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
