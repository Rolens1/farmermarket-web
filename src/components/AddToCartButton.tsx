/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/app/api/cart/dto/cart.dto";
import { Check } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  product?: CartItem["product"];
  className?: string;
}

export function AddToCartButton({
  productId,
  product,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart, loading } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(productId, product);
    setIsAdding(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || isAdding}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        justAdded
          ? "bg-emerald-700 text-white scale-[1.02] ring-2 ring-emerald-300/60 shadow-sm"
          : "bg-primary text-white hover:bg-primary/90"
      } ${className}`}
    >
      {justAdded ? (
        <span className="flex items-center justify-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-200" />
          Added!
        </span>
      ) : isAdding ? (
        "Adding..."
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}
