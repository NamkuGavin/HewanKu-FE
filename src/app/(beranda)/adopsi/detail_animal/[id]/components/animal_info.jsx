"use client";

import { useState } from "react";
import { IconAssets, ImageAssets } from "@/common/constant/assets";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import Image from "next/image";
import { formatRupiah } from "@/utils/helper";

export default function AnimalInfo() {
  const [rating, setRating] = useState(4.7);
  const [discount, setDiscount] = useState(21);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Column crossAxisAlignment="start" className="w-full">
      <Row className="gap-2">
        <Rating defaultValue={rating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-yellow-500" key={index} size={15} />
          ))}
        </Rating>
        <Text className="font-semibold text-xs">{rating} Star Rating</Text>
        <Text className="font-normal text-[#5F6C72] text-xs">
          (21,671 User feedback)
        </Text>
      </Row>
      <SizedBox height={5} />
      <Text className="font-normal mb-2">
        Ali - Labrador RetrieverMangilao, GU
      </Text>
      <SizedBox height={5} />
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex gap-1">
          <Text className="text-xs">Jenis Kelamin: </Text>
          <span className="font-semibold text-xs">Jantan</span>
        </div>
        <div className="flex gap-1">
          <Text className="text-xs">Tersedia: </Text>
          <span className="font-semibold text-xs text-[#27C840]">
            Belum di adopsi
          </span>
        </div>
        <div className="flex gap-1">
          <Text className="text-xs">Umur: </Text>
          <span className="font-semibold text-xs">2 Tahun</span>
        </div>
        <div className="flex gap-1">
          <Text className="text-xs">Category: </Text>
          <span className="font-semibold text-xs">Anjing</span>
        </div>
      </div>
      <SizedBox height={15} />
      <Row className="gap-2">
        <Text className="font-semibold text-[#2DA5F3] text-lg">
          {formatRupiah(2000000 - (2000000 * discount) / 100)}
        </Text>
        {discount != 0 && (
          <Text className="font-semibold text-[#77878F] text-base line-through">
            {formatRupiah(2000000)}
          </Text>
        )}
        <Container className="bg-[#EFD33D] px-2 py-1">
          <Text className="font-semibold text-xs">{discount}% OFF</Text>
        </Container>
      </Row>
      <Separator className="my-5" />
      <Button
        className="h-[48px] w-[200px] border-2 border-[#FA8232] bg-white hover:bg-orange-50 cursor-pointer rounded-sm"
        variant="outline"
      >
        <Text className="font-bold text-[#FA8232] text-base">
          Adopsi sekarang
        </Text>
      </Button>
      <Row mainAxisAlignment="between" className="w-full my-4">
        <div className="flex items-center justify-center">
          <Button
            onClick={toggleFavorite}
            className="border-none hover:bg-transparent cursor-pointer"
            variant="ghost"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`transition-all ${
                isFavorite
                  ? "fill-[#FF8D28] text-[#FF8D28]"
                  : "fill-transparent"
              }`}
            />
          </Button>
          <Text className="font-normal text-[#475156] text-xs">
            Menambahkan ke Favorit
          </Text>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Text className="font-normal text-[#475156] text-xs">
            Kontak Penjual
          </Text>
          <div
            onClick={() => {
              window.open("https://wa.me/6282170677488", "_blank");
            }}
            className="flex items-center justify-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src={IconAssets.waOrangeIcon}
              alt="WA_Orange_Icon"
              width={15}
              height={15}
              className="object-cover"
            />
            <Text className="font-normal text-[#F87537] text-xs">
              +6282170677488
            </Text>
          </div>
        </div>
      </Row>
      <Container className="bg-transparent border border-[#E4E7E9] px-5 pt-5 pb-2 w-full">
        <Column crossAxisAlignment="start">
          <Text className="font-normal text-xs">
            Checkout Aman 100% Terjamin
          </Text>
          <Row
            mainAxisAlignment="start"
            crossAxisAlignment="center"
            className="w-auto gap-3"
          >
            <Image
              src={ImageAssets.gopayLogo}
              alt="gopay"
              width={50}
              height={50}
            />
            <Image
              src={ImageAssets.qrisLogo}
              alt="instagram"
              width={50}
              height={50}
            />
            <Image
              src={ImageAssets.mandiriLogo}
              alt="mandiri"
              width={50}
              height={50}
            />
            <Image
              src={ImageAssets.danaLogo}
              alt="dana"
              width={50}
              height={50}
            />
          </Row>
        </Column>
      </Container>
    </Column>
  );
}
