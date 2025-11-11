"use client";

import { useState } from "react";
import {
  Text,
  Column,
  Container,
  Padding,
  SizedBox,
  Row,
} from "@/components/shared/custom_widget";
import { dummyKategoriHewan } from "@/data/dummy/data_dummy";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function KategoriHewan() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const totalItems = dummyKategoriHewan.length;

  const handleNext = () => {
    if (startIndex + itemsPerPage < totalItems) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + itemsPerPage >= totalItems;
  const visibleCategories = dummyKategoriHewan.slice(
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
      <SizedBox height={25} />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={99999}
              height={0}
              className="w-full h-30 object-cover"
            />
            <Padding vertical={12} horizontal={16}>
              <Row mainAxisAlignment="between">
                <Text size={16} className="font-semibold mb-1">
                  {category.name}
                </Text>
                <Container className="bg-gray-50 rounded-full transition-all p-1">
                  <ArrowRight color="#FD7E14" size={15} />
                </Container>
              </Row>
              <Text size={12} className="text-gray-500">
                {category.unit} unit
              </Text>
            </Padding>
          </div>
        ))}
      </div>
    </>
  );
}
