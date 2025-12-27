"use client";

import * as React from "react";
import { dummyHewan } from "@/data/dummy/data_dummy";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/favorite-context";
import {
  Text,
  Column,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";

export default function FavoriteGrid() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const favoriteAnimals = React.useMemo(() => {
    return dummyHewan.filter((x) => favoriteIds.includes(String(x.id)));
  }, [favoriteIds]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const postPerPage = 6;

  const totalPosts = favoriteAnimals.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postPerPage));

  // kalau item berkurang dan halaman jadi out of range, balik ke page terakhir
  React.useEffect(() => {
    const last = Math.max(1, Math.ceil(totalPosts / postPerPage));
    if (currentPage > last) setCurrentPage(last);
  }, [totalPosts, currentPage]);

  const endIndex = currentPage * postPerPage;
  const startIndex = endIndex - postPerPage;
  const currentEndIndex = Math.min(endIndex, totalPosts);
  const currentPosts = favoriteAnimals.slice(startIndex, endIndex);

  const paginate = (page) => setCurrentPage(page);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  if (totalPosts === 0) {
    return (
      <Column mainAxisAlignment="center" crossAxisAlignment="center">
        <Text className="text-gray-500">Belum ada favorit.</Text>
        <SizedBox height={8} />
        <Text className="text-gray-400 text-sm">
          Klik ikon hati di halaman Adopsi untuk menambahkan.
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
              <Image
                src={animal.image}
                alt={animal.name}
                width={999999}
                height={0}
                className="w-full h-60 object-cover rounded-md"
              />
              <Padding vertical={12} horizontal={12}>
                <Row mainAxisAlignment="between">
                  <Text size={15} className="font-semibold">
                    {animal.name}
                  </Text>

                  {/* BUTTON LOVE (tetap widget kamu) */}
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(animal.id);
                    }}
                    className="bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer z-10 relative"
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
                  Rp{animal.price.toLocaleString("id-ID")}
                </Text>
              </Padding>
            </div>
          </Link>
        ))}
      </div>

      <SizedBox height={30} />

      {/* PAGINATION (widget kamu) */}
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
