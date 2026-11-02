// app/cart/page.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  CheckCircle2,
  Download,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
  Printer,
  Sparkles,
  ShoppingBag,
  Leaf,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletedOrderData {
  orderId: string;
  date: string;
  items: any[];
  totalPrice: number;
  itemCount: number;
  customerEmail: string;
  cardholderName: string;
}

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, loading } =
    useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrderData | null>(null);

  // Simulated Stripe form state
  const [customerEmail, setCustomerEmail] = useState("alex.johnson@example.com");
  const [cardholderName, setCardholderName] = useState("Alex Johnson");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("123");
  const [postalCode, setPostalCode] = useState("H2X 1Y6");

  // Handle Checkout submission
  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 1.6s Stripe API charge & webhook confirmation
    setTimeout(() => {
      const orderData: CompletedOrderData = {
        orderId: `#FM-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        items: [...cart.items],
        totalPrice: cart.totalPrice,
        itemCount: cart.itemCount,
        customerEmail,
        cardholderName,
      };

      setCompletedOrder(orderData);
      clearCart();
      setIsProcessing(false);
      setCheckoutOpen(false);
    }, 1600);
  };

  // Download Invoice as an HTML/PDF printable file
  const handleDownloadInvoice = (order: CompletedOrderData) => {
    const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice ${order.orderId} - Farmers Market</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 40px; background: #fff; }
    .invoice-box { max-width: 800px; margin: auto; padding: 35px; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #5C8D4A; padding-bottom: 24px; margin-bottom: 25px; }
    .brand { font-size: 26px; font-weight: bold; color: #166534; display: flex; align-items: center; gap: 8px; }
    .badge { background: #dcfce7; color: #15803d; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 999px; }
    .meta { text-align: right; font-size: 13px; color: #64748b; line-height: 1.6; }
    .meta strong { color: #0f172a; font-size: 16px; }
    .details { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px; background: #f8fafc; padding: 18px; border-radius: 10px; }
    .details-col { width: 48%; }
    .details-col h4 { margin: 0 0 8px 0; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
    th { background: #f1f5f9; color: #475569; text-align: left; padding: 12px 14px; font-size: 13px; border-bottom: 1px solid #cbd5e1; font-weight: 600; }
    td { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
    .total-row { display: flex; justify-content: flex-end; }
    .total-table { width: 280px; font-size: 14px; }
    .total-table td { padding: 8px 10px; }
    .grand-total { font-size: 18px; font-weight: bold; color: #15803d; border-top: 2px solid #5C8D4A; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6; }
    @media print {
      body { padding: 0; }
      .invoice-box { border: none; box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="invoice-box">
    <div class="header">
      <div>
        <div class="brand">🌱 Farmers Market</div>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Direct From Local Certified Farms & Producers</p>
      </div>
      <div class="meta">
        <div><strong>OFFICIAL INVOICE</strong></div>
        <div>Invoice #: <strong>${order.orderId}</strong></div>
        <div>Date: ${order.date}</div>
        <div>Payment: <span class="badge">PAID • STRIPE</span></div>
      </div>
    </div>

    <div class="details">
      <div class="details-col">
        <h4>Customer Details:</h4>
        <div><strong>${order.cardholderName || "Local Customer"}</strong></div>
        <div>Email: ${order.customerEmail}</div>
        <div>Payment: Visa •••• 4242 (Stripe Test)</div>
      </div>
      <div class="details-col" style="text-align: right;">
        <h4>Pickup & Verification:</h4>
        <div><strong>Local Farm Stand Pickup</strong></div>
        <div>Estimated: Tomorrow 9:00 AM – 1:00 PM</div>
        <div>Pickup Code: <strong>${order.orderId.replace("#", "")}</strong></div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Fresh Produce Item</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Unit Price</th>
          <th style="text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (item) => `
          <tr>
            <td><strong>${item.product?.name || "Farm Item"}</strong></td>
            <td style="text-align: center;">${item.quantity}</td>
            <td style="text-align: right;">$${Number(item.product?.price || 0).toFixed(2)}</td>
            <td style="text-align: right;">$${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <div class="total-row">
      <table class="total-table">
        <tr>
          <td>Subtotal:</td>
          <td style="text-align: right;">$${order.totalPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Estimated Tax:</td>
          <td style="text-align: right;">$0.00 (Farm Exempt)</td>
        </tr>
        <tr>
          <td>Pickup Fee:</td>
          <td style="text-align: right;">$0.00 (Free)</td>
        </tr>
        <tr class="grand-total">
          <td>Total Paid:</td>
          <td style="text-align: right;">$${order.totalPrice.toFixed(2)}</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      <p>Thank you for supporting sustainable local agriculture and regional family farms!</p>
      <p>Farmers Market Inc. • Transaction simulated securely via Stripe Sandbox • Questions? support@farmersmarket.local</p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([invoiceHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FarmersMarket_Invoice_${order.orderId.replace("#", "")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // View: Order Completed Success Screen
  if (completedOrder) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg text-center">
          {/* Animated Green Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Payment Successful (Stripe Simulated)
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto mb-6">
            Thank you for supporting local farms! A confirmation receipt has been simulated for{" "}
            <span className="font-semibold text-slate-700">{completedOrder.customerEmail}</span>.
          </p>

          {/* Order Details Card */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 text-left mb-6 border border-slate-200/80">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-500">Order Reference</span>
              <span className="font-bold text-slate-900">{completedOrder.orderId}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-medium text-slate-800">{completedOrder.date}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-500">Payment Method</span>
              <span className="font-medium text-slate-800 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                Visa •••• 4242
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-500">Fulfillment</span>
              <span className="font-semibold text-emerald-700">
                Farm Stand Pickup (Tomorrow 9 AM – 1 PM)
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 text-sm sm:text-base font-bold">
              <span className="text-slate-900">Total Paid</span>
              <span className="text-emerald-600">${completedOrder.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => handleDownloadInvoice(completedOrder)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Invoice
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 py-3 px-6 rounded-full flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </Button>
            <Button
              onClick={() => setCompletedOrder(null)}
              variant="ghost"
              className="text-slate-600 hover:text-slate-900 py-3 px-6 rounded-full"
            >
              <Link href="/browse">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // View: Empty Cart
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-slate-900">Your Cart is Empty</h1>
        <p className="text-slate-500 mb-6">Discover fresh harvest produce from local producers.</p>
        <Link
          href="/browse"
          className="inline-flex items-center justify-center bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
        >
          Browse Fresh Market
        </Link>
      </div>
    );
  }

  // View: Active Cart
  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-slate-900">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 mb-6 lg:mb-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-500 font-medium">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your basket
            </span>
            <button
              onClick={clearCart}
              disabled={loading}
              className="text-xs sm:text-sm text-rose-600 hover:text-rose-700 font-medium px-3 py-1 rounded-md hover:bg-rose-50 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {(cart?.items || []).map((item, index) => (
              <div
                key={item.product_id || index}
                className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4 transition-shadow hover:shadow-xs"
              >
                <Image
                  src={item.product?.image?.[0] || "/placeholder.png"}
                  alt={item.product?.name || "Product Image"}
                  className="w-20 h-20 object-cover rounded-xl bg-slate-50 shrink-0"
                  width={80}
                  height={80}
                />
                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                    {item.product?.name}
                  </h3>
                  <p className="text-emerald-700 font-bold text-sm sm:text-base mt-0.5">
                    ${Number(item.product?.price || 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 bg-slate-50 rounded-full px-2 py-1 border border-slate-200">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product_id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    disabled={loading}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-white text-base transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-900 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                    disabled={loading}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-white text-base transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  disabled={loading}
                  className="text-slate-400 hover:text-rose-600 ml-0 sm:ml-2 mt-2 sm:mt-0 text-xs sm:text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Checkout Trigger */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm h-fit w-full max-w-md mx-auto lg:mx-0">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-900">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm text-slate-600 mb-4 pb-4 border-b border-slate-100">
            <div className="flex justify-between">
              <span>Fresh Items:</span>
              <span className="font-medium text-slate-900">{cart.itemCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Local Farm Pickup:</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax:</span>
              <span className="text-slate-500">$0.00 (Exempt)</span>
            </div>
          </div>

          <div className="flex justify-between font-extrabold text-lg sm:text-xl mb-6 text-slate-900">
            <span>Total:</span>
            <span className="text-emerald-700">${cart.totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => setCheckoutOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-full text-base sm:text-lg shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Lock className="w-4 h-4" />
            Checkout with Stripe
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Simulated Stripe Sandbox • No real charge</span>
          </div>
        </div>
      </div>

      {/* Simulated Stripe Checkout Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-auto animate-in zoom-in-95 duration-200">
            {/* Stripe Test Banner */}
            <div className="bg-amber-400 text-amber-950 font-bold px-4 py-1.5 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
                ⚡ STRIPE TEST MODE — Simulated Payment Flow
              </span>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="text-amber-900 hover:text-black p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Left Column: Order Summary */}
              <div className="p-6 bg-slate-50/70 flex flex-col justify-between">
                <div>
                  <button
                    onClick={() => setCheckoutOpen(false)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-6 font-medium"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Cart
                  </button>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs">
                      🌱
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      Farmers Market
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-1">Pay Farmers Market</p>
                  <p className="text-3xl font-extrabold text-slate-900 mb-6">
                    ${cart.totalPrice.toFixed(2)}
                  </p>

                  {/* Itemized Mini List */}
                  <div className="space-y-3 max-h-52 overflow-y-auto pr-2">
                    {cart.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                            {item.quantity}×
                          </span>
                          <span className="font-medium text-slate-800 line-clamp-1 max-w-[140px]">
                            {item.product?.name}
                          </span>
                        </div>
                        <span className="text-slate-900 font-semibold">
                          ${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 mt-6 text-xs text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pickup / Fulfillment:</span>
                    <span className="text-emerald-700 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                    <span>Total due today:</span>
                    <span className="text-emerald-700">${cart.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Stripe Card Form */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-slate-900 text-base">
                    Pay with Card
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                      VISA
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                      MC
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                      AMEX
                    </span>
                  </div>
                </div>

                <form onSubmit={handleStripePayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Card Information
                    </label>
                    <div className="rounded-lg border border-slate-300 overflow-hidden divide-y divide-slate-200 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                      <div className="flex items-center px-3 py-2.5 bg-white">
                        <CreditCard className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full text-xs outline-none bg-transparent"
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-slate-200 bg-white">
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="px-3 py-2 text-xs outline-none bg-transparent"
                          placeholder="MM / YY"
                        />
                        <input
                          type="text"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="px-3 py-2 text-xs outline-none bg-transparent"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country or Region
                    </label>
                    <div className="rounded-lg border border-slate-300 overflow-hidden divide-y divide-slate-200">
                      <select className="w-full text-xs px-3 py-2.5 bg-white outline-none text-slate-800">
                        <option value="CA">Canada</option>
                        <option value="US">United States</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3 py-2 text-xs outline-none bg-white"
                        placeholder="Postal Code"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#635BFF] hover:bg-[#534be0] text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 mt-5"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Processing with Stripe...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay ${cart.totalPrice.toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                    Encrypted via Stripe 256-bit SSL protocol
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
