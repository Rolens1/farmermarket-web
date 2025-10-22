/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { ProductSearchParamsInterface } from "@/app/api/product/dto/product-search.dto";

export function FilterSidebar({
  setProducts,
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  onConfirmSearch,
}: {
  setProducts: unknown;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filters: any;
  setFilters: (f: any) => void;
  onConfirmSearch: () => void;
}) {
  const defaultFilters: ProductSearchParamsInterface = {
    category: undefined,
    minPrice: 0,
    maxPrice: 100,
    distance: 10,
    pickupAvailable: false,
    deliveryAvailable: false,
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prevFilters: ProductSearchParamsInterface) => ({
      ...prevFilters,
      category: checked ? category : undefined,
    }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    console.log("Price range changed:", min, max);
    setFilters((prevFilters: ProductSearchParamsInterface) => {
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
    console.log("Distance changed:", distance);
    setFilters((prevFilters: ProductSearchParamsInterface) => ({
      ...prevFilters,
      distance,
    }));
  };

  const handleDeliveryOptionChange = (
    option: "pickupAvailable" | "deliveryAvailable",
    value: boolean
  ) => {
    setFilters((prevFilters: ProductSearchParamsInterface) => ({
      ...prevFilters,
      [option]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
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
    searchQuery,
  ]);

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Honey",
    "Flowers",
  ];

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-border sticky top-20 sm:top-24 w-full max-w-xs sm:max-w-sm mx-auto sm:mx-0 mb-4 sm:mb-0">
      {/* Search Bar (synced with main search) */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full rounded-full border border-border px-4 py-2 text-foreground bg-background"
        />
      </div>
      <h3 className="text-foreground mb-6">Filters</h3>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Category</h4>
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
                className="text-foreground cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Price Range</h4>
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
        <div className="flex justify-between text-muted-foreground">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>

      {/* Distance */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Distance (miles)</h4>
        <Slider
          value={[filters.distance ?? 10]}
          max={50}
          step={1}
          className="mb-2"
          onValueChange={(vals) =>
            setFilters((prev: any) => ({ ...prev, distance: vals[0] }))
          }
          onValueCommit={(vals) => handleDistanceChange(vals[0])}
        />
        <div className="text-muted-foreground">
          Within {filters.distance ?? 10} miles
        </div>
      </div>

      {/* Delivery Options */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Delivery Options</h4>
        <div className="flex items-center justify-between mb-3">
          <Label htmlFor="pickup">Pickup Available</Label>
          <Switch
            id="pickup"
            checked={filters.pickupAvailable}
            onCheckedChange={(checked) =>
              handleDeliveryOptionChange("pickupAvailable", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
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
        className="w-full rounded-full"
        onClick={handleResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
}
