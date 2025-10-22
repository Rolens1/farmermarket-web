// components/CartIcon.tsx
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function CartIcon() {
  const { cart } = useCart();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {cart.itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cart.itemCount}
        </span>
      )}
    </Link>
  );
}
