/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/app/api/cart/dto/cart.dto";

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

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(productId, product);
    setIsAdding(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || isAdding}
      className={`bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
