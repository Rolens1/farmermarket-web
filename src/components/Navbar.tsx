"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Leaf, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { useCart } from "@/context/CartContext";

export function Navbar({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) {
  const { user } = useAuth();
  const { cart } = useCart();
  const [isPopping, setIsPopping] = useState(false);
  const [popDiff, setPopDiff] = useState(1);
  const prevCount = useRef(cart.itemCount);
  const isInitialMount = useRef(true);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
  ];

  const router = useRouter();
  const pathname = usePathname();

  // Silent pop animation on cart addition
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevCount.current = cart.itemCount;
      return;
    }

    if (cart.itemCount > prevCount.current) {
      setPopDiff(cart.itemCount - prevCount.current);
      setIsPopping(true);
      const timer = setTimeout(() => {
        setIsPopping(false);
      }, 700);
      prevCount.current = cart.itemCount;
      return () => clearTimeout(timer);
    }
    prevCount.current = cart.itemCount;
  }, [cart.itemCount]);

  // Update currentPage based on the current pathname
  useEffect(() => {
    const currentPath = pathname.split("/")[1] || "home";
    if (currentPath !== currentPage) {
      setCurrentPage(currentPath);
    }
  }, [pathname, currentPage, setCurrentPage]);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm backdrop-blur-sm bg-dark/90">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
        {/* Logo or Brand Name */}
        <div className="flex items-center gap-2 cursor-pointer mb-2 sm:mb-0">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center"
            onClick={() => router.push("/")}
          >
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <Link
            href="/"
            className="text-xl sm:text-2xl text-emerald-900 font-bold"
          >
            Farmers Market
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center gap-4 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`transition-colors text-sm sm:text-base ${
                pathname === link.path
                  ? "active text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              onClick={() => setCurrentPage(link.name.toLowerCase())}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <Link
              href="/dashboard"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm sm:text-base"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm sm:text-base"
            >
              Login
            </Link>
          )}

          {/* Cart Icon with Pop Animation */}
          <Link
            href="/cart"
            className="relative ml-2 sm:ml-4 group flex items-center justify-center p-1"
            aria-label="Shopping Cart"
          >
            <ShoppingCart
              className={`w-6 h-6 text-foreground group-hover:text-primary transition-all duration-300 ${
                isPopping ? "animate-cart-bump text-emerald-700" : ""
              }`}
            />
            {/* Pop Badge */}
            <span
              key={`badge-${cart.itemCount}-${isPopping ? "pop" : "idle"}`}
              className={`absolute -top-2 -right-2 text-xs rounded-full px-2 py-0.5 font-bold border border-white select-none transition-all duration-300 ${
                isPopping
                  ? "animate-cart-pop bg-emerald-600 ring-4 ring-emerald-300/50 shadow-md text-white"
                  : cart.itemCount > 0
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {cart.itemCount}
            </span>

            {/* Floating Pop Tag (+1 or +Qty) with zero sound */}
            {isPopping && (
              <span className="pointer-events-none absolute -top-5 -right-2 text-[10px] font-extrabold text-white bg-emerald-600 border border-emerald-400 px-1.5 py-0.2 rounded-full shadow-md animate-float-up">
                +{popDiff}
              </span>
            )}
          </Link>
        </nav>

        {/* CTA Button */}
        {currentPage !== "dashboard" && (
          <div className="mt-2 sm:mt-0">
            <Button className="w-full sm:w-auto text-xs sm:text-base py-2 sm:py-3">
              <Link href={user ? "/dashboard" : "/login"}>
                {user ? "List Your Produce" : "Login"}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
