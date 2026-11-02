"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "farmers_market_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
    setMounted(true);
  }, []);

  const isFavorite = (id?: string | number) => {
    if (!mounted || id === undefined || id === null) return false;
    return favorites.includes(String(id));
  };

  const toggleFavorite = (id?: string | number, name?: string) => {
    if (id === undefined || id === null) return;
    const strId = String(id);
    const exists = favorites.includes(strId);
    let updated: string[];

    if (exists) {
      updated = favorites.filter((favId) => favId !== strId);
      toast(`Removed ${name || "item"} from your favorites`);
    } else {
      updated = [...favorites, strId];
      toast.success(`Saved ${name || "item"} to your favorites!`);
    }

    setFavorites(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  return { favorites, isFavorite, toggleFavorite };
}
