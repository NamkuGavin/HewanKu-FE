"use client";

import React from "react";
import {
  addFavoriteAnimal,
  deleteFavoriteAnimal,
} from "@/actions/animal.action";
import { toast } from "sonner";

const FavoritesContext = React.createContext(null);

function toFavoriteKey(id) {
  return String(id);
}

function resolveStatusCode(response) {
  const statusCode = Number(response?.statusCode ?? response?.code);
  return Number.isFinite(statusCode) ? statusCode : null;
}

function isApiSuccess(response) {
  if (response?.success === false) {
    return false;
  }

  const statusCode = resolveStatusCode(response);
  return statusCode === null || (statusCode >= 200 && statusCode < 300);
}

function getFavoriteIdsFromAnimals(animals) {
  if (!Array.isArray(animals)) {
    return [];
  }

  return animals
    .map((animal) => animal?.id)
    .filter((id) => id !== undefined && id !== null)
    .map(toFavoriteKey);
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = React.useState([]);
  const [updatingIds, setUpdatingIds] = React.useState([]);
  const updatingIdsRef = React.useRef([]);

  React.useEffect(() => {
    updatingIdsRef.current = updatingIds;
  }, [updatingIds]);

  const syncFavoriteAnimals = React.useCallback((animals) => {
    setFavoriteIds(getFavoriteIdsFromAnimals(animals));
  }, []);

  const isFavorite = React.useCallback(
    (id) => {
      const key = toFavoriteKey(id);
      return favoriteIds.includes(key);
    },
    [favoriteIds]
  );

  const isFavoriteUpdating = React.useCallback(
    (id) => {
      const key = toFavoriteKey(id);
      return updatingIds.includes(key);
    },
    [updatingIds]
  );

  const toggleFavorite = React.useCallback(
    async (id) => {
      const key = toFavoriteKey(id);

      if (updatingIdsRef.current.includes(key)) {
        return {
          success: false,
          message: "Favorite sedang diproses.",
        };
      }

      const wasFavorite = favoriteIds.includes(key);

      updatingIdsRef.current = [...updatingIdsRef.current, key];
      setUpdatingIds((prev) => (prev.includes(key) ? prev : [...prev, key]));
      setFavoriteIds((prev) =>
        wasFavorite
          ? prev.filter((item) => item !== key)
          : prev.includes(key)
            ? prev
            : [...prev, key]
      );

      try {
        const response = wasFavorite
          ? await deleteFavoriteAnimal(id)
          : await addFavoriteAnimal(id);

        if (!isApiSuccess(response)) {
          setFavoriteIds((prev) =>
            wasFavorite
              ? prev.includes(key)
                ? prev
                : [...prev, key]
              : prev.filter((item) => item !== key)
          );

          toast.error(response?.message || "Gagal memperbarui favorite.");

          return {
            success: false,
            response,
          };
        }

        toast.success(
          wasFavorite
            ? "Item dihapus dari favorite."
            : "Item tersimpan ke favorite."
        );

        return {
          success: true,
          response,
        };
      } catch (error) {
        setFavoriteIds((prev) =>
          wasFavorite
            ? prev.includes(key)
              ? prev
              : [...prev, key]
            : prev.filter((item) => item !== key)
        );

        toast.error(error?.message || "Gagal memperbarui favorite.");

        return {
          success: false,
          error,
        };
      } finally {
        updatingIdsRef.current = updatingIdsRef.current.filter(
          (item) => item !== key
        );
        setUpdatingIds((prev) => prev.filter((item) => item !== key));
      }
    },
    [favoriteIds]
  );

  const addFavorite = React.useCallback(
    async (id) => {
      if (isFavorite(id)) {
        return {
          success: true,
        };
      }

      return toggleFavorite(id);
    },
    [isFavorite, toggleFavorite]
  );

  const removeFavorite = React.useCallback(
    async (id) => {
      if (!isFavorite(id)) {
        return {
          success: true,
        };
      }

      return toggleFavorite(id);
    },
    [isFavorite, toggleFavorite]
  );

  const clearFavorites = React.useCallback(() => {
    setFavoriteIds([]);
  }, []);

  const value = React.useMemo(
    () => ({
      favoriteIds,
      isFavorite,
      isFavoriteUpdating,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      syncFavoriteAnimals,
    }),
    [
      favoriteIds,
      isFavorite,
      isFavoriteUpdating,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      syncFavoriteAnimals,
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
