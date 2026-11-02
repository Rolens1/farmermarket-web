/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { addToCart, loading: cartLoading } = useCart();

  // Filter products that match saved favorite IDs or slugs
  const favoriteProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) =>
        favorites.includes(String(p.id)) ||
        (p.slug && favorites.includes(p.slug))
    );
  }, [favorites]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <Link
            href="/browse"
            className="text-xs text-primary font-semibold hover:underline"
          >
            Browse all produce
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center shadow-xs">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Your Saved Favorites
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                Quickly reorder and review your favorite seasonal farm goods
              </p>
            </div>
          </div>

          {favoriteProducts.length > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 self-start sm:self-auto">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? "item" : "items"} saved
            </span>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.slug || product.id}
                product={product as any}
                onClick={() => router.push(`/product/${product.slug || product.id}`)}
                onAddToCart={(prod) => addToCart(prod.id, prod)}
                loading={cartLoading}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Your Favorites List is Empty"
            description="You have not saved any produce yet. Click the heart icon on any product card or detail page to bookmark your favorite items here."
            actionText="Discover Fresh Produce"
            actionHref="/browse"
            icon={Heart}
          />
        )}
      </div>
    </div>
  );
}

