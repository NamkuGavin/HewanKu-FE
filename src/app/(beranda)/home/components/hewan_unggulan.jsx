"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import {
  Text,
  Padding,
  SizedBox,
  Row,
} from "@/components/shared/custom_widget";
import { Button } from "@/components/ui/button";
import { ImageAssets } from "@/common/constant/assets";
import { viewAnimalsForUser } from "@/actions/animal.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { useFavorites } from "@/contexts/favorite-context";

const ITEMS_PER_PAGE = 3;

function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "Rp0";
  }

  return `Rp${price.toLocaleString("id-ID")}`;
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : value;
}

function isAvailableAnimal(animal) {
  return normalizeText(animal?.status)?.toLowerCase() === "tersedia";
}

function mapAnimal(animal) {
  const rawImage = normalizeText(animal.urlFoto);
  const image =
    typeof rawImage === "string" && rawImage
      ? rawImage
      : ImageAssets.placeholderAnimal;

  return {
    id: animal.id,
    name: normalizeText(animal.nama) || "Hewan tanpa nama",
    price: animal.harga,
    image,
    type: normalizeText(animal.jenis),
    status: normalizeText(animal.status),
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
        draggable={false}
        className={className}
      />
    );
  }

  return (
    <img src={imageSrc} alt={alt} draggable={false} className={className} />
  );
}

export default function HewanUnggulan() {
  const { run } = useApiRequest();
  const {
    isFavorite,
    isFavoriteUpdating,
    syncFavoriteAnimals,
    toggleFavorite,
  } = useFavorites();
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < featuredAnimals.length) {
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  useEffect(() => {
    let ignore = false;

    const loadFeaturedAnimals = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await run(() => viewAnimalsForUser(), {
          errorMessage: "Gagal mengambil hewan unggulan",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setFeaturedAnimals([]);
          setErrorMessage(
            response?.message || "Gagal mengambil hewan unggulan",
          );
          return;
        }

        const animals = Array.isArray(response?.data?.hewanUnggulan)
          ? response.data.hewanUnggulan
          : [];

        syncFavoriteAnimals(response?.data?.daftarFavorit);
        setFeaturedAnimals(
          animals.filter(isAvailableAnimal).map(mapAnimal),
        );
        setStartIndex(0);
      } catch (error) {
        if (!ignore) {
          setFeaturedAnimals([]);
          setErrorMessage(error?.message || "Gagal mengambil hewan unggulan");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadFeaturedAnimals();

    return () => {
      ignore = true;
    };
  }, [run, syncFavoriteAnimals]);

  const hasAnimals = featuredAnimals.length > 0;
  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + ITEMS_PER_PAGE >= featuredAnimals.length;
  const visibleAnimals = featuredAnimals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      <Row mainAxisAlignment="between" className="w-full">
        <Text size={20} className="font-semibold">
          Hewan unggulan
        </Text>

        {hasAnimals ? (
          <Row className="gap-4 w-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`bg-black p-1 rounded-full cursor-pointer transition-opacity ${
                isPrevDisabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
              aria-label="Sebelumnya"
            >
              <ChevronLeft color="#ffffffff" size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`bg-black p-1 rounded-full cursor-pointer transition-opacity ${
                isNextDisabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
              aria-label="Berikutnya"
            >
              <ChevronRight color="#ffffffff" size={20} />
            </button>
          </Row>
        ) : null}
      </Row>
      <SizedBox height={20} />

      {isLoading ? (
        <Text className="text-gray-500">Memuat hewan unggulan...</Text>
      ) : null}

      {!isLoading && errorMessage ? (
        <Text className="text-sm text-red-500">{errorMessage}</Text>
      ) : null}

      {!isLoading && !errorMessage && !hasAnimals ? (
        <Text className="text-gray-500">Belum ada hewan unggulan.</Text>
      ) : null}

      {hasAnimals ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleAnimals.map((animal) => (
            <div
              key={animal.id}
              className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
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
                    onClick={() => toggleFavorite(animal.id)}
                    disabled={isFavoriteUpdating(animal.id)}
                    className="bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60"
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
          ))}
        </div>
      ) : null}
    </>
  );
}
