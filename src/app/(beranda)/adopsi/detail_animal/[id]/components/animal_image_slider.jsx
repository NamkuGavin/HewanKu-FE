"use client";

import { useEffect, useMemo, useState } from "react";
import { ImageAssets } from "@/common/constant/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

function AnimalSlideImage({ src, alt, className, priority = false, sizes }) {
  if (typeof src === "string" && src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

export default function AnimalImageSlider({ images = [], animalName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const animalImages = useMemo(() => {
    const validImages = images.filter(
      (image) => typeof image === "string" && image.trim(),
    );

    return validImages.length > 0
      ? validImages
      : [ImageAssets.placeholderAnimal];
  }, [images]);
  const showControls = animalImages.length > 1;
  const imageKey = animalImages.join("|");

  useEffect(() => {
    setSelectedIndex(0);
  }, [imageKey]);

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? animalImages.length - 1 : prevIndex - 1,
    );
  };
  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === animalImages.length - 1 ? 0 : prevIndex + 1,
    );
  };
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="w-1/3">
      <div className="relative w-full h-[350px] mb-6 rounded-xl overflow-hidden shadow-sm bg-gray-100">
        <AnimalSlideImage
          src={animalImages[selectedIndex]}
          alt={animalName || `Foto hewan ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      {showControls ? (
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
                  <AnimalSlideImage
                    src={image}
                    alt={`${animalName || "Foto hewan"} ${index + 1}`}
                    className="w-full h-full object-cover"
                    sizes="48px"
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
      ) : null}
    </div>
  );
}
