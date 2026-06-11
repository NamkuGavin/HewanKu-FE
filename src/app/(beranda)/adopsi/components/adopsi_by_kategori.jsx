"use client";

import { useEffect, useState } from "react";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dummyKategoriHewanAdopsi } from "@/data/dummy/data_dummy";
import Image from "next/image";

export default function AdopsiByKategori({
  selectedCategory,
  onCategoryChange,
}) {
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 6;
  const totalItems = dummyKategoriHewanAdopsi.length;

  useEffect(() => {
    if (!selectedCategory) {
      setStartIndex(0);
      return;
    }

    const selectedIndex = dummyKategoriHewanAdopsi.findIndex(
      (category) => category.name === selectedCategory
    );

    if (selectedIndex >= 0) {
      setStartIndex(Math.floor(selectedIndex / itemsPerPage) * itemsPerPage);
    }
  }, [selectedCategory]);

  const handleNext = () => {
    if (startIndex + itemsPerPage < totalItems) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleCategoryClick = (name) => {
    onCategoryChange?.(selectedCategory === name ? null : name);
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + itemsPerPage >= totalItems;
  const visibleCategories = dummyKategoriHewanAdopsi.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Row mainAxisAlignment="between">
        <Text size={20} className="font-semibold">
          Telusuri berdasarkan kategori
        </Text>
        <Container>
          <Row className="gap-4">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`bg-black p-1 rounded-full cursor-pointer transition-opacity ${
                isPrevDisabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
            >
              <ChevronLeft color="#ffffffff" size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`bg-black p-1 rounded-full cursor-pointer transition-opacity ${
                isNextDisabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
            >
              <ChevronRight color="#ffffffff" size={20} />
            </button>
          </Row>
        </Container>
      </Row>
      <SizedBox height={30} />
      <div className="grid grid-cols-6 gap-3 w-full">
        {visibleCategories.map((category) => {
          const isActive = selectedCategory === category.name;

          return (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="overflow-hidden cursor-pointer flex flex-col items-center transition-all duration-300"
            >
              <Image
                src={isActive ? category.activeIcon : category.icon}
                alt={category.name}
                width={0}
                height={0}
                className="w-35 h-35 object-cover transition-all"
              />
              <Padding vertical={12} horizontal={16}>
                <Text
                  size={16}
                  className={`font-semibold mb-1 ${
                    isActive ? "text-orange-500" : "text-black"
                  }`}
                >
                  {category.name}
                </Text>
              </Padding>
            </div>
          );
        })}
      </div>
    </>
  );
}
