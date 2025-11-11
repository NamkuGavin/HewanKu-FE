"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import {
  Text,
  Column,
  Container,
  Padding,
  SizedBox,
  Row,
} from "@/components/shared/custom_widget";
import { dummyHewanUnggulan } from "@/data/dummy/data_dummy";
import { Button } from "@/components/ui/button";

export default function HewanUnggulan() {
  const [favorites, setFavorites] = useState(
    dummyHewanUnggulan.map(() => false)
  );

  const toggleFavorite = (index) => {
    setFavorites((prev) => prev.map((fav, i) => (i === index ? !fav : fav)));
  };

  return (
    <>
      <Text size={20} className="font-semibold">
        Hewan unggulan
      </Text>
      <SizedBox height={20} />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyHewanUnggulan.map((animal, index) => (
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
    </>
  );
}
