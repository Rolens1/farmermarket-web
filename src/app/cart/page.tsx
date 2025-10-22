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

  if (cart.items.length === 0) {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <button
            onClick={clearCart}
            disabled={loading}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          {cart.items.map((item, index) => (
            <div
              key={item.product_id || index}
              className="flex items-center gap-4 border-b py-4"
            >
              <Image
                src={item.product?.image?.[0] || "/placeholder.png"}
                alt={item.product?.name || "Product Image"}
                className="w-20 h-20 object-cover rounded"
                width={80}
                height={80}
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product?.name}</h3>
                <p className="text-primary">${item.product?.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button disabled={loading} className="w-8 h-8 border rounded">
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {
                    console.log("Updating quantity for:", item.product_id);
                    updateQuantity(item.product_id, item.quantity + 1);
                  }}
                  disabled={loading}
                  className="w-8 h-8 border rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product_id)}
                disabled={loading}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items:</span>
            <span>{cart.itemCount}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary/90">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
