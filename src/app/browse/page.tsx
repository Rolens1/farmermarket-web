/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowUpDown, SlidersHorizontal, Heart, MapPin, Globe } from "lucide-react";
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
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef, useMemo, Suspense } from "react";
import { Product } from "../api/product/dto/create-product.dto";
import { getProducts, searchProducts } from "../api/product/products";
import { ProductSearchParamsInterface } from "../api/product/dto/product-search.dto";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/hooks/useFavorites";

type SortKey = "freshness" | "price-low" | "price-high";

function sortProducts(products: Product[], sortBy: SortKey): Product[] {
  const sorted = [...products];
  if (sortBy === "price-low") {
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === "price-high") {
    sorted.sort((a, b) => Number(b.price) - Number(a.price));
  }
  // "freshness" preserves closest distance first ordering from searchProducts
  return sorted;
}

function BrowsePageInner() {
  const defaultFilters = {
    category: undefined as string | undefined,
    minPrice: 0,
    maxPrice: 100,
    distance: 500,
    pickupAvailable: false,
    deliveryAvailable: false,
    favoritesOnly: false,
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Montreal, QC");
  const [isEurope, setIsEurope] = useState(false);
  const [resolvedLocationName, setResolvedLocationName] = useState("Montreal, QC");
  const [sortBy, setSortBy] = useState<SortKey>("freshness");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, loading: cartLoading } = useCart();
  const { favorites } = useFavorites();

  // Parse URL search params on mount
  useEffect(() => {
    const newFilters: any = { ...defaultFilters };
    searchParams.forEach((value, key) => {
      if (key === "query") {
        setSearchQuery(value);
      } else if (key === "location") {
        setLocation(value);
      } else if (key in defaultFilters) {
        if (key === "minPrice" || key === "maxPrice" || key === "distance") {
          newFilters[key] = Number(value);
        } else if (
          key === "pickupAvailable" ||
          key === "deliveryAvailable" ||
          key === "favoritesOnly"
        ) {
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
          !(k === "pickupAvailable" && v === false) &&
          !(k === "deliveryAvailable" && v === false) &&
          !(k === "favoritesOnly")
      )
    );

    const productsData = await searchProducts(cleaned as ProductSearchParamsInterface);

    if (productsData && productsData.isEurope) {
      setIsEurope(true);
      setResolvedLocationName(productsData.locationName || location);
      setProducts([]);
    } else if (productsData && Array.isArray(productsData.products)) {
      setIsEurope(false);
      setResolvedLocationName(productsData.locationName || location);
      setProducts(productsData.products);
    } else if (Array.isArray(productsData)) {
      setIsEurope(false);
      setProducts(productsData);
    } else {
      setIsEurope(false);
      setProducts([]);
    }
  };

  const handleConfirmSearch = useCallback(() => {
    const params = { ...filters, query: searchQuery, location };
    const cleaned = Object.fromEntries(
      Object.entries(params).filter(
        ([k, v]) =>
          v !== undefined &&
          v !== "" &&
          !(k === "minPrice" && v === 0) &&
          !(k === "maxPrice" && v === 100) &&
          !(k === "pickupAvailable" && v === false) &&
          !(k === "deliveryAvailable" && v === false) &&
          !(k === "favoritesOnly" && v === false)
      )
    );
    const qs = new URLSearchParams(cleaned as Record<string, string>).toString();
    router.push(`/browse${qs ? `?${qs}` : ""}`);
  }, [filters, searchQuery, location, router]);

  // Debounced fetch on filter or location changes
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const params = { ...filters, query: searchQuery, location };
      fetchProducts(params).finally(() => setLoading(false));
    }, 350);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchQuery, location]);

  const sortedProducts = useMemo(() => {
    let list = products;
    if (filters.favoritesOnly) {
      list = list.filter((p) => {
        const idStr = String(p.id);
        const slugStr = p.slug ? String(p.slug) : "";
        return (
          favorites.includes(idStr) ||
          (slugStr ? favorites.includes(slugStr) : false)
        );
      });
    }
    return sortProducts(list, sortBy);
  }, [products, filters.favoritesOnly, favorites, sortBy]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Top Search & Filter Bar */}
        <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-border mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center">
            {/* Location Input */}
            <div className="md:w-72 relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (city or zip)..."
                className="rounded-full border-border pl-9 text-xs sm:text-sm bg-background"
              />
            </div>

            {/* Product Search Input */}
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search produce (e.g. apples, honey, peaches)..."
                className="rounded-full border-border text-xs sm:text-sm bg-background"
              />
            </div>

            {/* Category Select */}
            <Select
              value={filters.category ?? "all"}
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  category: val === "all" ? undefined : val,
                }))
              }
            >
              <SelectTrigger className="w-full md:w-[170px] rounded-full text-xs sm:text-sm">
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

            {/* Sort Select */}
            <Select
              value={sortBy}
              onValueChange={(val) => setSortBy(val as SortKey)}
            >
              <SelectTrigger className="w-full md:w-[170px] rounded-full text-xs sm:text-sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshness">Closest & Fresh</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Favorites Filter Button */}
            <Button
              variant={filters.favoritesOnly ? "default" : "outline"}
              className={`rounded-full transition-all text-xs sm:text-sm ${
                filters.favoritesOnly
                  ? "bg-rose-500 hover:bg-rose-600 text-white border-rose-500 shadow-xs"
                  : "border-border hover:border-rose-300 hover:text-rose-600"
              }`}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  favoritesOnly: !prev.favoritesOnly,
                }))
              }
            >
              <Heart
                className={`w-4 h-4 mr-1.5 transition-transform ${
                  filters.favoritesOnly ? "fill-white text-white scale-110" : "text-rose-500"
                }`}
              />
              Favorites {favorites.length > 0 ? `(${favorites.length})` : ""}
            </Button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              location={location}
              setLocation={setLocation}
              filters={filters}
              setFilters={setFilters}
              onConfirmSearch={handleConfirmSearch}
              favoritesCount={favorites.length}
            />
          </aside>

          {/* Product Results Column */}
          <div className="flex-1 min-w-0">
            {/* Header info bar */}
            {!isEurope && (
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-foreground font-semibold text-base sm:text-lg">
                    {loading
                      ? "Calculating distances and finding harvest..."
                      : `Showing ${sortedProducts.length} products`}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      Distances calculated from{" "}
                      <strong className="text-foreground font-medium">
                        {resolvedLocationName || location}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* European Location Notification Notice */}
            {isEurope && !loading && (
              <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center max-w-2xl mx-auto my-6 shadow-xs animate-in fade-in-50 duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl sm:text-3xl">
                  <Globe className="w-7 h-7 text-amber-700" />
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-amber-950 mb-2">
                  No products in this region
                </h2>
                <p className="text-xs sm:text-sm text-amber-900/80 mb-6 max-w-md mx-auto leading-relaxed">
                  We currently connect consumers directly with local farm producers across North America in Canada and the United States. Fresh harvest delivery and farm pickup are not yet supported in {resolvedLocationName || "Europe"}.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={() => {
                      setLocation("Montreal, QC");
                      setSearchQuery("");
                    }}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-5 py-2.5 shadow-xs"
                  >
                    Explore Montreal Farms (QC)
                  </Button>
                  <Button
                    onClick={() => {
                      setLocation("Seattle, WA");
                      setSearchQuery("");
                    }}
                    variant="outline"
                    className="rounded-full border-amber-300 text-amber-950 hover:bg-amber-100/60 text-xs sm:text-sm px-5 py-2.5"
                  >
                    Try Seattle (WA)
                  </Button>
                  <Button
                    onClick={() => {
                      setLocation("Austin, TX");
                      setSearchQuery("");
                    }}
                    variant="outline"
                    className="rounded-full border-amber-300 text-amber-950 hover:bg-amber-100/60 text-xs sm:text-sm px-5 py-2.5"
                  >
                    Try Austin (TX)
                  </Button>
                </div>
              </div>
            )}

            {/* Loading Skeletons */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : !isEurope ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                  <EmptyState
                    title={
                      filters.favoritesOnly
                        ? "No Saved Favorites Found"
                        : "No Fresh Produce Found in Radius"
                    }
                    description={
                      filters.favoritesOnly
                        ? "You have not marked any items matching this view as favorites yet. Click the heart icon on any product to save it here!"
                        : `We could not find any produce within ${filters.distance ?? 500} miles of ${resolvedLocationName || location}. Try widening your distance radius or picking another region!`
                    }
                    actionText={
                      filters.favoritesOnly
                        ? "View All Produce"
                        : "Widen Distance to All North America"
                    }
                    onAction={() => {
                      if (filters.favoritesOnly) {
                        setFilters((prev) => ({ ...prev, favoritesOnly: false }));
                      } else {
                        setFilters((prev) => ({ ...prev, distance: 1000 }));
                      }
                    }}
                  />
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <BrowsePageInner />
    </Suspense>
  );
}
