// hooks/useCart.ts
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Cart, CartItem } from "@/app/api/cart/dto/cart.dto";
import { Product } from "@/app/api/product/dto/create-product.dto";

export function useCart() {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    itemCount: 0,
  });
  const [loading, setLoading] = useState(false);

  // Load cart on mount and when auth state changes
  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

  const loadCart = async () => {
    if (isAuthenticated && user) {
      await loadCartFromAPI();
    } else {
      loadCartFromLocalStorage();
    }
  };

  const loadCartFromLocalStorage = () => {
    const saved = localStorage.getItem("guest-cart");
    if (saved) {
      try {
        const cartData = JSON.parse(saved);
        setCart(calculateCartTotals(cartData));
      } catch (error) {
        // console.error removed
        localStorage.removeItem("guest-cart");
      }
    }
  };

  const loadCartFromAPI = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const cartData = await response.json();
        setCart(calculateCartTotals(cartData));
      }
    } catch (error) {
      // console.error removed
    }
  };

  const saveCartToLocalStorage = (cart: Cart) => {
    localStorage.setItem("guest-cart", JSON.stringify(cart));
  };

  const calculateCartTotals = (cart: Cart): Cart => {
    const totalPrice = cart.items.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return { ...cart, totalPrice, itemCount };
  };

  const addToCart = async (productId: string, product?: Product) => {
    setLoading(true);

    // Optimistic update
    const currentCart = { ...cart };
    const existingItem = currentCart.items.find(
      (item) => item.product_id === productId // ← FIXED: product_id
    );

    let newCart: Cart;
    if (existingItem) {
      newCart = {
        ...currentCart,
        items: currentCart.items.map((item) =>
          item.product_id === productId // ← FIXED: product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      newCart = {
        ...currentCart,
        items: [
          ...currentCart.items,
          {
            product_id: productId, // ← FIXED: product_id
            quantity: 1,
            product,
          },
        ],
      };
    }

    newCart = calculateCartTotals(newCart);
    setCart(newCart);

    try {
      if (isAuthenticated) {
        // Save to API - note: API might expect productId, but DTO uses product_id
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId, quantity: 1 }), // Keep as productId for API
        });
      } else {
        // Save to localStorage
        saveCartToLocalStorage(newCart);
      }
    } catch (error) {
      // Rollback on error
      setCart(currentCart);
      // console.error removed
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setLoading(true);
    const currentCart = { ...cart };

    // Optimistic update
    const newCart = {
      ...currentCart,
      items: currentCart.items.map(
        (item) => (item.product_id === productId ? { ...item, quantity } : item) // ← FIXED: product_id
      ),
    };

    setCart(calculateCartTotals(newCart));

    try {
      if (isAuthenticated) {
        await fetch("/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId, quantity }), // Keep as productId for API
        });
      } else {
        saveCartToLocalStorage(newCart);
      }
    } catch (error) {
      setCart(currentCart);
      // console.error removed
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    const currentCart = { ...cart };

    // Optimistic update
    const newCart = {
      ...currentCart,
      items: currentCart.items.filter((item) => item.product_id !== productId), // ← FIXED: product_id
    };

    setCart(calculateCartTotals(newCart));

    try {
      if (isAuthenticated) {
        await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }), // Keep as productId for API
        });
      } else {
        saveCartToLocalStorage(newCart);
      }
    } catch (error) {
      setCart(currentCart);
      // console.error removed
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    const currentCart = { ...cart };

    // Optimistic update
    const newCart = { items: [], totalPrice: 0, itemCount: 0 };
    setCart(newCart);

    try {
      if (isAuthenticated) {
        await fetch("/api/cart/clear", { method: "DELETE" });
      } else {
        localStorage.removeItem("guest-cart");
      }
    } catch (error) {
      setCart(currentCart);
      // console.error removed
    } finally {
      setLoading(false);
    }
  };

  // Sync guest cart to user cart on login
  useEffect(() => {
    if (isAuthenticated && user) {
      syncGuestCartToAPI();
    }
  }, [isAuthenticated, user]);

  const syncGuestCartToAPI = async () => {
    const guestCart = localStorage.getItem("guest-cart");
    if (guestCart) {
      try {
        const cartData = JSON.parse(guestCart);

        // Add each item to API cart
        for (const item of cartData.items) {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: item.product_id, // ← FIXED: map product_id to productId for API
              quantity: item.quantity,
            }),
          });
        }

        // Clear guest cart
        localStorage.removeItem("guest-cart");
        // Reload from API
        await loadCartFromAPI();
      } catch (error) {
        // console.error removed
      }
    }
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
  };
}
