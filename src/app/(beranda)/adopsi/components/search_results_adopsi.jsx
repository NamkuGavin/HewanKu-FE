"use client";

import * as React from "react";
import { dummyHewan } from "@/data/dummy/data_dummy";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Text,
  Column,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";

export default function SearchResultsAdopsi({ query }) {
  // favorites pakai id biar stabil walau pagination/search berubah
  const [favoriteIds, setFavoriteIds] = React.useState(() => new Set());

  const toggleFavoriteById = (id) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const postPerPage = 6;

  // reset page ketika query berubah
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const q = (query ?? "").trim().toLowerCase();

  const filtered = React.useMemo(() => {
    if (!q) return dummyHewan;
    return dummyHewan.filter((a) => a.name.toLowerCase().includes(q));
  }, [q]);

  const totalPosts = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const endIndex = safeCurrentPage * postPerPage;
  const startIndex = endIndex - postPerPage;
  const currentEndIndex = Math.min(endIndex, totalPosts);

  const currentPosts = filtered.slice(startIndex, endIndex);

  const paginate = (page) => setCurrentPage(page);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <Column className="w-full">
      <Text className="text-2xl font-semibold mb-1">Hasil Pencarian</Text>
      <Text className="text-gray-500 mb-6">
        Keyword: <span className="font-semibold text-gray-700">{query}</span>
      </Text>

      <div className="w-full mb-4">
        <Text className="text-gray-500 font-medium">
          {totalPosts === 0
            ? "Tidak ada hasil yang cocok."
            : `Showing ${
                startIndex + 1
              }-${currentEndIndex} of ${totalPosts} results`}
        </Text>
      </div>

      {/* GRID */}
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

                  {/* BUTTON LOVE */}
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavoriteById(animal.id);
                    }}
                    className="bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer z-10 relative"
                    aria-label="favorite"
                  >
                    <Heart
                      size={15}
                      className={`transition-all ${
                        favoriteIds.has(animal.id)
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

      {/* PAGINATION */}
      {totalPosts > 0 && (
        <Row className="gap-x-2" mainAxisAlignment="between">
          {/* PREV */}
          <button
            onClick={() => paginate(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-md border text-sm font-medium transition-colors
              ${
                safeCurrentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-500 cursor-pointer bg-white hover:bg-gray-50"
              }`}
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex items-center gap-x-2 mx-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold transition-all cursor-pointer
                  ${
                    safeCurrentPage === number
                      ? "bg-orange-500 text-white border-none shadow-sm"
                      : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {number}
              </button>
            ))}
          </div>

          {/* NEXT */}
          <button
            onClick={() => paginate(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-md border text-sm font-medium transition-colors
              ${
                safeCurrentPage === totalPages
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
