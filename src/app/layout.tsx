"use client";
import "./globals.css";

import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentPage, setCurrentPage] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Wake Render backend on first load (prevents cold-start delay)
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/ping`
    ).catch(() => {});

    const page = pathname === "/" ? "home" : pathname.slice(1);
    setCurrentPage(page);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {currentPage !== "login" && (
              <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
