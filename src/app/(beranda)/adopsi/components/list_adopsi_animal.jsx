"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageAssets } from "@/common/constant/assets";
import { filterAnimals, viewAnimalsForUser } from "@/actions/animal.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { useFavorites } from "@/contexts/favorite-context";
import {
  Text,
  Column,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";

const ITEMS_PER_PAGE = 3;
const FILTER_ITEMS_PER_PAGE = 6;

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
    rating: animal.rating,
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

function AnimalCard({ animal, isFavorite, isFavoriteUpdating, toggleFavorite }) {
  return (
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
  );
}

function AnimalSection({
  title,
  animals,
  isFavorite,
  isFavoriteUpdating,
  toggleFavorite,
}) {
  const [startIndex, setStartIndex] = React.useState(0);

  React.useEffect(() => {
    setStartIndex(0);
  }, [animals]);

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < animals.length) {
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const hasAnimals = animals.length > 0;
  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + ITEMS_PER_PAGE >= animals.length;
  const visibleAnimals = animals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Column className="w-full" crossAxisAlignment="stretch">
      <Row mainAxisAlignment="between" className="w-full">
        <Text size={20} className="font-semibold">
          {title}
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

      {!hasAnimals ? (
        <Text className="text-gray-500">Belum ada data hewan.</Text>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              isFavorite={isFavorite}
              isFavoriteUpdating={isFavoriteUpdating}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </Column>
  );
}

function FilteredAnimalList({
  animals,
  isFavorite,
  isFavoriteUpdating,
  toggleFavorite,
}) {
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [animals]);

  const totalPosts = animals.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalPosts / FILTER_ITEMS_PER_PAGE)
  );

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const endIndex = currentPage * FILTER_ITEMS_PER_PAGE;
  const startIndex = endIndex - FILTER_ITEMS_PER_PAGE;
  const currentEndIndex = Math.min(endIndex, totalPosts);
  const currentPosts = animals.slice(startIndex, endIndex);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  if (totalPosts === 0) {
    return (
      <Column className="w-full" crossAxisAlignment="center">
        <Text className="text-gray-500">
          Tidak ada hewan yang cocok dengan filter.
        </Text>
      </Column>
    );
  }

  return (
    <Column className="w-full" crossAxisAlignment="stretch">
      <Text size={20} className="font-semibold">
        Hasil Filter
      </Text>
      <SizedBox height={20} />

      <div className="w-full mb-4">
        <Text className="text-gray-500 font-medium">
          Showing {startIndex + 1}-{currentEndIndex} of {totalPosts} results
        </Text>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            isFavorite={isFavorite}
            isFavoriteUpdating={isFavoriteUpdating}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <SizedBox height={30} />

      {totalPosts > FILTER_ITEMS_PER_PAGE ? (
        <Row className="gap-x-2" mainAxisAlignment="between">
          <button
            onClick={() => setCurrentPage((page) => page - 1)}
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
                onClick={() => setCurrentPage(number)}
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
            onClick={() => setCurrentPage((page) => page + 1)}
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
      ) : null}
    </Column>
  );
}

function buildFilterBody(filters) {
  const hasCategory = Boolean(filters?.jenis);
  const hasPrice = Boolean(filters?.isPriceFilterActive);

  return {
    jenis: hasCategory ? filters.jenis : null,
    hargaMin: hasPrice ? Number(filters.hargaMin) : -1,
    hargaMax: hasPrice ? Number(filters.hargaMax) : -1,
  };
}

export default function ListAdopsiAnimal({ filters }) {
  const { run } = useApiRequest();
  const {
    isFavorite,
    isFavoriteUpdating,
    syncFavoriteAnimals,
    toggleFavorite,
  } = useFavorites();
  const [recommendedAnimals, setRecommendedAnimals] = React.useState([]);
  const [topRatedAnimals, setTopRatedAnimals] = React.useState([]);
  const [filteredAnimals, setFilteredAnimals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const hasActiveFilter =
    Boolean(filters?.jenis) || Boolean(filters?.isPriceFilterActive);
  const filterKey = JSON.stringify({
    jenis: filters?.jenis ?? null,
    hargaMin: filters?.hargaMin ?? null,
    hargaMax: filters?.hargaMax ?? null,
    isPriceFilterActive: Boolean(filters?.isPriceFilterActive),
  });

  React.useEffect(() => {
    let ignore = false;

    const loadAnimals = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = hasActiveFilter
          ? await run(
              () =>
                filterAnimals({
                  body: buildFilterBody(filters),
                }),
              {
                errorMessage: "Gagal memfilter data adopsi",
              }
            )
          : await run(() => viewAnimalsForUser(), {
              errorMessage: "Gagal mengambil data adopsi",
            });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setRecommendedAnimals([]);
          setTopRatedAnimals([]);
          setFilteredAnimals([]);
          setErrorMessage(
            response?.message ||
              (hasActiveFilter
                ? "Gagal memfilter data adopsi"
                : "Gagal mengambil data adopsi")
          );
          return;
        }

        if (hasActiveFilter) {
          const filtered = Array.isArray(response?.data) ? response.data : [];

          setRecommendedAnimals([]);
          setTopRatedAnimals([]);
          setFilteredAnimals(filtered.map(mapAnimal));
          return;
        }

        const recommended = Array.isArray(response?.data?.rekomendasiUntukmu)
          ? response.data.rekomendasiUntukmu
          : [];
        const topRated = Array.isArray(response?.data?.ratingTertinggi)
          ? response.data.ratingTertinggi
          : [];

        syncFavoriteAnimals(response?.data?.daftarFavorit);
        setFilteredAnimals([]);
        setRecommendedAnimals(recommended.map(mapAnimal));
        setTopRatedAnimals(topRated.map(mapAnimal));
      } catch (error) {
        if (!ignore) {
          setRecommendedAnimals([]);
          setTopRatedAnimals([]);
          setFilteredAnimals([]);
          setErrorMessage(
            error?.message ||
              (hasActiveFilter
                ? "Gagal memfilter data adopsi"
                : "Gagal mengambil data adopsi")
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadAnimals();

    return () => {
      ignore = true;
    };
  }, [filterKey, hasActiveFilter, run, syncFavoriteAnimals]);

  if (isLoading) {
    return (
      <Column className="flex-1 w-full" crossAxisAlignment="center">
        <Text className="text-gray-500">Memuat data adopsi...</Text>
      </Column>
    );
  }

  if (errorMessage) {
    return (
      <Column className="flex-1 w-full" crossAxisAlignment="center">
        <Text className="text-sm text-red-500">{errorMessage}</Text>
      </Column>
    );
  }

  return (
    <Column className="flex-1 w-full" crossAxisAlignment="stretch">
      {hasActiveFilter ? (
        <FilteredAnimalList
          animals={filteredAnimals}
          isFavorite={isFavorite}
          isFavoriteUpdating={isFavoriteUpdating}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <>
          <AnimalSection
            title="Rekomendasi Untukmu"
            animals={recommendedAnimals}
            isFavorite={isFavorite}
            isFavoriteUpdating={isFavoriteUpdating}
            toggleFavorite={toggleFavorite}
          />

          <SizedBox height={50} />

          <AnimalSection
            title="Rating Tertinggi"
            animals={topRatedAnimals}
            isFavorite={isFavorite}
            isFavoriteUpdating={isFavoriteUpdating}
            toggleFavorite={toggleFavorite}
          />
        </>
      )}
    </Column>
  );
}
