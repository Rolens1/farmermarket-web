import { Button } from "./ui/button";
import { ImageWithFallback } from "./helper/ImageWithFallback";
import { Product } from "@/app/api/product/dto/create-product.dto";
import { MapPin } from "lucide-react";

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
  const images = Array.isArray(product.image)
    ? product.image
    : product.image
    ? [product.image]
    : [];
  const secondaryImages = images.slice(1);
  const categoryKey = (product.category ?? "").toLowerCase();
  const categoryEmoji = CATEGORY_EMOJI[categoryKey];

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer flex flex-col h-full">
      <div className="aspect-[4/3] overflow-hidden relative" onClick={onClick}>
        <ImageWithFallback
          src={images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-foreground shadow-sm">
            {categoryEmoji ? `${categoryEmoji} ` : ""}
            {product.category}
          </span>
        )}
      </div>
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
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-foreground text-base sm:text-lg font-semibold line-clamp-2">
            {product.name}
          </h3>
          <span className="text-primary text-sm sm:text-base font-semibold whitespace-nowrap ml-2">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3 truncate">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">
            {(product as any).distance ? `${(product as any).distance} mi • ` : ""}
            {(product as any).farmName || "Local Farmstead"}
          </span>
        </div>
        <Button
          className="w-full rounded-full bg-primary hover:bg-primary/90 mt-auto text-xs sm:text-base py-2 sm:py-3"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart(product);
          }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
