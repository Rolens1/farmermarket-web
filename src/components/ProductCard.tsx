// import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./helper/ImageWithFallback";
import { Product } from "@/app/api/product/dto/create-product.dto";

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
  const mainImage = images[0] || "/placeholder.png";
  const secondaryImages = images.slice(1);
  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer flex flex-col h-full">
      <div className="aspect-[4/3] overflow-hidden" onClick={onClick}>
        <ImageWithFallback
          src={images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
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
          <span className="text-primary text-sm sm:text-base">
            {product.price}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          {/* Optionally show seller and distance if available */}
        </div>
        <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-xs sm:text-base py-2 sm:py-3">
          Reserve
        </Button>
        <Button
          className="w-full rounded-full bg-primary hover:bg-primary/90 mt-2 text-xs sm:text-base py-2 sm:py-3"
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
