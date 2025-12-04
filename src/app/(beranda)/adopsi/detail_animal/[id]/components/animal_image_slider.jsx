"use client";

import { useState } from "react";
import { ImageAssets } from "@/common/constant/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const animalImages = [
  ImageAssets.placeholderAnimal,
  ImageAssets.placeholderAnimal,
  ImageAssets.placeholderAnimal,
  ImageAssets.placeholderAnimal,
];

export default function AnimalImageSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? animalImages.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === animalImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="w-1/3">
      <div className="relative w-full h-[350px] mb-6 rounded-xl overflow-hidden shadow-sm bg-gray-100">
        <Image
          src={animalImages[selectedIndex]}
          alt={`Product image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex items-center justify-between px-4">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-3 mx-4 overflow-x-auto no-scrollbar justify-center">
          {animalImages.map((image, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                  isActive
                    ? "border-orange-500 opacity-100"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
