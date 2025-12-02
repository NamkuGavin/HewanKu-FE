"use client";

import * as React from "react";
import { dummyHewan } from "@/data/dummy/data_dummy";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";

export default function ListAdopsiAnimal() {
  const [favorites, setFavorites] = React.useState(dummyHewan.map(() => false));

  const toggleFavorite = (index) => {
    setFavorites((prev) => prev.map((fav, i) => (i === index ? !fav : fav)));
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setPostPerPage] = React.useState(6);
  const endIndex = currentPage * postPerPage;
  const startIndex = endIndex - postPerPage;
  const currentEndIndex = Math.min(endIndex, dummyHewan.length);
  const paginate = (page) => setCurrentPage(page);

  const totalPosts = dummyHewan.length;
  const totalPages = Math.ceil(totalPosts / postPerPage);
  const currentPosts = dummyHewan.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Column>
      <div className="w-full mb-4">
        <Text className="text-gray-500 font-medium">
          Showing {startIndex + 1}-{currentEndIndex} of {totalPosts} results
        </Text>
      </div>
      <div className="w-full grid grid-cols-3 gap-8">
        {currentPosts.map((animal, index) => (
          <div
            key={animal.id}
            className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
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
                <Button
                  onClick={() => toggleFavorite(index)}
                  className="bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer"
                  aria-label="favorite"
                >
                  <Heart
                    size={15}
                    className={`transition-all ${
                      favorites[index]
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
        ))}
      </div>
      <SizedBox height={30} />
      <Row className="gap-x-2" mainAxisAlignment="between">
        {/* Tombol PREV */}
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

        {/* Angka Halaman (1, 2, 3...) */}
        <div className="flex items-center gap-x-2 mx-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold transition-all cursor-pointer
                ${
                  currentPage === number
                    ? "bg-orange-500 text-white border-none shadow-sm" // Style Aktif
                    : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50" // Style Tidak Aktif
                }`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Tombol NEXT */}
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
    </Column>
  );
}
