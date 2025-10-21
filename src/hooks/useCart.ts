"use client";

import { useEffect, useState } from "react";
import { Cart, CartItem } from "@/app/api/cart/dto/cart.dto";

export function useCart() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    itemCount: 0,
  });

  useEffect(() => {}, [isLoggedIn]);
}
