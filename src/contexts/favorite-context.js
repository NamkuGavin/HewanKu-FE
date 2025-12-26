"use client";

import React from "react";

const FavoritesContext = React.createContext(null);

const STORAGE_KEY = "hewanku_favorite_ids";

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = React.useState([]);

  // load dari localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavoriteIds(JSON.parse(raw));
    } catch (e) {
      setFavoriteIds([]);
    }
  }, []);

  // simpan ke localStorage tiap berubah
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {}
  }, [favoriteIds]);

  const isFavorite = (id) => favoriteIds.includes(id);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const value = React.useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = React.useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
