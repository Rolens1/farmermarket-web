/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "@/components/FilterSideBar";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef, useMemo, Suspense } from "react";
import { Product } from "../api/product/dto/create-product.dto";
import { get } from "../api/fetch.api";
import { searchProducts } from "../api/product/products";
import { ProductSearchParamsInterface } from "../api/product/dto/product-search.dto";
import { useCart } from "@/context/CartContext";

type SortKey = "freshness" | "price-low" | "price-high";

function sortProducts(products: Product[], sortBy: SortKey): Product[] {
  const sorted = [...products];
  if (sortBy === "price-low") {
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === "price-high") {
    sorted.sort((a, b) => Number(b.price) - Number(a.price));
  }
  // "freshness" uses default API order (newest first)
  return sorted;
}

function BrowsePageInner() {
  const defaultFilters = {
    category: undefined as string | undefined,
    minPrice: 0,
    maxPrice: 100,
    distance: 10,
    pickupAvailable: false,
    deliveryAvailable: false,
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("freshness");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, loading: cartLoading } = useCart();

  // Parse URL search params on mount (Next.js-safe, no window.location)
  useEffect(() => {
    const newFilters: any = { ...defaultFilters };
    searchParams.forEach((value, key) => {
      if (key === "query") {
        setSearchQuery(value);
      } else if (key in defaultFilters) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async (params: ProductSearchParamsInterface) => {
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
    let productsData;
    if (Object.keys(cleaned).length === 0) {
      productsData = await get("/products");
    } else {
      productsData = await searchProducts(cleaned as ProductSearchParamsInterface);
    }
    if (Array.isArray(productsData)) {
      setProducts(productsData);
    } else if (productsData && Array.isArray(productsData.products)) {
      setProducts(productsData.products);
    } else {
      setProducts([]);
    }
  };

  const handleConfirmSearch = useCallback(() => {
    const params = { ...filters, query: searchQuery };
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
    const qs = new URLSearchParams(cleaned as Record<string, string>).toString();
    router.push(`/browse${qs ? `?${qs}` : ""}`);
  }, [filters, searchQuery, router]);

  // Debounced fetch on filter/search changes
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const params = { ...filters, query: searchQuery };
      fetchProducts(params).finally(() => setLoading(false));
    }, 400);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchQuery]);

  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

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
            <Select
              value={filters.category ?? "all"}
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  category: val === "all" ? undefined : val,
                }))
              }
            >
              <SelectTrigger className="w-[200px] rounded-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Vegetables">Vegetables</SelectItem>
                <SelectItem value="Fruits">Fruits</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Meat">Meat</SelectItem>
                <SelectItem value="Honey">Honey</SelectItem>
                <SelectItem value="Flowers">Flowers</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(val) => setSortBy(val as SortKey)}
            >
              <SelectTrigger className="w-[200px] rounded-full">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshness">Freshness</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
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
                  : `Showing ${sortedProducts.length} products`}
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
                  {sortedProducts.map((product, index) => (
                    <ProductCard
                      key={index}
                      product={product}
                      onClick={() => router.push(`/product/${product.slug}`)}
                      onAddToCart={(prod) => addToCart(prod.id, prod)}
                      loading={cartLoading}
                    />
                  ))}
                </div>

                {sortedProducts.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg">No products found</p>
                    <p className="text-sm mt-2">Try adjusting your filters or search query</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <BrowsePageInner />
    </Suspense>
  );
}
