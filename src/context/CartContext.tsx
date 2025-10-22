"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Cart, CartItem } from "@/app/api/cart/dto/cart.dto";
import { Product } from "@/app/api/product/dto/create-product.dto";
// import { getCart, removeCartItem, updateCartItem } from "@/app/api/cart/cart";

interface CartContextType {
  cart: Cart;
  addToCart: (
    productId: string,
    product?: CartItem["product"]
  ) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    itemCount: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  // const loadCart = async () => {
  //   if (isAuthenticated && user) {
  //     await loadCartFromAPI();
  //   } else {
  //     loadCartFromLocalStorage();
  //   }
  // };

  const loadCartFromLocalStorage = () => {
    const saved = localStorage.getItem("guest-cart");
    if (saved) {
      const cartData = JSON.parse(saved);
      setCart(calculateCartTotals(cartData));
    } else {
      setCart({ items: [], totalPrice: 0, itemCount: 0 });
    }
  };

  // const loadCartFromAPI = async () => {
  //   try {
  //     let items = await getCart();
  //     // Normalize product_id to productId for frontend consistency
  //     items = items.map((item: any) => ({
  //       ...item,
  //       productId: item.productId || item.product_id,
  //     }));
  //     setCart(calculateCartTotals({ items, totalPrice: 0, itemCount: 0 }));
  //   } catch (error) {
  //     setCart({ items: [], totalPrice: 0, itemCount: 0 });
  //     console.error("Failed to load cart from API:", error);
  //   }
  // };

  const saveCartToLocalStorage = (cart: Cart) => {
    localStorage.setItem("guest-cart", JSON.stringify(cart));
  };

  const calculateCartTotals = (cart: Cart): Cart => {
    const items = Array.isArray(cart.items) ? cart.items : [];
    const totalPrice = items.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { ...cart, items, totalPrice, itemCount };
  };

  const addToCart = async (productId: string, product?: Product) => {
    if (!productId) {
      // console.error removed
      return;
    }
    setLoading(true);
    const currentCart = { ...cart };
    const existingItem = currentCart.items.find(
      (item) => item.product_id === productId
    );
    let newCart: Cart;
    if (existingItem) {
      newCart = {
        ...currentCart,
        items: currentCart.items.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      newCart = {
        ...currentCart,
        items: [
          ...currentCart.items,
          { product_id: productId, quantity: 1, product },
        ],
      };
    }
    newCart = calculateCartTotals(newCart);
    setCart(newCart);
    try {
      saveCartToLocalStorage(newCart);
    } catch (error) {
      setCart(currentCart);
      // console.error removed
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!productId) {
      // console.error removed
      return;
    }
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setLoading(true);
    const currentCart = { ...cart };
    const newCart = {
      ...currentCart,
      items: currentCart.items.map((item) => {
        if (item.product_id === productId) {
          return { ...item, quantity };
        }
        return item;
      }),
    };
    setCart(calculateCartTotals(newCart));
    try {
      saveCartToLocalStorage(newCart);
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
    const newCart = {
      ...currentCart,
      items: currentCart.items.filter((item) => item.product_id !== productId),
    };
    setCart(calculateCartTotals(newCart));
    try {
      saveCartToLocalStorage(newCart);
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
    const newCart = { items: [], totalPrice: 0, itemCount: 0 };
    setCart(newCart as Cart);
    try {
      localStorage.removeItem("guest-cart");
    } catch (error) {
      setCart(currentCart);
      // console.error removed
    } finally {
      setLoading(false);
    }
  };

  // All cart logic is now local only; no sync to API.

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
