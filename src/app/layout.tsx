"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Navbar } from "../../components/ui/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentPage, setCurrentPage] = useState("");

  const handleCurrentPageChange = (page: string) => {
    setCurrentPage(page);
  };

  useEffect(() => {}, [currentPage]);
  // Handle side effects based on currentPage

  return (
    <html lang="en">
      <Navbar setCurrentPage={handleCurrentPageChange} />
      <body>{children}</body>
    </html>
  );
}
