"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
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

export default function AdopsiPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const isSearching = search.trim().length > 0;

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
                <AdopsiByKategori />
                <SizedBox height={50} />
                <Row className="w-full gap-12" crossAxisAlignment="start">
                  <FilterAndPopularAnimal />
                  <ListAdopsiAnimal />
                </Row>
              </>
            )}
          </Column>
        </Container>
      </Container>
    </>
  );
}
