"use client";
import "./globals.css";

import "./globals.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { usePathname } from "next/navigation";
import { post, securedGet, securedPost, get } from "./api/fetch.api";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentPage, setCurrentPage] = useState("");
  const pathname = usePathname();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    const fetchUser = async () => {
      const response = await securedGet("/auth/me");
      console.log("Fetch user response:", response);
      setUser(response.user);
    };
    console.log("Fetching user data...");
    fetchUser();
  }, []);

  useEffect(() => {
    const page = pathname === "/" ? "home" : pathname.slice(1);
    setCurrentPage(page);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        {currentPage !== "login" && (
          <Navbar
            user={user}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {children}
      </body>
    </html>
  );
}
