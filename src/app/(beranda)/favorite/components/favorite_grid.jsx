"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/favorite-context";
import { viewAnimalsForUser } from "@/actions/animal.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { ImageAssets } from "@/common/constant/assets";
import {
  Text,
  Column,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";

function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "Rp0";
  }

  return `Rp${price.toLocaleString("id-ID")}`;
}

function mapAnimal(animal) {
  const image =
    typeof animal.urlFoto === "string" && animal.urlFoto.trim()
      ? animal.urlFoto
      : ImageAssets.placeholderAnimal;

  return {
    id: animal.id,
    name: animal.nama || "Hewan tanpa nama",
    price: animal.harga,
    image,
    type: animal.jenis,
    status: animal.status,
  };
}

function AnimalImage({ src, alt }) {
  const imageSrc =
    typeof src === "string" && src.trim() ? src : ImageAssets.placeholderAnimal;
  const className = "w-full h-60 object-cover rounded-md";

  if (imageSrc.startsWith("/")) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={999999}
        height={0}
        className={className}
      />
    );
  }

  return <img src={imageSrc} alt={alt} className={className} />;
}

export default function FavoriteGrid() {
  const { run } = useApiRequest();
  const {
    favoriteIds,
    isFavorite,
    isFavoriteUpdating,
    syncFavoriteAnimals,
    toggleFavorite,
  } = useFavorites();
  const [favoriteAnimals, setFavoriteAnimals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const postPerPage = 6;

  React.useEffect(() => {
    let ignore = false;

    const loadFavorites = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await run(() => viewAnimalsForUser(), {
          errorMessage: "Gagal mengambil favorite",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setFavoriteAnimals([]);
          setErrorMessage(response?.message || "Gagal mengambil favorite");
          return;
        }

        const favorites = Array.isArray(response?.data?.daftarFavorit)
          ? response.data.daftarFavorit
          : [];

        syncFavoriteAnimals(favorites);
        setFavoriteAnimals(favorites.map(mapAnimal));
        setCurrentPage(1);
      } catch (error) {
        if (!ignore) {
          setFavoriteAnimals([]);
          setErrorMessage(error?.message || "Gagal mengambil favorite");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      ignore = true;
    };
  }, [run, syncFavoriteAnimals]);

  const visibleFavoriteAnimals = React.useMemo(() => {
    return favoriteAnimals.filter((animal) =>
      favoriteIds.includes(String(animal.id))
    );
  }, [favoriteAnimals, favoriteIds]);

  const totalPosts = visibleFavoriteAnimals.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postPerPage));

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const endIndex = currentPage * postPerPage;
  const startIndex = endIndex - postPerPage;
  const currentEndIndex = Math.min(endIndex, totalPosts);
  const currentPosts = visibleFavoriteAnimals.slice(startIndex, endIndex);

  const paginate = (page) => setCurrentPage(page);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  if (isLoading) {
    return (
      <Column mainAxisAlignment="center" crossAxisAlignment="center">
        <Text className="text-gray-500">Memuat favorit...</Text>
      </Column>
    );
  }

  if (errorMessage) {
    return (
      <Column mainAxisAlignment="center" crossAxisAlignment="center">
        <Text className="text-sm text-red-500">{errorMessage}</Text>
      </Column>
    );
  }

  if (totalPosts === 0) {
    return (
      <Column mainAxisAlignment="center" crossAxisAlignment="center">
        <Text className="text-gray-500">Belum ada favorit.</Text>
        <SizedBox height={8} />
        <Text className="text-gray-400 text-sm">
          Klik ikon hati pada hewan untuk menambahkan.
        </Text>
      </Column>
    );
  }

  return (
    <Column>
      <div className="w-full mb-4">
        <Text className="text-gray-500 font-medium">
          Showing {startIndex + 1}-{currentEndIndex} of {totalPosts} results
        </Text>
      </div>

      <div className="w-full grid grid-cols-3 gap-8">
        {currentPosts.map((animal) => (
          <Link
            href={`/adopsi/detail_animal/${animal.id}`}
            key={animal.id}
            className="block"
          >
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full">
              <AnimalImage src={animal.image} alt={animal.name} />
              <Padding vertical={12} horizontal={12}>
                <Row mainAxisAlignment="between">
                  <div>
                    <Text size={15} className="font-semibold">
                      {animal.name}
                    </Text>
                    <Text size={12} className="text-gray-500">
                      {[animal.type, animal.status].filter(Boolean).join(" - ")}
                    </Text>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(animal.id);
                    }}
                    disabled={isFavoriteUpdating(animal.id)}
                    className="bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer z-10 relative disabled:opacity-60"
                    aria-label="favorite"
                  >
                    <Heart
                      size={15}
                      className={`transition-all ${
                        isFavorite(animal.id)
                          ? "fill-[#FF8D28] text-[#FF8D28]"
                          : "text-[#FF8D28]"
                      }`}
                    />
                  </Button>
                </Row>
                <Text size={12} className="font-semibold">
                  {formatPrice(animal.price)}
                </Text>
              </Padding>
            </div>
          </Link>
        ))}
      </div>

      <SizedBox height={30} />

      {totalPosts > postPerPage && (
        <Row className="gap-x-2" mainAxisAlignment="between">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-md border text-sm font-medium transition-colors
            ${
              currentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-500 cursor-pointer bg-white hover:bg-gray-50"
            }`}
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          <div className="flex items-center gap-x-2 mx-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold transition-all cursor-pointer
                ${
                  currentPage === number
                    ? "bg-orange-500 text-white border-none shadow-sm"
                    : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-md border text-sm font-medium transition-colors
            ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-500 cursor-pointer bg-white hover:bg-gray-50"
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </Row>
      )}
    </Column>
  );
}
