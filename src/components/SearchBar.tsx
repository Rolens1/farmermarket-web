import { MapPin, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export function SearchBar({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center gap-3 bg-card rounded-full p-2 shadow-lg border border-border max-w-2xl">
      <div className="flex items-center gap-2 flex-1 px-4">
        <MapPin className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Enter location"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="w-px h-8 bg-border" />

      <div className="flex items-center gap-2 flex-1 px-4">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch?.(search);
          }}
        />
      </div>
      <Button
        onClick={() => onSearch?.(search)}
        className="rounded-full bg-primary hover:bg-primary/90 px-8"
      >
        Search
      </Button>
    </div>
  );
}
