"use client";

import { Leaf, Apple, Beef, Droplet, Flower, Milk } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "@/components/helper/ImageWithFallback";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const router = useRouter();
  const categories = [
    { icon: Leaf, label: "Vegetables" },
    { icon: Apple, label: "Fruits" },
    { icon: Milk, label: "Dairy" },
    { icon: Beef, label: "Meat" },
    { icon: Droplet, label: "Honey" },
    { icon: Flower, label: "Flowers" },
  ];
  const recentProducts = [
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
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Text and Search */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl text-foreground leading-tight">
                Buy fresh produce directly from local farmers.
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with nearby farmers and get the freshest produce
                delivered to your door.
              </p>
            </div>
            <SearchBar onSearch={() => router.push("/browse")} />
          </div>
          {/* Right Side */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1747503331142-27f458a1498c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwbWFya2V0JTIwZnJlc2glMjBwcm9kdWNlfGVufDF8fHx8MTc1OTczMjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fresh farmers market produce"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-16">
        <h2 className="text-foreground mb-8">Top Categories</h2>
        <div className="grid grid-cols-6 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.label}
              icon={category.icon}
              label={category.label}
              onClick={() => router.push("/browse")}
            />
          ))}
        </div>
      </section>

      {/* Recent Products Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-foreground">Recently Added</h2>
          <button
            onClick={() => router.push("/browse")}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {/* Horizontal scrollable list after it should push to product ID or slug */}
          {recentProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              onClick={() => router.push(`/product/${product.name}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
