/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Leaf, Apple, Beef, Droplet, Flower, Milk } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "@/components/helper/ImageWithFallback";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { get } from "./api/fetch.api";

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
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await get("/products/s?take=4&sort=created_at:desc");
        const products = (res && res.products ? res.products : []).slice(0, 4);
        setRecentProducts(products);
      } catch {
        setRecentProducts([]);
      }
    };
    fetchRecent();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Side - Text and Search */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
                Buy fresh produce directly from local farmers.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                Connect with nearby farmers and get the freshest produce
                delivered to your door.
              </p>
            </div>
            <SearchBar
              onSearch={(query) => {
                if (query && query.trim()) {
                  router.push(
                    `/browse?query=${encodeURIComponent(query.trim())}`
                  );
                } else {
                  router.push("/browse");
                }
              }}
            />
          </div>
          {/* Right Side - Hero Image */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl mt-8 md:mt-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1747503331142-27f458a1498c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwbWFya2V0JTIwZnJlc2glMjBwcm9kdWNlfGVufDF8fHx8MTc1OTczMjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fresh farmers market produce"
              className="w-full h-48 sm:h-72 md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Responsive Categories Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <h2 className="text-foreground mb-6 sm:mb-8 text-xl sm:text-2xl">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.label}
              icon={category.icon}
              label={category.label}
              onClick={() =>
                router.push(
                  `/browse?category=${encodeURIComponent(
                    category.label.toLowerCase()
                  )}`
                )
              }
            />
          ))}
        </div>
      </section>

      {/* Responsive Recent Products Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
          <h2 className="text-foreground text-xl sm:text-2xl mb-4 sm:mb-0">
            Recently Added
          </h2>
          <button
            onClick={() => router.push("/browse")}
            className="text-primary hover:text-primary/80 transition-colors text-base sm:text-lg"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {recentProducts.map((product) => (
            <ProductCard
              key={product.slug || product.id || product.name}
              product={product}
              onClick={() =>
                router.push(
                  `/product/${product.slug || product.id || product.name}`
                )
              }
              onAddToCart={() => addToCart(product.slug || product.id, product)}
              loading={cartLoading}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
