/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Heart, MapPin, Navigation } from "lucide-react";

export function FilterSidebar({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  filters,
  setFilters,
  onConfirmSearch,
  favoritesCount = 0,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  filters: any;
  setFilters: (f: any) => void;
  onConfirmSearch: () => void;
  favoritesCount?: number;
}) {
  const defaultFilters: any = {
    category: undefined,
    minPrice: 0,
    maxPrice: 100,
    distance: 500,
    pickupAvailable: false,
    deliveryAvailable: false,
    favoritesOnly: false,
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      category: checked ? category : undefined,
    }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters((prevFilters: any) => {
      const newFilters = { ...prevFilters, minPrice: min };
      if (max < 100) {
        newFilters.maxPrice = max;
      } else {
        delete newFilters.maxPrice;
      }
      return newFilters;
    });
  };

  const handleDistanceChange = (distance: number) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      distance,
    }));
  };

  const handleDeliveryOptionChange = (
    option: "pickupAvailable" | "deliveryAvailable",
    value: boolean
  ) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [option]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setLocation("Montreal, QC");
    setSearchQuery("");
  };

  useEffect(() => {
    onConfirmSearch();
  }, [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.distance,
    filters.pickupAvailable,
    filters.deliveryAvailable,
    filters.favoritesOnly,
    searchQuery,
    location,
  ]);

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Honey",
    "Flowers",
  ];

  const quickLocations = [
    "Montreal, QC",
    "Toronto, ON",
    "Vancouver, BC",
    "Seattle, WA",
    "Austin, TX",
    "New York, NY",
    "Paris, France",
  ];

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-border sticky top-20 sm:top-24 w-full max-w-xs sm:max-w-sm mx-auto sm:mx-0 mb-4 sm:mb-0">
      {/* Product Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-full border border-border pl-4 pr-10 py-2 text-foreground bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button
            type="button"
            onClick={() =>
              setFilters((prev: any) => ({
                ...prev,
                favoritesOnly: !prev.favoritesOnly,
              }))
            }
            title={
              filters.favoritesOnly
                ? "Showing favorites only (click to show all)"
                : "Filter by favorites"
            }
            aria-label="Filter favorites"
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              filters.favoritesOnly
                ? "bg-rose-500 text-white shadow-xs"
                : "text-muted-foreground hover:text-rose-500 hover:bg-rose-50"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                filters.favoritesOnly ? "fill-white" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Searched Location & Distance Origin */}
      <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
        <div className="flex items-center gap-1.5 mb-2">
          <Navigation className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-semibold text-emerald-950 uppercase tracking-wide">
            Your Searched Location
          </span>
        </div>
        <div className="relative mb-2.5">
          <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city, region, or zip..."
            className="w-full rounded-full border border-emerald-200 pl-8 pr-3 py-1.5 text-xs text-foreground bg-white shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {quickLocations.map((loc) => {
            const isSelected =
              location.toLowerCase().includes(loc.split(",")[0].toLowerCase());
            const isParis = loc.includes("Paris");
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-all ${
                  isSelected
                    ? isParis
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-emerald-700 text-white shadow-2xs"
                    : isParis
                    ? "bg-amber-100/80 text-amber-900 hover:bg-amber-200"
                    : "bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100/70"
                }`}
              >
                {loc.split(",")[0]}
                {isParis ? " (EU)" : ""}
              </button>
            );
          })}
        </div>
      </div>

      <h3 className="text-foreground font-bold mb-4 text-base sm:text-lg">Filters</h3>

      {/* Favorites Toggle Filter */}
      <div className="mb-6 p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart
              className={`w-4 h-4 transition-colors ${
                filters.favoritesOnly ? "fill-rose-500 text-rose-500" : "text-rose-400"
              }`}
            />
            <Label
              htmlFor="favoritesOnly"
              className="text-foreground font-semibold cursor-pointer text-xs sm:text-sm"
            >
              Saved Favorites
            </Label>
          </div>
          <Switch
            id="favoritesOnly"
            checked={Boolean(filters.favoritesOnly)}
            onCheckedChange={(checked) =>
              setFilters((prev: any) => ({ ...prev, favoritesOnly: checked }))
            }
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">
          {favoritesCount > 0
            ? `Filter to your ${favoritesCount} saved items`
            : "Filter to bookmarked favorite items"}
        </p>
      </div>

      {/* Distance Radius */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-foreground font-medium text-sm sm:text-base">
            Distance Radius
          </h4>
          <span className="text-xs font-semibold text-primary">
            {Number(filters.distance) >= 1000
              ? "All North America"
              : `Within ${filters.distance ?? 500} mi`}
          </span>
        </div>
        <Slider
          value={[filters.distance ?? 500]}
          max={1000}
          min={10}
          step={10}
          className="mb-2"
          onValueChange={(vals) =>
            setFilters((prev: any) => ({ ...prev, distance: vals[0] }))
          }
          onValueCommit={(vals) => handleDistanceChange(vals[0])}
        />
        <div className="flex justify-between text-muted-foreground text-[11px]">
          <span>10 mi (Local)</span>
          <span>1,000+ mi (Nationwide)</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-foreground font-medium mb-4 text-sm sm:text-base">Category</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.category === category}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked ? true : false)
                }
              />
              <Label
                htmlFor={category}
                className="text-foreground cursor-pointer text-xs sm:text-sm"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-foreground font-medium mb-4 text-sm sm:text-base">Price Range</h4>
        <Slider
          value={[filters.minPrice ?? 0, filters.maxPrice ?? 100]}
          max={100}
          step={1}
          className="mb-2"
          onValueChange={(vals: number[]) => {
            setFilters((prev: any) => ({
              ...prev,
              minPrice: vals[0],
              maxPrice: vals[1],
            }));
          }}
          onValueCommit={(vals: number[]) => {
            handlePriceRangeChange(vals[0], vals[1]);
          }}
        />
        <div className="flex justify-between text-muted-foreground text-xs">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="mb-8">
        <h4 className="text-foreground font-medium mb-4 text-sm sm:text-base">Delivery Options</h4>
        <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
          <Label htmlFor="pickup">Pickup Available</Label>
          <Switch
            id="pickup"
            checked={filters.pickupAvailable}
            onCheckedChange={(checked) =>
              handleDeliveryOptionChange("pickupAvailable", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <Label htmlFor="delivery">Delivery Available</Label>
          <Switch
            id="delivery"
            checked={filters.deliveryAvailable}
            onCheckedChange={(checked) =>
              handleDeliveryOptionChange("deliveryAvailable", checked)
            }
          />
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full rounded-full text-xs sm:text-sm"
        onClick={handleResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
}
