import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./helper/ImageWithFallback";

interface ProductCardProps {
  image?: string;
  name?: string;
  price?: string | number;
  seller?: string;
  distance?: string;
  location?: string;
}

export function ProductCard({
  product,
  onClick,
}: {
  product: ProductCardProps;
  onClick: () => void;
}) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer">
      <div className="aspect-[4/3] overflow-hidden" onClick={onClick}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-foreground">{product.name}</h3>
          <span className="text-primary">{product.price}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <span>{product.seller}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{product.distance}</span>
          </div>
        </div>
        <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
          Reserve
        </Button>
      </div>
    </div>
  );
}
