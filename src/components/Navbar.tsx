"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";

export function Navbar({
  currentPage,
  setCurrentPage,
  user = null,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: { id: string; email: string } | null;
}) {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    // { name: "Contact", path: "/contact" },
  ];

  const router = useRouter();
  const pathname = usePathname();

  // Update currentPage based on the current pathname
  useEffect(() => {
    const currentPath = pathname.split("/")[1] || "home";
    if (currentPath !== currentPage) {
      setCurrentPage(currentPath);
    }
  }, [pathname, currentPage, setCurrentPage]);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm backdrop-blur-sm bg-dark/90">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
            onClick={() => router.push("/")}
          >
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <Link href="/" className="text-2xl text-emerald-900 font-bold">
            Farmers Market
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`transition-colors ${
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
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
        {/* CTA Button */}
        {currentPage !== "dashboard" && (
          <Button>
            <Link href="/dashboard">List Your Produce</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
