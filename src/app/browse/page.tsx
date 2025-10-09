"use client";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "@/components/FilterSideBar";
import { ProductBar } from "@/components/ui/product-bar";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { useRouter } from "next/navigation";

export default function BrowsePage() {
  const router = useRouter();
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwb3JnYW5pY3xlbnwxfHx8fDE3NTk4MDgzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Organic Tomatoes",
      price: "$4.99/lb",
      seller: "Green Valley Farm",
      distance: "2.3 mi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1604337214275-86010944959d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTgwODM0MXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Mixed Vegetables",
      price: "$6.50/lb",
      seller: "Harvest Hills",
      distance: "3.1 mi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGJhc2tldHxlbnwxfHx8fDE3NTk4MDgzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Fresh Fruit Basket",
      price: "$12.99",
      seller: "Orchard Delight",
      distance: "4.5 mi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1655169947079-5b2a38815147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphciUyMG5hdHVyYWx8ZW58MXx8fHwxNzU5NzYzMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Raw Wildflower Honey",
      price: "$8.99/jar",
      seller: "Bee Happy Farm",
      distance: "5.2 mi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1663566869071-6c926e373515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMHByb2R1Y3RzJTIwbWlsayUyMGNoZWVzZXxlbnwxfHx8fDE3NTk3OTg4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Artisan Cheese",
      price: "$9.99/lb",
      seller: "Meadow Dairy",
      distance: "1.8 mi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1759149936721-19b7684477fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkZmxvd2VycyUyMGJvdXF1ZXQlMjBmcmVzaHxlbnwxfHx8fDE3NTk4MDgzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Wildflower Bouquet",
      price: "$15.99",
      seller: "Petal Perfect",
      distance: "6.1 mi",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search for products..."
                className="rounded-full border-border"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] rounded-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
                <SelectItem value="honey">Honey</SelectItem>
                <SelectItem value="flowers">Flowers</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="freshness">
              <SelectTrigger className="w-[200px] rounded-full">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshness">Freshness</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-foreground">
                Showing {products.length} products
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onClick={() => router.push(`/product/${product.name}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-12">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-full ${
                    page === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-secondary"
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
