/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "@/components/FilterSideBar";
import { ProductBar } from "@/components/ui/product-bar";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Product } from "../api/product/dto/create-product.dto";
import { get } from "../api/fetch.api";
import { searchProducts } from "../api/product/products";
import { ProductSearchParamsInterface } from "../api/product/dto/product-search.dto";

export default function BrowsePage() {
  const defaultFilters = {
    category: undefined,
    minPrice: 0,
    maxPrice: 100,
    distance: 10,
    pickupAvailable: false,
    deliveryAvailable: false,
  };
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);

  // On mount, parse URL params and set filters/searchQuery
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: any = { ...defaultFilters };
    params.forEach((value, key) => {
      if (key === "query") {
        setSearchQuery(value);
      } else if (key in defaultFilters) {
        // Convert to correct type
        if (key === "minPrice" || key === "maxPrice" || key === "distance") {
          newFilters[key] = Number(value);
        } else if (key === "pickupAvailable" || key === "deliveryAvailable") {
          newFilters[key] = value === "true";
        } else {
          newFilters[key] = value;
        }
      }
    });
    setFilters(newFilters);
  }, []);

  const fetchProducts = async (params: ProductSearchParamsInterface) => {
    // Remove undefined, empty, or default values
    const cleaned = Object.fromEntries(
      Object.entries(params).filter(
        ([k, v]) =>
          v !== undefined &&
          v !== "" &&
          !(k === "minPrice" && v === 0) &&
          !(k === "maxPrice" && v === 100) &&
          !(k === "distance" && v === 10) &&
          !(k === "pickupAvailable" && v === false) &&
          !(k === "deliveryAvailable" && v === false)
      )
    );
    const qs = new URLSearchParams(
      Object.entries(cleaned).map(([k, v]) => [k, String(v)])
    ).toString();
    let productsData;
    if (qs.length === 0) {
      productsData = await get("/products");
    } else {
      productsData = await searchProducts(qs as ProductSearchParamsInterface);
    }
    // Always set products to an array
    if (Array.isArray(productsData)) {
      setProducts(productsData);
    } else if (productsData && Array.isArray(productsData.products)) {
      setProducts(productsData.products);
    } else {
      setProducts([]);
    }
  };

  const handleConfirmSearch = useCallback(() => {
    const params = {
      ...filters,
      query: searchQuery,
    };
    // Remove undefined or default values
    const cleaned = Object.fromEntries(
      Object.entries(params).filter(
        ([k, v]) =>
          v !== undefined &&
          v !== "" &&
          !(k === "minPrice" && v === 0) &&
          !(k === "maxPrice" && v === 100) &&
          !(k === "distance" && v === 10) &&
          !(k === "pickupAvailable" && v === false) &&
          !(k === "deliveryAvailable" && v === false)
      )
    );
    const qs = new URLSearchParams(
      cleaned as Record<string, string>
    ).toString();
    router.push(`/browse${qs ? `?${qs}` : ""}`);
  }, [filters, searchQuery, router]);

  // Debounce search/filter API calls
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setLoading(true);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      const params = {
        ...filters,
        query: searchQuery,
      };
      fetchProducts(params).finally(() => setLoading(false));
    }, 400); // 400ms debounce
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [filters, searchQuery]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="rounded-full border-border"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] rounded-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
                <SelectItem value="honey">Honey</SelectItem>
                <SelectItem value="flowers">Flowers</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="freshness">
              <SelectTrigger className="w-[200px] rounded-full">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshness">Freshness</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <FilterSidebar
              setProducts={setProducts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
              onConfirmSearch={handleConfirmSearch}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-foreground">
                {loading
                  ? "Loading products..."
                  : `Showing ${products.length} products`}
              </h3>
            </div>

            {/* Loading Skeletons */}
            {loading ? (
              <div className="grid grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border animate-pulse"
                  >
                    <div className="aspect-[4/3] bg-muted" />
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                      <div className="h-10 bg-muted rounded w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6">
                  {products &&
                    products.map((product, index) => (
                      <ProductCard
                        key={index}
                        product={product}
                        onClick={() => router.push(`/product/${product.slug}`)}
                      />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-12">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-full ${
                        page === 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground hover:bg-secondary"
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
