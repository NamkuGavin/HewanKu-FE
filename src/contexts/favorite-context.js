"use client";

import React from "react";

const FavoritesContext = React.createContext(null);
const STORAGE_KEY = "hewanku_favorite_ids";

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = React.useState([]);

  // Load dari localStorage saat pertama kali
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Pastikan semua tersimpan sebagai string (biar aman id number/string)
        setFavoriteIds(parsed.map((x) => String(x)));
      }
    } catch (e) {
      setFavoriteIds([]);
    }
  }, []);

  // Simpan ke localStorage tiap favoriteIds berubah
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {}
  }, [favoriteIds]);

  const isFavorite = React.useCallback(
    (id) => {
      const key = String(id);
      return favoriteIds.includes(key);
    },
    [favoriteIds]
  );

  const toggleFavorite = React.useCallback((id) => {
    const key = String(id);
    setFavoriteIds((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  }, []);

  const addFavorite = React.useCallback((id) => {
    const key = String(id);
    setFavoriteIds((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, []);

  const removeFavorite = React.useCallback((id) => {
    const key = String(id);
    setFavoriteIds((prev) => prev.filter((x) => x !== key));
  }, []);

  const clearFavorites = React.useCallback(() => {
    setFavoriteIds([]);
  }, []);

  const value = React.useMemo(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [
      favoriteIds,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
    ]
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
