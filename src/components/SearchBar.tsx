"use client";

import { MapPin, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export function SearchBar({
  onSearch,
  initialQuery = "",
  initialLocation = "",
}: {
  onSearch?: (query: string, location?: string) => void;
  initialQuery?: string;
  initialLocation?: string;
}) {
  const [search, setSearch] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleTriggerSearch = () => {
    onSearch?.(search, location);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 bg-card rounded-2xl sm:rounded-full p-2.5 sm:p-2 shadow-lg border border-border max-w-2xl w-full">
      <div className="flex items-center gap-2 flex-1 px-3 sm:px-4">
        <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
        <Input
          placeholder="Location (e.g. Montreal, Seattle, Vancouver)..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTriggerSearch();
          }}
        />
      </div>

      <div className="hidden sm:block w-px h-8 bg-border" />

      <div className="flex items-center gap-2 flex-1 px-3 sm:px-4">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        <Input
          placeholder="Search fresh produce..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTriggerSearch();
          }}
        />
      </div>
      <Button
        onClick={handleTriggerSearch}
        className="rounded-full bg-primary hover:bg-primary/90 px-6 sm:px-8 text-xs sm:text-sm mt-2 sm:mt-0 font-semibold"
      >
        Search
      </Button>
    </div>
  );
}
