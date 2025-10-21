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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
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
    console.log("New Listing button clicked"); // Debug log
    setSelectedListing(null);
    setListingDialogOpen(true);
  };

  const handleEditListing = (listing: Listing) => {
    setSelectedListing(listing);
    setListingDialogOpen(true);
  };

  const [currentListings, setCurrentListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getUserProducts();
        console.log("User products fetched:", response);
        setCurrentListings(response);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const handleSaveListing = (listingData: Partial<Listing>) => {
    if (listingData.id) {
      // Update existing listing
      setCurrentListings((prev) =>
        prev.map((item) =>
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
        id: Math.max(...currentListings.map((l) => l.id)) + 1,
        name: listingData.name ?? "",
        category: listingData.category ?? "",
        description: listingData.description ?? "",
        status: listingData.status ?? "active",
        price: listingData.price ?? 0,
        unit: listingData.unit ?? "",
        stock: listingData.stock ?? 0,
        views: 0,
        sales: 0,
        revenue: "$0.00",
        updated_at: listingData.updated_at ?? "",
      };
      setCurrentListings((prev) => [...prev, newListing]);
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
    stock: number;
    views: number;
    sales: number;
    revenue: string;
    updated_at: string;
  };

  const handleDeleteClick = (listing: Listing) => {
    setListingToDelete(listing);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (listingToDelete) {
      setCurrentListings((prev) =>
        prev.filter((item) => item.id !== listingToDelete.id)
      );
      toast.success("Listing deleted successfully");
      deleteProduct(listingToDelete.id as unknown as string);
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen sticky top-0">
          <div className="p-6 border-b border-slate-200">
            {/** Name and Description */}
            <h2 className="text-slate-900 font-semibold">Green Valley Farm</h2>
            <p className="text-slate-500 text-sm mt-1">Farmer Dashboard</p>
          </div>

          <nav className="p-4">
            {/** Dashboard */}
            <button
              onClick={() => setSidebarOpen("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                sidebarOpen === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium text-sm">Dashboard</span>
            </button>

            {/** Listings */}
            <button
              onClick={() => setSidebarOpen("listings")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
                sidebarOpen === "listings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <List className="w-5 h-5" />
              <span className="font-medium text-sm">My Listings</span>
              <Badge className="ml-auto bg-slate-100 text-slate-700 border-0">
                {currentListings.length}
              </Badge>
            </button>

            {/** Messages */}
            <button
              onClick={() => setSidebarOpen("messages")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
                sidebarOpen === "messages"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium text-sm">Messages</span>
              <Badge className="ml-auto bg-red-100 text-red-700 border-0">
                3
              </Badge>
            </button>

            {/** Customers */}
            <button
              onClick={() => setSidebarOpen("customers")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mt-1 ${
                sidebarOpen === "customers"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium text-sm">Customers</span>
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
          <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-slate-900 font-semibold text-2xl">
                  Dashboard
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  Monitor your farm&rsquo;s performance and manage your listings
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={handleNewListing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Listing
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8">
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
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h4 className="text-slate-700 text-sm font-medium mb-4">
                      Top Products by Revenue
                    </h4>
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
                        color="bg-green-500"
                      />
                      <ProductBar
                        title="Fresh Lettuce"
                        value={134.55}
                        max={500}
                        color="bg-amber-500"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h4 className="text-slate-700 text-sm font-medium mb-4">
                      Customer Insights
                    </h4>
                    <div className="space-y-4">
                      <InsightRow label="Total Customers" value="234" />
                      <InsightRow label="Repeat Customers" value="89" />
                      <InsightRow label="New This Week" value="12" />
                      <InsightRow label="Avg. Order Value" value="$45.20" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h4 className="text-slate-700 text-sm font-medium mb-4">
                      Performance Metrics
                    </h4>
                    <div className="space-y-4">
                      <InsightRow label="Conversion Rate" value="12.4%" />
                      <InsightRow label="Avg. Response Time" value="2.3 hrs" />
                      <InsightRow label="Customer Rating" value="4.8/5.0" />
                      <InsightRow label="Fulfillment Rate" value="98.5%" />
                    </div>
                  </div>
                </div>

                {/* Views Chart */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-slate-900 font-semibold mb-6">
                    Weekly Product Views
                  </h3>
                  <ChartContainer
                    config={{ views: { label: "Views", color: "#8b5cf6" } }}
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
                          dataKey="views"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>

              {/* Listings Tab */}
              <TabsContent value="listings" className="mt-6">
                <div className="bg-white rounded-xl border border-slate-200">
                  {/* Table Header */}
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-slate-900 font-semibold">
                          Product Listings
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                          Manage all your products and inventory
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="Search products..."
                            className="pl-10 w-64 border-slate-200"
                          />
                        </div>
                        <Button variant="outline" className="border-slate-200">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 hover:bg-slate-50">
                        <TableHead className="text-slate-600">
                          Product
                        </TableHead>
                        <TableHead className="text-slate-600">Status</TableHead>
                        <TableHead className="text-slate-600">Price</TableHead>
                        <TableHead className="text-slate-600">Stock</TableHead>
                        <TableHead className="text-slate-600">Views</TableHead>
                        <TableHead className="text-slate-600">Sales</TableHead>
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
                      {currentListings.map((listing) => (
                        <TableRow
                          key={listing.id}
                          className="border-slate-200 hover:bg-slate-50"
                        >
                          <TableCell className="font-medium text-slate-900">
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
                          <TableCell className="text-slate-700">
                            {listing.price}
                          </TableCell>
                          <TableCell className="text-slate-700">
                            {listing.stock}
                          </TableCell>
                          <TableCell className="text-slate-700">
                            {listing.views}
                          </TableCell>
                          <TableCell className="text-slate-700">
                            {listing.sales}
                          </TableCell>
                          <TableCell className="text-slate-900 font-medium">
                            {listing.revenue}
                          </TableCell>
                          <TableCell className="text-slate-500 text-sm">
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
                                <DropdownMenuItem>
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
                      ))}
                    </TableBody>
                  </Table>
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
