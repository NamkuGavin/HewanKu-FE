"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/utils/helper";
import { ImageAssets } from "@/common/constant/assets";
import { viewAnimalsForUser } from "@/actions/animal.action";
import { useApiRequest } from "@/hooks/use-api-request";
import Image from "next/image";
import Link from "next/link";
import {
  Text,
  Column,
  Container,
  Row,
} from "@/components/shared/custom_widget";

const POPULAR_LIMIT = 5;

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : value;
}

function mapPopularAnimal(animal) {
  const rawImage = normalizeText(animal.urlFoto);

  return {
    id: animal.id,
    name: normalizeText(animal.nama) || "Hewan tanpa nama",
    price: animal.harga,
    image:
      typeof rawImage === "string" && rawImage
        ? rawImage
        : ImageAssets.placeholderAnimal,
  };
}

function PopularAnimalImage({ src, alt }) {
  const imageSrc =
    typeof src === "string" && src.trim() ? src : ImageAssets.placeholderAnimal;
  const className = "w-1/2 h-15 object-cover rounded-md mr-2";

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

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-orange-500" />
    </SliderPrimitive.Track>
    {(props.value ?? props.defaultValue)?.map((_, index) => (
      <SliderPrimitive.Thumb
        key={index}
        className="block h-4 w-4 rounded-full bg-orange-500 shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export default function FilterAndPopularAnimal({
  hasActiveFilter,
  isPriceFilterActive,
  onClearFilters,
  onPriceChange,
  priceRange,
}) {
  const { run } = useApiRequest();
  const [value, setValue] = React.useState(priceRange);
  const [popularAnimals, setPopularAnimals] = React.useState([]);
  const [isPopularLoading, setIsPopularLoading] = React.useState(true);
  const [popularErrorMessage, setPopularErrorMessage] = React.useState("");
  const [from, to] = value;

  React.useEffect(() => {
    setValue(priceRange);
  }, [priceRange]);

  React.useEffect(() => {
    let ignore = false;

    const loadPopularAnimals = async () => {
      setIsPopularLoading(true);
      setPopularErrorMessage("");

      try {
        const response = await run(() => viewAnimalsForUser(), {
          errorMessage: "Gagal mengambil hewan popular",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setPopularAnimals([]);
          setPopularErrorMessage(
            response?.message || "Gagal mengambil hewan popular"
          );
          return;
        }

        const animals = Array.isArray(response?.data?.hewanUnggulan)
          ? response.data.hewanUnggulan
          : [];

        setPopularAnimals(
          animals.slice(0, POPULAR_LIMIT).map(mapPopularAnimal)
        );
      } catch (error) {
        if (!ignore) {
          setPopularAnimals([]);
          setPopularErrorMessage(
            error?.message || "Gagal mengambil hewan popular"
          );
        }
      } finally {
        if (!ignore) {
          setIsPopularLoading(false);
        }
      }
    };

    loadPopularAnimals();

    return () => {
      ignore = true;
    };
  }, [run]);

  return (
    <Column className="w-1/4" crossAxisAlignment="start">
      <Text className="font-semibold mb-4">Telusuri berdasarkan Harga</Text>
      <Column className="w-full">
        <Row mainAxisAlignment="between" className="mb-2">
          <Text className="text-xs">0</Text>
          <Text className="text-xs">9.000.000</Text>
        </Row>
        <div className="w-full flex items-center justify-between gap-2">
          <Slider
            value={value}
            onValueChange={setValue}
            onValueCommit={onPriceChange}
            min={0}
            max={9000000}
            step={100000}
          />
        </div>
        <Text className="mt-4 text-center text-xs font-medium">
          {isPriceFilterActive
            ? `Harga: ${formatRupiah(from)} - ${formatRupiah(to)}`
            : "Harga: Semua"}
        </Text>
        <button
          type="button"
          onClick={onClearFilters}
          disabled={!hasActiveFilter}
          className={`mt-4 w-full rounded-sm border px-3 py-2 text-sm font-medium transition-colors ${
            hasActiveFilter
              ? "cursor-pointer border-orange-500 text-orange-500 hover:bg-orange-50"
              : "cursor-not-allowed border-gray-200 text-gray-300"
          }`}
        >
          Clear filter
        </button>
      </Column>
      <Text className="font-semibold mt-8 mb-4">Hewan Popular</Text>
      <div className="w-full grid grid-cols-1 gap-4">
        {isPopularLoading ? (
          <Text className="text-xs text-gray-500">Memuat hewan popular...</Text>
        ) : null}

        {!isPopularLoading && popularErrorMessage ? (
          <Text className="text-xs text-red-500">{popularErrorMessage}</Text>
        ) : null}

        {!isPopularLoading &&
        !popularErrorMessage &&
        popularAnimals.length === 0 ? (
          <Text className="text-xs text-gray-500">Belum ada hewan popular.</Text>
        ) : null}

        {popularAnimals.map((animal) => (
          <Link key={animal.id} href={`/adopsi/detail_animal/${animal.id}`}>
            <Container className="overflow-hidden cursor-pointer">
              <Row>
                <PopularAnimalImage src={animal.image} alt={animal.name} />
                <Column crossAxisAlignment="start">
                  <Text size={12} className="font-semibold">
                    {animal.name}
                  </Text>
                  <Text size={12} className="font-semibold">
                    {formatRupiah(Number(animal.price || 0))}
                  </Text>
                </Column>
              </Row>
            </Container>
          </Link>
        ))}
      </div>
    </Column>
  );
}
