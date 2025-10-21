"use client";
import "./globals.css";

import "./globals.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentPage, setCurrentPage] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const page = pathname === "/" ? "home" : pathname.slice(1);
    setCurrentPage(page);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {currentPage !== "login" && (
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          )}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
