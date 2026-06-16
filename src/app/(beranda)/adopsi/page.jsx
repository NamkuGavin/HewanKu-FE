"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Column,
  Container,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import AdopsiByKategori from "./components/adopsi_by_kategori";
import FilterAndPopularAnimal from "./components/filter_and_popular_animal";
import ListAdopsiAnimal from "./components/list_adopsi_animal";
import SearchResultsAdopsi from "./components/search_results_adopsi";

const DEFAULT_PRICE_RANGE = [0, 9000000];

function AdopsiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("jenis") ?? "";
  const isSearching = search.trim().length > 0;
  const [selectedCategory, setSelectedCategory] = React.useState(
    categoryParam || null
  );
  const [priceRange, setPriceRange] = React.useState(DEFAULT_PRICE_RANGE);
  const [isPriceFilterActive, setIsPriceFilterActive] = React.useState(false);

  React.useEffect(() => {
    setSelectedCategory(categoryParam || null);
  }, [categoryParam]);

  const replaceCategoryQuery = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("jenis", category);
      params.delete("search");
    } else {
      params.delete("jenis");
    }

    const query = params.toString();
    router.replace(query ? `/adopsi?${query}` : "/adopsi", {
      scroll: false,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    replaceCategoryQuery(category);
  };

  const handlePriceChange = (nextRange) => {
    setPriceRange(nextRange);
    setIsPriceFilterActive(true);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setIsPriceFilterActive(false);
    replaceCategoryQuery(null);
  };

  const hasActiveFilter = Boolean(selectedCategory) || isPriceFilterActive;

  return (
    <>
      <HeroSectionBeranda showButton={false} />

      {/* Content Section */}
      <Container bg="bg-white" className="pt-16 pb-16">
        <Container className="max-w-6xl mx-auto">
          <Column
            mainAxisAlignment="start"
            crossAxisAlignment="start"
            className="min-h-96"
          >
            {/* Kalau lagi searching: ganti semua konten jadi hasil pencarian */}
            {isSearching ? (
              <SearchResultsAdopsi query={search} />
            ) : (
              <>
                <AdopsiByKategori
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
                <SizedBox height={50} />
                <Row className="w-full gap-12" crossAxisAlignment="start">
                  <FilterAndPopularAnimal
                    hasActiveFilter={hasActiveFilter}
                    isPriceFilterActive={isPriceFilterActive}
                    priceRange={priceRange}
                    onClearFilters={clearFilters}
                    onPriceChange={handlePriceChange}
                  />
                  <ListAdopsiAnimal
                    filters={{
                      jenis: selectedCategory,
                      hargaMin: priceRange[0],
                      hargaMax: priceRange[1],
                      isPriceFilterActive,
                    }}
                  />
                </Row>
              </>
            )}
          </Column>
        </Container>
      </Container>
    </>
  );
}

export default function AdopsiPage() {
  return (
    <React.Suspense fallback={null}>
      <AdopsiContent />
    </React.Suspense>
  );
}
