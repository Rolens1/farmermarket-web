"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./helper/ImageWithFallback";
import { Product } from "@/app/api/product/dto/create-product.dto";
import { MapPin, Check, Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

const CATEGORY_EMOJI: Record<string, string> = {
  vegetables: "🥕",
  fruits: "🍓",
  dairy: "🧀",
  meat: "🥩",
  honey: "🍯",
  flowers: "🌸",
};

function formatPrice(price: number | string): string {
  return `$${Number(price).toFixed(2)}`;
}

export function ProductCard({
  product,
  onClick,
  onAddToCart,
  loading,
}: {
  product: Product;
  onClick?: () => void;
  onAddToCart?: (product: Product) => void;
  loading?: boolean;
}) {
  const [justAdded, setJustAdded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(product.id || product.slug);

  const images = Array.isArray(product.image)
    ? product.image
    : product.image
    ? [product.image]
    : [];
  const secondaryImages = images.slice(1);
  const categoryKey = (product.category ?? "").toLowerCase();
  const categoryEmoji = CATEGORY_EMOJI[categoryKey];

  // Farm producer info
  const sellerSlug = (product as any).sellerSlug || "ferme-maraichere-st-laurent";
  const farmName = (product as any).farmName || (product as any).sellerName || "Local Farmstead";
  const tags: string[] = (product as any).tags || ["Fresh Harvest", "Local"];

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id || product.slug, product.name);
  };

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer flex flex-col h-full relative">
      {/* Product Image & Badges */}
      <div className="aspect-[4/3] overflow-hidden relative" onClick={onClick}>
        <ImageWithFallback
          src={images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Pill */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-full text-foreground shadow-xs">
            {categoryEmoji ? `${categoryEmoji} ` : ""}
            {product.category}
          </span>
        )}

        {/* 1-Click Wishlist Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-xs ${
            isFav
              ? "bg-rose-50 text-rose-600 scale-110 shadow-md ring-2 ring-rose-300"
              : "bg-white/80 hover:bg-white text-slate-500 hover:text-rose-500 shadow-xs hover:scale-105"
          }`}
          title={isFav ? "Remove from favorites" : "Save to favorites"}
          aria-label="Toggle Wishlist Favorite"
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFav ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Secondary Thumbnail previews if present */}
      {secondaryImages.length > 0 && (
        <div className="flex gap-2 px-5 pt-2">
          {secondaryImages.map((img: string, idx: number) => (
            <ImageWithFallback
              key={idx}
              src={img}
              alt={product.name + " secondary " + (idx + 1)}
              className="w-12 h-12 object-cover rounded-lg border"
            />
          ))}
        </div>
      )}

      {/* Card Body */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="text-foreground text-base sm:text-lg font-semibold line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <span className="text-primary text-sm sm:text-base font-bold whitespace-nowrap ml-2">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Dietary & Farming Practice Badges */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Clickable Farm Producer Link */}
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3 truncate">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <Link
            href={`/seller/${sellerSlug}`}
            onClick={(e) => e.stopPropagation()}
            className="truncate hover:text-primary hover:underline transition-colors font-medium"
          >
            {(product as any).distance ? `${(product as any).distance} mi • ` : ""}
            {farmName}
          </Link>
        </div>

        {/* Add to Cart Button */}
        <Button
          className={`w-full rounded-full mt-auto text-xs sm:text-base py-2 sm:py-3 transition-all duration-300 active:scale-95 ${
            justAdded
              ? "bg-emerald-700 hover:bg-emerald-800 text-white scale-[1.02] shadow-md ring-2 ring-emerald-300/60"
              : "bg-primary hover:bg-primary/90 text-white"
          }`}
          onClick={handleAddClick}
          disabled={loading}
        >
          {justAdded ? (
            <span className="flex items-center gap-1.5 justify-center font-bold">
              <Check className="w-4 h-4 text-emerald-200" />
              Added!
            </span>
          ) : loading ? (
            "Adding..."
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
}
