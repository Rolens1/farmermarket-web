// app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, loading } =
    useCart();
  // Debug: log cart items to check for missing productId
  // console.log("Cart items:", cart.items);

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/browse" className="text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 mb-6 lg:mb-0">
          <button
            onClick={clearCart}
            disabled={loading}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          {(cart?.items || []).map((item, index) => (
            <div
              key={item.product_id || index}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 border-b py-4"
            >
              <Image
                src={item.product?.image?.[0] || "/placeholder.png"}
                alt={item.product?.name || "Product Image"}
                className="w-20 h-20 object-cover rounded mb-2 sm:mb-0"
                width={80}
                height={80}
              />
              <div className="flex-1 w-full text-center sm:text-left">
                <h3 className="font-semibold text-base sm:text-lg">
                  {item.product?.name}
                </h3>
                <p className="text-primary text-sm sm:text-base">
                  ${item.product?.price}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product_id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  disabled={loading}
                  className="w-8 h-8 border rounded text-lg"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product_id, item.quantity + 1)
                  }
                  disabled={loading}
                  className="w-8 h-8 border rounded text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product_id)}
                disabled={loading}
                className="text-red-500 hover:text-red-700 ml-0 sm:ml-4 mt-2 sm:mt-0 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg h-fit w-full max-w-md mx-auto lg:mx-0">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between mb-1 sm:mb-2 text-sm sm:text-base">
            <span>Items:</span>
            <span>{cart.itemCount}</span>
          </div>
          <div className="flex justify-between font-bold text-base sm:text-lg mb-3 sm:mb-4">
            <span>Total:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary/90 text-base sm:text-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
